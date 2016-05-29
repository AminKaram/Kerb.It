import { Transactions, Requests, Offers, Markers } from './collections.js';

Meteor.methods({
  'makeRequest'(consumerId, title, description, bidWindow, sizeRequired, postcode) {
    const date = new Date();

    const transactionId = Transactions.insert({
      title,
      description,
      consumerId,
      sizeAllocated: sizeRequired, //to change later
      postcode,
      date
    });

    Requests.insert({
      consumerId,
      title,
      description,
      bidWindow,
      sizeRequired,
      postcode,
      transactionId,
      offers: [],
      date
    });
  },
  
  'deleteRequest' (requestId) {
    console.log("I am here and the id is");
    console.log(requestId);
    Requests.remove(requestId);
  },

  'makeOffer'(requestId, driverId, price) {
    const request = Requests.findOne(requestId);

    const offerId = Offers.insert({
      requestId,
      consumerId: request.consumerId,
      transactionId: request.transactionId,
      driverId,
      price,
      date: new Date()
    });

    request.offers.push(offerId);
    //Does modifying the object change the database? Doubt it.

    Requests.update(requestId, {
      $set: {
        offers: request.offers
      }
    });
  },
  'acceptOffer'(transactionId, requestId, offerId, driverId, size_allocated, price) {
    Transactions.update(transactionId, {
      $set: {
        //size_allocated,
        price,
        driverId,
        dateConfirmed: new Date()
      }
    });
  },
  'addMarker'(latitude, longitude) {
    Markers.insert({
      latitude,
      longitude
    });
  },
  'updateMarker'(markerId, latitude, longitude) {
    Markers.update(markerId, {
      $set: {
        latitude,
        longitude
      }
    });
  }
});
