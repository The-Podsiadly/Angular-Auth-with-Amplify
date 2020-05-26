# Angular Auth with Amplify
A detailed explanation of using an authentication flow on Angular 9+ with Amplify JS SDK.

This git contains pseudo files from a new Angular project that are used to create an authentication system through Amazon Web Services (AWS) products; we are using Cognito User Pools.

The main problem we came across was testing an Auth flow locally.

* Generate SSL certificate for local testing
  * Follow [this tutorial](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8) to generate SSL certificates
* Make sure you use anything other than Mozilla for testing (self-certificed SSL certificates will cause an error on Mozilla unless in Mozilla Developer)
* Create Environment variables for production and testing that'll easily change the `cookieStorage domain` from `localhost` to your domain on build


There are two things to be done:
1. Create a testing Cognito pool to add `https://localhost/` to the callburk URIs
2. Add environment variables for production and development that include the User Pool details.


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
