TaskManager

A simple task management web application built with Angular 21. This app allows users to create, edit, change status, and delete tasks, similar to a lightweight Jira board. The project is deployed online using GitHub Pages and uses MockAPI for dynamic data.

Live Demo

https://zeek-hub.github.io/task-manager/

Features

Add new tasks with a title and status

Edit existing tasks and update their status (todo, in-progress, done)

Delete tasks you no longer need

Tasks are persisted online using MockAPI

Dynamic, responsive, and fast single-page application

Technologies

Frontend: Angular 21, TypeScript, RxJS, Angular Forms

Backend / API: MockAPI (REST)

Deployment: GitHub Pages

Getting Started (Local Development)
Prerequisites

Node.js >= 18

Angular CLI >= 21

Installation
# Clone the repository
git clone https://github.com/zeek-hub/task-manager.git

# Navigate to the project
cd task-manager

# Install dependencies
npm install
Run Local Development Server
ng serve

Open your browser at http://localhost:4200/

The app will automatically reload if you change any of the source files

Build for Production
ng build --configuration production --base-href "/task-manager/"

Production-ready files will be in dist/task-manager/browser

Deploy to GitHub Pages with:

npx angular-cli-ghpages --dir=dist/task-manager/browser
Code Scaffolding

Angular CLI provides powerful tools to generate new components, services, etc.:

ng generate component component-name
ng generate service service-name
Testing
Unit Tests
ng test
End-to-End Tests
ng e2e

Note: Angular CLI does not include an e2e framework by default.

Additional Resources

Angular CLI Documentation
