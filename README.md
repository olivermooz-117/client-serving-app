# Library Manager

A simple Flask web application for managing a library catalog with book checkout functionality.

## Features

- View all books in the library
- Add new books
- Check out/return books
- Delete books from the catalog

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python app.py
```

Open http://localhost:5000 in your browser.

## Tech Stack

- Flask (backend API and static file serving)
- Vanilla JavaScript (frontend with Fetch API)