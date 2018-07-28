/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
var scrollDuration = 1500;

$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, scrollDuration, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
		$('.navbar-toggle:visible').click();
	}
});

var waypoints = $(".tfx").waypoint({
	handler: function(direction) {
		$(this.element).addClass("animated fadeInUp");
		$(this.element).removeClass("invisible");
	},
	offset: "70%"
});

var openDemo = function(id) {
  var direction = (id === 2) ? '-right' : '-left';
	// remove old anims if they exist
	$('#show-demo'+id).removeClass("zoom-out" + direction + "-fade-in");
	$('#demo-frame'+id).removeClass("zoom-out" + direction);
	$('#navbar').removeClass("fade-in");
	$('#hide-demo'+id).removeClass("hide-left");

	// add new anims
	$('#show-demo'+id).addClass("zoom-in" + direction + "-fade-out");
	$('#demo-frame'+id).addClass("zoom-in" + direction);
	$('#navbar').addClass("fade-out");
	setTimeout(function() { $('#hide-demo'+id).addClass("show-from-right"); }, scrollDuration * 0.7);

	// after scrolling, fix the demo to the screen and make sure it's on top of everything else
	setTimeout(function()
	{
		$('#demo-frame'+id).removeClass("zoom-in"+direction);
		$('#demo-frame'+id).css("position","fixed");
		$('#demo-frame'+id).css("z-index", 10000);
		$('#demo-frame'+id).css("left", 0);
		$('#demo-frame'+id).css("top", 0);
		$('#demo-frame'+id).css("transform", "scale(1)");
	}, scrollDuration);

};

var closeDemo = function(id) {
  var direction = (id === 2) ? '-right' : '-left';
	$('#show-demo'+id).removeClass("zoom-in" + direction + "-fade-out");
	$('#demo-frame'+id).removeClass("zoom-in" + direction);
	$('#navbar').removeClass("fade-out");
	$('#hide-demo'+id).removeClass("show-from-right");

	// add new anims
	$('#show-demo'+id).addClass("zoom-out" + direction + "-fade-in");
	$('#demo-frame'+id).addClass("zoom-out" + direction);
	$('#navbar').addClass("fade-in");
	$('#hide-demo'+id).addClass("hide-right");

	// unfix the demo from the screen and allow the demo frame to go behind other things again
	$('#demo-frame'+id).removeAttr("style");
  setTimeout(function () {
  	$('#demo-frame'+id).removeClass("zoom-out" + direction);
  	$('#show-demo'+id).removeClass("zoom-out" + direction + "-fade-in");
  }, 2000);
};

$('#show-demo').click(function () {
  openDemo('');
});
$('#hide-demo').click(function () {
  closeDemo('');
});
$('#show-demo2').click(function() {
  openDemo(2);
});
$('#hide-demo2').click(function() {
  closeDemo(2);
});
