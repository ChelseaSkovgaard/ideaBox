/* User enters title and body
user clicks save button
title and body text are an idea that populate list
idea has unique id identifier
idea has a quality that is set to swill
title and body text need to go into local storage
title and body input fields are cleared
page should not reload when input fields are cleared*/


//function to stringify


function addIdeaToPage(ideaTitle, ideaBody) {
  var ideaVariable = ('<div id=' + Date.now() + ' class="container"><h2 class="ideaTitle">' + ideaTitle + '</h2><button>delete</button><p class ="ideaBody">' + ideaBody + '</p><button>uparrow</button><button>downarrow</button><p class="ideaQuality">swill</p></div>');

  $('.ideaList').prepend (ideaVariable);

  JSON.stringify(ideaVariable);
  // var stringifiedIdea = JSON.stringify(ideaVariable);
  localStorage.setItem('ideaKey', ideaVariable);
};

// $("#idea-list").load(function() {
//   var object = localStorage.getItem('ideaKey')
//   JSON.parse(object);
//   localStorage.getItem('ideaKey');
});

// JSON.parse(localStorage.getItem('ideaKey'));

function clearInputFields(){
  $('#title-input').val('');
  $('#body-input').val('');
}

//event lister save button
$('#save-btn').on('click', function() {
  var ideaTitle = $('#title-input').val();
  var ideaBody = $('#body-input').val();
  addIdeaToPage(ideaTitle, ideaBody);
  clearInputFields();
});
