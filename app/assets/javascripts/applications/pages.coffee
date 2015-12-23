# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  handleProgress = ->
    current = 0
    list = $('.page-dots')
    dots = $('.page-dots > li')

    interval = setInterval(( ->
      dots.removeClass('current')
      list.children('li').eq(current).addClass("current")
      current = if current == list.children('li').length - 1 then 0 else current + 1
    ), 500)

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
