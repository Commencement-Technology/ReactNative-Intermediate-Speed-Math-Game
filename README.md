# Speed-Math-Game

FOR DEMO VIDEO - https://drive.google.com/file/d/1Nc_lDcnT2uEYT-2Qbu9aacgtEGf8QOkn/view


**SETUP**: 

   • Clone the project.

   • Download Zip file and open in VScode.

   • Hit npm install.

   • Run npm start

   • After that , do cd ios and hit pod install.

   • Run the project on android studio and Xcode..



**TECH STACK**

   • React Native

   • React Redux - For state management

   • Typescript- for type safety.

   • React native async storage--  for storing login info.If user is logged in already , next time  when user open the app, directly navigate to homescreen

   • React Navigation - For screen navigations

   • React native picker 

   • i18 next- for language change feature (English , Hindi, Marathi)
   
   • Axios - For api calls
   
   • Redux Thunk - Middleware
 




**FEATURES:**

   • Login Screen which should accept email : 'testuser@test.com', password :'Test@123' as valid user.

   • Email id and password should be validated ,where password should accept only Characters and numbers.

   • After Logged In Show Start game button. When Start game button gets clicked fetch the questions from api.

   • Show the questions to the user and text field to get the answer for each question.

   • Once the user enters the value in the textfield and the enter button is pressed, show the next question.
     (Iterate the next question from the api response once the user answers the question)

   • Timer should be 60 secs and the user can answer as many as question upto 60 seconds

   • Once the time exceeds directly exit the game and show the result page with all the questions and answers using the following table structure: 

     Status of answer- wrong/correct 

     Question:

     Your answer:

     Correct answer:


