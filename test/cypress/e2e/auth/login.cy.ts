describe('Login page testing', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it('Testing when user are logged in', () => {
        cy.getCookie('access_token').then((cookies) => {
            if(cookies) {
                cy.visit('/')
            } else {
                cy.url().should('equal', Cypress.config().baseUrl + '/login');
            }
        })
    })

    it('Testing navigate to forget password button', () => {
        cy.getDataTest('navigateToForgotPassword').click()
        cy.url().should('equal', Cypress.config().baseUrl + '/forget-password');
    });

    it('Testing navigate to sign up button', () => {
        cy.getDataTest('navigateToSignUp').click()
        cy.url().should('equal', Cypress.config().baseUrl + '/sign-up');
    });

    it('Test Login Success by submitting form without remember me', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist');
        cy.getDataTest('email').type('thangnqt1999hp@outlook.com');
        cy.getDataTest('password').type('abcd@1234');

        cy.getDataTest('checkboxRemember').find('input').as('checkboxRemember')
        cy.get('@checkboxRemember').uncheck()
        cy.getDataTest('loginBtn').click();
        cy.getDataTest('loadingIcon').should('exist');

        // Assert that the user is redirected to the default route
        cy.url().should('equal', Cypress.config().baseUrl + '/');

        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')

        cy.window().then((window) => {
            const value = window.localStorage.getItem('refresh_token');
            expect(value === null || value === '' || value !== '').to.be.true;
        });
    });

    it('Test Login Success by submitting form with remember me', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('email').type('thangnqt1999hp@outlook.com');
        cy.getDataTest('password').type('abcd@1234');
        cy.getDataTest('checkboxRemember').find('input').as('checkboxRemember')
        cy.get('@checkboxRemember').check()
        cy.getDataTest('loginBtn').click();
        cy.getDataTest('loadingIcon').should('exist');

        // Assert that the user is redirected to the default route
        cy.url().should('equal', Cypress.config().baseUrl + '/');
        cy.getDataTest('loadingIcon').should('not.exist');

        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')
        cy.window().then((window) => {
            const value = window.localStorage.getItem('refresh_token');
            expect(value).to.not.be.null;
            expect(value).to.not.be.empty;
        });
    });

    it('Check error message of email field', () => {
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('errorPassword').should('not.exist')
        cy.getDataTest('toastMessage').should('not.exist')

        cy.getDataTest('loginBtn').click();
        cy.getDataTest('errorEmail').contains(/required/i)
        cy.getDataTest('errorPassword').contains(/required/i)

        cy.getDataTest('password')

        cy.getDataTest('email').type('abcd123213213');
        cy.getDataTest('errorEmail').contains('Wrong email format')

        cy.getDataTest('email').type('abcd@gmail.com');
        cy.getDataTest('errorEmail').should('not.exist')

        cy.getDataTest('password').type('123123');
        cy.getDataTest('errorEmail').should('not.exist')

        cy.getDataTest('loginBtn').click();
        cy.getDataTest('toastMessage').contains(/wrong/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')
    })

    it('Testing API login successfully ', () => {
        cy.request('POST', `${Cypress.config().endpointUrl}/auth/login`, {
            "email": "thangnqt1999hp@outlook.com",
            "password": "abcd@1234",
        }).then((response: any) => {
            const accessToken = response.body.accessToken;
            cy.setCookie('access_token', accessToken);
        })
    });

    it('Testing API login failed ', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().endpointUrl}/auth/login`,
            failOnStatusCode: false,
            body: {
                "email": "thangnqt1999hp@outlook.com",
                "password": "abcd@1234123123",
            }
        }).then((response: any) => {
            const status = response.status;
            if (status !== 201) {
                const errorMessage = response.body.message;
                expect(errorMessage).not.to.be.empty;
            }
        })
    });
});
