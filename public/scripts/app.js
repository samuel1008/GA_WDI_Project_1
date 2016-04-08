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

  $('#newBookForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new book serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $(this).serializeArray(),
      success: newBookSuccess,
      error: newBookError
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
