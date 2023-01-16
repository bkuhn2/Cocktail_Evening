describe('Home Page View', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.visit('http://localhost:3000/');
  })

  it('If a user types a bad URL, should direct to a page that lets them know it with a way back', () => {
    cy.visit('http://localhost:3000/badurl');
    cy.contains(`Looks like something got a little mixed up, head back to the party`)
    cy.get('button').click()
      .url().should('equal', 'http://localhost:3000/')
  
  })

});