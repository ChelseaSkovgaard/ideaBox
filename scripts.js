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
Idea.prototype.renderOnPage = function(title, body, id, quality) {
  $('.idea-list').prepend(`<div id=${this.id} class="container">
  <h2 contenteditable=true class="idea-title">${this.title}</h2>
  <button class="delete-button"></button>
  <p contenteditable=true class="idea-body">${this.body}</p>
  <button class="up-arrow"></button>
  <button class="down-arrow"></button>
  <p class="idea-quality">quality: ${this.quality}</p></div>`);
};

//renders ideas in array on page load
renderIdeasInArray();

//function to create a new idea, push a new idea into the array, and to render the new idea on the page
function addIdeaToPage(title, body, quality) {
  var idea = new Idea(title, body, quality);
  ideaList.push(idea);
  idea.renderOnPage();
}

//function to render ideas in the array
function renderIdeasInArray() {
  ideaList.forEach(function(idea) {
    idea.renderOnPage()
  });
}

//function to save item in local storage
function saveIdeaList() {
  localStorage.setItem('ideaKey', JSON.stringify(ideaList));
}

//function to get parsed JSON saved in local storage
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

//removes item in array from local storage
function removeFromStorage(id) {
  id = parseInt(id);
  ideaList = ideaList.filter(function(i) {
    return i.id !== id;
  });
  saveIdeaList();
}

//event listener save button
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


 //up arrow click event
  $('.idea-list').on('click', '.up-arrow', function() {
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

  //function to save title of idea if user edits title text field
  $('.idea-list').on('keyup', '.idea-title', function() {

    var id = parseInt($(this).parent().attr('id'));
    var newTitle = $(this).text();
    var idea = findIdea(id);

    idea.title = newTitle;
    saveIdeaList();
  });

//function to save body of idea is user edits text field
  $('.idea-list').on('keyup', '.idea-body', function() {

    var id = parseInt($(this).parent().attr('id'));
    var newBody = $(this).text();
    var idea = findIdea(id);

    idea.body = newBody;
    saveIdeaList();
  });

//search input function and keyup event
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
