//ES5 Object Oriented programming 

//book constructor
function Book(title, author, isbn, category) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.category = category;
}

//UI constructor
function UI() {
}

//PROTOTYPES
//Create a prototype to add the books to the list in the UI  
UI.prototype.addBookToList = function(book) {
    // console.log(book); to test if it works
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


//Delete book prototype
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();

    }
}

//Create a prototype for clear fields  in the UI
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('category').value = '';

}

//Prototype for Show alert, error if not completing all fields 
UI.prototype.showAlert = function(message, className) {
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

//END OF PROTOTYPES

//Event listeners for ADD book 
document.getElementById('book-form').addEventListener('submit',
 function(e) {
     //GET FORM VALUES 
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value,
           category = document.getElementById('category').value

        //    console.log(title, author, isbn, category); TO TEST IS WORKING

       //Instantiate book  or create the book object 
        const book = new Book(title, author, isbn, category);
        //console.log (book)

    //Instantiate UI
    const ui = new UI();

    //Validate to show the error alert message to the user 
    if(title === '' || author === '' || isbn === '' || category === '') {
      //Error alert in the UI 
     ui.showAlert('Please fill in ALL fields', 'error')

    } else {
     //Add book to list
    ui.addBookToList(book);

    //Show success when adding a book
    ui.showAlert('Book Added!', 'success');

     //Clear fields 
    ui.clearFields();

    }
    
    //Add book to list
    ui.addBookToList(book);

    //Clear fields 
    ui.clearFields();

    e.preventDefault();

});

//Event listeners for DELETE books 
document.getElementById('book-list').addEventListener('click',
 function(e) {

  //Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  //Delete book
  ui.deleteBook(e.target);

  //Show message 

  ui.showAlert('Book removed!', 'success'); 

 e.preventDefault();
 
 });