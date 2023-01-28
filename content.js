/* This runs after a web page loads */
// This script injects an element at the top of the page.
// It doesn't work yet. To make it work, handle the TODO.

// Create an image
const elementFactory = (aid) => {
  const element = document.createElement('a');
  element.textContent = 'asdvkjnasdl;kna'
  element.textContent = 'bibCopy'
  element.href = 'undefined'
  element.onclick = (e) => {
    e.preventDefault();
    console.log('bibtexted')
    fetch(`https://scholar.google.com/scholar?q=info:${aid}:scholar.google.com/&output=cite&scirp=0&hl=en`, {
      "headers": {
        'Access-Control-Allow-Origin': '*',
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-data": "CIjnygE=",
        "x-requested-with": "XHR"
      },
      "referrer": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&q=dependabot&btnG=&oq=",
      "referrerPolicy": "origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(a => a.text()).then((b) => {
      const parser = new DOMParser();
      for (const url of parser.parseFromString(b, 'text/html').querySelectorAll('a')) {
        if (url.innerText == 'BibTeX') {
          console.log(url)
          console.log('bib')
          fetch("https://farlab.infosci.cornell.edu/scholar", {
            headers: { 'Content-Type': 'application/json' },
            "body": url.href,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
          })
            .then(a => a.text()).then(b => navigator.clipboard.writeText(b))
        }
      }
    })
  }
  return element
}

// const CiteBarList = document.querySelectorAll('.gs_or_cit.gs_or_btn.gs_nph')
const results = document.querySelectorAll('div.gs_r.gs_or.gs_scl')

results.forEach(n => {
  console.log(n.dataset.did)
  const parent = n.querySelector('.gs_or_cit.gs_or_btn.gs_nph')
  parent.insertAdjacentElement('beforebegin', elementFactory(n.dataset.aid))
})
