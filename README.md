# Cutielp
### Summary
Cutielp is inspired by Yelp that allows users to search restaurants serving cute-looking food.

### Project Wiki
* API Documentation
* Database Schema
* Feature List
* Redux State Shape
* User Stories

### This project is built with:
* SQLAlchemy
* Flask
* React
* Redux
* Docker
* Alembic

## Direction for Features
### Splash Page
Here you can view the splash page for Cutielp, visit my Github and LinkedIn profiles, explore all restaurants, as well as log in or sign up for Cutielp.
![Screen Shot 2022-10-05 at 10 35 44 AM](https://user-images.githubusercontent.com/47489094/194125076-5233d507-9812-428a-80e0-8b23548ca4e6.png)

### Login Page:
If you have an account, you can enter your credentials and press Login. You can also login as a Demo user by clicking the "Sign in as Demo user" button.
![Screen Shot 2022-10-05 at 10 36 35 AM](https://user-images.githubusercontent.com/47489094/194125201-30da8390-4555-463a-937a-f6e90db92953.png)

### Sign Up Page:
You can sign up for Nah-sana by filling out the sign up form and pressing "Sign Up"
![Screen Shot 2022-10-05 at 10 37 31 AM](https://user-images.githubusercontent.com/47489094/194125371-c8966581-f91a-4d0b-8c60-ea13478a1f6f.png)

### Businesses Home Page:
You can view all the restaurants, their preview picture, average rating, open and close time, and review showcase.
![Screen Shot 2022-10-05 at 10 39 54 AM](https://user-images.githubusercontent.com/47489094/194125790-8efaa826-8432-45a7-a112-e3b22fbe19ee.png)

### Business Detail page
Users can click on a business and be directed to the business detail page. This page displays a description of the business, overall rating, and review lists. If the signed-in user has not wrote a review for the restaurant, the user will have options to add one. 
![Screen Shot 2022-10-05 at 10 42 20 AM](https://user-images.githubusercontent.com/47489094/194126216-f4ae57d5-5f48-48a2-ba9f-e2c1c0ebd752.png)
![Screen Shot 2022-10-05 at 10 43 46 AM](https://user-images.githubusercontent.com/47489094/194126482-109aea01-7911-4766-83d6-7ab9c25bfed7.png)

### Create a business
Signed-in users can click the create a business button that opens a form to create a business.
![Screen Shot 2022-10-05 at 10 47 34 AM](https://user-images.githubusercontent.com/47489094/194127090-467c518e-3ede-4455-a4af-fb3c90478fd2.png)

### Edit a business
When signed in users click "Edit business" button, the users will be directed to a form with data pre-populated into the fields for the user to edit.
![Screen Shot 2022-10-05 at 10 49 21 AM](https://user-images.githubusercontent.com/47489094/194127540-e153375c-c58f-4b9f-93dc-271b72952e4b.png)

### Business review list:
When a user clicks on the business detail page, the user will see a list of reviews below the business infomation.
![Screen Shot 2022-10-05 at 10 51 30 AM](https://user-images.githubusercontent.com/47489094/194127977-53cd6b65-bcd7-480b-99bb-f6eb7dccda68.png)

### Create a review:
When a signed-in user click "write a review" button, a form will appear that let the user create a review.
![Screen Shot 2022-10-05 at 10 52 47 AM](https://user-images.githubusercontent.com/47489094/194128181-e3a7dc74-c7d5-4877-a8b9-624904ee01a9.png)

### Edit a review:
When a signed-in user click the edit review icon, a form will appear with data pre-populated into the fields for the user to edit.
![Screen Shot 2022-10-05 at 10 54 32 AM](https://user-images.githubusercontent.com/47489094/194128522-4f0e5d3c-e234-42a0-bbd2-fa4c9fcd4ff1.png)

### Delete a review:
When a signed-in review click the trash icon to delete a reveiw, a message will apear for the user to confirm the action.
![Screen Shot 2022-10-05 at 1 34 55 PM](https://user-images.githubusercontent.com/47489094/194158228-f84d3544-778e-4a03-a74f-0de620ae73c3.png)

# Local Installation
To run this application locally, you will need Python and NPM. This root folder contains a backend (app) and frontend (react-app) directory.

### Step1: Download
Clone the project repository in your terminal
```
https://github.com/chencc33/Cutielp.git
```
### Step2: Backend Setup
* Inside of the root directory, run the following command in the terminal to set up the necessary Python dependencies for running the backend server and database.
```
pipenv install -r requirements.txt
```
* Create a .env file based on the example with proper settings for your development environment
* Make sure the SQLite3 database connection URL is in the .env file
* Get into your pipenv, migrate your database, seed your database, and run your Flask app
