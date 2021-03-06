
Welcome to the EverNoted wiki!

![Splash](https://user-images.githubusercontent.com/13339377/167721282-6c93e2b0-7b9b-48e9-93f7-a3cd1fe43963.JPG)
## Overview

[Evernoted](https://aa-evernoted.herokuapp.com/) is an [Evernote](https://evernote.com/) clone which allows users to create notes as well as notebooks to help keep their lives organized. Evernoted helps you stay on top of your thoughts and ideas should you ever need to recall them.

## Application Architecture

Evernoted is built on a React frontend with a Flask backend, using PostgreSQL as a database.

## Technologies

Frontend

- React
- Redux
- Javascript
- HTML
- CSS

Backend

- Flask
- Python
- PostgreSQL
- SQLAlchemy

## Evernoted setup

1. Clone this repository ([https://github.com/dcaicedo87/EverNoted](https://github.com/dcaicedo87/EverNoted))
2. Install dependencies - `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a `.env` file based on the **_.env.example_** with proper settings required for the development environment
4. Setup PostgreSQL user, password and database and to make sure it matches the **_.env_** file
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   - `pipenv shell`
   - `flask db upgrade`
   - `flask seed all`
   - `flask run`
6. To run the React App in development, make sure you are in the `react-app` directory and use the following commands:
   - Run `npm install` to install the relevant packages
   - Run the application from this location using `npm start`

## Features

### Notes

Users can begin creating notes once signed in to Evernoted. They will be introduced to the "All Notes" page where they can click on the "ADD NOTE" button to create their very first note.

![All Notes Page](https://user-images.githubusercontent.com/13339377/164796918-4c50ac05-f6b9-4d84-a875-3446c8729f51.JPG)

### Notebooks

Users can also create notebooks where they can hold a collection of notes to a particular theme or idea. Once inside the notebook, you are free to add, edit and delete notes. Users also have the ability to edit the notebook title should they desire.

![notebooks index page](https://user-images.githubusercontent.com/13339377/164794535-37c79f98-44c1-488f-b58a-cf52286be8fc.JPG)

![notebook notes](https://user-images.githubusercontent.com/13339377/164794541-0df1e870-7156-415f-bdf8-9a8c168ac21c.JPG)

## Links to wiki documentation

[https://github.com/dcaicedo87/EverNoted/wiki](https://github.com/dcaicedo87/EverNoted/wiki)
