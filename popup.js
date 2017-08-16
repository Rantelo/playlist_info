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

var setThumbNail = (src) => {
  let pl_img = document.getElementById("thumbnail");
  pl_img.src = src;
}
var setListName = (list_name) => {
  let list = document.getElementById("list_name");
  list.innerText = `${list_name}`;
}
var setOwner = (owner) => {
  let pl_owner = document.getElementById("list_owner");
  pl_owner.innerText = `${owner}`;
}
var setLinksToPlay = (href) => {
  let btn   = document.getElementById("play_btn");
  let thumb = document.getElementById("play_thumb");
  btn.setAttribute("href", href);
  thumb.setAttribute("href", href);
}
var setTotalTime = (time) => {
  let total = document.getElementById("total_time");
  let [hh, mm, ss] = secsToHHMMSS(time);
  total.innerText = `${hh}:${mm}:${ss}`;
}
var setVideoAvg = (time) => {
  let video_avg = document.getElementById("avg_time");
  let [hh, mm, ss] = secsToHHMMSS(time);
  video_avg.innerText = `${hh}:${mm}:${ss}`;
}
var setLongestVideo = (time) => {
  let longest = document.getElementById("longest_time");
  let [hh, mm, ss] = secsToHHMMSS(time);
  longest.innerText = `${hh}:${mm}:${ss}`;
}
var setPlaylistLength = (len) => {
  let pl_len = document.getElementById("video_qty");
  pl_len.innerText = `${len} videos`;
}
var setDifferentChannels = (channel_qty) => {
  let diff_channels = document.getElementById("from_channels");
  diff_channels.innerText = (channel_qty > 1) ?
    `${channel_qty} different channels` :
    `the same channel`;
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.hasOwnProperty("processed_info")) {
      let {
        total_in_seconds, list_name, videos_qty, video_length_avg, longest_video,
        image_src, play_link, owner, channels_qty } = request.processed_info;

      setThumbNail(image_src);
      setListName(list_name);
      setOwner(owner);
      setLinksToPlay(play_link);
      setTotalTime(total_in_seconds);
      setVideoAvg(video_length_avg);
      setLongestVideo(longest_video);
      setPlaylistLength(videos_qty);
      setDifferentChannels(channels_qty);
    }
  }
)

chrome.runtime.sendMessage({open: true});
