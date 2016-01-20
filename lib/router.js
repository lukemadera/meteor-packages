Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'toc'});

//autoform-test
Router.route('/af-test', {
  name: 'autoformTest',
  waitOn: function () {
    return [
      Meteor.subscribe('current-aftest', this.params.query.propertyId),
      Meteor.subscribe('aftests')
    ]
  },
  data: function() {
    return {
      docId: this.params.query.docId
    }
  }
});

//autoform-googleplace
Router.route('/af-googleplace-basic', {
  name: 'autoformGoogleplaceBasic',
  waitOn: function () {
    return [
      Meteor.subscribe('current-property', this.params.query.propertyId),
      Meteor.subscribe('properties')
    ]
  },
  data: function() {
    return {
      propertyId: this.params.query.propertyId
    }
  }
});

//autoform-pikaday
Router.route('/af-pikaday-basic', {
  name: 'autoformPikadayBasic',
  waitOn: function () {
    return [
      Meteor.subscribe('current-afpikaday', this.params.query.docId),
      Meteor.subscribe('afpikadays')
    ]
  },
  data: function() {
    return {
      docId: this.params.query.docId
    }
  }
});

//autoform-datetimepicker
Router.route('/af-datetimepicker-basic', {
  name: 'autoformDatetimepickerBasic',
  waitOn: function () {
    return [
      Meteor.subscribe('current-afdatetimepicker', this.params.query.docId),
      Meteor.subscribe('afdatetimepickers')
    ]
  },
  data: function() {
    return {
      docId: this.params.query.docId
    }
  }
});

Router.route('/social-share-basic', {
  name: 'socialShareBasic'
});

Router.route('/video-capture-basic', {
  name: 'videoCaptureBasic'
});
