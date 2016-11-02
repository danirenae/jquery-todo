"use strict";

  let apiKeys = {};
  let uid = "";

  function putTodoInDOM (){
    FbAPI.getTodos(apiKeys, uid).then(function(items){
    console.log("items from FB", items);
    $('#completed-tasks').html("");
    $('#incomplete-tasks').html("");
    items.forEach(function(item){
      if(item.isCompleted === true){
      let newListItem = `<li data-completed="${item.isCompleted}">`;
      newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
      newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='</li>';
      //apend to list
      $('#completed-tasks').append(newListItem);
      } else {
         let newListItem = `<li data-completed="${item.isCompleted}">`;
      newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
      newListItem+='<input class="checkboxStyle" type="checkbox">';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+=`<button class="btn btn-default col-xs-6 edit" data-fbid='${item.id}'>Edit</button>`;
      newListItem+=`<button class="btn btn-danger col-xs-6 delete" data-fbid='${item.id}'>Delete</button>`;
      newListItem+='</div>';
      newListItem+='</li>';
      //apend to list
      $('#incomplete-tasks').append(newListItem);
      }
    });
  });
}

$(document).ready(function(){
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
      firebase.initializeApp(apiKeys);
      });

$('#click-me').on('click', function(){
let newItem = {
  "task": $('#input').val(), //this grabs the value of the input and puts it into object that we are creating
  "isCompleted": false
};
  FbAPI.addTodo(apiKeys, newItem).then(function(){
    putTodoInDOM();
  });
});

$('ul').on("click", ".delete", function(){
  let itemId = $(this).data("fbid");
  FbAPI.deleteTodo(apiKeys, itemId).then(function(){
  putTodoInDOM();
  });
});

$('ul').on("click", ".edit", function(){
  let parent = $(this).closest("li");
  if(!parent.hasClass("editMode")){
    parent.addClass("editMode");
  } else {
    let itemId = $(this).data("fbid");
    let editedItem = {
      "task": parent.find(".inputTask").val(),
      "isCompleted": false
    };
    FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(response){
    parent.removeClass("editMode");
    putTodoInDOM();
    });
    //firebase stuff
  }
  });

$('ul').on("change", 'input[type="checkbox"]', function(){
  let updatedIsCompleted = $(this).closest("li").data("completed");
  let itemId = $(this).parent().data('fbid');
  let task = $(this).siblings(".inputLabel").html();

  let editedItem = {
    "task": task,
    "isCompleted": !updatedIsCompleted
  };
  FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
    putTodoInDOM();
  });
});


$('#registerButton').on("click", function(){
  let email = $("#inputEmail").val();
  let password = $("#inputPassword").val();
  let user = {
    "email" : email,
    "password" : password
  };
  FbAPI.registerUser(user).then(function(response){
    console.log("register response", response);
    return FbAPI.loginUser(user);
  }).then(function(loginResponse){
    console.log("login response", loginResponse);
    uid = loginResponse.uid;
    putTodoInDOM();
    $('#login-container').addClass("hide");
    $('#todo-container').removeClass("hide"); //don't really understand this part - get clarification


  });
});

$('#loginButton').on("click", function(){
  let email = $("#inputEmail").val();
  let password = $("#inputPassword").val();
  let user = {
    "email" : email,
    "password" : password
  };
  FbAPI.loginUser(user).then(function(loginResponse){
    uid = loginResponse.uid;
    putTodoInDOM();
    $('#login-container').addClass("hide");
    $('#todo-container').removeClass("hide");
  })
})









});































// $(document).ready(function(){
//   let chatItem = $('input').val();
//   let output = $('.todo');
//   let currentSelection = "";



//   $('#click-me').on('click', (e)=>{
//     $('input').html("");
//     let chatItem = $('input').val();
//     let output = $('.todo');
//     // dom.html(''); // this will replace what is there in dom
//     output.append(`<li><span class='chat'><input type='checkbox'>${chatItem}</span><button class='edit'>Edit</button></li>`); //this prints out the chat item to the dom
//     chatItem.this.val = ""; // how can I clear the input?
//   });

// $(document).on('click', '.chat', function(){
//   // $(this).fadeOut('slow');
// });


// $(document).on('click', '.edit', function(event){
// let chatItem = $('input').val();
//   currentSelection = event.currentTarget;
//   currentSelection.classList.add("edit");

//   // $(event.currentTarget).text();
//   // chatItem.focus();
// console.log(event);
// });



// });

// jQuery(function($) {

//   // Save the initial values of the inputs as placeholder text
//   $('#theForm input').attr("data-placeholdertext", function() {
//     return this.value;
//   });

//   // Hook up a handler to delete the placeholder text on focus,
//   // and put it back on blur
//   $('#theForm')
//     .delegate('input', 'focus', function() {
//       if (this.value === $(this).attr("data-placeholdertext")) {
//         this.value = '';
//       }
//     })
//     .delegate('input', 'blur', function() {
//       if (this.value.length == 0) {
//         this.value = $(this).attr("data-placeholdertext");
//       }
//     });

// });