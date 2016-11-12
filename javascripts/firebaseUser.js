"use strict";

var FbAPI = (function(oldFirebase){
  oldFirebase.getUser = function(apiKeys, uid){
    return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'GET',
      url: `${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
    }).then((response)=>{
      let users = []; //we are placing the keys (which are now objects) and putting them into an array so we can iterate over them
        Object.keys(response).forEach(function(key){
          response[key].id = key; //related to task and isCompleted
          users.push(response[key]); //this will push an object with all the object info
        });

      resolve(users[0]); //we do this so we will always be getting the id of the logged in user
    },(error) =>{
      console.log(error);
      reject(error);
    });
  });
  };

  oldFirebase.addUser = function(apiKeys, newUser){
     return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'POST',
      url: `${apiKeys.databaseURL}/users.json`,
      data: JSON.stringify(newUser), //this makes sure that whatever is coming back is valid json
      dataType: 'json'
    }).then((response)=>{
      console.log("response from POST", response);
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });

  };

  return oldFirebase;

})(FbAPI || {});