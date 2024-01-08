// about.spec.js

describe("About Page Test", () => {
  beforeEach(() => {
    // Adjust the URL to match your local or staging environment
    cy.visit("http://localhost:3000/about");
  });

  it("loads the about page successfully", () => {
    cy.get(".about-us").should("exist");
    cy.contains("ABOUT CINEMAGIC").should("exist");
    cy.contains("Cinemagic stands as a beacon of innovation").should("exist");
    cy.get(".media-container img").should(
      "have.attr",
      "src",
      "/images/about-cover-3.jpg"
    );
    cy.contains("VISION").should("exist");
    cy.contains("MISSION").should("exist");
  });

  // More tests can be added as needed
});
