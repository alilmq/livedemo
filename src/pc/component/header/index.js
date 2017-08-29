require("./header.scss");

export default class Service {
  static loginIO(){
    //登录后
    //$('.login .head_title').html(nickname);
    //$('.unlogin').hide();
    //$('.logined').show();
    //退出后
    //$('.login .head_title').html('登录');
    //$('.logined').hide();
    //$('.unlogin').show();

    //login out
    $('.login_out').on('click', function(){
      //do out

    });
  }

  static loginClick(){
    var wxObj=$('.login li:nth-child(1)');
    wxObj.on('click',function(){
      $('.wx').show();
      $('.dt').hide();
    });

    var dtObj=$('.login li:nth-child(2)');
    dtObj.on('click',function(){
      $('.dt').show();
      $('.wx').hide();
    })

    $('.close').on('click',function(){
      $('.wx').hide();
      $('.dt').hide();
    });
  }

  static doInitWx(){
    let wxObj=$('.login li:nth-child(1)');
    wxObj.on('click',function(){
      Service.initWx();
    });
  }

  static initWx(){
    var obj = new WxLogin({
      id:"wxcode_box",
      appid:"wxe86460df16910beb",
      scope:"snsapi_login",
      redirect_uri: "https://www.qupaicloud.com/api/authorize/wechat/callback",
      state: "weixin",
      style: "",
      href: ""
    });
  }

  static doInitDt(){
    let dtObj=$('.login li:nth-child(2)');
    dtObj.on('click',function(){
      Service.initDt();
    });
  }

  static initDt(){
    var obj = new DDLogin({
      id:"dtcode",
      goto:"https%3a%2f%2fwww.qupaicloud.com%2fapi%2fauthorize%2fdingtalk%2fcallback",//https://www.qupaicloud.com/api/authorize/dingtalk/callback
      
      //state: "weixin",
      style: "",//no do
      href: "",
      width:"",
      height:""
    });
  }
}


