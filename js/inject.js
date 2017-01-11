MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function report(item) {
  window.postMessage({ type: "LENDABLE_FROM_PAGE", item }, "*");
}

function getItem(row) {
  const index = /\d+/.exec(row.id)
  const isbn = getIsbn(row)

  const items = getItems()
  for (var i = 0, len = items.length; i !== len; i++) {
    var item = items[i]
    if (item.getAsin() !== isbn) continue;

    return {
      isbn: isbn,
      index: index,
      title: item.getTitle(),
      loanable: item.canLoan(),
      imageUrl: item.getImage(),
    }
  }
}

function getItems() {
  var injector = angular.element('#ng-app').injector()
  const content = injector.get('content_fmyx');
  return content.getContent();
}

function getIsbn(row) {
  var matches = /contentTabList_(\w*)/.exec(row.attributes.name.value)
  return matches && matches[1]
}

var processRow = function(row) {
  const item = getItem(row)
  report(item)
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

var observerForContainer = new MutationObserver(function(mutations, observer) {
  for (var i = 0, len = mutations.length; i !== len; i++) {
    var mutation = mutations[i]

    if (mutation.target.tagName === 'UL' && mutation.target.className.match(/nav nav-grid/)) {
      var ul = mutation.target

      observerForRows.observe(ul, { childList: true });
      observerForContainer.disconnect()

      var wrappedRows = ul.getElementsByClassName('contentTableListRow_myx')
      for (var j = 0, lenJ = wrappedRows.length; j !== lenJ; j++) {
        var row = wrappedRows[j].querySelector('[id^="contentTabList_"]')
        if (row) processRow(row)
      }

      return
    }
  }
});

observerForContainer.observe(document.getElementById('ng-app'), {
  childList: true,
  subtree: true
});