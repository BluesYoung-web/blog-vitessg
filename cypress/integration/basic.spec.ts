/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-02-14 12:05:33
 * @Description: 
 */

context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')
  })

  it('slide', () => {
    cy.get('.down .icon')
      .should('exist')
  })

  it('nav', () => {
    cy.get('.right .item')
      .first()
      .click()
      .url()
      .should('eq', 'http://localhost:3333/blogs')

    cy.get('.right .item')
      .first()
      .next()
      .click()
      .url()
      .should('eq', 'http://localhost:3333/about')
    
    cy.get('.left a')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/')
  })

})
