import DS from 'ember-data';

export default DS.Model.extend({
  baseurl: DS.attr('string'),
  filename: DS.attr('string'),
  sizes: DS.attr(),
  priority: DS.attr('number'),

  url: Ember.computed('baseurl', 'filename', 'sizes', function() {
    const base = unescape(this.get('baseurl'));
    const size = this.get('sizes')[1];
    const url = base + '/' + size + '/' + this.get('filename');
    return url;
  })
});
