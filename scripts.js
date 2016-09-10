/* User enters title and body
user clicks save button
title and body text are an idea that populate list
idea has unique id identifier
idea has a quality that is set to swill
title and body text need to go into local storage
title and body input fields are cleared
page should not reload when input fields are cleared*/

var ideaList = getIdeaList() || [];

function Idea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
}

Idea.prototype.renderOnPage = function() {
  $('.ideaList').prepend('<div id=' + this.id + ' class="container"><h2 class="idea-title">' + this.title + '</h2><button class="delete-button"></button><p class="idea-body">' + this.body + '</p><button class="up-arrow">uparrow</button><button class="down-arrow">downarrow</button><p class="idea-quality">' + 'quality:' + this.quality + '</p></div>');

};

function renderIdeasInArray() {
  ideaList.forEach(function(idea) {
    // var idea = new Idea(idea.title, idea.body, idea.id);
    idea.renderOnPage();
  });
}

renderIdeasInArray();
//renders ideas in array on page load

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


 //up arrow event listener
  $('.ideaList').on('click', '.up-arrow', function(){
    debugger
    var id = parseInt($(this).parent().attr('id'));
    var ideaId = ideaList[0].id;
    var ideaQuality = ideaList[0];
    var idea = findIdea(id);
    debugger
    //  ideaList.find(id).levelUp();
    if (id === ideaId && ideaQuality.quality === 'swill') {
      arrayQuality.quality = 'plausible';

    };
    saveIdeaList();
  });

  function findIdea(id) {
   return ideaList.find(function(idea) {
      return idea.id === id;
    })
  }
