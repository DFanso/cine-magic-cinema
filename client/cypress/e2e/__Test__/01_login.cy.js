describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login-container");
  });

  it("successfully logs in", () => {
    cy.get('input[type="text"]').type("vidwadeseram2002@gmail.com.com");
    cy.get('input[type="password"]').type("Alpha1234@");
    cy.get("#loginForm").submit();

    // Add assertions here
  });

  it("displays error on invalid login", () => {
    cy.get('input[type="text"]').type("wronguser@example.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get("#loginForm").submit();

    // Add assertions here
  });
});
