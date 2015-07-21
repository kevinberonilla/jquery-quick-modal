/* --------------------------------------------------
jQuery Quick Modal v1.02

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
    
    function checkSettings(modalObj, backgroundObj, settings) {
        modalObj.setSpeed(null);
        modalObj.setTiming(null);
        backgroundObj.setSpeed(null);
        backgroundObj.setTiming(null);
        
        if (settings.speed != 250 || settings.timing != 'ease') { // Set CSS if settings not equal to default
            modalObj.setSpeed(settings.speed);
            modalObj.setTiming(settings.timing);
            backgroundObj.setSpeed(settings.speed);
            backgroundObj.setTiming(settings.timing);
        }
    }
    
    $.fn.quickModal = function(args, options) {
        if (!$('#modal-background').length) $('body').append('<div id="modal-background"></div>'); // Append background; do not append if re-initialized or background already exists
        
        if (args !== null && typeof args === 'string') { // If calling a method
            var settings = $.extend({ // Extend the default settings established below
                    animation: 'fade-zoom',
                    speed: 250,
                    timing: 'ease',
                    closeModalSelector: '.close-modal',
                    enableEsc: true,
                    enableClickAway: true
                }, options),
                bodyTag = $('body'),
                closeModalLink = $(settings.closeModalSelector),
                modalBackground = $('#modal-background'),
                targetModal = this,
                modal = $('.modal');
            
            checkSettings(targetModal, modalBackground, settings);
            
            targetModal.removeClass()
                .addClass('modal')
                .addClass('animation-' + settings.animation);
            
            switch (args) {
                case 'open':
                    modal.hide(); // Hide any currently visible modals
                    $(document).unbind('keyup', keyUpCheck); // Unbind lingering events
                    bodyTag.addClass('disable-scroll');
                    modalBackground.show();
                    targetModal.show();
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        modalBackground.addClass('visible');
                        targetModal.addClass('visible');
                    }, 25);
                    targetModal.trigger('modalopen'); // Trigger custom 'open' event
                    
                    function keyUpCheck(e) {
                        if (e.keyCode == 27 && modal.is(':visible') && settings.enableEsc) { // Esc
                            targetModal.quickModal('close', settings);
                        }
                    }
                    
                    closeModalLink.unbind('click') // Unbind previously bound events to remove lingering settings
                        .click(function(e) { // Bind events based on options
                            e.preventDefault();
                            targetModal.quickModal('close', settings);
                        });
                    
                    $(document).keyup(keyUpCheck);
                    
                    modalBackground.unbind('click'); // Unbind previously bound events to remove lingering settings
                    
                    if (settings.enableClickAway) {
                        modalBackground.click(function() {
                                targetModal.quickModal('close', settings);
                        });
                    }
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
                    
                default:
                    console.error('The method you entered does not exist.');
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