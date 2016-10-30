"use strict";

$(document).ready(function(){
  let chatItem = $('input').val();
  let output = $('.todo');
  let currentSelection = "";

  $('#click-me').on('click', (e)=>{
    $('input').html("");
    let chatItem = $('input').val();
    let output = $('.todo');
    // dom.html(''); // this will replace what is there in dom
    output.append(`<li><span class='chat'><input type='checkbox'>${chatItem}</span><button class='edit'>Edit</button></li>`); //this prints out the chat item to the dom
    chatItem.this.val = ""; // how can I clear the input?
  });

$(document).on('click', '.chat', function(){
  // $(this).fadeOut('slow');
});


$(document).on('click', '.edit', function(event){
let chatItem = $('input').val();
  currentSelection = event.currentTarget;
  currentSelection.classList.add("edit");

  // $(event.currentTarget).text();
  // chatItem.focus();
console.log(event);
});



});

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