/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

!function(a){"use strict";var b=a(window),c=b.height();b.resize(function(){c=b.height()}),a.fn.parallax=function(d,e,f){function k(){g.each(function(){i=g.offset().top}),h=f?function(a){return a.outerHeight(!0)}:function(a){return a.height()},(arguments.length<3||null===f)&&(f=!0),"undefined"==typeof d&&(d="50%"),"undefined"==typeof e&&(e=.5);var j=b.scrollTop();g.each(function(){var b=a(this),f=b.offset().top,k=h(b);j>f+k||f>j+c||g.css("backgroundPosition",d+" "+Math.round((i-j)*e)+"px")})}var h,i,g=a(this);b.bind("scroll",k).resize(k),k()}}(jQuery);