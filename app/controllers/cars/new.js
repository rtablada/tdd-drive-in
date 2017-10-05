import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveCar(ev) {
      ev.preventDefault();

      const car = this.store.createRecord('car', this.model);

      await car.save();

      this.transitionToRoute('cars');
    },
  },
});
