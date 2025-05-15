export function removeDuplicates(arr) {
  const filteredArr = arr.reduce((acumulator, currentValue) => {
    if (!acumulator.includes(currentValue)) {
      acumulator.push(currentValue);
    }

    return acumulator;
  }, []);

  return filteredArr;
}

export function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const midIndex = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, midIndex);
  const rightArr = arr.slice(midIndex);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}
// Merge and sort arrays (conquer step)
function merge(firstArr, secondArr) {
  const mergedArr = [];
  let [i, j, k] = [0, 0, 0];
  while (i < firstArr.length && j < secondArr.length) {
    if (firstArr[i] <= secondArr[j]) {
      mergedArr[k++] = firstArr[i++];
    } else {
      mergedArr[k++] = secondArr[j++];
    }
  }
  while (i < firstArr.length) mergedArr[k++] = firstArr[i++];
  while (j < secondArr.length) mergedArr[k++] = secondArr[j++];
  return mergedArr;
}
