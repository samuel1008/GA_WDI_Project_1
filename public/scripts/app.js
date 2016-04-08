/*
 *CLIENT-SIDE JS
 */
$(document).ready(function() {
  console.log('app.js loaded!');
  $.ajax({
      method: "GET",
      url: "api/snippets",
      success: onSuccess,
      error: onError
  });

  $('#newSnippetForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new snippet serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/snippets',
      data: $(this).serializeArray(),
      success: newSnippetSuccess,
      error: newSnippetError
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
