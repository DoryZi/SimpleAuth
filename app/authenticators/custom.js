// authenticator
// implements the ember-simple-auth authorization
// as this plus into the ember-simple-auth and must implement the authenticate
// and restore.

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.access_token2)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate: function(credentials) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
     // make the request to authenticate the user at endpoint
     Ember.$.ajax({
       url: '/authlogin',
       type: 'POST',
       contentType : 'application/json',
       dataType : 'json',
       data: JSON.stringify({"email":credentials.identification,"password":credentials.password}),
     }).then(function (response) {
         resolve({ access_token: response.token, account_id: response.id });
     }, function (xhr, status, error) {
         reject(xhr.responseText);
     });
   });
  },
  invalidate: function(data) {
    return new Ember.RSVP.resolve(true);
  }

});
