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
    $('#jobID').html(json._id); 
    $('#jobData').html(json.jobHTML);
    $.ajax({
        method: 'PUT',
        url:`/api/${json._id}`,
        success: onPut,
        error: console.log("there was an error on updating.")
    });
  }

  function onPut(json){
    $('#jobData').html(json.jobHTML)
  }
});

