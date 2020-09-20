# Sum-up

The first thing I do on every project I'm starting to work on is, even before diving into the code, is to read  `README` file(s). It could sound silly but since I'm taking the ownership of the project, I want to know what prior developers did.

From my understanding, the web app is a React-based UI application connected to a RESTful API. The app aims to display a list of franchisees by french postal codes. The search is quite responsive and mapping the enter key on the action of search button is a nice touch.

First, when starting the web app, I'm noticing that no data is displayed. It's only after clicking on the button that data appears which ruins the overall UX. Plus, when opening the browser console, I can see there's a lot of warnings pointing out some issues about the uniqueness of keys used in the list. Even though they won't stop the app from working, these warnings are here for a reason and it will be better to handle them ASAP.

Down below, I've listed all the things I've noticed by application splitted in 3 categories:

## API

- Remarks:
    - Usage of `eslint` and `prettier` which is a good point
    - An error handler is implemented
    - Every script command within `package.json` should be implemented and documented otherwise, they must be removed.
    - Got an error (`Cannot find module 'nan'`) when installing API dependencies (Node v12.18.x)
    - I would use `yarn` instead of `npm` but I've noticed it has been rollbacked to prevent issues on Windows

- Questions:
    - Which version of NodeJS should I used?
    - How come some script commands in `package.json` are documented but not implemented?

- Ideas:
    - Fix the error when installing dependencies
    - Use `nvm` for setting up the version of Node to use and create a `.nvmrc`
    - Reduce coupling by breaking down `index.js` into two distinct files: `server` and `app`. This way, each one has one responsibility and it's easier to test.
    - Write integration and unit tests
    - Convert code to Typescript or use Babel
    - Prepare the application for being deployed in production (`Dockerfile`, ...)
    - Use dependencies such as `husky`, `dotenv`, `nodemon`, etc.
    - Create at least one `.env` file for development purpose

## CLI

- Remarks:
    - Usage of `eslint` and `prettier` which is a good point
    - Every script command within `package.json` should be implemented and documented otherwise, they must be removed.
    - I would use `yarn` instead of `npm` but I've noticed it has been rollbacked to prevent issues on Windows

- Questions:
    - Which version of NodeJS should I used?
    - How come some script commands in `package.json` are documented but not implemented?

- Ideas:
    - Use `nvm` for setting up the version of Node to use and create a `.nvmrc`
    - Convert code to Typescript
    - Write tests

## WEBAPP

- Remarks:
    - Usage of `eslint` and `prettier` which is a good point
    - By following instructions of `README.md`, the app doesn't work.
    - UX-wise, the data should automatically load when landing on the home page
    - There are a lot of warnings in browser console due to elements having same keys (uniqueness)
    - Components could be reorganized in some folders
    - I would use `yarn` instead of `npm` but I've noticed it has been rollbacked to prevent issues on Windows
    - There are some vulnerabilities on the repository

- Questions:
    - Why not using JSX or even TSX?
    - Why the webapp has only one unit test (which is autogenerated)?

- Ideas:
    - I would add some instructions within the `README.md` file informing that user needs to create a `.env` from `.env.dist` file in development mode
    - Load data when landing on the homepage, without needing to click on the button
    - I would create some folders containing these stateful components for better readability
    - Prepare the application for being deployed in production (`Dockerfile`, ...)
    - Write integration and unit tests
    - Migrate to Typescript or at least, JSX
    - Fix dependencies vulnerabilities ASAP