
# Integrating With HubSpot I: Foundations Practicum

This repository contains my Integrating With HubSpot I: Foundations practicum application.

## HubSpot Developer Test Account

**Custom Object:** Music Projects

[View Music Projects in HubSpot](https://app-na2.hubspot.com/contacts/247933125/objects/2-271510080/views/all/list)

## Music Projects Application

A Node.js application built with Express, Axios, and Pug that connects to a HubSpot developer test account.

### Features

- Retrieve Music Projects using the HubSpot CRM API.
- Display project names, genres, and BPM values in a table.
- Create new Music Projects using an HTML form.
- Redirect to the homepage after creating a record.
- Store API credentials securely using environment variables.

### Technologies Used

- Node.js
- Express.js
- Axios
- Pug
- HTML and CSS
- HubSpot CRM API
- Git and GitHub

### Running Locally

1. Run `npm install`.
2. Create a `.env` file using `.env.example`.
3. Add your HubSpot Service Key and custom object type ID.
4. Run `node index.js`.
5. Open http://localhost:3000.

**Security:** Never commit the `.env` file or API credentials.

## Application Routes

- `GET /` — Retrieves and displays Music Projects.
- `GET /update-cobj` — Displays the creation form.
- `POST /update-cobj` — Creates a Music Project in HubSpot.

## Pug Templates

- `homepage.pug` — Displays the Music Projects table.
- `updates.pug` — Contains the form for creating records.

## Practicum Requirements

- Three Express routes.
- Two Pug templates.
- A HubSpot developer test account.
- A custom object with Name, Genre, and BPM properties.
- At least three custom object records.
- Contacts association configured for the custom object.
- A working application that retrieves and creates CRM records.
- A link to the custom object's list view.

## Course Information

[HubSpot Academy Practicum Instructions](https://app.hubspot.com/academy/l/tracks/1092124/1093824/5493?language=en)

All submitted work must meet HubSpot Academy's originality and revision-history requirements.
