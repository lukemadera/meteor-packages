/**
http://stackoverflow.com/questions/18485883/how-to-upload-any-type-of-file-in-phonegap-and-jquery-mobile
http://stackoverflow.com/questions/26773399/cordova-native-file-chooser-plugin-for-android-is-not-working*
*/

SimpleSchema.debug =true;   //TESTING

AFTestSchema =new SimpleSchema({
  file1: {
    type: String,
    optional: true
  },
  text1: {
    type: String,
    optional: true
  }
});

AFTestCollection =new Mongo.Collection("afTest");
AFTestCollection.attachSchema(AFTestSchema);

Files = new FS.Collection("files", {
  // stores: [new FS.Store.FileSystem("files", {path: "cfs/files"})]
  stores: [new FS.Store.FileSystem("files")]
});

Files.allow({
  download: function() {
    return true;
  },
  fetch: null
});

Meteor.methods({
  saveTestDoc: function(doc, docId) {
    console.log(doc); //TESTING

    if(docId) {
      var modifier =doc;
      AFTestCollection.update({_id:docId}, modifier);
    }
    else {
      // check(doc, PropertySchema);    //@todo - add back in
      AFTestSchema.clean(doc);

      AFTestCollection.insert(doc, function(error, result) {
        if(Meteor.isClient) {
          if(!error && result) {
            // console.log('success');
          }
        }
      });
    }
  }
});

if(Meteor.isServer) {
  Meteor.publish('current-aftest', function(docId) {
    return AFTestCollection.find({_id: docId});
  });
  Meteor.publish('aftests', function() {
    return AFTestCollection.find({});
  });
}

if(Meteor.isClient) {
  Template.autoformTest.helpers({
    afTest: function() {
      if(this.docId) {
        var doc =AFTestCollection.findOne({_id: this.docId});
        return AFTestCollection.findOne({_id: this.docId});
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
    afTests: function() {
      return AFTestCollection.find();
    },
    curVal: function() {
      return JSON.stringify(AFTestCollection.findOne({_id: this.docId}));
    }
  });

  // Template.autoformTest.events({
  //   'change .autoform-test-file-input': function(evt, template) {
  //     console.log('yes');   //TESTING
  //     var file =evt.target.file;
  //     Files.insert(file, function(err, fileObj) {
  //       //@todo
  //     });
  //   }
  // });
}