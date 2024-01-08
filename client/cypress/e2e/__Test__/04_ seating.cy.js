// seating.spec.js

describe("Seating Page Test", () => {
  const movieId = "6593c6a06172ec1bdf99f2f8"; // Replace with a valid movie ID from your application
  const showTimeId = "658fb3867c0a696b6e126fdc"; // Replace with a valid show time ID

  beforeEach(() => {
    cy.visit(`http://localhost:3000/seating/${movieId}/${showTimeId}`);
  });

  it("loads the seating page successfully", () => {
    // Check for loading state
    cy.get(".loading-spinner").should("exist");
    cy.get("TailSpin").should("not.exist"); // Ensure loading spinner disappears

    // Check for movie information
    cy.get(".seating-movie-title").should("exist");

    // Check for available seats
    cy.get(".Cinema .seat").should("exist");

    // Check for occupied seats
    cy.get(".Cinema .seat.occupied").should("exist");

    // Check for the booking button
    cy.get(".pay-now-button").should("exist");

    // Check for Chat component
  });

  // Additional tests can be added as needed
});
