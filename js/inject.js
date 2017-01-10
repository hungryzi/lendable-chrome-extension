function buildBlock(text, titleColor) {
  var title = document.createElement('h5')
  title.setAttribute('style', 'color: ' + titleColor)
  title.setAttribute('class', 'a-text-bold')
  title.appendChild(document.createTextNode(text))

  var div = document.createElement('div')
  div.setAttribute('style', 'margin-bottom: 11px;')
  div.appendChild(title)

  return div
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function getItem(isbn) {
  const items = getItems()
  for (var i = 0, len = items.length; i !== len; i++) {
    var item = items[i]
    if (item.getAsin() !== isbn) continue;

    return {
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

function getLoanActionEl(row) {
  return row.querySelector('#contentAction_loanTitle_myx')
}

function getTitleEl(row) {
  var index = /\d+/.exec(row.id)
  return row.querySelector('#title' + index)
}

function getImageUrl(row) {
  var wrapper = row.getElementsByClassName('contentImage_myx')[0]
  return wrapper && wrapper.attributes['ui.load-src'].value;
}

function getIsbn(row) {
  var matches = /contentTabList_(\w*)/.exec(row.attributes.name.value)
  return matches && matches[1]
}

var processRow = function(row) {
  var button = row.getElementsByTagName('button')[0]
  var isbn = getIsbn(row)
  var item = getItem(isbn)
  var index = /\d+/.exec(row.id)
  const titleEl = row.querySelector('#title' + index)
  const loanable = item.loanable

  console.log(item)

  // saveBook(isbn, loanable, item.title, item.imageUrl)

  var div = loanable ? buildBlock('Lendable', '#04b121') : buildBlock('Not Lendable', '#000')
  titleEl.parentNode.appendChild(div)
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