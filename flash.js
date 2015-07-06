function insertFlash () {
   var elements = getElementsByClass(document,'authcode','img');
   for (x in elements) {
      var object = elements[x].nextSibling;
      if (object != undefined) {
         var page = object.title;
         (object.className == "") ? object.innerHTML = '<embed src="http://my.mediasation.com/usecarbucks.com/authcode/authcode_player.swf" width="30" height="25" base="http://my.mediasation.com/usecarbucks.com/authcode/" wmode="transparent" flashvars="activepg=' + page + '" align="top" title="Audible \'Auth Code\': listen and type the letters you hear" />' : '';
         object.className = "flash_embedded";
      } else {
         continue;
      }
   }
}

//getElementsByClass source: http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(node,searchClass,tag) {
   var classElements = new Array();
   var els = node.getElementsByTagName(tag); // use "*" for all elements
   var elsLen = els.length;
   var pattern = new RegExp("\\b"+searchClass+"\\b");
   for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
         classElements[j] = els[i];
         j++;
      }
   }
   return classElements;
}


function addLoadEvent(func) {
   var oldonload = window.onload;
   if (typeof window.onload != 'function') {
      window.onload = func;
   } else {
      window.onload = function() {
         if (oldonload) { oldonload(); }
         func();
      };
   };
}

//run our script after the page has loaded
addLoadEvent(insertFlash);
