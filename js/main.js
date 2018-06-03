var GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyDOtBrAgfz68KEzcoArjq5MK9mNh6Uq1V8'

$(document).ready(function(){
  setDifferentCtaForAdwordsUsers();
  getVisitorCountry(setDifferentCtaForDifferentCountry, function(){$(".telegram-bottom").addClass("telegram-loaded");});

  // color switch for nav
   var scroll_start = 0;
   var startchange = $('#startchange');
   var offset = startchange.offset();
    if (startchange.length){
     $(document).scroll(function() {

        scroll_start = $(this).scrollTop();
        if(scroll_start > offset.top) {
            $(".navbar-fixed-top").addClass('user-scroll');
            $(".index3").addClass('makeFix');
            // $(".telegram-bottom").addClass('nospan');
         } else {
            $(".navbar-fixed-top").removeClass('user-scroll');
            $(".index3").removeClass('makeFix');
            // $(".telegram-bottom").removeClass('nospan');
         }
     });
    }

    $("#transaction_id").val(getParameterByName("transaction_id"));

    // iOS cursor fix
    // Detect ios 11_x_x affected
    // NEED TO BE UPDATED if new versions are affected
    var ua = navigator.userAgent,
    iOS = /iPad|iPhone|iPod/.test(ua),
    iOS11 = /OS 11_0|OS 11_1|OS 11_2/.test(ua);

    // ios 11 bug caret position
    if ( iOS && iOS11 ) {

        // Add CSS class to body
        $("body").addClass("iosBugFixCaret");

    }

    // open dropdown on hover
    $('ul.nav li.dropdown').hover(function() {
      $(this).addClass("open");
    }, function() {
      $(this).removeClass("open");
    });

    //Fundraising remove blur
    $('.not-from-us a.viewTokenInfo').on('click',function (e) {
        e.preventDefault();
        $(".blur-funds").removeClass("add-blur");
        $(".not-from-us").addClass("hide");
    });
    // full height hero
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var navbar = $(".navbar").height();
    $('.hero .hero-inner').height(windowHeight - navbar);
    $('.hero').css('padding-top', navbar + 'px');

    if (windowWidth < 767) {
      $('.screen1').height(windowHeight - navbar);
    }
    // var heroIcoLeft = $('.hero.hero-ico .container > .row > div.col-md-7');
    // var heroIcoRight = $('.hero.hero-ico .container > .row > div.col-md-5');
    // if (windowWidth < 767) {
    //   heroIcoLeft.css("padding-top", (windowHeight - heroIcoLeft.height() + 54)/3 + 54 "px");
    //   heroIcoLeft.css("padding-bottom", (windowHeight - heroIcoLeft.height())/3 + "px");
    //   heroIcoLeft.find(".airpad").css("height", (windowHeight - heroIcoLeft.height())/10 + "px");
    // }
    // heroIcoRight.css("padding-top", (windowHeight - heroIcoLeft.height())/2 + "px");
    // heroIcoRight.css("padding-bottom", (windowHeight - heroIcoLeft.height())/2 + "px");
    // $('.hero .hero-inner').height(windowHeight + windowHeight*0.18);
    // alert(windowWidth);
    // alert(windowHeight);
    $(window).on('resize',function() {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var navbar = $(".navbar").height();
      $('.hero .hero-inner').height(windowHeight - navbar);
      $('.hero').css('padding-top', navbar + 'px');
      if (windowWidth < 767) {
        $('.screen1').height(windowHeight - navbar);
      }
    });

    // modal vertical align
    $('.team-modal,.alliance-modal-small').on('shown.bs.modal', function (e) {
      // alert("Modal for " + $(this).attr('id') + " is open.")
      var windowHeight = $(window).height();
      var modalHeight = $(this).find('.modal-content').height();
      var modalTopPadding = (windowHeight - modalHeight)/2 - 30;
      // var modalTopPadding = (windowHeight + windowHeight*0.18 - modalHeight)/2 - 30;
      $('.modal-dialog').css('margin-top', modalTopPadding +'px');
    });

    //thank you modal
    var url = window.location.href;
    $('#modalThankYou,#modalThankYouKYC,#modalKYCStatus').on('hidden.bs.modal', function (e) {
      document.location.href="/";
    });
    if(url.indexOf('?thank=you') != -1) {
      $('#modalThankYou').modal('show');
    }
    if(url.indexOf('?kyc=thankyou') != -1) {
        $('#modalThankYouKYC').modal('show');
        ga('send', 'event', 'KYC', 'completed', 'KYC Process Completed');
    }
    if(url.indexOf('?kyc=status') != -1) {
        $('#modalKYCStatus').modal('show');
    }

    var target = window.location.hash;
    if(target == "#tokensale"){
       $('.fundraising-goals').addClass("offsetMe");
    }

    // scroll nav
    $(".nav").find("a.scroll-link").click(function(e) {
      e.preventDefault();
      $('.navbar-collapse').removeClass('in');
      $('.navbar-toggle').addClass('collapsed');
      var offset = $('.navbar').height();
      // offset = offset + offset*0.15;
      var section = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(section).offset().top - offset
      }, 700);
    });

    $("a[href=#dav-team]").click(function(e) {
      e.preventDefault();
      var offset = $('.navbar').height();
      // offset = offset + offset*0.15;
      var section = "#team";
      $("html, body").animate({
        scrollTop: $(section).offset().top - offset
      }, 700);
    });

    $("a[href=#tokensale]").click(function(e) {
      e.preventDefault();
      var offset = $('.navbar').height();
      // offset = offset + offset*0.15;
      var section = "#tokensale";
      $("html, body").animate({
        scrollTop: $(section).offset().top - offset
      }, 700);
    });

    //daily video
    var channelID = 'UCPuAOygDwCiLOdLosiQJJ1w';
    $.get(
      "https://www.googleapis.com/youtube/v3/channels",{
        part: 'contentDetails',
        id: channelID,
        key: 'AIzaSyDFsWKhs1WKWskhk6DErKtNCy-TR57EPbM'
      },function(data){
        $.each(data.items,function(i, item){
          // console.log(item);
          pid = item.contentDetails.relatedPlaylists.uploads;
          pid = "PLpqJF_iMOExdrA0eJjhIk1Ies4jqAXawD";
          // pid = "PLpqJF_iMOExd-la7-aIFbcOd1WN4RwzWU";
          getVids(pid);
        });
      }
    );

    function getVids(pid){
      $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",{
        part: 'snippet',
        maxResults: 1,
        playlistId: pid,
        key: 'AIzaSyDFsWKhs1WKWskhk6DErKtNCy-TR57EPbM'
      },function(data){
        var output;
        $.each(data.items,function(i, item){
          // console.log(item);
          // videoTitle = item.snippet.title;
          videoId = item.snippet.resourceId.videoId;
          // thumbnail = item.snippet.thumbnails.medium.url;
          // channelTitle = item.snippet.channelTitle;
          // output = '<div><div><a href="#" class="thumb-link" id="' + videoId + '"><img src="' + thumbnail + '"><br> <h5>' + videoTitle + '</h5></a></div></div>';
          output = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
          //Append videos to carousel
            $('#daily-video').append(output);
        })
      }
    );
    }


    $("#contactForm").validate({
          // ignore: ":hidden",
          rules: {
              Name: {
                  required: true,
                  minlength: 3
              },
              Company: {
                  required: true,
                  minlength: 3
              },
              Email: {
                required: true,
                email: true
              }//,
              // message: {
              //     required: true,
              //     minlength: 10
              // }
          },
          messages: {
              Name: "Please specify your name",
              Company: "Please specify your company",
              Email: {
                required: "Invalid email",
                email: "Invalid email"
              }
            },
          submitHandler: function (form) {
              $.ajax({
                  type: "POST",
                  url: "https://formspree.io/alick@dav.network",
                  data: $(form).serialize(),
                  dataType: "json",
                  success: function () {
                      // $(form).html("<div id='message'></div>");
                      // $('#messageBox')
                      //     .fadeIn(1500, function () {
                      //     $('#messageBox').append("<h4>Your message was sent!</h4>");
                      // });
                      $("#modalMessage").modal('hide');
                      $(form)[0].reset();
                      $("#modalThankYouAlliance").modal('show');
                  }
              });
              return false; // required to block normal submit since you used ajax
          }
      });

  // show more media press
  $("a.show-more").click(function(e) {
      e.preventDefault();
      $(".hidden-press").fadeToggle();
      var word = $(this).find("span");
      if( word.text() == 'more'){
        word.text("less");
      }else{
        word.text("more");
      }
  });

  $("a.show-articles").click(function(e) {
      e.preventDefault();
      $(".hidden-articles").fadeToggle();
      var word = $(this).find("span");
      if( word.text() == 'more'){
        word.text("less");
      }else{
        word.text("more");
      }
  });

  // alert announcement

    $('#alert-announcement').on('closed.bs.alert', function () {
        setCookie('alert-dav-missioncontrol', true, 365);
       $('.telegram-bottom').removeClass("extra-space");
        return false;
    })

    function getCookie(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    if (getCookie('alert-dav-missioncontrol') === "true") {
       $('#alert-announcement').hide();
       $('.telegram-bottom').removeClass("extra-space");
    }

    //KYC status check
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    $('#checkKYC').on('click',function (e) {
      ga('send', 'event', 'KYC', 'status checked', 'Check KYC Status');
      e.preventDefault();
        var email = $("#kycmail").val();
        if(validateEmail(email)){
          email=encodeURIComponent(email);
          var url = "https://nessie.dav.network/status?email=" + email;
          // alert("KYC check click " + email);
          $(".kyc-loader").removeClass('hide');
          $(".kyc-error").hide();
          $.ajax({
              type: 'GET',
              url: url,
              dataType: 'json',
              success: function (data) {
                $(".kyc-loader").addClass('hide');
                $("#kyc-form").hide();
                // $(".kyc-response").text(data.suggestionText);
                var title = '';
                switch(data.statusText) {
                    case "AutoFinish":
                    case "ManualFinish":
                        title = "Congratulations!";
                        $(".kyc-response").text("You’re now officially in whitelist A! We’ll share specific instructions on how to participate as we get closer to our token sale.");
                        $(".kyc-close,.kyc-telegram").removeClass('hide');
                        break;
                    case "Failed":
                    case "CheckRequired":
                        title = "Your KYC application is currently being processed.";
                        $(".kyc-response").text("You’ll receive an email once your application has been processed with next steps.");
                        $(".kyc-close,.kyc-telegram3").removeClass('hide');
                        break;
                    case "Rejected":
                        title = "Your KYC application has not been accepted.";
                        $(".kyc-response").html("If you believe your KYC has been rejected by mistake we ask that you please resubmit your KYC by clicking the button below. Our systems tell us you should be able to successfully complete your KYC by doing the following:<br><br><b>" + data.suggestionText + "</b>");
                        $(".kyc-button,.kyc-medium,.kyc-telegram2").removeClass('hide');
                        $(".kyc-button").attr("href","https://nessie.dav.network/join?email="+email);
                        break;
                    case "Expired":
                        title = "Your KYC application has expired.";
                        $(".kyc-response").text("We ask you to please resubmit your KYC by clicking the button below.");
                        $(".kyc-close,.kyc-medium,.kyc-telegram2").removeClass('hide');
                        break;
                    case "Started":
                        title = "Your KYC application failed to process."
                        $(".kyc-response").text("Our systems tell us the email address you used is not valid. We ask that you please resubmit your KYC by clicking the button below and providing a valid email address.");
                        $(".kyc-button,.kyc-medium,.kyc-telegram2").removeClass('hide');
                        $(".kyc-button").attr("href","https://nessie.dav.network/join?email="+email);
                        break;
                    default:
                      break;
                }
                $(".kyc-title").text(title);
                ga('send', 'event', 'KYC', 'status results', data.statusText, title);
              }
          });
        }else{
          $(".kyc-error").show();
          $(".kyc-error").animateCss("shake");
          $(".kyc-error").text("Please enter your email address.");
        }

    });
    //countdown
      var targetDate = new Date("06/11/2018");
      var todaysDate = new Date();
      if(targetDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
        $('#countdown,#countdownMobile').countdown({until: $.countdown.UTCDate(-10, new Date(2018, 5, 11)), format: 'dHMS'});
      }else{
        $('#countdown,#countdownMobile').countdown({until: $.countdown.UTCDate(-10, new Date(2018, 5, 11)), format: 'dHM'});
      }

  // register event google analytics
  $("#mc-embedded-subscribe-form").on('submit', function() {
    ga('send', 'event', 'Registration', 'started', 'Register');
  });
});

