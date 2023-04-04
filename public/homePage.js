"use strict";

const personDeact = new LogoutButton();

personDeact.action = data => ApiConnector.logout(result => {
   if (result.success === true) {
      location.reload();
   }
});

ApiConnector.current(result => {
   if (result.success === true) {
      ProfileWidget.showProfile(result.data);
   }
});

const moneyRate = new RatesBoard();

function getBoard(...arr) {
   ApiConnector.getStocks(result => {
      if (result.success === true) {
         moneyRate.clearTable();
         moneyRate.fillTable(result.data);
         console.log('1 min passed');
      }
   })
}

getBoard();

setInterval (getBoard, 60000);

const moneyOperation = new MoneyManager();

moneyOperation.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
   if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyOperation.setMessage(response.success, 'Операция выполнена. Богатейте дальше!');
   } else {
      moneyOperation.setMessage(response.success, 'Операция не выполнена. ' + response.error + '.');
   }
});

moneyOperation.conversionMoneyCallback = data => ApiConnector.convertMoney (data, response => {
   if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyOperation.setMessage(response.success, 'Операция выполнена. ' + data.fromCurrency + ' в ' + data.targetCurrency + ' как по волшебству!');
   } else {
      moneyOperation.setMessage(response.success, 'Операция не выполнена. ' + response.error + '.');
   }
});

moneyOperation.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
   if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyOperation.setMessage(response.success, 'Операция выполнена. Спасибо за вашу щедрость.');
   } else {
      moneyOperation.setMessage(response.success, 'Операция не выполнена. ' + response.error + '.');
   }
});

const faves = new FavoritesWidget();

ApiConnector.getFavorites(result => {
   if (result.success === true) {
      faves.clearTable();
      faves.fillTable(result.data);
      moneyOperation.updateUsersList(result.data);
   }
});

faves.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
   if (response.success === true) {
      faves.clearTable();
      faves.fillTable(response.data);
      moneyOperation.updateUsersList(response.data);
      faves.setMessage(response.success, 'Пользователь добавлен в избранное. Поздравляем с новым другом.');
   } else {
      faves.setMessage(response.success, 'Операция не выполнена. ' + response.error + '.');
   }
});

faves.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
   if (response.success === true) {
      faves.clearTable();
      faves.fillTable(response.data);
      moneyOperation.updateUsersList(response.data);
      faves.setMessage(response.success, 'Пользователь удален из избранного. Лучше меньше, да лучше.');
   } else {
      faves.setMessage(response.success, 'Операция не выполнена. ' + response.error + '.');
   }
});