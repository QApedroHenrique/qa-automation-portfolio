class InventoryPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    items: () => cy.get('[data-test="inventory-item"]'),
    names: () => cy.get('[data-test="inventory-item-name"]'),
    prices: () => cy.get('[data-test="inventory-item-price"]'),
    sort: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    menuButton: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('[data-test="logout-sidebar-link"]'),
  };

  visit() {
    // Sauce Demo is a static SPA: deep links answer 404 and the app routes on the client.
    cy.visit('/inventory.html', { failOnStatusCode: false });
  }

  /** @param {'az'|'za'|'lohi'|'hilo'} option */
  sortBy(option) {
    this.elements.sort().select(option);
  }

  addToCart(productSlug) {
    cy.get(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  removeFromCart(productSlug) {
    cy.get(`[data-test="remove-${productSlug}"]`).click();
  }

  openCart() {
    this.elements.cartLink().click();
  }

  logout() {
    this.elements.menuButton().click();
    this.elements.logoutLink().should('be.visible').click();
  }
}

export default new InventoryPage();
