class ContactPage {
  fillContactForm(user) {
    cy.get('input[name="Nama Lengkap"]').clear().type(user.fullname, { delay: 100 })
    cy.get('input[name="subject"]').clear().type(user.nickname, { delay: 50 })
    cy.get('input[name="email_from"]').clear().type(user.email, { delay: 50 })
    cy.get('input[name="Telefon/Whatsapp"]').clear().type(user.phone, { delay: 50 })
    cy.get('input[name="Perusahaan/Institusi"]').clear().type(user.company, { delay: 50 })
    cy.get('textarea[name="Beritahu kami apa yang anda butuhkan?"]').clear().type(user.message, { delay: 50 })
    cy.get('select').select(user.referral)
  }

  submitForm() {
    cy.contains('Kirim').click()
  }
}

export default ContactPage
