const inputBox = document.querySelector("#input-box");
const listContainer = document.getElementById("list-container");

//by clicking on the button add the following function will be called
function addTask(){
  if(inputBox.value === '' )
    alert("You must write something!");

  else{
      //once there any text on the input box,

      let li = document.createElement("li"); //a new "li" element is created and stored inside a variable
      li.innerHTML = inputBox.value; //and inside that element the input box value is printed
      listContainer.appendChild(li); // and that newly created li element appended to the list container
      let span = document.createElement("span"); //new "span" element is created and stored inside a variable
      span.innerHTML = "\u00d7"; //inside that span element, cancellation icon is printed using its unicode notations
      li.appendChild(span);//and that newly created span element is appended with the li element created before

    }
  inputBox.value = '';
  saveData();
}

listContainer.addEventListener("click" , function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked"); //once click on the relevant li element it will toggled and change its position to checked and unchecked
    saveData();
  }

  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove(); //once click on the span element which is on right most corner of every li element, the relevant task will be removed
    saveData();
  }

})

function saveData(){ 
  localStorage.setItem("data" , listContainer.innerHTML); //this is to save what inside the local storage
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data"); //this is to show what we saved 
}

showTask(); //calling the function to display saved data


/* The code inside the event listener will run when someone clicks on something with the ID 'voice_Search'*/
voice_Search.addEventListener('click' , function(){
  var speech = true;

  window.SpeechRecognition = window.webkitSpeechRecognition;
  /*This line is making sure that our code works in different web browsers. It's like saying, "If the browser supports SpeechRecognition, use that. Otherwise, try using webkitSpeechRecognition."*/


  const recognition = new SpeechRecognition();
  /* This creates a new object called recognition from the SpeechRecognition class. This object will help us recognize speech.*/

  recognition.interimResults = true;
  /*This line is telling the speech recognition to provide results as the person is speaking, not just when they finish. It's like getting updates in real-time. */


  recognition.addEventListener('result' , e=>{ //This sets up a function to run whenever there's a result from the speech recognition.
    const transcript = Array.from(e.results) /*e.results is an object containing the speech recognition results. It's not a regular array, so Array.from() is used to convert it into an array.  */

    .map(result =>result[0]) //this part is extracting the first (primary) result from each set of results.
    .map(result => result.transcript) //extracts the transcript property from each result, which contains the recognized speech as text.


    /*In simpler terms, this immediate above block of codes is extracting the transcriptions of the recognized speech from the results obtained during the speech recognition process and storing them in the transcript variable. The transcript variable will be an array of strings, each string representing a piece of recognized speech.*/


    inputBox.value = transcript;//updating input box with the spoken words

  })

  if(speech == true){
    recognition.start(); // If the speech switch is turned on (if it's true), it starts the speech recognition.
  }

});


document.getElementById('input-box').addEventListener('keypress', function (e) {
  
  if (e.key === 'Enter') {
    addTask();
  }
});

