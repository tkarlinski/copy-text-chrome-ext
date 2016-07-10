/**
 * Remove scripts as js, css and special chars
 *
 * @param {string} html
 * @return {string}
 */
function removeScripts(html)
{
    html = html.replace(/\<script[.\s\S]*?\<\/script\>/g, '');
    html = html.replace(/\<noscript[.\s\S]*?\<\/noscript\>/g, '');
    html = html.replace(/\<style[.\s\S]*?\<\/style\>/g, '');
    html = html.replace(/\&.*?\;/g, '');
    html = html.replace(/\&*/g, '');;
    return html;
}

/**
 * Strip html tags
 *
 * @param {string} html
 */
function stripTags(html)
{
    return html.replace(/<(?:.|\n)*?>/gm, '');
}

/**
 * Remove white chars
 *
 * @param string
 * @return {string}
 */
function stringTrim(string) {
    return string.replace(/[\s\n\r]{2,}]/gm,'');
}

/**
 * @param {string} text
 */
function sendTextByRawXhr(text)
{
    chrome.runtime.sendMessage({
        method: 'POST',
        action: 'xhttp',
        url: 'http://api.lang-master.lh/index.php/text',
        data: 'tag=3&text="' + text + '"'
    }, function(responseText) {
        var responseObject = JSON.parse(responseText);
        var message = 'No information from api';

        if (typeof responseObject.error != 'undefined') {
            message = 'API error: \n' + responseObject.error;
        } else if (typeof responseObject.message != 'undefined') {
            message = 'Done \n API message: \n' + responseObject.message;
        }

        chrome.runtime.sendMessage({
            action: "getSource",
            source: message
        });
    });
}

/**
 * Convert DOM to html string
 *
 * @param {object} document_root
 * @return {string}
 */
function DOMtoString(document_root)
{
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

    return html;
}

/**
 * @param {string} html
 * @return {string}
 */
function htmlToText(html)
{
    var text = removeScripts(html);
    text = stringTrim(text);
    text = stripTags(text);
    return text;
}

var text = htmlToText(DOMtoString(document));

sendTextByRawXhr(text);
