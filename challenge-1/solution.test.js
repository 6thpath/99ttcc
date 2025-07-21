import { test, expect } from 'vitest'

import { sum_to_n_a, sum_to_n_b, sum_to_n_c, maxSafeN } from './solution.js'

function testSumToN(description, input, expected) {
  test(description, () => {
    expect(sum_to_n_a(input)).equal(expected)
    expect(sum_to_n_b(input)).equal(expected)
    expect(sum_to_n_c(input)).equal(expected)
  })
}

testSumToN('negative input value', -5, 0)
testSumToN('zero input value', 0, 0)
testSumToN('input value is 5', 5, 15)
testSumToN('input value is 50', 200, 20100)

test('input value exceeds maximum safe value', () => {
  expect(() => sum_to_n_a(maxSafeN + 1)).toThrow(RangeError)
  expect(() => sum_to_n_b(maxSafeN + 1)).toThrow(RangeError)
})

test('input value exceeds maximum safe integer', () => {
  expect(() => sum_to_n_a(Number.MAX_SAFE_INTEGER)).toThrow(RangeError)
  expect(() => sum_to_n_b(Number.MAX_SAFE_INTEGER)).toThrow(RangeError)
})
