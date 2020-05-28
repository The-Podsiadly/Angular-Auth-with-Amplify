# Angular Auth with Amplify
A detailed explanation of using an authentication flow on Angular 9+ with the Amplify JS SDK.

This git contains pseudo files from a new Angular project that are used to create an authentication system through Amazon Web Services (AWS) products; we are using Cognito User Pools. 

**This explanation uses cookies rather than `localStorage`.** I decided to use this process because it allowed me to separate the authorization from the webapp authentication.  

--------

The main problem we came across was during testing an Auth flow locally. Cookies weren't accepted from the webapp even though we had localhost enabled for the callback url and the authorization site wasn't saving the cookies correctly. We realized after a while that the cookies needed to be saved on a SSL certificate secured page.

In order to get get an SSL certificate locally, follow [this tutorial](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8).

## Enabling SSL
The Angular CLI provides us with three parameters we can pass along with the ng serve command to enable and configure SSL, in your `angular.json`.
```
"serve": {
     ...,
     "options": {
          "browserTarget": "authApp:build",
          "sslKey": "../_ssl/localhost+2-key.pem",
          "sslCert": "../_ssl/localhost+2.pem",
          "ssl": true
     },
```
Make sure you use anything other than Mozilla for testing, if you don't want to change any settings in Mozilla. Otherwise, the `WSD` will disconnect and your cookies won't save correctly.

## Setting up production and development modes
Once you enable SSL in your `angular.json`, we recommend creating production and development `environment` variables for your project. This will allow you to test your project without having to constantly changing parameters. When you're ready for production, just deploy, and Angular will take on the production environment variables.

**If using AWS, I highly recommend creating a separate Cognito user pool for testing.**

| First Header  | Second Header |
| ------------- | ------------- |
| `"serve": {\n...,\n"options": {\n"browserTarget": "authApp:build",\n"sslKey": "../_ssl/localhost+2-key.pem",\n"sslCert": "../_ssl/localhost+2.pem",\n"ssl": true\n},` | ```"serve": {\n...,\n"options": {\n"browserTarget": "authApp:build",\n"sslKey": "../_ssl/localhost+2-key.pem",\n"sslCert": "../_ssl/localhost+2.pem",\n"ssl": true\n},```  |

* Create Environment variables for production and testing that'll easily change the `cookieStorage domain` from `localhost` to your domain on build


There are two things to be done:
1. Create a testing Cognito pool to add `https://localhost/` to the callburk URIs
2. Add environment variables for production and development that include the User Pool details.
