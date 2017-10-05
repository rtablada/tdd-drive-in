import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'tdd-drive-in/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Car | Detail');

test('visiting /car/:id doesn\'t redirect', async (assert) => {
  const car = server.create('car');

  await visit(`/cars/${car.id}`);

  assert.equal(currentURL(), `/cars/${car.id}`);
});

test('user can navigate to detail by clicking on link', async (assert) => {
  const cars = server.createList('car', 5);
  const car = faker.random.arrayElement(cars);

  await visit('/cars');

  await click(`[data-test-car-detail=${car.id}]`);

  assert.equal(currentURL(), `/cars/${car.id}`);
});

test('car detail page should show data for given car', async (assert) => {
  const car = server.create('car', {
    id: faker.random.number(),
  });

  await visit(`/cars/${car.id}`);

  assert.equal(findWithAssert('[data-test-car-brand]').text(), car.brand,
    'The UI should show the car brand based on data from the API');
  assert.equal(findWithAssert('[data-test-car-series]').text(), car.series,
    'The UI should show the car brand based on data from the API');
  assert.equal(findWithAssert('[data-test-car-color]').text(), car.color,
    'The UI should show the car brand based on data from the API');
  assert.equal(findWithAssert('[data-test-car-year]').text(), car.year,
    'The UI should show the car brand based on data from the API');
});

test('user can delete car from the detail page', async (assert) => {
  const car = server.create('car', {
    id: faker.random.number(),
  });

  await visit(`/cars/${car.id}`);

  await click('[data-test-delete]');

  assert.equal(currentURL(), '/cars',
    'After deleting the user should be redirected to the car index');
  assert.equal(server.db.cars.length, 0,
    'The car should be removed from the API');
});
