# This is a manifest file that'll be compiled into including all the files listed below.
# Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
# be included in the compiled file accessible from http://example.com/assets/application.js
# It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
# the compiled file.
#
#= require jquery
#= require jquery_ujs
#= require jquery.remotipart
#= require bootstrap-sprockets
#= require_tree ./lib
#= require_tree ./applications

$ ->

  validateFiles = (inputFile) ->
    maxExceededMessage = '선택한 파일은 최대 2MB를 넘을 수 없습니다.'
    extErrorMessage = '.jpg, .jpeg, .gif 또는 .png 파일만 허용됩니다.'
    allowedExtension = [
      'jpg'
      'jpeg'
      'gif'
      'png'
    ]
    extName = undefined
    maxFileSize = $(inputFile).data('max-file-size')
    sizeExceeded = false
    extError = false
    $.each inputFile.files, ->
      if @size and maxFileSize and @size > parseInt(maxFileSize)
        sizeExceeded = true
      extName = @name.split('.').pop()
      if $.inArray(extName, allowedExtension) == -1
        extError = true
      return
    if sizeExceeded
      window.alert maxExceededMessage
      $(inputFile).val ''
    if extError
      window.alert extErrorMessage
      $(inputFile).val ''
    return
