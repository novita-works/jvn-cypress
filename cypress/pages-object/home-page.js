class HomePage {
    visit() {
      cy.visit('/en') 
    }

    verifyPageTitle() {
      cy.get('homepage').should.contains('#ForBetterProductivity')
    }

    contactUsButton() {
      cy.get('btn btn-custom text-white').click()
    }
}
export default HTMLObjectElementPage
