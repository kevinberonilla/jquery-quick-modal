/* --------------------------------------------------
jQuery Quick Modal v1.03

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
        if (!$('#modal-background').length) $('body').append('<div id="modal-background"></div>'); // Append background; do not append if background already exists
        
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
                selector = this,
                modal = $('.modal');
            
            checkSettings(selector, modalBackground, settings);
            
            modal.removeClass()
                .addClass('modal')
                .addClass('animation-' + settings.animation);
            
            switch (args) {
                case 'open':
                    function keyUpCheck(e) {
                        if (e.keyCode == 27 && modal.is(':visible') && settings.enableEsc) { // Esc
                            selector.quickModal('close', settings);
                        }
                    }
                    
                    modal.hide(); // Hide any currently visible modals
                    $(document).unbind('keyup', keyUpCheck); // Unbind lingering events
                    bodyTag.addClass('disable-scroll');
                    modalBackground.show();
                    selector.show();
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        modalBackground.addClass('visible');
                        selector.addClass('visible');
                    }, 25);
                    selector.trigger('modalopen'); // Trigger custom 'open' event
                    
                    closeModalLink.unbind('click') // Unbind previously bound events to remove lingering settings
                        .click(function(e) { // Bind events based on options
                            e.preventDefault();
                            selector.quickModal('close', settings);
                        });
                    
                    $(document).keyup(keyUpCheck);
                    
                    modalBackground.unbind('click'); // Unbind previously bound events to remove lingering settings
                    
                    if (settings.enableClickAway) {
                        modalBackground.click(function() {
                            selector.quickModal('close', settings);
                        });
                    }
                    break;
                    
                case 'close':
                    bodyTag.removeClass('disable-scroll');
                    modalBackground.removeClass('visible');
                    selector.removeClass('visible');
                    setTimeout(function() {
                        modalBackground.hide();
                        selector.hide();
                        selector.trigger('modalclose'); // Trigger custom 'close' event
                    }, settings.speed);
                    break;
                    
                case 'trigger':
                    var modalId = selector.data('modal-id'),
                    targetModal = $('#' + modalId);
                    
                    targetModal.quickModal('open', settings);
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
                else targetModal.quickModal('open', args);
            });
        }
        
        return this; // Return the object to enable chaining
    }
}(jQuery));