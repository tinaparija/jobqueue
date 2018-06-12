$(document).ready(function(){

  $('.UserForm').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize();
    $.ajax({
        method: 'POST',
        url: '/api',
        data: formData,
        success: onPost,
        error: console.log("there was an error on submission.")
    });
  });

  function onPost(json){
    console.log("you did a thing")
  }

});

