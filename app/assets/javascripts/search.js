$(function() {
  var resultList = $('#user-search-result');
  var memberList = $('#chat-group-users');

  function appendUser(user) {
    var userHTML = `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                    </div>`

    resultList.append(userHTML);
  }

  

  function appendErrorMessage(message) {
    var messageHTML = `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${message}</p>
                      </div>`
    resultList.append(messageHTML);

  }

  function appendMember(id, name) {

    var memberHTML = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                        <input name='group[user_ids][]' type='hidden' value='${id}'>
                        <p class='chat-group-user__name'>${name}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                      </div>`

    memberList.append(memberHTML);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      resultList.empty();
      if (input.length !== 0) {
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          })
        } else {
          appendErrorMessage("一致するユーザーが見つかりません");
        }
      }
    })
    .fail(function() {
      alert('ユーザーの検索に失敗しました')
    })
  })

  resultList.on('click', '.chat-group-user__btn--add', function(){
    var addMemberId = $(this).attr('data-user-id');
    var addMembername = $(this).attr('data-user-name')
    appendMember(addMemberId, addMembername);
    $(this).parent().remove();
  });

  memberList.on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  })
  
});

