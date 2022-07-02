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
import 'cypress-localstorage-commands'
Cypress.Commands.add('verifyRedirect', (expectedUrl) => {
  cy.url().should('eq', Cypress.config('baseUrl') + expectedUrl)
})

Cypress.Commands.add('verifyToasterMessage', (element, message, click = false) => {
  return cy.get(element).should('be.visible')
    .get(element).should('have.text', message)
    .then(($el) => {
      if (click) {
        cy.get($el).contains(message).click()
      }
      return
    })
})
