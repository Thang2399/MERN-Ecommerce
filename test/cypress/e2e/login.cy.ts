describe('Login page testing', () => {

    beforeEach(() => {
        cy.visit('/login')
        cy.intercept({
            method: 'POST',
            url: 'auth/*',
            hostname: 'localhost',
            https: false,
            pathname: 'login',
            port: 8800
        }).as('loginAPI')
    })

    it.only('Test Login Success by using API ', () => {
        // cy.intercept('POST', 'http://localhost:8800/auth/login', (req) => {
        //     console.log('Intercepted request:', req);
        //     // Modify the request or response as needed
        //     // req.reply({ statusCode: 200, body: { ... } });
        // }).as('loginAPI')



        // cy.getDataTest('loginBtn').click();
        cy.wait('@loginAPI')
    });

    it('Test Login Success by submitting form', () => {
        cy.getDataTest('email').type('toanthang1999hp@gmail.com');
        cy.getDataTest('password').type('123456@Aa');
        cy.getDataTest('loginBtn').click();

        // Assert that the user is redirected to the default route
        cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
});
