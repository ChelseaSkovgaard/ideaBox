/* User enters title and body
user clicks save button
title and body text are an idea that populate list
idea has unique id identifier
idea has a quality that is set to swill
title and body text need to go into local storage
title and body input fields are cleared
page should not reload when input fields are cleared*/

var ideaList = getIdeaList() || [];

function Idea (title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
}

Idea.prototype.renderOnPage = function() {
  $('.ideaList').prepend('<div id=' + this.id + ' class="container"><h2 class="ideaTitle">' + this.title + '</h2><button class="deleteButton">delete</button><p class="ideaBody">' + this.body + '</p><button class="up-arrow">uparrow</button><button class="down-arrow">downarrow</button><p class="idea-quality">swill</p></div>');
};

function renderIdeasInArray() {
  ideaList.forEach(function(idea) {
    var idea = new Idea(idea.title, idea.body, idea.id);
    idea.renderOnPage();
  });
};

//renders ideas in array on page load
renderIdeasInArray();

function addIdeaToPage(ideaTitle, ideaBody) {
  var idea = new Idea(ideaTitle, ideaBody);
  ideaList.push(idea);
  idea.renderOnPage();
};


//function to save item in local storage
function saveIdeaList() {
  localStorage.setItem('ideaKey', JSON.stringify(ideaList));
};

//function to get parsed JSON in local storage
function getIdeaList() {
  return JSON.parse(localStorage.getItem('ideaKey'));
};

function clearInputFields(){
  $('#title-input').val('');
  $('#body-input').val('');
}

//event lister save button
$('#save-btn').on('click', function() {
  var ideaTitle = $('#title-input').val();
  var ideaBody = $('#body-input').val();
  var deleteButton = $('.deleteButton');
  addIdeaToPage(ideaTitle, ideaBody, deleteButton);
  saveIdeaList();
  clearInputFields();
});

//event listener delete button
$('.ideaList').on('click', '.deleteButton', function(){
    var ideaId = $(this).parent().attr('id');
    removeFromStorage(ideaId);
   $(this).parent().remove();
 });

 function removeFromStorage(id) {
   id = parseInt(id);
    ideaList = ideaList.filter(function(i) {
      return i.id !== id;
    });
    saveIdeaList();
 }

 //event listener up button
 $('.ideaList').on('click', '.up-arrow', function(){
   debugger
   if ($(this).parent().idea-quality.text === 'swill') {
     $('.idea-quality').innerText('plausible');
   }
 });
