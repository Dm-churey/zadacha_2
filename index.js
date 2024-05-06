let display = document.getElementById('display');
let finish = false;
let firstInput = true;
let lastOperator = '';
let copiedText = '';
display.value = '0';

function addToDisplay(value) {
    
    if (value >= '0' && value <= '9' || value === '(' || value === ')' || value === '.' ) {
    
        if (firstInput) {
            display.value = '';
            firstInput = false;
        }
        if (finish && value == '.') {
            display.value = "0";
        }
        if (value === '(' || value === ')') {
            if (display.value.slice(-1) === value) {
                return;
            }
        } else if (value === '.') {
            if (display.value.slice(-1) === '.') {
                return;
            }
        }
        firstInput = false;
        finish = false;
        lastOperator = value;
        display.value += value;
    }
    else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (lastOperator === '+' || lastOperator === '-' || lastOperator === '*' || lastOperator === '/') {
            display.value = display.value.slice(0, -1) + value;
        } 
        else {
            lastOperator = value;
            display.value += value;
        }
        firstInput = false;
        finish = false;
    }

    if (value === 'Enter' || value === '=') {
        finish = false;
        calculate();
    } else if (value === 'Backspace') {
        deleteLast();
    } else if (value === 'Delete') {
        clearAll();
    } else if (event.ctrlKey && event.key === 'c') {
        copyResult();
    } else if (event.ctrlKey && event.key === 'v') {
        pasteResult();
    }
    
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    addToDisplay(key);
});

function clearAll() {
    display.value = '0';
    finish = true;
    firstInput = true;
    lastOperator = '';
}

function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
        finish = true;
        firstInput = true;
        lastOperator = '';

    } else {
        if (display.value.slice(-1) === '+' || display.value.slice(-1) === '-' || display.value.slice(-1) === '*' || display.value.slice(-1) === '/') {
            lastOperator = '';
        }
        display.value = display.value.slice(0, -1);
    }
}

function copyResult() {
    copiedText = display.value;
    // display.select();
    // document.execCommand('copy');
}

function pasteResult() {
    if (copiedText !== '') {
        display.value = copiedText;
    } else {
        return;
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
        finish = true;
        firstInput = true;
        lastOperator = '';
    } catch (error) {
        display.value = '0';
        finish = true;
        firstInput = true;
        lastOperator = '';
    }
}
