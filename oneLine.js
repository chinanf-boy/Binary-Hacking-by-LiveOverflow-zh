const fs = require('fs');
const path = require('path');

const reg = function(str) {
  // \d*:\d.* --> \d*:\d*.*\d
  // [^, -->.*\d:]+
  return !/\d*:\d.* --> \d*:\d*.*\d/.test(str) && !onlyNum(str);
};

const onlyNum = n => {
  try {
    return Number.isSafeInteger(+n);
  } catch {
    return false;
  }
};

if (process.argv[2] && process.argv[3]) {
  let fPath = process.argv[2];
  let spaceOr = '';
  if (!fPath.endsWith('zh.srt')) {
    spaceOr = ' ';
  }

  let data = fs.readFileSync(path.resolve(fPath), 'utf-8');
  let dataList = data.split('\n');
  let newData = [];
  let STR = false; // has text
  dataList.forEach(d => {
    if (!reg(d)) {
      // srt style Or empty line
      newData.push(d);
      STR = false;
    } else {
      // string text
      if (!STR) {
        newData.push(d);
      } else {
        let lastIdx = newData.length - 1;
        let last = newData[lastIdx];
        newData[lastIdx] = `${last.trimEnd()}${spaceOr}${d}`;
      }
      STR = true;
    }
  });

  fs.writeFileSync(
    path.join(process.cwd(), process.argv[3]),
    newData.join('\n')
  );
}
