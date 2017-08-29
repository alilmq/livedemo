require('./video.scss');
require('CKobject');

export default class video {
  static setup(data){
    if (data.name) {
      $('.video_title h3').html(data.name);
    }

    if (data.showOnline) {
      $('.online span').html(data.OnlineNum);
    } else {
      $('.online').hide();
    }
  }


  static initFlash(isLiving, coverImg, src){
    var flashvars, params;
    if (!isLiving) {//结束视频
      flashvars = {
        f: 'http://common.qupai.me/base/lib/ckplayer/m3u8.swf',
        a: src,
        c: 0,
        s: 4,
        lv: 0,
        i: coverImg,
        p: 1
      };
    } else {//正在直播
      flashvars = {
        f: src,
        c: 0,
        s: 0,
        b: 1,
        lv: 1,
        i: coverImg,
        p: 1
      };
      
      
    }
    params = {
      bgcolor: '#FFF',
      allowFullScreen: true,
      allowScriptAccess: 'always',
      wmode: 'transparent'
    };
    return CKobject.embedSWF('http://common.qupai.me/base/lib/ckplayer/ckplayer.swf', 'player', 'ckplayer_a1', '748', '407', flashvars, params);
  }

}
    




  
