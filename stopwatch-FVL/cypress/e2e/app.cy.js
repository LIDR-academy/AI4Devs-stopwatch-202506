describe('Cronómetro', () => {
  it('Reinicia con el botón', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Iniciar').click();
    cy.wait(600);
    cy.contains('Pausa').click();
    cy.contains('Reiniciar').click();
    cy.get('[aria-label="display-tiempo"]').should('contain.text', '00:00:00');
  });
});

