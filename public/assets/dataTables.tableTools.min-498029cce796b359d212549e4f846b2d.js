var TableTools;!function(e,t,s){var n=function(n){var o={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,$:function(e){return"string"==typeof e&&(e=t.getElementById(e)),e.addClass||(e.hide=function(){this.style.display="none"},e.show=function(){this.style.display=""},e.addClass=function(e){this.removeClass(e),this.className+=" "+e},e.removeClass=function(e){this.className=this.className.replace(RegExp("\\s*"+e+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")},e.hasClass=function(e){return!!this.className.match(RegExp("\\s*"+e+"\\s*"))}),e},setMoviePath:function(e){this.moviePath=e},dispatch:function(e,t,s){(e=this.clients[e])&&e.receiveEvent(t,s)},register:function(e,t){this.clients[e]=t},getDOMObjectPosition:function(e){var t={left:0,top:0,width:e.width?e.width:e.offsetWidth,height:e.height?e.height:e.offsetHeight};for(""!==e.style.width&&(t.width=e.style.width.replace("px","")),""!==e.style.height&&(t.height=e.style.height.replace("px",""));e;)t.left+=e.offsetLeft,t.top+=e.offsetTop,e=e.offsetParent;return t},Client:function(e){this.handlers={},this.id=o.nextId++,this.movieId="ZeroClipboard_TableToolsMovie_"+this.id,o.register(this.id,this),e&&this.glue(e)}};o.Client.prototype={id:0,ready:!1,movie:null,clipText:"",fileName:"",action:"copy",handCursorEnabled:!0,cssEffects:!0,handlers:null,sized:!1,glue:function(e,s){this.domElement=o.$(e);var n=99;this.domElement.style.zIndex&&(n=parseInt(this.domElement.style.zIndex,10)+1);var l=o.getDOMObjectPosition(this.domElement);this.div=t.createElement("div");var i=this.div.style;i.position="absolute",i.left="0px",i.top="0px",i.width=l.width+"px",i.height=l.height+"px",i.zIndex=n,"undefined"!=typeof s&&""!==s&&(this.div.title=s),0!==l.width&&0!==l.height&&(this.sized=!0),this.domElement&&(this.domElement.appendChild(this.div),this.div.innerHTML=this.getHTML(l.width,l.height).replace(/&/g,"&amp;"))},positionElement:function(){var e=o.getDOMObjectPosition(this.domElement),t=this.div.style;t.position="absolute",t.width=e.width+"px",t.height=e.height+"px",0!==e.width&&0!==e.height&&(this.sized=!0,t=this.div.childNodes[0],t.width=e.width,t.height=e.height)},getHTML:function(e,t){var s="",n="id="+this.id+"&width="+e+"&height="+t;if(navigator.userAgent.match(/MSIE/))var l=location.href.match(/^https/i)?"https://":"http://",s=s+('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+l+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+e+'" height="'+t+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+o.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+n+'"/><param name="wmode" value="transparent"/></object>');else s+='<embed id="'+this.movieId+'" src="'+o.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+e+'" height="'+t+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+n+'" wmode="transparent" />';return s},hide:function(){this.div&&(this.div.style.left="-2000px")},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide(),this.div.innerHTML="";var e=t.getElementsByTagName("body")[0];try{e.removeChild(this.div)}catch(s){}this.div=this.domElement=null}},reposition:function(e){if(e&&((this.domElement=o.$(e))||this.hide()),this.domElement&&this.div){var e=o.getDOMObjectPosition(this.domElement),t=this.div.style;t.left=""+e.left+"px",t.top=""+e.top+"px"}},clearText:function(){this.clipText="",this.ready&&this.movie.clearText()},appendText:function(e){this.clipText+=e,this.ready&&this.movie.appendText(e)},setText:function(e){this.clipText=e,this.ready&&this.movie.setText(e)},setCharSet:function(e){this.charSet=e,this.ready&&this.movie.setCharSet(e)},setBomInc:function(e){this.incBom=e,this.ready&&this.movie.setBomInc(e)},setFileName:function(e){this.fileName=e,this.ready&&this.movie.setFileName(e)},setAction:function(e){this.action=e,this.ready&&this.movie.setAction(e)},addEventListener:function(e,t){e=e.toString().toLowerCase().replace(/^on/,""),this.handlers[e]||(this.handlers[e]=[]),this.handlers[e].push(t)},setHandCursor:function(e){this.handCursorEnabled=e,this.ready&&this.movie.setHandCursor(e)},setCSSEffects:function(e){this.cssEffects=!!e},receiveEvent:function(s,n){var o,s=s.toString().toLowerCase().replace(/^on/,"");switch(s){case"load":if(this.movie=t.getElementById(this.movieId),!this.movie)return o=this,void setTimeout(function(){o.receiveEvent("load",null)},1);if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/))return o=this,setTimeout(function(){o.receiveEvent("load",null)},100),void(this.ready=!0);this.ready=!0,this.movie.clearText(),this.movie.appendText(this.clipText),this.movie.setFileName(this.fileName),this.movie.setAction(this.action),this.movie.setCharSet(this.charSet),this.movie.setBomInc(this.incBom),this.movie.setHandCursor(this.handCursorEnabled);break;case"mouseover":this.domElement&&this.cssEffects&&this.recoverActive&&this.domElement.addClass("active");break;case"mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&(this.domElement.removeClass("active"),this.recoverActive=!0));break;case"mousedown":this.domElement&&this.cssEffects&&this.domElement.addClass("active");break;case"mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[s])for(var l=0,i=this.handlers[s].length;i>l;l++){var a=this.handlers[s][l];"function"==typeof a?a(this,n):"object"==typeof a&&2==a.length?a[0][a[1]](this,n):"string"==typeof a&&e[a](this,n)}}},e.ZeroClipboard_TableTools=o;var l=jQuery;return TableTools=function(e,t){return!this instanceof TableTools&&alert("Warning: TableTools must be initialised with the keyword 'new'"),this.s={that:this,dt:l.fn.dataTable.Api?new l.fn.dataTable.Api(e).settings()[0]:e.fnSettings(),print:{saveStart:-1,saveLength:-1,saveScroll:-1,funcEnd:function(){}},buttonCounter:0,select:{type:"",selected:[],preRowSelect:null,postSelected:null,postDeselected:null,all:!1,selectedClass:""},custom:{},swfPath:"",buttonSet:[],master:!1,tags:{}},this.dom={container:null,table:null,print:{hidden:[],message:null},collection:{collection:null,background:null}},this.classes=l.extend(!0,{},TableTools.classes),this.s.dt.bJUI&&l.extend(!0,this.classes,TableTools.classes_themeroller),this.fnSettings=function(){return this.s},"undefined"==typeof t&&(t={}),TableTools._aInstances.push(this),this._fnConstruct(t),this},TableTools.prototype={fnGetSelected:function(e){var t,s=[],n=this.s.dt.aoData,o=this.s.dt.aiDisplay;if(e)for(e=0,t=o.length;t>e;e++)n[o[e]]._DTTT_selected&&s.push(n[o[e]].nTr);else for(e=0,t=n.length;t>e;e++)n[e]._DTTT_selected&&s.push(n[e].nTr);return s},fnGetSelectedData:function(){var e,t,s=[],n=this.s.dt.aoData;for(e=0,t=n.length;t>e;e++)n[e]._DTTT_selected&&s.push(this.s.dt.oInstance.fnGetData(e));return s},fnGetSelectedIndexes:function(e){var t,s=[],n=this.s.dt.aoData,o=this.s.dt.aiDisplay;if(e)for(e=0,t=o.length;t>e;e++)n[o[e]]._DTTT_selected&&s.push(o[e]);else for(e=0,t=n.length;t>e;e++)n[e]._DTTT_selected&&s.push(e);return s},fnIsSelected:function(e){return e=this.s.dt.oInstance.fnGetPosition(e),!0===this.s.dt.aoData[e]._DTTT_selected?!0:!1},fnSelectAll:function(e){this._fnRowSelect(e?this.s.dt.aiDisplay:this.s.dt.aoData)},fnSelectNone:function(e){this._fnRowDeselect(this.fnGetSelectedIndexes(e))},fnSelect:function(e){"single"==this.s.select.type&&this.fnSelectNone(),this._fnRowSelect(e)},fnDeselect:function(e){this._fnRowDeselect(e)},fnGetTitle:function(e){var s="";return"undefined"!=typeof e.sTitle&&""!==e.sTitle?s=e.sTitle:(e=t.getElementsByTagName("title"),0<e.length&&(s=e[0].innerHTML)),4>"\xa1".toString().length?s.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""):s.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g,"")},fnCalcColRatios:function(e){var t,s,n=this.s.dt.aoColumns,e=this._fnColumnTargets(e.mColumns),o=[],l=0,i=0;for(t=0,s=e.length;s>t;t++)e[t]&&(l=n[t].nTh.offsetWidth,i+=l,o.push(l));for(t=0,s=o.length;s>t;t++)o[t]/=i;return o.join("	")},fnGetTableData:function(e){return this.s.dt?this._fnGetDataTablesData(e):void 0},fnSetText:function(e,t){this._fnFlashSetText(e,t)},fnResizeButtons:function(){for(var e in o.clients)if(e){var t=o.clients[e];"undefined"!=typeof t.domElement&&t.domElement.parentNode&&t.positionElement()}},fnResizeRequired:function(){for(var e in o.clients)if(e){var t=o.clients[e];if("undefined"!=typeof t.domElement&&t.domElement.parentNode==this.dom.container&&!1===t.sized)return!0}return!1},fnPrint:function(e,t){t===s&&(t={}),e===s||e?this._fnPrintStart(t):this._fnPrintEnd()},fnInfo:function(e,t){var s=l("<div/>").addClass(this.classes.print.info).html(e).appendTo("body");setTimeout(function(){s.fadeOut("normal",function(){s.remove()})},t)},fnContainer:function(){return this.dom.container},_fnConstruct:function(e){var s=this;this._fnCustomiseSettings(e),this.dom.container=t.createElement(this.s.tags.container),this.dom.container.className=this.classes.container,"none"!=this.s.select.type&&this._fnRowSelectConfig(),this._fnButtonDefinations(this.s.buttonSet,this.dom.container),this.s.dt.aoDestroyCallback.push({sName:"TableTools",fn:function(){l(s.s.dt.nTBody).off("click.DTTT_Select","tr"),l(s.dom.container).empty();var e=l.inArray(s,TableTools._aInstances);-1!==e&&TableTools._aInstances.splice(e,1)}})},_fnCustomiseSettings:function(e){"undefined"==typeof this.s.dt._TableToolsInit&&(this.s.master=!0,this.s.dt._TableToolsInit=!0),this.dom.table=this.s.dt.nTable,this.s.custom=l.extend({},TableTools.DEFAULTS,e),this.s.swfPath=this.s.custom.sSwfPath,"undefined"!=typeof o&&(o.moviePath=this.s.swfPath),this.s.select.type=this.s.custom.sRowSelect,this.s.select.preRowSelect=this.s.custom.fnPreRowSelect,this.s.select.postSelected=this.s.custom.fnRowSelected,this.s.select.postDeselected=this.s.custom.fnRowDeselected,this.s.custom.sSelectedClass&&(this.classes.select.row=this.s.custom.sSelectedClass),this.s.tags=this.s.custom.oTags,this.s.buttonSet=this.s.custom.aButtons},_fnButtonDefinations:function(e,t){for(var s,n=0,o=e.length;o>n;n++){if("string"==typeof e[n]){if("undefined"==typeof TableTools.BUTTONS[e[n]]){alert("TableTools: Warning - unknown button type: "+e[n]);continue}s=l.extend({},TableTools.BUTTONS[e[n]],!0)}else{if("undefined"==typeof TableTools.BUTTONS[e[n].sExtends]){alert("TableTools: Warning - unknown button type: "+e[n].sExtends);continue}s=l.extend({},TableTools.BUTTONS[e[n].sExtends],!0),s=l.extend(s,e[n],!0)}(s=this._fnCreateButton(s,l(t).hasClass(this.classes.collection.container)))&&t.appendChild(s)}},_fnCreateButton:function(e,t){var s=this._fnButtonBase(e,t);if(e.sAction.match(/flash/)){if(!this._fnHasFlash())return!1;this._fnFlashConfig(s,e)}else"text"==e.sAction?this._fnTextConfig(s,e):"div"==e.sAction?this._fnTextConfig(s,e):"collection"==e.sAction&&(this._fnTextConfig(s,e),this._fnCollectionConfig(s,e));return s},_fnButtonBase:function(e,s){var n,o,l;s?(n=e.sTag&&"default"!==e.sTag?e.sTag:this.s.tags.collection.button,o=e.sLinerTag&&"default"!==e.sLinerTag?e.sLiner:this.s.tags.collection.liner,l=this.classes.collection.buttons.normal):(n=e.sTag&&"default"!==e.sTag?e.sTag:this.s.tags.button,o=e.sLinerTag&&"default"!==e.sLinerTag?e.sLiner:this.s.tags.liner,l=this.classes.buttons.normal),n=t.createElement(n),o=t.createElement(o);var i=this._fnGetMasterSettings();return n.className=l+" "+e.sButtonClass,n.setAttribute("id","ToolTables_"+this.s.dt.sInstance+"_"+i.buttonCounter),n.appendChild(o),o.innerHTML=e.sButtonText,i.buttonCounter++,n},_fnGetMasterSettings:function(){if(this.s.master)return this.s;for(var e=TableTools._aInstances,t=0,s=e.length;s>t;t++)if(this.dom.table==e[t].s.dt.nTable)return e[t].s},_fnCollectionConfig:function(e,s){var n=t.createElement(this.s.tags.collection.container);n.style.display="none",n.className=this.classes.collection.container,s._collection=n,t.body.appendChild(n),this._fnButtonDefinations(s.aButtons,n)},_fnCollectionShow:function(s,n){var o=this,i=l(s).offset(),a=n._collection,c=i.left,i=i.top+l(s).outerHeight(),r=l(e).height(),h=l(t).height(),f=l(e).width(),d=l(t).width();a.style.position="absolute",a.style.left=c+"px",a.style.top=i+"px",a.style.display="block",l(a).css("opacity",0);var u=t.createElement("div");u.style.position="absolute",u.style.left="0px",u.style.top="0px",u.style.height=(r>h?r:h)+"px",u.style.width=(f>d?f:d)+"px",u.className=this.classes.collection.background,l(u).css("opacity",0),t.body.appendChild(u),t.body.appendChild(a),r=l(a).outerWidth(),f=l(a).outerHeight(),c+r>d&&(a.style.left=d-r+"px"),i+f>h&&(a.style.top=i-f-l(s).outerHeight()+"px"),this.dom.collection.collection=a,this.dom.collection.background=u,setTimeout(function(){l(a).animate({opacity:1},500),l(u).animate({opacity:.25},500)},10),this.fnResizeButtons(),l(u).click(function(){o._fnCollectionHide.call(o,null,null)})},_fnCollectionHide:function(e,t){!(null!==t&&"collection"==t.sExtends)&&null!==this.dom.collection.collection&&(l(this.dom.collection.collection).animate({opacity:0},500,function(){this.style.display="none"}),l(this.dom.collection.background).animate({opacity:0},500,function(){this.parentNode.removeChild(this)}),this.dom.collection.collection=null,this.dom.collection.background=null)},_fnRowSelectConfig:function(){if(this.s.master){var e=this,t=this.s.dt;l(t.nTable).addClass(this.classes.select.table),"os"===this.s.select.type&&(l(t.nTBody).on("mousedown.DTTT_Select","tr",function(e){e.shiftKey&&l(t.nTBody).css("-moz-user-select","none").one("selectstart.DTTT_Select","tr",function(){return!1})}),l(t.nTBody).on("mouseup.DTTT_Select","tr",function(){l(t.nTBody).css("-moz-user-select","")})),l(t.nTBody).on("click.DTTT_Select",this.s.custom.sRowSelector,function(s){var n="tr"===this.nodeName.toLowerCase()?this:l(this).parents("tr")[0],o=e.s.select,i=e.s.dt.oInstance.fnGetPosition(n);if(n.parentNode==t.nTBody&&null!==t.oInstance.fnGetData(n)){if("os"==o.type)if(s.ctrlKey||s.metaKey)e.fnIsSelected(n)?e._fnRowDeselect(n,s):e._fnRowSelect(n,s);else if(s.shiftKey){var a=e.s.dt.aiDisplay.slice(),c=l.inArray(o.lastRow,a),r=l.inArray(i,a);if(0===e.fnGetSelected().length||-1===c)a.splice(l.inArray(i,a)+1,a.length);else{if(c>r)var h=r,r=c,c=h;a.splice(r+1,a.length),a.splice(0,c)}e.fnIsSelected(n)?(a.splice(l.inArray(i,a),1),e._fnRowDeselect(a,s)):e._fnRowSelect(a,s)}else e.fnIsSelected(n)&&1===e.fnGetSelected().length?e._fnRowDeselect(n,s):(e.fnSelectNone(),e._fnRowSelect(n,s));else e.fnIsSelected(n)?e._fnRowDeselect(n,s):"single"==o.type?(e.fnSelectNone(),e._fnRowSelect(n,s)):"multi"==o.type&&e._fnRowSelect(n,s);o.lastRow=i}}),t.oApi._fnCallbackReg(t,"aoRowCreatedCallback",function(s,n,o){t.aoData[o]._DTTT_selected&&l(s).addClass(e.classes.select.row)},"TableTools-SelectAll")}},_fnRowSelect:function(e,t){var s,n,o=this._fnSelectData(e),i=[];for(s=0,n=o.length;n>s;s++)o[s].nTr&&i.push(o[s].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,t,i,!0)){for(s=0,n=o.length;n>s;s++)o[s]._DTTT_selected=!0,o[s].nTr&&l(o[s].nTr).addClass(this.classes.select.row);null!==this.s.select.postSelected&&this.s.select.postSelected.call(this,i),TableTools._fnEventDispatch(this,"select",i,!0)}},_fnRowDeselect:function(e,t){var s,n,o=this._fnSelectData(e),i=[];for(s=0,n=o.length;n>s;s++)o[s].nTr&&i.push(o[s].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,t,i,!1)){for(s=0,n=o.length;n>s;s++)o[s]._DTTT_selected=!1,o[s].nTr&&l(o[s].nTr).removeClass(this.classes.select.row);null!==this.s.select.postDeselected&&this.s.select.postDeselected.call(this,i),TableTools._fnEventDispatch(this,"select",i,!1)}},_fnSelectData:function(e){var t,s,n,o=[];if(e.nodeName)t=this.s.dt.oInstance.fnGetPosition(e),o.push(this.s.dt.aoData[t]);else if("undefined"!=typeof e.length)for(s=0,n=e.length;n>s;s++)e[s].nodeName?(t=this.s.dt.oInstance.fnGetPosition(e[s]),o.push(this.s.dt.aoData[t])):o.push("number"==typeof e[s]?this.s.dt.aoData[e[s]]:e[s]);else o.push(e);return o},_fnTextConfig:function(e,t){var s=this;null!==t.fnInit&&t.fnInit.call(this,e,t),""!==t.sToolTip&&(e.title=t.sToolTip),l(e).hover(function(){null!==t.fnMouseover&&t.fnMouseover.call(this,e,t,null)},function(){null!==t.fnMouseout&&t.fnMouseout.call(this,e,t,null)}),null!==t.fnSelect&&TableTools._fnEventListen(this,"select",function(n){t.fnSelect.call(s,e,t,n)}),l(e).click(function(n){null!==t.fnClick&&t.fnClick.call(s,e,t,null,n),null!==t.fnComplete&&t.fnComplete.call(s,e,t,null,null),s._fnCollectionHide(e,t)})},_fnHasFlash:function(){try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(e){if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]!==s&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1},_fnFlashConfig:function(e,t){var s=this,n=new o.Client;null!==t.fnInit&&t.fnInit.call(this,e,t),n.setHandCursor(!0),"flash_save"==t.sAction?(n.setAction("save"),n.setCharSet("utf16le"==t.sCharSet?"UTF16LE":"UTF8"),n.setBomInc(t.bBomInc),n.setFileName(t.sFileName.replace("*",this.fnGetTitle(t)))):"flash_pdf"==t.sAction?(n.setAction("pdf"),n.setFileName(t.sFileName.replace("*",this.fnGetTitle(t)))):n.setAction("copy"),n.addEventListener("mouseOver",function(){null!==t.fnMouseover&&t.fnMouseover.call(s,e,t,n)}),n.addEventListener("mouseOut",function(){null!==t.fnMouseout&&t.fnMouseout.call(s,e,t,n)}),n.addEventListener("mouseDown",function(){null!==t.fnClick&&t.fnClick.call(s,e,t,n)}),n.addEventListener("complete",function(o,l){null!==t.fnComplete&&t.fnComplete.call(s,e,t,n,l),s._fnCollectionHide(e,t)}),this._fnFlashGlue(n,e,t.sToolTip)},_fnFlashGlue:function(e,s,n){var o=this,l=s.getAttribute("id");t.getElementById(l)?e.glue(s,n):setTimeout(function(){o._fnFlashGlue(e,s,n)},100)},_fnFlashSetText:function(e,t){var s=this._fnChunkData(t,8192);e.clearText();for(var n=0,o=s.length;o>n;n++)e.appendText(s[n])},_fnColumnTargets:function(e){var t,s,n=[],o=this.s.dt;if("object"==typeof e){for(t=0,s=o.aoColumns.length;s>t;t++)n.push(!1);for(t=0,s=e.length;s>t;t++)n[e[t]]=!0}else if("visible"==e)for(t=0,s=o.aoColumns.length;s>t;t++)n.push(o.aoColumns[t].bVisible?!0:!1);else if("hidden"==e)for(t=0,s=o.aoColumns.length;s>t;t++)n.push(o.aoColumns[t].bVisible?!1:!0);else if("sortable"==e)for(t=0,s=o.aoColumns.length;s>t;t++)n.push(o.aoColumns[t].bSortable?!0:!1);else for(t=0,s=o.aoColumns.length;s>t;t++)n.push(!0);return n},_fnNewline:function(e){return"auto"==e.sNewLine?navigator.userAgent.match(/Windows/)?"\r\n":"\n":e.sNewLine},_fnGetDataTablesData:function(e){var t,s,n,o,i,a,c=[],r="",h=this.s.dt,f=RegExp(e.sFieldBoundary,"g"),d=this._fnColumnTargets(e.mColumns),u="undefined"!=typeof e.bSelectedOnly?e.bSelectedOnly:!1;if(e.bHeader){for(i=[],t=0,s=h.aoColumns.length;s>t;t++)d[t]&&(r=h.aoColumns[t].sTitle.replace(/\n/g," ").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,""),r=this._fnHtmlDecode(r),i.push(this._fnBoundData(r,e.sFieldBoundary,f)));c.push(i.join(e.sFieldSeperator))}var T=this.fnGetSelected(),u="none"!==this.s.select.type&&u&&0!==T.length,p=(n=l.fn.dataTable.Api)?new n(h).rows(e.oSelectorOpts).indexes().flatten().toArray():h.oInstance.$("tr",e.oSelectorOpts).map(function(e,t){return u&&-1===l.inArray(t,T)?null:h.oInstance.fnGetPosition(t)}).get();for(n=0,o=p.length;o>n;n++){for(a=h.aoData[p[n]].nTr,i=[],t=0,s=h.aoColumns.length;s>t;t++)d[t]&&(r=h.oApi._fnGetCellData(h,p[n],t,"display"),e.fnCellRender?r=e.fnCellRender(r,t,a,p[n])+"":"string"==typeof r?(r=r.replace(/\n/g," "),r=r.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi,"$1$2$3"),r=r.replace(/<.*?>/g,"")):r+="",r=r.replace(/^\s+/,"").replace(/\s+$/,""),r=this._fnHtmlDecode(r),i.push(this._fnBoundData(r,e.sFieldBoundary,f)));c.push(i.join(e.sFieldSeperator)),e.bOpenRows&&(t=l.grep(h.aoOpenRows,function(e){return e.nParent===a}),1===t.length&&(r=this._fnBoundData(l("td",t[0].nTr).html(),e.sFieldBoundary,f),c.push(r)))}if(e.bFooter&&null!==h.nTFoot){for(i=[],t=0,s=h.aoColumns.length;s>t;t++)d[t]&&null!==h.aoColumns[t].nTf&&(r=h.aoColumns[t].nTf.innerHTML.replace(/\n/g," ").replace(/<.*?>/g,""),r=this._fnHtmlDecode(r),i.push(this._fnBoundData(r,e.sFieldBoundary,f)));c.push(i.join(e.sFieldSeperator))}return c.join(this._fnNewline(e))},_fnBoundData:function(e,t,s){return""===t?e:t+e.replace(s,t+t)+t},_fnChunkData:function(e,t){for(var s=[],n=e.length,o=0;n>o;o+=t)s.push(n>o+t?e.substring(o,o+t):e.substring(o,n));return s},_fnHtmlDecode:function(e){if(-1===e.indexOf("&"))return e;var s=t.createElement("div");return e.replace(/&([^\s]*?);/g,function(e,t){return"#"===e.substr(1,1)?String.fromCharCode(Number(t.substr(1))):(s.innerHTML=e,s.childNodes[0].nodeValue)})},_fnPrintStart:function(s){var n=this,o=this.s.dt;this._fnPrintHideNodes(o.nTable),this.s.print.saveStart=o._iDisplayStart,this.s.print.saveLength=o._iDisplayLength,s.bShowAll&&(o._iDisplayStart=0,o._iDisplayLength=-1,o.oApi._fnCalculateEnd&&o.oApi._fnCalculateEnd(o),o.oApi._fnDraw(o)),(""!==o.oScroll.sX||""!==o.oScroll.sY)&&(this._fnPrintScrollStart(o),l(this.s.dt.nTable).bind("draw.DTTT_Print",function(){n._fnPrintScrollStart(o)}));var i,a=o.aanFeatures;for(i in a)if("i"!=i&&"t"!=i&&1==i.length)for(var c=0,r=a[i].length;r>c;c++)this.dom.print.hidden.push({node:a[i][c],display:"block"}),a[i][c].style.display="none";l(t.body).addClass(this.classes.print.body),""!==s.sInfo&&this.fnInfo(s.sInfo,3e3),s.sMessage&&l("<div/>").addClass(this.classes.print.message).html(s.sMessage).prependTo("body"),this.s.print.saveScroll=l(e).scrollTop(),e.scrollTo(0,0),l(t).bind("keydown.DTTT",function(e){27==e.keyCode&&(e.preventDefault(),n._fnPrintEnd.call(n,e))})},_fnPrintEnd:function(){var s=this.s.dt,n=this.s.print;this._fnPrintShowNodes(),(""!==s.oScroll.sX||""!==s.oScroll.sY)&&(l(this.s.dt.nTable).unbind("draw.DTTT_Print"),this._fnPrintScrollEnd()),e.scrollTo(0,n.saveScroll),l("div."+this.classes.print.message).remove(),l(t.body).removeClass("DTTT_Print"),s._iDisplayStart=n.saveStart,s._iDisplayLength=n.saveLength,s.oApi._fnCalculateEnd&&s.oApi._fnCalculateEnd(s),s.oApi._fnDraw(s),l(t).unbind("keydown.DTTT")},_fnPrintScrollStart:function(){var e=this.s.dt;e.nScrollHead.getElementsByTagName("div")[0].getElementsByTagName("table");var t,s=e.nTable.parentNode;t=e.nTable.getElementsByTagName("thead"),0<t.length&&e.nTable.removeChild(t[0]),null!==e.nTFoot&&(t=e.nTable.getElementsByTagName("tfoot"),0<t.length&&e.nTable.removeChild(t[0])),t=e.nTHead.cloneNode(!0),e.nTable.insertBefore(t,e.nTable.childNodes[0]),null!==e.nTFoot&&(t=e.nTFoot.cloneNode(!0),e.nTable.insertBefore(t,e.nTable.childNodes[1])),""!==e.oScroll.sX&&(e.nTable.style.width=l(e.nTable).outerWidth()+"px",s.style.width=l(e.nTable).outerWidth()+"px",s.style.overflow="visible"),""!==e.oScroll.sY&&(s.style.height=l(e.nTable).outerHeight()+"px",s.style.overflow="visible")},_fnPrintScrollEnd:function(){var e=this.s.dt,t=e.nTable.parentNode;""!==e.oScroll.sX&&(t.style.width=e.oApi._fnStringToCss(e.oScroll.sX),t.style.overflow="auto"),""!==e.oScroll.sY&&(t.style.height=e.oApi._fnStringToCss(e.oScroll.sY),t.style.overflow="auto")},_fnPrintShowNodes:function(){for(var e=this.dom.print.hidden,t=0,s=e.length;s>t;t++)e[t].node.style.display=e[t].display;e.splice(0,e.length)},_fnPrintHideNodes:function(e){for(var t=this.dom.print.hidden,s=e.parentNode,n=s.childNodes,o=0,i=n.length;i>o;o++)if(n[o]!=e&&1==n[o].nodeType){var a=l(n[o]).css("display");"none"!=a&&(t.push({node:n[o],display:a}),n[o].style.display="none")}"BODY"!=s.nodeName.toUpperCase()&&this._fnPrintHideNodes(s)}},TableTools._aInstances=[],TableTools._aListeners=[],TableTools.fnGetMasters=function(){for(var e=[],t=0,s=TableTools._aInstances.length;s>t;t++)TableTools._aInstances[t].s.master&&e.push(TableTools._aInstances[t]);return e},TableTools.fnGetInstance=function(e){"object"!=typeof e&&(e=t.getElementById(e));for(var s=0,n=TableTools._aInstances.length;n>s;s++)if(TableTools._aInstances[s].s.master&&TableTools._aInstances[s].dom.table==e)return TableTools._aInstances[s];return null},TableTools._fnEventListen=function(e,t,s){TableTools._aListeners.push({that:e,type:t,fn:s})},TableTools._fnEventDispatch=function(e,t,s,n){for(var o=TableTools._aListeners,l=0,i=o.length;i>l;l++)e.dom.table==o[l].that.dom.table&&o[l].type==t&&o[l].fn(s,n)},TableTools.buttonBase={sAction:"text",sTag:"default",sLinerTag:"default",sButtonClass:"DTTT_button_text",sButtonText:"Button text",sTitle:"",sToolTip:"",sCharSet:"utf8",bBomInc:!1,sFileName:"*.csv",sFieldBoundary:"",sFieldSeperator:"	",sNewLine:"auto",mColumns:"all",bHeader:!0,bFooter:!0,bOpenRows:!1,bSelectedOnly:!1,oSelectorOpts:s,fnMouseover:null,fnMouseout:null,fnClick:null,fnSelect:null,fnComplete:null,fnInit:null,fnCellRender:null},TableTools.BUTTONS={csv:l.extend({},TableTools.buttonBase,{sAction:"flash_save",sButtonClass:"DTTT_button_csv",sButtonText:"CSV",sFieldBoundary:'"',sFieldSeperator:",",fnClick:function(e,t,s){this.fnSetText(s,this.fnGetTableData(t))}}),xls:l.extend({},TableTools.buttonBase,{sAction:"flash_save",sCharSet:"utf16le",bBomInc:!0,sButtonClass:"DTTT_button_xls",sButtonText:"Excel",fnClick:function(e,t,s){this.fnSetText(s,this.fnGetTableData(t))}}),copy:l.extend({},TableTools.buttonBase,{sAction:"flash_copy",sButtonClass:"DTTT_button_copy",sButtonText:"Copy",fnClick:function(e,t,s){this.fnSetText(s,this.fnGetTableData(t))},fnComplete:function(e,t,s,n){e=n.split("\n").length,t.bHeader&&e--,null!==this.s.dt.nTFoot&&t.bFooter&&e--,this.fnInfo("<h6>Table copied</h6><p>Copied "+e+" row"+(1==e?"":"s")+" to the clipboard.</p>",1500)}}),pdf:l.extend({},TableTools.buttonBase,{sAction:"flash_pdf",sNewLine:"\n",sFileName:"*.pdf",sButtonClass:"DTTT_button_pdf",sButtonText:"PDF",sPdfOrientation:"portrait",sPdfSize:"A4",sPdfMessage:"",fnClick:function(e,t,s){this.fnSetText(s,"title:"+this.fnGetTitle(t)+"\nmessage:"+t.sPdfMessage+"\ncolWidth:"+this.fnCalcColRatios(t)+"\norientation:"+t.sPdfOrientation+"\nsize:"+t.sPdfSize+"\n--/TableToolsOpts--\n"+this.fnGetTableData(t))}}),print:l.extend({},TableTools.buttonBase,{sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.</p>",sMessage:null,bShowAll:!0,sToolTip:"View print view",sButtonClass:"DTTT_button_print",sButtonText:"Print",fnClick:function(e,t){this.fnPrint(!0,t)}}),text:l.extend({},TableTools.buttonBase),select:l.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(e){0!==this.fnGetSelected().length?l(e).removeClass(this.classes.buttons.disabled):l(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){l(e).addClass(this.classes.buttons.disabled)}}),select_single:l.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(e){1==this.fnGetSelected().length?l(e).removeClass(this.classes.buttons.disabled):l(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){l(e).addClass(this.classes.buttons.disabled)}}),select_all:l.extend({},TableTools.buttonBase,{sButtonText:"Select all",fnClick:function(){this.fnSelectAll()},fnSelect:function(e){this.fnGetSelected().length==this.s.dt.fnRecordsDisplay()?l(e).addClass(this.classes.buttons.disabled):l(e).removeClass(this.classes.buttons.disabled)}}),select_none:l.extend({},TableTools.buttonBase,{sButtonText:"Deselect all",fnClick:function(){this.fnSelectNone()},fnSelect:function(e){0!==this.fnGetSelected().length?l(e).removeClass(this.classes.buttons.disabled):l(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){l(e).addClass(this.classes.buttons.disabled)}}),ajax:l.extend({},TableTools.buttonBase,{sAjaxUrl:"/xhr.php",sButtonText:"Ajax button",fnClick:function(e,t){var s=this.fnGetTableData(t);l.ajax({url:t.sAjaxUrl,data:[{name:"tableData",value:s}],success:t.fnAjaxComplete,dataType:"json",type:"POST",cache:!1,error:function(){alert("Error detected when sending table data to server")}})},fnAjaxComplete:function(){alert("Ajax complete")}}),div:l.extend({},TableTools.buttonBase,{sAction:"div",sTag:"div",sButtonClass:"DTTT_nonbutton",sButtonText:"Text button"}),collection:l.extend({},TableTools.buttonBase,{sAction:"collection",sButtonClass:"DTTT_button_collection",sButtonText:"Collection",fnClick:function(e,t){this._fnCollectionShow(e,t)}})},TableTools.buttons=TableTools.BUTTONS,TableTools.classes={container:"DTTT_container",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"},collection:{container:"DTTT_collection",background:"DTTT_collection_background",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"}},select:{table:"DTTT_selectable",row:"DTTT_selected selected"},print:{body:"DTTT_Print",info:"DTTT_print_info",message:"DTTT_PrintMessage"}},TableTools.classes_themeroller={container:"DTTT_container ui-buttonset ui-buttonset-multi",buttons:{normal:"DTTT_button ui-button ui-state-default"},collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}},TableTools.DEFAULTS={sSwfPath:"../swf/copy_csv_xls_pdf.swf",sRowSelect:"none",sRowSelector:"tr",sSelectedClass:null,fnPreRowSelect:null,fnRowSelected:null,fnRowDeselected:null,aButtons:["copy","csv","xls","pdf","print"],oTags:{container:"div",button:"a",liner:"span",collection:{container:"div",button:"a",liner:"span"}}},TableTools.defaults=TableTools.DEFAULTS,TableTools.prototype.CLASS="TableTools",TableTools.version="2.2.2",l.fn.dataTable.Api&&l.fn.dataTable.Api.register("tabletools()",function(){var e=null;return 0<this.context.length&&(e=TableTools.fnGetInstance(this.context[0].nTable)),e}),"function"==typeof l.fn.dataTable&&"function"==typeof l.fn.dataTableExt.fnVersionCheck&&l.fn.dataTableExt.fnVersionCheck("1.9.0")?l.fn.dataTableExt.aoFeatures.push({fnInit:function(e){var t=e.oInit;return new TableTools(e.oInstance,t?t.tableTools||t.oTableTools||{}:{}).dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools requires DataTables 1.9.0 or newer - www.datatables.net/download"),l.fn.DataTable.TableTools=TableTools,"function"==typeof n.fn.dataTable&&"function"==typeof n.fn.dataTableExt.fnVersionCheck&&n.fn.dataTableExt.fnVersionCheck("1.9.0")?n.fn.dataTableExt.aoFeatures.push({fnInit:function(e){return e=new TableTools(e.oInstance,"undefined"!=typeof e.oInit.oTableTools?e.oInit.oTableTools:{}),TableTools._aInstances.push(e),e.dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"),n.fn.dataTable.TableTools=TableTools,n.fn.DataTable.TableTools=TableTools};"function"==typeof define&&define.amd?define(["jquery","datatables"],n):"object"==typeof exports?n(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.TableTools&&n(jQuery,jQuery.fn.dataTable)}(window,document);