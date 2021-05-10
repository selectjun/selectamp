export function stringShorthand(targetString: string, length: number): string {
  if (targetString.length > length) {
    return targetString.substring(0, length) + "...";
  } else {
    return targetString;
  }
};