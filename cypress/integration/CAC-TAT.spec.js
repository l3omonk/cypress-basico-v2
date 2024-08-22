// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = Cypress._.repeat('test, ', 72)
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit("./src/index.html")
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })


    Cypress._.times(3, () => {
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
            
            cy.clock()
            cy.get('#firstName').type('Leonardo')
            cy.get('#lastName').type('Santana')
            cy.get('#email').type('email.email.com')
            cy.get('#open-text-area').type( longText, { delay:0 })

            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)

            cy.get('.error').should('not.be.visible')
        })
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
        cy.get('#phone')
            .type('abcdefghijk')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        
        cy.clock()
        cy.fillMandatoryFields()
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.fillFieldsCheckClearAndValidate()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).eq('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input){
                expect($input[0].files[0].name).eq('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture("example.json").as('jsonFile')
        cy.get('input[type="file"]')
            .selectFile('@jsonFile')
            .should(function($input){
                expect($input[0].files[0].name).eq('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.url().should('include', 'privacy.html')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('Faz uma requisicao HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response) => {
            const { status, statusText, body } = response
            expect(status).eq(200)
            expect(statusText).eq('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it('Desafio encontre o gato 🐈', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu amo gatos')
    })
})



  