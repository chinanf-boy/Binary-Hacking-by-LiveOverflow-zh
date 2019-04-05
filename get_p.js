const fs = require('fs');

const data = fs.readFileSync('../.list', 'utf-8');

let arrData = data.split('\n');
let Obj = {};
arrData.forEach(d => {
  Obj[d.split('. ')[0]] = d;
});

const two = n => {
  if (n.startsWith('P')) {
    n = n.slice(1);
  }
  if (n.length == 1) {
    return `0${n}`;
  }
  return n;
};

const addZh = str => {
  if (str.endsWith('.mp4')) {
    return str.replace('mp4', 'zh.mp4');
  }
  return str + '.mp4';
};

// console.log(Obj);

console.log('# 由 `node get_p.js > video_add_sub.sh` 生成')

Object.keys(Obj).forEach(index => {
  index &&
    console.log(
      `ffmpeg -i "../${Obj[index]}" -vf subtitles="./srts/${two(
        index
      )}.zh.srt" "${addZh(Obj[index])}"`
    );
});
