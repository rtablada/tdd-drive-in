import { test } from 'qunit';
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
  server.createList('car', 20);

  await visit('/cars');

  const carItems = findWithAssert('[data-test-car]').toArray();
  const carBrands = findWithAssert('[data-test-car-brand]').toArray();
  const carColors = findWithAssert('[data-test-car-color]').toArray();
  const carSeries = findWithAssert('[data-test-car-series]').toArray();
  const carYear = findWithAssert('[data-test-car-year]').toArray();

  assert.equal(carItems.length, server.db.cars.length);
  assert.deepEqual(carBrands.map(c => c.innerText), server.db.cars.map(c => c.brand));
  assert.deepEqual(carColors.map(c => c.innerText), server.db.cars.map(c => c.color));
  assert.deepEqual(carSeries.map(c => c.innerText), server.db.cars.map(c => c.series));
  assert.deepEqual(carYear.map(c => c.innerText), server.db.cars.map(c => c.year));
});
