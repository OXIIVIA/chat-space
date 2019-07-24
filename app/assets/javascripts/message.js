$(function() {
  function buildHTML(data)  {
    var html = `<div class="main-content__group">
                  <p class="main-content__group--member">${data.user_name}</p>
                  <p class="main-content__group--date">${data.date}</p>
                </div>
                <p class="main-content__text">${data.content}</p>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data)
      $('.main-content').append(html)
      $('.form__box--message').val('')
    })
    .fail(function() {


    })
  });
});