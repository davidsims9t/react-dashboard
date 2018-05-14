/* @flow */
import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
    domain: 'react-dashboard.auth0.com',
    clientID: 'NIEg7KfgKtX95655LfvjEZjy6fHn6vAn'
});

export const ID_TOKEN_KEY = 'id_token';

export function login() {
    auth.authorize({
        domain: 'react-dashboard.auth0.com',
        clientID: 'NIEg7KfgKtX95655LfvjEZjy6fHn6vAn',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://react-dashboard.auth0.com/userinfo',
        responseType: 'id_token',
        scope: 'openid email profile'
    });
}

export function logout() {
    clearIdToken();
    browserHistory.push('/');
}

export function requireAuth(replace) {
    if (!isLoggedIn()) {
        replace({pathname: '/'});
    }
}

export function getIdToken():string {
    return localStorage.getItem(ID_TOKEN_KEY);
}

export function isLoggedIn():boolean {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function setIdToken(token:string) {
    localStorage.setItem(ID_TOKEN_KEY, token);
}

export function getEmail() {
    return getProfile().email;
}

export function getName() {
    return getProfile().nickname;
}

// Helper function that will allow us to extract the id_token
export function getAndStoreParameters(callback) {
    auth.parseHash(window.location.hash, (err:string, authResult:any) => {
        if (err) {
            return console.log(err);
        }

        setIdToken(authResult.idToken);
        callback();
    });
}

export function getProfile() {
    const token = decode(getIdToken());
    return token;
}

function getTokenExpirationDate(encodedToken:string):Date {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}