$(document).ready(function () {
    stripe.setPublishableKey(${'meta(name="stripe-key")'}).attr('content')
});
    
    // watch for a form submission:
    
    $("#form-submit-btn").click(function(event){
       event.preventDefault(); 
       $('input(type=submit)').prop('disabled', true);
       
       var error = false;
       
       var ccNum = $('#card_number').val(),
            cvcNum = $('.card-cvc').val(),
            expMonth = $('.card-expiry-month').val(),
            expYear = $('.card-expiry-year').val();
            
            if (!error) {
                // Get the Stripe token:
                Stripe.card.createToken({
                    number: ccNum,
                    cvc: cvcNum,
                    exp_month: expMonth,
                    exp_year: expYear
                }, stripeResponseHandler);
             }
        return false;     
    }); // form submission
    
    function stripeResponseHandler(status, response) {
        //Get reference to the form
        var f = $("#new_user");
        
        // Get the token from the response:
        var token = response.id;
        
        // Add the token to the form:
        f.append('<input type="hidden" name="user(stripe_card_token)" value="' + token + '" />');
        
        //Submit the form
        f.get(0).submit();
    }
});    
