# Speed-Math-Game

Project Info and features:
1. Redux- for state management.
2. Typescript- for type safety.
3. React navigation- for navigating between screens.
4. React native async storage--  for storing login info.If user is logged in next time , directly navigate hime to homescreen
5. React native picker
6. i18 next- for language change feature (English , Hindi, Marathi)
7. Axios-For api call
8. React native vector icons

Information about screens and overview of Project:

1.Login Screen which should accept email : 'testuser@test.com', password :'Test@123' as valid user.

2.Email id and password should be validated ,where password should accept only Characters and numbers.

3.After Logged In Show Start game button. When Start game button gets clicked fetch the datas from api.

4.Show the questions to the user and text field to get the answer for each question.

5.Once the user enters the value in the textfield and the enter button is pressed, show the next question.
(Iterate the next question from the api response once the user answers the question)

6.Timer should be 60 secs and the user can answer as many as question upto 60 seconds

7.Once the time exceeds directly exit the game and show the result page with all  the questions and answers using the following table structure

Status of answer- wrong/correct 

Question:

Your answer:

Correct answer:


Steps For Running the project:

1.Clone the project.

2.Download Zip file and open in VScode.

3.Hit npm install.

4.After that , do cd ios and hit pod install.

5.Run the project on android studio and Xcode.
