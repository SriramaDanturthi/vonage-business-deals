(function ($) {
  "use strict";
  $(document).ready(function () {
    var king_sticky = true;
    $(window).scroll(function () {
      if ($(window).scrollTop() > 30) {
        $("#scrollup").show();
        if (king_sticky)
          document.mainMenu.addClass("compact");
      } else {
        $("#scrollup").hide();
        if (king_sticky)
          document.mainMenu.removeClass("compact");
      }
    });
    function dynamic_menu() {
      // Returns width of browser viewport
      var ww = $(window).width();
      $('.dropdown-menu .dropdown-submenu').off('mouseover').on('mouseover', function () {
        //get position of current
        var rect = this.getBoundingClientRect();

        if (ww - rect.left - $(this).width() * 2 > 20) {
          $(this).addClass('menu-sub-right');
          $(this).removeClass('menu-sub-left');
        } else {
          $(this).removeClass('menu-sub-right');
          $(this).addClass('menu-sub-left');
        }

      });
    }

    dynamic_menu();


    $(window).on('resize', function () {

      dynamic_menu();

    });

    document.mainMenu = $('body');
    document.mainHeader = $('header.header');
    $(
      '.king-sidebar .widget_categories,.king-sidebar .widget_archive,' +
      '.king-sidebar .widget_pages,.king-sidebar .widget_meta,' +
      '.king-sidebar .widget_recent_entries,' +
      '.king-sidebar .widget_product_categories,' +
      '.king-sidebar .widget_nav_menu').each(function () {

        $(this).find('ul').addClass('arrows_list1');
        $(this).find('li a').prepend('<i class="fa fa-caret-right"></i>');

      });

    $('ul.nav>li.current-menu-item>a').addClass('active');

    $(".custom_width").each(function (index) {
      var cw = $(this).data("width");
      if (cw !== '')
        $(this).closest('.dropdown-menu').css({ width: cw.toString(), left: 'auto' });
    });

    $('#tabs ul.tabs li').on('click', function (e) {
      $('#tabs .tab_container').css({ display: 'none' });
      $($(this).find('a').attr('href')).css({ display: 'block' });
      $('#tabs ul.tabs li.active').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });

    $('#scrollup').on('click', function (e) {
      $('html,body').animate({ 'scroll-top': 0 });
      e.preventDefault();
    });

    $('div.navbar-toggle').on('touchstart click', function (e) {
      var targ = $(this).attr('data-target');

      e.preventDefault();

      if ($(targ).get(0)) {
        if (document.mainMenu.hasClass('slide-menu') && targ != '#bs-example-navbar-collapse-1') {
          var showmenu = $(targ).attr("data_show");
          if (typeof showmenu == 'undefined') {
            showmenu = 0;
          }
          if (showmenu == 0) {
            document.mainMenu.toggleClass("menu-active");
            $(targ).attr("data_show", '1');
          }
          else {
            document.mainMenu.toggleClass("menu-active");

            $(targ).attr("data_show", '0');
          }
        }
        else {
          $(targ).slideToggle();
        }
      }
    });

    if (document.mainMenu.hasClass('slide-menu')) {
      $('#navbar-collapse-1, #bs-onepage-navbar-collapse-1').append('<div class="slide-menu-close fa fa-close"></div>');
      $('.header .menu_main .navbar, .fixednav3 .navbar').append('<div class="overlay_menu"></div>');
      //hide menu
      $('.slide-menu-close, .overlay_menu').on('click', function (e) {
        hideMenu();
      });
    }

    $('a').on('click', function (e) {
      if ($(this).attr('href') == '#') {
        e.preventDefault();
      }
    });

    $('.close-but').on('click', function () {
      $(this).parent().parent().hide('slow', function () { $(this).remove(); });
    });

    $('.video-player .video-close').on('click', function () {
      $(this).parent().find('iframe').remove();
      $(this).parent().animate({ opacity: 0 }, function () { $(this).hide(); });
    });

    $('.king-video-play-wrapper .play-button').on('click', function () {
      var url = $(this).data('video');
      var height = $(this).data('height');
      if (url.indexOf('youtube.com') > -1) {
        var id = url.split('v=')[1].replace('/', '');
        id = 'https://www.youtube.com/embed/' + id + '?autoplay=1&controls=0&showinfo=0';
      } else if (url.indexOf('vimeo.com') > -1) {
        var id = url.split('vimeo.com/')[1].replace('/', '');
        id = 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0';
      }
      var w = $(window).width();
      var h = parseInt(w * 0.5609);
      var mt = -parseInt((h - height) / 2);
      $(this).closest('.king-video-play-wrapper')
        .find('.video-player')
        .append('<iframe style="height:' + h + 'px;width:' + w + 'px;margin-top:' + mt + 'px" src="' + id + '"></iframe')
        .css({ display: 'block', opacity: 0 })
        .animate({ opacity: 1 });
    });

    $('.king-preload').each(function () {

      var rel = $(this).attr('data-option').split('|');

      (function (elm) {
        $.post(site_uri + '/index.php', {
          'control': 'ajax',
          'task': rel[0],
          'id': rel[1],
          'amount': rel[2]
        }, function (result) {

          elm.innerHTML = result;
          $(elm).addClass('animated fadeIn');

        })
      })(this);

    });

    $('.navbar-nav li.yamm-fw a.active').each(function () {
      $(this).closest('li.yamm-fw').find('>a').addClass('active');
    });

    var act = false;
    $('#king-mainmenu>li').each(function () {
      if ($(this).hasClass('current-menu-parent') || $(this).find('>a').hasClass('active')) {
        if (act == false) {
          act = true;
        } else {
          $(this).removeClass('current-menu-parent');
          $(this).find('>a.active').removeClass('active');
        }
      }
    });

    // Menu OnePage
    $('#menu-onepage .navbar-toggle').on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#menu-onepage .navbar-collapse').removeClass('opened').addClass('closed');
      }
      else {
        $(this).addClass('active');
        $('#menu-onepage .navbar-collapse').removeClass('closed').addClass('opened');
      }
      $('#menu-onepage .navbar-collapse').slideToggle();
    });

    $('#menu-onepage a, #navbar-collapse-1 a').on('click', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        var target_path = this.hash.slice(1);

        if (target_path != '') {

          target = target.length ? target : $("[name='" + this.hash.slice(1) + "']");
          if (target.length) {
            $('#menu-onepage li.active, #navbar-collapse-1 li.active ').removeClass('active');
            $(this).parent().addClass('active');
            $('.nav-collapse').attr({ style: '' });

            $('html,body').animate({
              scrollTop: target.offset().top - 80
            }, 1000);

            return false;
          }
        }
      }
    });


    $('#king-mainmenu li a').on('click', function (e) {
      if (!$(this.parentNode).find('ul').get(0) || $('body').width() > 1000) {
        return true;
      }
      if ($(this.parentNode).hasClass('open')) {
        $(this.parentNode).removeClass('open');
        return true;
      } else $(this.parentNode).addClass('open');

      e.preventDefault();

      return false;
    });

    // Modal close
    $('.simplePopupClose,.simplePopupBackground').on('click', function () {
      $('.simplePopupBackground,.simplePopup').animate({ 'opacity': 0 }, function () { $('.simplePopupBackground,.simplePopup').remove(); });
    });

    //enable scroll for map
    $('.fgmapfull').on('click', function () {
      $('.fgmapfull iframe').css("pointer-events", "auto");
    });

    videos_gallery(jQuery);


    $(function () {
      $('#sidebar ul.children').hide();
      $('#sidebar .arrows_list1 > li > a').on('click', function (event) {
        if ($(this).parent().hasClass('page_item_has_children')) {
          event.preventDefault();
          $(this).next('.children').slideToggle("slow");
        }
      });
    });

    $('.retina-support').each(function () {
      $(this).find('img').each(function () {
        if ($(this).attr('width')) {
          $(this).removeAttr('height').attr({ width: ($(this).attr('width') / 2) });
        }
      });
    });

    $('.vps-slides').each(function (index) {
      var options = $(this).data('vps-options');
      var items = $(this).data('vps-items');
      var per = $(this).data('per');
      var cost_txt = '';
      var wrapper_values = $(this).parent().next('.vps_bot_part').children(".vps_display");
      var vps_slider = $(this).slider(options);

      vps_slider.on('change', function () {

        var index = $(this).val();

        $(".cpu .vps_value", $(wrapper_values)).html(items[index - 1].cpu);
        $(".disk_space .vps_value", $(wrapper_values)).html(items[index - 1].disk_space);
        $(".ram .vps_value", $(wrapper_values)).html(items[index - 1].ram);
        $(".bandwidth .vps_value", $(wrapper_values)).html(items[index - 1].bandwidth);
        cost_txt = items[index - 1].cost;
        if (per != '') {
          cost_txt += '<span class="per_text">' + per + '</span>';
        }
        $(".pricing .vps_value", $(wrapper_values)).html(cost_txt);
        $(".pricing a", $(wrapper_values)).attr("href", items[index - 1].link);

      });
    });

    $(".ui-tabs").on("tabscreate", function (event, ui) {
      $('.vps-slides', $(this)).each(function (index) {
        $(this).slider('refresh');
      });
    });

    $(".ui-tabs").on("tabsactivate", function (event, ui) {
      $('.vps-slides', $(this)).each(function (index) {
        $(this).slider('refresh');
      });
    });



  });

})(jQuery);

