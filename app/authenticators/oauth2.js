import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: "https://devtest.bonagora.com/v1/auth/access-token",
  clientId: '5ud0wzMBvp9B1XzOpwvVR4rmO3uknfHx',

  /**
    Overriding a base makeRequest method to pass a client ID.

  */
  makeRequest(url, data) {
    data.client_id = this.get('clientId');

    const options = {
      url,
      data,
      type:        'POST',
      dataType:    'json',
      contentType: 'application/x-www-form-urlencoded'
    };

    return Ember.$.ajax(options);
  },
});
