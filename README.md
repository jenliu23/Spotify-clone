# Song-percent

Song-percent is a light-weight clone of Spotify website. 

The live site could be accessed through link: https://song-percent.onrender.com
## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Splash Page
![Screenshot 2023-08-03 at 12 36 01](https://github.com/JENLIU2023/Spotify-clone/assets/123348326/3cf9da63-7cbf-4083-9f22-08320fc6bbfa)

## Single Playlist/Album
![Screenshot 2023-08-03 at 12 43 15](https://github.com/JENLIU2023/Spotify-clone/assets/123348326/d2147a84-1377-4071-bbe8-bc8f4e510b78)
![Screenshot 2023-08-03 at 12 47 20](https://github.com/JENLIU2023/Spotify-clone/assets/123348326/88b3e7ba-0d40-4b0c-ac0c-317701d1d7d5)

## Getting started
1. Clone this repository (https://github.com/JENLIU2023/Spotify-clone.git)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a .env file using the .envexample provided

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```
   ```bash
   flask db upgrade
   ```
   ```bash
   flask seed all
   ```
   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Features

### Audio player functions
  - Play/Pause
  - Skip/Previous
  - Shuffle
  - Repeat
  - Volume Control
  - Seek
  - Queue
  - Switch among all-songs list, albums and playlists
    
### Songs
  - All users can
    - view/listen to all the songs
  - Logged-in users can
    - upload/edit/delete their own songs
### Playlists
  - All users can
    - view/listen to all the playlists
  - Logged-in users can
    - create/edit/delete their own playlists
    - add/remove songs to/from their own playlists
### Albums
  - All users can
    - view/listen to all the albums
  - Logged-in users can
    - create/edit/delete their own albums
    - add/remove their uploaded songs to/from their own albums
### Favorites
  - Logged-in users can
    - add/remove favorite songs/playlists/albums to/from their list
