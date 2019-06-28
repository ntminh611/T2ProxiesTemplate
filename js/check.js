$(function(){
  $("#vipua_qty").on("input",function(e){
	var Price=$("#vipua_price").attr("price");
    if (isNaN(this.value)==false && this.value!="" && isNaN(Price)==false){
	  $("#vipua_price").html("$ "+parseInt(this.value)*parseInt(Price));
	}else{
	  $("#vipua_qty").attr("value","");
	  $("#vipua_price").html("");
	}
  });
  /*$("#finger_qty").on("input",function(e){
	var Price=$("#finger_price").attr("price");
    if (isNaN(this.value)==false && this.value!="" && isNaN(Price)==false){
	  $("#finger_price").html("$ "+parseInt(this.value)*parseInt(Price));
	}else{
	  $("#finger_qty").attr("value","");
	  $("#finger_price").html("");
	}
  });*/
  
  (function(){
    var crumb_text=$("#crumb_text"), user_pane=$("#user_pane"), user_side=$("#user_side"),
		min_h=992;
	
	$("#my_nav_pills").on("shown.bs.tab", function(e){
		var o=$(e.target), t;
	  	t = o.text();
	  	crumb_text.text(t);
		user_side_resize();
	});
	
	//Synchronous  user side height
	function user_side_resize(){
		var h;
		if(document.documentElement.clientWidth>768){
			h=user_pane.height();
			if(h<min_h){
				h = min_h;
			}
			user_side.height(h);
		}
	}
	
	user_side_resize();
	
  })();
});

function checkLoginForm() {
	var allFields
	
	allFields = $([]).add($("#login_user")).add($("#login_pwd")).add($("#login_vcode"));
	allFields.removeClass("input-err-req");
	
	var username=$("#login_user").val();
	if (username.search(/^[a-zA-Z0-9]{5,}$/) == -1) {
		$("#login_user").addClass("input-err-req");
		Showdialog("User Login Error","Invalid Username !");
		return false;
	}

	var userpwd=$("#login_pwd").val();
	if (userpwd.indexOf("'") >= 0) {
		$("#login_pwd").addClass("input-err-req");
		Showdialog("User Login Error","Invalid Password !");
		return false;
	}
	if (userpwd.length<5 || userpwd == ""){
		$("#login_pwd").addClass("input-err-req");
		Showdialog("User Login Error","Invalid Password !");
		return false;
	}
	if (userpwd.length>16){
		$("#login_pwd").addClass("input-err-req");
		Showdialog("User Login Error","Password length cant be more than 16 characters !");
		return false;
	}
	
	var vcode=$("#login_vcode").val();
	if (vcode.search(/^[1-9]\d{0,2}$/) == -1) {
		$("#login_vcode").addClass("input-err-req");
		Showdialog("User Login Error","Invalid Capture !");
		return false;
	}

	$.ajax({
		url: "/userpanel",
		data:$("#formLogin").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				$("#login").modal("hide");
				window.location.href="/user";
			}else{
				$("#login_user").val("");
				$("#login_pwd").val("");
				$("#login_vcode").val("");
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-3"){
					window.location=result.payurl;
				}else{
					SetUsertoken(result.token);
					Refreshvcode();
					Showdialog("Login Failed",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Login Failed","Server error !");
		}
	});
	
	  
  return true;
}

