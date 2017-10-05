import DS from 'ember-data';

export default DS.Model.extend({
  brand: DS.attr(),
  series: DS.attr(),
  year: DS.attr(),
  color: DS.attr(),
});
