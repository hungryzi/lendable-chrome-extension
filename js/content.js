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
  div.setAttribute('style', 'margin-bottom: 11px;')
  div.appendChild(title)

  return div
}

function addBlock(block) {
  var divParent = (buybox = document.getElementById('buybox')) && buybox.firstElementChild
  if (!divParent) {
    divParent = (mediabox = document.getElementById('mediaNoAccordion')) && mediabox.getElementsByClassName('header-price')[0].parentElement
  }
  if (divParent) {
    divParent.insertBefore(block, divParent.firstElementChild)
  }
}

function addNotLendableBlock() {
  var notLendableContent = buildBlock('Not Lendable', '#000')
  addBlock(notLendableContent)
}

function addLendableBlock() {
  var title = document.getElementById('ebooksProductTitle').innerText
  var lendableContent = buildLendableContent(title)
  addBlock(lendableContent)
}

function saveBook(isbn, lendable) {
  firebase.database().ref('isbn/' + isbn).set({
    lendable: lendable,
    url: window.location.href,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

var config = {
  apiKey: "AIzaSyC81fHoJ90ADQiz2WKp3mct-IOx2MmNk5k",
  authDomain: "lendable-test.firebaseapp.com",
  databaseURL: "https://lendable-test.firebaseio.com",
  storageBucket: "lendable-test.appspot.com",
  messagingSenderId: "715069538915"
};
firebase.initializeApp(config);

if (detailsTable = document.getElementById('productDetailsTable')) {
  var isbn = undefined
  var items = detailsTable.getElementsByTagName('li')
  for (item of items) {
    if (item.innerText.match(/ASIN/)) {
      isbn = item.childNodes[1].textContent.trim()
    }

    if (item.innerText.match(/Lending/)) {
      var title = document.getElementById('ebooksProductTitle').innerText
      if (item.innerText.match(/Not Enabled/)) {
        addNotLendableBlock();
        if (isbn) {
          saveBook(isbn, false)
        }
      } else if (item.innerText.match(/Enabled/)) {
        addLendableBlock();
        if (isbn) {
          saveBook(isbn, true)
        }
      }
    }
  }
}