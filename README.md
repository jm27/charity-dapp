# Stellar Donations

## Overview

Stellar Donations is a decentralized application that facilitates donations between donors and charities using Stellar's blockchain technology. The app provides a user-friendly interface for managing donations, viewing transaction histories, and updating charity profiles.

## Technologies Used

- **Create React App**: For scaffolding and managing the React application.
- **Tailwind CSS v3.0**: For styling the application with a modern and responsive design.
- **React**: The core library for building the user interface.
- **Stellar SDK**: For interacting with the Stellar blockchain to process transactions.
- **react-router-dom**: For handling routing and navigation within the application.
- **GitHub Pages**: For deploying the application.

## Features

- **Home Page**:

  - **Title**: “Welcome to Stellar Donations!”
  - **Description**: "Empowering change, one donation at a time. Whether you’re here to give or to receive, our platform makes it simple and secure. Join our community by logging in or registering today!"
  - **Navigation**: Buttons for logging in or registering.

- **Register Page**:

  - **Form Fields**: Name, Email, Password, Role (Donor/Charity), and an optional Public Key.
  - **Key Pair Generation**: If a user chooses not to provide a public key, the app generates a key pair. The public key is saved in the database, while the secret key is securely provided to the user for safe storage.

- **Login Page**:

  - **Form Fields**: Email and Password.
  - **Validation & Redirection**: User credentials are checked against stored data. Upon successful login, users are redirected to the appropriate dashboard based on their role.

- **Donor Dashboard**:

  - **Greeting**: “Welcome, [Donor’s Name]! Ready to make a difference?”
  - **Donation Form**:
    - Secret Key: The donor inputs their Stellar secret key.
    - Destination Public Key: The public key of the charity they wish to donate to.
    - Amount: The donation amount.
  - **Transaction History**: A list displaying all past donations, including amount, recipient’s public key, and transaction date.

- **Charity Dashboard**:

  - **Greeting**: “Hello, [Charity’s Name]! Let’s make an impact.”
  - **Profile Link**: A link to edit the charity’s profile.
  - **Received Donations**: A list displaying all donations received, including amount, donor’s public key, and transaction date.

- **Charity Profile**:
  - **Form Fields**: Name, Mission, Contact Information, Fundraising Goal, Amount Raised.
  - **Progress Bar**: Displays the percentage of the fundraising goal achieved based on the amount raised.

## What I Built

This project allows users to make and manage donations on the Stellar blockchain. Donors can contribute to their chosen charities, and charities can track the donations they receive. The app leverages Stellar’s blockchain for secure, real-time transactions, and features dynamic profile and donation management.

## Journey

Implementing this project involved working extensively with Stellar's blockchain technology, including transactions, public/private keys, and the elliptic curve algorithm for security and performance. I also learned to effectively use Stellar APIs and integrate them with React and Tailwind CSS. A highlight was implementing real-time donation functionality and handling key management securely.

## What’s Next

Future enhancements include implementing a feature to partially release donations to charities, contingent upon them posting proof of resource utilization. This will add a layer of accountability and ensure that funds are used effectively.

## Installation and Setup

1. **Clone the Repository**

   - `git clone https://github.com/your-username/stellar-donations.git`
   - `cd stellar-donations`

2. **Install Dependencies**

   - `npm install`

3. **Run the App Locally**

   - `npm start`

4. **Deploy to GitHub Pages**
   - `npm run deploy`

## Navigation

- **Home**: Welcome page with options to log in or register.
- **Register**: Form for creating a new account.
- **Login**: Form for accessing an existing account.
- **Donor Dashboard**: Interface for making donations and viewing donation history.
- **Charity Dashboard**: Interface for viewing received donations and editing the charity profile.
- **Charity Profile**: Form for updating charity details and tracking fundraising progress.

For more details, visit our GitHub repository and check out the documentation and source code.
