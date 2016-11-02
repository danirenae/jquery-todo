"use strict";

var FbAPI = (function(oldFirebase){

oldFirebase.getTodos = function(apiKeys, uid){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'GET',
      url: `${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`
    }).then((response)=>{
      let items = []; //we are placing the keys (which are now objects) and putting them into an array so we can iterate over them
        Object.keys(response).forEach(function(key){
          response[key].id = key; //related to task and isCompleted
          items.push(response[key]); //this will push an object with all the object info
        });

      resolve(items);
    },(error) =>{
      console.log(error);
      reject(error);
    });
  });
};

oldFirebase.addTodo = function(apiKeys, newItem){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'POST',
      url: `${apiKeys.databaseURL}/items.json`,
      data: JSON.stringify(newItem), //this makes sure that whatever is coming back is valid json
      dataType: 'json'
    }).then((response)=>{
      console.log("response from POST", response);
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
};

oldFirebase.deleteTodo = function(apiKeys, itemId){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'DELETE',
      url: `${apiKeys.databaseURL}/items/${itemId}.json`,
    }).then((response)=>{
      console.log("response from DELETE", response);
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
};

oldFirebase.editTodo = function(apiKeys, itemId, editedItem){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'PUT',
      url: `${apiKeys.databaseURL}/items/${itemId}.json`,
      data: JSON.stringify(editedItem), //this makes sure that whatever is coming back is valid json
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



