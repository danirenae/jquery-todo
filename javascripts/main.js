"use strict";

  let apiKeys = {};

  function putTodoInDOM (){
    FbAPI.getTodos(apiKeys).then(function(items){
    console.log("items from FB", items);
    $('#completed-tasks').html("");
    $('#incomplete-tasks').html("");
    items.forEach(function(item){
      if(item.isCompleted === true){
      let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='</li>';
      //apend to list
      $('#completed-tasks').append(newListItem);
      } else {
         let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox">';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+='<button class="btn btn-default col-xs-6 edit">Edit</button>';
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
      putTodoInDOM();
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