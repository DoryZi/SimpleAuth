import Ember from 'ember';
// app/routes/application.js
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{

  model : function () {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('chat');
    } else {
      this.transitionTo('login');
    }
  },

  actions : {
    sessionAuthenticationSucceeded : function () {
      this.transitionTo('chat');
    }
  }
});
