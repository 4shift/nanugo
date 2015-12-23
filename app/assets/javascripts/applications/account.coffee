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

    $("#login-box")
      .on "ajax:success", (e, data, status, xhr) ->
        window.location.reload()
      .on "ajax:error", (e, xhr, status, error) ->
        $("#js-error-messages").empty()
        error_message = switch
          when xhr.status == 401 then "Invalid email or password"
          else "There are service errors. please, retry later."
        $("#js-error-messages").append("<p>" + error_message + "</p>")

    $("#signup-box")
      .on "ajax:success", (e, data, status, xhr) ->
        window.location.reload()
      .on "ajax:error", (e, xhr, status, error) ->
        $("#js-error-messages").empty()
        error_message = switch
          when xhr.status == 401 then "Invalid email or password"
          else "There are service errors. please, retry later."
        $("#js-error-messages").append("<p>" + error_message + "</p>")

  $(document).on "ready page:load", handleLogin
