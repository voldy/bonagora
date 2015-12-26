import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  sku: DS.attr('string'),
  images: DS.hasMany('image'),
  pricing: DS.attr(),

  image: Ember.computed('images.[]', function() {
    var images = this.get('images').sortBy('priority');
    return images.get('firstObject');
  }),

  price: Ember.computed('pricing', function() {
    const groupPrice = this.get('pricing')['groupPricing'][0];
    const currency = groupPrice['currency'];
    const value = groupPrice['prices'][0]['price'].toFixed(2);
    return currency + ' ' + value;
  })
});
