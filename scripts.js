/* User enters title and body
user clicks save button
title and body text are an idea that populate list
idea has unique id identifier
idea has a quality that is set to swill
title and body text need to go into local storage
title and body input fields are cleared
page should not reload when input fields are cleared*/

//global array of list ideas
var ideaList = getIdeaList() || [];

//idea object
function Idea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
}


//constructor function to render idea on page with specified object qualities
Idea.prototype.renderOnPage = function() {
  $('.idea-list').prepend('<div id=' + this.id + ' class="container"><h2 class="idea-title">' + this.title + '</h2><button class="delete-button">delete</button><p class="idea-body">' + this.body + '</p><button class="up-arrow">uparrow</button><button class="down-arrow">downarrow</button><p class="idea-quality">' + this.quality + '</p></div>');

};

//function to render ideas in th array
function renderIdeasInArray() {
  ideaList.forEach(function(idea) {
    // var idea = new Idea(idea.title, idea.body, idea.id);
    idea.renderOnPage();
  });
}

//renders ideas in array on page load
renderIdeasInArray();


function addIdeaToPage(ideaTitle, ideaBody, ideaQuality) {
  var idea = new Idea(ideaTitle, ideaBody, ideaQuality);
  ideaList.push(idea);
  idea.renderOnPage();
}

//function to save item in local storage
function saveIdeaList() {
  localStorage.setItem('ideaKey', JSON.stringify(ideaList));
}

//function to get parsed JSON in local storage
function getIdeaList() {
  var objectArray = JSON.parse(localStorage.getItem('ideaKey'));
  if (objectArray) {
    return objectArray.map(function(obj) {
      return new Idea(obj.title, obj.body, obj.id, obj.quality);
    });
  }
}

//function to clear input fields
function clearInputFields(){
  $('#title-input').val('');
  $('#body-input').val('');
}

//event lister save button
$('#save-btn').on('click', function() {
  var ideaTitle = $('#title-input').val();
  var ideaBody = $('#body-input').val();

  addIdeaToPage(ideaTitle, ideaBody);
  saveIdeaList();
  clearInputFields();
});

//event listener delete button
$('.ideaList').on('click', '.delete-button', function(){
    var ideaId = $(this).parent().attr('id');
    removeFromStorage(ideaId);
   $(this).parent().remove();
 });

//removes item in array from local storage
 function removeFromStorage(id) {
   id = parseInt(id);
    ideaList = ideaList.filter(function(i) {
      return i.id !== id;
    });
    saveIdeaList();
 }


 //up arrow click event
  $('.idea-list').on('click', '.up-arrow', function(){
    var id = parseInt($(this).parent().attr('id'));
    var ideaId = findIdea(id).id;
    var quality = $(this).siblings().closest('.idea-quality').text();
    var idea = findIdea(id)

    debugger

    if (id === ideaId && quality === 'swill') {
      $(this).siblings().closest('.idea-quality').text('plausible');
      idea.quality = 'plausible';

    } else if (id === ideaId && quality === 'plausible') {
      $(this).siblings().closest('.idea-quality').text('genius');
      idea.quality = 'genius';
    };
    saveIdeaList();
  });

//down arrow click event
$('.idea-list').on('click', '.down-arrow', function(){
  var id = parseInt($(this).parent().attr('id'));
  var ideaId = findIdea(id).id;
  var quality = $(this).siblings().closest('.idea-quality').text();
  var idea = findIdea(id)


  if (id === ideaId && quality === 'plausible') {
    $(this).siblings().closest('.idea-quality').text('swill');
    idea.quality = 'swill';

  } else if (id === ideaId && quality === 'genius') {
    $(this).siblings().closest('.idea-quality').text('plausible');
    idea.quality = 'plausible';
  };
  saveIdeaList();
});

//function to return the id of a particular idea in array
  function findIdea(id) {
   return ideaList.find(function(idea) {
      return idea.id === id;
    })
  }
