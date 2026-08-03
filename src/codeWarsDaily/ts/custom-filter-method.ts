function myFilter(arr: any[], predicate: (item: any) => boolean): any[] {
  const result = [];

  for (const item of arr) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}
