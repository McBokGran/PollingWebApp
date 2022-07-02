import elementSelector from './polls.es'

export class Polls {
  getCount(element) {
    return cy.get(element).each(($el, index, $list) => {
      return $list
    })
  }

  createPoll(description, c1, c2, addChoice = false, c3 = 'May be') {
    cy.get(elementSelector.question).type(description)
      .get(elementSelector.choice1).type(c1)
      .get(elementSelector.choice2).type(c2)

    if (addChoice) {
      cy.get('span').contains(' Add a choice').click()
        .get(elementSelector.choice3).type(c3)
    }
  }

  login(username, password) {
    cy.visit('/login')
      .verifyRedirect('/login')
    cy.get(elementSelector.usernameOrEmail).type(username)
      .get(elementSelector.password).type(password)
    cy.get(elementSelector.submitBtn).should('be.visible').click()
    cy.verifyRedirect('/')
    cy.verifyToasterMessage(elementSelector.toaster, `You're successfully logged in.`, false)
  }
}
