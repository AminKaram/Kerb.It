import "./requestPickup.html";

Template.requestPickup.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;

    const title = target.title.value;
    const description = target.description.value;
    const bidWindow = Number(target.bidWindow.value);
    const sizeRequired = Number(target.sizeRequired.value);
    const postcode = target.postcode.value;

    Meteor.call('makeRequest', this._id, title, description, bidWindow, sizeRequired, postcode);
  }
});