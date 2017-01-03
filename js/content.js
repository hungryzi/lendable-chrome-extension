function createLink(url, name) {
  var anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('class', 'a-size-mini')
  anchor.setAttribute('target', '_blank')
  var text = document.createTextNode('Search on ' + name);
  anchor.appendChild(text);
  return anchor;
}

function buildLendableContent(title) {
  var encodedTitle = encodeURI(title)

  var booklendingUrl = 'http://www.booklending.com/borrow-book.htm?search=' + encodedTitle
  var booklendingLink = createLink(booklendingUrl, 'BookLending.com')

  var lendleUrl = 'http://lendle.me/books/available/?title=' + encodedTitle
  var lendleLink = createLink(lendleUrl, 'Lendle.me')

  var div = buildBlock('Lendable', '#04b121')
  div.appendChild(booklendingLink)
  div.appendChild(document.createElement('br'))
  div.appendChild(lendleLink)

  return div
}

function buildBlock(text, titleColor) {
  var title = document.createElement('h5')
  title.setAttribute('style', 'color: ' + titleColor)
  title.setAttribute('class', 'a-text-bold')
  title.appendChild(document.createTextNode(text))

  var div = document.createElement('div')
  div.setAttribute('style', 'padding: 0 11px;')
  div.appendChild(title)

  return div
}

function addNotLendableBlock() {
  var lendableContent = buildBlock('Not Lendable', '#000')
  var swatches = document.getElementById('tmmSwatches')
  if (swatches && (divParent = swatches.getElementsByClassName('selected')[0])) {
    divParent.appendChild(lendableContent)
  }
}

function addLendableBlock() {
  var title = document.getElementById('ebooksProductTitle').innerText
  var lendableContent = buildLendableContent(title)
  var swatches = document.getElementById('tmmSwatches')
  if (swatches && (divParent = swatches.getElementsByClassName('selected')[0])) {
    divParent.appendChild(lendableContent)
  }
}

if (detailsTable = document.getElementById('productDetailsTable')) {
  var items = detailsTable.getElementsByTagName('li');
  for (item of items) {
    if (item.innerText.match(/Lending/)) {
      var span = document.createElement('span');
      if (item.innerText.match(/Not Enabled/)) {
        // POST as not lendable
        addNotLendableBlock();
      } else if (item.innerText.match(/Enabled/)) {
        // POST as lendable
        addLendableBlock();
      }
    }
  }
}