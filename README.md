
# Movie DB

## Overview
A full-stack website built with React and TypeScript which contains information about thousands of movies, series and famous people involved in the film/television industry.
This webstite includes a register/login system made with Express and MySQL. Signed in users can rate and save movies/tv shows to their favourites’ list. Usernames/passwords, users ratings, as well as users favourited movies/shows are stored in a MySQL database.

## Features

- Home page with trending, and latest movies. (Can be switched to tv shows with the click of a button).
- Seperate pages for movies tv shows, and people. These pages contain sort functionality.
- Sort functions include - popular, now showing, top rated, and upcoming.
- Register/login in system.
- Signed in users can rate and save movies and tv shows to the favourited list.
- Passwords are hashed with Bcrypt.

## Run Locally

Clone the project

```bash
  git clone https://github.com/ScottHahn1/Movie-DB.git
```

Go to the project directory

```bash
  cd Movie-DB
```

Install client-side dependencies

```bash
  cd client
  npm install
```

Start the frontend server

```bash
  npm start
```

Install server-side dependencies
```bash
  cd server
  npm install
```

Start the backend server

```bash
  npm run dev
```
