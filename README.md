<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<a name="readme-top"></a>

# 🚀 User Management System with Webhook Integration  

## 📚 Table of Contents  

- [📖 About the Project](#about-project)
- [🛠️ Built With](#built-with)
- [⚙️ Tech Stack](#tech-stack)
- [⭐ Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [🔧 Prerequisites](#prerequisites)
  - [🛠️ Setup](#setup)
  - [📦 Install](#install)
  - [🚀 Usage](#usage)
- [📡 API Endpoints](#api-endpoints)
  - [👤 User Management](#user-management)
  - [🔗 Webhook Integration](#webhook-integration)
- [🧪 Testing](#testing)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [⭐ Show Your Support](#support)
- [🤝 Contributing](#contributing)
- [🙏 Acknowledgments](#acknowledgments)
- [📝 License](#license)

---

## 📖 About the Project <a name="about-project"></a>

This is a **User Management System** built with **NestJS and Firestore**, featuring **Webhook Integration** similar to WhatsApp.

### 🔹 Objectives:
✅ **User Management API** (CRUD operations with validation & pagination)  
✅ **GraphQL & REST support** for user queries  
✅ **Webhook Integration** (process messages securely)  
✅ **Secure API** with authentication  
✅ **Real-time Firestore updates**  
✅ **Rate-limiting** for webhook requests  
✅ **Comprehensive testing**  

[Back to Top](#readme-top)

---

## 🛠️ Built With <a name="built-with"></a>

### ⚙️ Tech Stack <a name="tech-stack"></a>

- **NestJS** (Backend Framework)  
- **TypeScript** (Strongly Typed JavaScript)  
- **Firebase Firestore** (NoSQL Database)  
- **GraphQL & REST APIs**  
- **Jest** (Testing Framework)  
- **Rate Limiting** (API Security)  

[Back to Top](#readme-top)

---

## ⭐ Key Features <a name="key-features"></a>

✅ **User Management API** (Create, Read, Update, Delete users)  
✅ **GraphQL API** for user data  
✅ **Webhook Integration** for message processing  
✅ **Secure API authentication**  
✅ **Real-time Firestore updates**  
✅ **Rate Limiting** (Throttle webhook requests)  
✅ **Robust Error Handling**  
✅ **Comprehensive Testing**  

[Back to Top](#readme-top)

---

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps:

### 🔧 Prerequisites <a name="prerequisites"></a>

Ensure you have the following installed:

- **Node.js** (v14+ recommended)  
- **npm** or **yarn**  
- **Firebase CLI** (for Firestore setup)  

### 🛠️ Setup <a name="setup"></a>


### Clone the repository:

* git clone https://github.com/kkmanuu/nestjs-user-management  
* cd user-management-webhook  
* Install <a name="install"></a>
To install all dependencies, run:

 
###  or  
* yarn install  
Usage <a name="usage"></a>

### 🗄️ Firestore for Data Storage

* This project uses Firebase Firestore, a cloud-based NoSQL database, to store and manage user data efficiently. Firestore provides real-time data syncing, scalability, and security features, making it ideal for user management applications.

## 🔹 Firestore Setup
To set up Firestore for this project, follow these steps:

* Create a Firebase Project

* Go to Firebase Console
- Click Add Project and follow the setup instructions
Enable Firestore

In the Firebase console, navigate to Firestore Database
Click Create Database and choose Start in production mode
Add Firestore Credentials

In the Project Settings under the Service Accounts tab, generate a new private key
Save the JSON file and update your .env file with these values:
env

<pre> FIREBASE_PROJECT_ID=your_project_id FIREBASE_PRIVATE_KEY=your_private_key FIREBASE_CLIENT_EMAIL=your_client_email WEBHOOK_SECRET_TOKEN=your_secret_token </pre>

The NestJS application connects to Firestore using Firebase Admin SDK
User data is stored in the users collection with unique IDs
Set up Firestore in Firebase Console.
Create a .env file and add your credentials:
Use Firestore for data storage.




* Start the server:

* npm run start  
# or  
yarn start  
The API will be available at http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### :🚀🔥rocket: 

API Endpoints <a name="api-endpoints"></a>
User Management <a name="user-management"></a>
Method	Endpoint	Description

``POST	/users	Create a user
GET	/users	Fetch users (paginated)
GET	/users/{id}	Retrieve a specific user
PATCH	/users/{id}	Update user details
Webhook Integration <a name="webhook-integration"></a>
Method	Endpoint	Description
POST	/webhook	Process messages``

### 📨 Webhook Payload Example
json
Copy

{
  "message": "Hello",
  "phone": "+1234567890"
}

### 🔒 Security
http
Copy

Authorization: Bearer <SECRET_TOKEN>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🧪 Testing

Testing <a name="testing"></a>
Run unit & end-to-end tests:


```npm run test  ```

```npm run test:e2e  ```
### ✅ Test Coverage Includes:

* User creation (ensuring unique emails)
Webhook security (token validation)
Pagination in GET /users
Webhook reply logic
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### :telescope:
 ### 🔮 Future Features<a name="future-features"></a>
* OAuth Authentication for secure login
* Role-based Access Control

Webhook Event Logging
Multi-Language Support
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### 👥 Authors<a name="authors"></a>
:bust_in_silhouette: *Emmanuel Kipngeno*
- GitHub: [@githubhandle](https://github.com/kkmanuu)
- Twitter: [@twitterhandle](https://twitter.com/kkmanuu)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/emmanuel-kipngeno/)


## :pray: Acknowledgments <a name="acknowledgements"></a>
I would like to thank  Fuzu for this opportunity.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📜 License <a name="license"></a>
This project is [MIT](./LICENSE.md) licensed.
<p align="right">(<a href="#readme-top">back to top</a>)</p>