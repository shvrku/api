const u = 'https://api.sharkyfb.repl.co'; 
fetch(u)
.then(response => response.text())
.then(data => {
  if (data === 'No') {

    document.body.innerHTML = '<h1>Access Denied</h1><p>Sorry, the content is not available.</p>';
  }
})
