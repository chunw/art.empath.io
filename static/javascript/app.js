$( document ).ready(function() {
  animateSlideOutOfBox();
});

function animateSlideOutOfBox() {
  // init pos: 527px
  document.getElementById("date").textContent = getCurrentDate();
  document.getElementById("time").textContent = getCurrentTime();
  $('#container').animate({ 'margin-top': '-100px' }, 6000);
}

function animateSlideIntoBox() {
  $('#container').animate({ 'margin-top': '550px' }, 3000);
}

function getCurrentDate() {
  return moment().format('MMMM Do YYYY');
}

function getCurrentTime() {
  return moment().format('h:mm A');
}

function send() {
  $('form').on('submit', function(event) {
    event.preventDefault();
  });
  $.ajax({
    data : {
      date : getCurrentDate(),
      time : getCurrentTime(),
      datetime : Date.now(),
      name : "Someone",
      message : $('#textarea').val()
    },
    type : 'POST',
    url : '/post'
  }).done(function(data) {
    animateSlideIntoBox();
    setTimeout(() => {
      $("#textarea").val('');
      animateSlideOutOfBox();
    }, 10000);
  });
}
