if(Meteor.isClient) {
  Template.socialShareBasic.helpers({
    opts: function() {
      var opts ={
        facebook: true,
        twitter: true,
        pinterest: false,
        shareData: {
          url: 'http://google.com'
        }
      };
      return opts;
    },
    opts2: function() {
      var opts ={
        facebook: true,
        twitter: true,
        pinterest: true,
        shareData: {
          url: 'http://yahoo.com'
        }
      };
      return opts;
    }
  });
}