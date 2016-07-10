chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
    }
});

function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null,
        {
            file: "getPagesSource.js"
        },
        function(result) {
            if (chrome.runtime.lastError) {
                message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            }
        }
    );
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});

window.onload = onWindowLoad;