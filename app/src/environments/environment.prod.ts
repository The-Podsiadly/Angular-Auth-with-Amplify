import { cognitoDetails } from './aws-details.prod';

export const environment = {
     production: true,
     // cookieDomain: '.thereactant.com',
     _region: cognitoDetails.region,
     _userPoolId: cognitoDetails.userPoolId,
     _userPoolWebClientId: cognitoDetails.userPoolWebClientId,
     _cookieStorage: {
          domain: '.domain.com',
          path: '/',
          expires: 365,
          secure: true,
     }
};
