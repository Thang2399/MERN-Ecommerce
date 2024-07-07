declare namespace Cypress {
    interface Chainable<Subject = any> {
        getDataTest(dataTestSelector: string): Cypress.Chainable<JQuery<HTMLElement>>

        getInputTestAndClear(dataTestSelector: string): Cypress.Chainable<JQuery<HTMLElementTagNameMap[string]>>

        login(email: string, password: any): void

        getAPIEndpointUrl(): any
    }
}
