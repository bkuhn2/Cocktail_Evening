describe('Search Functionality', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=margarita`, {
      method: 'GET', 
      fixture: '../fixtures/nameSearch.json'
    });
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Tequila`, {
      method: 'GET', 
      fixture: '../fixtures/nameSearch.json'
    });
    cy.visit('http://localhost:3000/');
  });

  it('Should have inputs to search for a cocktail name or search for an ingredient', () => {
    cy.get('input[name="cocktail-name"]')
      .type('Gimlet')
      .should('have.value', 'Gimlet');
    
    cy.get('input[name="ingredient-name"]')
      .type('Butter')
      .should('have.value', 'Butter')
  });

  it('Should be able to search for a cocktail by name', () => {
    cy.get('input[name="cocktail-name"]')
      .type('margarita');

    cy.get('button').click();

    cy.contains("margarita")
    cy.get('img[src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"]')
    cy.contains("Margarita")
    cy.get('img[src="https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg"]')
    cy.contains("Blue Margarita")
  });

  it('Should be able to clear the results', () => {
    cy.get('input[name="cocktail-name"]')
    .type('margarita');
    cy.get('button').click();

    cy.get('.clear-button').click();
    cy.get('.search-display').should('be.empty')
  })

  it('Should be able to search for available ingredients', () => {
    cy.get('input[name="ingredient-name"]')
    .type('butt');

    cy.contains('Select an ingredient to see cocktails that match');
    cy.contains('Butter');
    cy.contains('Butterscotch Schnapps');
  });

  it('Should be able to search for a cocktail by ingredient when you click on a matching ingredient', () => {
    cy.get('input[name="ingredient-name"]')
      .type('teq');
    cy.get('.ingredient').click();

    cy.contains("Tequila")
    cy.get('img[src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"]')
    cy.contains("Margarita")
    cy.get('img[src="https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg"]')
    cy.contains("Blue Margarita")
  });
});

describe ('Search Error Handling', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.visit('http://localhost:3000/');
  });

  it('Should not allow user to enter certain characters in search fields', () => {
    cy.get('input[name="cocktail-name"]')
      .type('#,%?<>^{}/')
      .should('have.value', '');

    cy.get('input[name="ingredient-name"]')
      .type('#,%?<>^{}/')
      .should('have.value', '');
  });

  it('Should let users know when there is a 400 level error', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=margarita`, {
      statusCode: 400,
    });
    cy.get('input[name="cocktail-name"]')
    .type('margarita');
    cy.get('button').click();
    cy.contains(`400 level error, our apologies - please contact site administrator.`);
  });

  it('Should let users know when there is a back end error', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=margarita`, {
      statusCode: 500,
    });
    cy.get('input[name="cocktail-name"]')
    .type('margarita');
    cy.get('button').click();
    cy.contains(`Failed to load data, our apologies.`);
  });

  it('Should let users know there is nothing matching their name search term', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=made up name`, {
      method: 'GET', 
      fixture: '../fixtures/nameSearch.json'
    });
    cy.get('input[name="cocktail-name"]')
      .type('made up name');
    cy.get('button').click();
    cy.contains(`Apologies, we couldn't find anything matching "made up name."`);
  });

  it('If a user types in an ingredient that is not in the database it should let them know', () => {
    cy.get('input[name="ingredient-name"]')
      .type('Radish');
    cy.contains(`Couldn't find any matching ingredients.`);
  });

  it('Should let users know there is no data for the ingredient the clicked', () => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Butter`, {
      method: 'GET', 
      fixture: '../fixtures/blankData.json'
    });
    cy.get('input[name="ingredient-name"]')
    .type('butt');

    cy.get('button').eq(2).click();
    cy.contains(`Apologies, we couldn't find drinks with Butter, but check back as we're always updated our storerooms.`)
  });
});
