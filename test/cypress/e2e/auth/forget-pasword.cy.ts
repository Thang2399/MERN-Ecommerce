describe('Forget Password page testing', () => {
    beforeEach(() => {
        cy.visit('/forget-password')
    })

    it('Testing when user are logged in', () => {
        cy.getCookie('access_token').then((cookies) => {
            if(cookies) {
                cy.visit('/')
            } else {
                cy.url().should('equal', Cypress.config().baseUrl + '/forget-password');
            }
        })
    })

    it('Testing validation input field', () => {
        cy.getDataTest('errorEmail').should('not.exist')

        cy.getDataTest('email').type('     ')
        cy.getDataTest('errorEmail').contains(/wrong email format/i)
        cy.getInputTestAndClear('email')

        cy.getDataTest('email').type('abcd')
        cy.getDataTest('errorEmail').contains(/wrong email format/i)

        cy.getDataTest('email').type('@gmail.com')
        cy.getDataTest('errorEmail').should('not.exist')
    });

    it('Testing validation with click submitting button', () => {
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('sendEmailBtn').click();
        cy.getDataTest('errorEmail').contains(/required/i);

        cy.getDataTest('email').type('     ')
        cy.getDataTest('sendEmailBtn').click();
        cy.getDataTest('errorEmail').contains(/wrong email format/i)
        cy.getInputTestAndClear('email')

        cy.getDataTest('email').type('abcd123123123123')
        cy.getDataTest('sendEmailBtn').click();
        cy.getDataTest('errorEmail').contains(/wrong email format/i)

        cy.getDataTest('email').type('@gmail.com')
        cy.getDataTest('sendEmailBtn').click();
        cy.getDataTest('errorEmail').should('not.exist')
    })

    it('Testing send email successfully', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('email').type('thangnqt1999hp@outlook.com')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('sendEmailBtn').click();

        cy.getDataTest('loadingIcon').should('exist');
        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')
    })

    it('Testing hide send email form when sending email successfully', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('sendEmailForm').should('exist');
        cy.getDataTest('sendEmailSuccessContainer').should('not.exist');

        cy.getDataTest('email').type('thangnqt1999hp@outlook.com')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('sendEmailBtn').click();

        cy.getDataTest('loadingIcon').should('exist');
        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')

        cy.getDataTest('sendEmailForm').should('not.exist');
        cy.getDataTest('sendEmailSuccessContainer').should('exist');
        cy.getDataTest('sendEmail').contains('thangnqt1999hp@outlook.com');
    })

    it('Testing resend email button', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('sendEmailForm').should('exist');
        cy.getDataTest('sendEmailSuccessContainer').should('not.exist');

        cy.getDataTest('email').type('thangnqt1999hp@outlook.com')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('sendEmailBtn').click();

        cy.getDataTest('loadingIcon').should('exist');
        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')

        cy.getDataTest('sendEmailForm').should('not.exist');
        cy.getDataTest('sendEmailSuccessContainer').should('exist');
        cy.getDataTest('sendEmail').contains('thangnqt1999hp@outlook.com');

        cy.getDataTest('resendEmail').click()
        cy.getDataTest('sendEmailSuccessContainer').should('not.exist');
        cy.getDataTest('sendEmailForm').should('exist');
    })

    it('Testing send not existed email', () => {
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('email').type('thangnqt1999hp1234@outlook.com')
        cy.getDataTest('errorEmail').should('not.exist')
        cy.getDataTest('sendEmailBtn').click();

        cy.getDataTest('loadingIcon').should('exist');
        cy.getDataTest('toastMessage').contains(/not exist/i);
        cy.getDataTest('sendEmailSuccessContainer').should('not.exist');
    })

    it('Testing API send email successfully', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().endpointUrl}/auth/forgot-password`,
            body: {
                email: 'thangnqt1999hp@outlook.com'
            }
        }).then((res: any) => {
            const status = res.status
            expect(status).eq(201);
        })
    })

    it('Testing API send email not existed', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().endpointUrl}/auth/forgot-password`,
            body: {
                email: 'thangnqt1999hp123123@gmail.com'
            },
            failOnStatusCode: false,
        }).then((res: any) => {
            const status = res.status
            expect(status).eq(404);
            const errorMessage = res.body.message;
            expect(errorMessage).not.be.empty;
        })
    })
});
