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

      var imageEl = document.getElementById('imgBlkFront') || document.getElementById('ebooksImgBlkFront')
      var imageUrl = imageEl ? imageEl.src : null
      imageUrl = imageUrl.match(/^http/) ? imageUrl : null

      const authorEls = document.getElementsByClassName('author')
      const authors = [].slice.call(authorEls).map(function(author) {
        authorEl = author.querySelector('.contributorNameID') || author.querySelector('a')
        return authorEl && authorEl.innerText.trim()
      }).join(", ")

      const entry = {
        isbn: isbn,
        title: title,
        imageUrl: imageUrl,
        authors: authors
      }

      if (item.innerText.match(/Not Enabled/)) {
        entry.lendable = false
        addNotLendableBlock()
        saveBook(entry)
      } else if (item.innerText.match(/Enabled/)) {
        entry.lendable = true
        addLendableBlock()
        saveBook(entry)
      }
    }
  }
}