function checkSignForm() {
	var allFields
	
	allFields = $([]).add($("#sign_user")).add($("#sign_pwd")).add($("#sign_pwd2")).add($("#sign_mail")).add($("#sign_im")).add($("#sign_ques")).add($("#sign_ans")).add($("#sign_vcode"));
	allFields.removeClass("input-err-req");
	
	var username=$("#sign_user").val();
	if (username.search(/^[a-zA-Z0-9]{5,}$/) == -1) {
		$("#sign_user").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Username !");
		return false;
	}

	var userpwd=$("#sign_pwd").val();
	if (userpwd.indexOf("'") >= 0) {
		$("#sign_pwd").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Password !");
		return false;
	}
	if (userpwd.length<5 || userpwd == ""){
		$("#sign_pwd").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Password !");
		return false;
	}
	if (userpwd.length>16){
		$("#sign_pwd").addClass("input-err-req");
		Showdialog("User Signup Error","Password length cant be more than 16 characters !");
		return false;
	}
	
	var userpwd2=$("#sign_pwd2").val();
	if (userpwd != userpwd2){
		$("#sign_pwd2").addClass("input-err-req");
		Showdialog("User Signup Error","Password with Confirm Password doesn't match !");
		return false;
	}
	
	var usermail=$("#sign_mail").val();
	if (usermail.search(/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/) == -1) {
		$("#sign_mail").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Email !");
		return false;
	}

	if ($("#sign_im").val() == ""){
		$("#sign_im").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid IM !");
		return false;
	}
	
	if ($("#sign_ques").val()==""){
		$("#sign_ques").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Security Question !");
		return false;			
	}
	
	if ($("#sign_ans").val()==""){
		$("#sign_ans").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Security Answer !");
		return false;			
	}
	
	var vcode=$("#sign_vcode").val();
	if (vcode.search(/^[1-9]\d{0,2}$/) == -1) {
		$("#sign_vcode").addClass("input-err-req");
		Showdialog("User Signup Error","Invalid Capture !");
		return false;
	}
	
	if ($("#sign_chk").prop("checked")==false) {
		Showdialog("User Signup Error","You need to agree to our EULA And Terms Of Service to use our service !");
		return false;		
	}

	$.ajax({
		url: "/userpanel",
		data:$("#formsignup").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				if(result.payurl!=''){
					window.location=result.payurl;
				}else{
					window.location='/userpay';
				}
			}else{
				Refreshvcode();
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-2"){
					SetUsertoken(result.token);
					$("#sign_vcode").val("");
					Showdialog("User Signup",result.resultMessage);
				}				
			}
		},
        error:function(){
			Showdialog("Login Failed","Server error !");
		}
	});
	
	  
  return true;
}

