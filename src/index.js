// Constants
const SWAP_COLOR = '#F4A261';
const NORMAL_COLOR = '#2A9D8F';
const SORTED_COLOR = '#E76F51';
const HIGHLIGHT_COLOR = '#E9C46A';
const MIN_VAL = 10;
const MAX_VAL = 1000;
const SORTING_ID = {
    'Bubble Sort': 0,
    'Selection Sort': 1,
    'Insertion Sort': 2,
    'Merge Sort': 3,
    'Quick Sort': 4,
};

// State
let selectedSort = 'Bubble Sort';
let array = [];
let maximum = 0;

// Elements
const arrayDiv = document.getElementById('array');
const settingButtons = [];
settingButtons.push(document.getElementById('new-array'));
settingButtons.push(document.getElementById('array-size'));
settingButtons.push(document.getElementById('run-sort'));
const sortButtons = [];
sortButtons.push(document.getElementById('bubble-sort'));
sortButtons.push(document.getElementById('selection-sort'));
sortButtons.push(document.getElementById('insertion-sort'));
sortButtons.push(document.getElementById('merge-sort'));
sortButtons.push(document.getElementById('quick-sort'));

// Sleeps program
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Generates new array
const generateArray = (size) => {
    array = [];
    for (let i = 0; i < size; i++)
        array.push(Math.floor(Math.random() * (MAX_VAL - MIN_VAL)) + MIN_VAL);
    return array;
};

// Populates html div with the array bars
const populateArray = () => {
    arrayDiv.textContent = ''; // Clear html array container
    maximum = Math.max(...array);
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.id = i;
        arrayDiv.append(bar);
        updateHeight(i);
    }
};

// Generates new array and fills it into html
const newArrayExecute = () => {
    const arraySize = document.getElementById('array-size');
    array = generateArray(parseInt(arraySize.value));
    populateArray(array);
};

const updateHighlight = () => {
    sortButtons.forEach((button) => {
        button.style.color =
            button.textContent === selectedSort ? '#F4A261' : 'white';
    });
};

const updateColor = (idx, color) => {
    console.log(idx);
    document.getElementById(idx).style.backgroundColor = color;
};

const updateHeight = (idx) => {
    const height = Math.floor((100 * array[idx]) / maximum);
    const bar = document.getElementById(idx);
    bar.style.height = `${height}%`;
};

// Swap adjacent elements in the array
const swap = (i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
    updateHeight(i);
    updateHeight(j);
};

// Disable buttons
const disableButtons = () => {
    settingButtons.forEach((button) => {
        button.disabled = true;
    });
    sortButtons.forEach((button) => {
        button.disabled = true;
    });
};

// Enable buttons
const enableButtons = () => {
    settingButtons.forEach((button) => {
        button.disabled = false;
    });
    sortButtons.forEach((button) => {
        button.disabled = false;
    });
};

const getDurationMS = () => {
    return 1350 / array.length;
};

// Main Sort
const runSort = () => {
    if (selectedSort === 'Bubble Sort') runBubbleSort();
    if (selectedSort === 'Selection Sort') runSelectionSort();
    if (selectedSort === 'Insertion Sort') runInsertionSort();
    if (selectedSort === 'Merge Sort') runMergeSort();
    if (selectedSort === 'Quick Sort') runQuickSort();
};

// Bubble sort
const runBubbleSort = async () => {
    disableButtons();

    for (let i = 0; i < array.length; i++) {
        let isSorted = true;
        for (let j = 0; j < array.length - 1 - i; j++) {
            updateColor(j, SWAP_COLOR);
            updateColor(j + 1, SWAP_COLOR);
            await delay(getDurationMS());
            if (array[j + 1] < array[j]) {
                swap(j, j + 1);
                isSorted = false;
            }
            updateColor(j, NORMAL_COLOR);
        }
        updateColor(array.length - 1 - i, SORTED_COLOR);
        if (!isSorted) continue;
        for (let j = array.length - 2 - i; j >= 0; j--) {
            updateColor(j, SORTED_COLOR);
            await delay(getDurationMS());
        }
        break;
    }

    enableButtons();
};

