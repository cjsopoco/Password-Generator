
// Global Variables
var arraySplit = ""; // Used to translate input array back to the user as a string with slice
var exitApplication = false; // on/off switch for running the app
var userInput = ""; // will be used to generate password 
var finalPassword = ""; // used as a variable to store a random password 
var displayPassword = ""; // used to display the final password 

// Mutlidimenional object 
var pCriteria = {
  lowercase: { indexNumber: 0 , criteria: "abcdefghijklmnopqrstuvwxyz"
  },
  uppercase: { indexNumber: 1, criteria: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  numeric: { indexNumber: 2, criteria: "0123456789"
  },
    symbols: { indexNumber: 3, criteria: "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"
  }
}

// Call function to generate password criterias 
var generatePassword = function() {


   //initilaize all global variables
   arraySplit = ""; // Used to translate input array back to the user as a string with slice
   exitApplication = false; // on/off switch for running the app
   userInput = ""; // will be used to generate password 
   finalPassword = ""; // used as a variable to store a random password 
   displayPassword = ""; // used to display the final password 

  // Alert user for criteria
  window.alert("The criteria for password generator are lowercase, uppercase, numeric, and/or special characters.");

  var validInput = true;

  while(validInput) {
    // Take user input
    userInput = window.prompt("Select criteria for password (you can select more than one) (use space): 1=lowercase 2=uppercase 3=numeric 4=special characters.\n");
    if (!userInput) {
      window.alert("If you wish to close the application, please close this password generator tab.")
      generatePassword();
      } else if (userInput) {          
    userInput = userInput.split(" ");
    arraySplit = userInput.slice(0,userInput.length);
  
    window.alert("You have selected: " + arraySplit);
    validInput = false;
      
    // Create loop for the user input to determine if valid criteria input passed.
    for (var i = 0; i < userInput.length; i++) {
      var inputCriteria = userInput[i];
      // Convert this output into integer for further validation
      var inputCriteriaInteger = parseInt(inputCriteria);
      // Switch case with fall through logic to arrive at conclusions
      switch(inputCriteriaInteger) { // fall through takes care of at least one option is selected.
        case 1:
        case 2:
        case 3:
        case 4:
          //Our array is clean every time we fall through here. We then break to check the next index based on userInput.length
          break;
        default: // catch non integers here
          if (!inputCriteriaInteger) { // We are catching Nulls NaN etc. We will divert it for a !inputCriteriaInteger conditional statement.
            window.alert("Please select a criteria using numbers and only from 1-4 seprated by one space.\nRestarting application");
            generatePassword(); // start the criteria selection again.
          }
          else { // If not !inputCriteriaInteger means that we have non integers here.
            window.alert(" Please select a criteria using numbers and only from 1-4 seprated by space.\n\n" + "User input: " + inputCriteria + " is invalid");
            generatePassword(); // start the criteria selection again.
          } 
      }
    }

                                

    // Validate for duped entries
    var duplicatePassState = true;
    var validateInput = [];
    var round1Shift = "";
    var round1Pop = "";
    var criteria3 = "";
    var criteria4 = "";
    var validateInputArray = []

    // Check first if only one input was proviced to avoid checking for duplicity of criteria numbers.
    if (userInput.length == 1) {
      duplicatePassState = false;
    }

      // Check for duplicity of numbers and send the user back to the generatePassword(); function.
      while (duplicatePassState) {

        //Create array using values
        var tempVar = "";
        for (var i = 0; i < userInput.length; i++) {
          tempVar = userInput[i];
          validateInput.push(tempVar);
        }

        // First check will pass, then second will be checked for duplications
        round1Shift = validateInput.shift();
        round1Pop = validateInput.pop();
        if (round1Shift === round1Pop) {
          window.alert("Duplication detected, please check criteria rules.");
          generatePassword();
        } 
        
        else {
          //debugger;
          var round2Shift = "";
          var round2Pop = "";
          round2Shift = validateInput.shift();
          round2Pop = validateInput.pop();

          // This will then say that first pass was ok. 

          if(!round2Shift || !round2Pop) {
            duplicatePassState = false;
            break;
          }


          if (round1Shift === round2Shift) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } else if (round1Pop === round2Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } else if (round1Shift === round2Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } else if (round1Pop === round2Shift) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } // not be needed but left in case as it was done on previous if statement.
            else if (round1Shift === round1Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } else if (round2Shift === round2Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } 
          else {
            // Validation has been passed for duplication. Further validation below for numbers not on our case 1-4 and non integer values entered like "r".
            duplicatePassState = false;
          }
        } 
      }
    }
  }
}

function passLength () { // This functions validate the user input for length of characters from 8-128

  // Ask user for length of password.
  window.alert("How long do you want your password to be from 8-128 characters.\n E.g 20");
  var pLength = parseInt(window.prompt("Please enter length")); // Convert to ingteger to check valid input.
  if (pLength < 8 || pLength > 128) {
    
    window.alert("Please enter a valid number between 8-128");
    passLength();

  } else if (!pLength) { 
    window.alert("Please enter a valid number between 8-128")
    passLength(); 
  } else {
    window.alert("You have entered a valid length of: " + pLength + "\n Password will now be generated");
    return pLength; // We have a valid length, lets return our pLength value.
  }
}


