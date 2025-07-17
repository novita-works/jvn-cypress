class PortfolioPage {
  visit() {
    cy.visit('/en/portofolio')
  }

  verifyHeroSection() {
    cy.contains('Optimalkan Proses Bisnis').should('be.visible')
    cy.contains('Setiap bisnis perlu menghasilkan keuntungan').should('be.visible')
  }

  verifyInstitutionSection() {
    cy.contains('Instansi Pemerintah').should('be.visible')
    cy.contains('Instansi Swasta').should('be.visible')

    // Link Pemerintah section
    cy.contains('Instansi Pemerintah')
      .parent()
      .within(() => {
        cy.contains('Daftar Portofolio').should('have.attr', 'href').and('include', 'portofolio')
        cy.contains('Studi Kasus').should('have.attr', 'href')
      })

    // Link Swasta section
    cy.contains('Instansi Swasta')
      .parent()
      .within(() => {
        cy.contains('Daftar Portofolio').should('have.attr', 'href').and('include', 'portofolio')
        cy.contains('Studi Kasus').should('have.attr', 'href')
      })
  }
}

export default PortfolioPage