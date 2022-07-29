Key Features:
    - Created a database with a table called pets and a table called owner
    - Created a server that is hosted on port 4000
    - Created a button for all owners. When pressed the eventlistener will send a fetch request to the server. The server will then send a GET request to the database. Created a similar button for all pets
    -Created a button for adding a new owner. When clicked the eventlistener will read all input fields for the new owner and send a post request to the server. The server will then send a POST request to the database. Created a similar button for all pets
    -Added error handling into the server requests.

Lessons Learned:
    - Learned how to connect front end to a back end server.
    - Learned how to use Fetch to make a post request.
    - Watch spelling. Simple spelling mistakes cause me to time

How To Use:
    - Open terminal at project folder.
    - Create database named ownerPets
    - Migrate the migration.sql and seed.sql files to the database.
    - Open project in your VS Code.
    - Start expressServer using Nodemon.
    - Open browser and go to localhost:4000
    - Click on buttons/add information. View returned information in the developer tools console.

