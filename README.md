# JobJar

JobJar is a full-stack web application that connects people looking for help with small tasks (e.g., assembling furniture, fixing a leaky faucet) with others nearby who are willing to complete them for a fee.

## Features

- **Task Posting**: Users can create and list tasks with a description, price, and location.
- **Task Bidding & Acceptance**: Other users can accept tasks and get paid upon completion.
- **User Authentication**: Secure sign-up, login, and logout functionality.
- **Location-Based Matching**: Tasks are filtered based on proximity.
- **Real-Time Updates**: Instant updates on task status and new postings.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/gilaa1/Job-Jar.git
   cd job-board
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in both the frontend and backend directories and add the following:

   **Frontend (.env):**

   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   **Backend (.env):**

   ```env
   MONGODB_CONNECTION_URL=your_mongodb_connection_url
   SECRET=your_secret_key
   ```

4. Start the development server:

   **Backend:**

   ```bash
   cd backend
   npm install
   npm start
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm install
   npm run index.js
   ```

##

##

