
window.onload = function(){
	addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    //获取用户名的id
	var username = document.getElementById('username');
    var name_tips = document.getElementById('name_tips');
    var name_tips_content = document.getElementById('name_tips_content');
    
    //获取手机的id
   	var phone = document.getElementById('phone');
    var phone_tips = document.getElementById('phone_tips');
    var phone_tips_content = document.getElementById('phone_tips_content');
    
    var province_city = document.getElementById('province_city');
    var province_tips = document.getElementById('province_tips');
    var usermail = document.getElementById('usermail');
    var mail_tips = document.getElementById('mail_tips');

    var remark_text = document.getElementById('remark_text');
    var remark_tips = document.getElementById('remark_tips');
    var submit_content = document.getElementById('submit_content');

    //获取提交成功的id
    var success_submit = document.getElementById('success_submit');
    //获取整个main的id
    var main = document.getElementById('main');
    //获取遮罩层
    var shade = document.getElementById('shade');
    //关闭
    var close = document.getElementById('close');
    //获取点击省和市的id
    var select_province = document.getElementById('select_province');
    var select_city = document.getElementById('select_city');

    //获取省和市，并且给相应的点击事件
    //var province = document.getElementById('province');
    //var city = document.getElementById('city');

    // province.onclick = function(){
    //     console.log('pro');
    //     addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    // }
    //点击提交
        submit_content.onclick = function(){
            var value = username.value && phone.value && cmbProvince.value && cmbCity.value
            && (name_tips.style.visibility == 'hidden') && (phone_tips.style.visibility == 'hidden')
            && (province_tips.style.visibility == "hidden") && (getStyle(mail_tips,'visibility') == 'hidden')
            && (getStyle(remark_tips,'visibility') == 'hidden');
            
            //如何不知道哪一项为true的话 逐一打印
            if(value){
                //console.log('主要数据齐全，可以访问接口')
                $.ajax({
                    url: '/api/franchisee/join',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        franchiseeName: username.value,
                        cellPhone: phone.value,
                        provinceName: cmbProvince.value,
                        cityName: cmbCity.value,
                        emailAddress: usermail.value,
                        remark: remark_text.value
                    }),
                    success: function(data){
                        //console.log(data);
                        if(data.result == 0){
                            username.value = '';
                            phone.value = '';
                            cmbProvince.value = '';
                            cmbCity.value = '';
                            usermail.value = '';
                            remark_text.value = '';
                            window.location.href = 'joins.html';
                        }
                    },
                    fail: function(e){
                        console.log("数据请求失败！");
                    }
                })
            }else{
                checkname();
                checkphone();
                checkProvinceCity();
            }

            
        }
    //省发生点击事件时，请选择省消失
    cmbProvince.onclick = function(){
        select_province.innerHTML = '省';
        select_province.style.color = '#000';
        select_province.style.fontSize = '12px';
    }
    //市发生点击事件时，请选择市消失，换为市
    cmbCity.onclick = function(){
        select_city.innerHTML = '市';
        select_city.style.color = '#000';
        select_city.style.fontSize = '12px';
    }
    //失去焦点时，判断用户名
    username.onblur = function(){
    	//console.log(username.value);
        checkname();
    }
    //失去焦点时 判断电话号码值是否正确
    phone.onblur = function(){
    	//console.log(phone.value);
    	checkphone();
    }
    usermail.onblur = function(){
    	//console.log(usermail.value);
        checkmail();
    }
    
    cmbProvince.onblur = function(){
        //console.log('cmbProvince.value',cmbProvince.value);
        checkProvince();
        
    }
    cmbProvince.onClick = function(){
        //console.log('cmbProvince',cmbProvince.value);
        
    }
    cmbCity.onblur = function(){
        //console.log(cmbCity.value);
        checkCity();
    }
    remark_text.onblur = function(){
        //console.log(remark_text.value);
        checkremark();
    }
    //js获取兼容性问题的处理
    function getStyle(obj,attr){
        //针对IE
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            //非IE
            return window.getComputedStyle(obj,false)[attr];
        }
    }
    //检查用户名
    function checkname(){
        if(username.value){
            if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/.test(username.value))){
                name_tips_content.innerHTML = "1-10字符";
                name_tips.style.visibility = "visible";
            }else{
                name_tips.style.visibility = "hidden";
            }
        }else{
            name_tips_content.innerHTML = "用户名不能为空";
            name_tips.style.visibility = "visible";
        }

    }
    //检查手机号码
    function checkphone(){
    	if(phone.value){
            if(!(/^1[34578]\d{9}$/.test(phone.value))){ 
                phone_tips_content.innerHTML = "请输入正确的手机号码";
                phone_tips.style.visibility = "visible";
            }else{
                phone_tips.style.visibility = "hidden";
            }
        }else{
            phone_tips_content.innerHTML = "手机号码不能为空";
            phone_tips.style.visibility = "visible";
        }
    }
    //检查省份
    function checkProvince(){
        if( !cmbProvince.value ){ 
            province_city.innerHTML = "省不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //检查城市
    function checkCity(){
        if( !cmbCity.value ){ 
            province_city.innerHTML = "市不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //没有输入省和市会提示
    function checkProvinceCity(){
        if( !cmbCity.value ){ 
            province_city.innerHTML = "省和市不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //校验邮箱
    function checkmail(){
        if(!usermail.value){
            console.log("邮箱可以为空");
            mail_tips.style.visibility = "hidden";
        }else{
            if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(usermail.value))){ 
                mail_tips.style.visibility = "visible";
            }else{
                mail_tips.style.visibility = "hidden";
            }
        }
    }
    //限制140个字
    function checkremark(){
        // if(!remark_text.value){
        //     console.log('备注可以为空');
        //     remark_tips.style.visibility = "hidden";
        // }else{
        //     if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,140}$/.test(remark_text.value))){
        //         remark_tips.style.visibility = "visible";
        //     }else{
        //         remark_tips.style.visibility = "hidden";
        //     }
        // }
        if(remark_text.value.length > 140){
            remark_tips.style.visibility = "visible";
        }else{
            remark_tips.style.visibility = "hidden";
        }
    }

}



