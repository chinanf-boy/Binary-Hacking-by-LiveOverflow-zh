const fs = require('fs');

const data = fs.readFileSync('../.list', 'utf-8');

const zhStyle = f =>
  `subtitles=${f}:force_style='Fontsize=15,MarginV=18,BorderStyle=1,Outline=1,Shadow=0,PrimaryColour=&HFFFFFF&,OutlineColour=&H853F1B&,Spacing=3'`;
const enStyle = f =>
  `subtitles=${f}:force_style='Fontsize=8,MarginV=8,BorderStyle=0,Outline=1,Shadow=0,PrimaryColour=&HFFFFFF&,OutlineColour=&H5A6A83&,Spacing=1'`;

function addPrefix(filename, en = false) {
  if (en) {
    return `./srts/${filename}.srt`;
  }
  return `./srts/${filename}.zh.srt`;
}

const srts = index => {
  return `${zhStyle(addPrefix(two(index)))},${enStyle(
    addPrefix(two(index), true)
  )}`;
};

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

console.log('# 由 `node get_p.js > video_add_sub.sh` 生成');

let Rs = {};

Object.keys(Obj).forEach(index => {
  index &&
    (Rs[two(index)] = `ffmpeg -y -i "../Source/${Obj[index]}" -vf "${srts(
      index
    )}" "../Zh/${addZh(Obj[index])}"`);
});

if (process.argv[3]) {
  Obejct.keys(Rs).forEach(r => console.log(r));
} else if (process.argv[2]) {
  console.log(Rs[two('P' + process.argv[2])]);
}
