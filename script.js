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
const itemsLeft = document.querySelector('.items_left');
// const lefts = document.querySelector('.lefts');

class ToDo {
  status = 'activ';
  id = (Date.now() + '').slice(-10);
  constructor(content) {
    this.content = content;
  }
}

class App {
  #tasks = [];
  #sortByActive = [];
  #sortByCompleted = [];
  #sortActiveStatus = false;
  #sortCompletedStatus = false;

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
      this._updateTasksLeft(this.#tasks);
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

  _renderLeftItems(task) {
    let leftTask = task.filter(item => item.status === 'activ');
    let leftItems = `<p class="lefts">${leftTask.length} ${
      leftTask.length === 1 || leftTask.length === 0 ? 'item' : 'items'
    } left</p>`;

    itemsLeft.insertAdjacentHTML('afterbegin', leftItems);
  }

  _taskStatusChanged(e) {
    e.preventDefault();
    // To wygląda tak źle dlatego że musi działać obojętne czy user kliknie w ikonkę czy w tło ikonki - rozwiązaniem tego byłoby gdyby ikonka miała tło więc wtedy dałoby się zdefiniować ją jako tło do diva i nie byłoby różnicy czy user kliknie w tło czy w ikonkę ponieważ byłby to jeden i ten sam element. Do momentu przerobienia ikonki musi tak to zostać.

    if (true) {
      if (e.target.closest('.circle') !== null) {
        console.log(this.#tasks);
        e.target.classList.add('hidden');
        e.target.nextSibling.nextSibling.classList.remove('hidden');
        e.target.closest('.app_form').dataset.status = 'completed';

        // Zmiana stanu statusu w obiekcie #tasks
        this.#tasks.find(
          task => task.id === e.target.closest('.app_form').dataset.id
        ).status = 'completed';
        console.log(this.#tasks);
        // console.log(this.#tasks);

        // Blokada zmiany widoku listy jeśli jest posortowana
        // if (
        //   this.#sortCompletedStatus === false &&
        //   this.#sortActiveStatus === false
        // ) {
        //   this._updateList(this.#tasks);
        // } else if (
        //   this.#sortCompletedStatus === true &&
        //   this.#sortActiveStatus === false
        // ) {
        //   this._updateList(this.#sortByCompleted);
        // } else if (
        //   this.#sortCompletedStatus === false &&
        //   this.#sortActiveStatus === true
        // ) {
        //   this._updateList(this.#sortByActive);

        // }
        this._updateList(this.#tasks);
        this._updateTasksLeft(this.#tasks);
        //
      } else if (e.target.nextSibling.nextSibling === null) {
        console.log(this.#tasks);
        if (
          e.target.closest('.circle-completed').classList.add('hidden') !== null
        ) {
          e.target.closest('.circle-completed').classList.add('hidden');
          e.target
            .closest('.circle-completed')
            .nextSibling.parentNode.firstElementChild.classList.remove(
              'hidden'
            );
          e.target.closest('.app_form').dataset.status = 'activ';
          // Zmiana stanu statusu w obiekcie #tasks
          this.#tasks.find(
            task => task.id === e.target.closest('.app_form').dataset.id
          ).status = 'activ';

          // Blokada zmiany widoku listy jeśli jest posortowana
          // if (
          //   this.#sortCompletedStatus === false &&
          //   this.#sortActiveStatus === false
          // ) {
          //   this._updateList(this.#tasks);
          // } else if (
          //   this.#sortCompletedStatus === true &&
          //   this.#sortActiveStatus === false
          // ) {
          //   this._updateList(this.#sortByCompleted);
          // } else if (
          //   this.#sortCompletedStatus === false &&
          //   this.#sortActiveStatus === true
          // ) {
          //   this._updateList(this.#sortByActive);
          // }
          this._updateList(this.#tasks);
          this._updateTasksLeft(this.#tasks);
        }
        //
      } else if (e.target.nextSibling.nextSibling !== null) {
        console.log(this.#tasks);
        e.target.classList.add('hidden');
        e.target.nextSibling.parentNode.firstElementChild.classList.remove(
          'hidden'
        );
        if (e.target.closest('.app_form') !== null) {
          e.target.closest('.app_form').dataset.status = 'activ';
          // Zmiana stanu statusu w obiekcie #tasks
          this.#tasks.find(
            task => task.id === e.target.closest('.app_form').dataset.id
          ).status = 'activ';
          // Blokada zmiany widoku listy jeśli jest posortowana
          // if (
          //   this.#sortCompletedStatus === false &&
          //   this.#sortActiveStatus === false
          // ) {
          //   this._updateList(this.#tasks);
          // } else if (
          //   this.#sortCompletedStatus === true &&
          //   this.#sortActiveStatus === false
          // ) {
          //   this._updateList(this.#sortByCompleted);
          // } else if (
          //   this.#sortCompletedStatus === false &&
          //   this.#sortActiveStatus === true
          // ) {
          //   this._updateList(this.#sortByActive);
          // }
          this._updateList(this.#tasks);
          this._updateTasksLeft(this.#tasks);
        }
      }
    }
  }

  //Sorting by All
  _sortByAll(e) {
    e.preventDefault();
    this._updateList(this.#tasks);
    sortByActiveBtn.classList.remove('sort_by_this_option');
    sortByAllBtn.classList.add('sort_by_this_option');
    sortByCompletedBtn.classList.remove('sort_by_this_option');

    this.#sortActiveStatus = false;
    this.#sortCompletedStatus = false;
  }

  //   Sorting by activ
  _sortByActive(e) {
    e.preventDefault();
    console.log(this.#tasks);

    this.#sortByActive = this.#tasks.filter(task => task.status === 'activ');
    this._updateList(this.#sortByActive);

    sortByActiveBtn.classList.add('sort_by_this_option');
    sortByAllBtn.classList.remove('sort_by_this_option');
    sortByCompletedBtn.classList.remove('sort_by_this_option');

    this.#sortActiveStatus = true;
    this.#sortCompletedStatus = false;
  }

  //   Sorting by completed
  _sortByCompleted(e) {
    e.preventDefault();
    console.log(this.#tasks);
    this.#sortByCompleted = this.#tasks.filter(
      task => task.status === 'completed'
    );
    this._updateList(this.#sortByCompleted);

    sortByActiveBtn.classList.remove('sort_by_this_option');
    sortByAllBtn.classList.remove('sort_by_this_option');
    sortByCompletedBtn.classList.add('sort_by_this_option');

    this.#sortActiveStatus = false;
    this.#sortCompletedStatus = true;
  }

  _clearCompleted(e) {
    e.preventDefault();
    let taskcomplited = this.#tasks.filter(item => item.status === 'activ');

    this.#tasks = taskcomplited;
    console.log(this.#tasks);

    this._updateList(this.#tasks);
    this._updateTasksLeft(this.#tasks);
  }

  _updateList(tasks) {
    const appListItem = document.querySelectorAll('.app_list--item');
    appListItem.forEach(item => item.remove());
    // Powrót do sortowania po wszystkich tasks
    sortByActiveBtn.classList.remove('sort_by_this_option');
    sortByAllBtn.classList.add('sort_by_this_option');
    sortByCompletedBtn.classList.remove('sort_by_this_option');

    this._renderTask(tasks);
  }

  _updateTasksLeft(tasks) {
    const lefts = document.querySelector('.lefts');
    lefts.remove();
    this._renderLeftItems(tasks);
  }
}

const app = new App();
