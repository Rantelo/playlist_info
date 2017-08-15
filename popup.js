var leftPad = number => {
  let str = ""+number;
  return "00".substring(0, 2-str.length) + str;
}
var secsToHHMMSS = t_secs => {
  let hours = Math.floor(t_secs/3600);
  t_secs %= 3600;
  let minutes = Math.floor(t_secs/60);
  let seconds = t_secs % 60;
  return [leftPad(hours), leftPad(minutes), leftPad(seconds)];
}

var setListName = (list_name) => {
  let list = document.getElementById("list_name");
  list.innerText = `${list_name}`;
}
var setTotalTime = (time) => {
  let total = document.getElementById("total_time");
  let [hh, mm, ss] = secsToHHMMSS(time);
  total.innerText = `Total duration -  ${hh}:${mm}:${ss}`;
}
var setVideoAvg = (time) => {
  let video_avg = document.getElementById("video_length_avg");
  let [hh, mm, ss] = secsToHHMMSS(time);
  video_avg.innerText = `Avg duration - ${hh}:${mm}:${ss}`;
}
var setLongestVideo = (time) => {
  let longest = document.getElementById("longest_video");
  let [hh, mm, ss] = secsToHHMMSS(time);
  longest.innerText = `Longest video - ${hh}:${mm}:${ss}`;
}
var setPlaylistLength = (len) => {
  let pl_len = document.getElementById("videos_qty");
  pl_len.innerText = `Videos qty - ${len}`;
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.hasOwnProperty("processed_info")) {
      let { total_in_seconds, list_name, videos_qty,
            video_length_avg, longest_video } = request.processed_info;

      setListName(list_name);
      setTotalTime(total_in_seconds);
      setVideoAvg(video_length_avg);
      setLongestVideo(longest_video);
      setPlaylistLength(videos_qty);
    }
  }
)

chrome.runtime.sendMessage({open: true});
