"use strict";

$(document).ready(function(){
  $('#click-me').on('click', ()=>{
    $('input').html("");
    let chatItem = $('input').val();
    console.log("heyyyy", chatItem);
    let output = $('.todo');
    // dom.html(''); // this will replace what is there in dom
    output.append(`<span class='out'>${chatItem}</span> <button class='edit'>Edit</button>`); //this prints out the chat item to the dom

  });

$(document).on('click', 'span', function(){
  // $(this).fadeOut('slow');
});

$(document).on('click', '.edit', function(event){
  $(event.target).text();
console.log(event);
});


});


// let removeItem = $(event.target)


// $('output').click(function() {
//   $('output').remove();
// });


// function handler( event ) {
//   var target = $( event.target );
//   if ( target.is( "li" ) ) {
//     target.children().toggle();
//   }
// }
// $( "ul" ).click( handler ).find( "ul" ).hide();



    // $('click-me').button('reset');
    // console.log("this is resetting")

// var userInput = document.getElementById("user-input");
// var editInput = document.getElementById("edit-input");
// var messageContainer = document.getElementById("entered-messages");
// var clearMessages = document.getElementById("clear-messages");
// var messages = document.getElementsByClassName("messages");
// var userDiv = document.getElementById("choose-user").children;
// var current_time = new moment().format("LT");
// var user = "";

// document.querySelector("body").addEventListener("click", function(e) {
//   if (e.target.id === "delete-button") {
//     var elementToDelete = e.target.parentNode;
//     Chatty.removeFromDOM(elementToDelete);
//     var idToDelete = e.target.parentNode.id;

//     Chatty.removeFromArray(idToDelete);
//   }
//   if (e.target.id === "clear-messages") {
//     var allDivs = messageContainer.children;
//     if (allDivs.length != 0){
//       Chatty.removeAllFromArray(allDivs);
//       messageContainer.innerHTML = "";
//       clearMessages.setAttribute("disabled", true);
//     }
//   }
//   if (e.target.id === "edit-button") {
//     var targetMessage = e.target;
//     var elementToEdit = e.target.parentNode;
//     var timeEdit = elementToEdit.children[1];
//     var userEdit = elementToEdit.children[2];
//     console.log(userEdit);
//     editButton(targetMessage, timeEdit, userEdit);
//     userInput.classList.add("hidden");
//     editInput.classList.remove("hidden");
//   }
//   if (e.target.type === "radio") {
//     userInput.focus();
//   }
// });