/*
 *CLIENT-SIDE JS
 */
 // base API route
 var baseUrl = '/api/snippets';

 // array to hold post data from API
 var allSnippets = [];

 // element to display list of posts
 var $snippetsList = $('#snippets-list');

 // form to create new post
 var $createpost = $('#create-post');

$(document).ready(function() {
  console.log('app.js loaded!');
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

  $snippetsList.on('click', '.deleteBtn', function() {
  console.log('clicked delete button to', 'baseUrl'+$(this).attr('data-id'));
  $.ajax({
    method: 'DELETE',
    url: 'baseUrl'+$(this).attr('data-id'),
    success: deleteSnippetSuccess,
  });
});


});

// this function takes a single snippet and renders it to the page
function renderSnippet(snippet) {
  console.log('rendering snippet', snippet);
  var snippetHtml = $('#snippets-template').html();
  var snippetsTemplate = Handlebars.compile(snippetHtml);
  var html = snippetsTemplate(snippet);
  $('#snippets').prepend(html);
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
  renderSnippet();
}
