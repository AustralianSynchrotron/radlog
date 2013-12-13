$(function() {
  $('.delete-button').click(function(e) {
    $.ajax({
        url: $(this).attr('action')
      , type: 'DELETE'
      , success: function() { location.reload() }
    })
  })
})
