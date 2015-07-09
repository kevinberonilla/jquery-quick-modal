/* --------------------------------------------------
jQuery Quick Modal v0.04

By Kevin Beronilla
http://www.kevinberonilla.com

Fork on GitHub
https://github.com/kevinberonilla/jquery-quick-modal

Free to use under the MIT license
http://www.opensource.org/licenses/mit-license.php
-------------------------------------------------- */
(function($) { // Protect the $ alias (IIF)
    $.fn.quickModal = function(args) {
        if (!$('#modal-background').length) $('body').append('<div id="modal-background"></div>'); // Append background; do not append if re-initialized or background already exists
        
        if (args !== null && typeof args === 'string') { // Calling method
            var bodyTag = $('body'),
                closeModalLink = $('.close-modal'),
                modalBackground = $('#modal-background');
            
            switch (args) {
                case 'open':
                    bodyTag.addClass('disable-scroll');
                    modalBackground.show();
                    this.show();
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        modalBackground.addClass('visible');
                        $(this).addClass('visible');
                    }, 25);
                    break;
                    
                case 'close':
                    bodyTag.removeClass('disable-scroll');
                    modalBackground.removeClass('visible');
                    this.removeClass('visible');
                    setTimeout(function() {
                        modalBackground.hide();
                        this.hide();
                    }, 250);
                    break;
            }
        } else { // Initializing plugin with options
            var settings = $.extend({ // Extend the default settings established below
                    modalWindowClass: '.modal',
                    closeModalClass: '.close-modal'
                    
                    // ADD CALLBACK OPTIONS
                
                
                }, args),
                bodyTag = $('body'),
                openModalLink = this,
                modalWindow = $(settings.modalWindowClass),
                closeModalLink = $(settings.closeModalClass),
                modalBackground = $('#modal-background');
            
            function closeModal() {
                bodyTag.removeClass('disable-scroll');
                modalBackground.removeClass('visible');
                modalWindow.removeClass('visible');
                setTimeout(function() {
                    modalBackground.hide();
                    modalWindow.hide();
                }, 250);
            }
            
            openModalLink.click(function(e) {
                e.preventDefault();
                
                var modalId = $(this).data('modal-id'),
                    targetModal = $('#' + modalId);
                
                if (modalId === undefined) console.error('No "data-modal-id" attribute is set.');
                
                bodyTag.addClass('disable-scroll');
                modalBackground.show();
                targetModal.show();
                setTimeout(function() { // Ensure elements are displayed before adding classes
                    modalBackground.addClass('visible');
                    $('#' + modalId).addClass('visible');
                }, 25);
            });
            
            closeModalLink.click(function(e) {
                e.preventDefault();
                closeModal();
            });
            
            $(document).keyup(function(e) {
                if (e.keyCode == 27) closeModal(); // Esc
            });
            
            modalBackground.click(closeModal);
        }
        
        return this; // Return the object to enable chaining
    }
}(jQuery));