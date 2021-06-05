new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 1000);
}).then(() =>{
    var elInfo = document.getElementsByClassName('VideoMetaInfo');
    var injStyle = document.createElement('style');
    injStyle.innerText = '.countOuter{display:none;}';
    for(var i = 0; i < elInfo.length; i++)
    {	
        elInfo[i].shadowRoot.append(injStyle);
    }
    var elList = document.getElementsByClassName('videoListFrame');
    var injStyle2 = document.createElement('style');
    injStyle2.innerText ='.counter{display:none}';
    for(var i = 0; i < elList.length; i++)
    {
        var head = elList[i].contentWindow.document.getElementsByTagName('head')[0];
        head.appendChild(injStyle2);
        console.log(head);
    }
});
