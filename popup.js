chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
    }
});

//,
//"http://api.lang-master.lh/index.php/text"

function sendTextByRawXhr(text)
{
    var message = '';
    var url = 'http://api.lang-master.lh/index.php/text';

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var res = xhttp.send("gat=3&text=testowytext");

    alert(res);

    return true;
}


function sendTextByXhr(text)
{
    //var message = '';
    //var url = 'http://api.lang-master.lh/index.php/text';
    //
    //var xhttp = new XMLHttpRequest();
    //xhttp.open("POST", url, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //var res = xhttp.send("gat=3&text=testowytext");
    //
    //alert(res);
    //
    //return true;
//Accept:*/*
// Accept-Encoding:gzip, deflate
// Accept-Language:pl-PL,pl;q=0.8,en-US;q=0.6,en;q=0.4
// Connection:keep-alive
// Content-Length:35163
// Content-Type:application/x-www-form-urlencoded; charset=UTF-8
// Host:api.lang-master.lh
// Origin:http://www.gazeta.pl
// Referer:http://www.gazeta.pl/0,0.html
// User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36



    //$.ajax({
    //    type: "POST",
    //    url: url,
    //    data: {
    //        text: text,
    //        tag: 3
    //    },
    //    success: function(data) {
    //        alert(data.message);
    //        console.log('data success', data);
    //        //chrome.runtime.sendMessage({
    //        //    action: "getSource",
    //        //    source: data.message
    //        //});
    //
    //        return 'ajax success';
    //    },
    //    error: function(xhr, status, err) {
    //        alert('error');
    //        //chrome.runtime.sendMessage({
    //        //    action: "getSource",
    //        //    source: err.toString()
    //        //});
    //
    //        return 'ajax error';
    //    }
    //});
    //
    //return message;
}


function onWindowLoad() {

    //alert('aaa');
    var message = document.querySelector('#message');

    console.log ('aaaaaa');

    chrome.tabs.executeScript(null, {
        file: "components/jquery/dist/jquery.js"
    });

    //alert('before execute script');

    chrome.tabs.executeScript(
        null,
        {
            file: "getPagesSource.js"
        },
        function(result) {
            //alert(result);

            //sendTextByXhr(result);

            console.log('result callback');

            console.log('chrome.runtime', chrome.runtime);

            console.log('result execute script', result);

            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            //if (chrome.runtime.lastError) {
            //    message.innerText = 'error inject script';
            //    //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            //}
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
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
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