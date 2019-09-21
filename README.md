Simple login without authentication
<br/>
<br/>
Setup:
- Install npm
<br/>
<br/>
- React frontend:
    * Go to frontend folder
    * Open new cmd and run: npm install
    * Open new cmd and run: npm run mock:api
    * Open new cmd and run: npm run start
<br/>
<br/>
Development:
- React frontend: http://localhost:3000
- Json server: http://localhost:4000
<br/>
<br/>  
Usage:
<br/>
Assume home page will redirect to sign in page automatically.
<br/>
Assume requesting API will be half of second.
<br/>
- Go to http://localhost:3000 to sign in.
- Use 'test@gmail.com/123' to sign in OR open ./src/data/db.json file to pick up another user.
- Enter email and password which are required.
- Email must be valid and exist on db.json.
- Click on Sign In button:
    * Success: Message box will show.
    * Error: Alert will show.
- Click on Close or X button to close the message box and redirect to home page.
- After 3s, redirect to home page.
<br/>
<br/>
- In home page, click on the name of user on the top right to show the dropdown menu.
- Click on Sign out.
- Redirect to Sign in page.
<br/>
<br/>
- Click on 'Want to reset password' link to redirect to reset password page.
- Enter email, new password and confirm password which are required.
- Email must be valid and exist on db.json.
- New password and confirm password must be the same.
- Click on Save button:
    * Success: Message box will show.
    * Error: Alert will show.
- Click on Close or X button to close the message box and redirect to Sign in page.
- After 3s, redirect to Sign in page.
