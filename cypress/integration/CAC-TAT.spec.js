/// <reference types="Cypress"/>


    describe('Central de Atendimento ao Cliente TAT', () => {
        this.beforeEach(() => {
            cy.visit('./src/index.html')
        })

        it('verifica o título da aplicação', () => {           
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })
      

        it('prenche os campos obrigatórios e envia o formulário', () => {
            const longtext = 'O que é Lorem Ipsum Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI,quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos,como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado'

            cy.get('#firstName').type('Pedro Henrique')
            cy.get('#lastName').type('Castelani')
            cy.get('#email').type('exemplo@exemplo.com')
            cy.get('#open-text-area').type(longtext, {delay:0})                 
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {        
            cy.get('#firstName').type('Pedro Henrique')
            cy.get('#lastName').type('Castelani')
            cy.get('#email').type('exemplo#exemplo.com')
            cy.get('#open-text-area').type('Teste')
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')
        })

        it('exibir campo vazio ao tentar digitar caracteres não-núméricas no campo telefone', () => {
            cy.get('#phone')
            .type('sidjisjdisjdisjd')
            .should('have.value', '')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
            cy.get('#firstName').type('Pedro Henrique')
            cy.get('#lastName').type('Castelani')
            cy.get('#email').type('exemplo@exemplo.com')
            cy.get('#phone-checkbox').click()
            cy.get('#open-text-area').type('Teste')
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should("be.visible")
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
            cy.get('#firstName')
                .type('Pedro Henrique')
                .should('have.value', 'Pedro Henrique')
                .clear()
                .should('have.value', '')
            cy.get('#lastName')
                .type('Castelani')
                .should('have.value', 'Castelani')
                .clear()
                .should('have.value', '')
            cy.get('#email')
                .type('exemplo@exemplo.com')
                .should('have.value', 'exemplo@exemplo.com')
                .clear()
                .should('have.value', '')
            cy.get('#phone')
                .type('123456789')
                .should('have.value', '123456789')
                .clear()
                .should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should("be.visible" )
        })

        it('envia o formuário com sucesso usando um comando customizado', () => {
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
        })

        it('seleciona um produto (YouTube) por seu texto', () => {
            cy.get('#product').select('YouTube')
                .should('have.value', 'youtube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', () => {
            cy.get('#product').select('Mentoria')
                .should('have.value', 'mentoria')
        })

        it('seleciona um produto (Blog) por seu índice', () => {
            cy.get('#product').select('Blog')
                .should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback"', () => {
            cy.get('input[type="radio"]')
                .check('feedback')
                .should('have.value', 'feedback')
        })

        it('marca cada tipo de atendimento', () => {
            cy.get('input[type="radio"')
                .check('ajuda')
                .should('be.checked')
            cy.get('input[type="radio"')   
                .check('feedback')
                .should('be.checked')
            cy.get('input[type="radio"')
                .check('elogio')
                .should('be.checked')
        })

        it('marca cada tipo de atendimento com "each" e "wrap"', () => {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(($radio) => {
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
        })

        it('marca ambos checkboxes, depois desmarca o último', () => {
            cy.get('#check')
                .should('have.length', 2)
                .each(($check) => {
                    cy.wrap($check).check()
                    cy.wrap($check).should('be.checked')
                })

        })

    })
    
    
