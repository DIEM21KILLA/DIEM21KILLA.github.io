const formurl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdgsYZaMsgJ_dbt_BjYr1gUBhK7c_9ZVD6E_3lPy23SdmGXTg/formResponse";
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const modal = document.getElementById("feedback-modal");
const feedbackBtn = document.getElementById("feedback-btn");
const closeBtn = document.getElementsByClassName("close-btn")[0];
const infoBtn = document.getElementById("info-btn");
const infoModal = document.getElementById("info-modal");


btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").
    value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class ="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].
                example || ""
                }
        </p>`;
            
            const audioSrc = data[0].phonetics[0]?.audio || '';
            sound.setAttribute("src", audioSrc);
    })
    .catch(() => {
        result.innerHTML = `
        <h3 class="error">
        "Word is missing/misspelled please do try again or send a feedback if its Missing"
        </h3>`;
    })
});
function playSound(){
    sound.play();
}
//--------------------FEEDBACK---------------------------------//
infoBtn.addEventListener("click", () => {
    infoModal.classList.toggle("show");
});

closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        infoModal.classList.remove("show");
        document.getElementById("feedback-modal").classList.remove("show");
    });
});

window.addEventListener("click", (event) => {
    if (event.target === infoModal) {
        infoModal.classList.remove("show");
    }
});
//--------------MODAL INFO-----------------------------------//
feedbackBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Deedbackform 
function submitFeedback() {
    const word = document.getElementById("word").value; 
    const definition = document.getElementById("definition").value;
    
    
    const formData = new FormData();
    formData.append("entry.809297330", word);
    formData.append("entry.1807121998", definition);
    
    // Log formData for //debugging
    console.log("Form Data:", {
        word,
        definition,
    });
    
    fetch(formurl, {
        method: "POST",
        body: formData,
        mode: "no-cors" 
    })
    .then(() => {
        alert("Feedback submitted");
    })
    .catch(error => {
        console.error("Error submitting feedback  try again", error);
    });
}