function checkForgetForm() {
	var allFields
	
	allFields = $([]).add($("#forget_user")).add($("#forget_vcode"));
	allFields.removeClass("input-err-req");
	
	var username=$("#forget_user").val();
	if (username.search(/^[a-zA-Z0-9]{5,}$/) == -1) {
		$("#forget_user").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Username !");
		return false;
	}

	var vcode=$("#forget_vcode").val();
	if (vcode.search(/^[1-9]\d{0,2}$/) == -1) {
		$("#forget_vcode").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Capture !");
		return false;
	}
	
	$.ajax({
		url: "/userpanel",
		data:$("#formforgetpwd").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				if (result.seType=="0"){
					$("#setpwd_ques").val(result.question);
					$("#setpwd_ques").attr("readonly","readonly");
				}else if (result.seType=="1"){
					for (var i=0;i<result.orderlist.length;i++){
						$("#setpwd_order_"+i).show();
						$("#tips_"+i).html("Price:"+result.orderlist[i].price+" Paytime:"+result.orderlist[i].paytime);
					}
				}
				SetUsertoken(result.token);
				$("#forgetpassword").modal("hide");
				$("#newpassword").modal("show");
			}else{
				$("#forget_user").val("");
				$("#forget_vcode").val("");
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else{
					SetUsertoken(result.token);
					Refreshvcode();
					Showdialog("Password Resetting",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Password Resetting Error","Server error !");
		}
	});
	
	return true;
}

function checkSetpwdForm() {
	var allFields,AliOrder
	
	allFields = $([]).add($("#setpwd_pwd")).add($("#setpwd_pwd2")).add($("#setpwd_order0")).add($("#setpwd_order1")).add($("#setpwd_order2")).add($("#setpwd_ques")).add($("#setpwd_ans"));
	allFields.removeClass("input-err-req");
	
	var userpwd=$("#setpwd_pwd").val();
	if (userpwd.indexOf("'") >= 0) {
		$("#setpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Password !");
		return false;
	}
	if (userpwd.length<5 || userpwd == ""){
		$("#setpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid New Password !");
		return false;
	}
	if (userpwd.length>16){
		$("#setpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Password length cant be more than 16 characters !");
		return false;
	}

	var userpwd2=$("#setpwd_pwd2").val();
	if (userpwd != userpwd2){
		$("#setpwd_pwd2").addClass("input-err-req");
		Showdialog("Password Resetting Error","Password with Confirm Password doesn't match !");
		return false;
	}
	
	for (var i=0;i<3;i++){
		if ($("#setpwd_order_"+i).is(":visible")==true){
			AliOrder=$("#setpwd_order"+i).val();
			if (AliOrder.search(/^[1-9]\d{10,50}$/) == -1){
				$("#setpwd_order"+i).addClass("input-err-req");
				Showdialog("SetpwdForm Error","Incorrect AlipayOrder");
				return false;
			}
		}
	}
	
	if ($("#setpwd_ques").prop("readonly")==false){
		if ($("#setpwd_ques").val()==""){
			$("#setpwd_ques").addClass("input-err-req");
			Showdialog("Password Resetting Error","Invalid Security Question !");
			return false;			
		}
	}
	
	if ($("#setpwd_ans").val()==""){
		$("#setpwd_ans").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Security Answer !");
		return false;			
	}
	
	$.ajax({
		url: "/userpanel",
		data:$("#formnewpwd").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				SetUsertoken(result.token);
				$("#newpassword").modal("hide");
				$("#login").modal("show");
				Refreshvcode();
				Showdialog("Password Resetting","Password Changed successfully !");
			}else{
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-2"){
					SetUsertoken(result.token);
					$("#setpwd_order"+result.Orderindex).addClass("input-err-req");
					Showdialog("Password Resetting",result.resultMessage);
				}else{
					SetUsertoken(result.token);
					Showdialog("Password Resetting",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Password Resetting Error","Server error !");
		}
	});
	
	return true;
}

function checkAddCreditForm() {
	var PayWindow=window.open("about:blank");
	$.ajax({
		url: "/userpanel",
		data:$("#formaddCredits").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				SetLoginUsertoken(result.token);
				checkBuyState("add",1);
				if(result.payurl!=''){
					PayWindow.location=result.payurl;
				}else{
					PayWindow.location='/userpay';
				}
			}else{
				PayWindow.opener=null; 
				PayWindow.close();
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-2"){
					SetLoginUsertoken(result.token);
					Showdialog("Recharging",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Recharging Failed","Server error !");
		}
	});
	
	return true;
}

function isInteger(obj) {
 return Math.floor(obj) === obj
}

function checkVipuaForm() {
	var allFields
	
	allFields = $([]).add($("#vipua_qty"));
	allFields.removeClass("input-err-req");
	
	var vipuaqty=$("#vipua_qty").val();
	if (isNaN(vipuaqty)==true){
		$("#vipua_qty").addClass("input-err-req");
		Showdialog("Recharging Error","Invalid Amount !");
		return false;
	}
	if (vipuaqty.search(/^\+?[1-9][0-9]*$/) == -1) {
		$("#vipua_qty").addClass("input-err-req");
		Showdialog("Recharging Error","Invalid Amount !");
		return false;
	}
	
	var PayWindow=window.open("about:blank");
	$.ajax({
		url: "/userpanel",
		data:$("#formvipua").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				SetLoginUsertoken(result.token);
				checkBuyState("vipua",1);
				if(result.payurl!=''){
					PayWindow.location=result.payurl;
				}else{
					PayWindow.location='/userpay';
				}
			}else{
				PayWindow.opener=null; 
				PayWindow.close();
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-2"){
					SetLoginUsertoken(result.token);
					Showdialog("Recharging",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Recharging Failed","Server error !");
		}
	});
	
	return true;
}

function checkOrderForm() {
	var allFields
	
	allFields = $([]).add($("#order_date1")).add($("#order_date2"));
	allFields.removeClass("input-err-req");
	
	var orderdate1=$("#order_date1").val();
	if (orderdate1.search(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) == -1) {
		$("#orderdate1").addClass("input-err-req");
		Showdialog("Error","Invalid StartDate !");
		return false;
	}
	
	var startTime = new Date(orderdate1.replace(/-/g, "/")).getTime();
	var endTime = new Date().getTime();
	var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
	if (dates>180) {
		$("#orderdate1").addClass("input-err-req");
		Showdialog("Error","You can only search the order history in recent 180 days");
		return false;		
	}
	
	var orderdate2=$("#order_date2").val();
	if (orderdate2.search(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) == -1) {
		$("#orderdate2").addClass("input-err-req");
		Showdialog("Error","Invalid EndDate !");
		return false;
	}
	
	startTime = new Date(orderdate2.replace(/-/g, "/")).getTime();
	dates = Math.abs((startTime - endTime))/(1000*60*60*24);
	if (dates>180) {
		$("#orderdate1").addClass("input-err-req");
		Showdialog("Error","You can only search the order history in recent 180 days");
		return false;		
	}


	order_date1 = orderdate1;
	order_date2 = orderdate2;
	order_payment= $("#order_payment").val();
	
	var table = $("#table-order").DataTable();
	table.ajax.reload();
	
	$("#order_submit").blur();
	return true;
}

function checkProfileForm() {
	var allFields
	
	allFields = $([]).add($("#profile_mail")).add($("#profile_im"));
	allFields.removeClass("input-err-req");
	
	var usermail=$("#profile_mail").val();
	if (usermail.search(/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/) == -1) {
		$("#profile_mail").addClass("input-err-req");
		Showdialog("Changing Profile Error","Invalid Email !");
		return false;
	}

	var userim=$("#profile_im").val();
	if (userim == ""){
		$("#profile_im").addClass("input-err-req");
		Showdialog("Changing Profile Error","Invalid IM !");
		return false;
	}

	$.ajax({
		url: "/userpanel",
		data:$("#formprofile").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				SetLoginUsertoken(result.token);
				Showdialog("Changing Profile","Profile updated successfully !");
			}else{
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}
			}
		},
        error:function(){
			Showdialog("Changing Profile Failed","Server error !");
		}
	});
	
	  
  return true;
}

