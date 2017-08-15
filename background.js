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

var sumTotalSecs = timestamps => timestamps.reduce((acc, e) => {
  let t_secs = timeToSeconds(e);
  longest_video = (t_secs > longest_video ) ? t_secs : longest_video;
  return acc + t_secs;
}, 0);

chrome.extension.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.hasOwnProperty("open")) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "contentscript.js"});
      });
    }
    if (request.hasOwnProperty("timestamps")) {
      let {timestamps, list_name} = request;
      let total = sumTotalSecs(timestamps);
      let videos_len = timestamps.length;

      chrome.runtime.sendMessage({processed_info: {
        total_in_seconds: total,
        list_name: list_name,
        videos_qty: videos_len,
        video_length_avg: Math.floor(total / videos_len),
        longest_video: longest_video
      }});
    }
  }
)
