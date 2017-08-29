import header from "./component/header";
import video from "./component/video";
import listheader from "./component/listheader";
import videolist from "./component/videolist";
import chat from "./component/chat";
import service from "../common/service";

require("../common/scss/base.scss");
require("./main.scss");

header.loginClick();
header.doInitWx();
header.doInitDt();




$(() => {
  //let streamName = service.getStreamName();
  let streamName = "dfdddd-1AN";
  /*service.ioInform(streamName, 1);//进入
  $(window).on('beforeunload', function(){//关闭or刷新
    service.ioInform(streamName, 0);
  });*/

  //静态信息
  service.getLiveInfo(streamName, function(data){//code=200&&data执行
    video.setup(data);
    if(data.bgImgUrl){
      $('.content').css('background-image', 'url(' + data.bgImgUrl + ')');
    }

    //播放视频
    if(data.liveStatus == 1) {//播放直播视频
      video.initFlash(1, liveInfo.coverUrl, liveInfo.m3u8PlayUrl);
      videolist.setup(data);
    }else{//直播结束 提示
      video.initFlash(0, '', '');
      $('.player_box .overtip').show();
    }
  });
  
  video.barrageClick();
  videolist.videoPlay(streamName);

  header.loginIO();

  //share
  //wxShare.initShare('title','','des');
  

  })
