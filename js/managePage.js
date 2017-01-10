function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('/js/inject.js'), 'body');
console.log('finished injecting')

// MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// function getLoanActionEl(row) {
//   return row.querySelector('#contentAction_loanTitle_myx')
// }

// function getTitleEl(row) {
//   var index = /\d+/.exec(row.id)
//   return row.querySelector('#title' + index)
// }

// function getImageUrl(row) {
//   var wrapper = row.getElementsByClassName('contentImage_myx')[0]
//   return wrapper && wrapper.attributes['ui.load-src'].value;
// }

// function getIsbn(row) {
//   var matches = /contentTabList_(\w*)/.exec(row.attributes.name.value)
//   return matches && matches[1]
// }

// var processRow = function(row) {
//   var button = row.getElementsByTagName('button')[0]

//   if (button) {
//     // button.click()

//     var loanAction = getLoanActionEl(row)
//     var isbn = getIsbn(row)

//     var titleEl = getTitleEl(row)
//     var title = titleEl ? titleEl.innerText.trim() : null

//     var imageUrl = getImageUrl(row)

//     var loanable = loanAction // && !(loanAction.offsetWidth <= 0 && loanAction.offsetHeight <= 0)
//     console.log(isbn, loanable, title, imageUrl)
//     saveBook(isbn, loanable, title, imageUrl)

//     var div = loanable ? buildBlock('Lendable', '#04b121') : buildBlock('Not Lendable', '#000')
//     titleEl.parentNode.appendChild(div)
//   }
// }

// var observerForRows = new MutationObserver(function(mutations, observer) {
//   for (var i = 0, len = mutations.length; i !== len; i++) {
//     var mutation = mutations[i]

//     for (var j = 0, lenJ = mutation.addedNodes.length; j !== lenJ; j++) {
//       var node = mutation.addedNodes[j]

//       if (node.className && node.className.match(/contentTableListRow_myx/)) {
//         var row = node.querySelector('[id^="contentTabList_"]')
//         if (row) processRow(row)
//       }
//     }
//   }
// });

// var observerForContainer = new MutationObserver(function(mutations, observer) {
//   for (var i = 0, len = mutations.length; i !== len; i++) {
//     var mutation = mutations[i]

//     if (mutation.target.tagName === 'UL' && mutation.target.className.match(/nav nav-grid/)) {
//       var ul = mutation.target

//       observerForRows.observe(ul, { childList: true });
//       observerForContainer.disconnect()

//       var wrappedRows = ul.getElementsByClassName('contentTableListRow_myx')
//       for (var j = 0, lenJ = wrappedRows.length; j !== lenJ; j++) {
//         var row = wrappedRows[j].querySelector('[id^="contentTabList_"]')
//         if (row) processRow(row)
//       }

//       return
//     }
//   }
// });

// observerForContainer.observe(document.getElementById('ng-app'), {
//   childList: true,
//   subtree: true
// });