# Backend (Node.js + Express)  
1. Clone the Repository
Clone the source code repository:  

2. Environment Setup
Create an .env file in every service add the following environment variables:  
IN SSO SERVICE  
**Frontend URL (for redirect after login)**   
FRONTEND_URL=http://localhost:3000    
**MongoDB Config**
MONGO_URI=your-mongodb-connection-string
**Notification Service Url**  
NOTIFICATIONS_SERVICE_URL= 'http://localhost:5001/send-notification'

IN PURCHASE SERVICE  
**Frontend URL (for redirect after login)**   
FRONTEND_URL=http://localhost:3000    
**MongoDB Config**
MONGO_URI=your-mongodb-connection-string
**Notification Service Url**  
NOTIFICATIONS_SERVICE_URL= 'http://localhost:5001/send-notification'  
**SSO Service Url**  
AUTH_SERVICE_URL= 'http://localhost:5000'  

IN NOTIFICATION SERVICE   
**Email Config (for NodeMailer)**  
EMAIL_SERVICE=gmail  
EMAIL_USER=your-email@gmail.com  
EMAIL_PASS=your-email-password  



4. Install Dependencies    
Navigate to each service folder and install the required packages:    
cd service-name  
npm install  

5. Run the Backend Services    
Each microservice is set up on the same route with different ports in different Express apps. To start any service navigate to that service folder:  
node index.js
