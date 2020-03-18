/****GLOBAL VARIABLES***/

const form = document.getElementsByTagName('form')[0];

//"Basic Info" section// 
//variables for the name & email inputs and their associated errors messages
const nameInput = document.getElementById('name'); //variable for form's 'name' input field
const nameError = document.createElement('span'); //first name error message
nameInput.appendChild(nameError);
nameError.className = "error";
nameError.textContent='This field cannot be left blank, you must type in your name. ';
const nameInputError= document.createElement('span'); //second name error message
nameInput.appendChild(nameInputError);
nameInputError.className="error";
nameInputError.textContent='You must type in a valid name. Only letters, spaces and hyphens are allowed, no numbers or symbols. No more than four names (hyphenated first or last names count as two names). No double or trailing spaces.';

const emailInput = document.getElementById("mail");//variable for form's 'email' input field
const emailError=document.createElement('span'); //first email error message
emailInput.appendChild(emailError);
emailError.className="error";
emailError.textContent='This field cannot be left blank, you must type in your email address.';
const emailInputError= document.createElement('span'); //second email error message
emailInput.appendChild(emailInputError);
emailInputError.className="error";
emailInputError.textContent='You must type in a valid email address, for example name@example.com';

const jobSelect = document.getElementById('title'); //job role select menu 
const otherJobText = document.getElementById('other-title'); //variable for the text field in the job role section

//"T-Shirt Info" section//
const designSelect = document.getElementById('design'); //"design" select menu
const colorDiv = document.getElementById('colors-js-puns');//"color" select menu div
const colorSelect = document.getElementById('color'); //"color" select menu

//"Register for Activities" section//

//variables for all the activities as a whole and for each individual activity input 
const activities = document.getElementById('activities'); //activities fieldset
const activitiesError= document.createElement('span');//error message for activity section
activities.appendChild(activitiesError);
activitiesError.className="error";
activitiesError.textContent='You must select at least one conference activity';

const labels = document.getElementsByTagName('label'); //labels (text) associated with each input

const mainConf = document.getElementById('main');
const mainConfLabel = labels[6];

const jsFrame = document.getElementById('js-frame');
const jsFrameLabel = labels[7];

const jsLibs = document.getElementById('js-libraries');
const jsLibsLabel = labels[8];

const express = document.getElementById('express-work');
const expressLabel = labels[9];

const nodeJS = document.getElementById('node-js');
const nodeJSLabel = labels[10];

const build = document.getElementById('build');
const buildLabel = labels[11];

const npm = document.getElementById('npm-work');
const npmLabel = labels[12];

//total cost of conference, dynamic total that will depend on activies selected
const total = document.getElementById('total');
let totalActivityCost = 0;

//"Payment Info" section//
const payment = document.getElementById('payment'); //payment method select menu
const paypal = document.getElementById('paypal'); //paypal div
const bitcoin = document.getElementById('bitcoin'); //bitcoin div
const creditCard = document.getElementById('credit-card'); //credit card div

//variables for credit card-related inputs and error messages for each variable
const ccNumber= document.getElementById('cc-num'); //credit card number input field
const ccNumberError = document.createElement('span'); //credit card number error message
ccNumber.appendChild(ccNumberError);
ccNumberError.className="error";
ccNumberError.textContent='You must type in a 13 to 16-digit credit card number';

const zip = document.getElementById('zip'); //zip code input field
const zipError = document.createElement('span'); //zip code error message
zip.appendChild(zipError);
zipError.className="error";
zipError.textContent='You must type in a 5-digit zip code';

const cvv = document.getElementById('cvv'); //cvv input field
const cvvError = document.createElement('span'); //cvv error message
cvv.appendChild(cvvError);
cvvError.className="error";
cvvError.textContent=`Please type your credit card's 3-digit CVV number`;

/****END OF GLOBAL VARIABLES***/


/***PAGE DEFAULT SETTINGS***/

//When the page first loads, the first text field ("name") is in focus 
nameInput.focus();

