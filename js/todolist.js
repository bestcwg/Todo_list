let myStorage = window.localStorage;

let todoLists = [];
let todoTasks = [];
let newTodoTasks = [];

const TEMPLATE_OF_TASKLIST = document.querySelector("#tasklist");
const TEMPLATE_SIDEBAR_TASK = document.querySelector("#tasklistsidebar");
const TEMPLATE_OF_TASK = document.querySelector("#task");

const addTaskList = document.querySelector(".addtasklist");

const TASK_LIST_HOLDER = document.querySelector(".main");
const TASK_LIST_SIDEBAR_HOLDER = document.querySelector(".sidebarmenu");


sidebarMenuAddAndClear();
loadFromStorage();
addTaskButton();

function loadFromStorage() {
    if (myStorage.getItem("todoLists")) {
        todoLists = JSON.parse(myStorage.getItem("todoLists"));
    }

    if (myStorage.getItem("todoTasks")) {
        todoTasks = JSON.parse(myStorage.getItem("todoTasks"));
    }

    // Creates to do list from local storage
    for(let i = 0; i < todoLists.length; i++) {
        const clone = TEMPLATE_OF_TASKLIST.content.cloneNode(true);
        const taskListName = clone.querySelector("h1");
        
        taskListName.innerHTML = todoLists[i].name;
        console.log(clone)
        TASK_LIST_HOLDER.append(clone);

        addTaskListToSidebar(i, todoLists[i].name);

        for(let j = 0; j < todoTasks.length; j++) {
            if (todoLists[i].id === todoTasks[j].id) {
                addTask(i, todoTasks[j]);
            }
        }
    }
}

function addTaskButton() {
    const TASK_INPUTFIELD = document.querySelectorAll("#tasks #inputfield");
    const submit = document.querySelectorAll("#tasks #submit");

    for (let i = 0; i < submit.length; i++) {
        TASK_INPUTFIELD[i].addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                submit[i].click();
            }
        });

        submit[i].addEventListener('click', function() {
            const value = TASK_INPUTFIELD[i].value;
            if (value) {
                const task = {
                    item: value,
                    checked: false,
                    id: i
                }
                
                addTask(i, task);

            }
            TASK_INPUTFIELD.forEach(item => {
                item.value = "";
            });
        }) 
    }
}

function addTask(i, task) {
    const clone = TEMPLATE_OF_TASK.content.cloneNode(true);
    const taskListChecks = clone.querySelector("li");
    const taskText = clone.querySelector("li p");
    const taskCheck = clone.querySelector("li #checkbox");
    const taskDeleteButton = clone.querySelector(".close");
    let allTaskList = document.querySelectorAll("#thelist");

    if (task.item !== "")  {
        taskText.innerHTML = task.item;
        taskCheck.checked = task.checked;

        if (taskCheck.checked === true) {
            taskListChecks.classList.toggle("checked");
        }

        newTodoTasks.push(task);

        function findIndex(task) {
            for(let j = 0; j < newTodoTasks.length; j++) {
                if(newTodoTasks[j].item === task.item && newTodoTasks[j].id === task.id) {
                    return j;
                }
            }
            return -1;
        }

        // Can edit tasks and saves it to lists which is stored in localstorage
        taskText.addEventListener("input", function() {
            text = taskText.innerHTML;

            newTodoTasks[findIndex(task)].item = text;

            myStorage.setItem("todoTasks", JSON.stringify(newTodoTasks));
        });

        // Add delete button to task
        taskDeleteButton.addEventListener("click", function() {
            let parent = this.parentElement;
            parent.remove();

            newTodoTasks.splice(findIndex(task), 1);
            
            myStorage.setItem("todoTasks", JSON.stringify(newTodoTasks));
        });

        // Add checkbox to task
        taskCheck.addEventListener("click", function() {
            newTodoTasks[findIndex(task)].checked = taskCheck.checked;
            let item = this.parentElement;

            item.classList.toggle("checked");
            myStorage.setItem("todoTasks", JSON.stringify(newTodoTasks));
        })

        allTaskList[i].appendChild(clone);
        myStorage.setItem("todoTasks", JSON.stringify(newTodoTasks));
    }
}

function addTaskListToSidebar(i, name) {
    const cloneSideBar = TEMPLATE_SIDEBAR_TASK.content.cloneNode(true);
    let tempName = cloneSideBar.querySelector("#tasksidebar p");
    tempName.innerHTML = name;

    TASK_LIST_SIDEBAR_HOLDER.append(cloneSideBar); 

    let event = document.querySelectorAll("#tasksidebar");
    event[i].addEventListener("click", function() {
        console.log(document.querySelectorAll("#tasks")[i]);
        document.querySelectorAll("#tasks")[i].classList.toggle("hidden");
    })
}

function sidebarMenuAddAndClear() {
    const popup = document.querySelector(".sidebarpopup");
    const clearButton = document.querySelector(".clearsidebar");
    const taskList = document.querySelector("#inputsidebar");
    const sidebarSubmit = document.querySelector(".sidebarsubmit");

    addTaskList.addEventListener('click', function() {
        popup.classList.toggle("hidden");
    });

    sidebarSubmit.addEventListener('click', function() {
        let taskName = taskList.value;
    
        if (taskName !== "") {
            const clone = TEMPLATE_OF_TASKLIST.content.cloneNode(true);
            clone.querySelector("#tasks h1").innerHTML = taskName;
            TASK_LIST_HOLDER.append(clone);
            //addTaskListToSidebar(taskName);
            addTaskButton();
            
            todoLists.push({
                name: taskName,
                id: todoLists.length
            })
            addTaskListToSidebar(todoLists.length - 1,taskName);

            myStorage.setItem("todoLists", JSON.stringify(todoLists));
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
        todoLists.splice(0, todoLists.length);
        todoTasks.splice(0, todoTasks.length);
        newTodoTasks.splice(0, newTodoTasks.length);
        
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

// TEST

function handleDragStart(e) {
    dragSrcEl = this;
  
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    console.log("drag start");
  }

function handleDragEnd(e) {
    console.log("drag end");
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    console.log("drag over");
    console.log(e.target);
    return false;
}

function handleDrop(e) {
    e.stopPropagation();
  
    if (dragSrcEl !== this) {
      //dragSrcEl.innerHTML = this.innerHTML;
      //this.innerHTML = e.dataTransfer.getData('text/html');
      console.log(dragSrcEl);
      console.log(e.target);
      //e.target.appendChild(dragSrcEl);
      e.target.parentNode.appendChild(dragSrcEl);
    }
  
    return false;
  }

let tasks = document.querySelectorAll("#thelist li");
let taskLists = document.querySelectorAll("#tasks");

taskLists.forEach(function(lists) {
    lists.addEventListener('dragover', handleDragOver);
    lists.addEventListener('dragend', handleDragEnd);
    lists.addEventListener('drop', handleDrop);
})

tasks.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart);
});