// Selection Sort
const runSelectionSort = async () => {
    disableButtons();

    for (let i = 0; i < array.length; i++) {
        let smallestIdx = i;
        let incCount = 0;
        updateColor(i, HIGHLIGHT_COLOR);
        for (let j = i + 1; j < array.length; j++) {
            incCount += array[j] > array[j - 1];
            updateColor(j, SWAP_COLOR);
            await delay(getDurationMS());
            if (array[j] < array[smallestIdx]) {
                updateColor(smallestIdx, NORMAL_COLOR);
                smallestIdx = j;
                updateColor(j, HIGHLIGHT_COLOR);
            }
            if (j != smallestIdx) updateColor(j, NORMAL_COLOR);
        }
        swap(i, smallestIdx);
        updateColor(smallestIdx, NORMAL_COLOR);
        updateColor(i, SORTED_COLOR);
        // if (incCount + 1 != array.length - i) continue;
        // for (let j = i + 1; j < array.length; j++) {
        //     updateColor(j, SORTED_COLOR);
        //     await delay(getDurationMS());
        // }
        // break;
    }

    enableButtons();
};

// Insertion Sort
const runInsertionSort = async () => {
    disableButtons();

    for (let i = 0; i < array.length; i++) updateColor(i, NORMAL_COLOR);
    await delay(getDurationMS());

    for (let i = 0; i < array.length; i++) {
        updateColor(i, HIGHLIGHT_COLOR);
        for (let j = i - 1; j >= 0; j--) {
            updateColor(j, HIGHLIGHT_COLOR);
            await delay(getDurationMS());
            if (array[j] <= array[j + 1]) {
                updateColor(j, SORTED_COLOR);
                updateColor(j + 1, SORTED_COLOR);
                break;
            }
            updateColor(j + 1, SORTED_COLOR);
            swap(j, j + 1);
        }
        updateColor(0, SORTED_COLOR);
    }

    enableButtons();
};

// Merge Sort Helper
const mergeSort = async (left, right) => {};

// Merge Sort
const runMergeSort = async () => {
    disableButtons();

    await mergeSort(0, array.length - 1);

    enableButtons();
};

// Quick Sort Partition
const partition = async (left, right) => {
    if (left >= right) {
        if (left === right) updateColor(left, SORTED_COLOR);
        return;
    }
    let i = left;

    updateColor(i, SWAP_COLOR);
    for (let j = left; j < right; j++) {
        updateColor(j, SWAP_COLOR);
        await delay(getDurationMS());
        if (array[right] > array[j]) {
            updateColor(i, NORMAL_COLOR);
            swap(i++, j);
            updateColor(i, SWAP_COLOR);
        }
        updateColor(j, NORMAL_COLOR);
    }

    swap(i, right);
    updateColor(i, SORTED_COLOR);
    return i;
};

// Quick Sort Helper
const quickSort = async (left, right) => {
    if (left >= right) {
        if (left === right) updateColor(left, SORTED_COLOR);
        return;
    }

    const pivot = await partition(left, right);

    await quickSort(left, pivot - 1);
    await quickSort(pivot + 1, right);
};

// Quick Sort
const runQuickSort = async () => {
    disableButtons();

    await quickSort(0, array.length - 1);

    enableButtons();
};

/*
MAIN
*/
const main = async () => {
    newArrayExecute();
    updateHighlight();

    // Event Listeners
    const newArray = document.getElementById('new-array');
    newArray.addEventListener('click', newArrayExecute);
    const arraySize = document.getElementById('array-size');
    arraySize.addEventListener('change', newArrayExecute);

    // Sorting buttons
    sortButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedSort = button.textContent;
        });
        button.addEventListener('click', updateHighlight);
    });
    // Run sort button
    const runSortBtn = document.getElementById('run-sort');
    runSortBtn.addEventListener('click', runSort);
};

main();
