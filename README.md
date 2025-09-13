#### 1) What is the difference between var, let, and const?

Answer: Var is function-scoped and it can be re-declared and re-assigned or re-introduce,it causing potential bugs.Let is block-scoped and can be assigned again but not re-declared in the same scope.Const is also block-scoped and its value cannot be re-assigned or re-declared, making it ideal for fixed values.It's best practice to use const by default,then let,and avoid var.

#### 2) What is the difference between map(), forEach(), and filter()?

answer: map() is a method that creates a new array by calling a given function on every element in the calling array. forEach() triggers a given function once for each array element and returns undefined. filter() creates a new array with all elements that pass the test implemented by the given function.

#### 3) What are arrow functions in ES6?

answer: Arrow functions are a concise and modern way to write function declaration.They are defined using the =>(array) syntax and are often used for briefer, anonymous functions.Regular functions create their own this,
but arrow functions don’t.
They simply use the this from where they were written.

#### 4) How does destructuring assignment work in ES6?

answer: Destructuring assignment lets you easily take values out of arrays or objects and store them in separate variables.For arrays,the order matters.For objects,the property names matter.
It makes your code shorter and easier to read,especially when working with nested data.

#### 5) Explain template literals in ES6. How are they different from string concatenation?

answer: Template literals are strings written inside backticks (``).They let you easily put variables or expressions inside the string using ${}.You can also write multi-line strings without special characters.This is easier to read and better than joining strings with +.
