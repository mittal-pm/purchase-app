# Step-by-Step Implementation Guide
For a step by step installation guide read readme for frontend and backend

**Prerequisites**  
1.Node.js (v16 or higher).  
2.MongoDB (local instance or cloud using MongoDB Atlas)  
3.Git (to clone the repository)  
4.NPM (for managing packages)  

# Microservices Architecture Overview
**SSO Authentication**: Manages Google login/logout.  
**Notification Service**: Sends email notifications.  
**Purchases Service**: Manages purchase requests and approvals.    
We'll be using React for the frontend and Node.js (Express) for the backend. Each service is modularized and runs independently.

**Scopes of Improvement**   
This project was made in a very short period of time and thus many areas in which it can be improved significantly like
1. Instead to prop driling we can use atoms for state Management in React
2. Focus on more organised and clean code  
3. User session management 
4. Jwt Authenication 
