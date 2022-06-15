Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Pedro Henrique')
    cy.get('#lastName').type('Castelani')
    cy.get('#email').type('exemplo@exemplo.com')
    cy.get('#open-text-area').type('Teste')                 
    cy.contains('button', 'Enviar').click()
})