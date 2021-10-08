// queryselectorAll - returns all elements that matches the specified attribute selector
// queryselector - returns only one element

//continue from 31:56

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        //sets the value of this to new empty object created 
        //whatever added after this. is property added to that empty obj
        //const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
       

    }

    
    delete(){
    //  console.log("delete method : " + typeof this.currentOperand)
      this.currentOperand = this.currentOperand.slice(0,-1);
    }

    // what happens to numb when users click on it
    appendNumber(number){
        // var nums = 2929;
        // this.currentOperand =  nums.toString()+ number.toString();
        //(6)script.js:40 29291

        //if user enters '.' more than one time 
        //it returns and does not execute 2nd statement of this func
        if(number === '.'  && this.currentOperand.includes('.')) return
        this.currentOperand =  this.currentOperand.toString()+ number.toString();
        
    }

    chooseOperation(operation){
      //this code will not execute the other statements
      //below it when this.currentOperand is empty

      //cohersion is used: '===='
     //  eg: 2 num data type becomes "2"  string data type
    // relation is right data type becomes data type of left data type
  // so better to use 3 ===
        if (this.currentOperand === '') return;

        if (this.currentOperand !== ''){
          this.compute();
        }

        this.operation =  operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        console.log(`Previouse Operand : _ ${this.previousOperand}`);
        console.log(`Current Operand : _ ${this.currentOperand}`);
    }
    
    compute(){
      console.log("inside compute()")
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      //check previous or current operand is not empty
      if (isNaN(prev) || isNaN(current)) return;
      console.log("!!inside swtich statement");
      switch (this.operation) {
        
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ' ';

    }

    updateDisplay(){ 
        this.currentOperandTextElement.innerText =   this.currentOperand;
        if(this.operation != null){
          this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else{
          this.previousOperandTextElement.innerText = ''
        }
       
        console.log("currentDisplay "+ this.currentOperandTextElement.innerText);
        console.log("previousDisplay " + this.previousOperandTextElement.innerText);
        //same log with debug statement
        // console.log("current " + this.currentOperandTextElement.innerText);
        // console.log("previous " + this.previousOperandTextElement.innerText);
      
        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// calculator Class
console.log("@@@@ " + previousOperandTextElement + ': ' + currentOperandTextElement)
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  })

  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  })

  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  })