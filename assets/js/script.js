
// Global 
var arraySplit = ""; // Used to translate input array back to the user as a string with slice
var exitApplication = false; // on/off switch for running the app
var userInput = ""; // will be used to generate password based on criteria
var finalPassword = ""; // used as a variable to store temporatly a random passoword.
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
   userInput = ""; // will be used to generate password based on criteria
   finalPassword = ""; // used as a variable to store temporatly a random passoword.
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
                // Continue with the application. 
    userInput = userInput.split(" ");
    // Take the userInput array and slice it from positon 0 to the length of the array in order to display it back to the user as string.
    arraySplit = userInput.slice(0,userInput.length);
  
    window.alert("You have selected: " + arraySplit);
    validInput = false;
      
    // Create a loop to determine if valid criteria input passed
    for (var i = 0; i < userInput.length; i++) {
      // Take one item from the user input and move to an integer for our switch case.
      var inputCriteria = userInput[i];
      // Convert this output into integer for further validation
      var inputCriteriaInteger = parseInt(inputCriteria);
      // Switch case with fall through logic to arrive at conclusions
      switch(inputCriteriaInteger) { // fall through takes care of at least one option is selected.
        case 1:
        case 2:
        case 3:
        case 4:

          break;
        default: // catch non integers here
          if (!inputCriteriaInteger) { // catch Nulls NaN etc. divert it for a !inputCriteriaInteger conditional statement
            window.alert("Please select a criteria using numbers and only from 1-4 seprated by one space.\nRestarting application");
            generatePassword(); // back to our function to start the criteria selection again.
          }
          else { // If not !inputCriteriaInteger means that we have non integers here.
            window.alert(" Please select a criteria using numbers and only from 1-4 seprated by space.\n\n" + "User input: " + inputCriteria + " is invalid");
            generatePassword(); // back to our function to start the criteria selection again.
          } 
      }
    }

                                

    // Validate for duped entries by checking the userInput
    var duplicatePassState = true;
    
    var validateInput = [];
    var round1Shift = "";
    var round1Pop = "";
    var criteria3 = "";
    var criteria4 = "";
    var validateInputArray = []

    // Check if only one input was provided to avoid checking for doubles
    if (userInput.length == 1) {
      duplicatePassState = false;
    }

      // Check for doubles and send the user back to the generatePassword(); function.
      while (duplicatePassState) {

        //Create array using values
        var tempVar = "";
        for (var i = 0; i < userInput.length; i++) {
          tempVar = userInput[i];
          validateInput.push(tempVar);
        }

        // First check will pass, then second will be checked for doubles
        // nested if statement on else will be used for this
        round1Shift = validateInput.shift();
        round1Pop = validateInput.pop();
        if (round1Shift === round1Pop) {
          window.alert("Duplication detected, please check criteria rules.");
          generatePassword();
        } 
        
        else {
          // Logic is that if you shift and pop you will be left with 4 items, more than is also validated on other sections.
          // If e.g 1, 2, 1, 3. shift and pop are 1 3 then those are compared with the round do of shift and pop which is 2 and 1.
          //debugger;
          var round2Shift = "";
          var round2Pop = "";
          round2Shift = validateInput.shift();
          round2Pop = validateInput.pop();

          // Validate undefined shift and pop. This will then say that first pass was ok. and there is nothing else to check

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
          }
            else if (round1Shift === round1Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } else if (round2Shift === round2Pop) {
            window.alert("Duplication detected, please check criteria rules.");
            generatePassword();
          } 
          else {
            
            duplicatePassState = false;
          }
        } 
      }
    }
  }
}

function passlength () { // This functions validate the user input for length 

  // Ask user for length of password.
  window.alert("How long do you want your password to be from 8-128 characters.\n E.g 20");
  var plength = parseInt(window.prompt("Please enter length")); // Convert to integer
  if (plength < 8 || plength > 128) {
    
    window.alert("Please enter a valid number between 8-128");
    passlength();

  } else if (!plength) { // If null or Nan we will send the user back to the passlength() function.
    window.alert("Please enter a valid number between 8-128")
    passlength(); // back to our function the get length.
  } else {
    window.alert("You have entered a valid length of: " + plength + "\n Password will now be generated");
    return plength; // We have a valid length, lets return our plength value.
  }
}


