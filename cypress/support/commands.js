// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
        const longText = Cypress._.repeat('test, ', 30)

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type( longText, { delay:0 })

        cy.contains('button', 'Enviar').click()

})

Cypress.Commands.add('fillMandatoryFields', () => {
    const longText = Cypress._.repeat('test, ', 30)

    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type( longText, { delay:0 })

})

Cypress.Commands.add('fillFieldsCheckClearAndValidate', () => {
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