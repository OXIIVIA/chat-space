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

  function getHeight() {
    var element = document.getElementById("main-content")
    var height = element.scrollHeight;
    return height;
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
    .done(function(data) {
      var content = buildContent(data);
      var image = buildImage(data);
      var contentWithImage = buildContentWithImage(data);
      if (data.content && data.image ) {
        $('.main-content').append(contentWithImage);
      } else if (data.content) {
        $('.main-content').append(content);
      } else {
        $('.main-content').append(image);
      }
      var height = getHeight();
      $('.main-content').animate({scrollTop: height}, 0);
      $('.form__box--message').val('');
      clearImage();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージを入力してください');
      $('.form__submit').prop('disabled', false);
    })
  });
});