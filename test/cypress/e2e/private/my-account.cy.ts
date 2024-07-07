describe('Testing My Account Page', () => {
    beforeEach(() => {
        // cy.visit('/my-account');
    })

    it('Testing private route when user is not logged in', () => {
        cy.visit('/my-account');

        // redirect to home page when user are not logged in
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it.only('Testing when user is already logged in', () => {
        cy.login('thangnqt1999hp@outlook.com', 'abcd@1234')
        cy.visit('/my-account');
        cy.url().should('not.eq', Cypress.config().baseUrl + '/');
    })
});