//pause youtube video
$(function(){
  $("body").on('hidden.bs.modal', function (e) {
    var $iframes = $(e.target).find("iframe");
    $iframes.each(function(index, iframe){
      $(iframe).attr("src", $(iframe).attr("src"));
    });
  });
});

// index2 clkid pixel
function handleJoinTelegram() {
  $(function () {
    var clkid = getParameterByName('clkid');
    $('#join-telegram').on('click', function () {
      var url = 'https://sc2s.startappnetwork.com/trackpostinstall/davnetwork?a=click_telegram&d=' + clkid;
      $.ajax({
        url: url,
        type: 'GET',
        success: function (res,status) {
          console.log(res,status);
        },
        error: function(xhr,status,error){
          console.log(status,error);
        }
      });
    });
  });
}

//dav cli clip
    var vidShowAndTell = document.querySelector('video');
    // Start playing the video as soon as the user scrolls
    var scrollAction = function() {
      window.removeEventListener('scroll', scrollAction);
      vidShowAndTell.play();
    };
    window.addEventListener('scroll', scrollAction);


    var announcementTrigger = document.querySelector('.video-home');
    var scrollAnouncement = function() {
      window.removeEventListener('scroll', scrollAnouncement);
      //uncomment this to enable $("#alert-announcement").removeClass('hide');
      if($('#alert-announcement').is(':visible'))
      {
        $(".telegram-bottom").addClass('extra-space');
      }

    };
    window.addEventListener('scroll', scrollAnouncement);

