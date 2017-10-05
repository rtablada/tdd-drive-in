import { test } from 'qunit';
import moduleForAcceptance from 'tdd-drive-in/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | car new');

test('visiting /cars/new does not redirect', async (assert) => {
  await visit('/cars/new');

  assert.equal(currentURL(), '/cars/new');
});

test('User can navigate to cars new form', async (assert) => {
  await visit('/cars');

  await click('[data-test-new-car]');

  assert.equal(currentURL(), '/cars/new',
    'The user should be on the car new form after clicking the link.');
});

test('User can fill in a new car', async (assert) => {
  await visit('/cars/new');

  await fillIn('[data-test-car-brand]', 'Mazda');
  await fillIn('[data-test-car-series]', '3');
  await fillIn('[data-test-car-year]', '2013');
  await fillIn('[data-test-car-color]', 'Silver');
  await click('[data-test-submit]');

  assert.equal(currentURL(), '/cars',
    'The user should be redirected to the cars list after submitting the form');
  assert.equal(server.db.cars.length, 1,
    'The submitted car should be in the API database');

  const car = server.db.cars[0];

  assert.equal(car.brand, 'Mazda',
    'The car brand in the database should match the input value');
  assert.equal(car.series, '3',
    'The car series in the database should match the input value');
  assert.equal(car.year, '2013',
    'The car year in the database should match the input value');
  assert.equal(car.color, 'Silver',
    'The car color in the database should match the input value');
});
