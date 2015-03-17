SimpleSchema.debug =true;   //TESTING

AFPikadaySchema =new SimpleSchema({
  dueDateTime: {
    type: String,
    optional: true
  },
  dueDate: {
    type: String,
    optional: true
  },
  text1: {
    type: String,
    optional: true
  }
});

AFPikadayCollection =new Mongo.Collection("afPikaday");
AFPikadayCollection.attachSchema(AFPikadaySchema);

Meteor.methods({
  saveDate: function(doc, docId) {
    // console.log(doc); //TESTING

    if(docId) {
      console.log('update');    //TESTING
      var modifier =doc;
      AFPikadayCollection.update({_id:docId}, modifier);
    }
    else {
      console.log('insert');    //TESTING
      // check(doc, PropertySchema);    //@todo - add back in
      AFPikadaySchema.clean(doc);

      AFPikadayCollection.insert(doc, function(error, result) {
        if(Meteor.isClient) {
          if(!error && result) {
            // console.log('success');
          }
        }
      });
    }
  },
  deleteAllDocs: function(params) {
    AFPikadayCollection.remove({});
  }
});

if(Meteor.isServer) {
  Meteor.publish('current-afpikaday', function(docId) {
    return AFPikadayCollection.find({_id: docId});
  });
  Meteor.publish('afpikadays', function() {
    return AFPikadayCollection.find({});
  });
}

if(Meteor.isClient) {
  Template.autoformPikadayBasic.helpers({
    afPikaday: function() {
      if(this.docId) {
        var doc =AFPikadayCollection.findOne({_id: this.docId});
        return AFPikadayCollection.findOne({_id: this.docId});
      }
      else {
        return {}
      }
    },
    afMethod: function() {
      if(this.docId) {
        return 'method-update';
      }
      else {
        return 'method';
      }
    },
    afPikadays: function() {
      return AFPikadayCollection.find();
    },
    curVal: function() {
      return JSON.stringify(AFPikadayCollection.findOne({_id: this.docId}));
    },
    optsPikaday: function() {
      return {
      }
    },
    optsPikadayNoTime: function() {
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

  Template.autoformPikadayBasic.events({
    'click .autoform-pikaday-basic-delete': function(evt, template) {
      Meteor.call("deleteAllDocs", {});
    }
  });
}