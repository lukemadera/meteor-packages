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
  address: {
    type: AddressSchema,
    optional: true
  }
});

PropertiesCollection =new Mongo.Collection("properties");
PropertiesCollection.attachSchema(PropertySchema);

Meteor.methods({
  savePropertyAddress: function(doc, modifier, docId) {
    //@todo - handle update too (not just insert)
    //@todo - fix / add this back in - the check is failing right now and not sure why..
    // check(doc, PropertySchema);
    PropertySchema.clean(doc);

    PropertiesCollection.insert(doc, function(error, result) {
      if(Meteor.isClient) {
        if(!error && result) {
          // console.log('success');
        }
      }
    });
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
        // type: 'standard'
      }
    }
  });
}