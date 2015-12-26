import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {

  limit: 10,
  offset: 0,
  perPageParam: "limit",
  pageParam: "offset",
  _canLoadMore: true,

  model: function() {
    return this.infinityModel('product', {}, {
      limit: 'limit',
      offset: 'offset'
    });
  },

  afterInfinityModel: function(products) {
    const total = products.get('meta.total');
    const offset = this.get('offset') + this.get('limit');
    this.set('_canLoadMore', offset < total);
    this.set('offset', offset);
  }
});
