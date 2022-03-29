/// <reference types="cypress">
Cypress.Commands.add("manualAddIAPHeader", () => {
    if (Cypress.config().baseUrl.indexOf("localhost") != -1) {
        return
    } else {
        cy.exec(
            `curl -I ${Cypress.config().baseUrl
            } | awk '/^location/ {split($NF, a, /[=&]/); print a[2]}'`
        )
            .then((client_id) => {
                return client_id.stdout;
            })
            .then((client_id) => {
                cy.task("getIAPToken", {
                    url: Cypress.config().baseUrl,
                    cid: client_id,
                }).then((iapToken) => {
                    cy.intercept(`${Cypress.config().baseUrl}/**`, (req) => {
                        req.headers["Proxy-Authorization"] = `${iapToken}`;
                    })
                })
            })
    }
})