function generatePasswordRandomness(userInput, plength) {
  // Sample will be 8 characters for our test
  // I need it to be from e.g 8--> 0 - 7 for my indexing array to be checked and printed later.
  var valueRandom = 0;
    
  //var counter = 1; // Counter for the while loop
  // We need to at a minimum use the criteria from user first as a "round"
  // E.g 8 length selected by user. First round of user input e.g 1 2,length of 2 is the array. Therefore I need sample 8 (length selected by user)-2(User-input).
  // Round of 2 (strict random in order) and 6 (random after round)
  var counter = userInput.length // Use as our while loop topmost.
  var UserCounter = userInput.length // Counter to say in line with the user input index to avoid undefines random attempts.
  var finalPassword = "";  // Used to stored concatenate the strings together to finally assign to our displayPassword.

  // We need to guarantee user.length criteria rounds of purely criteria with random
  for (var i = 0; i < userInput.length; i++) {

    var guaranteedCriteria = userInput[i];
    // Produce string randomness around the userInput criteria of 1-4.
    if (guaranteedCriteria === "1") {
      //Round to the lowest number(Math.floor) after a random(Math.random) all possible alphabetical characters of 26 which will yield 0-25 (note we have 0 index on our objects, so we are good)
      valueRandom = Math.floor(Math.random() * 26);
      // call the pCritera uppercase object and pick a random index and concatenate to our finalPassword variable.
      finalPassword += pCriteria.lowercase.criteria[valueRandom];

    } else if (guaranteedCriteria === "2") {
      
      valueRandom = Math.floor(Math.random() * 26);
      finalPassword += pCriteria.uppercase.criteria[valueRandom];

    } else if (guaranteedCriteria === "3") {

      //Round to the lowest number(Math.floor) after a random(Math.random) of all possible numerals 0-9.
      valueRandom = Math.floor(Math.random() * 10);
      finalPassword += pCriteria.numeric.criteria[valueRandom];

    } else if (guaranteedCriteria === "4") {

      ///Round to the lowest number(Math.floor) after a random(Math.random) of all possible symbols 30 which will yield 0-19.
      valueRandom = Math.floor(Math.random() * 31);
      finalPassword += pCriteria.symbols.criteria[valueRandom];
    } 
  }

  // Now that we finish and concatenaed our strinc user input criteria randomness, we move to finish with the rest of the p.length. Our example of 8 range is now 6 left or while  2 < 8.
  while ( counter < pLength )  {

    // Take one item/index from the user input
    // Length is 4 but the index is 3. We need plus 1 to actually inclue the number they selected using the Math.floor and Math.random selected.
    // Catch any undefined or Nan and reduce the UserCounter in order to randomize. Will probably not be required because of prior validations.
    if (!userInput[(UserCounter - 1)]) {
      // E.g (without the +1) 0 3 but will not include 3, therefore we need +1. That will be 0-4 round down to 3.
      // We are now at position undefined, therefore we need to remove one to be inside the userInput array.
      UserCounter -= Math.floor( ( (Math.random() * userInput.length) + 1) );
      counter += 1;
  
    } else {
      // Generate randomness for first round of randomness and add the counter for the random switch cases @ switch(inputCriteriaInteger)
      UserCounter = Math.floor( ( (Math.random() * userInput.length) + 1) );
      counter += 1;
    }

    // Length is 4 but the index is 3. Hence -1. 
    //UserCounter used as the random index to tacke the cases which will then randomly get the criteria from the pCriteria object.
    var inputCriteria = userInput[(UserCounter - 1)];
    
    // Make sure the input is an integer (it was validated in other areas of our code.)
    var inputCriteriaInteger = parseInt(inputCriteria);

    switch(inputCriteriaInteger) { // Switch case with inputCriteriaInteger to check our userInput criteria. 
      case 1:
        // Same logic as above but now for the rest of the length provided by user. On our case 8 times.
        valueRandom = Math.floor(Math.random() * 26);
        finalPassword += pCriteria.lowercase.criteria[valueRandom];
          break; // Completed, and check for next counter.
      case 2:
        valueRandom = Math.floor(Math.random() * 26);
        finalPassword += pCriteria.uppercase.criteria[valueRandom];
        break;
      case 3:
        valueRandom = Math.floor(Math.random() * 10);
        finalPassword += pCriteria.numeric.criteria[valueRandom];
        break;
      case 4:
        valueRandom = Math.floor(Math.random() * 31);
        finalPassword += pCriteria.symbols.criteria[valueRandom];
        break;
    }
  }
  // Our final password is ready to be returned! --> finalPassword back to displayPassword
  return finalPassword;
}


  
// Write password to the #password input
function writePassword() {
 
  //initilaize all global variables
  arraySplit = ""; // Used to translate input array back to the user as a string with slice
  exitApplication = false; // on/off switch for running the app
  userInput = ""; // Important - will be used to generate password based on criteria
  finalPassword = ""; // Important - used as a variable to store temporatly a random passoword.
  displayPassword = ""; // Impoprtant- used to display the final password on the text area of the HTML element.
  window.alert(" Lets check our password criteria options");
  var password = generatePassword(); // Call the generatePassword(). Global variable used instead for displayPassword.
  // Once we have achived valid criteria input, we want to tell the user what length hey want from 8-128 characters.
  // Call Function to validate length
  var pLength = passLength();
  // We are back from our passLenght() function with sucess.
  // We are now ready to gather our final pssword based on criteia and length. 
  // We then use our global variable displayPassword to store the output of our global finalPassword.
  // We then pass the valid userInput and Length selected by the user.
  displayPassword = generatePasswordRandomness(userInput,pLength);


  var passwordText = document.querySelector("#password"); // Part of the placholder text querySelectors will be part of later modules.
  
  //passwordText.value = password;
  document.getElementById("password").readOnly = false; // Text in enabled to allow the code to insert password into the text area.
  document.getElementById("password").value = displayPassword; // Display password in text area.
  document.getElementById("password").readOnly = true; // Disable the text area so user can only copy paste and not touch or modify the password provided.

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);