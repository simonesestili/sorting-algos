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
