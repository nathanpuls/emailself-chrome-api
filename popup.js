function sendEmail() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var subject = tab.title;
    var body = tab.url;
    var url = "https://mail.google.com/mail/?view=cm&fs=1&to=&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    chrome.runtime.sendMessage({
      action: "sendEmail",
      subject: subject,
      body: body
    });
  });
}
