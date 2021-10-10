window.onload = function() {
    loadTaskFromStorage(myStorage);
}

let myStorage = window.localStorage;
let itemList = new Array;

function addTaskToList() {
    const task = document.forms.textinput.inputfield.value;
    let taskList = document.getElementById("thelist");
    if (task !== "")  {
        let newItem = document.createElement("li");
        newItem.innerHTML = task;
        createDeleteButton(newItem);
        createEditButton(newItem);

        taskList.appendChild(newItem);
        //addTaskToStorage(task);
        itemList.push(task);
    }
}

function addTaskToStorage(item) {
    let key = myStorage.length + 1;
    myStorage.setItem(key, item);
}

function loadTaskFromStorage(storage) {
    if (storage.length > 0) {
        for (let key in storage) {
            // Checks for only returning the relevant keys and not setItems etc.
            if (!storage.hasOwnProperty(key)) {
                continue;
            }
            let storageTaskList = document.getElementById("thelist");
            let newItem = document.createElement("li");
           
            newItem.innerHTML = storage.getItem(key);
            createDeleteButton(newItem);
            createEditButton(newItem);
            storageTaskList.appendChild(newItem);
        }
        let test = document.querySelector("#thelist");
        test.addEventListener("click", function(item) {
        if (item.target && item.target.tagName === "LI") {
            item.target.classList.toggle("checked");
        }
    })
    }
}

function createDeleteButton(item) {
    let span = document.createElement("SPAN");
    let txtNode = document.createTextNode("\u00D7");
    
    span.className = "close";
    span.appendChild(txtNode);
    span.contentEditable = "false";
    span.addEventListener('click', function() {
        let test = this.parentElement;
        test.remove();
    });
    item.appendChild(span);
}

function createEditButton(item) {
    let span = document.createElement("SPAN");
    let txtNode = document.createTextNode("edit");
    
    span.className = "edit";
    span.appendChild(txtNode);
    span.contentEditable = "false";
    span.addEventListener('click', function() {
        let test = this.parentElement;
        switch(test.contentEditable) {
            case "false":
                test.contentEditable = "true";
                break;
            case "true":
                test.contentEditable = "false";
                break;
            default:
                test.contentEditable = "true";
        }
    });
    item.appendChild(span);
}

document.querySelectorAll("#thelist li").forEach(e => 
    console.log(e));















