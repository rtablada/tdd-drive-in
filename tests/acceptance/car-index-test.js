import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'tdd-drive-in/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cars index');

test('visiting /cars should not redirect', async (assert) => {
  await visit('/cars');

  assert.equal(currentURL(), '/cars');
});

test('user can navigate to the cars index', async (assert) => {
  await visit('/');

  await click('[data-test-nav=cars]');

  assert.equal(currentURL(), '/cars');
});

test('user can see all cars from the API', async (assert) => {
  server.createList('car', faker.random.number({ min: 8, max: 20 }));

  await visit('/cars');

  const carItems = findWithAssert('[data-test-car]').toArray();
  const carBrands = findWithAssert('[data-test-car-brand]').toArray();
  const carColors = findWithAssert('[data-test-car-color]').toArray();
  const carSeries = findWithAssert('[data-test-car-series]').toArray();
  const carYear = findWithAssert('[data-test-car-year]').toArray();

  assert.equal(carItems.length, server.db.cars.length,
    'There should be a car item for each car in the API');
  assert.deepEqual(carBrands.map(c => c.innerText), server.db.cars.map(c => c.brand),
    'The brands for each car UI should match the brand values in the API database.');
  assert.deepEqual(carColors.map(c => c.innerText), server.db.cars.map(c => c.color),
    'The brands for each car UI should match the brand values in the API database.');
  assert.deepEqual(carSeries.map(c => c.innerText), server.db.cars.map(c => c.series),
    'The brands for each car UI should match the brand values in the API database.');
  assert.deepEqual(carYear.map(c => c.innerText), server.db.cars.map(c => c.year),
    'The brands for each car UI should match the brand values in the API database.');
});
