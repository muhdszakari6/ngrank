/// <reference types="Cypress" />

it('should display the app name on the home page and other information.', () => {
    cy.visit('/');

    cy.get('.welcome')
        .should('contain.text', 'Welcome to AngulaRank!');
    cy.get('.logoText')
        .should('contain.text', 'AngulaRank');

    cy.get('.dets')
        .should('contain.text', ' Below is the list of contributors to all Angular repositories. ');
});

it('should show loader.', () => {
    cy.get('.ldio-lfo2v2ppwu')
});

it('should sort by number of contributions.', () => {

    // cy.intercept('GET', 'https://api.github.com/orgs/angular/repos?page=1&per_page=100').as('getRepos')

    // cy.visit('/');

    // cy.wait(['@getRepos']).then(
    //     () => {
    //         cy.intercept('GET', 'https://api.github.com/repos/angular/samples/contributors?page=1&per_page=100').as('getContributors')

    //         cy.wait(['@getContributors']).then(
    //             () => {
    //                 cy.intercept('GET', 'https://api.github.com/users/abrons').as('getUser')
    //                 cy.wait(['@getUser']).then(
    //                     () => {
    //                         cy.get('.mat-header-row > .cdk-column-contributions').click()
    //                         cy.get('.mat-header-row > .cdk-column-contributions').click()
    //                     }
    //                 )
    //             }
    //         )


    //     }
    // )

});
