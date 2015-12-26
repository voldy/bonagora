import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const { RSVP, isEmpty, run } = Ember;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: "https://devtest.bonagora.com/v1/auth/access-token",
  clientId: '5ud0wzMBvp9B1XzOpwvVR4rmO3uknfHx',

  /**
    Overriding a base authenticate method to get deep nested auth data.

  */
  authenticate(identification, password, scope = []) {
    return new RSVP.Promise((resolve, reject) => {
      const data                = { 'grant_type': 'password', username: identification, password };
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const scopesString = Ember.makeArray(scope).join(' ');
      if (!Ember.isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data).then((fullResponse) => {
        var response = fullResponse['data']['auth'];
        const user = fullResponse['data']['user'];
        run(() => {
          const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
          this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
          if (!isEmpty(expiresAt)) {
            response = Ember.merge(response, { 'expires_at': expiresAt });
          }

          const name = user['firstname'] + ' ' + user['lastname'];
          response = Ember.merge(response,
            { uid: user['uid'], email: user['email'], 'name': name });
          resolve(response);
        });
      }, (xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },

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
