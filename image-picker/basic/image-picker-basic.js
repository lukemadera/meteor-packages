if(Meteor.isClient) {
  Template.imagePickerBasic.helpers({
    opts: function() {
      var opts ={
        // classes: {
        //   btns: 'lm-image-picker-btn-style',
        //   image: '',
        //   imageConverted: '',
        //   imageCont: ''
        // },
        // types: {
        //   upload: true,
        //   camera: true,
        //   byUrl: true
        // },
        // JcropOpts: {
        //   aspectRatio: 1,
        //   minSize: [ 100, 100 ]
        // },
        // resizeMax: {
        //   width: 800,
        //   height: 800
        // },
        // fileDir: '',
        // quality: '75',
        onImageSaved: function(err, base64Data) {
          console.log(err, base64Data);
        }
      };
      return opts;
    }
  });
}