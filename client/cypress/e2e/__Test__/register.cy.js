// register.spec.js

describe("Register Page Test", () => {
  beforeEach(() => {
    // Adjust this to match the route to your Register component
    cy.visit("http://localhost:3000/register");
  });

  it("validates and submits the registration form", () => {
    // Fill the registration form
    cy.get('input[placeholder="First Name"]').type("John");
    cy.get('input[placeholder="Last Name"]').type("Doe");
    cy.get('input[placeholder="Email"]').type("johndoe@example.com");
    cy.get('input[placeholder="Password"]').type("Password123!");
    cy.get('input[placeholder="Confirm Password"]').type("Password123!");

    // Submit the form
    cy.get("#submitTEST").submit();

    // Check if the OTP request screen is shown or if there's a redirect
    // Replace this with a check that matches your application's behavior
    cy.contains("Please proceed to verify your email").should("exist");
  });

  // Additional tests for error validation can be added here
});
