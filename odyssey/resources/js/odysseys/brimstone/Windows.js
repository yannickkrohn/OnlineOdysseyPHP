require('jquery');
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';

class Windows {
    constructor() {
        this.h = $(window).height();
        this.w = $(window).width();
        this.p = $(".window").position();
        this.isMaximized = false;
        this.windowOpen = true;
        this.minusOpen = false;


        var elements = $(".desktop-window");

        // Bind the focus and click events to the elements
        elements.on("focus click mousedown", function() {
            // Set the z-index of the focussed or clicked element to 41
            $(this).css("z-index", 41);

            // Set the z-index of all other elements to 40
            elements.not(this).css("z-index", 40);
        });

        $(window).resize(() => {
            this.h = $(window).height();
            this.w = $(window).width();
        });

        $("#max").click(() => {
            if (!this.isMaximized) {
                $(".window").animate({
                    width: this.w + "px",
                    height: this.h + "px",
                    top: "0px",
                    left: "0px"
                });
                this.isMaximized = true;
            } else {
                $(".window").animate({
                    width: "450px",
                    height: "250px",
                    top: this.p.top + "px",
                    left: this.p.left + "px"
                });
                this.isMaximized = false;
            }
        });

        $(".close").click(function(){
            console.log($(this));
                $("#"+$(this).parents(".window").attr("data-window")).removeClass("active");
                $(this).parents(".window").hide();
        });

        $("#minus").click(() => {
            if (this.minusOpen) {
                $(".window").hide();
                $("#chrome").removeClass("active");
            }
        });

        $(".task").click(function(){
            $(this).addClass("active");
            var window =  $(".window[data-window='"+$(this).attr('id')+"']");

                window.show();
        });

        $(".file-viewer.image").click(function(){
            $(this).addClass("active");
            console.log($(this).attr("data-file"));
            var window =  $('.window[data-window="image"]');
            window.find(".image-view").attr("src", $(this).attr("data-file"));
                window.show();
            $("#image").addClass("active");
            setTimeout(function (){
                $('.window[data-window="image"] .actions-top-bar').click();
            }, 100);

        });

        $('.window').draggable({
            handle: '.top-bar',
            containment: ".desktop",
            drag: () => {
                this.p = $(".window").position();
            }
        });

        $("#go").click(() => {
            $("iframe").attr('src', $("#url").val());
            $('iframe').on('load', () => {
                $("#title").text($("#url").val());
            });
            return false;
        });
    }
}

export default Windows;

