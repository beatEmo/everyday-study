// 获取一些必要的dom对象
const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".container ul"),
  container: document.querySelector(".container")
};

/**
 *  解析歌词字符串 -> 新的歌词对象数组 [{time:String,words:String}]
 */
function parseLrc() {
  return lrc.split("\n").map((item) => {
    const parts = item.split("]");
    return {
      time: parseTime(parts[0].slice(1)),
      words: parts[1]
    };
  });
}
const lrcData = parseLrc();

/**
 * 将一个时间字符串 -> 秒(Number)
 * @param {*} timeStr 时间字符串
 * @returns {Number} 秒
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
}

/**
 * 计算出当前播放到第几秒 对应高亮显示歌词的下标
 */
function findIndex() {
  const curTime = doms.audio.currentTime;
  const index = lrcData.findIndex((item) => item.time > curTime);
  if (index >= 0) {
    return index - 1;
  }
  return lrcData.length - 1;
}

/**
 * 创建歌词元素 li
 */
function createlrcElement() {
  const frag = document.createDocumentFragment();
  lrcData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.words;
    frag.appendChild(li);
  });
  doms.ul.appendChild(frag);
}
createlrcElement();

/**
 * 计算出ul的偏移量
 */
// 容器一般的高度
const containerHeight = doms.container.clientHeight;
// li的高度
const liHeight = doms.ul.children[0].clientHeight;
const maxHeight = doms.ul.clientHeight - containerHeight;

function setOffset() {
  // 当前高亮显示歌词的下标
  const index = findIndex();
  // 计算偏移量
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  console.log(offset);
  // 边界处理
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxHeight) {
    offset = maxHeight;
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;

  // 高亮效果
  let li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }
  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
}

// 事件处理
doms.audio.addEventListener("timeupdate", setOffset);
