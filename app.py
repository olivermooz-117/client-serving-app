from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# Simulated in-memory book list
books = [
    {"id": 1, "title": "Dune", "author": "Frank Herbert", "checked_out": False},
    {"id": 2, "title": "1984", "author": "George Orwell", "checked_out": False}
]

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(".", "index.html")

@app.route("/script.js", methods=["GET"])
def script():
    return send_from_directory(".", "script.js")

@app.route("/books", methods=["GET"])
def get_books():
    return jsonify(books)

@app.route("/books", methods=["POST"])
def create_book():
    data = request.get_json()
    new_book = {
        "id": max((book["id"] for book in books), default=0) + 1,
        "title": data.get("title", "Untitled"),
        "author": data.get("author", "Unknown"),
        "checked_out": False
    }
    books.append(new_book)
    return jsonify(new_book), 201

@app.route("/books/<int:book_id>", methods=["PATCH"])
def toggle_checkout(book_id):
    book = next((b for b in books if b["id"] == book_id), None)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    book["checked_out"] = not book["checked_out"]
    return jsonify(book)

@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    global books
    book = next((b for b in books if b["id"] == book_id), None)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    books = [b for b in books if b["id"] != book_id]
    return "", 204

if __name__ == "__main__":
    app.run(debug=True)