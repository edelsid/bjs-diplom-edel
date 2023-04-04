"use strict";

const person = new UserForm();

person.loginFormCallback = data => ApiConnector.login(data, response => {
   if (response.success === true) {
      console.log(data);
      location.reload();
   } else {
      console.log(data);
      person.setLoginErrorMessage(response.error);
   }  
});

person.registerFormCallback = data => ApiConnector.register(data, response => {
   if (response.success === true) {
      location.reload();
   } else {
      person.setRegisterErrorMessage(response.error);
   }
});
