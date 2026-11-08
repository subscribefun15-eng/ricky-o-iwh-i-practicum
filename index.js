
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Express setup
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HubSpot configuration
const token = process.env.HUBSPOT_SERVICE_KEY;
const objectId = process.env.HUBSPOT_OBJECT_TYPE_ID;

const nameProperty = process.env.HUBSPOT_NAME_PROPERTY || 'name';
const genreProperty = process.env.HUBSPOT_GENRE_PROPERTY || 'genre';
const bpmProperty = process.env.HUBSPOT_BPM_PROPERTY || 'bpm';

if (!token || !objectId) {
  console.error('Missing HubSpot settings in .env');
  process.exit(1);
}

const hubspot = axios.create({
  baseURL: 'https://api.hubapi.com',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

const objectEndpoint = `/crm/v3/objects/${encodeURIComponent(objectId)}`;

// ROUTE 1: Display Music Projects
app.get('/', async (req, res) => {
  try {
    const projects = [];
    let after;

    do {
      const response = await hubspot.get(objectEndpoint, {
        params: {
          properties: [
            nameProperty,
            genreProperty,
            bpmProperty
          ].join(','),
          limit: 100,
          ...(after ? { after } : {})
        }
      });

      const records = response.data.results || [];

      for (const record of records) {
        projects.push({
          id: record.id,
          name: record.properties[nameProperty],
          genre: record.properties[genreProperty],
          bpm: record.properties[bpmProperty]
        });
      }

      after = response.data.paging?.next?.after;
    } while (after);

    res.render('homepage', {
      title: 'Music Projects | HubSpot Practicum',
      projects
    });
  } catch (error) {
    console.error('HubSpot GET failed:', error.response?.status);
    console.error('Reason:', error.response?.data?.message || error.message);
    res.status(502).send('Unable to retrieve Music Projects from HubSpot.');
  }
});

// ROUTE 2: Display Add Music Project form
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
  });
});

// ROUTE 3: Create a new Music Project
app.post('/update-cobj', async (req, res) => {
  const name = String(req.body.name || '').trim();
  const genre = String(req.body.genre || '').trim();
  const bpm = Number(req.body.bpm);

  if (!name || !genre || !Number.isFinite(bpm) || bpm <= 0) {
    return res.status(400).send('Please enter a valid name, genre, and BPM.');
  }

  const newProject = {
    properties: {
      [nameProperty]: name,
      [genreProperty]: genre,
      [bpmProperty]: String(bpm)
    }
  };

  try {
    await hubspot.post(objectEndpoint, newProject);

    // Return to the homepage after creating the record
    res.redirect('/');
  } catch (error) {
    console.error('HubSpot POST failed:', error.response?.status || error.message);
    res.status(502).send('Unable to create Music Project in HubSpot.');
  }
});

// Start the application
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
