if(Meteor.isClient) {
  Template.socialShareBasic.helpers({
    opts: function() {
      var opts ={
        facebook: true,
        twitter: true,
        pinterest: true,
        facebookMessage: true,
        gmail: true,
        email: true,
        linkedIn: true,
        shareData: {
          url: 'http://google.com',
          facebookAppId: '195380783916970',
          subject: 'test subject',
          redirectUrl: 'http://localhost:3000/test'
        }
      };
      return opts;
    },
    opts2: function() {
      var opts ={
        facebook: true,
        twitter: true,
        pinterest: false,
        shareData: {
          url: 'http://yahoo.com'
        },
        buttonHtml: {
          twitter: 'Twitter'
        }
      };
      return opts;
    }
  });
}