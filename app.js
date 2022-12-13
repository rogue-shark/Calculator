class Calculator {
    constructor(prevOperand, currOperand) {
        this.prevOperand = prevOperand;
        this.currOperand = currOperand;
        this.clear()
    }

    clear() {
        this.currOperValue = ''
        this.prevOperValue = ''
        this.operator = ''
    }

    delete() {
        this.currOperValue = this.currOperValue.toString().slice(0, -1)
    }

    appendNum (number) {
        //only allowing to append/add one period
        if(number === '.' && this.currOperValue.includes('.')) return
        //adding numbers one after another as we click btns
        this.currOperValue = this.currOperValue.toString() + number.toString()
    }

    setOperator (operator) {
        if (this.currOperValue === '') return
        if (this.prevOperValue !== '') {
            this.eval()
        }
        this.operator = operator
        this.prevOperValue = this.currOperValue
        this.currOperValue = ''
    }

    eval() {
        let solvedVal
        const preValue = parseFloat(this.prevOperValue) //parses the string arg and return floating point number
        const currValue = parseFloat(this.currOperValue)

        if (isNaN(preValue) || isNaN(currValue)) return

        //all operations logic
        switch(this.operator) {
            case '+': 
            solvedVal = preValue + currValue
                break
            case '-': 
            solvedVal = preValue - currValue
                break
            case '*': 
            solvedVal = preValue * currValue
                break
            case '/': 
            solvedVal = preValue / currValue
                break
            default:
                return
        }

        this.currOperValue = solvedVal
        this.operator = ''
        this.prevOperValue = ''
    }

    getDisplayNum(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
    }
    }

    updateDisplay() {
        this.currOperand.innerText = this.getDisplayNum(this.currOperValue)
        if (this.operator !== null) {
             this.prevOperand.innerText = `${this.getDisplayNum(this.prevOperValue)} ${this.operator}`
        } else {
            this.prevOperand.innerText = ''
        }        
    }
}


const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const prevOperand = document.querySelector('[data-previous-operand]')
const currOperand = document.querySelector('[data-current-operand]') 


/*NOTE:  Hoisting - classes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#:~:text=Hoisting,can%20be%20constructed */
const calculator = new Calculator(prevOperand, currOperand)

//for number buttons
for (let btn of numButtons) {
    btn.addEventListener('click', () => {
        calculator.appendNum(btn.innerText)
        calculator.updateDisplay()
    })
}

//for operator buttons
for (let btn of opButtons) {
    btn.addEventListener('click', () => {
        calculator.setOperator(btn.innerText)
        calculator.updateDisplay()
    })
}

equalsButton.addEventListener('click', btn => {
    calculator.eval()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', btn => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', btn => {
    calculator.delete()
    calculator.updateDisplay()
})
