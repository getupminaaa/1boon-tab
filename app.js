const $tabList = document.querySelectorAll(".nav>li");
let selectedTab = $tabList[0];
let $list = document.getElementById("list");
let $text_center = document.getElementById("text-center");
let index = 0;
const $loading = document.querySelector(".glyphicon.glyphicon-refresh")
  .parentNode;
const $btn = document.querySelector(".btn");

const $api_list = document.createElement("div");
$api_list.className = "api_list";
$list.appendChild($api_list);
$loading.className = "hidden";

for (let i = 0; i < $tabList.length; i += 1) {
  $tabList[i].addEventListener("click", (event) => {
    selectedTab.className = "";
    selectedTab = event.target.parentNode;
    selectedTab.className = "active";
    $api_list.innerHTML = "";
    $btn.className = "btn btn-default";
    index = 0;
    waitLoading();
  });
}

function load(id) {
  fetch(`${id}.json`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = index; i < Math.min(index + 10, data.length); i += 1) {
        makeTemplate(data[i]);
      }
      index = Math.min(10 + index, data.length);
      if (index === data.length) {
        $btn.className = "hidden";
      }
    });
}

function reorderDiv() {
  $list.insertBefore($api_list, $list.firstChild);
}

function makeTemplate(data) {
  const $api_each = document.createElement("div");
  $api_each.className = "api_each";
  $api_list.appendChild($api_each);

  const $api_link = document.createElement("a");
  $api_link.className = "api_link";
  $api_link.setAttribute("href", data.url);
  $api_each.appendChild($api_link);

  const $api_img = document.createElement("img");
  $api_img.className = "api_img";
  $api_img.setAttribute("src", data.img);
  $api_link.appendChild($api_img);

  const $api_title = document.createElement("h3");
  $api_title.className = "api_title";
  let title = document.createTextNode(data.title);
  $api_title.appendChild(title);
  $api_link.appendChild($api_title);

  const $api_cp = document.createElement("h4");
  $api_cp.className = "api_cp";
  let cp = document.createTextNode(data.cp);
  $api_cp.appendChild(cp);
  $api_link.appendChild($api_cp);
}
function waitLoading() {
  $loading.className = "text-center";
  setTimeout((handler) => {
    load(selectedTab.childNodes[0].id);
    $loading.className = "hidden";
  }, 1000);
}

reorderDiv();
waitLoading();
$btn.addEventListener("click", (event) => {
  waitLoading();
});
