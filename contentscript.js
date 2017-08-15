//Script to be executed in the actual browser page

var formatTimestamps = arr_of_timestamps => arr_of_timestamps.map(e => e.innerText);

var init = () => {
  let dom_timestamps = Array.from(document.getElementsByClassName("timestamp"));
  let raw_timestamps = formatTimestamps(dom_timestamps);
  let pl_title = document.getElementsByClassName('pl-header-title')[0].innerText;
  chrome.runtime.sendMessage({
    timestamps: raw_timestamps,
    list_name: pl_title
  });
}
init();