// mailchimp subscriber count
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
$.ajax({
    type: 'GET',
    url: 'https://nessie.dav.network/members',
    dataType: 'json',
    success: function (data) {
      // $(".mailchimp-count").text(addCommas(data.count));
      $('.mailchimp-count').countTo({
        from: 18350,
        to: data.count,
        speed: 3000,
        refreshInterval: 20,
        formatter: function (value, options) {
          value = value.toFixed(options.decimals);
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
        }
      });
    }
});
// contributors section
var AVATAR_SIZE = 128
$(function() {
    $.getJSON( "contributors.json", function( data ) {
      var modalTrigger = [];
      var modalContributor = [];
      $.each( data, function( key, val ) {
        modalTrigger.push( "<li><a href='#contributor-" + key + "' data-toggle='modal' data-target='#contributor-" + key + "'><img src='" + val.avatar + '&s=' + AVATAR_SIZE + "'></a></li>" );
      });
      $.each( data, function( key, val ) {
        var repo = "";
        for (var i = 0; i < val.repos.length; i++) {
          if (i != val.repos.length - 1) {
            repo += "<a href='https://github.com/DAVFoundation/" + val.repos[i] + "' class='repo-contrib' target='_blank'>" + val.repos[i] + "</a>,"
          }else{
            repo += "<a href='https://github.com/DAVFoundation/" + val.repos[i] + "' class='repo-contrib' target='_blank'>" + val.repos[i] + "</a>"
          }

        }
        if (val.name == null) {
          val.name = val.user;
        }
        if (val.bio == null) {
          val.bio = "";
        }else{
          val.bio = "&ldquo;" + val.bio + "&rdquo;";
        }
        modalContributor.push( "<div class='modal team-modal' id='contributor-" + key + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><div class='row'><div class='col-sm-4'><br><br><img src='" + val.avatar + '&s=' + AVATAR_SIZE + "' width='100%'></div><div class='col-sm-8'><h2>" + val.name + "</h2><h5>Open Source Contributor</h5><p><i>" + val.bio + "</i></p><p>DAV repos that the user contributed to: " + repo + "</p><p>Total number of contributions to DAV: <b>" + val.contrib_count + "</b></p><a href='https://github.com/" + val.user + "' target='_blank'><img src='img/icons/github-footer.png' width='25'></a></div></div></div></div></div></div>" );
      });

      $( "<ul/>", {
        "class": "contributors-list",
        html: modalTrigger.join( "" )
      }).appendTo( ".contributors" );

      $( "<div/>", {"class": "contributors-modal", html: modalContributor.join( "" )}).appendTo( "body" );
      // modal vertical align
      $('.team-modal').on('shown.bs.modal', function (e) {
        // alert("Modal for " + $(this).attr('id') + " is open.")
        var windowHeight = $(window).height();
        var modalHeight = $(this).find('.modal-content').height();
        var modalTopPadding = (windowHeight - modalHeight)/2 - 30;
        // var modalTopPadding = (windowHeight + windowHeight*0.18 - modalHeight)/2 - 30;
        if (modalTopPadding < 0) {modalTopPadding = 0;}
        $('.modal-dialog').css('margin-top', modalTopPadding +'px');
      });
    });
});

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function beforeSubmitKycRegistration() {
  
  if (validateEmail()) {
    sendRegistrationAnaliticsEvent();
    return true;
  } else {
    return false;
  }

  function validateEmail() {
    var emailInput = $('.required.email').eq(2);
    var email = emailInput.val();
    console.log(email)
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      emailInput.removeClass('invalid');
      return true;
    } else {
      emailInput.addClass('invalid');
      return false;
    }
  }

  function sendRegistrationAnaliticsEvent() {
    ga('send', 'event', 'Registration', 'click', 'email_Registration_click');
  }
}

