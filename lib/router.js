Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'toc'});

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
