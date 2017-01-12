function saveBook(isbn, lendable, title = null, imageUrl = null) {
  let entry = firebase.database().ref('isbn/' + isbn)
  entry.update({
    lendable: lendable,
    url: window.location.href,
    title: title,
    imageUrl: imageUrl,
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

function buildLendableBlock(title, prefix) {
  var encodedTitle = encodeURI(title)

  var booklendingUrl = 'http://www.booklending.com/borrow-book.htm?search=' + encodedTitle
  var booklendingLink = createLink(booklendingUrl, prefix + 'BookLending.com')

  var lendleUrl = 'http://lendle.me/books/available/?title=' + encodedTitle
  var lendleLink = createLink(lendleUrl, prefix + 'Lendle.me')

  var div = buildBlock('Lendable', '#04b121')
  div.appendChild(booklendingLink)
  div.appendChild(document.createElement('br'))
  div.appendChild(lendleLink)

  return div
}

function buildNotLendableBlock() {
  return buildBlock('Not Lendable', '#000')
}

function createLink(url, label) {
  var anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('class', 'a-size-mini')
  anchor.setAttribute('target', '_blank')
  anchor.setAttribute('onclick', 'window.open("' + url + '", "_blank")')
  var text = document.createTextNode(label);
  anchor.appendChild(text);
  return anchor;
}