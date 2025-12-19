import getAge from '../getAge';

test('it should return the correct age', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2021-01-02T12:00:00Z'));
  expect(getAge(new Date())).toEqual(0);
  expect(getAge('2010-01-01')).toEqual(11);
  jest.useRealTimers();
});
