class BooksCollection {
  constructor() {
    this.bookDiv = document.querySelector('.list_books > ul');
    this.form = document.querySelector('.add-book-form');
    this.bookList = JSON.parse(localStorage.getItem('book_info')) || [];
    this.navItem = document.querySelector('.nav_items');
    this.container = document.querySelector('.container');
  }

  // read books to view
  readBook(books) {
    this.bookDiv.innerHTML = '';
    this.bookDiv.style.borderColor = 'white';

    if (books) {
      books.forEach((book, index) => {
        this.bookDiv.style.borderColor = '#091a40';
        const li = document.createElement('li');
        li.innerHTML = `
          <span> <q>${book.title_name}</q> by ${book.author_name} </span>
          <span>
            <button class="btn" data-id="${index}">Remove</button>
          </span>
         `;
        this.bookDiv.appendChild(li);
      });
    }
  }

  // link sections
  switchSection() {
    this.navItem.addEventListener('click', (e) => {
      const divs = Array.from(this.container.children);
      divs.forEach((div) => {
        if (e.target.id === div.className) {
          const list = e.target.parentElement.parentElement.children;
          Array.from(list).forEach((list) => {
            if (list.firstElementChild.id !== e.target.id) {
              list.firstElementChild.classList.remove('active');
            } else {
              e.target.classList.add('active');
            }
          });

          div.classList.add('active');
        } else {
          div.classList.remove('active');
        }
      });
    });
  }

  // create book item
  addBook(e) {
    e.preventDefault();
    this.bookList.push({
      title_name: this.form.elements.title.value,
      author_name: this.form.elements.author.value,
    });
    // update local storage
    localStorage.setItem('book_info', JSON.stringify(this.bookList));
    this.readBook(this.bookList);

    // clear form
    this.form.elements.title.value = '';
    this.form.elements.author.value = '';
  }

  // remove book
  removeBook(btn) {
    this.bookList = this.bookList.filter(
      (book, index) => index !== Number(btn.dataset.id),
    );
    localStorage.setItem('book_info', JSON.stringify(this.bookList));
    this.readBook(this.bookList);
  }

  handleClick() {
    // listen to switches
    this.switchSection();

    // read books from local storage
    this.readBook(this.bookList);

    // event listeners
    // create a book
    this.form.addEventListener('submit', (e) => this.addBook(e));

    // delete book
    this.bookDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        this.removeBook(e.target);
      }
    });
  }
}

const bookObject = new BooksCollection();
bookObject.handleClick();