//hiding the "other" text field in the job role section. Text field will appear only if "other" selected from job role select menu
otherJobText.style.display = 'none'; 

//until a theme is selected from the t-shirt “Design” menu, the color label and it's select menu is hidden
colorDiv.style.display="none"
  
//hide "select payment method" option so user cannot select it as a payment option
payment.options[0].style.display='none';

//hide total cost for activities until at least one activity selected
total.style.display='none';
activitiesError.style.display='none';

//set credit card as default option on payment select menu
payment.selectedIndex = 1;

//hide other payment methods when credit card is selected
if (payment.selectedIndex === 1){
    creditCard.style.display = '';
    bitcoin.style.display ='none'; 
    paypal.style.display ='none'; 
}

/***END OF PAGE DEFAULT SETTINGS***/


/****(non-validation) EVENT LISTENERS BY SECTION***/

//"Basic Info" section's ”Job Role” select menu//

//display text field when "other" is selected, hide it when anything else is selected 
jobSelect.addEventListener("change", () => {
    if (jobSelect.value==="other"){
        otherJobText.style.display = ''; 
    } else {
        otherJobText.style.display ='none'; 
    }
});

//"T-Shirt Info" section// 

//event listener for "Design" select menu
designSelect.addEventListener("change", () => {
//if no shirt option selected, hide color section
    if (designSelect.value === "select theme") {
        colorDiv.style.display='none';
    }
//if "JS Puns" selected only show the color options associated with this theme
    if (designSelect.value === 'js puns') {
        colorDiv.style.display='';
        colorSelect.options[1].setAttribute("selected", true);
        colorSelect.options[0].removeAttribute("selected");
        colorSelect.options[4].removeAttribute("selected");
        colorSelect.style.display='';
        colorSelect.options[0].style.display='none';
        colorSelect.options[1].style.display='';
        colorSelect.options[2].style.display='';
        colorSelect.options[3].style.display='';
        colorSelect.options[4].style.display='none';
        colorSelect.options[5].style.display='none';
        colorSelect.options[6].style.display='none';
        }
    //if "Heart JS" selected only show the color options associated with this theme
    if (designSelect.value === "heart js") {
        colorDiv.style.display='';
        colorSelect.options[4].setAttribute("selected", true);
        colorSelect.options[0].removeAttribute("selected");
        colorSelect.options[1].removeAttribute("selected");
        colorSelect.style.display='';
        colorSelect.options[0].style.display='none';
        colorSelect.options[1].style.display='none';
        colorSelect.options[2].style.display='none';
        colorSelect.options[3].style.display='none';
        colorSelect.options[4].style.display='';
        colorSelect.options[5].style.display='';
        colorSelect.options[6].style.display='';
        }
});

//"Register for Activities" section// 

//event listener to display, add and subtract the total cost based on activities selected
activities.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;
    const activityCost = parseFloat(selectedActivity.dataset.cost);
    const totalDisplay = () => {
    if (totalActivityCost===0){
        total.style.display = 'none';
    } else {
        total.style.display = '';
    }
    };
    if (checked) {
        totalActivityCost+=activityCost;
        total.textContent = `Total: $${totalActivityCost}`;
        totalDisplay();
    } else {
        totalActivityCost-=activityCost;
        total.textContent = `Total: $${totalActivityCost}`;
        totalDisplay();
    }
});


//event listeners to only allow one workshop at the same date/time to be selected

//event listener to disable the Express Workshop input if the JS Frameworks Workshop is selected
jsFrame.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;

    if (checked) {
        //2nd if statement to make activities error message disappear if it was displayed because form was submitted without selecting an activity
        if (activitiesError.style.display===''){
            activitiesError.style.display='none';
        }
        expressLabel.className='disabled';
        express.disabled = true;
    } else {
        expressLabel.classList.remove('disabled');
        express.disabled = false;
    }
});

//event listener to disable the Node.js Workshop input if the JS Libraries Workshop is selected

