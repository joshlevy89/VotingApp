This app allows users to plan their evening by seeing what bars people are going to
and selecting bars they'd like to attend. 
This project is hosted on heroku at: https://whaddya-think.herokuapp.com.  
Only guaranteed to work in chrome. 

To run locally,   
npm install VotingApp
cd VotingApp
npm run dev...to run in development mode     
npm run prod-test...to run in production mode  

Note that if you run in production mode, you will need to delete the bundle folder in the public folder to make changes. Otherwise, the old bundle will be served from that folder. 

This project fulfills the following user stories:  
-User Story: As an authenticated user, I can keep my polls and come back later to access them.  
-User Story: As an authenticated user, I can share my polls with my friends.  
-User Story: As an authenticated user, I can see the aggregate results of my polls.  
-User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.  
-User Story: As an authenticated user, I can create a poll with any number of possible items.  
-User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.  
-User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form using chartjs  
-User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.  

Built using the react-hot-boilerplate by Dan Abramov: https://github.com/gaearon/react-hot-boilerplate