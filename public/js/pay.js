$('document').ready(function() {
  
  $('#loginButton, #signupButton').click(function() {
    
    setTimeout(function() {
      
        $(".page-transition").velocity("fadeIn", {
          queue: false
        });
      
    }, 100);
    
    $('.page-transition').velocity({
      scale: "10000%",
      translateZ:0
    }, {duration:500, complete: function() {
      //alert("Tada! That's where you handle this event (login/signup/whatever...), ie. redirect to another page. Reload the page to go back to the main screen!")
    }
       
       })
    
  })
  
  $('#showLogin').click(function() {
    
    $(".signup").velocity({ 
        scale: "65%",
        translateZ:0
    }, { duration: 400, easing: "easeInOutBack", complete: function() {
      
      $(".login").velocity({ 
        scale: "100%",
        translateZ:0
    }, { duration: 400, easing: "easeInOutBack"});
      
      setTimeout(function() {
      
        $(".login").velocity("fadeIn", {
          queue: false,
          duration: 150
        });
      
      }, 150);
        
        
    } });
    
    setTimeout(function() {
      
      $(".signup").velocity("fadeOut", {
        queue: false,
        duration: 150
      });
      
    }, 150);
    
  });
  
  $('#showSignUp').click(function() {
    
    $(".signup").velocity({
        scale: "65%",
        translateZ:0
    });
    
    $(".login").velocity({ 
        scale: "65%",
        translateZ:0
    }, { duration: 400, easing: "easeInOutBack", complete: function() {
      
      $(".signup").velocity({ 
        scale: "100%",
        translateZ:0
    }, { duration: 400, easing: "easeInOutBack"});
      
      setTimeout(function() {
      
        $(".signup").velocity("fadeIn", {
          queue: false,
          duration: 150
        });
      
      }, 150);
        
        
    } });
    
    setTimeout(function() {
      
      $(".login").velocity("fadeOut", {
        queue: false,
        duration: 150
      });
      
    }, 150);
    
  });
  
});