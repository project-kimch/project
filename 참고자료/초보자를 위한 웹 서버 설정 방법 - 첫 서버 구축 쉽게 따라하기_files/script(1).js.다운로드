(function($) {

	function common(){
		var $gnb = $("#gnb"),
			$header = $("#header"),
			$search = $header.find(".search"),
			$profile = $header.find(".profile"),
			$menu = $header.find(".menu"),
			$pageTop = $(".page-top"),
			gnbWidth = 0;

		$(window).load(function(){
			$gnb.find("li").each(function(){
				gnbWidth  = gnbWidth + $(this).outerWidth() + 1;
				if ( window.location.pathname == $(this).find("a").attr("href")){
					$(this).addClass("current");
				}
			});
			$gnb.find("ul").width(gnbWidth);

			if ( $gnb.width() < $gnb.find("ul").width() && $gnb.find(".current").length ){
				var scrollPos = $gnb.find(".current").prev().length ? $gnb.find(".current").prev().position().left : $gnb.find(".current").position().left;
				$gnb.scrollLeft( scrollPos );
			}
		});

		$search.on("click", function(){
			if ( !$(this).hasClass("on") ){
				$(this).addClass("on").find("input").focus();
				return false;
			}
		});

		$header.on("mouseleave", function(){
			$search.removeClass("on");
		});

		$profile.on("click", "button", function(){
			if ( $(this).siblings("nav").is(":hidden") ){
				$(this).siblings("nav").show();
			} else {
				$(this).siblings("nav").hide();
			}
		});

		$profile.on("mouseleave", function(){
			$(this).find("nav").hide();
		});

		$(document).on("keyup", function(e) {
			if (e.which == 27){
				$search.removeClass("on");
				$profile.find("nav").hide();
				$("body").removeClass("mobile-menu");
				if ( $("#dimmed").length ) $("#dimmed").remove();
			}
		});

		$pageTop.on('click', function(){
			$('body, html').animate({ scrollTop: 0 }, 300 );
			return false;
		});

		$menu.on("click", function(){
			if ( $("body").hasClass("mobile-menu") ){
				$("body").removeClass("mobile-menu");
			} else {
				$("body").addClass("mobile-menu");
				$("body").append('<div id="dimmed"/>');
				if ( !$("#aside .profile").length ){
					$("#aside").append('<div class="profile" /><button type="button" class="close">닫기</button>');
					$profile.find("ul").clone().appendTo("#aside .profile");
				}
			}
		});

		$(document).on("click", "#dimmed, #aside .close", function(){
			$("body").removeClass("mobile-menu");
			if ( $("#dimmed").length ) $("#dimmed").remove();
		});

		$(window).resize(function(){
			gnbWidth = 0;
			if ( $menu.is(":hidden") ) $("body").removeClass("mobile-menu");
			if ( $("#dimmed").length ) $("#dimmed").remove();
			$gnb.find("li").each(function(){
				gnbWidth  = gnbWidth + $(this).outerWidth() + 1;
			});
			$gnb.find("ul").width(gnbWidth);
		});

		if ( window.T && window.T.config.USER.name ){
			$profile.find(".login").hide();
			$profile.find(".logout").show();
		} else {
			$profile.find(".login").show();
			$profile.find(".logout").hide();
		}

		$profile.on("click", ".login", function(){
			document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
		});
		$profile.on("click", ".logout", function(){
			document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
		});
	}

	function mainSlider(){
		var $slider = $(".main-slider");

		$slider.each(function(){
			var $this = $(this),
				$sliderItem = $(this).find("li"),
				itemLength = $sliderItem.length,
				num = 0;

			if ( itemLength > 1 ){
				if ( !$this.find("paging").length ){
					$this.append('<div class="paging"></div>');
					$sliderItem.each(function(i){
						$this.find(".paging").append('<button type="button">'+(i+1)+'</button>');
					});
					$this.find(".paging button:first").addClass("current");
					$this.on("click", ".paging button", function(){
						slideMove($(this).index());
					});
				}
				$slider.find("ul").height( $sliderItem.eq(num).height() );

				if ( $("#aside").css("float") == "right" ){
					$sliderItem.css({
						"position": "absolute",
						"top": "100%",
						"left": 0,
					}).eq(num).css("top",0);
				} else {
					$sliderItem.css({
						"position": "absolute",
						"top": 0,
						"left": "100%",
					}).eq(num).css("left",0);
				}

				function slideMove(index){
					if ( num == index || $sliderItem.is(":animated") ) return false;
					$slider.find(".paging button").eq(index).addClass("current").siblings().removeClass("current");

					if ( $("#aside").css("float") == "right" ){
						$sliderItem.css("left",0);
						if ( num > index ){
							$sliderItem.eq(index).css("top","-100%").animate({ top: "0" }, 500 );
							$sliderItem.eq(num).animate({ top: "100%" }, 500 );
						} else {
							$sliderItem.eq(index).css("top","100%").animate({ top: "0" }, 500 );
							$sliderItem.eq(num).animate({ top: "-100%" }, 500 );
						}
					} else {
						$sliderItem.css("top",0);
						if ( num > index ){
							$sliderItem.eq(index).css("left","-100%").animate({ left: "0" }, 500 );
							$sliderItem.eq(num).animate({ left: "100%" }, 500 );
						} else {
							$sliderItem.eq(index).css("left","100%").animate({ left: "0" }, 500 );
							$sliderItem.eq(num).animate({ left: "-100%" }, 500 );
						}
					}
					num = index;
				}

				$this.on("touchstart", function(){
					var touch = event.touches[0];
					touchstartX = touch.clientX,
					touchstartY = touch.clientY;
				});

				$this.on("touchend", function(){
					if( event.touches.length == 0 ){
						var touch = event.changedTouches[event.changedTouches.length - 1];
						touchendX = touch.clientX,
						touchendY = touch.clientY,
						touchoffsetX = touchendX - touchstartX,
						touchoffsetY = touchendY - touchstartY;

						if ( Math.abs(touchoffsetX) > 10 && Math.abs(touchoffsetY) <= 100 ){
							if (touchoffsetX < 0 ){
								index = num+1 > itemLength-1 ? itemLength-1 : num+1;
							} else {
								index = num-1 < 0 ? 0 : num-1;
							}
							$slider.find(".paging button").eq(index).click();
						}
					}
				});

				$(window).resize(function(){
					$this.find("ul").css("height", $this.find("li").height() );
				});
			}
		});
	}

	function viewMore(){
		if ( $(".paging-view-more").length && $(".post-item").length ){
			viewMoreShow();
		}

		function viewMoreShow(){
			var nextUrl = $(".pagination .next").attr("href");
			$(".pagination a").hide();
			if( nextUrl ){
				$(".pagination").append('<a href="'+nextUrl+'" class="view-more">more</a>');
				$(".pagination .view-more").on("click", function(){
					viewMore(nextUrl);
					return false;
				});
			}
		}

		function viewMore(url){
			$.ajax({
				url: url
			}).done(function (res) {
				var $res = $(res),
						$nextPostItem = $res.find(".post-item"),
						$paginationInner = $res.find(".pagination").html();
				if ( $nextPostItem.length > 0 ){
					$("#content .inner").append($nextPostItem);
					$(".pagination").html($paginationInner);
					viewMoreShow();
				} else {
					$(".pagination").remove();
				}
			});
		}
	}

	function tabUI($ele){
		$ele.each(function(){
			var $this = $(this),
				$list = $this.find(".tab-list"),
				itemLength = $list.length;

			if ( itemLength > 1 ){
				$this.prepend("<h2></h2>");
				$list.each(function(i){
					$this.find(">h2").append('<a href="#'+$(this).attr('id')+'">'+$(this).find("h2").text()+'</a>')
					$(this).find("h2").remove();
				});

				$this.find("h2 a").on("click", function(){
					$list.hide();
					$(this).addClass("current").siblings().removeClass("current");
					$($(this).attr("href")).show();
					return false;
				});

				$this.find("a:first").click();
			}
		});
	}

	function commentControl(){
		$(document).on("click", ".comments .comment-list ul li .author-meta .control button", function(){
			if ( $(this).siblings(".link").is(":hidden") ){
				$(".comments .link").removeAttr("style");
				$(this).siblings(".link").show();
			} else {
				$(this).siblings(".link").hide();
			}
		});

		$(document).on("keyup", function(e){
			if ( e.keyCode == '27' ){
				$(".comment-list ul li .author-meta .control .link").removeAttr("style");
			}
		});
	}

	function coverLoadMore(){
		var $cover = $(".cover-thumbnail-2"),
			$item = $cover.find("ul li");

		if ( $item.length > 4 ){
			$item.each(function(){
				if ( $(this).index() > 4 ) $(this).hide();
			});
			$cover.append('<button type="button" class="more">more</button">');
			$cover.on("click", ".more", function(){
				$(this).remove();
				$item.removeAttr("style");
			});
		}
	}

	function coverSlider(){
		var $element = $(".cover-thumbnail-3, .cover-thumbnail-4");

		$element.each(function(){
			var $cover = $(this),
				$list = $cover.find("ul"),
				$item = $cover.find("li"),
				itemOuter = $item.outerWidth(),
				itemLength = $item.length,
				viewLength = Math.round($cover.width()/itemOuter),
				num = 0;

			if ( Math.round($list.width()/itemOuter) < itemLength ){
				slider();
			}

			function slider(){
				$list.wrap('<div class="slide-wrap"></div>');
				$item.css({
					"width": itemOuter,
					"padding-left": Math.abs(parseInt($list.css("margin-left"))),
				});
				$list.width(itemOuter*itemLength);
				$cover.append('<button type="button" class="prev">이전</button><button type="button" class="next">다음</button>');
			}

			$cover.on("click", ".prev", function(){
				if ( $list.is(":animated") ) return false;
				viewLength = Math.round($cover.width()/itemOuter);

				if ( num > 0 ){
					num = num > itemLength-viewLength ? itemLength-viewLength-1 : num-1;
					$list.animate({ "left": -itemOuter*num }, 300 );
				}
			});
			$cover.on("click", ".next", function(){
				if ( $list.is(":animated") ) return false;
				viewLength = Math.round($cover.width()/itemOuter);

				if ( num < itemLength-viewLength ){
					num++;
					$list.animate({ "left": -itemOuter*num }, 300 );
				}
			});

			$cover.on("touchstart", function(){
				var touch = event.touches[0];
				touchstartX = touch.clientX,
				touchstartY = touch.clientY;
			});

			$cover.on("touchend", function(){
				if( event.touches.length == 0 ){
					var touch = event.changedTouches[event.changedTouches.length - 1];
					touchendX = touch.clientX,
					touchendY = touch.clientY,
					touchoffsetX = touchendX - touchstartX,
					touchoffsetY = touchendY - touchstartY;

					if ( Math.abs(touchoffsetX) > 10 && Math.abs(touchoffsetY) <= 100 ){
						if (touchoffsetX < 0 ){
							$cover.find(".next").click();
						} else {
							$cover.find(".prev").click();
						}
					}
				}
			});

			$(window).resize(function(){
				$cover.find("ul, li").width("");
				itemWidth = $item.width();
				itemOuter = $item.outerWidth();
				var viewLength = Math.round($cover.width()/itemOuter);

				$item.css({
					"width": itemOuter,
					"padding-left": Math.abs(parseInt($list.css("margin-left"))),
				});
				$list.css({
					"width": itemOuter*itemLength,
					"left": (num > viewLength ? -itemOuter*viewLength : -itemOuter*num)
				});

				if ( viewLength == itemLength ){
					$cover.find("button").remove();
					$list.css("left", 0);
				} else {
					if ( !$cover.find("button") ){
						$cover.append('<button type="button" class="prev">이전</button><button type="button" class="next">다음</button>');
					}
				}
			});

		});
	};

	function postCover(){
		var $postCover = $(".post-cover");

		if ( !$postCover.length ){
			$("body").addClass("post-cover-hide")
		}
	}

	// Execute
	common();
	if ( $(".main-slider").length ) mainSlider();
	if ( $(".paging-view-more").length && $(".post-item").length ) viewMore();
	if ( $(".tab-ui").length ) tabUI($(".tab-ui"));
	commentControl();
	if ( $(".cover-thumbnail-2").length ) coverLoadMore();
	if ( $(".cover-thumbnail-3, .cover-thumbnail-4").length ) coverSlider();
	if ( $("#tt-body-page").length ) postCover();

})(jQuery);
