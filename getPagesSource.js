var result;

function removeScripts(html)
{
    html = html.replace(/\<script[.\s\S]*?\<\/script\>/g, '');
    html = html.replace(/\<noscript[.\s\S]*?\<\/noscript\>/g, '');
    html = html.replace(/\<style[.\s\S]*?\<\/style\>/g, '');
    return html.replace(/\&.*?\;/g, '');
}

function stripTags(html)
{
    return html.replace(/<(?:.|\n)*?>/gm, '');
}

function stringTrim(string) {
    return string.replace(/^\s+|\s+$/gm,'');
}

function sendTextByXhr(text)
{
    var message = '';
    var url = 'http://api.lang-master.lh/index.php/text';

    $.ajax({
        type: "POST",
        url: url,
        data: {
            text: text,
            tag: 3
        },
        success: function(data) {
            alert(data.message);
            console.log('data success', data);
            //chrome.runtime.sendMessage({
            //    action: "getSource",
            //    source: data.message
            //});

            return 'ajax success';
        },
        error: function(xhr, status, err) {
            alert('error: ' + err.toString());
            //chrome.runtime.sendMessage({
            //    action: "getSource",
            //    source: err.toString()
            //});

            return 'ajax error';
        }
    });

    return message;
}

function sendTextByRawXhr(text)
{
    text = 'va=123&fsdf=4';

    chrome.runtime.sendMessage({
        method: 'POST',
        action: 'xhttp',
        url: 'http://api.lang-master.lh/index.php/text',
        data: 'tag=3&text="' + text + 'h"'
    }, function(responseText) {
        console.log('responseText', responseText);

        chrome.runtime.sendMessage({
            action: "getSource",
            source: responseText
        });
        /*Callback function to deal with the response*/
    });
}


function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
        }
        node = node.nextSibling;
    }

    var text = removeScripts(html);
    text = stringTrim(text);
    text = stripTags(text);



    //sendTextByXhr(text);

    return text;
}

function main() {
    var text = DOMtoString(document);

    sendTextByRawXhr(text);

    console.log('111');
    //
    chrome.runtime.sendMessage({
        action: "getSource",
        source: DOMtoString(document)
    });

    console.log('222');

    return text;
}
main();


