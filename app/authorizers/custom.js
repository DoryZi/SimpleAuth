// authorizers
// Using the ember-simple-auth it will load all ajax reqeust swit hthe session
// token so that they are authorized

import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';


export default Base.extend({
  authorize: function(addHeaderFunction, requestOptions) {
     if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.authenticated.access_token'))) {
       var basicHTTPToken = btoa(this.get('session.authenticated.account_id') + ":" + this.get('session.authenticated.access_token'));
       addHeaderFunction('Authorization', 'Basic ' + basicHTTPToken);
       addHeaderFunction('Content-Type', 'application/json');
     }
   }
});
