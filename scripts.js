/* User enters title and body
user clicks save button
title and body text are an idea that populate list
idea has unique id identifier
idea has a quality that is set to swill
title and body text need to go into local storage
title and body input fields are cleared
page should not reload when input fields are cleared*/


function addIdeaToPage(ideaTitle, ideaBody) {
  $('.ideaList').append ('<div class="container"><li class="ideaTitle">' + ideaTitle + '</li><li class ="ideaBody">' + ideaBody + '</div>');
};

//event lister save button
$('#save-btn').on('click', function() {
  var ideaTitle = $('#title-input').val();
  var ideaBody = $('#body-input').val();
  addIdeaToPage(ideaTitle, ideaBody);
});
