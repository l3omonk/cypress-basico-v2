/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit("./src/index.html")
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('test, ', 30)

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area')
            .type( longText, { delay:0 })

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = Cypress._.repeat('test, ', 30)
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('email.email.com')
        cy.get('#open-text-area')
            .type( longText, { delay:0 })

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
        cy.get('#phone')
            .type('abcdefghijk')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = Cypress._.repeat('test, ', 30)
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('email.email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type( longText, { delay:0 })

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = Cypress._.repeat('test, ', 30)

        cy.get('#firstName')
            .type('Leonardo')
            .should('have.value', 'Leonardo')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Santana')
            .should('have.value', 'Santana')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('email.email.com')
            .should('have.value', 'email.email.com')
            .clear()
            .should('have.value', '')

            cy.get('#phone')
            .type('1122223333')
            .should('have.value', '1122223333')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type( longText, { delay:0 })
            .should('have.value', longText)
            .clear()
            .should('have.value', '')
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})



  