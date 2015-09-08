import Ember from 'ember';
// app/controllers/login.js

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    // called when the login button is pressed
    // will authenticate agains the ember-simple-auth authentication infrastructur
    authenticate: function() {
      this.set('errorText',null);
      var creditionals = {};
      var that = this;
      creditionals.identification = this.get('model.identification');
      creditionals.password = this.get('model.password');
      new Ember.RSVP.Promise(function (resolve,reject) {
        return (that.get('session.isAuthenticated')) ? that.get('session').invalidate() : resolve(true);
      })
       //first invalidate, so we clear past data.
      .then (function () {
        return that.get('session').authenticate('authenticator:custom',creditionals);
      })
      .then(function authSuccess() {
        that.send('sessionAuthenticationSucceeded');
      },function authFailed() {
        that.set('errorText','Login Failed!');
      });
    }
  }
});
