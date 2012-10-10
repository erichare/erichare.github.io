$(document).ready(function(){

    var speed = 800,   // animation speed
    $wall = $('.projects').find('.projects-content');

    $(window).load(function(){
        $wall.masonry({
        columnWidth: 2, 
        itemSelector: '.project:not(.invis)',
        animate: true,
        animationOptions: {
        duration: speed,
        queue: false
        }
        }); 
    });

    $('#menu-filter a').click(function(){
        var colorClass = '.' + $(this).attr('class');

        if(colorClass=='.all') {
            // show all hidden boxes
            $wall.children('.invis')
            .toggleClass('invis').fadeIn(speed);
        } else {  
            // hide visible boxes 
            $wall.children().not(colorClass).not('.invis')
            .toggleClass('invis').fadeOut(speed);
            // show hidden boxes
            $wall.children(colorClass+'.invis')
            .toggleClass('invis').fadeIn(speed);
        }
        $wall.masonry();
        return false;
    }); 
    
    //Start tweet
    $(".tweet").tweet({
        username: "vasilvalkov",
        count: 1,
        loading_text: "loading tweets..."
    });
    //End tweet
    
    //  Initialize Backgound Stretcher	   

    $("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'facebook',slideshow:3000, autoplay_slideshow: false});
    
    $('.carousel').carousel();
});