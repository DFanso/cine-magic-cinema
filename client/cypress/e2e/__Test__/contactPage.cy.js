// contactPage.spec.js

describe("Contact Page Test", () => {
  beforeEach(() => {
    // Adjust the URL to match your application's route for the contact page
    cy.visit("http://localhost:3000/contact-page");
  });

  it("allows a user to submit a contact form", () => {
    // Check for form fields
    cy.get("input#name").should("exist").type("John Doe");
    cy.get("input#email").should("exist").type("johndoe@example.com");
    cy.get("input#mobileNumber").should("exist").type("1234567890");
    cy.get("textarea#message").should("exist").type("This is a test message.");

    // Submit the form
    cy.get("#submit").submit();

    // Check for loading state
    cy.get(".loader-container").should("not.exist"); // Ensure loading spinner disappears

    // Check for success message (adjust based on how success is handled in your app)
    cy.contains("Your message has been sent successfully.").should("exist");
  });

  // Additional tests as needed
});
