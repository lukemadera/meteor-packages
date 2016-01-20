if(Meteor.isClient) {
  Template.videoCaptureBasic.helpers({
    opts: function() {
      var opts ={
        // maxTime: 10,
        onVideoRecorded: function(err, base64Data) {
          // console.log('onGetVideo: ', base64Data);
          console.log('onGetVideo');
        }
      };
      return opts;
    }
  });
}