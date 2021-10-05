window.onload = () => {
    loadTaskFromStorage();
    console.log(myStorage.length);
    console.log(myStorage);
}

let myStorage = window.localStorage;

function addTaskToList() {
    const task = document.forms.textinput.item.value;
    let listOfTask = document.getElementById("thelist");
    if (task !== "")  {
        listOfTask.innerHTML += `<li> ${task} </li>`;

        addTaskToStorage(task);
        console.log(task);
        console.log(listOfTask);
        console.log(myStorage);
    }
}

function addTaskToStorage(item) {
    let key = Math.random();
    myStorage.setItem(key, item);
}

function loadTaskFromStorage() {
    if (myStorage.length > 0) {
        for (let key in myStorage) {
            // Checks for only returning the relevant keys and not setItems etc.
            if (!myStorage.hasOwnProperty(key)) {
                continue;
            }
            let itemList = document.getElementById("thelist");
            itemList.innerHTML += `<p> ${myStorage.getItem(key)} </p>`;
        }
    }
}





