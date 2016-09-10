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
  $('.idea-list').prepend('<div id=' + this.id + ' class="container"><h2 contenteditable=true class="idea-title">' + this.title + '</h2><button class="delete-button"></button><p contenteditable=true class="idea-body">' + this.body + '</p><button class="up-arrow"></button><button class="down-arrow"></button><p class="idea-quality">quality: ' + this.quality + '</p></div>');

};

//function to render ideas in th array
function renderIdeasInArray() {
  ideaList.forEach(function(idea) {

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
$('.idea-list').on('click', '.delete-button', function(){
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
    var idea = findIdea(id);

    if (id === ideaId && quality === 'quality: swill') {
      $(this).siblings().closest('.idea-quality').text('quality: plausible');
      idea.quality = 'plausible';

    } else if (id === ideaId && quality === 'quality: plausible') {
      $(this).siblings().closest('.idea-quality').text('quality: genius');
      idea.quality = 'genius';
    }
    saveIdeaList();
  });

//down arrow click event
$('.idea-list').on('click', '.down-arrow', function(){
  debugger
  var id = parseInt($(this).parent().attr('id'));
  var ideaId = findIdea(id).id;
  var quality = $(this).siblings().closest('.idea-quality').text();
  var idea = findIdea(id);


  if (id === ideaId && quality === 'quality: plausible') {
    $(this).siblings().closest('.idea-quality').text('quality: swill');
    idea.quality = 'swill';

  } else if (id === ideaId && quality === 'quality: genius') {
    $(this).siblings().closest('.idea-quality').text('quality: plausible');
    idea.quality = 'plausible';
  }
  saveIdeaList();
});

//function to return the id of a particular idea in array
  function findIdea(id) {
   return ideaList.find(function(idea) {
      return idea.id === id;
    });
  }

  //function to save idea if user edits title text field
  /*need to take edited html input and pass it into the object property and save to local storage on keyup*/
  $('.idea-list').on('keyup', '.idea-title', function() {

    var id = parseInt($(this).parent().attr('id'));
    var newTitle = $(this).text();
    var idea = findIdea(id);

    idea.title = newTitle;
    saveIdeaList();
  });

  $('.idea-list').on('keyup', '.idea-body', function() {

    var id = parseInt($(this).parent().attr('id'));
    var newBody = $(this).text();
    var idea = findIdea(id);

    idea.body = newBody;
    saveIdeaList();
  });

  //function to disable save button if there's nothing in the text field
$('#save-btn').attr('disabled', true);

$('#title-input').on('keyup', function () {

  if($(this).val().length !== 0){
    $('#save-btn').attr('disabled', false);
  } else $('#save-btn').attr('disabled', true);
});

$('#save-btn').on('click', function() {
  $(this).attr('disabled', true);
});


$('#search-input').on('keyup', function(){
    var filter = $(this).val();
    $('.container').each(function(){
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
      }
    });
});

/*if user types in search field, the list of ideas should be filtered on keyup to display their results. if there is nothing in this text field all of the ideas should still be on the page*/

//function for keyup on search input
// $('#search-input').on('keyup', function() {
//   // var searchInput = $(this).text();
//   var filter = $(this).val();
//   debugger
//   if (filter.length != 0) {
//
//     // filterIdeas();
//     // addIdeaToPage();
//   } else (
//     renderIdeasInArray();
//   )
// });
//
// //function to filter through ideas based on text in search input
// function filterIdeas (ideas) {
//   debugger
//   ideaList = ideaList.filter(function(ideas) {
//     debugger
//     return ideas.text !== $('#search-input').text();
//   });
// }
