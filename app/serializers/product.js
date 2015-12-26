import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'pid',

  attrs: {
    images: { embedded: 'always' }
  },

  modelNameFromPayloadKey: function(payloadKey) {
    if (payloadKey === 'data') {
      return this._super('product');
    } else {
      return this._super(payloadKey);
    }
  }
});
