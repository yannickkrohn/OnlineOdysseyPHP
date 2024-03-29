import GameAudio
    from "../../GameAudio";
import Synchronizer
    from "../../Synchronizer";
require('jquery');
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

$.fn.autoTab = function() {

   var autoTabOn = true; // yes, it's global. If you turn off auto tabbing on one input, you turn it off for all
    var autoTabbedInputs = this.find('input');
    var almostTabbedInputs = autoTabbedInputs.not(':last-child'); // note we don't attach tabbing event to the last of an input group. If you tab out of there, you have a reason to
    var justAutoTabbed = false;
    var tabKeyDetected = false;
    var revTabKeyDetected = false;
    var inputField = false;

    // init
    var init = function() {
        detectKeyDown();
        detectKeyUp();
    }

    // keydown detection, hijack it if it's in the fields we're looking for
    var detectKeyDown = function() {
        autoTabbedInputs.on('keydown',function(ev){
            // the field that you're in when you keydown might not be the field you're in when you keyup
            inputField = this;
            // detect keystroke in the fields
            ev = ev || event;
            var charCode = null;
            if ("which" in ev)
                charCode = ev.which;
            else if ("keyCode" in e)
                charCode = ev.keyCode;
            else if ("keyCode" in window.event)
                charCode = window.event.keyCode;
            else if ("which" in window.event)
                charCode = window.event.which;
            // if tabbing forward
            if (charCode === 9 && !ev.shiftKey) {
                // if auto tabbing is off, don't change it's behavior
                if (!autoTabOn) {
                    return;
                }
                if (justAutoTabbed) {
                    ev.preventDefault();
                    notifyAutoTabbingOff();
                    autoTabOn = false;
                    if ($('#autotab-toggle').length > 0) { // only used if toggle is present
                        $('#autotab-toggle').removeClass('on');
                    }
                }
                tabKeyDetected = true;
                // if tabbing backward
            } else if (charCode === 9 && ev.shiftKey) {
                revTabKeyDetected = true;
                // backspace key fakes reverse tab
            } else if (charCode === 8 && this.value.length == 0) {
                revTabKeyDetected = true;
                $(this).prev("input,select,textarea,a").focus();
                // fake tab keystrokes
            } else if (
                charCode === 191                  // "/" - for dates
                ||
                charCode === 111                  // "/" - for dates (numberpad)
                ||
                charCode === 190                  // "." - for IP addresses
                ||
                charCode === 110                  // "." - for IP addresses (numberpad)
                ||
                charCode === 189                  // "-" - for sortcodes
                ||
                charCode === 109                  // "-" - for sortcodes (numberpad)
            ) {
                ev.preventDefault();
                // if we've not yet hit the max chars for this field, and haven't already just auto-tabbed, fake a tab key
                if (!hasHitMaxChars(this) && !justAutoTabbed) {
                    $(this).next("input,select,textarea,a").focus();
                }
            }
            // removed any flag to say we've just auto-tabbed
            justAutoTabbed = false;
        });
    }

    // entering text into auto-tabbed fields
    var detectKeyUp = function() {
        almostTabbedInputs.on('keyup',function(ev){
            // if auto tabbing is off, bug out now
            if (!autoTabOn) {
                return;
            }
            // if the complimentary keydown was a tab key, ignore this event (and reset it for the next keyup)
            if (tabKeyDetected) {
                tabKeyDetected = false;
                return;
            }
            // if we were tabbing backwards, don't jump forwards again!
            if (revTabKeyDetected) {
                revTabKeyDetected = false;
                return;
            }
            // edge case: if you've tabbed from one input group to another, the inputField that was used in keyDown hasn't yet been set
            if (!inputField) {
                return;
            }
            // removed flag to say we've just auto-tabbed
            justAutoTabbed = false;
            // else auto-tab if the field is full
            if (hasHitMaxChars(inputField)) {
                $(inputField).next().focus();
                // we've just auto-tabbed - flag it
                justAutoTabbed = true;
            }
        })
    }

    // detect if a field has hit max chars
    var hasHitMaxChars = function(el) {
        var elObj = $(el);
        var maxFieldLength = elObj.attr('maxlength') || elObj.attr('size');
        var valueLength = el.value.length;
        if (valueLength>=maxFieldLength) {
            return true;
        }
        return false;
    }

    // notify user that autotabbing is off (a popover that fades after 8secs)
    var notifyAutoTabbingOff = function() {
        // already a popover? bug out now.
        if ($('.popover').hasClass('on')) {
            return;
        }
        // last input
        var lastInput = autoTabbedInputs.last();
        // position/size of last input
        var popY = lastInput.offset().top
            + (
                lastInput.height()
                + parseInt(lastInput.css('border-width'))
                + parseInt(lastInput.css('padding-top'))
                + parseInt(lastInput.css('padding-bottom'))
            )/2
            - 20;
        var popX = lastInput.offset().left
            + lastInput.width()
            + parseInt(lastInput.css('border-width'))
            + parseInt(lastInput.css('padding-left'))
            + parseInt(lastInput.css('padding-right'))
            + 15;
        // create the pop-over (opacity 0 by default)
        $('body').append('<div class="popover" style="top:' + popY + 'px;left:' + popX + 'px">It looks like you prefer the tab key! We\'ve turned auto-tabbing off for you.</div>');
        // fade up, wait, remove pop-over
        setTimeout(function(){
            $('.popover').addClass('on')
            setTimeout(function(){
                removePopOver();
            },8000);
        },0);
        // remove pop-over on click
        $('body').on('click','.popover',function(){
            removePopOver();
        })
    }
    // turn pop-over off
    var removePopOver = function(){
        $('.popover').removeClass('on')
        setTimeout(function(){
            $('.popover').remove;
        },500);
    }

    // init function!
    init();

}