var $floatingButton = $('#floating-button');

function setDifferentCtaForAdwordsUsers() {
  cb2
  if (isAdwordsRedirect()) {
    $floatingButton.find('span').html('REGISTER FOR<br>WHITELIST');
    var kycRegistrationUrl = $('#mc-embedded-subscribe-form').attr('action');
    $floatingButton.attr('href', kycRegistrationUrl);
    $floatingButton.attr('onclick', null).off('click');
    $floatingButton.click(sendAnaliticsEvent);
    changeFloatingButtonIcon('fa-angle-double-right');
  }

}
function setDifferentCtaForDifferentCountry(country) {
  switch (country) {
    case 'South Korea' :
      $floatingButton.find('span').html('한글<br>설명서');
      var kycRegistrationUrl = 'https://medium.com/davnetwork/dav-%ED%86%A0%ED%81%B0-%EC%84%B8%EC%9D%BC%EC%9D%84-%EC%9C%84%ED%95%9C-kyc-%EC%9D%B8%EC%A6%9D-%EC%99%84%EB%A3%8C%ED%95%98%EA%B8%B0-cd83a2ab162b';
      $floatingButton.attr('href', kycRegistrationUrl);
      changeFloatingButtonIcon('korean-flag');
      break;
  }
}

function getVisitorCountry(cb1, cb2) {
  $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + GOOGLE_GEOLOCATION_API_KEY, function(data) {
    var latlng = {lat: data.location.lat, lng: data.location.lng};
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({location: latlng}, function(data) {
      var country = data.filter(function(place){return place.types.indexOf('country') > -1})[0].formatted_address;
      cb1(country);
      cb2(country);
    })
  }).fail(cb2);
}

function isAdwordsRedirect() {
  return window.location.search.includes('gclid');
}

function changeFloatingButtonIcon(iconName) {
  $floatingButton.find('i').removeClass('fa-telegram').addClass(iconName);
}

function sendAnaliticsEvent() {
  ga('send', 'event', 'Registration-Bottom-Click', 'click', 'floating_Registration_click');
}
