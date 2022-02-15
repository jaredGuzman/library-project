// TODO
// * Generate form in js if ! one already on page && on button click
// * On form submit:
//   * Set newBook = Book() and addBookToLibraryBook(newBook)on form submit
//   * Remove form from page
//   * Update 


let myLibrary = [];
let newBook;

function Book(title, author, pageCount, read, other) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.other = other;
}


// Pretty simple, given a Book object, it adds the book to the library array 

function addBookToLibrary(book) {
    if (book instanceof Book) {
        myLibrary.push(book);
    }
}

// Title must be a string and is case sensitive

function deleteBook(title) {
    let tempLibrary = [];
    myLibrary.forEach(book => {
        if (book.title != title) {
            tempLibrary.push(book);
        }
    })
    myLibrary = tempLibrary;
}

function toggleReadStatus(title) {
    myLibrary.forEach(book => {
        if (book.title == title) {
            switch (book.read) {
                case ('read'):
                    book.read = 'unread';
                    break;
                case ('unread'):
                    book.read = 'read';
                    break;
            }
        }
    })
}




// Main function of this JS
// 
// 

function makeBookCard(book) {
    // Generate book card container
    let bookCard = document.createElement('div');
    bookCard.classList.add('card');
    // Loop through each book object property and add 
    // it to the card inside an HTML element in some 
    // way - to display on page.
    //
    // Method: Generate tag -> add [value] as innerText -> add element to bookCard element
    // 
    for (const [key, value] of Object.entries(book)) {
        let bookCardContent;
        switch (key) {
            case 'title':
                // Set title value
                bookCardContent = document.createElement('h2');
                bookCardContent.classList.add('book-title');
                bookCardContent.innerText = `Title: ${value}`;

                bookCard.setAttribute('title', `${value}`); // Set attribute to associate value with array values
                break;
            case 'author':
                bookCardContent = document.createElement('p');
                bookCardContent.classList.add('book-author');
                bookCardContent.innerText = `Author(s): ${value}`;
                break;
            case 'pageCount':
                bookCardContent = document.createElement('p');
                bookCardContent.classList.add('page-count');
                bookCardContent.innerText = `${value} pages long.`;
                break;
            case 'read':
                bookCardContent = document.createElement('div');
                bookCardContent.classList.add('read-status-container');
                let readStatus = document.createElement('p');
                // Changes display depending on what the user selects
                if (value == 'read') {
                    readStatus.classList.add('read');
                    readStatus.innerText = `Read`;
                } else {
                    readStatus.classList.add('unread');
                    readStatus.innerText = `Unread`;
                }
                bookCardContent.appendChild(readStatus);

                // Add toggle read status button + functionality
                let toggleReadStatusButton = document.createElement('button');
                toggleReadStatusButton.classList.add('toggle-read-status-button');
                toggleReadStatusButton.innerText = 'Toggle read';
                toggleReadStatusButton.addEventListener('click', () => {
                    toggleReadStatus(bookCard.getAttribute('title'));
                    displayBooks();
                })
                bookCardContent.appendChild(toggleReadStatusButton);
                break;
            case 'other':
                // For 'other info section
                bookCardContent = document.createElement('div');
                bookCardContent.classList.add('other-info');
                bookCardContent.innerText = value;
            default:
                break
        }
        if (bookCardContent != undefined) {
            bookCard.appendChild(bookCardContent); // check in case nothing matches the above switch cases 
        }
    }

    // Add book card delete button + functionality
    let bookCardDeleteButton = document.createElement('button'); // Add delete button
    bookCardDeleteButton.classList.add('delete-item');
    bookCardDeleteButton.innerText = 'Delete Entry';
    bookCardDeleteButton.addEventListener('click', () => {
        deleteBook(bookCard.getAttribute('title'));
        displayBooks();
    })
    bookCard.appendChild(bookCardDeleteButton);

    // return entire HTML obj
    return bookCard
}

// Loops through the array storing books and adds them to the bookcardContainer
function displayBooks() {
    let bookCardContainer = document.querySelector('.cards');
    bookCardContainer.innerHTML = ''; // Reset all book cards
    myLibrary.forEach((book) => {
        let bookCard = makeBookCard(book);
        bookCardContainer.appendChild(bookCard);
    })
};

// Show new book form, by removing 'hidden' class and resetting form
function showNewForm() {
    let currentFormBG = document.querySelector('.book-form-bg');
    let contentWrapper = document.querySelector('.content-wrapper');
    if (currentFormBG.classList.contains('hidden')) {
        currentFormBG.classList.remove('hidden');
        contentWrapper.classList.remove('remove-scroll');
        resetBookForm();

        // Close form if user clicks outside of form
        const form = document.querySelector(".book-form-container")
            // Detect all clicks on the document
        currentFormBG.addEventListener("click", function(event) {
            // If user clicks inside the element, do nothing
            if (event.target.closest(".book-form-container")) return
            hideBookForm(); // If user clicks outside the element, hide it
        })
    } else {
        console.log('Oops, you weren\'t supposed to be able to do that!');
    }
};


// Hide book form by adding 'hidden' class and resetting values, used on submission
function hideBookForm() {
    let currentFormBG = document.querySelector('.book-form-bg');
    let contentWrapper = document.querySelector('.content-wrapper');
    if (!currentFormBG.classList.contains('hidden')) {
        currentFormBG.classList.add('hidden');
        contentWrapper.classList.add('remove-scroll');
        resetBookForm();
    } else {
        console.log('Oops, you weren\'t supposed to be able to do that!');
    }
}

function resetBookForm() {
    let currentForm = document.querySelector('#add-new-book-form');
    let currentOtherInfo = document.querySelector('#other-info');

    currentForm.reset();
    currentOtherInfo.value = '';
};


// Main Button
document.querySelector('.add-book-form').addEventListener("click", () => {
    showNewForm();
});


// Form submit button
document.querySelector('#add-book-card').addEventListener('click', () => {
    // Get form values
    let formBookTitle = document.querySelector('#book-form-title');
    let formAuthor = document.querySelector('#book-form-author');
    let formPageCount = document.querySelector('#book-page-count');
    let formReadStatus = document.querySelector('#read-book-status');
    let formOtherInfo = document.querySelector('#other-info');



    // check for required values, and display user input if there is something that hasn't been filled out properly
    if (formBookTitle.value == '' || formAuthor.value == '' || formPageCount.value == '' || formReadStatus.value == '') {
        if (formBookTitle.value == '') {
            formBookTitle.classList.add('red-outline')
        };
        if (formAuthor.value == '') {
            formAuthor.classList.add('red-outline')
        };
        if (formPageCount.value == '') {
            formPageCount.classList.add('red-outline')
        };
        if (formReadStatus.value == '') {
            formReadStatus.classList.add('red-outline')
        };

    } else {

        // Make book
        let newBook;
        if (formOtherInfo.value == '') {
            newBook = new Book(formBookTitle.value, formAuthor.value, formPageCount.value, formReadStatus.value);
        } else {
            newBook = new Book(formBookTitle.value, formAuthor.value, formPageCount.value, formReadStatus.value, formOtherInfo.value);
        }

        // Add book
        addBookToLibrary(newBook);

        // Display book cards
        displayBooks();

        // Hide form (also resets form)
        hideBookForm();

        let introPara = document.querySelector('.init-intro');
        if (introPara) {
            introPara.innerText = 'Ooh, nice choice!';
        }
    }
})