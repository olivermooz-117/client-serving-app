// Fetch and display all books
function loadBooks() {
  fetch("/books")
    .then(res => res.json())
    .then(books => {
      const list = document.querySelector("#book-list");
      list.innerHTML = ""; // clear before re-rendering
      books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.author}` +
          (book.checked_out ? " (checked out)" : " (available)");

        // Toggle checkout button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.checked_out ? "Return" : "Check out";
        toggleBtn.addEventListener("click", () => toggleCheckout(book.id));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteBook(book.id));

        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    });
}

// Add a new book via form submission
document.querySelector("#add-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title-input").value;
  const author = document.querySelector("#author-input").value;

  fetch("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author })
  })
    .then(res => res.json())
    .then(() => {
      e.target.reset();
      loadBooks(); // re-fetch full list to stay in sync
    });
});

// Toggle checked_out status
function toggleCheckout(bookId) {
  fetch(`/books/${bookId}`, { method: "PATCH" })
    .then(res => res.json())
    .then(() => loadBooks());
}

// Delete a book
function deleteBook(bookId) {
  fetch(`/books/${bookId}`, { method: "DELETE" })
    .then(() => loadBooks());
}

// Initial load
loadBooks();