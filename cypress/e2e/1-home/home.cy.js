import HomePage from '../../support/pom/home-page'
import ContactPage from '../../support/pom/contact-us-page'
const home = new HomePage()
const contact = new ContactPage()

describe('Verify Home Display & Functionality', () => {
    beforeEach(() => {
        home.visit()
        home.verifyHeroSection()
        home.verifyTitleSection()
        home.verifyContentSection()
    })

    it('Verify display all service labels correctly', () => {
        cy.fixture('services').then((services) => {
        home.verifyServiceLabelsExact(services)
        })
    })

    it('Verify all service links correctly', function () {
        cy.fixture('services').then((products) => {
            products.forEach((product) => {
            cy.get(`a[href="${product.href}"]`)
                .filter(':visible')
                .first()
                .scrollIntoView()
                .should('be.visible')
                .and('contain.text', product.label)
            })
        })
    })
})

describe('Verify Contact Form Functionality & Validation', () => {
    beforeEach(() => {
        home.visit()
        home.clickContactUsButton()
    })

    it('Verify contact us button navigation from homepage', () => {
        cy.url().should('include', '/hubungi-kami')        
        cy.contains('Contact Us').should('be.visible')
        cy.contains('JAVAN adalah perusahaan konsultan BPMN terpercaya di Indonesia.').should('be.visible')
    })

    it('Submits contact us form with valid data', () => {
        cy.fixture('valid-user').then((user) => {
        contact.fillContactForm(user)
        contact.submitForm()
        })
        cy.url().should('include', '/contactus-thank-you')
    })

    it('Submits contact us form when all fields are invalid', () => {
        cy.fixture('invalid-user').then((user) => {
        contact.fillContactForm(user)
        contact.submitForm()

        cy.get('input[name="Nama Lengkap"]').should('have.class', 'is-invalid')
        cy.get('input[name="subject"]').should('have.class', 'is-invalid')
        cy.get('input[name="email_from"]').should('have.class', 'is-invalid')
        cy.get('input[name="Telefon/Whatsapp"]').should('have.class', 'is-invalid')
        cy.get('input[name="Perusahaan/Institusi"]').should('have.class', 'is-invalid')
        cy.get('textarea[name="Beritahu kami apa yang anda butuhkan?"]').should('have.class', 'is-invalid')
        cy.contains('Please fill in the form correctly').should('be.visible')
        })
    })

    it('Submits contact us form when all fields are filled with space only', () => {
        cy.fixture('space-only-user').then((user) => {
        contact.fillContactForm(user)
        contact.submitForm()

        cy.get('input[name="email_from"]').should('have.class', 'is-invalid')
        cy.get('input[name="Nama Lengkap"]').should('have.class', 'is-invalid')
        cy.get('input[name="subject"]').should('have.class', 'is-invalid')
        cy.get('input[name="Telefon/Whatsapp"]').should('have.class', 'is-invalid')
        cy.get('input[name="Perusahaan/Institusi"]').should('have.class', 'is-invalid')
        cy.get('textarea[name="Beritahu kami apa yang anda butuhkan?"]').should('have.class', 'is-invalid')
        cy.contains('Please fill in the form correctly').should('be.visible')
        })
    })

    it('Submits contact us form when all fields are empty', () => {
        contact.submitForm()
        
        cy.get('input[name="Nama Lengkap"]').should('have.class', 'is-invalid')
        cy.get('input[name="subject"]').should('have.class', 'is-invalid')
        cy.get('input[name="email_from"]').should('have.class', 'is-invalid')
        cy.get('textarea[name="Beritahu kami apa yang anda butuhkan?"]').should('have.class', 'is-invalid')
        cy.contains('Please fill in the form correctly').should('be.visible')
    })

})

