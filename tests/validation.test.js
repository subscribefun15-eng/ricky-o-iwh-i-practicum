
const test = require('node:test');
const assert = require('node:assert/strict');

const { validateProject } = require('../validateProject');

test('accepts valid project data', () => {
  const result = validateProject({
    name: ' Cyber Dreams ',
    genre: 'Hardstyle',
    bpm: '160'
  });

  assert.deepEqual(result, {
    name: 'Cyber Dreams',
    genre: 'Hardstyle',
    bpm: 160
  });
});

test('rejects missing names', () => {
  const result = validateProject({
    name: '',
    genre: 'Trap',
    bpm: '150'
  });

  assert.equal(result, null);
});

test('rejects invalid BPM values', () => {
  const invalidValues = ['', 'abc', '-10', '145.5'];

  for (const bpm of invalidValues) {
    const result = validateProject({
      name: 'Test',
      genre: 'Trap',
      bpm
    });

    assert.equal(result, null);
  }
});
