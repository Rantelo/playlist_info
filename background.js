//Call contentScript when popup open

let longest_video = 0;

var timeToSeconds = time => {
  let arr_time = time.split(":").map(e => parseInt(e));
  if (arr_time.length === 3) {
    return (
      (arr_time[0] * 60 * 60) +
      (arr_time[1] * 60) +
      (arr_time[2])
    );
  } else if (arr_time.length === 2) {
    return (
      (arr_time[0] * 60) +
      (arr_time[1])
    );
  } else {
    return 0;
  }
}

var sumTotalSecs = timestamps => timestamps.reduce((acc, e, i) => {
  if (i === 0) longest_video = 0;
  let t_secs = timeToSeconds(e);
  longest_video = (t_secs > longest_video ) ? t_secs : longest_video;
  return acc + t_secs;
}, 0);

var countDifferentChannels = channels => {
  let ch_obj = {};
  channels.forEach(e => {
    ch_obj[`key_${e.split(" ").join("")}`] = 0;
  })
  return Object.keys(ch_obj).length;
}

chrome.extension.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.hasOwnProperty("open")) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "contentscript.js"});
      });
    }
    if (request.hasOwnProperty("timestamps")) {
      let {timestamps, list_name, image_src, play_link, owner, channels} = request;
      let total = sumTotalSecs(timestamps);
      let videos_len = timestamps.length;
      let channels_qty = countDifferentChannels(channels);

      chrome.runtime.sendMessage({processed_info: {
        total_in_seconds: total,
        list_name: list_name,
        videos_qty: videos_len,
        video_length_avg: Math.floor(total / videos_len),
        longest_video: longest_video,
        image_src: image_src,
        play_link: play_link,
        owner: owner,
        channels_qty: channels_qty
      }});
    }
  }
)
