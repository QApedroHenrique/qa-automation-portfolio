import inventoryPage from '../../pages/InventoryPage';

describe('Product list · Sauce Demo', () => {
  beforeEach(() => {
    cy.loginAs('standard');
    inventoryPage.visit();
  });

  it('lists all six products with name and price', () => {
    inventoryPage.elements.items().should('have.length', 6);
    inventoryPage.elements.names().each(($name) => expect($name.text().trim()).not.to.be.empty);
    inventoryPage.elements.prices().each(($price) => expect($price.text()).to.match(/^\$\d+\.\d{2}$/));
  });

  it('sorts products by price, low to high', () => {
    inventoryPage.sortBy('lohi');

    inventoryPage.elements.prices().pricesFrom().then((prices) => {
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it('sorts products by price, high to low', () => {
    inventoryPage.sortBy('hilo');

    inventoryPage.elements.prices().pricesFrom().then((prices) => {
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
  });

  it('sorts products by name, Z to A', () => {
    inventoryPage.sortBy('za');

    inventoryPage.elements.names().then(($names) => {
      const names = Cypress._.map($names, 'innerText');
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });

  it('updates the cart badge when products are added and removed', () => {
    inventoryPage.addToCart('sauce-labs-backpack');
    inventoryPage.addToCart('sauce-labs-bike-light');
    inventoryPage.elements.cartBadge().should('have.text', '2');

    inventoryPage.removeFromCart('sauce-labs-backpack');
    inventoryPage.elements.cartBadge().should('have.text', '1');

    inventoryPage.removeFromCart('sauce-labs-bike-light');
    inventoryPage.elements.cartBadge().should('not.exist');
  });
});
