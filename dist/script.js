(function () {

    /* TV screen with 1972 to 1974 BBC Analogue Clock & logo - kurt.grigg@yahoo.co.uk */

    /* ^^^^^^^^^^^^^^^^^^^ Config below ^^^^^^^^^^^^^^^^^^^ */

    var clockSize = 1000;
    var bbcLogoColour = 'rgb(80,171,255)';
    var side = 1; //BBC1 or BBC2

    /* ^^^^^^^^^^^^^^^^^^^ End config ^^^^^^^^^^^^^^^^^^^ */

    var d = document;
    var mls = 100;
    var prev = performance.now();

    var sSpan = '.4s';
    var mSpan = '.5s';
    var hSpan = '.3s';

    var sIncr = 0;
    var mIncr = 0;
    var hIncr = 0;
    var sDeg, mDeg, hDeg, sPre, mPre, hPre;
    var idx = d.getElementsByTagName('div').length;
    var eiatf = 'translateZ(0); animation-timing-function: ease-in';
    var eoatf = 'translateZ(0); animation-timing-function: ease-out';

    function xy(a) {
        return (a * clockSize / 100);
    }

    var container = d.createElement('div');
    container.setAttribute('style', 'display: inline-block;'
        +'position: relative;'
        +'height: 100%;'
        +'width: 100%;'
        +'text-align: center;'
        +'margin: 0;padding-top:'+xy(6)+'px;'
        +'background-color: rgba(60,30,240,1.0);'
        +'background-image: radial-gradient(ellipse closest-corner at center, transparent 0%, rgba(0,0,0,0.4) 100%);'
        +'overflow: hidden;');
    d.body.appendChild(container);

    var dial = d.createElement('div');
    dial.setAttribute('style', 'display: inline-block;'
        +'position: relative;'
        +'height: '+xy(40)+'px;'
        +'width: '+xy(40)+'px;'
        +'margin: 0; padding: 0;'
        +'border-radius: 50%;'
        +'overflow: hidden;');
    container.appendChild(dial);

    var face = '<svg id="ticks'+idx+'" xmlns="http://www.w3.org/2000/svg"'+ 
        'viewBox="0 0 200 200" width="100%" height="100%">'+
        '<defs>'+
        '<clipPath id="dialPath">'+
         '<circle cx="100" cy="100" r="100"/>'+
        '</clipPath>'+
        '</defs>'+
        '<circle cx="100" cy="100" r="16" fill="none" stroke="'+bbcLogoColour+'" stroke-width="5"/>'+
        '</svg>';
    dial.innerHTML = face;

    for (var i = 0; i < 12; i++) {
        var tickLength = 28;
        var tickWidth = ( 2.5 + (i * 0.5) )
        var gap = (tickWidth / 2 ) + 1.2;
        var tickLeftPos =  100 - gap;
        var tickRightPos =  100 + gap; 
   
        var tickRight = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        with(tickRight) {
            setAttribute('x1', tickRightPos);
            setAttribute('y1', '1');
            setAttribute('x2', tickRightPos);
            setAttribute('y2', tickLength);
            setAttribute('stroke', bbcLogoColour);
            setAttribute('stroke-width', tickWidth);
            setAttribute('stroke-linecap', 'butt');
            setAttribute("clip-path", "url(#dialPath)");
            setAttribute( "transform","rotate("+(i+1) * 30+", 100, 100)");
        }
 
        var tickLeft = tickRight.cloneNode(true);
        tickLeft.setAttribute('x1', tickLeftPos);
        tickLeft.setAttribute('x2', tickLeftPos);

        d.getElementById('ticks'+idx).appendChild(tickRight);
        d.getElementById('ticks'+idx).appendChild(tickLeft);
    }

    /* Generic hand container CSS */   

    var handContainers = 'display: block;'
        +'position: absolute;'
        +'height: 100%;'
        +'width: 100%;'
        +'font-size: 0px; line-height: 0px; padding: 0;'
        +'margin: auto; top: 0;bottom: 0; left: 0; right: 0;'
        +'transform-origin: center center; overflow: hidden;'; 

    /* Hour CSS */

    var hClone = handContainers;
    var houHand = d.createElement('div');
    houHand.setAttribute('style', hClone);
    dial.appendChild(houHand);
    var hh = d.createElement('div');
    hh.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: 29%;'
        +'width: 4%;' 
        +'top: 13%;'
        +'font-size: 0px;line-height: 0px;padding: 0;'
        +'outline: 1px solid transparent;'
        +'margin: auto; left: 0; right: 0;'
        +'border-radius: '+xy(0.4)+'px '+xy(0.4)+'px 0px 0px;'
        +'background-color: '+bbcLogoColour+';');
    houHand.appendChild(hh);

    /* Minute CSS */

    var mClone = handContainers;
    var minHand = d.createElement('div');
    minHand.setAttribute('style', mClone);
    dial.appendChild(minHand);
    var mh = d.createElement('div');
    mh.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: 41%;'
        +'width: 2.7%;' 
        +'top: 1%;'
        +'font-size: 0px;line-height: 0px;padding: 0;'
        +'outline: 1px solid transparent;'
        +'margin: auto; left: 0; right: 0;'
        +'border-radius: '+xy(0.3)+'px '+xy(0.3)+'px 0px 0px;'
        +'background-color: '+bbcLogoColour+';');
    minHand.appendChild(mh);

    /* Second CSS */

    var sClone = handContainers;
    var secHand = d.createElement('div');
    secHand.setAttribute('style', sClone);
    dial.appendChild(secHand);
    var sh = d.createElement('div');
    sh.setAttribute('style', 'display: block;'
        +'position: absolute;'
         +'height: 42%;'
        +'width: 1.6%;' 
        +'font-size: 0px;line-height: 0px;padding: 0;'
        +'outline: 1px solid transparent;'
        +'margin: auto; top: 0; left: 0; right: 0;'
        +'border-radius: '+xy(0.2)+'px '+xy(0.2)+'px 0px 0px;'
        +'background-color: '+bbcLogoColour+';');
    secHand.appendChild(sh);

    var secTail = d.createElement('div');
    secTail.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: 12%;'
        +'width: 1.6%;' 
        +'top: 58%;'
        +'font-size: 0px;line-height: 0px;padding: 0;'
        +'outline: 1px solid transparent;'
        +'margin: auto; left: 0; right: 0;'
        +'border-radius: 0px 0px '+xy(0.2)+'px '+xy(0.2)+'px;'
        +'background-color: '+bbcLogoColour+';');
    secHand.appendChild(secTail);

    function houKeyFrames() {
        var houSheet = (d.getElementById('tmphouSheet'+idx));
        if (houSheet) {
            houSheet.parentNode.removeChild(houSheet);
        }
        hClone = handContainers;
        var p1 = hDeg;
        var p2 = hDeg+1;
        var p3 = hDeg+0.4;
        var p4 = hDeg+1;
        var p5 = hDeg+0.5; 
        var p6 = hDeg+1; 
        var houframes = '@keyframes h'+idx+'gen'+hIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'30% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'45% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'60% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'70% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'80%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';
        var hs = document.createElement( 'style' );
        hs.setAttribute('id', 'tmphouSheet'+idx);
        hs.innerHTML = houframes;
        d.getElementsByTagName('head')[0].appendChild(hs);
        var houAni = 'animation: h'+idx+'gen'+hIncr+' '+hSpan+' 1 forwards;';
        hClone += houAni;
        houHand.setAttribute('style', hClone);
        dial.appendChild(houHand);
    }

    function minKeyFrames() {
        var minSheet = (d.getElementById('tmpMinSheet'+idx));
        if (minSheet) {
            minSheet.parentNode.removeChild(minSheet);
        }
        mClone = handContainers
        var p1 = mDeg;
        var p2 = mDeg+6;
        var p3 = mDeg+4;
        var p4 = mDeg+6;
        var p5 = mDeg+5; 
        var p6 = mDeg+6;
        var minframes = '@keyframes m'+idx+'gen'+mIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'30% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'45% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'60% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'70% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'80%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';
        var ms = document.createElement( 'style' );
        ms.setAttribute('id', 'tmpMinSheet'+idx);
        ms.innerHTML = minframes;
        d.getElementsByTagName('head')[0].appendChild(ms);
        var minAni = 'animation: m'+idx+'gen'+mIncr+' '+mSpan+' 1 forwards;';
        mClone += minAni;
        minHand.setAttribute('style', mClone);
        dial.appendChild(minHand);
    }

    function secKeyFrames() {
        var secSheet = (d.getElementById('tmpSecSheet'+idx));
        if (secSheet) {
            secSheet.parentNode.removeChild(secSheet);
        }
        sClone = handContainers;
        var p1 = sDeg;
        var p2 = sDeg+6;
        var p3 = sDeg+4.8;
        var p4 = sDeg+6;
        var p5 = sDeg+5.5; 
        var p6 = sDeg+6; 
        var secframes = '@keyframes s'+idx+'gen'+sIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'40% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'55% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'70% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'80% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'90%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';
        var ss = document.createElement( 'style' );
        ss.setAttribute('id', 'tmpSecSheet'+idx);
        ss.innerHTML = secframes;
        document.getElementsByTagName('head')[0].appendChild(ss);
        var secAni = 'animation: s'+idx+'gen'+sIncr+' '+sSpan+' 1 forwards;';
        sClone += secAni;
        secHand.setAttribute('style', sClone);
        dial.appendChild(secHand);
    }

    var bbcTwo = '<path fill="'+bbcLogoColour+'" d="M39.988 0c-.62 0-1.256.487-1.422 1.086L36.72 7.76c-.166.6.203 1.086.822 1.086h7.05c.62 0 1.257-.486 1.422-1.086l1.847-6.674c.167-.6-.2-1.086-.82-1.086h-7.052zm3.606 1.362c.715-.006 1.287.144 1.716.45.428.306.55.807.367 1.503-.174.516-.48.92-.918 1.208-1.002.65-2.353.972-3.577 1.506h3.662l-.307 1.454H38.82c.088-.348.23-.925.464-1.333.215-.373.51-.705.84-.984.446-.376.978-.642 1.5-.898.433-.212.9-.35 1.347-.524.277-.108.64-.172.75-.44.06-.142.01-.342-.118-.447-.128-.105-.326-.167-.502-.16-.314.013-.628.162-.874.36-.188.15-.353.275-.433.578h-1.88c.286-.88.85-1.298 1.462-1.692.61-.394 1.35-.588 2.22-.58z"/>';   

    var bbcOne = '<path fill="'+bbcLogoColour+'" d="M40.168 0c-.62 0-1.256.487-1.42 1.087L36.9 7.76c-.165.6.202 1.087.822 1.087h7.05c.62 0 1.257-.487 1.423-1.086l1.846-6.673c.167-.6-.2-1.087-.82-1.087h-7.052zm2.853 1.362h1.318L42.55 7.484H40.8l1.173-4.296H40.6l.268-.78a2.185 1.27 0 0 0 .005 0 2.185 1.27 0 0 0 2.15-1.045h-.002z"/>';

    var channel = (side == 1)?bbcOne:bbcTwo;

    var bbcLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 8.847">'+channel+'<path d="M93.78.2l-.062.23c.394.03.645.087.753.174.11.087.163.214.163.38 0 .175-.044.413-.13.716l-1.57 5.417c-.157.547-.332.9-.523 1.058-.186.157-.483.236-.89.236l-.075.232h4.066l.088-.23c-.406-.01-.674-.06-.803-.157-.128-.095-.193-.222-.193-.38 0-.17.054-.435.162-.796l.747-2.56c.405.03.867.022 1.34-.03l-.025.013c.234.22.237.242.167 1.677-.082 1.672.008 2.048.573 2.392.7.428 1.543.15 2.11-.694.208-.31.327-.602.306-.748-.052-.377-.367-.297-.624.158-.29.51-.512.656-.73.476-.126-.106-.16-.35-.163-1.17-.004-1.303-.106-1.742-.5-2.15-.046-.047-.09-.093-.127-.136.543-.145 1.054-.364 1.454-.678.473-.464.71-.985.71-1.562 0-.548-.203-.996-.61-1.345C98.983.373 98.28.2 97.28.2h-3.5zm2.99.49c.785.013 1.89.306 1.905 1.172-.015 1.42-1.508 2.267-3.077 2.285l1.02-3.455c.05-.002.1-.002.153 0zM85.03.2l-.07.23c.433.03.707.087.823.174.12.087.182.21.182.367 0 .163-.048.41-.144.742l-1.07 3.698c-.167.577-.25 1.013-.25 1.308 0 .186.05.42.15.697.1.274.243.504.43.69.186.188.48.356.878.505.398.15.86.224 1.382.224.92 0 1.68-.24 2.278-.716.598-.48 1.07-1.326 1.42-2.534l1.12-3.872c.14-.486.355-.835.642-1.046.178-.133.43-.212.76-.237l.055-.23h-2.857l-.07.23c.404 0 .67.047.798.142.183.137.274.334.274.592 0 .145-.03.328-.094.548l-1.1 3.83c-.217.733-.462 1.297-.736 1.692-.208.295-.47.525-.785.69-.31.163-.69.244-1.14.244-.49 0-.87-.127-1.145-.38-.273-.253-.41-.55-.41-.89 0-.374.09-.87.268-1.49l1.077-3.697c.145-.505.323-.845.535-1.02.215-.174.527-.26.933-.26l.076-.23h-4.208zm-15.01 0l-.07.23c.367.016.612.074.736.174.124.1.187.233.187.4 0 .17-.043.403-.13.702L69.17 7.13c-.157.543-.33.893-.515 1.05-.183.155-.476.232-.88.232l-.067.23h6.743l.934-2.366h-.26c-.445.627-.99 1.098-1.633 1.413-.638.315-1.302.472-1.99.472-.208 0-.36-.035-.455-.106-.092-.074-.137-.153-.137-.236 0-.137.09-.52.274-1.152l1.432-4.962c.15-.51.32-.85.51-1.015.196-.165.488-.252.878-.26l.07-.23h-4.054zM66.114.005c-.87 0-1.755.283-2.652.847-.892.56-1.602 1.31-2.13 2.248-.526.934-.79 1.862-.79 2.784 0 .456.104.925.31 1.407.213.482.53.862.948 1.14.42.278.968.417 1.65.417.912 0 1.684-.176 2.315-.53.834-.472 1.585-1.236 2.254-2.29.668-1.058 1.002-2.113 1.002-3.163 0-.468-.13-.934-.386-1.394-.254-.46-.61-.82-1.07-1.077-.458-.258-.94-.386-1.452-.386zm-.205.51c.314 0 .578.13.79.387.215.253.323.664.323 1.233 0 .91-.2 1.946-.604 3.112-.4 1.163-.916 2.045-1.55 2.647-.32.303-.708.454-1.165.454-.344 0-.627-.13-.847-.387-.22-.262-.33-.645-.33-1.152 0-.592.112-1.333.336-2.222.228-.888.47-1.59.728-2.103.258-.52.51-.918.76-1.196.25-.28.488-.476.716-.593.233-.12.513-.18.84-.18zm-7.304-.51c-.917 0-1.84.262-2.77.785-.926.52-1.635 1.202-2.13 2.05-.493.842-.74 1.728-.74 2.658 0 .99.31 1.797.928 2.415.622.614 1.442.92 2.46.92.758 0 1.4-.154 1.922-.466.528-.31 1.048-.853 1.563-1.625h-.3c-.415.486-.826.837-1.232 1.053-.407.215-.857.323-1.35.323-.61 0-1.093-.187-1.445-.56-.35-.378-.523-.924-.523-1.638 0-.796.16-1.603.48-2.42.393-1.01.875-1.76 1.443-2.25.57-.488 1.14-.733 1.712-.733.532 0 .96.18 1.29.54.33.358.51.902.54 1.633h.243L61.32.006h-.23c-.21.224-.42.336-.628.336-.104 0-.29-.037-.555-.112-.518-.15-.952-.224-1.3-.224zM81.413 0c-.872 0-1.756.282-2.652.847-.892.56-1.602 1.31-2.13 2.247-.526.934-.79 1.862-.79 2.783 0 .457.104.925.312 1.407.212.482.527.86.946 1.14.42.277.97.416 1.65.416.913 0 1.685-.176 2.316-.53.834-.472 1.585-1.235 2.254-2.29.668-1.058 1.002-2.113 1.002-3.162 0-.47-.13-.934-.386-1.395-.253-.46-.61-.82-1.07-1.077C82.406.13 81.923 0 81.413 0zm-.206.51c.316 0 .58.13.79.387.216.253.324.664.324 1.233 0 .91-.2 1.946-.602 3.112-.4 1.162-.916 2.045-1.55 2.646-.32.304-.708.455-1.165.455-.344 0-.627-.13-.847-.386-.22-.262-.33-.646-.33-1.152 0-.594.113-1.334.337-2.222.228-.89.47-1.59.728-2.105.26-.52.512-.917.76-1.195.25-.28.488-.476.717-.592.232-.12.512-.18.84-.18zM26.23 0c-.62 0-1.256.487-1.42 1.087L22.96 7.76c-.165.6.202 1.086.82 1.086h7.052c.62 0 1.257-.486 1.422-1.086l1.846-6.674C34.268.486 33.9 0 33.282 0H26.23zm2.722 1.155c.122-.002.24.003.352.012 1.064-.014 2.424.468 2.46 1.895.002.166-.008.358-.03.575l-.002.018h-1.906c.003-.332-.016-.952-.37-1.127-.43-.215-.94-.158-1.36.48-.225.36-.41.728-.514 1.102-.143.418-.208.795-.265 1.226-.05.49.026 1.105.663 1.122.85.08 1.205-.687 1.515-1.406l.014-.03h1.826l-.02.048c-.328 1.71-1.355 2.706-3.555 2.618-.44 0-.815-.044-1.125-.132-.305-.088-.556-.213-.753-.375-.197-.165-.34-.366-.434-.603-.092-.237-.14-.506-.147-.804-.002-.16.008-.347.03-.56.023-.22.06-.448.114-.688.057-.244.127-.492.21-.746.088-.254.193-.5.317-.737.128-.24.272-.466.43-.677.65-.905 1.7-1.2 2.552-1.21zM14.732 0c-.618 0-1.255.487-1.42 1.087L11.466 7.76c-.166.6.202 1.086.82 1.086h7.052c.62 0 1.256-.486 1.422-1.086l1.846-6.673c.166-.6-.202-1.087-.82-1.087h-7.053zm.627 1.362h3.195c1.724 0 1.942.83 1.942 1.24 0 .27.12 1.492-1.376 1.707.223.07.908.29.86 1.25-.048.964-.965 1.898-2.696 1.924h-3.712l1.787-6.122zm1.333 1.44l-.318.973h1.5c.31-.058.575-.2.618-.467.06-.375-.282-.506-.416-.506h-1.384zm-.658 2.04l-.318 1.135s1.36-.002 1.567 0c.492-.032.6-.24.643-.587.042-.35-.088-.51-.46-.55h-1.432zM3.307 0c-.62 0-1.256.487-1.422 1.087L.04 7.76c-.166.6.2 1.086.82 1.086h7.052c.62 0 1.255-.486 1.42-1.086l1.847-6.673C11.344.487 10.976 0 10.357 0h-7.05zm.625 1.362h3.196c1.724 0 1.943.83 1.943 1.24 0 .27.122 1.492-1.375 1.707.222.07.906.29.86 1.25-.05.964-.967 1.898-2.698 1.924H2.145l1.787-6.122zm1.334 1.44l-.318.973h1.5c.312-.058.575-.2.618-.467.06-.375-.28-.506-.416-.506H5.266zm-.657 2.04l-.32 1.135s1.36-.002 1.567 0c.492-.032.602-.24.644-.587.043-.35-.088-.51-.46-.55H4.61z" fill="'+bbcLogoColour+'"/></svg>';

    var line = d.createElement('div');
    line.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(0.9)+'px;'
        +'width: '+xy(99)+'px;'
        +'top: '+xy(50)+'px;'
        +'margin:auto;left: 0;right:0;'
        +'background-color: '+bbcLogoColour+';');
    container.appendChild(line);

    var logoCont = d.createElement('div');
    logoCont.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'width: '+xy(60)+'px;'
        +'height: auto;'
        +'top: '+xy(54)+'px;'
        +'padding:0;font-size:0;line-height:0;text-align:center;'
        +'margin:auto;left: 0;right:0;');
    logoCont.innerHTML = bbcLogo;
    container.appendChild(logoCont);

    function BBCClock() {
        var x = new Date();
        var seconds = x.getSeconds();
        var minutes = x.getMinutes();
        var hours = (x.getHours() * 30) + (x.getMinutes() / 2);
        
        if (seconds !== sPre) {
            sIncr++;
            sDeg = (seconds-1) * 6;
            secHand.removeAttribute('style');
            secKeyFrames();
            if (sIncr > 59) {
                sIncr = 0;
            }
        }

        if (minutes !== mPre) {
            mIncr++;
            mDeg = (minutes-1) * 6;
            minHand.removeAttribute('style');
            minKeyFrames();
            if (mIncr > 59) {
                mIncr = 0;
            }
        }

        if (hours !== hPre) {
            hIncr++;
            hDeg = (hours-1) * 1;
            houHand.removeAttribute('style');
            houKeyFrames();
            if (hIncr > 59) {
                hIncr = 0;
            }    
        }

        sPre = seconds;
        mPre = minutes;
        hPre = hours;
    }

    function cyc() {
        var pres = performance.now(); 
        if ((pres - prev) > mls) {
            BBCClock();
            prev = performance.now();
        }
        window.requestAnimationFrame(cyc);
    } 

    window.addEventListener('load', cyc, false);
})();