function checkSetNewpwdForm() {
	var allFields,AliOrder
	
	allFields = $([]).add($("#setnewpwd_oldpwd")).add($("#setnewpwd_pwd")).add($("#setnewpwd_pwd2")).add($("#setnewpwd_order0")).add($("#setnewpwd_order1")).add($("#setnewpwd_order2")).add($("#setnewpwd_ques")).add($("#setnewpwd_ans"));
	allFields.removeClass("input-err-req");
	
	var useroldpwd=$("#setnewpwd_oldpwd").val();
	if (useroldpwd.indexOf("'") >= 0) {
		$("#setnewpwd_oldpwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Password !");
		return false;
	}
	if (useroldpwd.length<5 || useroldpwd == ""){
		$("#setnewpwd_oldpwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Current Password !");
		return false;
	}
	if (useroldpwd.length>16){
		$("#setnewpwd_oldpwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Password length cant be more than 16 characters !");
		return false;
	}
	
	var userpwd=$("#setnewpwd_pwd").val();
	if (userpwd.indexOf("'") >= 0) {
		$("#setnewpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Password !");
		return false;
	}
	if (userpwd.length<5 || userpwd == ""){
		$("#setnewpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid New Password !");
		return false;
	}
	if (userpwd.length>16){
		$("#setnewpwd_pwd").addClass("input-err-req");
		Showdialog("Password Resetting Error","Password length cant be more than 16 characters !");
		return false;
	}

	var userpwd2=$("#setnewpwd_pwd2").val();
	if (userpwd != userpwd2){
		$("#setnewpwd_pwd2").addClass("input-err-req");
		Showdialog("Password Resetting Error","New password with Confirm new password doesn't match !");
		return false;
	}
	
	for (var i=0;i<3;i++){
		if ($("#setnewpwd_order_"+i).is(":visible")==true){
			AliOrder=$("#setnewpwd_order"+i).val();
			if (AliOrder.search(/^[1-9]\d{10,50}$/) == -1){
				$("#setnewpwd_order"+i).addClass("input-err-req");
				Showdialog("SetpwdForm Error","Incorrect AlipayOrder");
				return false;
			}
		}
	}
	
	if ($("#setnewpwd_ques").prop("readonly")==false){
		if ($("#setnewpwd_ques").val()==""){
			$("#setnewpwd_ques").addClass("input-err-req");
			Showdialog("Password Resetting Error","Invalid Security Question !");
			return false;			
		}
	}
	
	if (userans=$("#setnewpwd_ans").val()==""){
		$("#setnewpwd_ans").addClass("input-err-req");
		Showdialog("Password Resetting Error","Invalid Security Answer !");
		return false;
	}
	
	$.ajax({
		url: "/userpanel",
		data:$("#formnewpwd").serialize(),
		async: true,
		cache: false,
		type: "POST",
		dataType: "json",
		success: function(result){
			if(result.ret==true){
				//SetLoginUsertoken(result.token);
				//Showdialog("Password Resetting","Password Changed successfully! Please relogin !");
				alert("Password Changed successfully! Please relogin !");
				window.location.reload(true);
			}else{
				if (result.statusCode == "-1"){
					alert("The page has expired, its auto refreshing");
					window.location.reload(true);
				}else if (result.statusCode == "-2"){
					SetLoginUsertoken(result.token);
					$("#setnewpwd_order"+result.Orderindex).addClass("input-err-req");
					Showdialog("Password Resetting",result.resultMessage);
				}else{
					SetLoginUsertoken(result.token);
					Showdialog("Password Resetting",result.resultMessage);
				}
			}
		},
        error:function(){
			Showdialog("Password Resetting Error","Server error !");
		}
	});
	
	return true;
}

