declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Add IAP Proxy-Authorization header w/o a cy.visit
         * Use in a beforeEach() hook if the app is not reloaded between tests
         */
         manualAddIAPHeader(): Chainable<any>
    }
}
