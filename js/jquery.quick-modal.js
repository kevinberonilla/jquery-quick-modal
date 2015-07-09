/* --------------------------------------------------
jQuery Quick Modal v0.50

By Kevin Beronilla
http://www.kevinberonilla.com

Fork on GitHub
https://github.com/kevinberonilla/jquery-quick-modal

Free to use under the MIT license
http://www.opensource.org/licenses/mit-license.php
-------------------------------------------------- */
(function($) { // Protect the $ alias (IIF)
    $.fn.setSpeed = function(speed) {
        this.css('-webkit-transition-duration', speed + 'ms')
            .css('-moz-transition-duration', speed + 'ms')
            .css('-ms-transition-duration', speed + 'ms')
            .css('-o-transition-duration', speed + 'ms')
            .css('transition-duration', speed + 'ms');
    }
    
    $.fn.setTiming = function(timing) {
        this.css('-webkit-transition-timing-function', timing)
            .css('-moz-transition-timing-function', timing)
            .css('-ms-transition-timing-function', timing)
            .css('-o-transition-timing-function', timing)
            .css('transition-timing-function', timing);
    }
    
    $.fn.quickModal = function(args, options) {
        if (!$('#modal-background').length) $('body').append('<div id="modal-background"></div>'); // Append background; do not append if re-initialized or background already exists
        
        if (args !== null && typeof args === 'string') { // If calling a method
            var settings = $.extend({ // Extend the default settings established below
                    animation: 'fade-zoom',
                    speed: 250,
                    timing: 'ease',
                    closeModalSelector: '.close-modal'
                }, options),
                bodyTag = $('body'),
                closeModalLink = $('.close-modal'),
                modalBackground = $('#modal-background'),
                targetModal = this,
                modal = $('.modal');
            
            targetModal.removeClass()
                .addClass('modal')
                .addClass('animation-' + settings.animation);
            
            if (settings.speed != 250) { // Set speeds if not equal to default
                targetModal.setSpeed(settings.speed);
                modalBackground.setSpeed(settings.speed);
            }
            
            if (settings.timing != 'ease') { // Set timing if not equal to default
                targetModal.setTiming(settings.timing);
                modalBackground.setTiming(settings.timing);
            }
            
            switch (args) {
                case 'open':
                    bodyTag.addClass('disable-scroll');
                    modalBackground.show();
                    targetModal.show();
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        modalBackground.addClass('visible');
                        targetModal.addClass('visible');
                    }, 25);
                    targetModal.trigger('modalopen'); // Trigger custom 'open' event
                    
                    closeModalLink.unbind('click') // Unbind previously bound links to prevent closing unopened modal
                        .click(function(e) { // Bind events based on options
                            e.preventDefault();
                            targetModal.quickModal('close', settings);
                        });
                    
                    $(document).keyup(function(e) {
                        if (e.keyCode == 27 && modal.is(':visible')) modal.quickModal('close', settings); // Esc
                    });
                    
                    modalBackground.click(function() {
                        modal.quickModal('close', settings);
                    });
                    break;
                    
                case 'close':
                    if (targetModal.is(':visible')) {
                        bodyTag.removeClass('disable-scroll');
                        modalBackground.removeClass('visible');
                        targetModal.removeClass('visible');
                        setTimeout(function() {
                            modalBackground.hide();
                            targetModal.hide();
                            targetModal.trigger('modalclose'); // Trigger custom 'close' event
                        }, settings.speed);
                    } else {
                        console.error('Target modal is not currently visible.');
                    }
                    break;
            }
        } else { // If initializing plugin with options
            var openModalLink = this;
            
            openModalLink.click(function(e) {
                e.preventDefault();
                
                var modalId = $(this).data('modal-id'),
                    targetModal = $('#' + modalId);
                
                if (modalId === undefined) console.error('No "data-modal-id" attribute is set.');
                
                targetModal.quickModal('open', args);
            });
        }
        
        return this; // Return the object to enable chaining
    }
}(jQuery));