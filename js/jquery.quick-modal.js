/* --------------------------------------------------
jQuery Quick Modal v1.08

By Kevin Beronilla
http://www.kevinberonilla.com

Fork on GitHub
https://github.com/kevinberonilla/jquery-quick-modal

Free to use under the MIT license
http://www.opensource.org/licenses/mit-license.php
-------------------------------------------------- */
(function($) { // Protect the $ alias (IIF)
    $.fn.setSpeed = function(speed) {
        return this.css({
            '-webkit-transition-duration': speed + 'ms',
            '-moz-transition-duration': speed + 'ms',
            '-ms-transition-duration': speed + 'ms',
            '-o-transition-duration': speed + 'ms',
            'transition-duration': speed + 'ms'
        });
    }
    
    $.fn.setTiming = function(timing) {
        return this.css({
            '-webkit-transition-timing-function': timing,
            '-moz-transition-timing-function': timing,
            '-ms-transition-timing-function': timing,
            '-o-transition-timing-function': timing,
            'transition-timing-function': timing
        });
    }
    
    function checkSettings(modalObj, backgroundObj, settings) {
        modalObj.setSpeed(null)
            .setTiming(null);
        backgroundObj.setSpeed(null)
            .setTiming(null);
        
        if (settings.speed != 250 || settings.timing != 'ease') { // Set CSS if settings not equal to default
            modalObj.setSpeed(settings.speed)
                .setTiming(settings.timing);
            backgroundObj.setSpeed(settings.speed)
                .setTiming(settings.timing);
        }
    }
    
    $.fn.quickModal = function(args, options) {
        if (args !== null && typeof args === 'string') { // If calling a method
            var settings = $.extend({ // Extend the default settings established below
                    animation: 'fade-zoom',
                    speed: 250,
                    timing: 'ease',
                    closeModalSelector: '.close-modal',
                    enableEsc: true,
                    enableClickAway: true,
                    enableBodyScroll: false,
                    appendBackgroundTo: 'body',
                    onOpen: function() {},
                    onClose: function() {}
                }, options),
                bodyTag = $('body'),
                closeModalLink = $(settings.closeModalSelector),
                modal = $('.modal'),
                self = this;
            
            function keyUpCheck(e) {
                if (e.keyCode == 27 && modal.is(':visible') && settings.enableEsc) closeModal(); // Esc key events based on options
            }
            
            function closeModal() {
                self.quickModal('close', settings);
                bodyTag.unbind('keyup', keyUpCheck);
                closeModalLink.unbind('click');
                $('#modal-background').unbind('click');
            }
            
            if (!$('#modal-background').length) $(settings.appendBackgroundTo).append('<div id="modal-background"></div>'); // Append background; do not append if background already exists
            
            checkSettings(self, $('#modal-background'), settings);
            modal.removeClass()
                .addClass('modal')
                .addClass('animation-' + settings.animation);
            
            switch (args) {
                case 'open':
                    if (!settings.enableBodyScroll) bodyTag.addClass('disable-scroll');
                    
                    modal.hide(); // Hide any currently visible modals
                    self.show();
                    bodyTag.keyup(keyUpCheck);
                    $('#modal-background').show();
                    
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        if (settings.enableClickAway) $('#modal-background').click(closeModal);
                        $('#modal-background').addClass('visible');
                        self.addClass('visible');
                        self.trigger('modalopen'); // Trigger custom 'open' event
                        settings.onOpen.call(); // Open callback
                    }, 25);
                    
                    closeModalLink.click(function(e) { // Bind events based on options
                        e.preventDefault();
                        closeModal();
                    });
                    
                    break;
                    
                case 'close':
                    bodyTag.removeClass('disable-scroll');
                    $('#modal-background').removeClass('visible');
                    self.removeClass('visible');
                    settings.onClose.call(); // Close callback
                    
                    setTimeout(function() {
                        $('#modal-background').hide();
                        self.hide();
                        self.trigger('modalclose'); // Trigger custom 'close' event
                    }, settings.speed);
                    
                    break;
                    
                case 'trigger':
                    var modalId = self.data('modal-id'),
                    targetModal = $('#' + modalId);
                    
                    targetModal.quickModal('open', settings);
                    
                    break;
                    
                default:
                    console.error('The method you entered does not exist.');
            }
        } else { // If initializing plugin with options
            var self = this;
            
            self.click(function(e) {
                e.preventDefault();
                
                var modalId = $(this).data('modal-id'),
                    targetModal = $('#' + modalId);
                
                if (modalId === undefined) console.error('No "data-modal-id" attribute has been set.');
                else targetModal.quickModal('open', args);
            });
        }
        
        return this; // Return the object to enable chaining
    }
}(jQuery));