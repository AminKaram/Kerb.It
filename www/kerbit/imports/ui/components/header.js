import { Template } from 'meteor/templating';

import "./header.html";

Template.nav_bar.helpers({
  currentUserIsDriver() {
    return Meteor.user().profile.isDriver;
  }
});
