describe('Cocktail Details Page', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=11007`, {
      method: 'GET',
      fixture: '../fixtures/details.json'
    });
    cy.visit('http://localhost:3000/');
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();
  });

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

  it ('Should display the cocktail name', () => {
    cy.get('.selected-cocktail-name').should('have.text', 'Margarita')
  });

  it ('Should display what kind of glass the cocktail is served in', () => {
    cy.get('.selected-cocktail-glass').should('have.text', 'Served in a Cocktail glass')
  });

  it ('Should display the ingredients', () => {
    cy.get('.selected-cocktail-ingredients-header').should('have.text', 'Ingredients:');
    cy.get('.selected-cocktail-ingredients-list').get('li').first().should('have.text', `1 1/2 oz  Tequila`)
      .next().should('have.text', '1/2 oz  Triple sec')
      .next().should('have.text', '1 oz  Lime juice')
      .next().should('have.text', '... Salt')
  });

  it ('Should the instructions', () => {
    cy.get('.selected-cocktail-instructions').should('have.text', 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.')
  });

  it ('Have a button to add it to user event', () => { //make sure button disappears
    cy.get('.add-button').should('have.text', 'Add this to my event offerings')
  });
});

describe('Cocktail Details Error Handling', () => {
  it('Should let the user know if there was a problem getting the data', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=11007`, {
      statusCode: 400
    });
    cy.visit('http://localhost:3000/');
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();

    cy.get('.detail-status-message').should('have.text', '400 level error, our apologies - please contact site administrator.')
  });

  it('Should let the user know if there was another sort of problem getting the data', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=11007`, {
      statusCode: 500
    });
    cy.visit('http://localhost:3000/');
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();

    cy.get('.detail-status-message').should('have.text', 'Failed to load data, our apologies.')
  });

  it('Should let the user know if the database is just missing the data', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=11007`, {
      method: 'GET',
      fixture: '../fixtures/blankData.json'
    });
    cy.visit('http://localhost:3000/');
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();

    cy.get('.detail-status-message').should('have.text', `Looks like there's some missing data or an error, try another cocktail or check with site administrator.`)
  });

})