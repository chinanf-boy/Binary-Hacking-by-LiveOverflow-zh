// ==UserScript==
// @name my-auto-answer
// @namespace Violentmonkey Scripts
// @match https://account.bilibili.com/answer/base
// @grant none
// ==/UserScript==

(() => {
  const answer = (where) => {
    where ? console.log('load .......', window.location.href) :  console.log('hashChange .......', window.location.href)  ;

    let ns = [0, 1, 2, 3];
    let G;
    function seclect(n) {
      if (n == 0) {
        // first select answer
        let allUL = document.getElementsByClassName('key-list');
        if (!allUL.length) {
          setTimeout(() => {
            seclect(n);
          }, 1000);
          return;
        } else {
          console.log(allUL);
        }

        Array.from(allUL).forEach(ul => {
          ul.children[n].click();
        });
      } else {
        // last error answer

        console.log(
          'error length',
          document.getElementsByClassName('error active').length
        );
        Array.from(document.getElementsByClassName('error active')).forEach(
          li => {
            let p = li.parentElement;
            p.children[n].click(); // select next answer if last click error
          }
        );
        console.log('error change to', n, 'answer');
      }

      console.log('click', n);
      // next[0].children[0].click(); // click next part of Question
    }

    function ifExist(el) {
      if (!el) {
        G = setTimeout(function() {
          console.log('query again');
          ifExist(document.querySelector('.popup-btn'));
        }, 1000);
        console.log('not popup');
      } else {
        el.children[0].click();
        console.log('next num');
        setTimeout(() => {
          if (ns && ns.length) {
            seclect(ns.shift());
            ifExist(document.querySelector('.popup-btn'));
          }
        }, 3000);
      }
    }

    if (window.location.hash.includes('additional')) {
      seclect(0);
      ifExist(document.querySelector('.popup-btn'));
    } else if (window.location.hash.includes('promotion')) {
      G && G();
      setTimeout(() => {
        let l = document.querySelector('.type-list');
        console.log(l);
        Array.from(l.children).forEach(c => c.click());
        document.querySelector('.btn-width').click();
      }, 2000);
    }

    if (!window.location.hash.includes('additional')) {
      let next;
      setTimeout(() => {
        next = document.getElementsByClassName('footer-bottom');

        seclect(ns.shift());

        ifExist(document.querySelector('.popup-btn'));
      }, 1500);
    }
  };

  window.addEventListener('load', answer(true));
  window.addEventListener('hashchange', answer(false));
})();
