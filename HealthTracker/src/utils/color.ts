export function calculateColor(completionPercentage: number) {
  // Define start (low completion) and end (high completion) colors
  const startColor = [255, 0, 0]; // Red for low completion
  const endColor = [0, 255, 0]; // Green for high completion

  // Calculate the color for the current completion percentage
  const color = startColor.map((start, i) => {
    return Math.round(start + (endColor[i] - start) * completionPercentage);
  });

  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`;
}
