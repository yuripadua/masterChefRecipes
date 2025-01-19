# MasterChef Recipe Chatbot

This repository contains a MERN stack web application for a Recipe Chatbot that integrates with the Gemini API 1.5. The chatbot is designed to help users create and receive suggestions for recipes in a conversational interface.

## About the Application

The application is divided into two parts:
- **Frontend:** A React-based interface for interacting with the chatbot.
- **Backend:** A Node.js/Express API connected to MongoDB, powering the chatbot functionality and integrating with Gemini API 1.5 for advanced recipe suggestions.

**Note:** Both the frontend and backend are hosted on Render's free tier. As a result, the backend service may go to sleep when not in use, causing initial delays.

## How to Access and Wake Up the Application

Because the backend may be asleep, follow these steps to ensure the application works seamlessly:

1. **Wake the Backend:**
   - Visit the backend URL: [https://masterchefrecipesbackend.onrender.com/](https://masterchefrecipesbackend.onrender.com/)
   - Wait for the message: **"Recipe Chatbot API is running!"** This indicates that the backend is active.

2. **Access the Frontend:**
   - After the backend is awake, visit the frontend URL: [https://masterchefrecipesfrontend.onrender.com/](https://masterchefrecipesfrontend.onrender.com/)
   - If needed, refresh the page so the frontend can connect to the now-active backend.

Following these steps ensures that the frontend can communicate with the backend without issues.

## Features

- **Chatbot Interface:** Engage in conversation to create new recipes or receive suggestions.
- **Simple Email Authentication:** A basic email and password login system without email verification.
- **Gemini API 1.5 Integration:** Enhances chatbot capabilities for better recipe creation and suggestions.

## Technology Stack

- **MongoDB:** Database to store user information and recipes.
- **Express:** Backend framework for building the API.
- **React:** Frontend library for building a dynamic user interface.
- **Node.js:** JavaScript runtime powering the backend.
- **Gemini API 1.5:** Integrated to provide advanced recipe-related functionalities.

## Getting Started

1. Open the backend URL to wake up the server:
   [https://masterchefrecipesbackend.onrender.com/](https://masterchefrecipesbackend.onrender.com/)

2. Once the message "Recipe Chatbot API is running!" appears, visit the frontend:
   [https://masterchefrecipesfrontend.onrender.com/](https://masterchefrecipesfrontend.onrender.com/)

3. Interact with the chatbot to create recipes or get suggestions.

## Acknowledgments

- Built with the [MERN stack](https://www.mongodb.com/mern-stack).
- Hosted on [Render](https://render.com/) free tier.
- Integrated with [Gemini API 1.5](https://www.gemini.com/) for recipe capabilities.
