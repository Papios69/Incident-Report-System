describe("Smoke test – homepage loads", () => {
  it("visits the Netlify deployment", () => {
    cy.visit("https://incidentreportsys.netlify.app");
    cy.contains(/incident/i); // checks for the word “incident”
  });
});
