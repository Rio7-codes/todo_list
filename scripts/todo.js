let todoList = JSON.parse(localStorage.getItem('todoList')) || [
    {
        item: 'null',
        dueDate: 'null'
    }
];

function addTodo() {
    let inputElement = document.querySelector('#input-todo');
    let dateElement = document.querySelector('#date-todo');
    let todoItem = inputElement.value;
    let todoDate = dateElement.value;
    todoList.push({item: todoItem, dueDate: todoDate});
    localStorage.setItem('todoList', JSON.stringify(todoList));
    inputElement.value = '';
    dateElement.value = '';
    displayItems();
}

function displayItems() {
    let containerElement = document.querySelector('.todo-container');
    let newHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        let {item, dueDate} = todoList[i];
        if (`${item}` !== 'null' && `${dueDate}` !== 'null') {
            let [year, month, day] = dueDate.split('-');
            let formattedDate = `${day}-${month}-${year}`;
            newHTML += `
            <span>${item}</span>
            <span>${formattedDate}</span>
            <button id="delete-todo" onclick="
            todoList.splice(${i}, 1);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayItems();
            ">Delete</button>
            `;
        }
    }
    containerElement.innerHTML = newHTML;
}

displayItems();

let inputElement = document.querySelector('#input-todo');
inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
