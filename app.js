class BooksCollection {
  constructor() {
    this.bookDiv = document.querySelector('#books > ul');
    this.ul = document.querySelector('ul');
    this.form = document.querySelector('.add-book');
    this.bookList = [] || JSON.parse(localStorage.getItem('book_info'));
    this.navitem = document.querySelector('.nav-subitem');
  }

  // read books to view
  readValue(books) {
    this.bookDiv.innerHTML = '';
    this.ul.style.borderWidth = '0px';

    if (books) {
      books.forEach((book, index) => {
        this.ul.style.borderWidth = '2px';
        const li = document.createElement('li');
        li.innerHTML = `<div class="w-50"><span>"${book.title_name}" by</span>
         <span>${book.author_name}</span></div>
         <button class="remove-btn" data-id="${index}">remove</button><br>`;
        this.bookDiv.appendChild(li);
      });
    }
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
    this.readValue(this.bookList);

    // clear form
    this.form.elements.title.value = '';
    this.form.elements.author.value = '';
  }

  showbooks(books) {
    this.ul.style.borderWidth = '0px';

    if (books) {
      books.forEach((book, index) => {
        this.ul.style.borderWidth = '2px';
        const li = document.createElement('li');
        li.innerHTML = `<div class="w-50"><span>"${book.title_name}" by</span>
         <span>${book.author_name}</span></div>
         <button class="remove-btn" data-id="${index}">remove</button><br>`;
        this.bookDiv.appendChild(li);
      });
    }
  }

  // remove book
  removeBook(btn) {
    this.bookList = this.bookList.filter(
      (book, index) => index !== Number(btn.dataset.id),
    );
    localStorage.setItem('book_info', JSON.stringify(this.bookList));
    this.readValue(this.bookList);
  }

  handleClick() {
    this.readValue(this.bookList);
    this.showbooks(this.bookList);
    this.navitem.addEventListener('click', this.showbooks(this.bookList));
    // event listeners
    this.form.addEventListener('submit', (e) => this.addBook(e));

    this.bookDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        this.removeBook(e.target);
      }
    });
  }
}

const bookObject = new BooksCollection();
bookObject.handleClick();
