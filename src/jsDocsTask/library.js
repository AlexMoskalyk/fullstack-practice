const form  = document.getElementById('bookForm');
const libraryContainer = document.getElementById('library');
const bookTypeRadioBtns = document.getElementsByName('bookType');
const fileSizeInput = document.getElementById('fileSize');

const books = [];


function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author} (${this.year})`;
};

function EBook(title, author, year, fileSize) {
    Book.call(this, title, author, year); 
    this.fileSize = fileSize;  
}

Object.setPrototypeOf(EBook.prototype, Book.prototype);

EBook.prototype.download = function() {
    alert(`Downloading ${this.title}... File size: ${this.fileSize}MB`);
};


function displayLibrary() {
    libraryContainer.innerHTML = ''; 
    books.forEach((book, index) => {
        
        const bookInstances = document.createElement('div');
        bookInstances.className = 'book';

        
        bookInstances.innerHTML = `
            <span>${book.getInfo()} ${book instanceof EBook ? `(File size: ${book.fileSize}MB)` : ''}</span>
            <div>
                ${book instanceof EBook ? '<button class="download-button">Download</button>' : ''}
                <button class="delete-button">Delete</button>
            </div>
        `;

        
        const deleteButton = bookInstances.querySelector('.delete-button');
        deleteButton.addEventListener('click', ()=> deleteBook(index));

        
        if (book instanceof EBook) {
            const downloadButton = bookInstances.querySelector('.download-button');
            downloadButton.addEventListener('click', ()=> book.download());
        }

        
        libraryContainer.appendChild(bookInstances);
    });
}

function deleteBook(index) {
    books.splice(index, 1); 
    displayLibrary(); 
}

bookTypeRadioBtns.forEach(btn=>{
    btn.addEventListener('change',(ev)=>{
        if (ev.target.value === 'ebook') {
            fileSizeInput.classList.remove('hidden');
        } else {
            fileSizeInput.classList.add('hidden');
            fileSizeInput.value = ''; 
        }

    })
})

form.addEventListener('submit', (ev) =>{
    ev.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const fileSize = document.getElementById('fileSize').value;

    let newBook;

    const selectedBookType = [...bookTypeRadioBtns].find(radio => radio.checked).value;

    if (selectedBookType === 'ebook') {
        newBook = new EBook(title, author, year, fileSize); 
    } else {
        newBook = new Book(title, author, year); 
    }


    books.push(newBook);

 
    displayLibrary();

    
    form.reset();
    fileSizeInput.classList.add('hidden'); 
});