Cypress.Commands.add('getDataTest', (dataTestSelector: string) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})


