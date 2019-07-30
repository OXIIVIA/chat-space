$(document).on('turbolinks:load', function() {

  function buildContent(data) {
    var content =  `<div class="main-content__message" data-id="${data.id}" id="message">
                      <div class="main-content__message__group">
                        <p class="main-content__message__group--member">${data.user_name}</p>
                        <p class="main-content__message__group--date">${data.date}</p>
                      </div>
                      <p class="main-content__message__content">${data.content}</p>
                    </div>`
    return content;
  }

  function buildImage(data) {
    var image =  `<div class="main-content__message" data-id="${data.id}" id="message">
                    <div class="main-content__message__group">
                      <p class="main-content__message__group--member">${data.user_name}</p>
                      <p class="main-content__message__group--date">${data.date}</p>
                    </div>
                    <img class="main-content____message__image" src="${data.image}">
                  </div>`
    return image;
  }

  function buildContentWithImage(data) {
    var contentWithImage =  `<div class="main-content__message" data-id="${data.id}" id="message">
                              <div class="main-content__message__group">
                                <p class="main-content__message__group--member">${data.user_name}</p>
                                <p class="main-content__message__group--date">${data.date}</p>
                              </div>
                              <p class="main-content__message__content">${data.content}</p>
                              <img class="main-content____message__image" src="${data.image}">
                            </div>`
    return contentWithImage;
  }

  function appendMessages(messages) {
    var content = buildContent(messages);
    var image = buildImage(messages);
    var contentWithImage = buildContentWithImage(messages);
    if (messages.content && messages.image ) {
      $('.main-content').append(contentWithImage);
    } else if (messages.content) {
      $('.main-content').append(content);
    } else {
      $('.main-content').append(image);
    }

    var element = document.getElementById("main-content")
    var height = element.scrollHeight;
    $('.main-content').animate({scrollTop: height}, 0);
  }

  function clearImage() {
    var element = document.getElementById("message_image")
    element.value = "";
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
    .done(function(messages) {
      appendMessages(messages);
      $('.form__box--message').val('');
      clearImage();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージを入力してください');
      $('.form__submit').prop('disabled', false);
    })
  });


  var reloadMessages = function () {
    last_message_id = $('.main-content__message').last().attr('data-id');
    current_page = window.location.href
    url = current_page.replace('messages', 'api/messages')
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      group_id = $('#main-content').attr('data-group-id');
      $.each(messages, function(i, message) {
        if (group_id == message.group_id)
        appendMessages(message);
      });
      
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  };
  setInterval(reloadMessages, 5000);
});