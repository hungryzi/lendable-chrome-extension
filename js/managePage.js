function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript(chrome.extension.getURL('/js/inject.js'), 'body');

function processItem(item) {
  const index = item.index
  delete item.index

  const titleEl = document.querySelector('#title' + index)
  const loanable = item.loanable
  const title = item.title

  saveBook(item)

  var div = loanable ? buildLendableBlock(title, 'Lend this book on ') : buildNotLendableBlock()
  titleEl.parentNode.appendChild(div)
}

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "LENDABLE_FROM_PAGE")) {
    processItem(event.data.item)
  }
}, false);