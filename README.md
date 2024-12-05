<h1 align="center"> ElevateHub - Your Pathway to Expert Assistance </h1>

<div align="center">

<i>ElevateHub is an innovative online platform designed to bridge the gap between junior novices and seasoned experts across various industries. Whether you're a student looking for guidance, a budding professional seeking career advice, or an individual encountering technical hurdles, ElevateHub is here to connect you with experienced mentors from around the globe.</i>

</div>

<div align="center">

## 💻 Tech Stacks

<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">&nbsp;&nbsp;<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

</div>

<h2 align="center"> -> Key Features <- </h2>

- **Bug Solving**
   Encountered a stubborn bug in your code that's impeding your progress? Fear not! With ElevateHub, you can seek assistance from experienced developers who can help you troubleshoot and debug your code efficiently.

- **Tech Career Assistance**
   Navigating the complex landscape of a tech career can be daunting, especially for beginners. ElevateHub provides a platform where you can seek guidance on career paths, skill development, job opportunities, and industry insights from seasoned professionals.

- **Academic Support**
   Struggling with a challenging academic concept or assignment? ElevateHub offers a supportive environment where you can connect with knowledgeable individuals who can provide clarity, guidance, and assistance with your academic endeavors.

## Step-by-step building guide:

>Note: For each step write frontend, backend code, store data in DB, and then move forward to the next step

## Step 1:

#### Create login and signup pages for juniors and seniors
- **Data to get from juniors/students:** name, email, phone
- **Data to get from seniors/experts:** name, expertise, field, college, job title

### Frontend:
- Create login and signup UI pages for juniors and seniors
- Include form fields to capture required data
- Implement form validation for input fields

### Backend:
- Create endpoints for user authentication (login and signup) for both juniors and seniors
- Implement validation and authentication logic
- Store user data in the database

### Database:
- Design database schema to store user information (juniors and seniors)
- Create tables for juniors and seniors with appropriate fields

## Step 2:

#### After junior/student's login, they must get 3 fields to choose:
- Bug solving
- Tech career assistance
- Academic support

### Frontend:
- Implement UI for the selection of assistance fields after junior login

### Backend:
- Update the user profile to include the selected assistance fields
- Handle user preferences and choices in the backend

## Step 3:

- List all the experts/seniors who have registered on the website with their detailed info

>Note: Get the data of registered experts/seniors from the DB

### Frontend:
- Create a page to display a list of registered experts/seniors with their details

### Backend:
- Implement logic to fetch and retrieve registered experts/seniors from the database

## Step 4: (Chats)

- Create a chatting functionality for selected expert and the junior
>Note: Here they will discuss the problem and the amount of fees required to solve the problem

### Frontend:
- Implement a chat interface for communication between juniors and selected experts

### Backend:
- Develop WebSocket or HTTP endpoints to handle real-time messaging between users
- Store chat messages in the database for future reference

## Step 5: (Payment Gateway)

- Integrate a payment gateway for pre-payment

### Frontend:
- Implement UI for initiating payment for expert assistance

### Backend:
- Integrate payment gateway APIs for processing payments
- Handle payment status and update user profiles accordingly

## Step 6: (Meet)

- Provide them with an option to conduct an online meeting to solve the problem

### Frontend:
- Implement UI for scheduling and conducting online meetings between juniors and experts

### Backend:
- Develop functionality for scheduling and managing online meetings
- Integrate video conferencing APIs for real-time communication

## Step 7:

- Get the final payment and feedback from the junior

### Frontend:
- Implement UI for confirming final payment and collecting feedback from juniors

### Backend:
- Handle payment confirmation and feedback submission logic
- Update user profiles and records based on payment completion and feedback

# Project Title

A brief description of what this project does and who it's for

## Installation

#### Creating a Fork of the Repo and Clonning 

1 . Clone the repository :

```
git clone https://github.com/samarthhapse/ElevateHub 
```

2 . Navigate to the project directory :
```
cd ElevateHub 
```

3 . Add git remote upstream throught the terminal navigating to the profile file: 
```
git remote add upstream https://github.com/samarthhapse/ElevateHub 
```


#### To get started with ElevateHub frontend, follow these steps:

1 . Start frontend :
```
cd client
```

2 . Install dependencies :
```
npm install
```

3 . Add A Environment Variable File `.env` having the Variables : 
```
CLIENT_ID=<THE-GOOGLE-AUTH-CLIENT-ID>
CLIENT_SECRET_KEY=<THE-GOOGLE-AUTH-CLIENT-ID>
CLIENT_REDIRECT_URL=<THE-URL-OF-YOUR-BACKEND>

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=<YOUR-APPWRITE-PROJECT-ID>

PORT=<PORT-AT-WHICH-YOUR-BACKEND-IS-RUNNING>
```

3 . Run client on localhost :

```
npm run dev
```

#### To get started with ElevateHub Backend, follow these steps:

1 . Direct to the ElevateHub project directory -> then to the server directory by using :
```
cd server
```

2 . Install dependencies :
```
npm install
```

3 . Add A Environment Variable File `.env` having the Variables : 
```
MONGO_URI=<YOUR-MONGODB-ATLAS-DATABASE-URL>
PORT=<PORT-YOUR-WANT-YOUR-BACKEND-TO-RUN>

CLOUDINARY_CLOUD_NAME=<YOUR-CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR-CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR-CLOUDINARY_API_SECRET>

SERVER_ADDRESS=<WHERE_YOUR_BACKEND_IS_RUNNING_> eg(http://localhost/PORT_NO.)

#If your dont have these details create one on https://ethereal.email/ and create a demo account
MAIL_HOST=<MAIL-HOST>
MAIL_PORT=<MAIL-PORT>
MAIL_AUTH_USER=<MAIL_AUTH_USER>
MAIL_AUTH_PASSWORD=<MAIL_AUTH_PASSWORD>
MAIL_OWNER_FOR_AUTH=<MAIL_ID_OF_MODERATOR/OWNER_OF_WEBSITE>

JWT_SECRET_KEY=<YOUR-JWT_SECRET_KEY>
```

3 . Run client on localhost :

```
npm run dev
```


This will launch the application frontend in your default web browser.
>You can access it at `http://localhost:5173`



<div>
 
<h2 align = "center">Our Contributors ❤️</h2>
<div align = "center">
 <h3>Thank you for contributing to our repository</h3>

![Contributors](https://contrib.rocks/image?repo=samarthhapse/ElevateHub)

### Show some ❤️ by starring this awesome repository!

</div>

