describe('Politica de privacidade TAT', () => {

    beforeEach(() => {
        cy.visit("./src/privacy.html")
    })
    it.only('testa a página da política de privacidade de forma independente', () => {

        cy.url().should('include', 'privacy.html')
        cy.contains('Talking About Testing')
        
    })
})