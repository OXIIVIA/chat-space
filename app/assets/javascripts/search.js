$(function() {
  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(data) {
      console.log("やったで");
    })
    .fail(function(data) {
      console.log("だめだで");
    })
  })
});