jsLibs.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;

    if (checked) {
       //2nd if statement to make activities error message disappear if it was displayed because form was submitted without selecting an activity
       if (activitiesError.style.display===''){
        activitiesError.style.display='none';
    }
        nodeJSLabel.className='disabled';
        nodeJS.disabled = true;
    } else {
        nodeJSLabel.classList.remove('disabled');
        nodeJS.disabled = false;
    }
});

// event listener to disable the JS Frameworks Workshop input if the Express Workshop is selected
express.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;

    if (checked) {
       //2nd if statement to make activities error message disappear if it was displayed because form was submitted without selecting an activity
       if (activitiesError.style.display===''){
            activitiesError.style.display='none';
    }
        jsFrameLabel.className='disabled';
        jsFrame.disabled = true;
    } else {
        jsFrameLabel.classList.remove('disabled');
        jsFrame.disabled = false;
    }
});

//event listener to disable the JS Libraries Workshop input if the Node.js Workshop is selected
nodeJS.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;

    if(checked){
       //2nd if statement to make activities error message disappear if it was displayed because form was submitted without selecting an activity
       if (activitiesError.style.display===''){
            activitiesError.style.display='none';
    }
        jsLibsLabel.className='disabled';
        jsLibs.disabled = true;
    } else {
        jsLibsLabel.classList.remove('disabled');
        jsLibs.disabled = false;
    }
});


//if when user submitted form they got an error message in the activity section because they did not choose an activity, these event listeners will make the error message disappear once any activity is selected. Please note: Below there are only event listeners for the 3 activities with no scheduling conflicts. For the 4 activities with scheduling conflicts, this error message removal feature was added directly into their scheduling conflicts event listeners above

mainConf.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;
    if (checked) {
        if (activitiesError.style.display===''){
            activitiesError.style.display='none';
        }
    }
});
    
build.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;
    if (checked) {
        if (activitiesError.style.display===''){
            activitiesError.style.display='none';
        }
    }
});
    
npm.addEventListener("change", (event) => {
    const selectedActivity = event.target;
    const checked = selectedActivity.checked;
    if (checked) {
        if (activitiesError.style.display===''){
            activitiesError.style.display='none';
        }
    }
});


//"Payment Info" section// 

//event listener to hide and reveal payment information based on dropdown menu selection
payment.addEventListener("change", () => {

    //hide bitcoin and paypal information when credit card option selected
    if (payment.value==="credit card"){
        creditCard.style.display = ''; 
        bitcoin.style.display ='none'; 
        paypal.style.display ='none'; 
    }
    //hide bitcoin and credit card information when paypal option selected
    if (payment.value==="paypal"){
        paypal.style.display = ''; 
        bitcoin.style.display ='none'; 
        creditCard.style.display ='none';  
    }
    //hide credit card and paypal information when bitcoin option selected
    if (payment.value==="bitcoin"){
        bitcoin.style.display = ''; 
        creditCard.style.display ='none'; 
        paypal.style.display ='none'; 
    }
});

/****END OF (non-validation) EVENT LISTENERS BY SECTION***/


/****VALIDATION FUNCTIONS***/

//function to validate the name input. Error message will appear if name input left blank or if name includes symbols, numbers, double or trailing spaces, or more than 4 first names/last names
const nameValidation = event => {

    //error message to display only when name input left blank
    if(nameInput.value===''){
        nameInput.parentNode.insertBefore(nameError, nameInput.nextElementSibling);
        nameError.style.display='';
        nameInput.style.borderColor='red';
        nameInputError.remove();
        event.preventDefault();
    
    //display another error message when input name is not blank but it does not match requirements
    } else if(!(/^[a-z]+( ||-)[a-z]+(( ||-)[a-z]+( ||-)[a-z]+)?$/i.test(nameInput.value))){
        nameError.style.display='none';
        nameError.remove();
        nameInput.parentNode.insertBefore(nameInputError, nameInput.nextElementSibling);
        nameInputError.style.display='';
        nameInput.style.borderColor='red';
        event.preventDefault();

    //remove all error messages when input name matches all criteria
    } else {
        nameInput.style.borderColor='';
        nameError.style.display='none';
        nameInputError.style.display='none';
        nameError.remove();
        nameInputError.remove(); 
    }
    };

