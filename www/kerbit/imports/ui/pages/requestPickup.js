import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickupHelper.onCreated(function(){
  var self = this;
  GoogleMaps.ready('map', function(map) {
    self.map = new ReactiveVar(map);
  });
});

Template.RequestPickupHelper.events({
  'change #file' (event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },

  'submit form'(event,template) {
    event.preventDefault();
    const target = event.target;

    const description = target.description.value;
    const bidWindow = Number(target.bidWindow.value);
    const sizeRequired = Number(target.sizeRequired.value);
    const postcode = 'SW5 9RF';

    const images = target.clientImage.files;
    let imageIds = new Array();
    for (i = 0; i < images.length; i++) {
      imageIds.push(Images.insert(images[i])._id);
    }
    const position = template.map.get().instance.getCenter();
    const loc = { type: "Point", coordinates: [ position.lng(), position.lat() ] };

    console.log('makeRequest', Meteor.userId(), imageIds, description, bidWindow,
        sizeRequired, postcode, loc);

    Meteor.call('makeRequest', Meteor.userId(), imageIds, description, bidWindow,
      sizeRequired, postcode, loc);
    target.reset();
  }
});
