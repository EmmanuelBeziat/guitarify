/// <reference types="cypress" />

describe('API Routes - Brands', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3050')
  })

  it('should return a list of brands', () => {
    cy.request('/brands')
      .its('status')
      .should('equal', 200)
      .its('body')
      .should('have.length.greaterThan', 0)
  })

  it('should return a specific brand', () => {
    cy.request('/brand/1')
      .its('status')
      .should('equal', 200)
      .its('body')
      .should('have.property', 'id', 1)
  })
})
