import {parse, format} from 'date-fns';

const hamburger = document.getElementById('hamburger')
const addProjBtn = document.getElementById('add-proj-btn')
const sidebar = document.querySelector('.left-panel')
const rightPanel = document.querySelector('.right-panel')


const addProjContainer = document.getElementById('proj-add')
const addBtn = document.getElementById('add-btn')
const cancelBtn = document.getElementById('cancel-btn')


export function loadhome() {


    function toggleAddProj(show) {
        if (show) {
            addProjContainer.className = 'visible'
        } else {
            addProjContainer.className = 'hidden'
        }
    }

    addProjBtn.addEventListener('click', () => {
        toggleAddProj(true)
    })
    addBtn.addEventListener('click', () => addProject())
    cancelBtn.addEventListener('click', () => {
        toggleAddProj(false);
    })


    hamburger.addEventListener('click', () => {
        const content = document.querySelector('.content')
        content.classList.toggle('hide-left')
    })
}

const projectList = document.querySelector('.project-list')
const projInput = document.querySelector('.proj-input')

function addProject() {
    const projInputValue = projInput.value;
    projInput.value = "";

    const projectDiv = document.createElement('div')
    projectDiv.className = 'project-div'

    const projectIcon = document.createElement('h1')
    projectIcon.className = 'project-icon'
    projectIcon.textContent = 'chevron_right'

    const projectTitle = document.createElement('button')
    projectTitle.className = 'project-title'
    projectTitle.textContent = projInputValue
    projectTitle.addEventListener('click', () => {
      taskListUpdater(projectTitle, projectDiv)
    })

    const projectMore = document.createElement('button')
    projectMore.className = 'project-more'
    projectMore.textContent = 'more_vert'
    projectMore.addEventListener('click', function(event) {
      showMenuAtClick(event, projectTitle, projectDiv)
    } )

    const taskArray = []
    projectTitle.tasks = taskArray


    projectList.appendChild(projectDiv)
    projectDiv.appendChild(projectIcon)
    projectDiv.appendChild(projectTitle)
    projectDiv.appendChild(projectMore)
}


const menu = document.getElementById('menu');
const menuButtons = document.querySelectorAll('.menuButton');

document.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  if (!menu.contains(event.target)) {
      menu.style.display = 'none'; // Hide the menu
  }
  });
  

function showMenuAtClick(event, projectTitle, project) {
    const menu = document.getElementById('menu'); // The menu element
    menu.project = projectTitle
    const mouseX = event.pageX; // Get the horizontal mouse position
    const mouseY = event.pageY; // Get the vertical mouse position
  
    // Position the menu where the mouse clicked
    menu.style.display = 'block'; // Show the menu
    menu.style.position = 'absolute'; // Make sure the menu is positioned absolutely
    menu.style.left = `${mouseX}px`; // Set the menu's left position
    menu.style.top = `${mouseY}px`;  // Set the menu's top position

    event.stopPropagation();

    const renameBtn = document.getElementById('renameBtn')
    renameBtn.addEventListener('click', () => {
      renamer(projectTitle, 'proj-input', 'project-title')
    })

    const deleteBtn = document.getElementById('deleteBtn')
    deleteBtn.addEventListener('click', () => {
      project.remove()
    })
  }

function renamer(title, Inputtype) {
  const titleInput = document.createElement('input')
  titleInput.value = title.textContent
  title.replaceWith(titleInput)
  titleInput.focus()
  

  let isUpdating = false;

  // Function to replace the input field back with the updated title
  function updateTitle(inputElement, titleElement) {
    if (isUpdating) return; // Prevent multiple executions

    isUpdating = true; // Mark as updating
    const newTitle = inputElement.value.trim() || titleElement.textContent; // Default to original title if input is empty
    titleElement.textContent = newTitle;
    inputElement.replaceWith(titleElement); // Replace input with the updated title
  }

  // Handle when the user finishes editing (on blur or Enter key)
  titleInput.addEventListener('blur', function() {
    updateTitle(titleInput, title);
  });

  titleInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      updateTitle(titleInput, title);
    }
  });
}

const projectHeader = document.querySelector('.project-header')
const taskList = document.querySelector('.task-list')
const addTaskBtn = document.createElement('button')
addTaskBtn.className = 'add-task-button'
addTaskBtn.innerHTML = addTaskBtn.innerHTML = 'add <span id="add-task">Add Task</span>';
addTaskBtn.addEventListener('click', () => {
  toggleTaskCreateMenu(addTaskBtn.currentProject)})
rightPanel.appendChild(addTaskBtn)

function taskListUpdater(title, div) {
  addTaskBtn.style.display = 'block'
  projectHeader.textContent = title.textContent
  taskList.innerHTML = ''
  console.log(title.taskArray)
  for (let i = 0; i < title.tasks.length; i++) {

    taskList.append(title.taskArray[i])
  }

  addTaskBtn.currentProject = title
}

const taskAddDiv = document.querySelector('.task-add-div')
function toggleTaskCreateMenu() {
  if (taskAddDiv.style.display == 'none') {
    taskAddDiv.style.display = 'flex'
  } else {taskAddDiv.style.display = 'none'}
}


function taskAppend(title) {
  console.log('append')
  const taskTitle = document.getElementById('task-title')
  const taskTitleInput = taskTitle.value

  const taskDate = document.getElementById('task-date')
  const taskDateInput = taskDate.value
  let formattedDate;
  if (!taskDateInput) {
    formattedDate = "No Due Date"
  } else {
      const parsedDate = parse(taskDateInput, 'yyyy-MM-dd', new Date())
      formattedDate = format(parsedDate, 'MMM. d, yyyy');
  }
  

  const taskDetails = document.getElementById('task-details')
  const taskDetailsInput = taskDetails.value

  const taskDiv = document.createElement('div')
  taskDiv.className = 'task-div'
  const taskTitleElement = document.createElement('h1')
  taskTitleElement.className = 'task-title'
  taskTitleElement.textContent = taskTitleInput

  const taskDetailsElement = document.createElement('p')
  taskDetailsElement.className = 'task-details'
  taskDetailsElement.textContent = taskDetailsInput

  const taskDateElement = document.createElement('div')
  taskDateElement.className = 'task-date'
  taskDateElement.textContent = formattedDate

  taskDiv.appendChild(taskTitleElement)
  taskDiv.appendChild(taskDetailsElement)
  taskDiv.appendChild(taskDateElement)

  taskList.appendChild(taskDiv)
  title.tasks.push(taskDiv)
  console.log(title.tasks)

  taskDetails.value = ''
  taskTitle.value = ''
  taskDate.value = ''
  toggleTaskCreateMenu()
}

const taskAdd = document.getElementById('task-add')
const taskCancel = document.getElementById('task-cancel')

taskAdd.addEventListener('click', () => {
  taskAppend(addTaskBtn.currentProject)
})


