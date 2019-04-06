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
  let data = fs.readFileSync(path.resolve(process.argv[2]), 'utf-8');
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
        newData[lastIdx] += ` ${d}`;
      }
      STR = true;
    }
  });
  
  fs.writeFileSync(path.join(process.cwd(), process.argv[3]), newData.join('\n'));
}
