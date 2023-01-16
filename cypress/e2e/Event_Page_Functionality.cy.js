
describe('Event Page', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.visit('http://localhost:3000/myevent');
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

  it('Should have basic headings and nothing else', () => {
    cy.get('.event-heading').should('have.text', 'My Event');
    cy.get('.event-instructions').should('have.text', 'Browse our cocktail selection to find items to add to your event.');
  });

});

describe('Adding Cocktails to Event Offerings', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
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

  it(`Should be able to add a cocktail to user's event offerings by clicking the button on the cocktail details page`, () => {
    cy.get('.add-button').click()
    cy.get('.saved-message').should('have.text', 'This cocktail is included in your event offering.');
  });

  it('User should see cocktail in their event offerings', () => {
    cy.get('.add-button').click();
    cy.contains('My Event').click()
      .url().should('equal', 'http://localhost:3000/myevent');
    cy.get('.event-cocktails-section').get('.event-cocktail-name').should('have.text', 'Margarita');
    cy.get('.event-cocktails-section').get('.event-cocktail-image').should('have.attr', 'src').should('eq', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg')
    cy.get('.event-cocktails-ingredient-list').get('li').first().should('have.text', `1 1/2 oz  Tequila`)
      .next().should('have.text', '1/2 oz  Triple sec')
      .next().should('have.text', '1 oz  Lime juice')
      .next().should('have.text', '... Salt')
    cy.get('.delete-button').should('have.text', 'Remove from my event')
  });

  it('If a cocktail is already in the event offerings, then user cannot save it again', () => {
    cy.get('.add-button').click();
    cy.contains('My Event').click();
    cy.contains('Find Cocktails').click();
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();

    cy.get('.saved-message').should('have.text', 'This cocktail is included in your event offering.');
    cy.get('.add-button').should('not.exist');
  })
});

describe('Removing Cocktails from Event Offerings', () => {
  beforeEach(() => {
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, {
      method: 'GET',
      fixture: '../fixtures/ingredientList.json'
    });
    cy.intercept(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=11007`, {
      method: 'GET',
      fixture: '../fixtures/details.json'
    });
    cy.visit('http://localhost:3000/');
    cy.get('input[name="cocktail-name"]')
      .type('margarita');
    cy.get('button').click();
    cy.get('.result').eq(0).click();
    cy.get('.add-button').click();
    cy.contains('My Event').click();
  });

  it('Should be able to remove cocktails from event offerings', () => {
    cy.get('.event-cocktails-section').get('.event-cocktail-name').should('have.text', 'Margarita');
    cy.get('.event-cocktails-section').get('.event-cocktail-image').should('have.attr', 'src').should('eq', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg')

    cy.get('.event-cocktails-section').get('.delete-button').click();

    cy.get('.event-cocktail-image').should('not.exist');
    cy.get('.event-cocktail-name').should('not.exist');
    cy.get('event-cocktail-section').should('not.exist');
  });
});