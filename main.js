// WAVE

// Global Variables

var colorOne = '33303d';
var colorTwo = 'd1a471';
var backgroundColor = '#000'

var colorOneNum = parseInt(colorOne, 16);
var colorTwoNum = parseInt(colorTwo, 16);

var colorOneRGB = colorOne.match(/.{1,2}/g);
var colorTwoRGB = colorTwo.match(/.{1,2}/g);


const diff = Math.abs(colorOneNum - colorTwoNum);

var running_wave = true;
const columns = new Array(parseInt(window.screen.width / 18)).fill(0);
var limitCells = 20;
var speedWave = 50;
var sinoidH = 15;
var waveWidth = 10;

// -------  Global Variables  --------

// Button Sections

const pauseBtn = document.getElementById("pause-wave");

pauseBtn.addEventListener('click', function () {
    running_wave = false;
});

const playBtn = document.getElementById("play-wave");

playBtn.addEventListener('click', function () {
    running_wave = true;
    generateLoop();
});

const clearBtn = document.getElementById("clear-wave");
clearBtn.addEventListener('click', clearWave);

const changeColor = document.getElementById('change-color');
changeColor.addEventListener('click', () => {
    const container = document.getElementsByClassName('change-color-options')[0];
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }
})

// -------  Button Sections  --------

// INPUT SECTION ---------------------

function isHexColor(hex) {
    console.log('Hex => ', hex)
    return typeof hex === 'string'
        && hex.length <= 6
        && !isNaN(Number('0x' + hex))
}

function handlePrefixInput(e, element) {
    console.log('value => ', e.target.value);
    element.value = element.value && element.value.includes('#') ? e.target.value : "#"
}

function handleInput(e, element, warningId) {
    console.log('e => ', e.target.value)
    if (!e.target.value) {
        element.value = "#"
    }
    if (e.target.value.length > 7) {
        element.value = String(e.target.value).substr(0, 7);
    }
    const elementWarning = document.getElementById(warningId);
    if (!isHexColor(e.target.value.replace(/[^A-Za-z0-9]/g, ""))) {
        elementWarning.innerHTML = 'Wrong color hexadecimal format'
        elementWarning.style.display = 'flex';
    } else {
        elementWarning.style.display = 'none';
    }
}


const inputBackgroundColor = document.getElementById('inputBackgroundColor');
inputBackgroundColor.addEventListener('mousedown', (e) => handlePrefixInput(e, inputBackgroundColor))
inputBackgroundColor.addEventListener('input', (e) => handleInput(e, inputBackgroundColor, 'inputBackgroundColorWarning'));
const inputPrimaryColor = document.getElementById('inputPrimaryColor');
inputPrimaryColor.addEventListener('mousedown', (e) => handlePrefixInput(e, inputPrimaryColor))
inputPrimaryColor.addEventListener('input', (e) => handleInput(e, inputPrimaryColor, 'inputPrimaryColorWarning'));
const inputSecondaryColor = document.getElementById('inputSecondaryColor');
inputSecondaryColor.addEventListener('mousedown', (e) => handlePrefixInput(e, inputSecondaryColor))
inputSecondaryColor.addEventListener('input', (e) => handleInput(e, inputSecondaryColor, 'inputSecondaryColorWarning'));


inputBackgroundColor.onchange = (element) => {
    document.getElementsByClassName('main-screen')[0].style.backgroundColor = element.target.value
}
inputPrimaryColor.onchange = (element) => {
    colorOne = element.target.value.replace(/[^A-Za-z0-9]/g, "");
    colorOneNum = parseInt(colorOne, 16);
    colorOneRGB = colorOne.match(/.{1,2}/g);
}
inputSecondaryColor.onchange = (element) => {
    colorTwo = element.target.value.replace(/[^A-Za-z0-9]/g, "");
    colorTwoNum = parseInt(colorTwo, 16);
    colorTwoRGB = colorTwo.match(/.{1,2}/g);
}

// Amplitude
const amplitude = document.getElementById('amplitude');
amplitude.oninput = (e) => {
    limitCells = e.target.value;
}

// Width Wave

