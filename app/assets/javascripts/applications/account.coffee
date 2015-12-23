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

    $(document)
      .on "ajax:success", $("#login-box"), (e, data, status, xhr) ->
        window.location.reload()
      .on "ajax:error", (e, xhr, status, error) ->
        $("#js-error-messages").empty()
        error_message = switch
          when xhr.status == 401 then "Invalid email or password"
          else "There are service errors. please, retry later."
        $("#js-error-messages").append("<p>" + error_message + "</p>")

    $(document)
      .on "ajax:success", $("#signup-box"), (e, data, status, xhr) ->
        alert('aldjflkjdf')
        window.location.reload()
      .on "ajax:error", (e, xhr, status, error) ->
        $("#js-error-messages").empty()
        error_message = switch
          when xhr.status == 401 then "Invalid email or password"
          else "There are service errors. please, retry later."
        $("#js-error-messages").append("<p>" + error_message + "</p>")

  $(document).on "ready page:load", handleLogin
