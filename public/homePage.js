"use strict";

const personDeact = new LogoutButton();
personDeact.action = data => ApiConnector.logout(result => {if(result.success === true) {
   location.reload();
}});

ApiConnector.current(result => {if(result.success === true) {
   ProfileWidget.showProfile(result.data);
}});

