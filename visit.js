const getIAPToken = require('./utils')
/// <reference types="cypress">
Cypress.Commands.overwrite('visit', (originalFn, subject, ...args) => {
    if (Cypress.config().baseUrl.indexOf('localhost') != -1) {
        return originalFn(subject, ...args);
    } else {
        cy.exec('curl -I ' + Cypress.config().baseUrl + " | awk '/^location/ {split($NF, a, /[=&]/); print a[2]}'").then((client_id) => {
            return client_id.stdout
        }).then(client_id => {
            cy.task(getIAPToken, { url: Cypress.config().baseUrl, cid: client_id }).then((token) => {
                console.log(token)
                cy.setCookie('GCP_IAAP_AUTH_TOKEN', token)
                    .then( () => {
                        return originalFn(subject, ...args)
                    })
            })
        })
        
    }
})