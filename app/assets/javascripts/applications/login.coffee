$ ->
  $(document)
    .on "ajax:success", $("#login-box"), (e, data, status, xhr) ->
      $("#login-modal").modal('toggle')
    .on "ajax:error", (e, xhr, status, error) ->
      alert(error)
