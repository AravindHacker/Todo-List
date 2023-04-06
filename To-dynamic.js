let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addButton");
let userInputElement=document.getElementById("todoUserInput");
let saveButton=document.getElementById("savebutton");/*
let todoList = [{
        text: "Learn HTML",
        itemNo:1
    },
    {
        text: "Learn CSS",
        itemNo:2
    },
    {
        text: "Learn JavaScript",
        itemNo:3
    },
    {
        text: "Learn React",
        itemNo:4
    },
    {
        text: "Learn Java",
        itemNo:5
    },
    {
        text: "Learn Python",
        itemNo:6
    }
];*/
let todoList=getTodoList();
let listCount=todoList.length;
saveButton.onclick=function()
{
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
function getTodoList()
{
    let stringifyList=localStorage.getItem("todoList");
    let parsedList=JSON.parse(stringifyList);
    if(parsedList===null)
    {
        return[];
    }
    else{
        return parsedList;
    }
}
addTodoButton.onclick=function(){
    addInput();
}
function addInput()
{
    let userInputElement=document.getElementById("todoUserInput");
    let userValue=userInputElement.value;
    if(userValue==="")
    {
        alert("Enter Valid Text");
        return;
    }
    listCount=listCount+1;
    let newItem={
        text: userValue,
        itemNo: listCount
    };
    todoList.push(newItem);
    createAndAppend(newItem);
    userInputElement.value=" ";

}

function onDeleteTodo(_todoId)
{
   let todoElement=document.getElementById(_todoId);
   todoItemsContainer.removeChild(todoElement);
   let delTodoIndex=todoList.findIndex(function(eachTodo)
   {
    let eachTodoId="todo" + eachTodo.itemNo;
    if(eachTodoId===_todoId)
    {
        return true;
    }
    else{
        return false;
    }
   }
)
todoList.splice(delTodoIndex,1);

}

function todoStatus(_checkBoxID,_labelId)
{
    let checkLabel=document.getElementById(_checkBoxID);
    let checkId=document.getElementById(_labelId);
    
  if(checkLabel.checked === true)
    {
        labelElement.classList.add("checked");
    }
    else
    {
        labelElement.classList.remove("checked");
    }

}
function createAndAppend(todo)
 {
    let checkBoxID="checkboxInput"+todo.itemNo;
    let labelId="label"+todo.itemNo;
    let todoId="todo"+todo.itemNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxID;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick=function()
    {
        todoStatus(checkBoxID,labelId);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxID);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id=labelId;
    labelContainer.appendChild(labelElement);

    let deletContainer = document.createElement('div');
    deletContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deletContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick=function(){
                         onDeleteTodo(todoId);
                       }
    deletContainer.appendChild(deleteIcon);
}
for (let todo of todoList) {
    createAndAppend(todo);
}