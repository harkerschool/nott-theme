(function($) {

    $(document).ready( function() {

        $('body').hkrAwesomeBar({
            grayscale: true,
            templateURL: '//www.harker.org/uploaded/plugins/awesome-bar/awesome-bar.tpl.html'
        });

        $('.track-link').click( function() {
            trackOutboundLink( this, 'Harker Gala CTAs', 'Click', $(this).text() );
            return false;
        });

        // auction items
        var $auctionItems = $('.auction-item');

        $auctionItems.each( function() {
            var $item = $(this);

            // wrap item's content
            $item.children().wrapAll('<div class="window" />');

            // append read more link
            $('.window', $item).append('<p><a href="#" class="read-more">Show more <i class="fa fa-chevron-circle-down"></i></a></p>');
        });

        $(document).on('click', '.auction-item .read-more', function(e) {
            e.preventDefault();
            var $link = $(this),
                $itemWindow = $link.closest('.window');

            $itemWindow.toggleClass('active');
            if ( $itemWindow.hasClass('active') ) {
                if ( $itemWindow.height() === 250 ) {
                    $link.fadeOut();
                } else {
                    $link.html('Show less <i class="fa fa-chevron-circle-up"></i>');
                }
            } else {
                $link.html('Show more <i class="fa fa-chevron-circle-down"></i>');

                var $item = $itemWindow.parent(),
                    $document = $(document);

                if ( $document.scrollTop() > $item.offset().top ) {
                    $document.scrollTop( $item.offset().top );
                }
            }
        });

    });

})(jQuery);

// ga functions
function trackEvent(category, action, label) {
    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
}

function trackOutboundLink(link, category, action, label) { 
    label = label || action; // label is optional

    try { 
        _gaq.push(['_trackPageview', label]); 
    } catch(err){}

    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
     
    setTimeout(function() {
        document.location.href = link.href;
    }, 200);
}

function trackOutboundEvent(link, category, action, label) {
    label = label || link.href; // label is optional

    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
     
    setTimeout(function() {
        document.location.href = link.href;
    }, 100);
}


