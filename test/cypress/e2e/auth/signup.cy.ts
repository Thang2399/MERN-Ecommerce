describe('Sign Up Page Testing', () => {
    let counterValue: number;
    beforeEach(() => {
        cy.visit('/sign-up')
        cy.task('incrementCounter').then((counter) => {
            counterValue = counter as number;
        });
    })

    it('Testing when user are logged in', () => {
        cy.getCookie('access_token').then((cookies) => {
            if(cookies) {
                cy.visit('/')
            } else {
                cy.url().should('equal', Cypress.config().baseUrl + '/sign-up');
            }
        })
    });

    it('Testing button navigate to login page', () => {
        cy.getDataTest('navigate-to-login').click()
        cy.url().should('equal', Cypress.config().baseUrl + '/login');
    })

    it('Test validation of input fields with empty value', () => {
        cy.getDataTest('errorUserName').should('not.exist');
        cy.getDataTest('errorEmail').should('not.exist');
        cy.getDataTest('errorPhoneNumber').should('not.exist');
        cy.getDataTest('errorPassword').should('not.exist');
        cy.getDataTest('errorConfirmPassword').should('not.exist');

        cy.getDataTest('sign-up-btn').as('signUpBtn').click();

        cy.getDataTest('errorUserName').contains(/required/i);
        cy.getDataTest('errorEmail').contains(/required/i);
        cy.getDataTest('errorPhoneNumber').contains(/required/i);
        cy.getDataTest('errorPassword').contains(/required/i);
        cy.getDataTest('errorConfirmPassword').contains(/required/i);
    })

    it('Testing validation with filled input fields', () => {
        // userName
        cy.getDataTest('userName').type('       ');
        cy.getDataTest('errorUserName').should('exist');
        cy.getDataTest('userName').type('123123')
        cy.getDataTest('errorUserName').should('not.exist');
        cy.getDataTest('userName').type('Testing 101')
        cy.getDataTest('errorUserName').should('not.exist');

        // email
        cy.getDataTest('email').type('      ')
        cy.getDataTest('errorEmail').should('exist');
        cy.getDataTest('email').find('input').clear()
        cy.getDataTest('email').type('abcd')
        cy.getDataTest('errorEmail').contains(/wrong email format/i);
        cy.getDataTest('email').find('input').clear()
        cy.getDataTest('email').type('abcd@gmail.com')
        cy.getDataTest('errorEmail').should('not.exist');

        // phoneNumber
        cy.getDataTest('phoneNumber').type('abcdDef')
        cy.getDataTest('phoneNumber').should('have.value', '');
        cy.getDataTest('phoneNumber').type('0123456789')
        cy.getDataTest('errorPhoneNumber').should('not.exist');

        // password
        cy.getDataTest('password').find('input').should('have.attr', 'type', 'password');
        cy.getDataTest('passwordToggleIcon').click()
        cy.getDataTest('password').find('input').should('have.attr', 'type', 'text');
        cy.getDataTest('passwordToggleIcon').click()
        cy.getDataTest('password').find('input').should('have.attr', 'type', 'password');

        cy.getDataTest('password').type('1234567');
        cy.getDataTest('errorPassword').contains(/8 characters/i);
        cy.getDataTest('password').find('input').clear()

        cy.getDataTest('password').type('12345678');
        cy.getDataTest('errorPassword').contains(/one letter/i);
        cy.getDataTest('password').find('input').clear()

        cy.getDataTest('password').type('12345678A');
        cy.getDataTest('errorPassword').contains(/one special character/i);
        cy.getDataTest('password').find('input').clear()

        cy.getDataTest('password').type('abcd@ABCD');
        cy.getDataTest('errorPassword').contains(/one number/i);
        cy.getDataTest('password').find('input').clear();

        cy.getDataTest('password').type('abcd@1234');
        cy.getDataTest('errorPassword').should('not.exist');

        // confirm password
        cy.getDataTest('confirmPassword').find('input').should('have.attr', 'type', 'password');
        cy.getDataTest('confirmPasswordToggleIcon').click()
        cy.getDataTest('confirmPassword').find('input').should('have.attr', 'type', 'text');
        cy.getDataTest('confirmPasswordToggleIcon').click()
        cy.getDataTest('confirmPassword').find('input').should('have.attr', 'type', 'password');

        cy.getDataTest('confirmPassword').type('abcd@123');
        cy.getDataTest('errorConfirmPassword').contains(/match/i);
        cy.getDataTest('confirmPassword').type('4');
        cy.getDataTest('errorConfirmPassword').should('not.exist');
    })

    it('Testing API with sign up successfully', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().endpointUrl}/auth/sign-up`,
            failOnStatusCode: false,
            body: {
                "userName": `Testing ${counterValue}`,
                "phoneNumber": "0123456789",
                "email": `abcd${counterValue}@gmail.com`,
                "password": "abcd@1234",
                "confirmPassword": "abcd@1234",
                "gender": "male",
                "dateOfBirth": "Sat, 06 Jul 2024 10:24:50 GMT"
            }
        }).then((response: any) => {
            const status = response.status;
            if (status === 201) {
                const accessToken = response.body.accessToken;
                const refreshToken = response.body.refreshToken;
                expect(accessToken).not.to.be.empty;
                expect(refreshToken).not.to.be.empty;
            }
        })
    })

    it('Testing sign up user successfully', () => {
        cy.getDataTest('userName').type(`Testing ${counterValue}`)
        cy.getDataTest('email').type(`abcd${counterValue}@gmail.com`)
        cy.getDataTest('phoneNumber').type('0123456789')
        cy.getDataTest('password').type('abcd@1234');
        cy.getDataTest('confirmPassword').type('abcd@1234');
        cy.getDataTest('loadingIcon').should('not.exist');

        cy.getDataTest('sign-up-btn').as('signUpBtn').click();
        cy.getDataTest('loadingIcon').should('exist');

        cy.url().should('equal', Cypress.config().baseUrl + '/');
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.getDataTest('toastMessage').contains(/successfully!/i)
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')

        cy.getCookie('access_token').should('not.be.empty');

        cy.window().then((window) => {
            const value = window.localStorage.getItem('refresh_token');
            expect(value).to.not.be.null;
            expect(value).to.not.be.empty;
        });
    })

    it('Testing sign up user with existing email', () => {
        cy.getDataTest('toastMessage').should('not.exist')
        cy.getDataTest('userName').type(`Testing 0`)
        cy.getDataTest('email').type(`thangnqt1999hp@outlook.com`)
        cy.getDataTest('phoneNumber').type('0123456789')
        cy.getDataTest('password').type('abcd@1234');
        cy.getDataTest('confirmPassword').type('abcd@1234');
        cy.getDataTest('loadingIcon').should('not.exist');

        cy.getDataTest('sign-up-btn').as('signUpBtn').click();
        cy.getDataTest('loadingIcon').should('exist');

        cy.getDataTest('toastMessage').contains('already signed up');
        cy.url().should('equal', Cypress.config().baseUrl + '/sign-up');
        cy.getDataTest('loadingIcon').should('not.exist');
        cy.wait(5000)
        cy.getDataTest('toastMessage').should('not.exist')
    })

    it('Testing API with sign up with existing email', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().endpointUrl}/auth/sign-up`,
            failOnStatusCode: false,
            body: {
                "userName": "Testing 0",
                "phoneNumber": "0123456789",
                "email": "abcd0@gmail.com",
                "password": "abcd@1234",
                "confirmPassword": "abcd@1234",
                "gender": "male",
                "dateOfBirth": "Sat, 06 Jul 2024 10:24:50 GMT"
            }
        }).then((response: any) => {
            const status = response.status;
            if (status !== 201) {
                const errorMessage = response.body.message;
                expect(errorMessage).contains('DUPLICATE');
            }
        })
    })
});
