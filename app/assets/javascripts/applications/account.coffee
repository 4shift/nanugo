$ ->
  handleLogin = ->
    $(".js-modal-signup").on "click", (e) ->
      e.preventDefault()

      $("#login-modal").modal("toggle")
      $("#signup-modal").modal("toggle")

    $(".js-modal-signin").on "click", (e) ->
      e.preventDefault()

      $("#signup-modal").modal("toggle")
      $("#login-modal").modal("toggle")

    $(".js-modal-confirmation").on "click", (e) ->
      e.preventDefault()

      $("#signup-modal").modal("toggle")
      $("#confirmation-modal").modal("toggle")

    $(".js-modal-signup-at-confirmation").on "click", (e) ->
      e.preventDefault()

      $("#confirmation-modal").modal("toggle")
      $("#signup-modal").modal("toggle")

    $(".js-modal-signin-at-confirmation").on "click", (e) ->
      e.preventDefault()

      $("#confirmation-modal").modal("toggle")
      $("#login-modal").modal("toggle")

    $(document)
      .on "ajax:success", "#login-box", (e, data, status, xhr) ->
        window.location.reload()
      .on "ajax:error", "#login-box", (e, xhr, status, error) ->
        $("#login #js-error-messages").text(xhr.responseText)

    $(document)
      .on "submit", "#signup-box", (e) ->
        $("#signup #js-error-messages").text("이메일을 전송 중입니다. 잠시만 기다려 주세요.")
      .on "ajax:success", "#signup-box", (e, data, status, xhr) ->
        $("#signup #js-error-messages").text("나누고 인증메일이 전송되었습니다. 이메일을 확인해 주세요.")
      .on "ajax:error", "#signup-box", (e, xhr, status, error) ->
        $("#signup #js-error-messages").text(xhr.responseText)

    $(document)
      .on "submit", "#confirmation-box", (e) ->
        $("#confirmation #js-error-messages").text("인증메일 전송 중입니다. 잠시만 기다려 주세요.")
      .on "ajax:success", "#confirmation-box", (e, data, status, xhr) ->
        $("#confirmation #js-error-messages").text("나누고 인증메일이 전송되었습니다. 이메일을 확인해 주세요.")
      .on "ajax:error", "#confirmation-box", (e, xhr, status, error) ->
        $("#confirmation #js-error-messages").text(xhr.responseText)

  $(document).on "ready page:load", handleLogin
