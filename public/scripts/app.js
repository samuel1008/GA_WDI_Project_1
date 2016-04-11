/*
 *CLIENT-SIDE JS
 */
 // base API route
 var baseUrl = '/api/snippets/';

 // array to hold post data from API
 var allSnippets = [];

 // element to display list of posts
 var $snippetsList = $('#snippets-list');

$(document).ready(function() {
  console.log('app.js loaded!');
   var baseUrl = '/api/snippets/';
  $.get(baseUrl).success(function (snippets) {
      snippets.forEach(function(snippet) {
        renderSnippet(snippet);
      });
    });

  $('#newSnippetForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new snippet serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: baseUrl,
      data: $(this).serializeArray(),
      success: newSnippetSuccess,
      error: newSnippetError
    });
  });

  $(".snippets").on('submit', "#deleteSnippetForm", function(e){
    e.preventDefault();
    console.log("this works");
    $.ajax({
      method: 'DELETE',
      url: baseUrl+$(this).attr('data-id'),
      success: deleteSnippetSuccess,
      error: deleteSnippetError
    });
  });

  $(".snippets").on('submit', '#addCommentForm', function(e) {
    e.preventDefault();
    console.log('new comments');
    $.ajax({
      method: 'POST',
      url: baseUrl+$(this).attr('data-id')+'/comments',
      data: $(this).serializeArray(),
      // success: newCommentSuccess,
      // error: newCommentError
    });
  });

  $(".snippets").on('click', ".btn-snippetUpdate", function (e) {
     e.preventDefault();
     $(this).serializeArray();
     var snippetId = $(this).attr('edit-id');
     console.log(snippetId);
     $.ajax({
       method: 'PUT',
       url: baseUrl+$(this).attr('edit-id'),
       data: $(this).serializeArray(),
       success: editSnippetSuccess,
       error: editSnippetError
     });
   });

});

// this function takes a single snippet and renders it to the page
function renderSnippet(snippet) {
  console.log('rendering snippet', snippet);
  $snippetsList.empty();
  var snippetHtml = $('#snippets-template').html();
  var snippetsTemplate = Handlebars.compile(snippetHtml);
  var html = snippetsTemplate(snippet);
  $('.snippets').prepend(html);
  console.log(2);
}

function onSuccess(snippets){
  console.log("YOU DID IT! SUCCESS!");
  console.log(snippets);
  renderSnippet(snippets);
}

function onError(error) {
  console.log("DAMNIT! ERROR!!!");
  console.log(error);
}

function newSnippetSuccess(json) {
  $('#newSnippetForm input').val('');
  renderSnippet(json);
}

function newSnippetError() {
  console.log('newSnippet error!');
}

function editSnippetSuccess(json) {

}

function editSnippetError() {
  console.log('edit error!');
}


function deleteSnippetSuccess(json) {
  var snippet = json;
  console.log(json);
  var snippetId = snippet._id;
  console.log('delete snippet', snippetId);
  // find the snippet with the correct ID and remove it from our allSnippets array
  for(var index = 0; index < allSnippets.length; index++) {
    if(allSnippets[index]._id === snippetId) {
      allSnippets.splice(index, 1);
      break;  // we found our snippet - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  console.log('removing the following album from the page:', snippetId);
  $('div[data-snippet-id=' + snippetId + ']').remove();
}

function deleteSnippetError() {
  console.log('deleteSnippet error!');
}
