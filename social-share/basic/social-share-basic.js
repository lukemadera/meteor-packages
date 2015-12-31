if(Meteor.isClient) {
  Template.socialShareBasic.helpers({
    opts: function() {
      var opts ={
        email: true,
        facebook: true,
        facebookMessage: true,
        gmail: true,
        googlePlus: true,
        linkedIn: true,
        pinterest: true,
        sms: true,
        twitter: true,
        url: true,
        shareData: {
          url: 'http://google.com',
          facebookAppId: '195380783916970',
          subject: 'test subject',
          body: 'test body',
          redirectUrl: 'http://localhost:3000/test'
        }
      };
      return opts;
    },
    opts2: function() {
      var opts ={
        facebook: true,
        pinterest: false,
        twitter: true,
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