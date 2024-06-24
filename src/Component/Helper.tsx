const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export const abbreviateNumber = (number: number) => {
  if (!number) {
    return 0;
  }
  var tier = Math.log10(Math.abs(number)) / 3 || 0;
  if (tier === 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return Number.isInteger(scaled)
    ? scaled + suffix
    : scaled.toFixed(2) + suffix;
};
