describe('Noirdoor Coding challenge', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title()
      .should('include', 'Noirdoor Coding Challenge');
  });

  it('should be able to start', () => {
    cy.get('.btn')
      .should('contain', 'Start')
      .click();
  });

  it('should be able to view the private area', () => {
    cy.get('.app__private')
      .should('have.length', 1);

    cy.get('.app__music')
      .should('have.length', 1);
  });



  it('should be able to logout', () => {
    cy.get('.app__logout')
      .click();
  });

  it('should have redirected to /', () => {
    cy.get('.app__home')
      .should('have.length', 1);
  });

  it('should be able to start again', () => {
    cy.get('.btn').should('contain', 'Start').click();

    cy.get('.app__private')
      .should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('.app__logout')
      .click();

    cy.get('.app__home')
      .should('have.length', 1);
  });
});
