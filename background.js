chrome.runtime.onInstalled.addListener(function() {
  // Set up a listener for the browser action click event
  chrome.action.onClicked.addListener(function(tab) {
    // Get the current tab's title and URL
    var title = tab.title;
    var url = tab.url;

    // Get the user's OAuth2 access token
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      // Send the email using the Gmail API
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      headers.append('Content-Type', 'application/json');

      var message = {
        to: 'natepuls@gmail.com',
        subject: title,
        body: url
      };

      fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          raw: btoa(
            'To: ' + message.to + '\r\n' +
            'Subject: ' + message.subject + '\r\n\r\n' +
            message.body
          )
        })
      }).then(function(response) {
        console.log('Email sent:', response);
      }).catch(function(error) {
        console.error('Error sending email:', error);
      });
    });
  });
});
