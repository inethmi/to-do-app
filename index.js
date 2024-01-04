const inputBox = document.querySelector("#input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
  if(inputBox.value === '' )
    alert("You must write something!");

  else{
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);

    }
  inputBox.value = '';
  saveData();
}

listContainer.addEventListener("click" , function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData();
  }

  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }

})

function saveData(){
  localStorage.setItem("data" , listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

voice_Search.addEventListener('click' , function(){
  var speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener('result' , e=>{
    const transcript = Array.from(e.results)
    .map(result =>result[0])
    .map(result => result.transcript)

    inputBox.value = transcript;

  })

  if(speech == true){
    recognition.start();
  }

});


document.getElementById('input-box').addEventListener('keypress', function (e) {
  
  if (e.key === 'Enter') {
    addTask();
  }
});

