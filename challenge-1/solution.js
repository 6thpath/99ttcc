/**
 * The given problem does not define any constraints to the argument `n` except `any integer` so
 * Assuming `n` could be any value including NaN/negative/zero/infinity value.
 * Assuming function must return SAFE_INTEGER value as the result.
 * Assuming any unsafe-integer result (value is larger than max safe integer) should be an error instead.
 */

var sum_to_n_a = function (n) {
  if (n <= 0) {
    return 0
  }

  if (n > maxSafeN) {
    throw new RangeError('Input value may cause sum value exceed maximum safe integer value')
  }

  return (n * (n + 1)) / 2
}

// ! This solution has limitation since it may cause integer overflow for large `n` value,
var sum_to_n_b = function (n) {
  if (n <= 0) {
    return 0
  }

  if (n > maxSafeN) {
    throw new RangeError('Input value may cause sum value exceed maximum safe integer value')
  }

  var sum = 0
  for (var i = 1; i <= n; i++) {
    sum += i
  }

  return sum
}

// ! This solution does not stable since it may cause call stack overflow for large `n` value,
// ! the maximum value of `n` for this solution depends on the maximum call stack size of execution environment
var sum_to_n_c = function (n) {
  if (n <= 0) {
    return 0
  }

  return n + sum_to_n_c(n - 1)
}

// puts these LOC outside to avoid re-declaring/calculating it every time validation fn is called
var maxSafeInteger = Number.MAX_SAFE_INTEGER
var maxSafeN = Math.floor((Math.sqrt(1 + 8 * maxSafeInteger) - 1) / 2)

module.exports = {
  sum_to_n_a,
  sum_to_n_b,
  sum_to_n_c,
  maxSafeN,
}
