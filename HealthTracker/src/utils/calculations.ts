import {LatLng} from 'react-native-maps';

export function lowpassFilter(
  newSample: number,
  lastFilteredSample: number,
  alpha: number,
): number {
  return alpha * newSample + (1 - alpha) * lastFilteredSample;
}

export function calculateAngle(coordinate1: LatLng, coordinate2: LatLng) {
  const dx = coordinate2.latitude - coordinate1.latitude;
  const dy = coordinate2.longitude - coordinate1.longitude;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return angle;
}
