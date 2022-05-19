function downloadTemplate(i) {
  // Download Icon Click
  document.getElementsByClassName('Y2SkMErw')[i].click();
  setTimeout(function () {
    document.getElementsByClassName('iEYI9kqz')[0].click();
    document.getElementsByClassName('BaqMDxgp XRaktsFq dp4yRDc1')[0].click();
  }, 1500);
  setTimeout(function () {
    document.getElementsByClassName('BaqMDxgp XRaktsFq dp4yRDc1')[0].click();
  }, 3000);
  document.getElementsByClassName('BaqMDxgp XRaktsFq dp4yRDc1')[0].click();
}

var j = 0;

var interval = setInterval(function () {
  if (j <= 47) {
    downloadTemplate(j);
    j++;
  } else {
    clearInterval(interval);
  }
}, 6000);
