import './index.css';

import {getUsers, deleteUser} from './api/userApi';

//import rollbar from 'rollbar';

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: '0618c3af6e4244d98af30b1eaa4db6e9',
  captureUncaught: true,
  captureUnhandledRejections: true
});
window.onerror("TestRollbarError: testing window.onerror", window.location.href);

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");



//Populate table of users via API call
getUsers().then(result => {
    let usersBody = "";

    result.forEach(user => {
        usersBody += `<tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        </tr>`

    });

    global.document.getElementById('users').innerHTML = usersBody;

    const deleteLinks = global.document.getElementsByClassName('deleteUser');

    //Use Array.from to create an array from a DOM collection
    //getElementsByClassName returns an array-like object

    Array.from(deleteLinks, link => {
        link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
    }});


});