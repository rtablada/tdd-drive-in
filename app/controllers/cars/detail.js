import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async deleteCar() {
      await this.model.destroyRecord();

      this.transitionToRoute('cars');
    },
  },
});
