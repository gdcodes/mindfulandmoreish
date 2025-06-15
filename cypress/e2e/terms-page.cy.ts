describe('Terms Page', () => {
  it('successfully loads', () => {
    cy.visit('/terms');
    cy.get('[data-test-id="terms-title"]').should('be.visible');
  });
}); 