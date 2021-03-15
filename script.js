// Password object
var password = {
  generatedPwd: "",
  length: 0,
  hasLowerCase: false,
  hasUpperCase: false,
  hasSymbols: false,
  hasNumbers: false,
  isValidCriteria: function() {
    return password.hasLowerCase || password.hasUpperCase || 
          password.hasSymbols || password.hasNumbers;
  },
  reset: function() {
    this.generatedPwd = "";
    this.length = 0;
  },
};

// Pre-defined choices for each selection criteria
var selections = {
  lowerCase: [],
  upperCase: [],
  numbers: [],
  symbols:[],
  init: function() {
    selections.lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
    selections.upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    selections.numbers = '0123456789'.split('');
    selections.symbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~".split("");
  }
}
selections.init();


/* 
 * Function to generate password by prompting user a few password criteria
 */
function generatePassword() {
  var passwordLength = window.prompt("Enter length of password between 8 and 128");
  if(!isValidLength(passwordLength)) {
    return alert(passwordLength + " is not a valid length");
  } 
  password.length = passwordLength;
  
  promptPasswordCriteria();
  if(!password.isValidCriteria()) {
    return alert("One criteria must be selected");
  }

  //Get required criteria & make up password with these requirements.
  var criteriaSelected = getCriteriaSelection();
  useRequiredCriteria(criteriaSelected);
  
  //fill the rest of the password with random characters in the selection criteria.
  for(var i = criteriaSelected.length; i < password.length; i++) {
    password.generatedPwd = password.generatedPwd.concat(getRandomChar(criteriaSelected));
  }

  return password.generatedPwd;
}

function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

function getRandomChar(criteriaSelected) {
  var randomIdx = getRandomNumber(criteriaSelected.length);
  var criteria = selections[criteriaSelected[randomIdx]];

  var charIdx = getRandomNumber(criteria.length);
  return criteria[charIdx];
}

function useRequiredCriteria(criteriaSelected) {
  for(var i = 0; i < criteriaSelected.length; i++ ) {
    var criteriaName = criteriaSelected[i];
    var selectedCriteria = selections[criteriaName];

    var randomIdx = Math.floor(Math.random() * selectedCriteria.length);
    password.generatedPwd = password.generatedPwd.concat(selectedCriteria[randomIdx]);
  }
}

function getCriteriaSelection() {
  var selectionsCriteria = [];
  if(password.hasLowerCase) {
    selectionsCriteria.push("lowerCase");
  }

  if(password.hasUpperCase) {
    selectionsCriteria.push("upperCase");
  }

  if(password.hasNumbers) {
    selectionsCriteria.push("numbers");
  }

  if(password.hasSymbols) {
    selectionsCriteria.push("symbols");
  }

  return selectionsCriteria;
}


function promptPasswordCriteria() {
  password.hasLowerCase = window.confirm("Password to contain lowercase?");
  password.hasUpperCase = window.confirm("Password to contain upper case?");
  password.hasSymbols = window.confirm("Password to contain symbols?");
  password.hasNumbers = window.confirm("Password to contain numbers?");
}

function isValidLength(passwordLength) {
  let isNumeric = function() {
    return !isNaN(passwordLength);
  }

  return isNumeric(passwordLength) && 
            (passwordLength >= 8 && passwordLength <= 128);
}


// Write password to the #password input
function writePassword() {
  password.reset();
  var passwordText = document.querySelector("#password");
  passwordText.value = password.generatedPwd;
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);
