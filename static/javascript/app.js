$( document ).ready(function() {
  animateSlideOutOfBox();
});

function animateSlideOutOfBox() {
  $('#container').animate({ 'margin-top': '-100px' }, 6000);
}

function animateSlideIntoBox() {
  $('#container').animate({ 'margin-top': '550px' }, 3000);
}

function send() {
  $('form').on('submit', function(event) {
    $.ajax({
      data : {
        name : "test",
        message : $('#textarea').val()
      },
      type : 'POST',
      url : '/post'
    })
    .done(function(data) {
      animateSlideIntoBox();
    });

    event.preventDefault();
  });
}