const widthWave = document.getElementById('wave-width');
widthWave.oninput = (e) => {
    waveWidth = e.target.value;
}

// Speed Wave
const waveSpeed = document.getElementById('wave-speed');
waveSpeed.oninput = (e) => {
    speedWave = e.target.value;
}

// ----------- INPUT SECTION ----------

// Functions Sections

function onChangeInputColor(e) {
    console.log('e => ', e);
}

function turnNumToHex(num) {
    return `${num < 16 ? '0' : ''}${Math.floor(num).toString(16)}`;
}
function turnHexToNum(hex) {
    return parseInt(hex, 16);
}

function clearWave() {
    const waveDisplay = document.getElementsByClassName('wave-display')[0];
    waveDisplay.innerHTML = "";
}

function genRandomAmountCell(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateLoop() {
    if (running_wave) {
        setTimeout(callback, speedWave);
    }
}

function callback() {
    console.log('Gerando a Onda');
    generateWave();
    generateLoop();
};
// --------- Functions Sections ----------

function generateWave() {
    clearWave();
    for (let _i = 1; _i < columns.length; _i++) {
        const display = window.document.getElementsByClassName('wave-display')[0];
        const column = document.createElement("DIV");
        display.appendChild(column)
        column.classList.add('wave-column');
        const amountCells = parseInt((limitCells / 2) * Math.sin((_i + sinoidH) / waveWidth)) + (limitCells / 2);

        for (let i = 0; i < amountCells; i++) {
            const rgbDiffsOnlyNum = [
                Math.abs(turnHexToNum(colorOneRGB[0]) - turnHexToNum(colorTwoRGB[0])),
                Math.abs(turnHexToNum(colorOneRGB[1]) - turnHexToNum(colorTwoRGB[1])),
                Math.abs(turnHexToNum(colorOneRGB[2]) - turnHexToNum(colorTwoRGB[2])),
            ];


            const rgbDiffStage = [
                parseInt((rgbDiffsOnlyNum[0] / limitCells) * i),
                parseInt((rgbDiffsOnlyNum[1] / limitCells) * i),
                parseInt((rgbDiffsOnlyNum[2] / limitCells) * i),
            ];

            const newColor = `#${turnNumToHex(turnHexToNum(colorOneRGB[0]) + rgbDiffStage[0] > 255 ? turnHexToNum(colorOneRGB[0]) - rgbDiffStage[0] : turnHexToNum(colorOneRGB[0]) + rgbDiffStage[0])}${turnNumToHex(turnHexToNum(colorOneRGB[1]) + rgbDiffStage[1] > 255 ? turnHexToNum(colorOneRGB[1]) - rgbDiffStage[1] : turnHexToNum(colorOneRGB[1]) + rgbDiffStage[1])}${turnNumToHex(turnHexToNum(colorOneRGB[2]) + rgbDiffStage[2] > 255 ? turnHexToNum(colorOneRGB[2]) - rgbDiffStage[2] : turnHexToNum(colorOneRGB[2]) + rgbDiffStage[2])}`;

            const _stage = document.createElement("DIV");
            _stage.classList.add("wave-cell")
            _stage.style.height = '10px';
            _stage.style.width = '10px';
            _stage.style.backgroundColor = newColor;
            column.appendChild(_stage);
        }
    }
    const firstColumn = columns.splice(0, 1)[0];
    columns.push(firstColumn);
    sinoidH = sinoidH + 1;
};

generateLoop();


// Force Style
function changeButtons() {

    const _buttons = window.document.getElementsByClassName('buttons');
    const labels = window.document.getElementsByClassName('config-labels');
    for (let i = 0; i < _buttons.length; i++) {
        _buttons[i].style.backgroundColor = `#${colorOne}`
        _buttons[i].classList.remove(colorOneNum > 5000000 ? 'light' : 'dark')
        _buttons[i].classList.add(colorOneNum > 5000000 ? 'dark' : 'light')
    }
    for (let i = 0; i < labels.length; i++) {
        labels[i].classList.remove(colorOneNum > 5000000 ? 'light' : 'dark')
        labels[i].classList.add(colorOneNum > 5000000 ? 'dark' : 'light')
    }

};

changeButtons();