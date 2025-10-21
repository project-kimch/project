function open_img(url) {
    try {
        var left = Math.floor((screen.availWidth - 250) / 2);
        var top = Math.floor((screen.availHeight - 100) / 2);

        try {
            tatterImagePopup.close();
        } catch (e) {
        }

        tatterImagePopup = window.open("", "", "width=250, height=100, left=" + left + ", top=" + top + ", scrollbars=no, resizable=yes");
        tatterImagePopup.document.open("text/html", "replace");
        tatterImagePopup.document.write(`
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
                <head>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
                    <meta http-equiv="imagetoolbar" content="no" /> 
                    <title> :: View :: </title>
                    <style type="text/css">
                        html, body { width: 100%; height: 100%; margin: 0; padding: 0; cursor: pointer; text-align: center; line-height: 0; }
                        div { width: 100%; height: 100%; overflow: auto; }
                    </style>
                    <script type="text/javascript">
                        ${navigator.userAgent.indexOf("Safari") > -1 ? `function resizeImage() {` : `window.onload = function() {`}
                            var container = document.getElementById("Container");
                            var image = document.getElementById("Image");
                            var resizeWidth = 0, resizeHeight = 0, positionTop = 0, positionLeft = 0;
                            var offsetTop = window.screenTop || window.screenY;
                            var offsetLeft = window.screenLeft || window.screenX;
                            if (navigator.userAgent.indexOf("Safari") > -1) {
                                var width = Math.min(image.width + 50, screen.availWidth - 100);
                                var height = Math.min(image.height + 50, screen.availHeight - 100);
                                window.moveTo((screen.availWidth - width) / 2, (screen.availHeight - height) / 2);
                                window.resizeTo(width, height);
                                return;
                            }
                            if (container.scrollWidth > container.offsetWidth) {
                                resizeWidth += container.scrollWidth - container.offsetWidth;
                                if (container.offsetWidth + resizeWidth + 100 > screen.availWidth) {
                                    resizeWidth = screen.availWidth - container.offsetWidth - 100;
                                    positionLeft = -resizeWidth / 2;
                                    resizeHeight += 20;
                                }
                                else {
                                    positionLeft = -resizeWidth / 2;
                                }
                            }
                            if (container.scrollHeight > container.offsetHeight) {
                                resizeHeight += container.scrollHeight - container.offsetHeight;
                                if (container.offsetHeight + resizeHeight + 100 > screen.availHeight - 50) {
                                    resizeHeight = screen.availHeight - container.offsetHeight - 100 - 40;
                                    positionTop = -resizeHeight / 2;
                                    resizeWidth += 20;
                                }
                                else {
                                    positionTop = -resizeHeight / 2;
                                }
                            }
                            if (resizeWidth == 0 && resizeHeight == 0)
                                image.style.marginTop = ((container.offsetHeight - image.height) / 2) + "px";
                            window.moveBy(positionLeft, positionTop - 35);
                            window.resizeBy(resizeWidth, resizeHeight);
                        }
                    </script>
                </head>
                <body>
                    ${navigator.userAgent.indexOf("Safari") > -1
            ? `<div id="Container"><img id="Image" src="${url}" alt="" onclick="window.close();" onload="resizeImage();"/></div>`
            : `<div id="Container"><img id="Image" src="${url}" onclick="window.close();" alt=""/></div>`
        }
                    
                    <script type="text/javascript">
                        document.oncontextmenu = new Function ('return false');
                        document.ondragstart = new Function ('return false');
                        document.onselectstart = new Function ('return false');
                    </script>
                </body>
            </html>
        `);
        tatterImagePopup.document.close();
        if (tatterImagePopup.document.focus)
            tatterImagePopup.document.focus();
    } catch (e) {
        window.open(url, "_blank");
    }
}
