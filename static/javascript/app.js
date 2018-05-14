$( document ).ready(function() {
  //setupPrompt();
  animateSlideOutOfBox();
});

function setupPrompt() {
  // randomly pick a prompt
  var totalNumPrompt = 2;

  // Rothko
  var promptMap = {
    0: "<p>What does Mark Rothko's <i>No. 14</i> bring to your mind? </p>",
  };

  // Poncet
  var promptMap = {
    0: "<p>What do you see in Antoine Poncet's <i>Retrofutee</i>?</p>",
    1: "<p>What aspect of Antoine Poncet's <i>Retrofutee</i> do you find to be the most remarkable?</p>"
  };

  // Mitchell
  var promptMap = {
    0: "<p>What aspect of Joan Mitchell's <i>Before, Again IV</i> (1985) do you find to be the most remarkable? </br> How would you interpret this title? </p>"
  };

  window.promptid = Math.floor(Math.random() * totalNumPrompt);
  var div = document.createElement("div");
  div.innerHTML = promptMap[window.promptid];
  document.getElementById("prompt").append(div);
}

function animateSlideOutOfBox() {
  document.getElementById("date").textContent = getCurrentDate();
  document.getElementById("time").textContent = getCurrentTime();
  $('#container').animate({ 'margin-top': '200px' }, 6000);
}

function animateSlideIntoBox() {
  $('#container').animate({ 'margin-top': '730px' }, 3000);
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
      message : $('#textarea').val(),
      promptid: window.promptid
    },
    type : 'POST',
    url : '/post'
  }).done(function(data) {
    animateSlideIntoBox();
    setTimeout(() => {
      $("#textarea").val('');
      animateSlideOutOfBox();
    }, 20000);
  });
}
