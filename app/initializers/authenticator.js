/**
registers the authenticator
The class that authorizes the login / login requests
and restores sessions on refresh.
**/

import CustomAuthenticator from '../authenticators/custom';

export function initialize(container, application) {
  application.register('authenticator:custom', CustomAuthenticator);
}


export default {
  before: 'ember-simple-auth',
  name: 'custom-authenticator',
  initialize: initialize
};
