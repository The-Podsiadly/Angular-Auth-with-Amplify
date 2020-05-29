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

### Cognito Details
Instead of using the `aws-export.js`, we created our own called `aws-details.ts`. However, we made two files, `.dev.ts` and `.prod.ts` in order to separate production and development service details used in AWS.

*In your cognito, do not forget to put `https://localhost/` into your callback URI **for your testing user pool**. This is important because, if mismanaged, can create a massive security flaw in your authorization/authentication flow.*

### Production Environment Variables
Here is the code snippet for the `environment.prod.ts` file. We would change the `expires` and `domain` details here for our production mode. However, we would like to keep the number of changes to a minimum such as only changing the region, services, and domain to our production information.
```
import { cognitoDetails } from './aws-details.prod';

export const environment = {
     production: true,
     _region: cognitoDetails.region,
     _userPoolId: cognitoDetails.userPoolId,
     _userPoolWebClientId: cognitoDetails.userPoolWebClientId,
     _cookieStorage: {
          domain: '.domain.com',
          path: '/',
          expires: 365,
          secure: true,
     },
     confirm: {
          email: '',
          password: ''
     }
};
```

### Development Environment Variables
Here is the code snippet for the `environment.ts` file. We would change the same information we did in the production environment variables in order to replicate the environment when testing, only true difference would be the `domain` in order to use cookies in our localhost and allow them to be accessed by the webapp in parallel.
```
import { cognitoDetails } from '../aws-details.dev';

export const environment = {
     production: false,
     _region: cognitoDetails.region,
     _userPoolId: cognitoDetails.userPoolId,
     _userPoolWebClientId: cognitoDetails.userPoolWebClientId,
     _cookieStorage: {
          domain: 'localhost',
          path: '/',
          expires: 365,
          secure: true,
     },
     confirm: {
          email: '',
          password: ''
     }
};
```
