import video from "../video";
import service from "../../../common/service";
require('./videolist.scss');

/*export default () => {

};*/
export default class videolist {
  static timeFormat(timestamp){
    let date = new Date(timestamp);
    let t = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    return t
  }

  static setup(data){
    $('.history_lists').append('<li class="live_li"><div class="li_con"><img src="' + data.coverUrl + '"><span class="list_time">' + videolist.timeFormat(data.createTime) + '</span><span class="isPlaying"><i></i><i></i><i></i><i></i></span><span class="isLive"></span><span class="list_url">' + data.m3u8PlayUrl + '</span></div></li>');
    //live as curr
    let currLi = $('li.live_li').clone();
    currLi.removeClass('live_li');
    currLi.addClass('curr_li');
    currLi.insertBefore($('.history_lists li:nth-child(1)'));
    $('li.live_li').hide();
  }

  static videoPlay(streamName){
    //get list/page
    var pushList = function(streamName, page) {
      service.getLiveHistory(streamName, page, function(data){//code=200&&data执行
        if(data.list && data.list.length>0){
          data.list.map(function(item) {
            $('.history_lists').append('<li class="back_li"><div class="li_con"><img src="' + item.coverUrl + '"><span class="list_time">' + videolist.timeFormat(item.createTime) + '</span><span class="list_url">' + item.m3u8PlayUrl + '</span><span class="isPlaying"><i></i><i></i><i></i><i></i></span></div></li>');
          });
        }
      });
    }
    pushList(streamName, 1);

    //click-回放
    $('.history_lists li.back_li').on('click', function() {
      $('.player_box .overtip').hide();
      //play
      let currUrl = $(this).find('.list_url').html();
      let currImg = $(this).find('img').attr('src');
      video.initFlash(0, currImg, currUrl);
      //put first
      $('li.curr_li').remove();
      let currLi = $(this).clone();
      $(currLi).removeClass('back_li');
      $(currLi).addClass('curr_li');
      $(currLi).insertBefore($('.history_lists li:nth-child(1)'));
      $('li').show();
      $(this).hide();
    });

    //click-直播
    $('.history_lists li.live_li').on('click', function() {
      service.getLiveInfo(streamName, function(data){
        if (data.liveStatus == 1) { //still living
          video.initFlash(1, data.coverUrl, data.m3u8PlayUrl);
          //live_li put first
          $('li.curr_li').remove();
          let currLi = $('li.live_li').clone();
          currLi.removeClass('live_li');
          currLi.addClass('curr_li');
          currLi.insertBefore($('.history_lists li:nth-child(1)'));
          $('li').show();
          $(this).hide();
        } else { //living over
          //tip
          video.initFlash(0, '', '');
          $('.player_box .overtip').show();
          //history reget
          $('.history_lists').html('');
          pushList(streamName, 1);
        }
      });
        
    });

    //click load
    var page = 2;
    $('#load').on('click', function() {
      pushList(streamName, page);
      page += 1
    })
  }

  

}
