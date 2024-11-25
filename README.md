# ElancoAPIProject
Project Overview
This project is a web application designed to retrieve and display country and population data using a REST API. The application allows users to visualize population data for various countries, making it easy to understand how many people live in each country. This project aligns with Elanco’s goal of leveraging software-defined solutions and third-party APIs to create robust and user-friendly applications.

Features
Dynamic API Integration: Fetches data from multiple REST API endpoints for countries, capitals, flags, and population details.
Real-time Search Functionality: Users can search for specific countries, and the app dynamically updates the results.
Responsive Frontend: Designed with HTML and styled using CSS to provide a clean and user-friendly interface.
Asynchronous Data Handling: Utilizes JavaScript's fetch API with async/await for efficient and smooth data retrieval.
Error Handling: Gracefully manages failed API requests with user-friendly feedback.
API Details
The application interacts with the following APIs:

Get all countries and their capitals
GET https://countriesnow.space/api/v0.1/countries/capital
Get a single country with its flag
POST https://countriesnow.space/api/v0.1/countries/flag/images
Get cities and their population data
GET https://countriesnow.space/api/v0.1/countries/population/cities
For additional APIs, visit the API Documentation.

Technologies Used
Frontend: HTML, CSS
Programming Language: JavaScript
API Consumption: JavaScript fetch API
Development Environment: Any modern browser
Version Control: Git and GitHub

Application Structure
HTML: Provides the structure for the web application.
CSS: Ensures a responsive and visually appealing design.
JavaScript: Handles API requests, data processing, and dynamic rendering of content.
Data fetching: Retrieves country and population data from the API.
Dynamic rendering: Displays the fetched data on the webpage.
Search functionality: Allows users to search and filter countries in real time.
