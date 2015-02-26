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

/*
if(Meteor.isClient) {
  AutoForm.addHooks(
    ["afTestForm"],
    {
      before   : {
        saveTestDoc: CfsAutoForm.Hooks.beforeInsert
      },
      after    : {
        saveTestDoc: CfsAutoForm.Hooks.afterInsert
      }
    }
  );
}
*/

Meteor.methods({
  saveTestDoc: function(doc, modifier, docId) {
    console.log(doc); //TESTING
    // check(doc, PropertySchema);    //@todo - add back in
    AFTestSchema.clean(doc);

    if(docId) {
      AFTestCollection.update({_id:docId}, modifier);
    }
    else {
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