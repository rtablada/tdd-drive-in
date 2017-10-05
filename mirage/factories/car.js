import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  brand: () => faker.company.companyName(),
  series: () => faker.company.companyName(),

  year: () => faker.date.past(10).getFullYear().toString(),
  color: () => faker.random.arrayElement([
    'Red',
    'Blue',
    'White',
    'Silver',
  ]),
});
