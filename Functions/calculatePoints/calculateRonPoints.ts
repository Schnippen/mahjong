function calculateRonPoints(totalHan: number): number {
  switch (totalHan) {
    case 1:
      return 1500;
    case 2:
      return 3000;
    default:
      return 0;
  }
}
