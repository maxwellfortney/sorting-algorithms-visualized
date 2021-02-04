export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Heap Sort

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  return animations;
}

function heapSort(a, animations) {
  let n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    max_heapify(a, i, n, animations); //Building max heap
  }
  for (let i = n - 1; i >= 0; i--) {
    animations.push({
      type: "swap",
      indexValues: [0, i],
      values: [a[0], a[i]],
    });
    swap(a, 0, i); //Deleting root element
    max_heapify(a, 0, i, animations); //Building max heap again
  }
  return a;
}

function max_heapify(a, i, n, animations) {
  console.log(animations);
  let left = 2 * i; //Left child index
  let right = 2 * i + 1; //Right child index
  let maximum;

  if (right < n) {
    //Checks if right child exist
    animations.push({ type: "compare", indexValues: [left, right] });
    animations.push({ type: "compare-remove", indexValues: [left, right] });
    if (a[left] >= a[right]) {
      //Compares children to find maximum
      maximum = left;
    } else {
      maximum = right;
    }
  } else if (left < n) {
    //Checks if left child exists
    maximum = left;
  } else return; //In case of no children return
  if (a[i] < a[maximum]) {
    //Checks if the largest child is greater than parent
    animations.push({
      type: "swap",
      indexValues: [i, maximum],
      values: [a[i], a[maximum]],
    });
    swap(a, i, maximum); //If it is then swap both
    max_heapify(a, maximum, n, animations); //max-heapify again
  }
  return;
}

function swap(input, index_A, index_B) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}

// Bubble sort
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(inputArr, animations) {
  let len = inputArr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      animations.push({ type: "compare", indexValues: [i, i + 1] });
      if (inputArr[i] > inputArr[i + 1]) {
        animations.push({
          type: "swap",
          indexValues: [i, i + 1],
          values: [inputArr[i], inputArr[i + 1]],
        });
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        swapped = true;
      }
      animations.push({ type: "compare-remove", indexValues: [i, i + 1] });
    }
  } while (swapped);
  return inputArr;
}

// Quick sort
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right, animations);
    }
  }
  return items;
}

function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  animations.push({ type: "set-pivot", index: Math.floor((right + left) / 2) });
  while (i <= j) {
    while (items[i] < pivot) {
      animations.push({
        type: "compare",
        indexValues: [i, Math.floor((right + left) / 2)],
        values: [items[i], "pivot"],
      });
      animations.push({
        type: "compare-remove",
        indexValues: [i, Math.floor((right + left) / 2)],
        values: [items[i], "pivot"],
      });
      i++;
    }
    while (items[j] > pivot) {
      animations.push({
        type: "compare",
        indexValues: [j, Math.floor((right + left) / 2)],
        values: [items[i], "pivot"],
      });
      animations.push({
        type: "compare-remove",
        indexValues: [j, Math.floor((right + left) / 2)],
        values: [items[i], "pivot"],
      });
      j--;
    }
    if (i <= j) {
      animations.push({
        type: "swap",
        indexValues: [i, j],
        values: [items[i], items[j]],
      });
      swap(items, i, j); //swapping two elements
      i++;
      j--;
    }
  }
  animations.push({
    type: "remove-pivot",
    index: Math.floor((right + left) / 2),
  });
  return i;
}
