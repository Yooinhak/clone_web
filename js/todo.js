const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

let pendings = [];
let finished = [];

function savePendings() {
    localStorage.setItem("PENDING", JSON.stringify(pendings));
}
function saveFinished() {
    localStorage.setItem("FINISHED", JSON.stringify(finished));
}

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanPendings = pendings.filter(function(pending){
        return pending.id !== parseInt(li.id);
    });
    pendings = cleanPendings;
    savePendings();
}

function deleteFinish(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finished.filter(function(finish){
        return finish.id !== parseInt(li.id);
    });
    finished = cleanFinished;
    saveFinished();
}

function returntFinish(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.querySelector("span").innerText;
    pendingPaint(text);
}

function finishPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const currentText = li.querySelector("span").innerText;
    FinishPaint(currentText);
    const cleanPendings = pendings.filter(function(pending){
        return pending.id !== parseInt(li.id);
    });
    pendings = cleanPendings;
    savePendings();
    saveFinished();
}

function FinishPaint(text) {
    const finishedLi = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Date.now() + Math.floor(Math.random() * 30);
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinish);
    returnBtn.innerText = "⏪";
    returnBtn.addEventListener("click", returntFinish);
    returnBtn.addEventListener("click", deleteFinish);
    finishedLi.appendChild(span);
    finishedLi.appendChild(delBtn);
    finishedLi.appendChild(returnBtn);
    finishedLi.id = newId;
    finishedList.appendChild(finishedLi);
    const finishObj = {
        text: text,
        id: newId
    };
    finished.push(finishObj);
    saveFinished();
}

function pendingPaint(text) {
    const pendingLi = document.createElement("li");
    const delBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Date.now() + Math.floor(Math.random() * 30);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePending);
    finishBtn.innerText = "✅";
    finishBtn.addEventListener("click", finishPending);
    span.innerText = text;
    pendingLi.appendChild(span);
    pendingLi.appendChild(delBtn);
    pendingLi.appendChild(finishBtn);
    pendingLi.id = newId;
    pendingList.appendChild(pendingLi);
    const pendingObj = {
        text: text,
        id: newId
    };
    pendings.push(pendingObj);
    savePendings();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    pendingPaint(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedPendings = localStorage.getItem("PENDING");
    const loadedFinished = localStorage.getItem("FINISHED");
    if (loadedPendings !== null) {
        const parsedPendings = JSON.parse(loadedPendings);
        parsedPendings.forEach(function(pending){
            pendingPaint(pending.text);
        });
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(finish){
            FinishPaint(finish.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();