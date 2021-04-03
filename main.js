// WAVE

// Global Variables

var colorOne = '33303d';
var colorTwo = 'd1a471';

const colorOneNum = parseInt(colorOne, 16);
const colorTwoNum = parseInt(colorTwo, 16);

const colorOneRGB = colorOne.match(/.{1,2}/g);
const colorTwoRGB = colorTwo.match(/.{1,2}/g);


const diff = Math.abs(colorOneNum - colorTwoNum);

var running_wave = true;
const columns = new Array(parseInt(window.screen.width / 18)).fill(0);
var limitCells = 20;
var speedWave = 50;
var sinoidH = 15;

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

// -------  Button Sections  --------

// INPUT SECTION ---------------------

function isHexColor (hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
  }

const inputBackgroundColor = document.getElementById('inputBackgroundColor');
inputBackgroundColor.addEventListener('mousedown', (e) => {
    console.log('value => ', e.target.value);
    inputBackgroundColor.value = !inputBackgroundColor.value && "#"
})
inputBackgroundColor.addEventListener('input', (e) => {
    if(!isHexColor(e.target.value)) {
        
    }
})

// ----------- INPUT SECTION ----------

// Functions Sections

function onChangeInputColor(e) {
    console.log('e => ',e );
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
        const amountCells = parseInt((limitCells / 2) * Math.sin((_i + sinoidH) / 10)) + (limitCells / 2);

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
    for (let i = 0; i < _buttons.length; i++) {
        _buttons[i].style.backgroundColor = `#${colorOne}`
        _buttons[i].classList.remove(colorOneNum > 5000000 ? 'light' : 'dark')
        _buttons[i].classList.add(colorOneNum > 5000000 ? 'dark' : 'light')
    
    }
};

changeButtons();