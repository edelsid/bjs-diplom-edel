"use strict";

const person1 = new UserForm ();
person1.loginFormCallback = data => ApiConnector.login({login: data.login, password: data.password}, response => {if (response.success === true) {
   location.reload();
} else {
   person1.setLoginErrorMessage(response.error);
}});

person1.registerFormCallback = data => ApiConnector.register({login: data.login, password: data.password}, response => {if (response.success === true) {
   location.reload();
} else {
   person1.setRegisterErrorMessage(response.error);
}});