//function to validate the email input. Error message will appear if email input left blank or if format does not match that of a valid email address
const emailValidation = event => {

    //error message to display only when email input left blank
    if (emailInput.value==='' ){
        emailInput.parentNode.insertBefore(emailError, emailInput.nextElementSibling);
        emailError.style.display='';
        emailInput.style.borderColor='red';
        emailInputError.remove();
        event.preventDefault();

    //display another error message when email input is not blank but input is not a valid email address
    } else if (!(/^[^@]+@[^@.]+\.[a-z]{2,3}$/i.test(emailInput.value))) {
        emailError.style.display='none';
        emailError.remove();
        emailInput.parentNode.insertBefore(emailInputError, emailInput.nextElementSibling);
        emailInputError.style.display='';
        emailInput.style.borderColor='red';
        event.preventDefault();
           
    //remove all error messages when input is the the format of a valid email address
    } else {
        emailInput.style.borderColor='';
        emailError.style.display='none';
        emailInputError.style.display='none';
        emailError.remove();
        emailInputError.remove();
            }
        };

//function to validate the inputs in the credit card section
const creditCardValidation = event => {
    //only validate credit card info if "credit card" is selected as the payment method
    if(payment.value==="credit card"){ 

        //error message displayed when credit card number field left blank or is not in the format of a valid credit card number
        if(ccNumber.value==='' || !(/(^\d{16}$|^\d{13}$)/.test(ccNumber.value))){
            ccNumber.parentNode.insertBefore(ccNumberError, ccNumber.nextElementSibling);
            ccNumberError.style.display='';
            ccNumber.style.borderColor='red';
            event.preventDefault();
        }else{
            ccNumber.style.borderColor='';
            ccNumberError.style.display='none';
        }
        //error message displayed when zip code field left blank or is not in the format of a valid zip code 
        if(zip.value===''|| !(/^\d{5}$/.test(zip.value))){
            zip.parentNode.insertBefore(zipError, zip.nextElementSibling);
            zipError.style.display='';
            zip.style.borderColor='red';
            event.preventDefault();
        } else {
            zip.style.borderColor='';
            zipError.style.display='none';
        }
        //error message displayed when cvv code field left blank or is not in the format of a cvv code 
        if(cvv.value===''||!(/^\d{3}$/.test(cvv.value))){
            cvv.parentNode.insertBefore(cvvError, cvv.nextElementSibling);
            cvvError.style.display='';
            cvv.style.borderColor='red';
            event.preventDefault();      
        } else {
            cvv.style.borderColor='';
            cvvError.style.display='none';
        }
    }
};

//activities section validation, if no activities selected, error message will appear
const activitiesValidation = (event) =>{ 
    const mainConfChecked = mainConf.checked;
    const jsFrameChecked = jsFrame.checked;
    const jsLibsChecked  = jsLibs.checked;
    const expressChecked = express.checked;
    const nodeJSChecked  = nodeJS.checked;
    const buildChecked = build.checked;
    const npmChecked = npm.checked;

    if(!mainConfChecked && !jsFrameChecked && !jsLibsChecked && !expressChecked && !nodeJSChecked && !buildChecked &&!npmChecked){
        activitiesError.style.display='';
        event.preventDefault();
    } else {
        activitiesError.style.display='none';   
    }
};

//functions to get real-time validation results for the name and email inputs
nameInput.addEventListener("input", (event) =>{
    nameValidation(event);
});
nameInput.addEventListener("blur", (event) =>{
    nameValidation(event);
});

emailInput.addEventListener("input", (event) =>{
    emailValidation(event);
});
emailInput.addEventListener("blur", (event) =>{
    emailValidation(event);
});

/****END OF VALIDATION FUNCTIONS***/


//SUBMIT FORM EVENT LISTENER//
form.addEventListener("submit", (event) => {
    nameValidation(event); 
    emailValidation (event);
    activitiesValidation(event);
    creditCardValidation(event);
});

