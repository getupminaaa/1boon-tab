const $tabList = document.querySelectorAll(".nav>li");
let selectedTab = $tabList[0];
for (let i = 0; i < $tabList.length; i += 1) {
  $tabList[i].addEventListener("click", (event) => {
    selectedTab.className = "";
    selectedTab = event.target.parentNode;
    selectedTab.className = "active";
  });
}
console.log($tabList);
