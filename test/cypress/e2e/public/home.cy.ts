describe('Testing home page', () => {
    beforeEach(() => {
        cy.login('thangnqt1999hp@outlook.com', 'abcd@1234')
        cy.visit('/')
    })

    it('Testing API get list typical items', () => {
        cy.request('GET', 'http://localhost:8800/api/category/typical-items?page=1&limit=10&orderBy=desc&orderType=updatedAt&filterByRootId=true')
    });
});
