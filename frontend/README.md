# Frontend (React)  
**1. Set up the Frontend**  
Navigate to the frontend folder:
cd frontend  

**2. Install Dependencies**  
Install the required packages for the React app:
npm install  

**3. Configure the Frontend**  
In the frontend project, create a .env file and add the following:
REACT_APP_AUTH_SERVICE_URL=http://localhost:5000
REACT_APP_PURCHASE_SERVICE_URL=http://localhost:5002
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id  

**4. Run the Frontend**  
To start the React frontend:
npm run dev
The app will now be available at http://localhost:3000.  

**5. Test the Frontend**  
Open the browser and go to http://localhost:3000.
Click the "Login with Google" button and follow the Google OAuth process.
Once logged in, you'll be redirected to the dashboard where you can create a new purchase request.
Check the email notifications for login, purchase request submission, and approval statuses.

**Words of Caution**   I have not used env variables for my testing. So I have directly given urls in most all of the places.