function hideMenu() {
  var container = jQuery(".navbar-collapse");
  container.attr("data_show", '0');
  jQuery('body').removeClass("menu-active");
}

function timelineLoadmore(index, cat, btn) {

  jQuery(btn).html('<i class="fa fa-spinner fa-spin"></i>').get(0).disabled = true;
  jQuery.post(site_uri + '/wp-admin/admin-ajax.php', {
    'action': 'loadPostsTimeline',
    'index': index,
    'cat': cat,
  }, function (result) {
    jQuery(btn).remove();
    jQuery('#cd-timeline').append(result);
  });
  return false;
}


function videos_gallery($) {

  $('.videos-gallery-list').each(function () {
    $(this).find('iframe').each(function () {
      $(this).parent().find('br').remove();
      var yid = this.src;
      yid = yid.split('embed')[1].replace(/\//g, '');
      $(this).closest('.wpb_text_column').attr({ 'data-yid': yid }).on('click', function () {
        var yid = $(this).attr('data-yid');
        $(this).closest('.wpb_row').find('.videos-gallery-player .wpb_wrapper').html('<iframe src="https://www.youtube.com/embed/' + yid + '?autoplay=1"></iframe>');
      });
      $(this).after('<img src="https://i.ytimg.com/vi/' + yid + '/default.jpg" />').remove();
    });
  });

}


function king_modal_ready() {

  var $ = jQuery;

  $('.simplePopupBackground,.simplePopup').css({ 'display': 'block' }).animate({ 'opacity': 1 });

  var width = $('#pop-modal').width() + 10;
  var height = $('#pop-modal').height() + 10;
  $('#pop-modal').css({ width: width + 'px', marginLeft: -(width / 2) + 'px', marginTop: -(height / 2) + 'px' });
  if ($('#pop-modal').width() > $(window).width() - 100) {
    $('#pop-modal').css({ width: ($(window).width() - 100) + 'px', marginLeft: -(($(window).width() - 100) / 2) + 'px' });
  }

  if ($('#pop-modal').height() > $(window).height() - 100) {
    $('#pop-modal').css({ marginTop: -(($(window).height() - 100) / 2) + 'px' });
  }

  $('html,body').animate({ scrollTop: 0 });

}


function vps_changes() {

}
/******************************************
                         -	PREPARE PLACEHOLDER FOR SLIDER	-
                         ******************************************/

var setREVStartSize = function () {
  try {
    var e = new Object, i = $(window).width(), t = 9999, r = 0, n = 0, l = 0, f = 0, s = 0, h = 0;
    e.c = $('#rev_slider_1_1');
    e.gridwidth = [1354];
    e.gridheight = [560];

    e.sliderLayout = "fullwidth";
    if (e.responsiveLevels && ($.each(e.responsiveLevels, function (e, f) { f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e) }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) { var u = (e.c.width(), $(window).height()); if (void 0 != e.fullScreenOffsetContainer) { var c = e.fullScreenOffsetContainer.split(","); if (c) $.each(c, function (e, i) { u = $(i).length > 0 ? u - $(i).outerHeight(!0) : u }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= $(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0)) } f = u } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight); e.c.closest(".rev_slider_wrapper").css({ height: f })
  } catch (d) { console.log("Failure at Presize of Slider:" + d) }
};


setREVStartSize();
function revslider_showDoubleJqueryError(sliderID) {
  var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
  errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
  errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
  errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
  errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>"
  $(sliderID).show().html(errorMessage);
}
var tpj = $;
var revapi1;
tpj(document).ready(function () {
  if (tpj("#rev_slider_1_1").revolution == undefined) {
    revslider_showDoubleJqueryError("#rev_slider_1_1");
  } else {
    revapi1 = tpj("#rev_slider_1_1").show().revolution({
      sliderType: "standard",
      jsFileLocation: "http://arkahost.com/wp-content/plugins/revslider/public/assets/js/",
      sliderLayout: "fullwidth",
      dottedOverlay: "none",
      delay: 9000,
      navigation: {
        keyboardNavigation: "off",
        keyboard_direction: "horizontal",
        mouseScrollNavigation: "off",
        onHoverStop: "on",
        touch: {
          touchenabled: "on",
          swipe_threshold: 75,
          swipe_min_touches: 1,
          swipe_direction: "horizontal",
          drag_block_vertical: false
        }
        ,
        arrows: {
          style: "uranus",
          enable: true,
          hide_onmobile: true,
          hide_under: 600,
          hide_onleave: true,
          hide_delay: 200,
          hide_delay_mobile: 1200,
          tmp: '',
          left: {
            h_align: "left",
            v_align: "center",
            h_offset: 20,
            v_offset: 0
          },
          right: {
            h_align: "right",
            v_align: "center",
            h_offset: 20,
            v_offset: 0
          }
        }
        ,
        bullets: {
          enable: false,
          hide_onmobile: false,
          style: "hebe",
          hide_onleave: false,
          direction: "horizontal",
          h_align: "center",
          v_align: "bottom",
          h_offset: 0,
          v_offset: 20,
          space: 5,
          tmp: '<span class="tp-bullet-image"></span>'
        }
      },
      gridwidth: 1354,
      gridheight: 560,
      lazyType: "none",
      shadow: 0,
      spinner: "spinner0",
      stopLoop: "off",
      stopAfterLoops: -1,
      stopAtSlide: -1,
      shuffle: "off",
      autoHeight: "off",
      disableProgressBar: "on",
      hideThumbsOnMobile: "off",
      hideSliderAtLimit: 0,
      hideCaptionAtLimit: 0,
      hideAllCaptionAtLilmit: 0,
      debugMode: false,
      fallbacks: {
        simplifyAll: "off",
        nextSlideOnWindowFocus: "off",
        disableFocusListener: false,
      }
    });
  }
});	/*ready*/
