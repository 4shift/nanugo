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


    # $("#login-box")
    #   .on "ajax:success", (e, data, status, xhr) ->
    #     window.location.reload()
    #   .on "ajax:error", (e, xhr, status, error) ->
    #     $("#login #js-error-messages").empty()
    #     error_message = switch
    #       when xhr.status == 401 then "이메일이나 비밀번호가 올바르지 않습니다."
    #       else "서비스에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
    #     $("#js-error-messages").append(error_message)

    $(document)
      .on "submit", "#login-box", (e) ->
        ("#login #js-error-messages").text("로그인 중입니다. 잠시만 기다려 주세요.")
      .on "ajax:success", "#login-box", (e, data, status, xhr) ->
        window.location.reload()
      .on "ajax:error", "#login-box", (e, xhr, status, error) ->
        error_message = switch
          when xhr.status == 401 then "이메일이나 비밀번호가 올바르지 않습니다."
          else "서비스에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        $("#login #js-error-messages").text(error_message)

    $(document)
      .on "submit", "#signup-box", (e) ->
        $("#signup #js-error-messages").text("이메일 전송 중입니다. 잠시만 기다려 주세요.")
      .on "ajax:success", "#signup-box", (e, data, status, xhr) ->
        $("#signup #js-error-messages").text("나누고 인증메일이 전송되었습니다. 이메일을 확인해 주세요.")
      .on "ajax:error", "#signup-box", (e, xhr, status, error) ->
        $("#signup #js-error-messages").html("이메일 정보가 올바르지 않거나 이미 가입된 사용자입니다. <br /> 인증메일을 다시 받고 싶다면 <a href='/confirmations/new'>여기</a>를 눌러 주세요.")

    #
    # $("#signup-box")
    #   .on "ajax:beforeSend", (e, xhr, settings) ->
    #     $("#signup #js-error-messages").append("이메일 전송 중입니다. 잠시만 기다려 주세요.")
    #   .on "ajax:success", (e, data, status, xhr) ->
    #     $("#signup #js-error-messages").append("나누고 인증메일이 전송되었습니다. 이메일을 확인해 주세요.")
    #   .on "ajax:error", (e, xhr, status, error) ->
    #     $("#signup #js-error-messages").append("#{xhr.error}")
    #     # $("#js-error-messages").append("인증메일이 전송되지 못했습니다. 정상적인 이메일을 입력해 주세요.")


  $(document).on "ready page:load", handleLogin
