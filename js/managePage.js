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

  saveBook(item.isbn, loanable, item.title, item.imageUrl)

  var div = loanable ? buildBlock('Lendable', '#04b121') : buildBlock('Not Lendable', '#000')
  titleEl.parentNode.appendChild(div)
}

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "LENDABLE_FROM_PAGE")) {
    processItem(event.data.item)
  }
}, false);