// moviePage.spec.js

describe("Movie Page Test", () => {
  const movieId = "658fb3867c0a696b6e126fdc"; // Replace with a valid movie ID from your application

  beforeEach(() => {
    cy.visit(`http://localhost:3000/movie/${movieId}`);
  });

  it("loads the movie page successfully", () => {
    // Check for loading state
    cy.get(".movie-cover").should("exist");
    cy.get("TailSpin").should("not.exist"); // Ensure loading spinner disappears

    // Check for movie information
    cy.get(".movie-title").should("exist");
    cy.get(".movie-des-p").should("exist"); // Description paragraph
    cy.get(".cast-table").should("exist"); // Cast information
    cy.get(".team-table").should("exist"); // Team information

    // Check for the feedback form
    cy.get(".feedback-section").should("exist");
    cy.get("form").should("exist");
  });

  // More tests can be added as needed
});
