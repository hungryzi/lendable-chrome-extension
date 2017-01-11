function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript(chrome.extension.getURL('/js/inject.js'), 'body');

function processItem(item) {
  const titleEl = document.querySelector('#title' + item.index)
  const loanable = item.loanable
  const title = item.title

  saveBook(item.isbn, loanable, title, item.imageUrl)

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