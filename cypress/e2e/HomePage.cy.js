describe('Home Page View', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.visit('http://localhost:3000/');
  })

  it('Should have a header', () => {
    cy.get('header')
      .contains('Cocktail Evening');

    cy.get('header')
      .get('.nav-panel')
      .contains('Find Cocktails')
      .should('have.attr', 'href')

    cy.get('header')
      .get('.nav-panel')
      .contains('My Event')
      .should('have.attr', 'href')
  });

  it('Should be able to navigate', () => {
    cy.contains('Find Cocktails').click()
      .url().should('equal', 'http://localhost:3000/')

    cy.contains('My Event').click()
      .url().should('equal', 'http://localhost:3000/myevent')
  });

  it('Should have a search form', () => {
    cy.get('form')
  });
});