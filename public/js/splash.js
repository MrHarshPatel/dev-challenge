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
    if($input.startsWith("subscribe ")){
      // Now check if only one command
      var args = $input.split(" ");
      if(args.length > 2){
        // TOO MANY ARGUMENTS
        $terminalOut.append(printCmd($input,null, "Too many arguments. Usage: subscribe [email address]"));
      }
      else{
        //Proper length!
        if(validateEmail(args[1])){
          //THEN WE GOOD so print subscribed
          $.ajax({
            type: "POST",
            url: "/",
            data: JSON.stringify({address: args[1]}),
            dataType: "text",
            contentType: "application/json",
            success: function(response, textStatus, jqXHR){
                $terminalOut.append(printCmd($input, "Successfully subscribed, " + args[1] + "! Check your email", null));
            },
            error: function(jqXhr, textStatus, errorMessage){
              console.log("Error: ", errorMessage);
           }

          }); //Send post request with ajax/jquery
          $terminalOut.append(printCmd($input,null, null));

        }
        else{
          //Not valid email
          $terminalOut.append(printCmd($input,null, null));
          $terminalOut.append(printCmd($input,null, "Email address invalid, please enter a valid email address"));
        }

      }
    }
    else{
      $terminalOut.append(printCmd($input,null, null));
      $terminalOut.append(printCmd($input,null, "Unknown command. Usage: subscribe [email address]"));
    }

    //# Clear Input
    $terminalIn.val("");
    //# Keep focused on input
    return $('.terminal').animate({
      scrollTop: $(".terminal")[0].scrollHeight,
      100: 100 });

  });
  //Email validation simple!
  function validateEmail(email)
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  //# Template for cmd line print
  printCmd = function ($input, message, error) {
    if(error != null){
      //Error message
      return `<div class='cmd-container'>
      <span class="eval"><span>${error}</i></span> </div>`;

    }
    else if(message == null){
      //No error message thus, just return default
      return `<div class='cmd-container'>
      <span class="path"><i class="red">  ~ /
        ❯
        ❯</i>
    </span><span class='eval'>${$input}</span> </div>`;
    }
    else{
      //otherwise only print IN GREEN CAUSE VALID!
      return `<div class='cmd-container'>
      <span class="eval"><span style="color: green">${message}</span></span> </div>`;
    }

  };



  //# Focus to input on window click
  $window.on('click', function (e) {
    return $terminalIn.focus();
  });

})
