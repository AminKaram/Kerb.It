import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Offers } from '../../api/collections/offers.js';
import { Images } from '../../api/collections/images.js';
import './myRequests.html';

Template.MyRequestsHelper.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('offers');
  Meteor.subscribe('images');
});

Template.MyRequestsHelper.helpers({
  images(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  requests() {
    return Requests.find({
      consumerId: Meteor.userId()
    });
  },

  transactions() {
    return Transactions.find({
      consumerId: Meteor.userId()
    });
  },
  
  offers(requestId) {
    return Offers.find({
      requestId
    });
  },
  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", 
                        "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " + 
           date.getFullYear() + " at " + date.getHours()  + ":" +
           date.getMinutes() ;
  },
  formatDescription(desc) {
    let ret = desc;
    if( desc.length > 100) {
      ret = desc.substring(0,100) + " ...";
    }
    return ret;
  }
});

Template.MyRequestsHelper.events({
  'click .tab-links button' () {
    const target = event.target;
    const name = target.name;
    $(name).show().siblings().hide();
    $(target).parent('li').addClass('active').siblings().removeClass('active');
  },

  'click #refresh-requests'() {
    javascript:history.go(0)
  },
  'click #accept-offer'() {
    Meteor.call('acceptOffer', this.requestId, this._id, 5);
  },
  'click #delete-request'() {
    Meteor.call('deleteRequest', this._id);
  },
  'click #delete-all-requests'() {
    alert('Feature not implemented yet!')
    // TODO implement this button
  }
});
