# Cypress Identity Aware Proxy(IAP)

This Cypress plugin overwrites the `cy.visit` command and builds authentication capability [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs) to access applications behind [Identity Aware Proxy(IAP)](https://cloud.google.com/iap/). If the the cypress baseUrl is localhost, the original `cy.visit` function is returned.

## Installation
Install the package using npm:

```
npm i -D cypress-iap
```

And add the following at the beginning of your setup file at `cypress/support/index.js`:

```
import 'cypress-iap/visit';
```

## Register the plugin
Register the plugin in your `cypress/plugins/index.js` file like this:

```
module.exports = (on, config) => {
    require('cypress-iap/utils')(on, config);

    return config;
};
```

## Google Service Account
A google service account should be created within your google cloud project. Upon creation, store the keyfile that is auto generated. 
[Create a google service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys)
Do `NOT` check this file in to your remote repository. Store it outside of your project or .gitignore / .dockerignore your keyfile.

### Example google cloud service account
`keyfile.json`
```
{
  "type": "service_account",
  "project_id": "<project_id>",
  "private_key_id": "<private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n <private_key> \n-----END PRIVATE KEY-----\n",
  "client_email": "<service_account_name>@<google_cloud_project>.iam.gserviceaccount.com",
  "client_id": "<client_id>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<google_clould_project>.iam.gserviceaccount.com"
}
```

### Set GOOGLE_APPLICATION_CREDENTIALS env variable
Ensure the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to the credentials path of the credentials file.

```
export GOOGLE_APPLICATION_CREDENTIALS=path/to/keyfile.json
```

Alternatively you can use third party plugin called [as-a](https://github.com/bahmutov/as-a) and in your `as-a.ini` you can set the following configuration:

`as-a.ini`
```
[auth-me]
GOOGLE_APPLICATION_CREDENTIALS=keyfile.json
```

This command will execute the [as-a](https://github.com/bahmutov/as-a) package set the variables defined under `[auth-me]`.
```
as-a auth-me cypress run
```