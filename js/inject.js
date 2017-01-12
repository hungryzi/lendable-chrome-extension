MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function report(item) {
  window.postMessage({ type: "LENDABLE_FROM_PAGE", item }, "*");
}

function getItem(row) {
  const index = /\d+/.exec(row.id)
  const items = getItems()
  const item = items[index]

  return {
    index: index,
    isbn: item.getAsin(),
    title: item.getTitle(),
    lendable: item.canLoan(),
    imageUrl: item.getImage(),
    authors: item.getAuthors(),
  }
}

function getItems() {
  var injector = angular.element('#ng-app').injector()
  const content = injector.get('content_fmyx');
  return content.getContent();
}

function processRow(row) {
  report(getItem(row))
}

var observerForRows = new MutationObserver(function(mutations, observer) {
  for (var i = 0, len = mutations.length; i !== len; i++) {
    var mutation = mutations[i]

    for (var j = 0, lenJ = mutation.addedNodes.length; j !== lenJ; j++) {
      var node = mutation.addedNodes[j]

      if (node.className && node.className.match(/contentTableListRow_myx/)) {
        var row = node.querySelector('[id^="contentTabList_"]')
        if (row) processRow(row)
      }
    }
  }
});

function processUl(ul) {
  observerForRows.observe(ul, { childList: true });
  // observerForContainer.disconnect()

  var wrappedRows = ul.getElementsByClassName('contentTableListRow_myx')
  for (var j = 0, lenJ = wrappedRows.length; j !== lenJ; j++) {
    var row = wrappedRows[j].querySelector('[id^="contentTabList_"]')
    if (row) processRow(row)
  }

  ul.className += ' lendable_processed';
}

function isUnprocessedUl(node) {
  return node.tagName === 'UL' &&
    node.className.match(/nav nav-grid/) &&
    !node.className.match(/lendable_processed/)
}

var observerForContainer = new MutationObserver(function(mutations, observer) {
  for (var i = 0, len = mutations.length; i !== len; i++) {
    var mutation = mutations[i]

    if (isUnprocessedUl(mutation.target)) {
      processUl(mutation.target)
      return
    }
  }
});

observerForContainer.observe(document.getElementById('ng-app'), {
  childList: true,
  subtree: true
});