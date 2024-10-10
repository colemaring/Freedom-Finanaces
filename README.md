# Freedom Finances
2024 ShellHacks Hackathon Project <br>
<br>
Demo Video: <br>
https://www.youtube.com/watch?v=0kxlwAFJ_RA <br>
<br>
Devpost Submission:  <br>
https://devpost.com/software/freedom-finances  <br>
<br>
Development: <br>
```
git clone https://github.com/colemaring/Freedom-Finanaces.git 
cd Freedom-Finanaces/realclient && npm i && npm run dev 
cd Freedom-Finanaces/server && npm i && npm start 
```
Environment Variables (see .env_template): <br>
Plaid client_id <br>
Plaid sandbox_id <br>
OpenAI API key <br>
<br>
Deployment:<br>
```
git clone https://github.com/colemaring/Freedom-Finanaces.git 
cd Freedom-Finanaces/server && npm i && touch .env 
nano .env       -> (enter keys) 
pm2 start index.js OR npm start
```
<br>

Technical Description: <br>
A React and Express web-app utilizing the Plaid API to connect your bank account and OpenAI's GPT 3.5 turbo to generate personalized financial suggestions based on your transaction history and liabilities. Click on one of the AI generated suggestions to visuzlie your debt payment if you were to follow the suggestion's advice. <br>
<br>
Domain Registration  <br>
eventually @ freedomfinances.xyz <br>
