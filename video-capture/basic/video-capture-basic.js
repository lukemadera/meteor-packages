if(Meteor.isClient) {
  Template.videoCaptureBasic.helpers({
    opts: function() {
      var opts ={
        // maxTime: 15,
        // androidQuality: 0,
        // videoDisplay: {
        //   width: 600,
        //   height: 460
        // },
        // classes: {
        //   recordBtn: 'video-capture-basic-record-btn',
        //   stopBtn: 'video-capture-basic-stop-btn'
        // },
        onVideoRecorded: function(err, base64Data) {
          // console.log('onVideoRecorded: ', base64Data);
          console.log('onVideoRecorded');
        }
      };
      return opts;
    }
  });
}