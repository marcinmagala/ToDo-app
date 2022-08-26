'use strict';

const addBtn = document.querySelector('.plus');
const circleBtn = document.querySelectorAll('.circle');
const activeBtn = document.querySelectorAll('.circle-completed');
const appList = document.querySelector('.app_list');
const newTodo = document.getElementById('newTodo');
const form = document.querySelector('.app_form--form');
const sortByAllBtn = document.querySelector('.sort_by_all');
const sortByActiveBtn = document.querySelector('.sort_by_active');
const sortByCompletedBtn = document.querySelector('.sort_by_completed');
const clearBtn = document.querySelector('.clear');

class ToDo {
  status = 'activ';
  id = (Date.now() + '').slice(-10);
  constructor(content) {
    this.content = content;
  }
}

class App {
  #tasks = [];

  constructor() {
    addBtn.addEventListener('click', this._newTask.bind(this));
    form.addEventListener('submit', this._newTask.bind(this));
    appList.addEventListener('click', this._taskStatusChanged.bind(this));
    sortByAllBtn.addEventListener('click', this._sortByAll.bind(this));
    sortByActiveBtn.addEventListener('click', this._sortByActive.bind(this));
    sortByCompletedBtn.addEventListener(
      'click',
      this._sortByCompleted.bind(this)
    );
    clearBtn.addEventListener('click', this._clearCompleted.bind(this));
  }

  _newTask(e) {
    e.preventDefault();

    // Get data from form
    const content = newTodo.value;

    // Validation task in form
    let task;

    if (content !== '') {
      task = new ToDo(content);

      //Add new task to tasks array
      this.#tasks.push(task);

      //Clear form
      newTodo.value = '';
      console.log(this.#tasks);

      // Update task on list
      this._updateList(this.#tasks);
    }
  }

  _renderTask(task) {
    task.forEach(task => {
      let html = `
    <div class="app_form app_list--item" data-status="${
      task.status
    }" data-id = "${task.id}">
        <div class="circle ${task.status === 'activ' ? '' : 'hidden'}"></div>
        <div class="circle-completed ${
          task.status === 'activ' ? 'hidden' : ''
        } ">
          <img src="images/icon-check.svg" alt="icon-check" />
        </div>
        <div class="item--text">${task.content}</div>
    </div>
    `;

      appList.insertAdjacentHTML('afterbegin', html);
    });
  }

  _taskStatusChanged(e) {
    e.preventDefault();
    // To wygląda tak źle dlatego że musi działać obojętne czy user kliknie w ikonkę czy w tło ikonki - rozwiązaniem tego byłoby gdyby ikonka miała tło więc wtedy dałoby się zdefiniować ją jako tło do diva i nie byłoby różnicy czy user kliknie w tło czy w ikonkę ponieważ byłby to jeden i ten sam element. Do momentu przerobienia ikonki musi tak to zostać.
    if (e.target.closest('.circle') !== null) {
      e.target.classList.add('hidden');
      e.target.nextSibling.nextSibling.classList.remove('hidden');
      e.target.closest('.app_form').dataset.status = 'completed';
      console.log(e.target);
      // Zmiana stanu statusu
      this.#tasks.find(
        task => task.id === e.target.closest('.app_form').dataset.id
      ).status = 'completed';
      console.log(this.#tasks);
      //
    } else if (e.target.nextSibling.nextSibling === null) {
      e.target.closest('.circle-completed').classList.add('hidden');
      e.target
        .closest('.circle-completed')
        .nextSibling.parentNode.firstElementChild.classList.remove('hidden');
      e.target.closest('.app_form').dataset.status = 'activ';
      // Zmiana stanu statusu
      this.#tasks.find(
        task => task.id === e.target.closest('.app_form').dataset.id
      ).status = 'activ';
      //
    } else if (e.target.nextSibling.nextSibling !== null) {
      e.target.classList.add('hidden');
      e.target.nextSibling.parentNode.firstElementChild.classList.remove(
        'hidden'
      );
      e.target.closest('.app_form').dataset.status = 'activ';
      // Zmiana stanu statusu
      this.#tasks.find(
        task => task.id === e.target.closest('.app_form').dataset.id
      ).status = 'activ';
    }
  }

  //Sorting by All
  _sortByAll(e) {
    e.preventDefault();
    this._updateList(this.#tasks);
    sortByActiveBtn.classList.remove('sort_by_this_option');
    sortByAllBtn.classList.add('sort_by_this_option');
    sortByCompletedBtn.classList.remove('sort_by_this_option');
  }

  //   Sorting by activ
  _sortByActive(e) {
    e.preventDefault();
    sortByActiveBtn.classList.add('sort_by_this_option');
    sortByAllBtn.classList.remove('sort_by_this_option');
    sortByCompletedBtn.classList.remove('sort_by_this_option');
    let sortByActive = this.#tasks.filter(task => task.status === 'activ');
    this._updateList(sortByActive);
  }

  //   Sorting by completed
  _sortByCompleted(e) {
    e.preventDefault();
    sortByActiveBtn.classList.remove('sort_by_this_option');
    sortByAllBtn.classList.remove('sort_by_this_option');
    sortByCompletedBtn.classList.add('sort_by_this_option');

    let sortbyCompleted = this.#tasks.filter(
      task => task.status === 'completed'
    );
    this._updateList(sortbyCompleted);
  }

  _clearCompleted(e) {
    e.preventDefault();

    this.#tasks.forEach((task, i) => {
      if (task.status === 'completed') {
        this.#tasks.splice(i, 1);
      }
    });
    this._updateList(this.#tasks);
  }

  _updateList(tasks) {
    const appListItem = document.querySelectorAll('.app_list--item');
    appListItem.forEach(item => item.remove());
    this._renderTask(tasks);
  }
}

const app = new App();
