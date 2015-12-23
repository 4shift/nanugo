# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  handleProgress = ->
    $(document)
      .on "ajax:beforeSend", $('a[data-remote=true]'), (e, xhr, settings) ->
        $(".progress-area").removeClass("hidden")
      .on "ajax:complete", (e, xhr, status) ->
        $(".progress-area").addClass("hidden")

    $(document)
      .on "ajax:beforeSend", $('form[data-remote=true]'), (e, xhr, settings) ->
        $(".progress-area").removeClass("hidden")
      .on "ajax:complete", (e, xhr, status) ->
        $(".progress-area").addClass("hidden")

  $(document).on "ready page:load", handleProgress
