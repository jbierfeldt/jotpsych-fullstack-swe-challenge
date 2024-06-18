APPROACH

I identified that we are creating the token on backend but not using/storing it properly on frontend for authorization for other routes.
I started by backtracking the backend to understand which API is returning the token and from there I determined that /login route does the task. 
On the frontend I stored that token in localstorage for faster and global access. It can be refined by implementing global state management like REDUX in a full feldge application but for time being LocalStorage does it work.
This solved the first 2 BASIC tasks

Kept a check to make sure we show proper alerts on error while registering. Error handling as well 

Logout functionality:
It was a simple process of simply resetting the token and redirecting the user to main page. 


For Look at the APIService.ts file in the frontend services folder. Reimplement all network requests in the frontend to use this service, so that the app-version header is sent with every single request.
 - Refactored the APIService.ts with few adjustments based on changes made
 -  refactor my existing network requests throughout my application to use APIService.request() method

Resources used so far:
- StackOverflow
- MUI (https://mui.com/) [Installation command: npm install @mui/material @emotion/react @emotion/styled @mui/icons-material]


All the functionalities are implemented 