function generatePasswordRandomness(userInput, plength) {
  // Sample will be 5 characters for our test

  var valueRandom = 0;
    
  //var counter = 1; // Counter for the while loop
  // We need to at a minimum use the criteria from user first as a "round"
  // E.g 5 length selected by user. First round of user input e.g 1 2, length of 2 is the array. Therefore I need sample 5 (length selected by user)-2(User-input).
  // Round of 2 and 6 
  var counter = userInput.length 
  var UserCounter = userInput.length 
  var finalPassword = "";  // Used to stored concatenate the strings together to finally assign to our displayPassword.

  // guarantee user.lenth criteria rounds of purely criteria with random
  for (var i = 0; i < userInput.length; i++) {

    var guaranteedCriteria = userInput[i];
    // Produce string randomness around the userInput criteria of 1-4.
    if (guaranteedCriteria === "1") {
      //Round to the lowest number(floor) after a random(Math.random) all possible alphabetical characters of 26 which will yield 0-25 
      valueRandom = Math.floor(Math.random() * 26);
      // call the pCritera uppercase object and pick a random index and concatenate to our finalPassword variable.
      finalPassword += pCriteria.lowercase.criteria[valueRandom];

    } else if (guaranteedCriteria === "2") {
      
      valueRandom = Math.floor(Math.random() * 26);
      finalPassword += pCriteria.uppercase.criteria[valueRandom];

    } else if (guaranteedCriteria === "3") {

      //Round to the lowest number(floor) after a random(random) of all possible numerals 0-9.
      valueRandom = Math.floor(Math.random() * 10);
      finalPassword += pCriteria.numeric.criteria[valueRandom];

    } else if (guaranteedCriteria === "4") {

      ///Round to the lowest number(floor) after a random(Math.random) of all possible symbols 30 which will yield 0-19.
      valueRandom = Math.floor(Math.random() * 31);
      finalPassword += pCriteria.symbols.criteria[valueRandom];
    } 
  }

  // finish with the rest of the p.length. 2 < 8.
  while ( counter < plength )  {

    // Take one item/index from the user input
    // length is 4 the index is 3. We need plus 1 to actually inclue the number they selected using the Math.floor and Math.random 
    // Catch any undefined or Nan and reduce the UserCounter in order to randomize. Will probably not be required because of prior validations.
    if (!userInput[(UserCounter - 1)]) {
      // E.g (without the +1) 0 3 but will not include 3, therefore we need +1. That will be 0-4 round down to 3.
      
      UserCounter -= Math.floor( ( (Math.random() * userInput.length) + 1) );
      counter += 1;
  
    } else {
      // Generate random for first round of random and add the counter for the random switch cases 
      UserCounter = Math.floor( ( (Math.random() * userInput.length) + 1) );
      counter += 1;
    }

    
    //UserCounter used as the random index to tacke the cases which will then randomly get the criteria from the pCriteria object.
    var inputCriteria = userInput[(UserCounter - 1)];
    
    // Make sure the input is an integer 
    var inputCriteriaInteger = parseInt(inputCriteria);

    switch(inputCriteriaInteger) { // Switch case with inputCriteriaInteger to check our userInput criteria. 
      case 1:
        // Same logic as above but now for the rest of the length provided by user. On our case 8 times.
        valueRandom = Math.floor(Math.random() * 26);
        finalPassword += pCriteria.lowercase.criteria[valueRandom];
          break; 
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
  // finalPassword back to displayPassword
  return finalPassword;
}


  
// Write password to the #password input
function writePassword() {
 
  //initilaize all global variables
  arraySplit = ""; 
  exitApplication = false; 
  userInput = ""; 
  finalPassword = ""; 
  displayPassword = ""; 
  window.alert(" Lets check our password criteria options");
  var password = generatePassword(); 
  var plength = passlength();
 
  displayPassword = generatePasswordRandomness(userInput,plength);


  var passwordText = document.querySelector("#password"); 
  

  document.getElementById("password").readOnly = false; 
  document.getElementById("password").value = displayPassword; 
  document.getElementById("password").readOnly = true; 

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);