class CheckoutPage {
  elements = {
    cartItems: () => cy.get('[data-test="inventory-item"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    error: () => cy.get('[data-test="error"]'),
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    subtotal: () => cy.get('[data-test="subtotal-label"]'),
    tax: () => cy.get('[data-test="tax-label"]'),
    total: () => cy.get('[data-test="total-label"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
  };

  startCheckout() {
    this.elements.checkoutButton().click();
  }

  fillCustomer({ firstName, lastName, postalCode }) {
    if (firstName) this.elements.firstName().type(firstName);
    if (lastName) this.elements.lastName().type(lastName);
    if (postalCode) this.elements.postalCode().type(postalCode);
    this.elements.continueButton().click();
  }

  finish() {
    this.elements.finishButton().click();
  }
}

/** "Item total: $39.98" -> 39.98 */
export const toAmount = (text) => Number(text.replace(/[^0-9.]/g, ''));

export default new CheckoutPage();
