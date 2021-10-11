let myStorage = window.localStorage;
let itemList = JSON.parse(myStorage.getItem("list")) || [];
let newItemList = [];
const template = document.querySelector("#task");
const createTaskSubmit = document.querySelector("#submit");
const taskField = document.querySelector("#inputfield");

// Add functionality to "add task button"
createTaskSubmit.addEventListener('click', function() {
    const value = taskField.value;
    if (value) {
        const task = {
            item: value,
            checked: false,
            id: Math.random()
        }
        addTask(task);
    }
})

// Creates to do list from local storage
for(let i = 0; i < itemList.length; i++) {
    addTask(itemList[i]);
}

function addTask(task) {
    const clone = template.content.cloneNode(true);
    const taskListChecks = clone.querySelector("li");
    const taskText = clone.querySelector("li p");
    const taskCheck = clone.querySelector("li #checkbox");
    const taskDeleteButton = clone.querySelector(".close");
    let taskList = document.getElementById("thelist");

    if (task.item !== "")  {
        taskText.innerHTML = task.item;
        taskCheck.checked = task.checked;

        if (taskCheck.checked === true) {
            taskListChecks.classList.toggle("checked");
        }

        newItemList.push(task);
        let index = getIndexOf(task);

        // Can edit tasks and saves it to lists which is stored in localstorage
        taskText.addEventListener("input", function() {
            task.item = taskText.innerHTML;

            newItemList[index] = task;
            myStorage.setItem("list", JSON.stringify(newItemList));
        });

        // Can delete tasks
        taskDeleteButton.addEventListener("click", function() {
            let item = this.parentElement;
            
            item.remove();
            newItemList.splice(index, 1);
            myStorage.setItem("list", JSON.stringify(newItemList));
        });

        // Can check completed items
        taskCheck.addEventListener("click", function() {
            newItemList[index].checked = taskCheck.checked;
            let item = this.parentElement;

            item.classList.toggle("checked");
            myStorage.setItem("list", JSON.stringify(newItemList));
        })

        taskList.appendChild(clone);
        myStorage.setItem("list", JSON.stringify(newItemList));
    }
}

function getIndexOf(task) {
    for (let i = 0; i < newItemList.length;i++) {
        if (newItemList[i].id === task.id) {
            return i;
        }
    }
}
