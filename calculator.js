const numberbtns = document.querySelectorAll("[data-number]");
const allClear = document.querySelector(`[data-operator="AC"]`);
const clear = document.querySelector(`[data-operator="C"]`);
const percent = document.querySelector(`[data-operator="percent"]`);
const divide = document.querySelector(`[data-operator="divide"]`);
const multiply = document.querySelector(`[data-operator="multiply"]`);
const minus = document.querySelector(`[data-operator="minus"]`);
const plus = document.querySelector(`[data-operator="plus"]`);
const plusminus = document.querySelector(`[data-operator="plus-minus"]`);
const point = document.querySelector(`[data-operator="point"]`);
const equal = document.querySelector(`[data-operator="equal"]`);
const display = document.querySelector(".display");
const display1 = document.querySelector(".displayone");
const display2 = document.querySelector(".displaytwo");


const operatorSymbols = {
    'divide': '÷',
    'multiply': '×',
    'minus': '-',
    'plus': '+',
};

numberbtns.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
          if (currentvalue === '0') {
            currentvalue = number;
        } else {
            currentvalue += number;
        }
        display2.textContent=currentvalue;
    })
});

allClear.addEventListener("click",()=>{
    display1.textContent='';
    currentvalue='';
    display2.textContent='';
    previousvalue='';     
});

clear.addEventListener("click", () => {
    if (display2.textContent.length > 0) {
        currentvalue = currentvalue.slice(0, -1);
        display2.textContent = Number(currentvalue);
    }
})

percent.addEventListener('click', () => {
    if(previousvalue){
        currentvalue = (parseFloat(previousvalue)*(parseFloat(currentvalue)/100)).toString();
        display2.textContent= currentvalue
    }
    else{
    currentvalue = (parseFloat(currentvalue) / 100).toString();
    display2.textContent = currentvalue;
    }
});

let previousvalue='';
let currentvalue='';
let operator=null;
let reset = false;
let equalresult ='';

function operate(a, b, operator) {
    let x = parseFloat(a);
    let y = parseFloat(b);
    switch(operator) {
        case 'divide':
            return y === 0 ? 'Error' : x/y;
        case 'multiply':
            return x * y;
        case 'minus':
            return x - y;
        case 'plus':
            return x + y;
        default:
            return null;
    }
}

[divide, multiply, minus, plus].forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        if (operator && previousvalue && currentvalue) {
            currentvalue = operate(currentvalue, previousvalue, operator).toString();
        }
        
        previousvalue = currentvalue;
        operator = operatorBtn.getAttribute('data-operator');
        currentvalue = '';
        

        display1.textContent = `${previousvalue} ${operatorSymbols[operator]}`;
        display2.textContent = '';
        equalresult=previousvalue;
    });
});

equal.addEventListener('click', () => {
    if (previousvalue && currentvalue && operator) {
        currentvalue = operate(previousvalue, currentvalue, operator).toString();
        display2.textContent = currentvalue;
        display1.textContent = '';
        previousvalue = '';
        operator = null;
    }
});

plusminus.addEventListener('click', () => {
    if (currentvalue !== '') {
        currentvalue = (parseFloat(currentvalue) * -1).toString();
        display2.textContent = currentvalue;
    }
});

point.addEventListener('click', () => {
    if (!currentvalue.includes('.')) {
        currentvalue += '.';
        display2.textContent = currentvalue
    }
});