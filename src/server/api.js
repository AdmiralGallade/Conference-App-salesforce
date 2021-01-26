// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');



const jsforce = require('jsforce');
require('dotenv').config();
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});



const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/sessions', (req, res) => {
    const soql = `SELECT Id, Name, toLabel(Room__c), Description__c, format(Date_and_Time__c) formattedDateTime,
        (SELECT Speaker__r.Id, Speaker__r.Name, Speaker__r.Description, Speaker__r.Email, Speaker__r.Picture_URL__c FROM Session_Speakers__r)
        FROM Session__c ORDER BY Date_and_Time__c LIMIT 100`;
    /* Salesforce connection */
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
