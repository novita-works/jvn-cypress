class HomePage {
  visit() {
    cy.visit('/en')
  }

  verifyHeroSection() {
    cy.contains('#ForBetterProductivity').should('be.visible')
    cy.get('.fa.fa-line-chart').should('be.visible')
  }

  verifyTitleSection() {
    cy.contains('The Best BPMN Consultant in Indonesia').should('be.visible')
  }

  verifyContentSection() {
    // OUR PURPOSE section
    cy.contains('OUR PURPOSE').should('be.visible')
    cy.contains("JAVAN delivers customized & reliable business process automation solutions")
      .should('be.visible')

    // Product & Services section
    cy.contains('Product & Services PT Javan Cipta Solusi').should('be.visible')
  }

  verifyServiceLabels(services) {
    services.forEach((service) => {
      cy.contains(service.label).should('be.visible')
    })
  }

  verifyServiceLabelsExact(services) {
  services.forEach((service) => {
    const expectedLabel = service.label.trim().replace(/\s+/g, ' ')

    cy.get('section.s_three_columns')
      .find(`a[href="${service.href}"]`)
      .then(($links) => {
        // 1. Validasi: hanya boleh ada satu anchor
        expect($links.length).to.eq(1, `Expected only 1 <a> tag for ${service.href}, but found ${$links.length}`)

        // 2. Ambil teks dari anchor
        const actualText = $links[0].textContent.trim().replace(/\s+/g, ' ')

        // 3. Bandingkan teksnya dengan fixture
        expect(actualText).to.eq(expectedLabel, `Label mismatch for ${service.href}: got '${actualText}'`)

        // 4. Deteksi duplikasi kata/karakter berulang (optional check)
        const normalized = actualText.toLowerCase().replace(/[^\w]/g, '')
        const expectedNorm = expectedLabel.toLowerCase().replace(/[^\w]/g, '')
        const occurrences = normalized.split(expectedNorm).length - 1

        expect(occurrences).to.eq(1, `Duplicate content detected for ${service.href}: '${expectedNorm}' appears ${occurrences} times`)
      })
  })
}

  clickContactUsButton() {
    cy.contains('a.btn', 'Contact Us').should('be.visible').click()
  }
}

export default HomePage