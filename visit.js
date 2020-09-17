/// <reference types="cypress">
Cypress.Commands.overwrite('visit', (originalFn, subject, ...args) => {

    if (Cypress.config().baseUrl.indexOf('localhost') != -1) {
        return originalFn(subject, ...args);
    } else {
        cy.exec('curl -I ' + Cypress.config().baseUrl + " | awk '/^location/ {split($NF, a, /[=&]/); print a[2]}'").then((client_id) => {
            return client_id.stdout
        }).then(client_id => {
            const { GoogleAuth } = require('google-auth-library');
            const auth = new GoogleAuth();
            return new Promise((resolve, reject) => {
                getIAPToken(({ url, cid }) => {
                    resolve(({ url, cid }))
                })
            }).then((token) => {
                console.log(token)
                cy.setCookie('GCP_IAAP_AUTH_TOKEN', token)
                    .then(() => {
                        return originalFn(subject, ...args)
                    })
            })
        })
    }
})

async function getIAPToken({ url, cid }) {
    const { GoogleAuth } = require('google-auth-library');
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(cid);
    const res = await client.request({ url });
    return res.config.headers.Authorization.split(" ")[1]
}