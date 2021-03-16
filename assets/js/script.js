// Password object
var password = {
  generatedPwd: "",
  length: 0,
  hasLowerCase: false,
  hasUpperCase: false,
  hasSymbols: false,
  hasNumbers: false,
  
  /**
   * Checks if user's input of  password length is integer and length is between 8 and 128.
   */
  isValidLength: function() {
    return !isNaN(this.length) && 
              (this.length >= 8 && this.length <= 128);
  },
  
  /**
   * Checks that user has selected at least one criteria
   */
  isValidCriteria: function() {
    return this.hasLowerCase || this.hasUpperCase || 
          this.hasSymbols || this.hasNumbers;
  },
  
  /**
   * Resets primary attributes of the Password object.
   */
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
  //Ask user for password's length
  password.length = window.prompt("Enter length of password between 8 and 128");
  if(!password.isValidLength()) {
    return alert(password.length + " is not a valid length");
  } 
  
  //Ask user for password criteria
  promptPasswordCriteria();
  if(!password.isValidCriteria()) {
    return alert("One criteria must be selected");
  }

  //Get required criteria & make up password with these requirements.
  var criteriaSelected = getCriteriaSelection();
  makePwdWithRequiredCriteria(criteriaSelected);
  
  //fill the rest of the password with random characters in the selection criteria.
  for(var i = criteriaSelected.length; i < password.length; i++) {
    password.generatedPwd = password.generatedPwd.concat(getRandomChar(criteriaSelected));
  }

  return password.generatedPwd;
}

//Asks user for password crtieria
function promptPasswordCriteria() {
  password.hasLowerCase = window.confirm("Password to contain lowercase?");
  password.hasUpperCase = window.confirm("Password to contain uppercase?");
  password.hasSymbols = window.confirm("Password to contain symbols?");
  password.hasNumbers = window.confirm("Password to contain numbers?");
}

//Creates the first few letters of password with required criteria
function makePwdWithRequiredCriteria(criteriaSelected) {
  for(var i = 0; i < criteriaSelected.length; i++ ) {
    var criteriaName = criteriaSelected[i];
    var criteriaValues = selections[criteriaName];

    var randomIdx = getRandomNumber(criteriaValues.length);
    password.generatedPwd = password.generatedPwd.concat(criteriaValues[randomIdx]);
  }
}

//Computes a random number
function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

//Gets a random character from the given criteria
function getRandomChar(criteriaSelected) {
  var randomIdx = getRandomNumber(criteriaSelected.length);
  var criteria = selections[criteriaSelected[randomIdx]];

  var charIdx = getRandomNumber(criteria.length);
  return criteria[charIdx];
}

//collects all the criteria names that were selected by user
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

// Write password to the #password input
function writePassword() {
  password.reset();
  var passwordText = document.querySelector("#password");
  passwordText.value = generatePassword();
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);