class PortScanner {


    static instance;

    constructor() {
        if (!PortScanner.instance) {
            PortScanner.instance = this;
        }

        return PortScanner.instance;
    }

    init(){

        $('#ip-input').autoTab();
        var self = this;


        this.synchronizer = new Synchronizer();

        // Initialize draggable connectors
        $(".connectors .connector").draggable({
            revert: "invalid",
            helper: "clone",
            start: function(event, ui) {
                $(this).hide(); // Hide the original element while it's being dragged
            },
            stop: function(event, ui) {
                $(this).show(); // Show the original element when dragging stops
            }
        });

        // Initialize droppable slots
        $(".connector-dropable-slot").droppable({
            accept: ".connector",
            drop: function(event, ui) {
                // Check if there's already a connector in the slot
                const $slot = $(this);
                const $existingConnector = $slot.find(".connector");
                if ($existingConnector.length) {
                    // If there is, revert the dragged connector back to its original position
                    ui.draggable.draggable("option", "revert", true);
                    return;
                }

                // Otherwise, move the dragged connector into the slot
                ui.draggable.appendTo($slot);
            }
        });

        // Initialize droppable slots
        $(".connectors").droppable({
            accept: ".connector",
            drop: function(event, ui) {
                // Check if there's already a connector in the slot
                const $slot = $(this);
                ui.draggable.appendTo($slot);
            }
        });

        // Initialize draggable connectors inside droppable slots
        $(".connector-dropable-slot .connector").draggable({
            containment: "parent",
            revert: "invalid",
            start: function(event, ui) {
                $(this).hide(); // Hide the original element while it's being dragged
            },
            stop: function(event, ui) {
                $(this).show(); // Show the original element when dragging stops
                if (!ui.helper.data("dropped")) {
                    $(this).appendTo(".connectors");
                }
            }
        });


        $('.connect').click(function(event) {
            event.preventDefault();
            var ip_address = $('#ip-input input').map(function() {
                return $(this).val();
            }).get().join('.');
            self.synchronizer.socket.emit('validatePortScanner', {"ip": ip_address});

            console.log(ip_address);
        });
        self.synchronizer.socket.on('loginIncorrect', () => {
            $(".login-error").fadeIn();
        });
    }
}

export default PortScanner;

