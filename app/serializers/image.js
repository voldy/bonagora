import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  modelNameFromPayloadKey: function(payloadKey) {
    return this._super(payloadKey);
  }
});
