(function() {
  $('form#login-box').bind('ajax:success', function(e, data, status, xhr) {
    alert('success');
    console.log('success');
  }).bind('ajax:error', function(e, xhr, status, error) {
    alert('error');
    console.log('error');
  });
})();
