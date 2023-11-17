// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const genRand = (min = 0, max = 1) => Math.floor(Math.random() * (max - min)) + min;

// Function to prompt user for password options
const getPasswordOptions = () => {
  const choices = {
    lowercase: {
      charSet: lowerCasedCharacters
    },
    uppercase: {
      charSet: upperCasedCharacters
    },
    numeric: {
      charSet: numericCharacters
    },
    special: {
      charSet: specialCharacters
    }
  };

  let answer, len, valid;
  
  // initialise choices object with default 'wanted' values
  for (let type in choices)
    type.wanted = false;

  do {
    // get length
    do {
      valid = true;
      answer = Number.parseInt(prompt("How many characters? (between 8 and 128)"));
      if ((!answer) || (answer < 8 || answer > 128)) {
        alert("Error: invalid input");
        valid = false;
      } else
        len = answer;
    } while (!valid);
    
    // get character types to be used
    for (let type in choices) {
      do {
        valid = true;
        answer = prompt(`Would you like ${type} characters? (y/n)`)[0].toLowerCase();
        if (!("yn".includes(answer))) {
          alert("Error: invalid input");
          valid = false;
        }
      } while (!valid);
      if (answer === 'y') {
        choices[type].wanted = true;
        if (!valid) 
          valid = true;
      }
    }

    if (!valid) 
      alert("Error: you must choose at least one option");
  } while (!valid);
  
  // gets rid of types that the user doesn't want
  for (let type in choices)
    if (!(choices[type].wanted))
      delete choices[type];

  return [len, choices];
}

// Function for getting a random element from an array
const getRandom = (arr) => arr[genRand(0, arr.length)];

/* Function to sort array, provided by freecodecamp.org
 * This is the "Fisher-Yates" algorithm */
const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; --i) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
};

// Function to generate password with user input
const generatePassword = () => {
  const [len, choices] = getPasswordOptions();
  const selectedTypes = Object.keys(choices); // get types that the user wants
  const result = [];

  // adds 1 character of every specified type
  for (let type in choices)
    result.push(getRandom(choices[type].charSet));
  
  // fill up the rest with randomly selected characters of a randomly selected type
  for (let i = selectedTypes.length; i < len; ++i)
    result.push(getRandom(choices[getRandom(selectedTypes)].charSet));

  shuffle(result); // just to make it less predictable
  return result.join('');
};

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);