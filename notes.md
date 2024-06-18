APPROACH

I identified that we are creating the token on backend but not using/storing it properly on frontend for authorization for other routes.
I started by backtracking the backend to understand which API is returning the token and from there I determined that /login route does the task. 
On the frontend I stored that token in localstorage for faster and global access. It can be refined by implementing global state management like REDUX in a full feldge application but for time being LocalStorage does it work.
This solved the first 2 BASIC tasks

Kept a check to make sure we show proper alerts on error while registering 

Resources used so far:
- StackOverflow for @app.after_request logic
- MUI (https://mui.com/) [Installation command: npm install @mui/material @emotion/react @emotion/styled @mui/icons-material]
