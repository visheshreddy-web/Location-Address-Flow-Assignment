Location/Address Flow Project
Overview
This project implements a Location/Address flow similar to the one illustrated in the provided images. The solution allows users to select and save their delivery location using the Google Maps API for location search and geolocation. The project showcases skills in React for the frontend and Node.js for the backend.

Features
Location Permission Request:
Popup modal to inform the user when location permission is turned off.
Buttons for enabling location and manually searching for an address.
Geolocation & Pin Selection:
Interface for selecting a location.
Display and adjust the selected address on a map.
'Locate Me' button to find the current location automatically.
Delivery Address Form:
Form to enter specific address details.
Save address under categories like Home, Office, or Friends & Family.
Address Management:
Page to manage saved addresses.
List of saved addresses with options to select, update, or delete.
Search functionality for addresses.
Bonus Features (Optional):
Save as Favorite feature for frequently used locations.
Address validation for accuracy.
Map Preview button for a quick preview of the selected address.
Setup & Requirements
Frontend
Framework: React
Map Integration: Google Maps API
State Management: Redux or Context API
User Authentication: Optional (token-based)
Backend
Framework: Node.js
APIs: Implement backend APIs to support frontend functionalities.
Installation
Prerequisites
Node.js (v14 or higher)
npm or yarn
Google Maps API Key
Steps
Clone the Repository:

sh
Copy code
git clone https://github.com/your-username/location-address-flow.git
cd location-address-flow
Install Dependencies:

sh
Copy code
# For the backend
cd backend
npm install
# or
yarn install

# For the frontend
cd ../frontend
npm install
# or
yarn install
Set Up Environment Variables:

Create a .env file in both backend and frontend directories.

Add the following variables:

Backend (backend/.env):

makefile
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
Frontend (frontend/.env):

makefile
Copy code
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
Run the Project:

Backend:

sh
Copy code
cd backend
npm start
Frontend:

sh
Copy code
cd frontend
npm start
Open in Browser:

Frontend: http://localhost:3000
Backend: http://localhost:5000