SimpleSchema.debug =true;   //TESTING

AddressSchema =new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  },
  country: {
    type: String
  }
});

PropertySchema =new SimpleSchema({
  addresses: {
    type: [AddressSchema],
    optional: true
  },
  textOne: {
    type: 'String',
    optional: true
  }
});

PropertiesCollection =new Mongo.Collection("properties");
PropertiesCollection.attachSchema(PropertySchema);

Meteor.methods({
  savePropertyAddress: function(doc, docId) {
    if(docId) {
      var modifier =doc;
      PropertiesCollection.update({_id:docId}, modifier);
    }
    else {
      PropertySchema.clean(doc);

      PropertiesCollection.insert(doc, function(error, result) {
        if(Meteor.isClient) {
          if(!error && result) {
            // console.log('success');
          }
        }
      });
    }
  },
  deleteAllProperties: function(params) {
    PropertiesCollection.remove({});
  }
});

if(Meteor.isServer) {
  Meteor.publish('current-property', function(propertyId) {
    return PropertiesCollection.find({_id: propertyId});
  });
  Meteor.publish('properties', function() {
    return PropertiesCollection.find({});
  });
}

if(Meteor.isClient) {
  function init(params) {
    // if(params.insert) {
    //   var doc ={
    //     address: {
    //       fullAddress
    //     }
    //   }
    //   PropertiesCollection.insert(doc, function(error, result) {
    //     if(Meteor.isClient) {
    //       if(!error && result) {
    //         console.log('property inserted');
    //         this.propertyId =result;
    //       }
    //     }
    //   });
    // }
  }

  Template.autoformGoogleplaceBasic.helpers({
    property: function() {
      if(this.propertyId) {
        var prop =PropertiesCollection.findOne({_id: this.propertyId});
        // console.log(prop);    //TESTING
        return PropertiesCollection.findOne({_id: this.propertyId});
      }
      else {
        // console.log('no prop'); //TESTING
        return {}
      }
    },
    afMethod: function() {
      if(this.propertyId) {
        return 'method-update';
      }
      else {
        return 'method';
      }
    },
    properties: function() {
      return PropertiesCollection.find();
    },
    propertyAddress: function() {
      if(this.propertyId) {
        return JSON.stringify( PropertiesCollection.findOne({_id: this.propertyId}) );
      }
      else {
        return "";
      }
    },
    optsGoogleplace: function() {
      return {
        // type: 'googleUI',
        // stopTimeoutOnKeyup: false,
        // googleOptions: {
        //   componentRestrictions: { country:'us' }
        // }
      }
    },
    optsGoogleplace2: function() {
      return {
        // type: 'googleUI',
        // stopTimeoutOnKeyup: false,
        googleOptions: {
          componentRestrictions: { country:'us' }
        }
      }
    }
  });

  Template.autoformGoogleplaceBasic.events({
    'click .autoform-googleplace-basic-delete': function(evt, template) {
      Meteor.call("deleteAllProperties", {});
    },
    //testing (logging on any keyup) AutoForm.getFieldValue
    'keyup': function(evt, template) {
      console.log(AutoForm.getFieldValue('textOne', 'propertyAddressForm'), 
        AutoForm.getFieldValue('addresses.0', 'propertyAddressForm'));
    }
  });
}