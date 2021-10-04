window.onload = () => {
    loadTaskFromStorage();
    console.log(myStorage.length);
    console.log(myStorage);
}

let myStorage = window.localStorage;

function addTaskToList() {
    let task = document.forms.test.item.value;
    let itemList = document.getElementById("thelist");

    itemList.innerHTML += `<li> ${task} </li>`;

    addTaskToStorage(task);
    console.log(task);
    console.log(itemList);
    console.log(myStorage);
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
            itemList.innerHTML += `<li> ${myStorage.getItem(key)} </li>`;
        }
    }
}




