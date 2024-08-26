// <-- variable declaration section -->
const inputArea = document.querySelector('.input-area');
const addIt = document.querySelector('.add-it');
const taskHolder = document.querySelector('.main');
const dltSelected = document.querySelector('.dlt-selected');
const dltAll = document.querySelector('.dlt-all');
const completeStatus = document.querySelector('.complete-status');
const totalTasks = document.querySelector('.total-tasks');
const filter = document.querySelector('.filter');
const pending = document.querySelector('.show-pending');
const completed = document.querySelector('.show-completed');
const all = document.querySelector('.show-all');
let indexArr = 0;
let appendNode;
let taskArr = [];
let selectArr = [];
// <-- variable declaration ends -->


// <-- verify if value is not empty --> 
function verifyTask(){
    if(inputArea.value == '')
        return 'empty';
    else
        return 'proceed';
}

// <-- marks down tasks that are completed ->>   
function selectTask(taskNode){
    if(selectArr.includes(taskNode.id)){
        selectArr = selectArr.filter((elem)=>{
            return (elem != taskNode.id)
        })
        taskNode.children[0].style.textDecoration = 'none';
    }else{
        selectArr.push(taskNode.id);
        taskNode.children[0].style.textDecoration = 'line-through';      
    }
    updateStatus();
}

// <-- delete tasks when delete button is clicked ->>
function deleteTask(taskNode){
    if(taskArr.includes(taskNode.id)){
        taskArr = taskArr.filter((elem)=>{
            return (elem != taskNode.id);           
        })
    }
    if(selectArr.includes(taskNode.id)){
        selectArr = selectArr.filter((elem)=>{
            return (elem != taskNode.id);          
        })
    } 
    taskNode.remove();
    updateStatus();
}

// <-- adds task below the input field once entered ->>
function addBelow(){

    let userTask = document.querySelector('.input-area').value;
    appendNode = document.createElement('div');
    indexArr = indexArr + 1;
    appendNode.setAttribute('id', `${indexArr}`);
    appendNode.innerHTML = `<div class="content">
                    ${userTask} 
                </div>
                <div class="control">
                    <button class="done">✓</button>
                    <button class="remove">🗑️</button>
                </div>`
    taskHolder.appendChild(appendNode);
    document.querySelector('.input-area').value = '';  
    console.log(taskHolder);
    taskArr.push(appendNode.id);
    console.log(taskArr);
    
    // <-- adding event listner on select button -->
    appendNode.children[1].children[0].addEventListener('click', (e)=>{
        let taskNode = e.target.parentElement.parentElement;
        selectTask(taskNode);
    });

    // <-- adding event on delete button -->
    appendNode.children[1].children[1].addEventListener('click', (e)=>{
        let taskNode = e.target.parentElement.parentElement;
        deleteTask(taskNode);
    })
    updateStatus();
}

// <-- effect of clicking `+` button to add task below -->
addIt.addEventListener('click', ()=>{
    if(verifyTask() == 'empty')
        alert('🤬Task can not be empty!🤬');
    else
        addBelow();
})

// <-- effect of pressing enter key after writing task in input field ->> 
inputArea.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        if(verifyTask() == 'empty')
            alert('🤬Task can not be empty!🤬');
        else
            addBelow();
    }
})

// <-- delete tasks that are completed or done -->
dltSelected.addEventListener('click', ()=>{
    selectArr.forEach((elem)=>{
        let task = document.getElementById(elem);
        task.remove();
        taskArr = taskArr.filter((item)=>{
            return (item != elem);
        })
    })
    selectArr = [];        
    updateStatus();
})

// <-- delete all the tasks and empty below field 
dltAll.addEventListener('click', ()=>{
    taskArr.forEach((elem)=>{
        let task = document.getElementById(elem);
        task.remove();
    })
    taskArr = [];
    updateStatus();
})

// <-- update task status from footer -->
function updateStatus(){
    completeStatus.innerText = `Completed: ${selectArr.length}`;
    totalTasks.innerText = `Total Tasks: ${taskArr.length}`;
}

// <-- shows pending tasks -->
function showPending(){
    taskArr.forEach((elem)=>{
        document.getElementById(elem).style.display = 'flex';
    })
    selectArr.forEach((elem)=>{
        document.getElementById(elem).style.display = 'none';
    })
}


// <-- shows all tasks -->
function showAll(){
    taskArr.forEach((elem) => {
        document.getElementById(elem).style.display = 'flex';
    });
}

// shows completed tasks -->
function showCompleted(){
    taskArr.forEach((elem) => {
        document.getElementById(elem).style.display = 'none';      
    });
    selectArr.forEach((item)=>{
        document.getElementById(item).style.display = 'flex';
    })
}

pending.addEventListener('click', showPending);
completed.addEventListener('click', showCompleted);
all.addEventListener('click', showAll);


