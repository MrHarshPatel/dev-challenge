$(document).ready(function(){
  VANTA.BIRDS({
    el: "#main",
    backgroundColor: 0xf7f7f7,
    color1: 0xf09690,
    color2: 0xe61c0e,
    colorMode: "lerpGradient",
    quantity: 4.0,
    backgroundAlpha: 0
  })
  var $terminalIn, $terminalOut, $window, printCmd;

  $terminalIn = $('.terminal-input input');

  $terminalOut = $('.terminal-output');

  $window = $('.window');

  $('form').on('submit', function (e) {
    var $input;
    e.preventDefault();
    //# Get Input
    $input = $terminalIn.val();
    //# Display Output
    $terminalOut.append(printCmd($input));
    //# Clear Input
    $terminalIn.val("");
    //# Keep focused on input
    return $('.terminal').animate({
      scrollTop: $(".terminal")[0].scrollHeight,
      100: 100 });

  });

  //# Template for cmd line print
  printCmd = function ($input) {
    return `<div class='cmd-container'> <span class='path'> <i class='blue'>~ / </i> <i class='red'>❯</i> <i class='yellow'>❯</i> <i class='green'>❯</i> </span> <span class='eval'>${$input}</span> </div>`;
  };

  //# Focus to input on window click
  $window.on('click', function (e) {
    return $terminalIn.focus();
  });

})
