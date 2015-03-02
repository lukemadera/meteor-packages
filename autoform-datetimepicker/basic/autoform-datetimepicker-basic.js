SimpleSchema.debug =true;   //TESTING

AFDatetimepickerSchema =new SimpleSchema({
  dueDateTime: {
    type: String,
    optional: true
  },
  dueDate: {
    type: String,
    optional: true
  },
  dueDateTime2: {
    type: String,
    optional: true
  },
  dueDate2: {
    type: String,
    optional: true
  },
  text1: {
    type: String,
    optional: true
  }
});

AFDatetimepickerCollection =new Mongo.Collection("afDatetimepicker");
AFDatetimepickerCollection.attachSchema(AFDatetimepickerSchema);

Meteor.methods({
  saveDatetimepicker: function(doc, modifier, docId) {
    // console.log(doc); //TESTING
    // check(doc, PropertySchema);    //@todo - add back in
    AFDatetimepickerSchema.clean(doc);

    if(docId) {
      AFDatetimepickerCollection.update({_id:docId}, modifier);
    }
    else {
      AFDatetimepickerCollection.insert(doc, function(error, result) {
        if(Meteor.isClient) {
          if(!error && result) {
            // console.log('success');
          }
        }
      });
    }
  },
  deleteAllDocsDatetimepicker: function(params) {
    AFDatetimepickerCollection.remove({});
  }
});

if(Meteor.isServer) {
  Meteor.publish('current-afdatetimepicker', function(docId) {
    return AFDatetimepickerCollection.find({_id: docId});
  });
  Meteor.publish('afdatetimepickers', function() {
    return AFDatetimepickerCollection.find({});
  });
}

if(Meteor.isClient) {
  Template.autoformDatetimepickerBasic.helpers({
    afDatetimepicker: function() {
      if(this.docId) {
        var doc =AFDatetimepickerCollection.findOne({_id: this.docId});
        return AFDatetimepickerCollection.findOne({_id: this.docId});
      }
      else {
        return {}
      }
    },
    afDatetimepickers: function() {
      return AFDatetimepickerCollection.find();
    },
    curVal: function() {
      return JSON.stringify(AFDatetimepickerCollection.findOne({_id: this.docId}));
    },
    optsDatetimepicker: function() {
      return {
      }
    },
    optsDatetimepickerNoTime: function() {
      return {
        // formatValue: 'MMM D, YY',
        formatValue: 'YYYY-MM-DD',
        // formatValue: 'YYYY-MM-DD HH:mm:ssZ',
        pikaday: {
          format: 'MMM D, YYYY',
          // format: 'MMM D, YYYY h:mmA',
          showTime: false,
          // showSeconds: true,
          // use24hour: true,
        }
      }
    }
  });

  Template.autoformDatetimepickerBasic.events({
    'click .autoform-datetimepicker-basic-delete': function(evt, template) {
      Meteor.call("deleteAllDocsDatetimepicker", {});
    }
  });
}