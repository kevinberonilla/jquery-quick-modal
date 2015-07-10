# jQuery Quick Modal
Easily add customizable, CSS-driven modal windows to your website.

---

#### Requirements
jQuery 1.7.0 or higher

---

#### Installation
Copy the provided CSS and JS files to your site and include them in the `<head>` tag. Be sure to reference the JS after jQuery.
```html
<head>
    <link rel="stylesheet" type="text/css" href="css/quickmodal.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="js/jquery-cheatcode.min.js"></script>
</head>
```

---

#### Create the Markup
```html
<a href="#" class="open-modal" data-modal-id="my-modal">Click here to open a modal window</a>
<div id="my-modal" class="modal">
    <h1>Hello, world!</h1>
    <a href="#" class="close-modal">Close window</a>
</div>
```
**class="open-modal"**  
The class for the element which will trigger a modal window on click; can be changed to a selector of your choice when initialized (does not have CSS styles)

**data-modal-id="my-modal"**  
Specifies the ID of the modal that the link will be bound to; required (throws an error if not present)

**class="modal"**   
The class for the modal window; has CSS styles that can be edited/overridden 

**class="close-modal"**   
The class for the element which will close an opened modal window on click; has CSS styles that can be edited/overridden; can be changed to a selector of your choice when initialized (loses CSS styles when done so)

---

#### Call the Script
```javascript
$(document).ready(function() {
    $('.open-modal').quickModal();
});
```
**$('.open-modal')**  
The jQuery selector object assigned to trigger modal windows on click

---

#### Play with Settings
```javascript
$(document).ready(function() {
    $('.open-modal').quickModal({
        animation: 'fade-zoom',
        speed: 250,
        timing: 'ease',
        closeModalSelector: '.close-modal'
    });
});
```
**animation**  
The type of animation used for opening and closing modal windows; 'fade', 'fade-up', 'fade-right', 'fade-down', 'fade-left', 'fade-zoom' (default), 'fade-zoom-up', 'fade-zoom-right', 'fade-zoom-down', 'fade-zoom-left'

**speed**  
The length of time (in milliseconds) for the animation

**timing**   
The timing function used to animate the modal window; 'linear', 'ease' (default), 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(n, n, n, n)'

**closeModalSelector**   
The jQuery selector assigned to closing modal windows on click

---

#### Trigger Modal Windows Manually
```javascript
$(document).ready(function() {
    $('#first-modal').quickModal('open');
    
    $('#first-modal').quickModal('close');
    
    $('#second-modal').quickModal('open', {
        animation: 'fade-zoom-down',
        speed: 500,
        timing: 'ease-in-out',
        closeModalSelector: '.close-button'
    });
    
    $('#second-modal').quickModal('close', {
        animation: 'fade-left',
        speed: 750,
        timing: 'linear'
    });
});
```
**.quickModal('open')**  
Open the specified modal window with default settings

**.quickModal('close')**  
Close the specified modal window with previously applied settings

**.quickModal('open', {...})**  
Open the specified modal window with the specified settings

**.quickModal('close', {...})**  
Close the specified modal window with the specified settings

---

#### Events
```javascript
$(document).ready(function() {
    $('#my-modal').on('modalopen', myAwesomeFunction);
    
    $('#my-modal').on('modalclose', function() {
        console.log('The modal window has been closed!');
        myAwesomeFunction();
    });
});
```
Each modal triggers two events which you can bind functions to: 'modalopen' and 'modalclose'