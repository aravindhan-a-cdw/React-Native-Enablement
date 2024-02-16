export function lowpassFilter(
  newSample: number,
  lastFilteredSample: number,
  alpha: number,
): number {
  return alpha * newSample + (1 - alpha) * lastFilteredSample;
}
