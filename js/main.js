(function($){
	$(function(){
		
		
		var xz=0;
		$(".open-menu, .close-menu").click(function(){
			if(xz==0){
				$(".navigation").animate({"left":0},300);
				xz++;
			}else{
				$(".navigation").animate({"left":"-280px"},300);
				xz--;
			}
			return false;
		});
		
		
		var ele = $("ul.accordion");
		var all_divs = ele.find("div");
		var all_anchor = ele.children("li").children("a");
		all_divs.slideUp();
		$("ul.accordion li:first-child a").next().slideDown();
		
		all_anchor.click(function(){
		if($(this).next().is(":hidden")){
			all_divs.slideUp();
			all_anchor.removeClass("active");
			$(this).addClass("active").next().slideDown();
		}else{
			$(this).removeClass("active").next().slideUp();
		};
		return false;
		});
	
		$("[data-toggle='tooltip']").tooltip();	
		
	});

	//banner typing
	$(function(){
		var titles, action="type", counter=0, i=0, j=0,
            type_time=5, hold_time=100, remove_time=2, stop_time=5,
            box = $("#typing_box");
			
		//banner-video
		(function(){
			var hasVideo = !!(document.createElement('video').canPlayType), vtimer;
			if(hasVideo){
				var de=document.documentElement, w, h, wrapper=$("#video_wrapper"), obj=$("#video_obj"), banner=$("#banner_obj"), image=$("#banner_image");
				function FormOnResize(){
					w=de.clientWidth;
					h = Math.floor(w*(1080/1920));
					obj.width(w);
					banner.height(h);
					image.height(h);
				}
				FormOnResize();
				window.onresize=FormOnResize;

                vtimer = window.setInterval(function () {
                    obj[0].play();
                    if(obj[0].readyState>0){
                        window.clearInterval(vtimer);
                    }
                }, 500);
			}	
		})();


		//banner-typing
		titles = [
			["M", "o", "s", "t", " ", "<strong>r</strong>", "<strong>e</strong>", "<strong>l</strong>",
				"<strong>i</strong>", "<strong>a</strong>", "<strong>b</strong>", "<strong>l</strong>", "<strong>e</strong>"],
			["B","u","s","i","n","e","s","s"],
			["L","a","r","g","e","s","t"],
			["F","a","s","t","e","s","t"],
			["M", "o", "s", "t", " ", "<strong>a</strong>","<strong>d</strong>","<strong>v</strong>","<strong>a</strong>",
                "<strong>n</strong>","<strong>c</strong>","<strong>e</strong>","<strong>d</strong>"]
        ];

        var timer = setInterval(zxTyping, 20);
        function zxTyping() {
            switch (action){
                case "type":
                    zxType();
                    break;
                case "remove":
                    zxRemove();
                    break;
                case "hold":
                    zxHold();
                    break;
                case "stop":
                    zxStop();
                    break;
            }
        }

        function zxType(){
            counter++;
            if(counter == type_time){
                title = titles[i];
                counter = 0;
                box.html(title.slice(0,j++).join(""));
                if(j>title.length){
                    counter = 0;
                    action = "hold";
                }
            }
        }

        function zxRemove(){
            counter++;
            if(counter==remove_time){
                counter=0;
                title = titles[i];
                box.html(title.slice(0, j--).join(""));
                if(j<0){
                    action = "stop";
                }
            }
        }

        function zxHold() {
            counter++;
            if(counter==hold_time){
                counter = 0;
                action = "remove";
            }
        }

        function zxStop() {
            counter++;
            if(counter==stop_time){
                counter = 0;
                action = "type";
                i++;
                if(i>=titles.length){
                    i = 0;
                }
                j=0;
                //clearInterval(timer);
            }
        }
		
		//signup + alert bug fixed
		$("#alertModalId").on('hidden.bs.modal', function () {
 			if($("#signup").css('display')==="block"){
				//console.log("block");
				$("#body").addClass("modal-open");
			}
		})
	});
})(jQuery);

jQuery().ready(function() {
/* Custom select design */    
jQuery('.drop-down').append('<div class="button"></div>');    
jQuery('.drop-down').append('<ul class="select-list"></ul>');    
jQuery('.drop-down select option').each(function() {  
var bg = jQuery(this).css('background-image');    
jQuery('.select-list').append('<li class="clsAnchor"><span value="' + jQuery(this).val() + '" class="' + jQuery(this).attr('class') + '" style=background-image:' + bg + '>' + jQuery(this).text() + '</span></li>');   
});    
jQuery('.drop-down .button').html('<span style=background-image:' + jQuery('.drop-down select').find(':selected').css('background-image') + '>' + jQuery('.drop-down select').find(':selected').text() + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');   
jQuery('.drop-down ul li').each(function() {   
if (jQuery(this).find('span').text() == jQuery('.drop-down select').find(':selected').text()) {  
jQuery(this).addClass('active');       
}      
});     
jQuery('.drop-down .select-list span').on('click', function()
{          
var dd_text = jQuery(this).text();  
var dd_img = jQuery(this).css('background-image'); 
var dd_val = jQuery(this).attr('value');   
jQuery('.drop-down .button').html('<span style=background-image:' + dd_img + '>' + dd_text + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');      
jQuery('.drop-down .select-list span').parent().removeClass('active');    
jQuery(this).parent().addClass('active');     
$('.drop-down select[name=options]').val( dd_val ); 
$('.drop-down .select-list li').slideUp();     
});       
jQuery('.drop-down .button').on('click','a.select-list-link', function()
{      
jQuery('.drop-down ul li').slideToggle();  
});     
/* End */       
});