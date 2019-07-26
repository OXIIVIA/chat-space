$(function() {

  function buildGroup(data)  {
    var group = `<div class="main-content__group">
                  <p class="main-content__group--member">${data.user_name}</p>
                  <p class="main-content__group--date">${data.date}</p>
                </div>`

    return group;
  }

  function buildContent(data) {
    var content =  `<div class="main-content__message">
                      <p class="main-content__message__content">${data.content}</p>
                    </div>`

    return content;
  }

  function buildImage(data) {
    var image =  `<div class="main-content__message">
                    <img class="main-content____message__image" src="${data.image}">
                  </div>`

    return image;
  }
  function buildContentWithImage(data) {
    var controlWithImage =  `<div class="main-content__message">
                              <p class="main-content__message__content">${data.content}</p>
                              <img class="main-content____message__image" src="${data.image}">
                            </div>`

    return controlWithImage;
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
      var group = buildGroup(data);
      var content = buildContent(data);
      var image = buildImage(data);
      var controlWithImage = buildContentWithImage(data);

      $('.main-content').append(group);
      if (data.content && data.image ) {
        $('.main-content').append(controlWithImage);
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