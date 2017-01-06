function saveBook(isbn, lendable, title = null, imageUrl = null) {
  firebase.database().ref('isbn/' + isbn).set({
    lendable: lendable,
    url: window.location.href,
    title: title,
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