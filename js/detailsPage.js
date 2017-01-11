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
  var notLendableContent = buildNotLendableBlock()
  addBlock(notLendableContent)
}

function addLendableBlock() {
  var title = document.getElementById('ebooksProductTitle').innerText
  var lendableContent = buildLendableBlock(title, 'Search on ')
  addBlock(lendableContent)
}

if (detailsTable = document.getElementById('productDetailsTable')) {
  var isbn = undefined
  var items = detailsTable.getElementsByTagName('li')
  for (item of items) {
    if (item.innerText.match(/ASIN/)) {
      isbn = item.childNodes[1].textContent.trim()
    }

    if (item.innerText.match(/Lending/)) {
      var titleEl = document.getElementById('ebooksProductTitle')
      var title = titleEl ? titleEl.innerText.trim() : null

      var imageEl = document.getElementById('imgBlkFront')
      var imageUrl = imageEl ? imageEl.src : null

      if (item.innerText.match(/Not Enabled/)) {
        addNotLendableBlock();
        if (isbn) {
          saveBook(isbn, false, title, imageUrl)
        }
      } else if (item.innerText.match(/Enabled/)) {
        addLendableBlock();
        if (isbn) {
          saveBook(isbn, true, title, imageUrl)
        }
      }
    }
  }
}