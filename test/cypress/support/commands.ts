Cypress.Commands.add('getAPIEndpointUrl', () => {
    return Cypress.config().endpointUrl
})

Cypress.Commands.add('getDataTest', (dataTestSelector: string) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})

Cypress.Commands.add('getInputTestAndClear', (dataTestSelector: string) => {
    return cy.get(`[data-test="${dataTestSelector}"]`).find("input").clear()
})

Cypress.Commands.add('login', (email: string, password) => {
    cy.request('POST', 'http://localhost:8800/api/auth/login', {
            "email": email,
            "password": password,
        }).then((response: any) => {
            const accessToken = response.body.accessToken;
            cy.setCookie('access_token', accessToken);
        })
})

