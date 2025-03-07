const { google } = require("googleapis");
const credentials = require("../creds.json");

const { client_secret, client_id, redirect_uris } = credentials.web;

const SCOPES = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.blood_glucose.read",
    "https://www.googleapis.com/auth/fitness.blood_pressure.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.reproductive_health.read",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

const oAuth2Client = new google.auth.OAuth2(
    client_id, 
    client_secret, 
    "http://localhost:8080/auth/google/callback"
);

// Add error handling for API initialization
const initializeAPIs = async () => {
    try {
        await google.people('v1').people;
        await google.fitness('v1').users;
        console.log('Google APIs initialized successfully');
    } catch (error) {
        console.error('Error initializing Google APIs:', error);
        throw error;
    }
};

module.exports = { 
    oAuth2Client, 
    SCOPES,
    initializeAPIs 
};