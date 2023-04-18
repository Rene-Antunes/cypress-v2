/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   
    beforeEach(() => {
        cy.visit('./src/index.html')

    })
    
    it('verifica o título da aplicação', function() {
 
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
 
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'Testando a verificação de texto para futura verificação blablabla'
        cy.get('#firstName').type('Renê')
        cy.get('#email').type('rene@exemplo.com')
        cy.get('#lastName').type('Antunes')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao sibmeter o formulário com um email com formatação inválida', () =>{

        cy.get('#firstName').type('Renê')
        cy.get('#email').type('rene@exemplo,com')
        cy.get('#lastName').type('Antunes')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo Telefone continua vazia mesmo após digitar valor não-numérico', () =>{

        cy.get('#phone')
        .type('Teste Phone',)
        .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Renê')
        cy.get('#lastName').type('Antunes')
        cy.get('#email').type('rene@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
        .type('Renê')
        .should('have.value', 'Renê')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Antunes')
        .should('have.value', 'Antunes')
        .clear()
        .should('have.value', '')
        
        cy.get('#email')
        .type('rene@exemplo.com')
        .should('have.value', 'rene@exemplo.com')
        .clear()
        .should('have.value', '')
        
        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
                   
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
            
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })
    
    it('Seleciona produtos (Blog), (Cursos), (Mentoria), (Youtube) por seu texto', () =>{
        
        cy.get('#product')
        .select('Blog')
        .should('have.value', 'blog')

        cy.get('#product')
        .select('Cursos')
        .should('have.value', 'cursos')

        cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')

        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })


    it('Seleciona produtos (Blog), (Cursos), (Mentoria), (Youtube) por seu valor', () =>{
        
        cy.get('#product')
        .select('blog')
        .should('have.value', 'blog')

        cy.get('#product')
        .select('cursos')
        .should('have.value', 'cursos')

        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')
    })

    it('Seleciona produtos (Blog), (Cursos), (Mentoria), (Youtube) por seu índice', () =>{
        
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

        cy.get('#product')
        .select(2)
        .should('have.value', 'cursos')

        cy.get('#product')
        .select(3)
        .should('have.value', 'mentoria')

        cy.get('#product')
        .select(4)
        .should('have.value', 'youtube')
    })

    it('marca o tipo de atendimento "Feedback" ', () => {

        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        
    })

    it('marca ambos checkboxes, depois desmarca o último',() => {
         
       cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .each(($checkbox) => {
           cy.wrap($checkbox)
           .check()
           .should('be.checked')
        cy.get('#phone-checkbox').uncheck().should('not.be.selected')
       })

    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
        
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
        cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.get('a[href="privacy.html"]')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.title()
        .should('be.eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
  
  })
