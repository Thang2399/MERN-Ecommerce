describe('Login page testing', () => {

        beforeEach(() => {
        cy.visit('/login')
    })

    it('test login title', () => {
        cy.getDataTest('login-title').as('title')
        let cookies
        cy.getCookies('i18next').then((c) => {
            cookies = c[0].value;

        })
                        cy.get('@title').should('contain.text' ,'Login')

                cy.get('@title').should('contain.text' ,'Đăng Nhập')



    });
});
