# Explanation of 

The following will explain an basic overview:
- npm install
- npm start
- created an initial basic structure of folder structure and files including:
    - index.html: includes Bootstrap, jQuery, and custom CSS and JS files  
    - app.js: Main AngularJS controller
    - app.module.js: Main AngularJS module
    - app.routes.js: Main AngularJS routes, only one route
    - app.config.js: Main AngularJS configuration
    - lenders.service.js: Service to get lenders data, the initial fetch WILL fail for demo purposes error handling
    - lenders.view.js: Handles state, functionality, and view of the lenders list including the pagination and modal logic for the lender details
    - lenders.view.html: HTML template for the lenders list, Loading and Error states, and the modal for the lender details
    - edit-lender-modal.component.js: Handles the edit lender modal logic, edit/save/cancel

My intention was the break the code into different files to make it more readable and maintainable, and to separate the concerns of each part of the view. I added one extra object to the data array to test the pagination. When you first load the page the API will fail which is forced behaviour to test the error handling; an error message will be displayed and a button to re-try. The branding I roughly gathered from the provided image and the Infynity login page.
I placed the main lenders maintenance view in lenders.view/.js,.html,.css files. This houses the main view and logic. Components has a purposes to house the shareable components such as the Header and seperated the edit-lender-modal.component.js which is easier to maintain and read.

Improvements that could be made to this exercise are:
- move the lenders.view.html into its own file under app/components/lenders/lenders-table.component.html
- add unit tests to validate that the requirements of Scenario 1, 2, 3, 4
- use Webpack/gulp so a later ecmaScript could be used
- add a build process to minify and bundle the files
- as well to use SCSS instead of basic CSS
- mock the API endpoints instead of using JSON file