let myStorage = window.localStorage;
let newItemList = [];
let allItemList = [];

const TEMPLATE_OF_TASKLIST = document.querySelector("#tasklist");
const TEMPLATE_SIDEBAR_TASK = document.querySelector("#tasklistsidebar");
const TEMPLATE_OF_TASK = document.querySelector("#task");

const addTaskList = document.querySelector(".addtasklist");

const TASK_LIST_HOLDER = document.querySelector(".main");
const TASK_LIST_SIDEBAR_HOLDER = document.querySelector(".sidebarmenu");

sidebarMenuAddAndClear();

for(let key in myStorage) {
    if (!myStorage.hasOwnProperty(key)) {
      continue; // skip keys like "setItem", "getItem" etc
    }

    allItemList.push({
        name: [key],
        tasks: JSON.parse(myStorage.getItem(key))
    });
}

console.log(allItemList);

// Creates to do list from local storage
for(let i = 0; i < allItemList.length; i++) {
    const clone = TEMPLATE_OF_TASKLIST.content.cloneNode(true);
    const taskListName = clone.querySelector("h1");
    taskListName.innerHTML = allItemList[i].name;
    TASK_LIST_HOLDER.append(clone);

    addTaskListToSidebar(allItemList[i].name);
    
    for(let j = 0; j < allItemList[i].tasks.length; j++) {
        addTask(allItemList[i].name, allItemList[i].tasks[j]);
    }

    addTaskButton();
}

function addTask(name, task) {
    const clone = TEMPLATE_OF_TASK.content.cloneNode(true);
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

        // Can edit tasks and saves it to lists which is stored in localstorage
        taskText.addEventListener("input", function() {
            task.item = taskText.innerHTML;
            let index = getIndexOf(task);

            newItemList[index] = task;
            myStorage.setItem(name, JSON.stringify(newItemList));
        });

        // Add delete button to task
        taskDeleteButton.addEventListener("click", function() {
            let item = this.parentElement;
            let index = getIndexOf(task);
            
            item.remove();
            newItemList.splice(index, 1);
            myStorage.setItem(name, JSON.stringify(newItemList));
        });

        // Add checkbox to task
        taskCheck.addEventListener("click", function() {
            let index = getIndexOf(task);
            newItemList[index].checked = taskCheck.checked;
            let item = this.parentElement;

            item.classList.toggle("checked");
            myStorage.setItem(name, JSON.stringify(newItemList));
        })

        taskList.appendChild(clone);
        myStorage.setItem(name, JSON.stringify(newItemList));
    }
}

// Finds index of task by iteraion through task.id and returns the index of the task
function getIndexOf(task) {
    for (let i = 0; i < newItemList.length;i++) {
        if (newItemList[i].id === task.id) {
            return i;
        }
    }
}

function addTaskButton() {
    const taskField = document.querySelector("#inputfield");
    const createTaskSubmit = document.querySelector("#submit");

    taskField.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            createTaskSubmit.click();
        }
    });

    // Add functionality to "add task" button
    createTaskSubmit.addEventListener('click', function() {
        const value = taskField.value;
        if (value) {
            const task = {
                item: value,
                checked: false,
                id: Math.random().toString(36).substr(2)
            }
            let listName = document.querySelector("#tasks h1").innerHTML;

            addTask(listName, task);
        }
        taskField.value = "";
    });
}

function addTaskListToSidebar(name) {
    const cloneSideBar = TEMPLATE_SIDEBAR_TASK.content.cloneNode(true);
    let tempName = cloneSideBar.querySelector("#tasksidebar p");
    tempName.innerHTML = name;

    TASK_LIST_SIDEBAR_HOLDER.append(cloneSideBar);   
}

function sidebarMenuAddAndClear() {
    const popup = document.querySelector(".sidebarpopup");
    const clearButton = document.querySelector(".clearsidebar");
    const taskList = document.querySelector("#inputsidebar");
    const sidebarSubmit = document.querySelector(".sidebarsubmit");

    popup.style.display = "none";

    addTaskList.addEventListener('click', function() {
        if (popup.style.display === "none") {
            popup.style.display = "block";
        } else {
            popup.style.display = "none";
        }
    });

    sidebarSubmit.addEventListener('click', function() {
        let taskName = taskList.value;
    
        if (taskName !== "") {
            const clone = TEMPLATE_OF_TASKLIST.content.cloneNode(true);
            clone.querySelector("#tasks h1").innerHTML = taskName;
            TASK_LIST_HOLDER.append(clone);
            addTaskListToSidebar(taskName);
            addTaskButton();
            let tempList = [];

            myStorage.setItem(taskName, JSON.stringify(tempList));
        }
        taskList.value = "";
    });

    taskList.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            sidebarSubmit.click();
        }
    });

    clearButton.addEventListener('click',function() {
        myStorage.clear();
        const allTaskSidebar = document.querySelectorAll("#tasksidebar");
        const allTaskLists = document.querySelectorAll("#tasks");

        allTaskSidebar.forEach(item => {
            let parentNode = this.parentElement;
            parentNode.removeChild(item);
        })

        allTaskLists.forEach(item => {
            let parentNode = item.parentElement;
            parentNode.removeChild(item);
        })
    });
}