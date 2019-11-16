# SwitchOn-assignment
A MERN App

Steps to Run:
1. Run npm install inside the client directory.
2. Run npm install inside the source directory.
3. Add .env file with the following details
    JWT_SECRET = 'hello_world_1010101'
    PORT = 8081
    MONGO_URI = mongodb://localhost:27017/assignment
 
 4.npm run start

How it works:
1. Sign Up as a user using the form that appears on the front page. You will be redirected to a dashboard.
2. In the dashboard there is a form that allows the user to enter a random number
3. As soon as the number is entered it is displayed in a card below the form.
4. In the backend, as soon as the number is pushed to db socket.io is used to fetch the data and render it to the page.
5. The card containing the number also contains elapsed time since insertion which gets updated everytime a new number is added or the page is refreshed.
