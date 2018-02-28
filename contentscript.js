//Script to be executed in the actual browser page

var formatTimestamps = arr_of_timestamps => arr_of_timestamps.map(e => e.outerText);
var formatOwners = arr_of_owners => arr_of_owners.map(e => e.outerText);

var init = () => {
  let dom_timestamps = Array.from(document.querySelectorAll("ytd-playlist-video-renderer .ytd-thumbnail-overlay-time-status-renderer"));
  let raw_timestamps = formatTimestamps(dom_timestamps);
  let dom_owners = Array.from(document.querySelectorAll("ytd-playlist-video-renderer ytd-video-meta-block"));
  let raw_owners = formatOwners(dom_owners);
  let pl_title = document.querySelectorAll("ytd-playlist-sidebar-primary-info-renderer #title")[0].innerText;
  let pl_header = document.getElementById("playlist-thumbnails");
  let thumb_src = document.querySelectorAll("ytd-playlist-sidebar-primary-info-renderer img")[0].getAttribute("src");
  let play_link = document.querySelectorAll("ytd-playlist-sidebar-primary-info-renderer #thumbnail")[0].getAttribute("href");
  let owner = document.getElementById("owner-name").innerText;

  chrome.runtime.sendMessage({
    timestamps: raw_timestamps,
    list_name: pl_title,
    image_src: thumb_src,
    play_link: `https://www.youtube.com${play_link}`,
    owner: owner,
    channels: raw_owners
  });
}
init();
