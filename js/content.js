function modifyContent(text) {
  // console.log('modifyContent', text)
  var span = document.createElement('span');
  var t = document.createTextNode(text);
  btn.appendChild(t);
  document.body.appendChild(btn);
}

if (detailsTable = document.getElementById('productDetailsTable')) {
  // console.log('detailsTable', detailsTable)
  var items = detailsTable.getElementsByTagName('li');
  // console.log('items', items)

  for (item of items) {
    if (item.innerText.match(/Lending/)) {
      // console.log('Lending', item)
      var span = document.createElement('span');
      if (item.innerText.match(/Not Enabled/)) {
        modifyContent('Not Enabled');
      } else if (item.innerText.match(/Enabled/)) {
        modifyContent('Enabled');
      }
    }
  }
}