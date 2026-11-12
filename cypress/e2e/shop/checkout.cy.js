import inventoryPage from '../../pages/InventoryPage';
import checkoutPage, { toAmount } from '../../pages/CheckoutPage';

describe('Checkout · Sauce Demo', () => {
  let data;

  before(() => {
    cy.fixture('checkout').then((fixture) => {
      data = fixture;
    });
  });

  beforeEach(() => {
    cy.loginAs('standard');
    inventoryPage.visit();
    data.products.forEach((slug) => inventoryPage.addToCart(slug));
    inventoryPage.openCart();
  });

  it('completes a purchase and charges the right total', () => {
    checkoutPage.elements.cartItems().should('have.length', data.products.length);
    checkoutPage.startCheckout();
    checkoutPage.fillCustomer(data.customer);

    cy.location('pathname').should('eq', '/checkout-step-two.html');

    // Item total = sum of line prices; total = item total + tax.
    checkoutPage.elements.itemPrices().pricesFrom().then((prices) => {
      const expectedSubtotal = Cypress._.sum(prices);
      const expectedTax = Number((expectedSubtotal * data.taxRate).toFixed(2));
      const expectedTotal = (expectedSubtotal + expectedTax).toFixed(2);

      checkoutPage.elements.subtotal().invoke('text').then(toAmount).should('eq', Number(expectedSubtotal.toFixed(2)));
      checkoutPage.elements.tax().invoke('text').then(toAmount).should('eq', expectedTax);
      checkoutPage.elements.total().invoke('text').then(toAmount).should('eq', Number(expectedTotal));
    });

    checkoutPage.finish();

    cy.location('pathname').should('eq', '/checkout-complete.html');
    checkoutPage.elements.completeHeader().should('have.text', 'Thank you for your order!');
    inventoryPage.elements.cartBadge().should('not.exist');
  });

  const missingFields = [
    { field: 'First Name', customer: {} },
    { field: 'Last Name', customer: { firstName: 'Ana' } },
    { field: 'Postal Code', customer: { firstName: 'Ana', lastName: 'Tester' } },
  ];

  missingFields.forEach(({ field, customer }) => {
    it(`requires ${field} before continuing`, () => {
      checkoutPage.startCheckout();
      checkoutPage.fillCustomer(customer);

      checkoutPage.elements.error().should('be.visible').and('contain.text', `${field} is required`);
      cy.location('pathname').should('eq', '/checkout-step-one.html');
    });
  });
});
