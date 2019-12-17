$(document).ready(function() {
    // Window Scroll Vars
    var flag = true;
    var $scrollPage = $(window).outerHeight();
    var $animateSpeed = 800;
    var $currentSlide = $(".section.active");
    var $wrapper = $(".wrapper");
    var $wrapperTop = parseInt($wrapper.css("top"));
    var responsiveBreakpoint = 767;

    //Prevent Page Reload on all # links
    $("a[href='#']").click(function(e) {
      e.preventDefault();
    });

    // Window Scroll effect
    $(window).resize(function(event) {
      if ($(window).outerWidth() > responsiveBreakpoint) {
        $(".section").css({
          "min-height": $(window).outerHeight()
        });
        $scrollPage = $(window).outerHeight();
        $wrapper.css({
          top: -($(".section.active").index() * $scrollPage)
        });
      }
    }).trigger("resize");

    // Window Scroll NextSlide
    function nextSlide() {
      $currentSlide.removeClass('active').next(".section").addClass('active');
      $wrapper.animate({
        top: $wrapperTop - $scrollPage
      }, $animateSpeed);
      setTimeout(function() {
        $(".dots").find("li").removeClass('active');
        $(".dots").find("li").eq($currentSlide.index() + 1).addClass('active');
      }, $animateSpeed / 2);
    };

    // Window Scroll PrevSlide
    function prevSlide() {
      $currentSlide.removeClass('active').prev(".section").addClass('active');
      $wrapper.animate({
        top: $wrapperTop + $scrollPage
      }, $animateSpeed);
      setTimeout(function() {
        $(".dots").find("li").removeClass('active');
        $(".dots").find("li").eq($currentSlide.index() - 1).addClass('active');
      }, $animateSpeed / 2);
    };

    // Window Scroll Vars Update
    function flagAndVarUpdate() {
      $currentSlide = $(".section.active");
      $wrapperTop = parseInt($wrapper.css("top"));
      setTimeout(function() {
        flag = true;
      }, $animateSpeed * 1.1);
    }

    $(window).on('mousewheel', function(e) {
      if ($(window).innerWidth() > responsiveBreakpoint) {
            //e.preventDefault();
            if (flag) {
              flag = false;
              flagAndVarUpdate();
              if (e.deltaY < 0) {
                if ($currentSlide.next(".section").length)
                  nextSlide();
              } else {
                if ($currentSlide.prev(".section").length)
                  prevSlide();
              }
            };
          }
        });

    $(".arrow-down").click(function(e) {
      if ($(window).innerWidth() > responsiveBreakpoint) {
            //e.preventDefault();
            flag = false;
            flagAndVarUpdate();
            nextSlide();
          }
        });

    // Add dots
    for (i = 1; i <= $(".wrapper").find(".section").length; i++) {
      $(".dots").append('<li data-slide=' + i + '><span></span></li>');
    }
    $(".dots").find("li").eq($currentSlide.index()).addClass('active');

    $(".dots li span").click(function(e) {
      e.preventDefault();
      var $this = $(this).closest('li');
      flag = false;
      $wrapper.animate({
        top: -$scrollPage * $this.index()
      }, $animateSpeed);
      setTimeout(function() {
        $this.addClass('active').siblings(".active").removeClass('active');
        $(".wrapper .section").removeClass('active');
        $(".wrapper .section").eq($this.index()).addClass('active');
      }, $animateSpeed / 2);
      flagAndVarUpdate();
    });
  });