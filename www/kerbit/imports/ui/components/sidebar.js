import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { UserImages } from '../../api/collections/userImages.js'

import "./sidebar.html";

Template.Sidebar.onRendered(function() {
  Meteor.subscribe('userImages');
  this.autorun(() => {
    $(".button-collapse").sideNav({
      closeOnClick: true  
    });
  });
});

Template.Sidebar.helpers({
  currentUserIsDriver() {
    return Meteor.user() && Meteor.user().profile.isDriver;
  },
  fullName() {
    return Meteor.user() && toTitleCase(Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name);
  },
  groupRoutes() {
    FlowRouter.watchPathChange();
    const group= FlowRouter.current().route.group;
    return _.filter(FlowRouter._routes, function(route) {
      if (route.name === 'Home') {
        return false;
      } 
      for(let currGroup = group; !!currGroup; currGroup = currGroup.parent) {
        if (route.group && currGroup.name === route.group.name) {
          return true;
        }
      }
      return false
    });
  },
  getPhotoId() {
    if (!Meteor.user().imageId) {
      return "/profile-placeholder.png";
    } else {
      return Meteor.user() && UserImages.findOne(Meteor.user().imageId).url();
    }
  }
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
