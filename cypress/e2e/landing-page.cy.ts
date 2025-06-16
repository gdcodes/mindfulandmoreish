describe('Landing Page', () => {
    it('successfully loads', () => {
      cy.visit('/');
      cy.get('[data-test-id="search-input"]').should('be.visible');
    });
  }); 