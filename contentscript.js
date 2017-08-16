//Script to be executed in the actual browser page

var formatTimestamps = arr_of_timestamps => arr_of_timestamps.map(e => e.innerText);
var formatOwners = arr_of_owners => arr_of_owners.map(e => e.outerText);

var init = () => {
  let dom_timestamps = Array.from(document.getElementsByClassName("timestamp"));
  let raw_timestamps = formatTimestamps(dom_timestamps);
  let dom_owners = Array.from(document.getElementsByClassName("pl-video-owner"));
  let raw_owners = formatOwners(dom_owners);
  let pl_title = document.getElementsByClassName("pl-header-title")[0].innerText;
  let pl_header = document.getElementsByClassName("pl-header-thumb")[0];
  let thumb_src = pl_header.getElementsByTagName("img")[0].getAttribute("src");
  let play_link = pl_header.getElementsByTagName("a")[0].getAttribute("href");
  let owner = document.getElementsByClassName("qualified-channel-title-text")[0].innerText;

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
