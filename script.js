// Creation of array to stock books
let books = [];

// Nav between pages (display selected page)
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('d-none'));
    document.querySelector(`#${pageId}`).classList.remove('d-none');
}

// Creation of function to add books in a list and to manage them
function addBook() {
    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();

    // If inputs of title and author aren't empty
    if (title && author) {
        // Add new book to array books[]
        books.push({
            title,
            author,
            read: false
        });
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";

        // Display popup
        showPopupMessage('Livre ajouté à la liste !')
    } else {
        alert('Veuillez entrer un titre et un auteur pour le livre.');
    }
}

// Pop-up management
function showPopupMessage(message) {
    const popup = document.querySelector('#popup-message');

    // Integration of an icon 
    popup.innerHTML = `<img src="https://img.icons8.com/office/30/approval.png" alt="approval" class="icone8"/>${message}`;

    // Classes deleted
    popup.classList.remove('d-none', 'hide-popup');
    // Class added to apply CSS style
    popup.classList.add('show-popup');

    // Duration of popup
    setTimeout(() => {
        popup.classList.remove('show-popup');
        popup.classList.add('hide-popup');
        setTimeout(() => popup.classList.add('d-none'), 500);
    }, 2000);

}



// Display list of book
function displayBookList() {
    const viewBookList = document.querySelector('#view-book-list');
    viewBookList.innerHTML = "";

    // For each book
    books.forEach(book => {

        // create a list 'li'
        const li = document.createElement('li');
        // Add Bootstrap class
        li.classList.add('list-group-item');
        // Define content of each li
        li.textContent = `${book.title} - ${book.author}`;
        // Define each li as a child of viewBookList
        viewBookList.appendChild(li);
    });
}

// Display list with options
function displayEditBookList() {
    const editBookList = document.querySelector('#edit-book-list');
    editBookList.innerHTML = "";
    // Same as displayBookList()
    books.forEach((book, index) => {
        
        const li = document.createElement('li');
        // CSS Bootstrap classes added : list group, flex, and alignment
        li.classList.add('list-group-item', 'd-flex', 'align-items-center');
        
        // If the book as been readed,"readedBooks" CSS class added to change background color
        if (book.read) {
            li.classList.add('readedBooks');
        }

        // Add annotation 'lu' if book readed
        const readText = book.read ? `<span class="text-success">[lu]\xa0\xa0\xa0|\xa0</span>` : ``;
        const readButtonText = book.read ? `livre non lu`: `livre lu`;

        // Change the boolean state of the book with toggleRead function (defined later)
        const button = `<button onclick="toggleRead(${index})" class="btn btn-sm ${book.read ? 'btn-dark' : 'btn-success'} me-2">${readButtonText}</button>`;

        // HTML content with bootstrap classes for each li
        // Buttons style defined here : width and colors
        li.innerHTML = 
        `
            <span class="flex-grow-1">${book.title} - ${book.author}</span>
            ${readText}
            ${button}
        <div>    
            <button onclick="editBook(${index})" class="btn btn-sm btn-secondary me-2">Modifier</button>
            <button onclick="deleteBook(${index})" class="btn btn-sm btn-danger">Supprimer</button>
        </div>
        `;
        
        editBookList.appendChild(li);
    });
    // Defined later
    filterEditBooks();
}

// Function to change state of read of books, affected by onclick, previously in the Walking Dead (in buttons, sorry)
function toggleRead(index) {
    books[index].read = !books[index].read;
    displayEditBookList();
}

// delete book at the given index
// Splice method to delete 1 item of an array
function deleteBook(index) {
    books.splice(index, 1);
    displayEditBookList();
}


// Edit book to modify and replace Title or Author
function editBook(index) {
    // To edit, a prompt ask what is the new content. [To improve, a form should be better here]
    const newTitle = prompt("Nouveau titre :", books[index].title);
    const newAuthor = prompt("Nouvel auteur :", books[index].author);
    if (newTitle && newAuthor) {
        books[index] = {
            title: newTitle,
            author: newAuthor
        };
        displayEditBookList();
    }
}


// Event listener on click on nav buttons.
document.querySelector('.nav').addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // defines target of click, and displays associated page
        if (e.target.textContent.includes('Afficher ma liste')) {
            displayBookList();
        } else if (e.target.textContent.includes('Modifier ma liste')) {
            displayEditBookList();
        }
    }
});

// Search-bar function to filter edited books
function filterEditBooks() {
    // Select research input w/ ID, convert to lowercase
    const string = document.querySelector('#search-bar-edit').value.toLowerCase();
    // update element to be sure its empty 
    const editBookList = document.querySelector('#edit-book-list');
    editBookList.innerHTML = "";

    // Comparison with filter() for each book between the request and Title/Author
    // filteredBooks contain the books who matches 
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(string) || 
        book.author.toLowerCase().includes(string)
    );

    // Displays filtered books
    // Same method as before, create a li element for each book
    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center');
        
        if (book.read) {
            li.classList.add('readedBooks');
        }

        const readText = book.read ? `<span class="text-success">[lu]\xa0\xa0\xa0|\xa0</span>` : ``;
        const readButtonText = book.read ? `livre non lu` : `livre lu`;
        
        const button = `<button onclick="toggleRead(${index})" class="btn btn-sm ${book.read ? 'btn-dark' : 'btn-success'} me-2">${readButtonText}</button>`;
        
        li.innerHTML = 
            `
            <span class="flex-grow-1">${book.title} - ${book.author}</span>
            ${readText}
            ${button}
            <div>    
                <button onclick="editBook(${index})" class="btn btn-sm btn-secondary me-2">Modifier</button>
                <button onclick="deleteBook(${index})" class="btn btn-sm btn-danger">Supprimer</button>
            </div>
            `;
        
        editBookList.appendChild(li);
    });
}







                    // NOTES / POUBELLE //

// Cool Bootstrap classes : 

// btn-sm -> btn-lg / btn-primary, secondary, success, warning, info, dark
// 
// mx-auto
// list-group-item
// d-flex, align-item-center
// form-control
// 



// function markedAsRead() {
//     const checkboxes = document.querySelectorAll('#edit-book-list input[type="checkbox"]');
//     checkboxes.forEach(checkbox => {
//         const index = checkbox.getAttribute('data-index');

//         if (checkbox.checked) {
//             books[index].read = true;
//         } else {
//             books[index].read = false;
//         }
//     });
//     displayEditBookList();
// }


// document.addEventListener("DOMContentLoaded", () => {
//     const titleInput = document.querySelector('#title');
//     const authorInput = document.querySelector('#author');

//     titleInput.addEventListener("keydown", handleEnterKey);
//     authorInput.addEventListener("keydown", handleEnterKey);
// });

// document.addEventListener(event) {
//     if(event.key === "enter") {
//         addBook();
//         event.preventDefault();
//     }
// }