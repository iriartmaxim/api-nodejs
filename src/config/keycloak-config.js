const session = require('express-session');
const Keycloak = require('keycloak-connect');


let _keycloak;


var keycloakConfig = {
    clientId: 'employees',
    bearerOnly: true,
    serverUrl: 'http://192.168.135.131:8080/',
    realm: 'DemoTest',
    credentials: {
        secret: 'qB1gWS0zZ6Ua6d2N2Y8Fugxfj4Vl205S'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}


module.exports = {
    initKeycloak,
    getKeycloak
};