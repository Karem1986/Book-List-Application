class Book {
    constructor(title, author, isbn, category) {
        this.title = title;
        this.author=author;
        this.isbn =isbn;
        this.category=category

    }
}

class UI { //Here we will put all of our methods to deal with the UI user interface
 addBookToList (book) {
    const list = document.getElementById('book-list');
    //Create tr element 
    const row = document.createElement('tr');
    //Insert columns 
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${book.category}</td>
    <td><a href="#" class = "delete">X</a></td>
    `;
    //Append to the lis this td data 
    list.appendChild(row);

 }

 showAlert(message, className) {

         //Create div
         const div = document.createElement('div');
         //Add classes 
         div.className = `alert ${className}`;
         //Add text 
         div.appendChild(document.createTextNode(message));
         //Get parent 
         const container = document.querySelector('.container');
         //Get form 
         const form = document.querySelector('#book-form');
    
         //Insert alert 
         container.insertBefore(div, form);
    
         //The alert dissapers after 3 seconds 
    
         setTimeout(function(){
             document.querySelector('.alert').remove();
         }, 3000);


 }

 deleteBook(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
  
      }

 }

clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('category').value = '';

}

}

// //Local Storage Class 

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
       books =[];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books; 
 }

 static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
        const ui =new UI;
        //Add book to UI 

    ui.addBookToList(book);
    
    });     
    
 }

 static addBook(book) {
  const books = Store.getBooks();

  books.push(book); 

  localStorage.setItem('books' , JSON.stringify(books));
 }

 static removeBook(category) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.category === category) {
         books.splice(index, 1);
     }
        const ui =new UI;
        //Add book to UI 

    ui.addBookToList(book);

 });

 localStorage.setItem('books' , JSON.stringify(books));
}

}

//DOM load event 
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listeners for ADD book 
document.getElementById('book-form').addEventListener('submit',
 function(e) {
     //GET FORM VALUES 
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value,
           category = document.getElementById('category').value

        //    console.log(title, author, isbn); TO TEST IS WORKING

    //Instantiate book  or create the book object 
    const book = new Book(title, author, isbn, category);
    //console.log (book)

    //Instantiate UI
    const ui = new UI();

    console.log(ui);

    //Validate to show the error alert message to the user 
    if(title === '' || author === '' || isbn === '' || category === '') {
      //Error alert in the UI 
     ui.showAlert('Please fill in ALL fields', 'error')

    } else {
     //Add book to list
    ui.addBookToList(book);

    //Add to Local Storage

    Store.addBook(book);

    //Show success when adding a book
    ui.showAlert('Book Added!', 'success');

     //Clear fields 
    ui.clearFields();

    }
    
    //Clear fields 
    ui.clearFields();

    e.preventDefault();

});

//Event listeners for DELETE books 
document.getElementById('book-list').addEventListener('click',
 function(e) {

  //Instantiate UI
  const ui = new UI();
  //Delete Book
  ui.deleteBook(e.target);

  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Delete book
  ui.deleteBook(e.target);

  //Show message 

  ui.showAlert('Book removed!', 'success'); 

 e.preventDefault();
 
 });