function Showdialog(title,txt) {
	$("#alertTitleId").html(title);
	$("#alertContentId").html(txt);
	$("#alertModalId").modal("show");
}

function SetUsertoken(lpToken) {
	$("#login_token").val(lpToken);
	$("#forget_token").val(lpToken);
	$("#setpwd_token").val(lpToken);
	$("#sign_token").val(lpToken);
}

function SetLoginUsertoken(lpToken) {
	$("#add_token").val(lpToken);
	$("#vipua_token").val(lpToken);
	$("#profile_token").val(lpToken);
	$("#setnewpwd_token").val(lpToken);
	$("#finger_token").val(lpToken);
	$("#order_token").val(lpToken);
}

function closeLoginForm() {
	$("#login").modal("hide");
}

function Refreshvcode() {
	$("#loginvcode").attr("src", "/getcode?t="+(new Date().getTime()));
	$("#forgetvcode").attr("src", "/getcode?t="+(new Date().getTime()));
	$("#signvcode").attr("src", "/getcode?t="+(new Date().getTime()));
}

function checkBuyState(name,state) {
	if (state==0) {
		$("#"+name+"_buy").hide();
		$("#"+name+"_pay_yes").show();
		$("#"+name+"_pay_no").show();		
	} else {
		$("#"+name+"_pay_yes").hide();
		$("#"+name+"_pay_no").hide();
		$("#"+name+"_buy").show();
		if (name=="add") {
			$("#add_package").focus();
		} else {
			$("#vipua_qty").focus();
		}
	}
}

var countdown=20; 
function SetCDTime(name) { 
	if (countdown == 0) { 
		$("#"+name+"_pay_yes").removeClass("disabled"); 
		$("#"+name+"_pay_no").removeClass("disabled");		
		location.reload();
	} else { 
		$("#"+name+"_pay_yes").addClass("disabled");
		$("#"+name+"_pay_no").addClass("disabled");
		$("#"+name+"_pay_yes").html("确认("+countdown+")");
		countdown--; 
	} 
	setTimeout(function() { 
		SetCDTime(name)
	},1000) 
}

var timestamp
function StartTime(timeStr){
	//replace for safari
	timestamp = Date.parse(new Date(timeStr.replace(/\-/g, "/")));
	timestamp = timestamp / 1000;
	setInterval("SetTime()",1000);
}

function SetTime()
{
	var newDate = new Date();
	timestamp++;
	newDate.setTime(timestamp * 1000);
	$("#server_time").html(newDate.format("yyyy-MM-dd hh:mm:ss"));
}

Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
   if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
   }
   return format;
}