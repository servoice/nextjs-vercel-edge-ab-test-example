function cryptoRandom() {
  return (
    crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
  );
}

export function getCohort(cohorts) {
  // Get a random number between 0 and 1
  let n = cryptoRandom() * 100;
  // Get the percentage of each bucket
  const percentage = 100 / cohorts.length;
  // Loop through the buckets and see if the random number falls
  // within the range of the bucket
  return (
    cohorts.find(() => {
      n -= percentage;
      return n <= 0;
    }) ?? cohorts[0]
  );
}
