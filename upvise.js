
function Accounts(){}
Accounts.ALL_KEY="accounts.all";Accounts.CURRENT_KEY="accounts.current";Accounts.DEBUG=false;Accounts.startNativeApp=function(){var iOS=(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?true:false);var func=AppLoader.getParameter("func");if(iOS&&func){window.location="upvise://start?func="+encodeURIComponent(func);return true;}else{return false;}}
Accounts.start=function(action){if(Accounts.startNativeApp()==true)return;History.clear();Cache.init();if(Accounts.enforceHttps()==false)return;Accounts.setFavIcon();if(action==null)action=AppLoader.getParameter("a");if(action==null&&Accounts.load()==true){Accounts.writeStart();Loader.loadSvg(function(){Loader.loadUpviseResource(User.language,AppLoader.start);});}else{var language=AppLoader.getParameter("lang");var callback=null;if(action=="signup")callback=Signup.showForm;else if(action=="changepwd")callback=PasswordChange.showForm;else if(action=="resetpwd")callback=PasswordReset.showForm;else{localStorage.clear();callback=Signin.showForm;}
Loader.loadUpviseResource(language,callback);}}
Accounts.startMobile=function(){Debug.target="phone";Accounts.device="phone";Accounts.start();}
Accounts.signInAccount=function(email){LocalSettings.set(AppLoader.STARTAPP_KEY,null);var account=Accounts.getAccount(email);if(account!=null){document.cookie="ADMIN=;";Cache.deleteStores(function(){Accounts.save(account);window.location.reload(true);});}}
Accounts.signOut=function(){User.token=null;localStorage.removeItem(Accounts.ALL_KEY);localStorage.removeItem(Accounts.CURRENT_KEY);LocalSettings.set(AppLoader.STARTAPP_KEY,null);document.cookie="ADMIN=;";Cache.deleteStores(function(){window.location.reload(true);});}
Accounts.load=function(){var json=localStorage.getItem(Accounts.CURRENT_KEY);if(json!=null){var info=JSON.parse(json);if(info!=null){for(key in info){User[key]=info[key];}}}
return(User.token!=null);}
Accounts.save=function(account){localStorage.setItem(Accounts.CURRENT_KEY,JSON.stringify(account));var accounts=Accounts.get();var found=false;for(var i=0;i<accounts.length;i++){var cur=accounts[i];if(cur.email==account.email){found=true;break;}}
if(found==false){accounts.push(account);localStorage.setItem(Accounts.ALL_KEY,JSON.stringify(accounts));}}
Accounts.get=function(){var json=window.localStorage.getItem(Accounts.ALL_KEY);if(json==null)return[];try{return JSON.parse(json);}catch(e){return[];}}
Accounts.getAccount=function(email){var accounts=Accounts.get();for(var i=0;i<accounts.length;i++){var account=accounts[i];if(account.email==email)return account;}
return null;}
Accounts.updateAccount=function(field,value){User[field]=value;var account=Accounts.getAccount(User.email);if(account!=null){account[field]=value;Accounts.save(account);}}
Accounts.enforceHttps=function(){if(AppLoader.getParameter("c")=="nossl")return true;var host=window.location.host;if(host.indexOf(".upvise.com")==-1)return true;if(window.location.href.indexOf("sony.upvise.com")>-1)return true;var protocol=window.location.protocol;if(protocol=="http:"){window.location.href="https:"+window.location.href.substring(protocol.length);return false;}else{return true;}}
Accounts.setFavIcon=function(subtitle){var title="Upvise";if(Accounts.getOem()=="novade"){title="Novade";var link=document.createElement("link");link.setAttribute("rel","icon");link.setAttribute("href","js/novade_favicon.png");document.head.appendChild(link);}
if(subtitle)title+=" "+subtitle;document.title=title;}
Accounts.getDefaultLogo=function(kind){var logo=(Accounts.getOem()=="novade")?"novade":"upvise";if(kind=="white")logo+="-w";return logo+".png";}
Accounts.getOem=function(){if(window.location.href.indexOf("novade")>-1)return"novade";else return"upvise";}
Accounts.showAddAccount=function(){Signin.showForm();_hide('createaccount');}
Accounts.writeStart=function(){var buf=[];if(Accounts.device=="phone"){buf.push('<div id="phone">');buf.push('<div id="header"><div id="toolbar"></div></div>');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');buf.push('</div>');document.body.innerHTML=buf.join('');return;}else if(Debug.target!=null){Accounts.writeStartDebug();return;}
buf.push('<div id="header"><div id="_currentapp"></div>  <div id="onefilter"></div> <div id="toolbar"></div>  <div id="_searchbox"></div>  </div>');buf.push('<div id="leftpane"></div>');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');document.body.innerHTML=buf.join('');}
Accounts.writeStartDebug=function(){var buf=[];buf.push(Debug.writeDebugBar());if(Debug.target=="phone"){buf.push('<div id="debug" class="skin_phone">');buf.push('<div id="header"><div id="toolbar"></div></div>');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');buf.push('</div>');}else if(Debug.target=="tablet"){buf.push('<div id="debug" class="skin_tablet">');buf.push('<div id="header"><div id="toolbar"></div></div>');buf.push('<div id="leftpane"></div>');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');buf.push('</div>');}else if(Debug.target=="web"){buf.push('<div id="header"><div id="_currentapp"></div>  <div id="onefilter"></div> <div id="toolbar"></div>  <div id="_searchbox"></div>  </div>');buf.push('<div id="leftpane"></div>');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');}
document.body.innerHTML=buf.join('');}
var oncaptcha=function(){grecaptcha.render('div1',{'sitekey':'6LfbQtMSAAAAAHQbNd9jh54YbSLDiZSOb7bcQ8HW'});}
function AppLoader(){}
AppLoader.appMap=null;AppLoader.STARTAPP_KEY="startapp";AppLoader.init=function(){if(AppLoader.appMap!=null)return;var i=0;var map=new HashMap();map.set("calendar",{title:R.CALENDAR,icon:"calendar",rank:i++});map.set("contacts",{title:R.CONTACTS,icon:"contact",rank:i++});map.set("tasks",{title:R.TASKS,icon:"foldertask",rank:i++});map.set("notes",{title:R.NOTEBOOKS,icon:"note",rank:i++});map.set("sales",{title:R.SALES,icon:"dollar",rank:i++});map.set("projects",{title:R.PROJECTS,icon:"project",rank:i++});map.set("forms",{title:R.FORMS,icon:"form",rank:i++});map.set("jobs",{title:R.JOBS,icon:"job",rank:i++});map.set("maintenance",{title:"Maintenance",icon:"job",rank:i++});map.set("files",{title:R.FILES,icon:"folder",rank:i++});map.set("expenses",{title:R.EXPENSES,icon:"dollar",rank:i++});map.set("time",{title:R.TIMESHEETS,icon:"clock",rank:i++});map.set("assets",{title:R.ASSETS,icon:"product",rank:i++});map.set("tools",{title:R.EQUIPMENT,icon:"truck",rank:i++});map.set("ideas",{title:R.IDEAS,icon:"idea",rank:i++});map.set("news",{title:R.NEWS,icon:"news",rank:i++});map.set("track",{title:null,icon:"pinpoint",rank:i++});map.set("novadetrack",{title:R.QUALITY,icon:"novadetrack",rank:i++});map.set("novadesafety",{title:R.SAFETY,icon:"novadesafety",rank:i++});map.set("novadelogistics",{title:R.LOGISTICS,icon:"novadelogistics",rank:i++});map.set("novadefm",{title:R.MAINTENANCE,icon:"novadefm",rank:i++});map.set("novadeactivity",{title:R.ACTIVITY,icon:"novadeactivity",rank:i++});map.set("novadetime",{title:R.WORKFORCE,icon:"novadetime",rank:i++});map.set("novaderesources",{title:R.PEOPLE,icon:"novaderesources",rank:i++});AppLoader.appMap=map;}
AppLoader.getAppList=function(){var list=[];var apps=Query.select("System.library");for(i=0;i<apps.length;i++){var app=apps[i];if(app.id!="help"){var app2=AppLoader._patchApp(app);list.push(app2);}}
list=Data.numsort(list,"rank");return list;}
AppLoader.getFirstAppid=function(){var lists=AppLoader.getAppList();if(lists.length>0){return lists[0].id;}else{return"settings";}}
AppLoader._patchApp=function(app){var app2=Utils.clone(app);app2.id=Cache._removeLegacyAppId(app.id);if(AppLoader.appMap==null)AppLoader.init();var info=AppLoader.appMap.get(app2.id);if(info!=null){app2.rank=info.rank;if(info.title!=null)app2.title=info.title;app2.icon=info.icon;}else{app2.rank=999;}
if(app2.icon==null)app2.icon="app";return app2;}
AppLoader.getApp=function(appid){if(appid=="settingsapp")return{id:"settingsapp",title:R.SETTINGS,expired:false};else if(appid=="logs")return{id:"logs",title:"Logs",expired:false};else if(appid=="ide")return{id:"ide",title:"IDE",expired:false};appid=Cache._makeLegacyAppId(appid);var app=Query.selectId("System.library",appid);if(app!=null)return AppLoader._patchApp(app);else return null;}
AppLoader.start=function(){Geocode.startLocation();Cache.sync(AppLoader.onStart);}
AppLoader.onStart=function(){var appid="";var func=AppLoader.getParameter("func");AppLoader.clearParameters();if(func==null){func="main()";appid=AccountSettings.get("startapp");if(appid==null||appid=="")appid=LocalSettings.get(AppLoader.STARTAPP_KEY);if(appid==null)appid=AppLoader.getFirstAppid();}else{appid=Engine.getFunctionAppId(func);}
if(Accounts.DEBUG==true){AppBar.writeAppList();Engine.eval(func);Engine.evalLeftPane();}else{AppLoader.openApp(appid,func);}}
AppLoader.openApp=function(appid,func){if(func==null)func="main()";var app=AppLoader.getApp(appid);if(app==null){window.alert("Error could not load Application: "+appid);AppBar.writeAppList();return;}
if(app.expired==1){if(App.confirm(R.CONFIRMPURCHASELICENSE)==true){AppLoader.openApp("settingsapp","SettingsApp.showLicenseList()");}else{AppLoader.openApp("contacts","main()");}
return;}
LocalSettings.set(AppLoader.STARTAPP_KEY,appid);Toolbar.clear();History.clear();Where.clear();LeftPane.setVisible(true);window.eval("function leftpane() {}");AppLoader.loadApp(appid,app.version,function(){AppBar.writeAppList();Engine.eval(func);Engine.evalLeftPane();});}
AppLoader._openApp2=function(appid,func){var app=AppLoader.getApp(appid);if(app==null)return;AppLoader.loadApp(appid,app.version,function(){Engine.eval(func);});}
AppLoader.getParameter=function(name){var match=RegExp('[?&]'+name+'=([^&]*)').exec(window.location.search);return match&&decodeURIComponent(match[1].replace(/\+/g,' '));}
AppLoader.clearParameters=function(){AppLoader.HREF=window.location.href;if(history.replaceState!=null){history.replaceState({},document.title,location.pathname);}}
AppLoader.injectCode=function(param){var js=AccountSettings.get(param,"");if(js!=""){try{js=Debug.interpolate(js);js+="//# sourceURL=form.dashboardjs";window.eval(js);}catch(err){App.alert("Code Error: "+err.message);}}}
AppLoader.loadApp=function(appid,version,func){Cache.storage.getApp(appid,function(obj){if(obj!=null&&obj.version!=undefined&&obj.version==version&&obj.js!=""){AppLoader.execute(appid,obj.js,func);}else{AppLoader.downloadApp(appid,version,func);}});}
AppLoader.execute=function(appid,js,func){js+="//# sourceURL="+appid+".js";window.eval(js);func();}
AppLoader.downloadApp=function(appid,version,func){var legacyappid=Cache._makeLegacyAppId(appid);var alt=(Accounts.device=="phone")?"mobile":"js";var url=User.BASE_URL+"max/"+legacyappid+"?alt="+alt+"&auth="+encodeURIComponent(User.token)+"&lang="+User.language;var http=new XMLHttpRequest();http.open("GET",url);http.onload=function(e){if(http.readyState===4){if(http.status===200){var js=http.responseText;Cache.storage.saveApp(appid,{version:version,js:js});AppLoader.execute(appid,js,func);}else{console.log("Error","AppLoader.downloadApp()")}
Toast.hideProgress();}};http.onerror=function(e){Toast.hideProgress();App.alert("Cannot Install App!");};Toast.showProgress("Installing "+appid);http.send(null);}
function now(){return Date.now();}
Date.firstDayOfWeek=function(){var defaultValue=Date.isLocaleUS()?Date.SUNDAY:Date.MONDAY;return LocalSettings.get("Calendar.firstdayofweek",defaultValue);}
Date.lastDayOfWeek=function(){return(Date.firstDayOfWeek()==Date.SUNDAY)?Date.SATURDAY:Date.SUNDAY;}
Date.isPast=function(millisec){if(millisec==0)return false;else return(millisec<new Date().getTime());}
Date.parseDate=function(dateString){try{dateString=dateString.trim();if(dateString=='')return 0;var dateParts=dateString.split("/");var year=0;var day=1;var month=0;if(dateParts.length==1){var epoch=parseInt(dateString,10);return!isNaN(epoch)?epoch:0;}else{if(Date.isLocaleUS()){month=parseInt(dateParts[0],10)-1;day=parseInt(dateParts[1],10);}else{day=parseInt(dateParts[0],10);month=parseInt(dateParts[1],10)-1;}
if(dateParts[2].length>4){dateParts[2]=dateParts[2].substr(0,4);}
year=parseInt(dateParts[2],10);if(year<=99)year+=2000;}
return new Date(year,month,day,0,0,0,0).getTime();}catch(e){return 0;}}
Date.parseTime=function(timeString){try{timeString=timeString.trim();timeString=timeString.toLowerCase();if(timeString=='')return 0;var time=new Object();time.hour=0;time.min=0;time.sec=0;var pospm=timeString.indexOf('pm');var posam=timeString.indexOf('am');if(posam>-1||pospm>-1){var suffix=(pospm>-1)?"pm":"am";var pos=timeString.indexOf(' '+suffix);if(pos==-1)pos=(pospm>-1)?pospm:posam;var timePart=timeString.substring(0,pos);var parts=timePart.split(":");time.hour=parseInt(parts[0],10);time.min=parseInt(parts[1],10);if(parts.length==3)time.sec=parseInt(parts[2],10);if(suffix=='pm'&&time.hour!=12)
time.hour=time.hour+12;if(suffix=='am'&&time.hour==12)
time.hour=0;}else{var parts=timeString.split(":");time.hour=parseInt(parts[0],10);time.min=parseInt(parts[1],10);if(parts.length==3)time.sec=parseInt(parts[2],10);}
return time.hour*Date.HOUR+time.min*Date.MINUTE+time.sec*Date.SECOND;}catch(e){return 0;}}
Date.parseDateTime=function(str){str=str.trim();var index=str.indexOf(' ');if(index>0){var strDate=str.substring(0,index);var strTime=str.substring(index+1);var date=Date.parseDate(strDate)+Date.parseTime(strTime);return date;}else{return Date.parseDate(str);}}
Date.format=function(millisec){if(millisec==null||millisec==undefined)
return"";millisec=new Number(millisec);if(millisec==0)return'';var date=new Date(millisec);var day=date.getDate();var month=date.getMonth()+1;var year=date.getFullYear();if(month<10)month="0"+month;if(day<10)day="0"+day;if(Date.isLocaleUS()){return month+"/"+day+"/"+year;}else{return day+"/"+month+"/"+year;}}
Date.formatTime=function(millisec){if(millisec==null||millisec==""||millisec=="NaN")return"";millisec=new Number(millisec);if(millisec==0)return"";var date=new Date(millisec);var hours=date.getHours();var minutes=date.getMinutes();if(AccountSettings.get('timeformat')=='12hour'){return get12hourTime(hours,minutes);}else{return get24hourTime(hours,minutes);}}
Date.isLocaleUS=function(){return(User.countryCode=="US");}
Date.getDayOfWeek=function(year,month,day){var date=new Date(year,month-1,day)
var day=date.getDay();if(Date.firstDayOfWeek()==Date.MONDAY){day--;if(day==-1)day=6;}
return day;}
Date.parseDuration=function(value){var span={hours:0,minutes:0};value=parseInt(value);if(value<1||isNaN(value))return span;span.hours=Math.floor(value/60);value=value%60;span.minutes=value;return span;}
Date.isSameDay=function(date1,date2){var d1=new Date(date1);var d2=new Date(date2);return(d1.getYear()==d2.getYear()&&d1.getMonth()==d2.getMonth()&&d1.getDay()==d2.getDay());}
function Debug(){}
Debug.loadApp=function(url,resurl,target){Accounts.DEBUG=true;Debug.target=null;var path=url.substring(0,url.lastIndexOf("/"));Debug.loadJs(url,true);if(resurl!=null)Debug.loadJs(resurl,false);if(Config.include!=null){for(var i=0;i<Config.include.length;i++){var u=Config.include[i];var url2=Debug.combineUrl(path,u);Debug.loadJs(url2,true);}}
Accounts.start();}
Debug.loadLocal=function(target){Accounts.DEBUG=true;Debug.target=window.localStorage.getItem(Debug.TARGET_KEY);if(Debug.target==null)Debug.target="phone";var js=window.localStorage.getItem(Debug.LOCALJS_KEY);js=Debug.interpolate(js);js+="//# sourceURL=/DEBUGAPP.JS";window.onerror=function(msg,url,lineNumber){Debug.showError(msg,url,lineNumber);}
window.eval("function leftpane() {}");if(window.execScript)window.execScript(js);else window.eval(js);Accounts.start();}
Debug.LOCALJS_KEY="debug.localjs";Debug.TARGET_KEY="debug.target";Debug.loadJs=function(url,interpolate){var js=null;var http=new XMLHttpRequest();http.open("GET",url,false);http.send(null);var js=http.responseText;if(url.indexOf(".min.")>-1){interpolate=false}
if(interpolate)js=Debug.interpolate(js);js+="//# sourceURL="+url;window.onerror=function(msg,url2,lineNumber){Debug.showError(msg,url2,lineNumber);}
if(window.execScript)window.execScript(js);else window.eval(js);}
Debug.showError=function(msg,url,lineNumber){var funcCall=null;if(Engine._state!=null)funcCall=Engine._state.funcCall;else if(History.current()!=null)funcCall=History.current().funcCall;if(funcCall!=null)url+="#"+funcCall;if(parent.Ide!=null){if(url.indexOf("DEBUGAPP.JS")==-1&&url.indexOf("emulator.htm")==-1){lineNumber=-1;msg+=" (Internal: "+url+")";}
parent.Ide.showError(msg,url,lineNumber);return;}else{var buf=[];buf.push("Javascript Error: "+msg);buf.push("File: "+url);buf.push(" line: "+lineNumber);if(Accounts.DEBUG==true){if(console.log!=null)console.log(buf.join(" "));}}}
Debug.log=function(msg,args){if(Accounts.DEBUG==false)return;var list=[];if(args!=null){for(var i=0;i<args.length;i++){var arg=args[i];if(typeof arg==='object')arg=window.JSON.stringify(arg);list.push(arg);}
msg+=": "+list.join(", ");}
if(window.console!=null)console.log(msg);if(parent.Ide!=null&&parent.Ide.log!=null)parent.Ide.log(msg);}
Debug.interpolate=function(str){return str.replace(/\"(.*?)\"/g,function(whole,expr){return'"'+inter2(expr)+'"'});}
function inter2(str){return str.replace(/\{(.*?)\}/g,function(whole,expr){return'"+esc('+expr+')+"';});}
Debug.combineUrl=function(url,concat){var url1=url.split('/');var url2=concat.split('/');var url3=[];for(var i=0,l=url1.length;i<l;i++){if(url1[i]=='..'){url3.pop();}else if(url1[i]=='.'){continue;}else{url3.push(url1[i]);}}
for(var i=0,l=url2.length;i<l;i++){if(url2[i]=='..'){url3.pop();}else if(url2[i]=='.'){continue;}else{url3.push(url2[i]);}}
return url3.join('/');}
Debug.publishApp=function(js){js=Debug.interpolate(js);var params=new ParameterList();params.add("js",js);var data=[];data.push('<query type="publishappide" params="',params.toXMLString(),'" />');var SETTINGS_URL=User.BASE_URL+"settings2";WebRequest.postXml(SETTINGS_URL,data.join(''),Debug.onPublish);}
Debug.onPublish=function(rss){if(rss!=null){App.alert("Done");}else{App.alert("Error while Deploying");}}
Debug.writeDebugBar=function(){var onclickPhone="Debug.setTarget('phone')";var onclickTablet="Debug.setTarget('tablet')";var onclickWeb="Debug.setTarget('web')";var buf=[];buf.push('<div id=debugbar>');buf.push('<div onclick="',onclickPhone,'">Phone</div>');buf.push('<div onclick="',onclickTablet,'">Tablet</div>');buf.push('<div onclick="',onclickWeb,'">Web</div>');buf.push('</div>');return buf.join('');}
Debug.setTarget=function(target){Debug.target=target;window.localStorage.setItem(Debug.TARGET_KEY,target);Accounts.start();}
Debug.getTables=function(){var tables=[];for(var key in Config.tables){var table={};table.name=key;table.items=Query.select(key);table.columns=[];var parts=Config.tables[key].split(";");for(var i=0;i<parts.length;i++){var part=parts[i];var subparts=part.split(" ");if(subparts.length==2)table.columns.push({name:subparts[0],type:subparts[1]});else table.columns.push({name:part,type:null});}
tables.push(table);}
return tables;}
function Engine(){}
Engine._state=null;Engine._source=null;Engine.toolbarMoreItems=null;Engine.eval=function(func,offset,sourceObj,appid){Database._save();if(func==null)return;if(Config.appid==""&&appid==null)appid="";if(appid==null){appid=Engine.getFunctionAppId(func);}
var state=History.current();if(state!=null&&(offset==null||offset==0)){state.offset=History._getPageScroll();}
Engine._source=sourceObj;Engine._state=new HistoryState(appid,func,offset);Debug.log("Engine.eval",[func]);Shortcuts.clear();Toolbar.reset();Chart.reset();Thumbnail.reset();if(appid.toLowerCase()!=Config.appid.toLowerCase()){AppLoader._openApp2(appid,func);}else{eval(func);}}
Engine.getFunctionAppId=function(func){var index1=func.indexOf("(");if(index1==-1)return Config.appid;var left=func.substring(0,index1);var index2=left.indexOf(".");if(index2==-1)return Config.appid;var appid=left.substring(0,index2).toLowerCase();if(User.hasApp(appid)){return appid;}else{return Config.appid;}}
Engine.onToolbar=function(func,obj){Engine.eval(func,null,obj);}
Engine.onLeftPane=function(func,obj){LeftPane._select(obj);if(LeftPane.keepHistory==true)Engine.onTab(func);else{SearchBox.reset();History.clear();Engine.eval(func);}}
Engine.refresh=function(){Cache.invalidate();Cache.sync(function(changed){History.reload();});}
Engine.onTab=function(func){History.reload(func);}
Engine.onSearch=function(value){if(Toolbar.searchFilter==true){Filter.value=value;var current=History.current();Toolbar.tabs=[];eval(current.funcCall);return;}
if(Config.onsearch==null||Config.onsearch=="")return;if(value==""){Engine.eval("main()");return;}
History.clear();var func=Config.onsearch+"("+esc(value)+")";Toolbar.reset();Engine._state=new HistoryState(Config.appid,func,0);eval(func);}
Engine.onShow=function(){if(Engine._state!=null){if(window.history._DONOTPUSH!=true&&window.history.state!=null&&Engine._state!=null&&Engine._state.funcCall!=window.history.state.funcCall){window.history.pushState(Engine._state,Toolbar.title,"");}
else{window.history._DONOTPUSH=false;}
History._addState(Engine._state);}
Engine._state=null;U_show();Cache.sync(function(changed){if(changed){History.reload();}else{Engine.evalLeftPane();}
AppBar.setColor();});}
Engine.evalLeftPane=function(){if(Debug.target=="phone"||leftpane==null)return;List.setStyle("leftpane");leftpane();List.setStyle(null);}
window.onpopstate=function(event){if(event.state){window.history._DONOTPUSH=true;Engine.eval(event.state.funcCall);}}
function Geocode(){}
Geocode.lastPosition=null;Geocode.lastAddress=null;Geocode.getPosition=function(){if(Geocode.lastPosition!=null){return Geocode.lastPosition.coords.latitude+","+Geocode.lastPosition.coords.longitude;}else{return"";}}
Geocode.startLocation=function(){if(LocalSettings.get("system.location")!="1")return;var geoOptions={timeout:10*2000,enableHighAccuracy:true};navigator.geolocation.getCurrentPosition(Geocode.onSuccess,Geocode.onError,geoOptions);}
Geocode.onSuccess=function(position){Geocode.lastPosition=position;console.log("Location: "+JSON.stringify(position.coords));window.setTimeout(Geocode.startLocation,5*50*1000);}
Geocode.onError=function(position){if(console!=null)console.log('Geo Location Error: '+error.code);}
Geocode.geocode=function(item,callback){var address=item.address;if(address==null)address=Format.address(item.street,item.city,item.state,item.zipcode,item.country);if(address==""||item.city==""){App.alert("Could not geocode: no address");return;}
GoogleMap.preload(function(){var geocoder=new google.maps.Geocoder();App.alert("Geocoding "+address);geocoder.geocode({'address':address},function(results,status){if(status==google.maps.GeocoderStatus.OK){var position=results[0].geometry.location;var geo=position.toUrlValue();callback(geo);}else{App.alert("Could not geocode: "+address);}});});}
Geocode.batchCoder=null;Geocode.batchItems=null;Geocode.batchIndex=null;Geocode.batchTable=null;Geocode.requestCount=null;Geocode.batchcode=function(items,table){Geocode.batchIndex=0;Geocode.requestCount=0;Geocode.batchItems=items;Geocode.batchTable=table;if(App.confirm("Please note that Geocoding is limited to 2000 items per day.")==false)return;GoogleMap.preload(function(){Geocode.batchCoder=new google.maps.Geocoder();Geocode.onTimer();});}
Geocode.onTimer=function(){if(Geocode.requestCount==2000){App.alert("Geocoding max reached");return;}
var item=Geocode.batchItems[Geocode.batchIndex];if(item==null){App.alert("Geocoding complete");return;}
var address=item.address;if(address==null)address=Format.address(item.street,item.city,item.state,item.zipcode,item.country);Geocode.batchIndex++;if(address==""||item.city==""){Geocode.onTimer();return;}
Geocode.batchCoder.geocode({'address':address},function(results,status){if(status==google.maps.GeocoderStatus.OK){var position=results[0].geometry.location;var geo=position.toUrlValue();var geofield="geo";if(Geocode.batchTable=="Contacts.contacts"||Geocode.batchTable=="Contacts.companies")geofield="mapurl";Query.updateId(Geocode.batchTable,item.id,geofield,geo);App.alert("Geocoding: "+Geocode.batchIndex);}else{App.alert("Could not geocode: "+address);}
Geocode.requestCount++;window.setTimeout("Geocode.onTimer()",500);});}
function Import(){}
Import.fileCallback=null;Import.headerMap=null;Import.maps=null;Import.line=null;Import.errors=null;Import.importCsv=function(lines,mapFieldCallback,TABLE){Import.maps=new Array();Import.headerMap=new Array();Import.errors=new Array();if(App.confirm(R.DOYOUWANTTOIMPORT.replace("xx",lines.length-1))==false)return;var headerLine=lines[0];Import._parseHeader(headerLine);for(var i=1;i<lines.length;i++){var line=lines[i];if(line!=null){Import.line=line;var param=new ParameterList();for(var j=0;j<line.length;j++){var value=line[j];var name=headerLine[j];mapFieldCallback(param,name,value);}
var id=param.getValue("id");var existing=(id!=null&&id!="")?Query.selectId(TABLE,id):null;if(existing!=null){for(var k=0;k<param.array.length;k++){var key=param.array[k].name;var value=param.array[k].value;if(key!="id"&&value!=existing[key])Query.updateId(TABLE,existing.id,key,value);}}else{Query.insert(TABLE,param.toJSON());}}else{Import.errors.push("Error line not valid: "+i);}}
if(Import.errors.length>0){alert(Import.errors.join("\r\n"));}
History.reload();}
Import._parseHeader=function(headerLine){Import.headerMap=[];for(var i=0;i<headerLine.length;i++){var name=headerLine[i].trim().toLowerCase();headerLine[i]=name;Import.headerMap[name]=i;}}
Import._getLineOwner=function(){var owner=Import.getLineValue("owner");if(owner!=null&&owner!=""){return owner;}else{return User.getName();}}
Import.getLineValue=function(name){name=name.toLowerCase().trim();var index=Import.headerMap[name];if(index!=null){return Import.line[index];}else{return null;}}
Import.addError=function(text){Import.errors.push("Error Line "+(Import.lineIndex+1)+": "+text);}
Import.lookupIdByName=function(items,TABLE,lookupname){if(lookupname=="")return"";if(Import.maps==null)Import.maps=new Array();var map=Import.maps[TABLE];if(map==null){map={};Import.maps[TABLE]=map;for(var i=0;i<items.length;i++){var item=items[i];var name="";if(item.name!=null)name=item.name.trim().toLowerCase();else if(item.title!=null)name=item.title.trim().toLowerCase()
if(name!="")map[name]=item.id;}}
var id=map[lookupname.trim().toLowerCase()];if(id!=null)return id;var values={name:lookupname};if(Import._hasOwnerField(TABLE))values.owner=Import._getLineOwner();var id=Query.insert(TABLE,values);map[lookupname.trim().toLowerCase()]=id;return id;}
Import.lookupIdByMultiName=function(items,TABLE,multiname){var ids=new Array();var names=multiname.split(",");for(var i=0;i<names.length;i++){var id=Import.lookupIdByName(items,TABLE,names[i]);ids.push(id);}
return ids.join("|");}
Import.lookupIdByName2=function(TABLE,where,lookupname,oncreate){if(lookupname=="")return"";if(Import.maps==null)Import.maps=new Array();var map=Import.maps[TABLE];if(map==null){map={};Import.maps[TABLE]=map;var items=Query.select(TABLE,"*",where);for(var i=0;i<items.length;i++){var item=items[i];var name=(item.name)?item.name.trim().toLowerCase():null;if(name!="")map[name]=item.id;}}
var id=map[lookupname.trim().toLowerCase()];if(id!=null)return id;var id=oncreate(lookupname);map[lookupname.trim().toLowerCase()]=id;return id;}
Import._hasOwnerField=function(table){var TABLES=["Contacts.companies","Contacts.contacts","Sales.products","unybiz.contacts.groups"];return TABLES.contains(table);}
Import.cleanId=function(name){var id=name.replace(/\W/g,'');if(id.length)
return id;}
Import.lookupFileIdByName=function(filename){var TABLE="System.files";var map=Import.maps[TABLE];if(map==null){map={};var items=Query.select(TABLE,"id;name");for(var i=0;i<items.length;i++){var item=items[i];var name=item.name.trim().toLowerCase();if(name!="")map[name]=item.id;}
Import.maps[TABLE]=map;}
filename=filename.trim().toLowerCase()
if(filename=="")return"";return map[filename];}
Import.mapCustomField=function(formid,param,label,formattedValue){if(label==null||label==""||formattedValue==null||formattedValue==""){return;}
var custom=param.getValue("custom");var obj=(custom!=null)?JSON.parse(custom):new Object();var field=CustomFields.getFieldFromLabel(formid,label);if(field==null)return;var value=Import._getCustomFieldValue(field,formattedValue);if(value!=null)obj[field.name]=value;param.setValue("custom",JSON.stringify(obj));}
Import._getCustomFieldValue=function(field,formattedValue){var type=field.type;if(type=='date'){return Date.parseDate(formattedValue);}else if(type=='time'){return new Date(2000,0,1,0,0,0).getTime()+Date.parseTime(formattedValue);}else if(type=='duration'){return formattedValue;}else if(type=='contact'){return Import.lookupIdByMultiName(Query.select("Contacts.contacts"),"Contacts.contacts",formattedValue);}else if(type=='company'){return Import.lookupIdByMultiName(Query.select("Contacts.companies"),"Contacts.companies",formattedValue);}else if(type=='project'){return Import.lookupIdByMultiName(Query.select("Projects.projects"),"Projects.projects",formattedValue);}else if(type=='product'){return Import.lookupIdByMultiName(Query.select("Sales.products"),"Sales.products",formattedValue);}else if(type=='button'||type=="header"){return null;}else if(type=='selectmulti'){pos=formattedValue.indexOf('|');if(pos>-1)return formattedValue;var output=new Array();var names=formattedValue.split(",");for(var i=0;i<names.length;i++){var name=names[i];output.push(name.trim());}
return output.join("|");}else{return formattedValue;}}
Import.getLineCustomValues=function(table){var obj={};var fields=CustomFields.getFields(table);for(var i=0;i<fields.length;i++){var field=fields[i];var formattedValue=Import.getLineValue(field.label);var value=Import._getCustomFieldValue(field,formattedValue);if(value!=null)obj[field.name]=value;}
var custom=JSON.stringify(obj);return custom;}
Import.getLineValueDate=function(column){var value=Import.getLineValue(column);return Date.parseDate(value);}
Import.enforceNonEmpty=function(lines,column,kind){for(var i=1;i<lines.length;i++){var line=lines[i];if(line!=null){Import.lineIndex=i;Import.line=line;var value=Import.getLineValue(column);if(value==null||value=="")Import.addError(column+" is empty");if(kind=="date"){value=Import.getLineValueDate(column);if(isNaN(value))Import.addError(column+" is not a date format");}}}}
Import.getMap=function(table,column,where){var map=new HashMap();var items=Query.select(table,"*",where);for(var i=0;i<items.length;i++){var item=items[i];var key=item[column].toLowerCase().trim();map.set(key,item);}
return map;}
Import.writeFileButton=function(label,callback){if(label==null)label=R.SELECTEXCELFILE;List.forceNewLine=true;Import.fileCallback=callback;View.ensure("view",true);_html.push('<br/><div class=buttoncontainer>')
var accept=".xlsx, .csv";_html.push('<input type="file" id="fileElem" accept="',accept,'" style="display:none" onchange="Import.onOpenFile(this.files[0])"/>');_html.push(_writeBoldButton(label,"_get('fileElem').click"));_html.push('</div>');}
Import.writeSampleLink=function(HEADER,filename){_html.push('<p><a style="color:#1F7EDA" onclick="',_func("Import.onSample",HEADER.join("|"),filename),'">',R.DOWNLOAD+" "+filename+"</a></p>");}
Import.onOpenFile=function(file){_get('fileElem').value="";if(file.name.toLowerCase().endsWith(".xlsx")){Import.readExcel(file,true);}else{Import.readCsv(file);}}
Import.onSample=function(HEADER,filename){HEADER=HEADER.split("|");var csv=new CsvFile();csv.writeLine(HEADER);if(filename.endsWith(".xlsx")){var excel=new ExcelFile();excel.addSheet("Sheet 1",csv.getContent());excel.download(filename);}else{csv.download(filename);}}
Import.readCsv=function(file){var reader=new FileReader();reader.onerror=function(e){alert("Error reading file: "+e.getMessage())}
reader.onload=function(e){var csv=e.target.result;csv=csv.trim();if(csv==""){App.alert("No Data was found in this file. Check format",'error');return;}
var lines=CSVToArray(csv);if(lines.length>0&&lines[0].length==1&&lines[0][0].indexOf(';')>-1)lines=CSVToArray(csv,";");lines=Import.removeEmptyLines(lines);Import.fileCallback(lines);}
reader.readAsText(file);}
Import.readExcel=function(file,removeEmpty){var reader=new FileReader();reader.onload=function(e){var buffer=e.target.result;var index=buffer.indexOf(";base64,");if(index==-1){App.alert("Error loading file");return;}
var content=buffer.substring(index+8);var url=User.BASE_URL+"export/convertxls.aspx";var json=App.postData(url,{content:content});if(json==""){App.alert("Error converting Excel file on the server");return;}
var lines=JSON.parse(json);if(removeEmpty)lines=Import.removeEmptyLines(lines);Import.fileCallback(lines);}
reader.readAsDataURL(file);}
Import.removeEmptyLines=function(csv){var list=[];for(var i=0;i<csv.length;i++){var line=csv[i];if(Import.isEmptyLine(line)==false)list.push(line);}
return list;}
Import.isEmptyLine=function(line){if(line==null)return true;for(var i=0;i<line.length;i++){if(line[i].length>0)return false;}
return true;}
Import.pickExcelFile=function(callback){Import.fileCallback=callback;var elem=_get('fileElem');elem.setAttribute("accept",".xlsx");elem.setAttribute("onchange","Import.onPickExcel(this.files[0])");elem.click();}
Import.onPickExcel=function(file){var elem=_get('fileElem');elem.value="";var removeEmpty=false;Import.readExcel(file,removeEmpty);}
Import.getCell=function(lines,row,column){var line=(row<lines.length+1)?lines[row-1]:null;if(line==null)return null;var value=(column<lines.length+1)?line[column-1]:null;return value;}
Import.extractLine=function(lines,row,label){label=label.toLowerCase();var line=(row<lines.length+1)?lines[row-1]:null;if(line==null)return null;var foundLabel=false;for(var i=0;i<line.length;i++){var value=line[i];if(foundLabel==false){if(value&&value.toLowerCase()==label)foundLabel=true;}else if(value){return value;}}
return null;}
function Loader(){}
Loader.loadScript=function(url,callback,errorCallback,id,key){var script=document.createElement("script")
script.type="text/javascript";script.charset="UTF-8"
script.src=url;if(id)script.setAttribute("id",id);if(key)script.setAttribute("data-app-key",key);Loader._load(script,callback,errorCallback);}
Loader.loadCss=function(url,callback){var link=document.createElement("link");link.setAttribute("rel","stylesheet");link.setAttribute("type","text/css");link.setAttribute("href",url);Loader._load(link,callback);}
Loader._load=function(script,callback,errorCallback){if(callback){script.onload=callback;script.onerror=errorCallback?errorCallback:callback;};document.getElementsByTagName("head")[0].appendChild(script);}
Loader.loadUpviseResource=function(lang,callback){if(lang==null)lang="en";lang=lang.toLowerCase();var LANGS=["de","es","fr","it","pt"];if(LANGS.contains(lang)){var url=User.BASE_URL+"js/upvise."+lang+".js";Loader.loadScript(url,callback);}else{if(callback!=null)callback();}}
Loader.loadSvg=function(callback){var url="js/sprite.svg";var http=new XMLHttpRequest();http.open("GET",url);http.onload=function(){Toast.hideProgress();if(http.readyState===4){if(http.status===200){var div=document.createElement("div");div.innerHTML=http.responseText;div.style.display="none";document.body.insertBefore(div,document.body.childNodes[0]);callback();}else{callback(null);}}}
http.onprogress=function(event){Toast.showProgress(R.DOWNLOADING,event.loaded,event.total);}
http.onerror=function(event){callback(null);}
http.send();}
Loader.downloadImage=function(url,callback){var http=new XMLHttpRequest();http.open("GET",url);http.responseType="blob";http.onload=function(){Toast.hideProgress();if(http.readyState===4){if(http.status===200){var blob=http.response;callback(blob);}else{callback(null);}}}
http.onprogress=function(event){Toast.showProgress(R.DOWNLOADING,event.loaded,event.total);}
http.onerror=function(event){Toast.hideProgress();App.alert(R.ERROR);callback(null);}
http.send();}
function R(){}
function Shortcuts(){}
Shortcuts.list=[];Shortcuts.clear=function(){Shortcuts.list=[];}
Shortcuts.add=function(key,func){Shortcuts.list.push({key:key,func:func});}
Shortcuts.keypress=function(evt){var evtobj=window.event?event:evt;var unicode=evtobj.charCode?evtobj.charCode:evtobj.keyCode;var actualkey=String.fromCharCode(unicode).toLowerCase();var active=document.activeElement;if(active){if(active.contentEditable==true||active.contentEditable=="true"){if(evtobj.ctrlKey==true){if(HtmlBox.onControlShortcut(unicode)==false){evtobj.preventDefault();return false;}else return true;}else if(unicode==9){HtmlBox.onShortcutTab(evtobj.shiftKey);evtobj.preventDefault();return true;}
return true;}
var tagName=active.tagName.toLowerCase();if(tagName=="textarea"||tagName=="input"||tagName=="select"){return true;}}
if(unicode==27&&_get('popup')!=null){_set('popup',"");_hide('popup');return;}
if(evtobj.ctrlKey==true||evtobj.metaKey==true){return;}
for(i=0;i<Shortcuts.list.length;i++){var shortcut=Shortcuts.list[i];if(actualkey==shortcut.key){eval(shortcut.func);evt.cancelBubble=true;return false;}}
if(unicode==8){History.back();evt.cancelBubble=true;return false;}else if(unicode==82){Engine.refresh();evt.cancelBubble=true;return false;}else if(unicode==83){window.setTimeout("SearchBox.setFocus()",100);evt.cancelBubble=true;return false;}else if(unicode==37){NextPrevious.previous();evt.cancelBubble=true;return false;}else if(unicode==39){NextPrevious.next();evt.cancelBubble=true;return false;}
return true;}
window.document.addEventListener("keydown",Shortcuts.keypress,true);function _func(func,p1,p2,p3,p4,p5){return _writeJS(func,p1,p2,p3,p4,p5);}
function _writeJS(func,p1,p2,p3,p4,p5){if(func==null)
return;if(func.lastIndexOf(')')==func.length-1){return func;}
var params=esc(p1)+','+esc(p2)+','+esc(p3)+','+esc(p4)+','+esc(p5);return func+"("+params+")";}
function _icon(name,style){var className="icon";if(style=="white")className="iconw";else if(style=="editor")className="iconedit";else if(style=="gray")className="dots";else if(style=="small")className="small";else if(style=="big")className="iconbig";return'<svg class="'+className+'" viewBox="0 0 24 24"><use xlink:href="#icon-'+name+'" ></svg>';}
var _REGEXPS=null;function _normalize(str){if(typeof str!='string')str=new String(str);var r=str.toLowerCase();if(_REGEXPS==null){_REGEXPS=[];_REGEXPS.push([new RegExp("\\s",'g'),""]);_REGEXPS.push([new RegExp("[àáâãäå]",'g'),"a"]);_REGEXPS.push([new RegExp("æ",'g'),"ae"]);_REGEXPS.push([new RegExp("ç",'g'),"c"]);_REGEXPS.push([new RegExp("[èéêë]",'g'),"e"]);_REGEXPS.push([new RegExp("[ìíîï]",'g'),"i"]);_REGEXPS.push([new RegExp("ñ",'g'),"n"]);_REGEXPS.push([new RegExp("[òóôõö]",'g'),"o"]);_REGEXPS.push([new RegExp("œ",'g'),"oe"]);_REGEXPS.push([new RegExp("[ùúûü]",'g'),"u"]);_REGEXPS.push([new RegExp("[ýÿ]",'g'),"y"]);_REGEXPS.push([new RegExp("\\W",'g'),""]);}
for(var i=0;i<_REGEXPS.length;i++){var item=_REGEXPS[i];r=r.replace(item[0],item[1]);}
return r;}
if(typeof String.prototype.startsWith!='function'){String.prototype.startsWith=function(str){return this.indexOf(str)==0;};}
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}
if(!String.prototype.endsWith){Object.defineProperty(String.prototype,'endsWith',{value:function(searchString,position){var subjectString=this.toString();if(position===undefined||position>subjectString.length){position=subjectString.length;}
position-=searchString.length;var lastIndex=subjectString.indexOf(searchString,position);return lastIndex!==-1&&lastIndex===position;}});}
Array.prototype.contains=function(value){for(var i=0;i<this.length;i++){if(this[i]==value)return true;}
return false;}
Array.prototype.pushArray=function(items){if(this._map==null)this._map=[];for(var i=0;i<items.length;i++){var item=items[i];if(this._map[item.id]==null){this.push(item);this._map[item.id]=1;}}}
function quote(str){str=String(str);var c,i,l=str.length,o="'";for(i=0;i<l;i++){c=str.charAt(i);if(c>=' '){if(c==='\\'||c==="'"){o+='\\';}
o+=c;}else{switch(c){case'\b':o+='\\b';break;case'\f':o+='\\f';break;case'\n':o+='\\n';break;case'\r':o+='\\r';break;case'\t':o+='\\t';break;default:c=c.charCodeAt();o+='\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);}}}
return o+"'";};function esc(obj){if(obj==null)return"null";if(obj.replace){return quote(obj);}else if(obj.getTime){obj=obj.getTime();return obj;}else{return obj;}}
function list(ids){if(ids==null||ids.length==0)return"()";var buf=ids.split('|');return"('"+buf.join("','")+"')";}
function user(){return User.getName()}
function AppBar(){}
AppBar.writeAppList=function(){var right=[];var currentapp=AppLoader.getApp(Config.appid);var title='<img id="_logo" /> ';var buf2=_writeImageButton("applist","AppBar.showPopup(this,event)",title);_set("_currentapp",buf2);var logourl=AppBar.getLogoUrl();var logoObj=_get("_logo");if(logoObj!=null)logoObj.src=logourl;_set("_searchbox",SearchBox.getContent());AppBar.setColor();}
AppBar.setColor=function(){var color=AppBar.getColor();if(!color)color="#0078D7";var header=_get("header");if(header)header.style.background=color;var searchbox=_get("_searchbox");if(searchbox)searchbox.style.backgroundColor=Color.luminance(color,0.15);if(window.Windows){try{RT.TitleBar.setColor(color);}catch(e){}}}
AppBar.getColor=function(){var color=AccountSettings.get("color","").toUpperCase();if(color==""||color=="#FFFFFF")color=null;if(WebRequest.isOffline()==true)return"#525659";return color;}
AppBar.getLogoUrl=function(){var url=null;var logoid=AccountSettings.get("web.logoid","");if(logoid!=""){return Settings.getFileUrl(logoid);}
url=AccountSettings.get("logourl","");if(url!=""||url.startsWith("http"))return url;url="js/"+Accounts.getDefaultLogo("white");return url;}
AppBar.help=function(){window.open("/help","help");}
AppBar.showUser=function(source){var popup=new PopupList(source);popup.buf.push('<div class=septitle>',User.email,'</div>');popup.align='right';popup.writeItem(R.MYACCOUNT,"AppLoader.openApp('settingsapp','SettingsApp.showMyUser()')");popup.writeItem(R.SIGNOUT,"Accounts.signOut()");popup.writeItem(R.SIGNINOTHERUSER,"Accounts.showAddAccount()");var accounts=Accounts.get();if(accounts.length>1)popup.writeSeparator();for(var i=0;i<accounts.length;i++){var account=accounts[i];if(account.email!=User.email){popup.writeItem(account.email,"Accounts.signInAccount("+esc(account.email)+")");}}
popup.writeStop();}
AppBar.showPopup=function(source,event){var buf=[];var apps=AppLoader.getAppList();for(i=0;i<apps.length;i++){var app=apps[i];var onclick=_writeJS("AppLoader.openApp",app.id);if(i>0&&i%3==0)buf.push("<br/>");buf.push('<div class=item2 onclick="',onclick,'">',_icon(app.icon),'<span class=title>',app.title,'<span></div>');}
if(Accounts.device=="phone"){buf.push('<div class="addnewapp" href=# onclick="Accounts.signOut()">',R.SIGNOUT,'</div>');}else if(User.isAdmin()){buf.push('<div class="addnewapp" href=# onclick="AppBar.addMoreApps()">',R.ADDNEWAPP,'</div>');}
var popup=new PopupList(source);popup.className="popupapp";popup.buf=buf;popup.align="bottom";popup.writeStop();}
AppBar.addMoreApps=function(){AppLoader.openApp('settingsapp','SettingsApp.showAppList()');}
function Camera(){}
Camera.width=640;Camera.height=0;Camera.stream=null;Camera.sources=[];Camera.sourceid=null;Camera.start=function(linkedtable,linkedid){var buf=[];buf.push('<div class="cameracapture" style="text-align:center;padding:20px;background-color:gray;height:100%">');buf.push('<video id="video" style="border:1px solid black;">Video stream not available.</video>');buf.push('<canvas id="canvas"></canvas>');buf.push('</div>');_html.push(buf.join(""));List.show();Camera.onStart();FilePicker.linkedtable=linkedtable;FilePicker.linkedid=linkedid;}
Camera.usePhoto=function(){if(Camera.stream!=null&&Camera.stream.stop!=null){Camera.stream.stop();}
Camera.stream=null;var MIME="image/jpeg";var data=canvas.toDataURL(MIME);var offset=data.indexOf(";base64,");if(offset==-1){App.alert("Error Photo");return;}
var values={name:"Photo "+Format.time(Date.now()),mime:MIME};values.content=data.substring(offset+8);values.size=window.atob(values.content).length;FilePicker.insertFile(values);Cache.sync(function(){History.back();});}
Camera.onStart=function(){_hide("canvas");_show("video");var video=document.getElementById('video');Camera.setToolbarTake();navigator.getUserMedia=(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia);var constraints={audio:false,video:true};if(Camera.sourceid!=null){constraints.video={optional:[{sourceId:Camera.sourceid}]};}
navigator.getUserMedia(constraints,function(stream){Camera.stream=stream;if(navigator.mozGetUserMedia){video.mozSrcObject=stream;}else{var vendorURL=window.URL||window.webkitURL;video.src=vendorURL.createObjectURL(stream);}
video.play();},function(err){console.log("An error occured! "+err);});video.addEventListener('canplay',function(ev){Camera.height=video.videoHeight/(video.videoWidth/Camera.width);if(isNaN(Camera.height)){Camera.height=Camera.width/(4/3);}
video.setAttribute('width',Camera.width);video.setAttribute('height',Camera.height);},false);}
Camera.takePicture=function(){var video=_get('video');var canvas=_get('canvas');var context=canvas.getContext('2d');canvas.width=Camera.width;canvas.height=Camera.height;context.drawImage(video,0,0,canvas.width,canvas.height);_show("canvas");_hide("video");Camera.setToolbarUse();}
Camera.retake=function(){_show("video");_hide("canvas");Camera.setToolbarTake();}
Camera.setToolbarUse=function(){var buf=[];buf.push(Camera.writeButton("Use Photo","Camera.usePhoto()"));buf.push(Camera.writeButton("Retake","Camera.retake()"));_set("toolbar",buf.join(""));}
Camera.setToolbarTake=function(){var buf=[];buf.push(Camera.writeButton("Take Picture","Camera.takePicture()"));_set("toolbar",buf.join(""));}
Camera.writeButton=function(label,onclick){var buf=[];buf.push('<div class=button index=0 onclick="',onclick,'"><span>',label,'</span></div>');return buf.join("");}
function Css(){}
Css.styles=[];Css.add=function(selector,value){Css.styles.push(selector+" "+"{"+value+"}");}
Css.inject=function(){var node=document.createElement('style');node.innerHTML=Css.styles.join("\n");document.body.appendChild(node);Css.styles=[];}
function FilePicker(){}
FilePicker.clear=function(){FilePicker.linkedtable=null;FilePicker.linkedid=null;FilePicker.folderid=null;FilePicker.files=null;FilePicker.action=null;FilePicker.fileid=null;}
FilePicker.clear();FilePicker.afterShow=function(){FilePicker.clear();var fileElem=_get('fileElem');var one=_get('one');if(fileElem==null){fileElem=document.createElement('input');fileElem.id='fileElem';fileElem.setAttribute("type","file");fileElem.setAttribute("style","display:none");fileElem.setAttribute("multiple","multiple");fileElem.setAttribute("onchange","FilePicker.onPick(this.files)");one.insertBefore(fileElem,one.childNodes[0]);}}
FilePicker.pick=function(linkedtable,linkedid,folderid,action,onclick){FilePicker.fileid=null;FilePicker.linkedtable=linkedtable;FilePicker.linkedid=linkedid;FilePicker.folderid=folderid;FilePicker.action=action;FilePicker.onclick=onclick;var fileElem=_get('fileElem');_get('fileElem').value="";_get('fileElem').click();}
FilePicker.pickUpdate=function(fileid,onclick){FilePicker.fileid=fileid;FilePicker.action="update";FilePicker.onclick=onclick;var fileElem=_get('fileElem');_get('fileElem').value="";_get('fileElem').click();}
FilePicker.onPick=function(files){FilePicker.files=files;FilePicker.onLoadFile(0);}
FilePicker.onLoadFile=function(index){var reader=new FileReader()
reader.onerror=function(stuff){alert("Error reading file: "+stuff.getMessage());}
reader.onload=function(e){var buffer=e.target.result;var offset=buffer.indexOf(";base64,");if(offset==-1){alert("Error loading file");return;}
var values={name:file.name,mime:file.type};values.content=buffer.substring(offset+8);values.size=window.atob(values.content).length;if(FilePicker.action=="importpdf"){FilePicker.insertImportPdf(values,index);}else if(FilePicker.action=="update"){FilePicker.updateFile(file,values);FilePicker.onFinished();}else{FilePicker.insertFile(values);Cache.sync(function(){index++;if(index<FilePicker.files.length){FilePicker.onLoadFile(index);}else{FilePicker.onFinished();}});}}
var file=FilePicker.files[index];reader.readAsDataURL(file);}
FilePicker.insertFile=function(values){values.owner=User.getName();values.date=Date.now();values.linkedtable=FilePicker.linkedtable;values.linkedrecid=FilePicker.linkedid;values.folderid=FilePicker.folderid;FilePicker.forceId(values);if(values.id){var file=Query.selectId("system.files",values.id);if(file){FilePicker.updateFile2(file,values);return;}}
var fileid=Query.insert("System.files",values);if(FilePicker.onclick!=null){var onclick=FilePicker.onclick.replace("this.id",esc(fileid));Engine.eval(onclick);}}
FilePicker.forceId=function(values){var hasId=values.name&&values.name.startsWith("ID#");if(hasId){values.id=values.name.substring(3);values.folderid="system";values.owner="";}}
FilePicker.updateFile=function(blob,values){var file=Query.selectId("System.files",FilePicker.fileid);if(file.kind==1){FilePicker.ensureSameSize(file.id,blob,function(yes,msg){if(yes==false){window.alert("Floor plan must be same dimension: "+msg);}else{FilePicker.updateFile2(file,values);}});}else{FilePicker.updateFile2(file,values);}}
FilePicker.updateFile2=function(file,values){var version=file.version;if(version=="")version=1;version=version+1;Query.updateId("System.files",file.id,"mime",values.mime);Query.updateId("System.files",file.id,"content",values.content);Query.updateId("System.files",file.id,"size",values.size);Query.updateId("System.files",file.id,"version",version);Query.updateId("System.files",file.id,"date",Date.now());if(FilePicker.onclick!=null){var onclick=FilePicker.onclick.replace("this.id",esc(file.id));Engine.eval(onclick);}}
FilePicker.insertImportPdf=function(values,index){values.linkedtable=FilePicker.linkedtable;values.linkedrecid=FilePicker.linkedid;values.folderid=FilePicker.folderid;if(values.mime!="application/pdf"){FilePicker.clear();App.alert("Error: Please select a PDF File");return;}
var URL=User.BASE_URL+"importpdf?auth="+encodeURIComponent(User.token);if(AccountSettings.get("projects.indexpdf","1")=="1")URL+="&indexpdf=1";var message=values.name;App.postDataAsync(URL,values,message,function(){index++;if(index<FilePicker.files.length){FilePicker.onLoadFile(index);}else{Cache.invalidate();FilePicker.onFinished();}});}
FilePicker.onFinished=function(){FilePicker.clear();Engine.refresh();}
FilePicker.getImageSizeFromId=function(fileid,callback){var file=Query.selectId("System.files",fileid);var key=file.id+":"+file.version;Cache.storage.getImage(key,function(blob){if(blob!=null){FilePicker.getImageSizeFromBlob(blob,callback);}else{var url=Settings.getFileUrl(file.id);Loader.downloadImage(url,function(blob){FilePicker.getImageSizeFromBlob(blob,callback);Cache.storage.saveImage(key,blob);});}});}
FilePicker.getImageSizeFromBlob=function(blob,callback){var img=new Image();img.onload=function(){callback(img.naturalWidth,img.naturalHeight);};img.src=URL.createObjectURL(blob);}
FilePicker.ensureSameSize=function(fileid,blob,callback){FilePicker.getImageSizeFromId(fileid,function(width,height){FilePicker.getImageSizeFromBlob(blob,function(newWidth,newHeight){var ok=(width==newWidth&&height==newHeight);callback(ok,width+"x"+height+" px");});});}
FilePicker.DROPBOX_KEY="j5ckdwyye6a4ii6";FilePicker.DROPBOX_ID="dropboxjs";FilePicker.DROPBOX_URL="https://www.dropbox.com/static/api/1/dropbox.js";FilePicker.showDropbox=function(linkedtable,linkedid){FilePicker.linkedtable=linkedtable;FilePicker.linkedid=linkedid;FilePicker.folderid=null;FilePicker.loadDropbox(FilePicker.onShowDropbox);}
FilePicker.loadDropbox=function(callback){if(typeof Dropbox==="undefined"){Loader.loadScript(FilePicker.DROPBOX_URL,callback,FilePicker.onError,FilePicker.DROPBOX_ID,FilePicker.DROPBOX_KEY);}else if(callback!=null){callback();}}
FilePicker.onShowDropbox=function(){var options=new Object();options.linkType="preview";options.success=FilePicker.onDropboxSuccess;Dropbox.choose(options);}
FilePicker.onDropboxSuccess=function(files){for(var i=0;i<files.length;i++){var file=files[i];var values={name:file.name,externalurl:file.link};FilePicker.insertFile(values);}
FilePicker.onFinished();}
FilePicker.rotate=function(id,angle){var URL=User.BASE_URL+"importpdf?auth="+encodeURIComponent(User.token);var values={action:"rotate",id:id,angle:angle};App.postDataAsync(URL,values,null,function(){Engine.refresh();});}
FilePicker.duplicatePicture=function(fileid,name){var file=Query.selectId("System.files",fileid);if(file==null)return;var key=file.id+":"+file.version;var values=Utils.clone(file);values.version=0;values.owner=User.getName();values.date=Date.now();if(name)values.name=name;var newfileid=Query.insert("System.files",values);Cache.storage.getImage(key,function(blob){if(blob!=null){FilePicker.onDuplicatePicture(newfileid,blob);}else{var url=Settings.getFileUrl(file.id);Loader.downloadImage(url,function(blob){FilePicker.onDuplicatePicture(newfileid,blob);Cache.storage.saveImage(key,blob);});}});return newfileid;}
FilePicker.onDuplicatePicture=function(newfileid,blob){var reader=new FileReader();reader.onload=function(e){var buffer=e.target.result;var offset=buffer.indexOf(";base64,");if(offset==-1){alert("Error loading file");return;}
var content=buffer.substring(offset+8);Query.updateId("System.files",newfileid,"version",1);Query.updateId("System.files",newfileid,"content",content);Engine.refresh();}
reader.readAsDataURL(blob);}
function GoogleDrive(){}
GoogleDrive.picker=null;GoogleDrive.APIKey="AIzaSyA6pQDqp7XoAQFYZz0LZIshtJC_8zgL2ZU";GoogleDrive.ClientID="759021584733.apps.googleusercontent.com";GoogleDrive.pickerApiLoaded=false;GoogleDrive.oauthToken=null;GoogleDrive.showPicker=function(linkedtable,linkedid){FilePicker.linkedtable=linkedtable;FilePicker.linkedid=linkedid;FilePicker.folderid=null;_hide('popup2');if(typeof gapi==="undefined"){Loader.loadScript("https://apis.google.com/js/api.js",function(){gapi.load('auth',{'callback':GoogleDrive.onAuthApiLoad});gapi.load('picker',{'callback':GoogleDrive.onPickerApiLoad});},GoogleDrive.onError);}else{GoogleDrive.onAuthApiLoad();}}
GoogleDrive.onError=function(){App.alert("No Network Connection!");}
GoogleDrive.onAuthApiLoad=function(){var scope="https://www.googleapis.com/auth/drive";window.gapi.auth.authorize({'client_id':GoogleDrive.ClientID,'scope':scope,'immediate':false},GoogleDrive.handleAuthResult);}
GoogleDrive.handleAuthResult=function(authResult){if(authResult&&!authResult.error){GoogleDrive.oauthToken=authResult.access_token;GoogleDrive._createPicker();}}
GoogleDrive.onPickerApiLoad=function(){GoogleDrive.pickerApiLoaded=true;GoogleDrive._createPicker();}
GoogleDrive._createPicker=function(){if(!GoogleDrive.pickerApiLoaded||!GoogleDrive.oauthToken)return;var view=new google.picker.View(google.picker.ViewId.DOCS);var folderView=new google.picker.DocsView(google.picker.ViewId.FOLDERS);folderView.setIncludeFolders(true);folderView.setSelectFolderEnabled(true);GoogleDrive.picker=new google.picker.PickerBuilder().setAppId('759021584733').addView(view).addView(new google.picker.DocsUploadView()).addView(folderView).setOAuthToken(GoogleDrive.oauthToken).setDeveloperKey(GoogleDrive.APIKey).setCallback(GoogleDrive.onCallback).enableFeature(google.picker.Feature.MULTISELECT_ENABLED).build();GoogleDrive.picker.setVisible(true);}
GoogleDrive.onCallback=function(data){if(data.action==google.picker.Action.PICKED){GoogleDrive.picker=null;var docs=data.docs;for(var i=0;i<docs.length;i++){var doc=docs[i];var values={name:doc.name,externalurl:doc.url,mime:doc.mimeType};FilePicker.insertFile(values);}
FilePicker.onFinished();FilePicker.clear();History.reload();App.alert("File Attached!");}}
function Groups(){}
Groups.TABLE=null;Groups.LINKEDTABLE=null;Groups.rankField=null;Groups.LINKEDFIELD="groupid";Groups.TITLE=null;Groups.NAMEFIELD=null;Groups.configure=function(table,linkedTable){Groups.TABLE=table;Groups.LINKEDTABLE=linkedTable;Groups.TITLE=R.GROUPS;Groups.NAMEFIELD="name";}
Groups.editGroups=function(){Toolbar.addButton(R.NEWGROUP,"Groups.newGroup()","new");Toolbar.moreButton=false;var orderby=(Groups.rankField!=null)?Groups.rankField:Groups.NAMEFIELD;var groups=Query.select(Groups.TABLE,null,null,orderby);for(var i=0;i<groups.length;i++){var group=groups[i];var title=group[Groups.NAMEFIELD];if(Groups.rankField!=null)title=group[Groups.rankField]+". "+title;List.add([title,""],"Groups.edit("+esc(group.id)+")","img:folder;priority:"+group.color);}
List.show();}
Groups.newGroup=function(){Toolbar.setTitle(R.NEW);Toolbar.addButton(R.SAVE,"Groups.saveNewGroup()","save");List.addTextBox(Groups.NAMEFIELD,R.NAME,"");if(Groups.rankField!=null)List.addTextBox(Groups.rankField,R.RANK,"");List.show("pane");}
Groups.saveNewGroup=function(){if(List.getValue(Groups.NAMEFIELD)=="")return;var values={};values[Groups.NAMEFIELD]=List.getValue(Groups.NAMEFIELD);if(Groups.rankField!=null)values[Groups.rankField]=List.getValue(Groups.rankField);Query.insert(Groups.TABLE,values);History.reload();}
Groups.edit=function(id){var group=Query.selectId(Groups.TABLE,id);if(group==null){return;}
var onchange="Query.updateId("+esc(Groups.TABLE)+","+esc(id)+",this.id,this.value)";Toolbar.setTitle(R.EDIT);Toolbar.setStyle("edit");Toolbar.addDeleteButton("Groups.deleteGroup("+esc(id)+")");List.addTextBox(Groups.NAMEFIELD,R.NAME,group[Groups.NAMEFIELD],onchange);if(Groups.LINKEDTABLE=="Projects.projects"){List.addTextBox("color",R.COLOR,group.color,onchange,"color");}
if(Groups.rankField!=null){List.addTextBox(Groups.rankField,R.RANK,group[Groups.rankField],onchange);}
List.show();}
Groups.deleteGroup=function(id){if(Groups.LINKEDTABLE!=null){var set={};set[Groups.LINKEDFIELD]="";var where=Groups.LINKEDFIELD+"="+esc(id);Query.update(Groups.LINKEDTABLE,set,where);}
Query.deleteId(Groups.TABLE,id);History.back();}
Groups.getName=function(id){var group=Query.selectId(Groups.TABLE,id);return(group!=null)?group[Groups.NAMEFIELD]:"";}
function LeftPane(){}
LeftPane._buf=[];LeftPane.keepHistory=false;LeftPane.selected=null;LeftPane.addItem=function(label,onclick,style){style=List._parseStyle(style);var className=LeftPane.isSelected(onclick)?' class=selected':'';onclick="Engine.onLeftPane("+esc(onclick)+",this)";LeftPane._buf.push('<table cellspacing=0 onclick="',onclick,'" ',className,'><tr>');if(style!=null&&style.img!=null)LeftPane._buf.push('<td class=img>',_icon(style.img),'</td>');LeftPane._buf.push('<td class="label"><div>');if(style!=null&&style.count!=null){LeftPane._buf.push('<span class="count">',style.count,'</span>');}
LeftPane._buf.push(label,'</div></td></tr></table>');}
LeftPane.addCheckBox=function(id,label,color,onchange,checked){var onchange=onchange+"(this.id, this.checked)";LeftPane._buf.push('<table cellspacing=0><tr>');LeftPane._buf.push('<td xclass=number style="padding-left:10px;width:30px"><input id="',id,'" type=checkbox onchange="',onchange,'" ');if(checked)LeftPane._buf.push(" checked ");LeftPane._buf.push('/></td>');LeftPane._buf.push('<td class=img><div style="width:16px;height:16px;background-color:',color,'"></div></td>');LeftPane._buf.push('<td class="label">',label,'</td>');LeftPane._buf.push('</tr></table>');}
LeftPane.addHeader=function(label){if(label==null||label=="")LeftPane._buf.push('<div class="section2"></div>');else LeftPane._buf.push('<div class=section>',label,'</div>');}
LeftPane.addCalendar=function(date,onclick){LeftPane._buf.push(CalendarNav.write(date,onclick));}
LeftPane.show=function(){var buf=LeftPane._buf.join('');LeftPane._buf=[];LeftPane.selected=null;_set('leftpane',buf);}
LeftPane.setVisible=function(yes){var leftpane=_get("leftpane");if(leftpane)leftpane.style.display=yes?"":"none";}
LeftPane._select=function(obj){var current=_get("leftpane").querySelector('[class=selected]');if(current!=null)current.className="";if(obj!=null)obj.className="selected";}
LeftPane.isSelected=function(onclick){if(onclick==null||onclick=="")return false;if(onclick==LeftPane.selected)return true;var current=(History.current()!=null)?History.current().funcCall:null;return current==onclick;}
function NextPrevious(){}
NextPrevious.list=[];NextPrevious.add=function(onclick){if(onclick!=null)NextPrevious.list.push(onclick);}
NextPrevious.addSection=function(){NextPrevious.add("");}
NextPrevious.getItems=function(){if(History.current()==null||History.previous()==null)return[];var funcCall=History.current().funcCall;var previous=History.previous();var items=previous.nextprevious;if(items==null)return[];var sectionStart=-1;for(var i=0;i<items.length;i++){var item=items[i];if(item==""){sectionStart=i;}else{if(funcCall.startsWith(item.substring(0,item.length-1))){selectedIndex=i;break;}}}
if(sectionStart==-1)return[];var list=[];for(var i=sectionStart+1;i<items.length;i++){var item=items[i];if(item=="")break;list.push(item);}
return list;}
NextPrevious.next=function(){var items=NextPrevious.getItems();for(var i=0;i<items.length;i++){var item=items[i];if(NextPrevious.isSelected(item)&&i<items.length-1){var next=items[i+1];History.reload(next);return;}}}
NextPrevious.previous=function(){var items=NextPrevious.getItems();for(var i=0;i<items.length;i++){var item=items[i];if(NextPrevious.isSelected(item)&&i>0){var previous=items[i-1];History.reload(previous);return;}}}
NextPrevious.getContent=function(){var items=NextPrevious.getItems();if(items==null||items.length<2)return"";for(var i=0;i<items.length;i++){var item=items[i];if(NextPrevious.isSelected(item)){var index=i+1;return""+index+" "+R.OF+" "+items.length;}}}
NextPrevious.isSelected=function(item){if(History.current()==null)return false;var funcCall=History.current().funcCall;item=item.substring(0,item.length-1);return funcCall.startsWith(item);}
FilePicker.ONE_DRIVE_ID="e420befd-ba0d-4e78-9e62-81928e527503";FilePicker.showOneDrive=function(linkedtable,linkedid){FilePicker.linkedtable=linkedtable;FilePicker.linkedid=linkedid;FilePicker.folderid=null;_hide('popup2');if(typeof OneDrive==="undefined"){Loader.loadScript("https://js.live.net/v7.0/OneDrive.js",FilePicker.createOneDrive,FilePicker.onError);}else{FilePicker.createOneDrive();}}
FilePicker.onError=function(){App.alert("No Network Connection!");}
FilePicker.createOneDrive=function(){var odOptions={clientId:FilePicker.ONE_DRIVE_ID,action:"share",multiSelect:true,openInNewWindow:true,advanced:{redirectUri:"https://www.upvise.com/uws/onedrive.htm"},success:"oneDriveFilePickerSuccess",error:"oneDriveFilePickerError"};OneDrive.open(odOptions);}
var oneDriveFilePickerError=function(e){alert("Error: "+e.name);}
var oneDriveFilePickerSuccess=function(response){for(var i=0;i<response.value.length;i++){var item=response.value[i];var values={name:item.name,externalurl:item.webUrl,mime:""};FilePicker.insertFile(values);}
FilePicker.onFinished();FilePicker.clear();History.reload();App.alert("File Attached!");}
function PasswordChange(){}
PasswordChange.showForm=function(){var logo=Accounts.getDefaultLogo();var buf=[];buf.push('<div id="appbar"></div>');buf.push('<div class="si_top">');buf.push('<img src="js/',logo,'" alt="Upvise Logo"/>');buf.push('<h1>',"Change your password",'</h1>');buf.push('</div>');buf.push('<div id="content" class="si_main">');buf.push('<form class="frm" id="_frm" name="_frm" autocomplete="OFF">');buf.push('<br/>');buf.push('<input type="password" autocomplete="off" id="password" name="password" placeholder="',"New Password",'" />');buf.push('<br/>');buf.push('<div class="button save" tabindex="0" onclick="PasswordChange.send()">',"Change Password",'</div>');buf.push('<br/>');buf.push('</form>');buf.push('</div>');document.body.innerHTML=buf.join('');}
PasswordChange.send=function(){var password=List.getValue('password');if(password==null||password.length<7){List.focus("password");App.alert(R.ERRPASSWORD);return;}
var token=AppLoader.getParameter("token");if(token==null){App.alert("No Token");return;}
var data=new FormData();data.append("action","change");data.append("token",token);data.append("password",password);WebRequest._execute('POST',User.BASE_URL+"password",data,PasswordChange.onResponse);}
PasswordChange.onResponse=function(channel){if(channel.error!=null){List.setValue("password","");App.alert(channel.error);}else{AppLoader.clearParameters();var buf=[];buf.push("<p>","Thanks you. Your password was changed.","</p>");buf.push('<br/>');buf.push('<div class="button save" onclick="Accounts.start()">',R.SIGNIN,'</div>');_get("content").innerHTML=buf.join("");}}
function PasswordReset(){}
PasswordReset.showForm=function(){var logo=Accounts.getDefaultLogo();var buf=[];buf.push('<div id="appbar">');buf.push('</div>');buf.push('<div class="si_top">');buf.push('<img src="js/',logo,'" alt="Upvise Logo"/>');buf.push('<h1>',"Reset Password",'</h1>');buf.push('</div>');buf.push('<div id="content" class="si_main">');buf.push('<form class="frm" id="_frm" name="_frm" autocomplete="OFF">');buf.push('<br/>');buf.push('<input type="text" placeholder="',R.EMAIL,'" id="email" name="email" autofocus/>');buf.push('<br/>');buf.push('<div id="div1"></div>');buf.push('<br/>');buf.push('<div class="button save" tabindex="0" id="signup" onclick="PasswordReset.send()">',"Reset Password",'</div>');buf.push('<br/>');buf.push('</form>');buf.push('</div>');buf.push('<div class="si_bottom">',"Already have an account?",' <a href="javascript:Signin.showForm()">',R.SIGNIN,'</a>.<br/>')
document.body.innerHTML=buf.join('');Loader.loadScript('https://www.google.com/recaptcha/api.js?onload=oncaptcha&render=explicit');}
PasswordReset.send=function(){var email=List.getValue('email');if(isEmail(email)==false){App.alert(R.EMAILNOTVALID);List.focus("email");return;}
var captcha=grecaptcha.getResponse();if(captcha==""){App.alert("Click on captcha");return;}
var data=new FormData();data.append("action","reset");data.append("email",email);data.append("captcha",captcha);WebRequest._execute('POST',User.BASE_URL+"password",data,PasswordReset.onResponse);}
PasswordReset.onResponse=function(channel){if(channel.error!=null){List.setValue("email","");List.focus("email");App.alert(channel.error);grecaptcha.reset();}else{var buf=[];buf.push("<p>","Your request has been submitted! Please check your email and click on the link in the email to create a new password.","</p>");_get("content").innerHTML=buf.join('');}}
function SearchBox(){}
SearchBox.timer=null;SearchBox.getContent=function(){var buf=[];var onkeydown="SearchBox.onSearchChange(event.keyCode)";buf.push(_icon("search","white"),' <input id=searchInput type=text placeholder="',R.INSTANTSEARCH,'" value="" onkeydown="',onkeydown,'"/>');return buf.join('');}
SearchBox.onSearchChange=function(keycode){clearTimeout(SearchBox.timer);SearchBox.timer=setTimeout("SearchBox.onSearch()",300);}
SearchBox.onSearch=function(){clearTimeout(SearchBox.timer);var value=SearchBox.getSearch();Engine.onSearch(value);}
SearchBox.getSearch=function(){var searchField=_get('searchInput');return(searchField!=null)?searchField.value:"";}
SearchBox.reset=function(){var searchField=_get('searchInput');if(searchField)searchField.value="";}
SearchBox.setFocus=function(){var searchField=_get('searchInput');if(searchField)searchField.focus();}
function Signin(){}
Signin.showForm=function(){Accounts.setFavIcon("Login");var logo=Accounts.getDefaultLogo();var buf=[];buf.push('<div id="appbar"></div>');buf.push('<div class="si_top">');buf.push('<img src="js/',logo,'" />');buf.push('<h1>Please Sign In</h1>');buf.push('</div>');buf.push('<div class="si_main">');buf.push('<form class="frm" id="_frm" name="_frm" autocomplete="OFF">');buf.push('<br/>');buf.push('<input type="text" placeholder="',R.EMAIL,'" id="email" name="email" autofocus/>');buf.push('<br/>');buf.push('<input type="password" id="password" name="password" placeholder="',R.PASSWORD,'" onkeydown="if(event.keyCode==13) Signin.send()" />');buf.push('<br/>');buf.push('<div id="div1"></div>');buf.push('<br/>');buf.push('<div class="button save" tabindex="0" id="signin" onclick="Signin.send()">',R.SIGNIN,'</div>');buf.push('<br/>');buf.push('<br/>');buf.push('</form>');buf.push('</div>');buf.push('<div class="si_bottom"><a href="javascript:PasswordReset.showForm()">',R.FORGOTPASSWORD,'</a></div>');if(Accounts.getOem()!="novade"){buf.push('<div class="si_bottom" id="createaccount">',R.NOACCOUNTYET,' <a href="javascript:Signup.showForm()">',R.CREATEACCOUNT,'</a>.</div>');}
document.body.innerHTML=buf.join('');}
Signin.send=function(){var email=List.getValue('email');var password=List.getValue('password');if(email==null||email.length==0){App.alert(R.EMAIL_ERR);_get("email").focus();return;}
if(isEmail(email)==false){App.alert(R.EMAILNOTVALID);_get("email").focus();return;}
if(password==null||password.length==0){App.alert(R.PASSWORD_ERR);_get("password").focus();return;}
var data=new FormData();data.append("email",email);data.append("password",password);WebRequest._execute('POST',User.BASE_URL+"logon",data,Signin.onResponse);}
Signin.onResponse=function(channel){if(channel==null||channel.items==null||channel.items.length==0){return;}
var info=channel.items[0];Cache.deleteStores(function(){Accounts.save(info);Accounts.start();});}
function Signup(){}
Signup.showForm=function(){Accounts.setFavIcon("Signup");var logo=Accounts.getDefaultLogo();var buf=[];buf.push('<div id="appbar">');buf.push('</div>');buf.push('<div class="si_top">');buf.push('<img src="js/',logo,'"/>');buf.push('<h1>',R.CREATEACCOUNT,'</h1>');buf.push('</div>');buf.push('<div class="si_main">');buf.push('<form autocomplete="off" class="frm" id="_frm" name="_frm">');buf.push('<input type="password" name="fixchrome" style="display:none" />');buf.push('<br/>');buf.push('<input type="text" placeholder="',R.EMAIL,'" id="email" name="email" autofocus/>');buf.push('<br/>');buf.push('<input type="password" id="password" name="password" placeholder="',R.CREATEPASSWORD,'" />');buf.push('<br/>');buf.push('<input type="text" id="name" name="name" placeholder="',R.ENTERFULLNAME,'" />');buf.push('<br/>');buf.push('<input type="text" id="company" name="company" placeholder="',R.ENTERCOMPANYNAME,'" />');buf.push('<br/>');var apps=AppLoader.getParameter("apps");if(apps!=null){buf.push('<input type="hidden" id="apps" name="apps" value="',apps,'"/>');}else{buf.push('<select id="apps" name="apps"><option value="" disabled selected hidden>',R.SIGNUPAPPS1,'</option>');buf.push('<option value="fsb">',R.SIGNUPAPPS2,'</option><option value="crm">',R.SIGNUPAPPS3,'</option><option value="">',R.SIGNUPAPPS4,'</option></select>');buf.push('<br/>');}
buf.push('<div id="div1"></div>');buf.push('<br/>');buf.push('<div class="button save" tabindex="0" id="signup" onclick="Signup.signup()">',R.CREATEACCOUNT,'</div>');buf.push('<br/>');buf.push('</form>');buf.push('</div>');buf.push('<div class="si_bottom">',"Already have an account?",' <a href="javascript:Signin.showForm()">',R.SIGNIN,'</a>.<br/>')
buf.push('<br/>',R.AGREETERMS,'</div>');document.body.innerHTML=buf.join('');List.setValue("email","");List.setValue("password","");if(window.location.protocol=="https:"){Loader.loadScript('https://www.google.com/recaptcha/api.js?onload=oncaptcha&render=explicit');}}
Signup.signup=function(){var email=List.getValue('email');var password=List.getValue('password');var name=List.getValue('name');var company=List.getValue('company');var apps=List.getValue('apps');var captcha=(typeof(grecaptcha)!="undefined")?grecaptcha.getResponse():null;if(email==null||email.length<6){App.alert(R.EMAILNOTVALID);_get("email").focus();return;}
if(isEmail(email)==false){App.alert(R.EMAILNOTVALID);_get("email").focus();return;}
if(password==null||password.length<7){App.alert(R.ERRPASSWORD);_get("password").focus();return;}
if(name==""){App.alert(R.ENTERFULLNAME);_get("name").focus();return;}
if(company==""){App.alert(R.ENTERCOMPANYNAME);_get("company").focus();return;}
if(captcha==""){App.alert("Click on captcha");return;}
var date=new Date()
var timezone=-date.getTimezoneOffset()/60;var language=AppLoader.getParameter("lang");var partner=AppLoader.getParameter("partner");var country=(language=='FR')?"FR":null;var data=new FormData();data.append("email",email);data.append("password",password);data.append("name",name);data.append("company",company);data.append("timezone",timezone);if(language!=null)data.append("language",language);if(partner!=null)data.append("partner",partner);if(country!=null)data.append("country",country);if(apps!=null&&apps!="")data.append("apps",apps);if(captcha!=null)data.append("captcha",captcha);WebRequest._execute('POST',User.BASE_URL+"signup",data,Signup.onResponse);}
Signup.onResponse=function(channel){if(channel==null||channel.items==null||channel.items.length==0){return;}
var info=channel.items[0];Cache.deleteStores(function(){AppLoader.clearParameters();Accounts.save(info);Accounts.start();});}
function Thumbnail(){}
Thumbnail.cache=[];Thumbnail.started=false;Thumbnail.reset=function(){Thumbnail.images=[];}
Thumbnail.writeThumbnail=function(fileid){_html.push('<div class="filethumbnail" id="',fileid,'"');var url=Thumbnail.getCacheUrl(fileid);if(url!=null)_html.push(' style="background-image:url(',url,')"');_html.push('></div>');}
Thumbnail.getCacheUrl=function(fileid){var file=Query.selectId("System.files",fileid);if(file==null)return null;var url=Thumbnail.cache[file.id+":"+file.version];if(url!=null)return url;else Thumbnail.images.push(file);}
Thumbnail.afterShow=function(){if(Thumbnail.images.length>0&&Thumbnail.started==false){Thumbnail.started=true;Thumbnail.loadNext();}}
Thumbnail.loadNext=function(){if(Thumbnail.images.length==0){Thumbnail.started=false;Toast.hideProgress();return;}
var file=Thumbnail.images.shift();var key="thumb:"+file.id+":"+file.version;Cache.storage.getImage(key,function(blob){if(blob!=null){Thumbnail.show(file,blob);}else{var url=Settings.getFileUrl(file.id)+"&action=thumbnail";Loader.downloadImage(url,function(blob){Thumbnail.show(file,blob);Cache.storage.saveImage(key,blob);});}});}
Thumbnail.show=function(file,blob){if(file!=null&&blob!=null){var url=URL.createObjectURL(blob);Thumbnail.cache[file.id+":"+file.version]=url;var obj=_get(file.id);if(obj!=null)obj.style.backgroundImage="url("+url+")";}
Thumbnail.loadNext();}
function Toast(){}
Toast.ID="msg";Toast.ALERTID="alertmsg";Toast.WARNINGID="warning";Toast.show=function(msg,autohide){if(autohide==null)autohide=true;var obj=_get(Toast.ID);if(obj==null){obj=document.createElement("div");obj.id=Toast.ID;document.body.appendChild(obj);}
obj.innerHTML=msg;if(autohide==true)window.setTimeout("Toast.hide()",5000);}
Toast.showAlert=function(msg){var obj=_get(Toast.ALERTID);if(obj==null){obj=document.createElement("div");obj.id=Toast.ALERTID;document.body.appendChild(obj);}
obj.innerHTML=msg;}
Toast.showWarning=function(msg){var obj=_get(Toast.WARNINGID);if(obj==null){obj=document.createElement("div");obj.id=Toast.WARNINGID;document.body.appendChild(obj);}
obj.innerHTML=msg;window.setTimeout("Toast.hideWarning()",5000);}
Toast.hideAlert=function(){var obj=_get(Toast.ALERTID);if(obj!=null)obj.parentNode.removeChild(obj);}
Toast.hide=function(){var obj=_get(Toast.ID);if(obj!=null)obj.parentNode.removeChild(obj);}
Toast.hideWarning=function(){var obj=_get(Toast.WARNINGID);if(obj!=null)obj.parentNode.removeChild(obj);}
Toast.showProgress=function(msg,current,total){if(total==null||isNaN(total))total=8*1024*1024;if(msg!=null&&current!=null&&current<total){msg+=" "+Format.filesize(current);}
Toast.show(msg,false);if(current==null)return;var obj=_get("progress");if(obj==null){obj=document.createElement("div");obj.id="progress";obj.innerHTML="<div id=current></div>";document.body.appendChild(obj);}
var cur=obj.childNodes[0];var percent=(total>0)?Math.round(100*current/total):0;if(percent<0)percent=0;else if(percent>100)percent=100;cur.style.width=percent+"%";}
Toast.hideProgress=function(){Toast.hide();var obj=_get("progress");if(obj!=null)obj.parentNode.removeChild(obj);}
function Cache(){}
Cache.LBD_KEY="sync.lbd";Cache.OUTBOX_KEY="sync.outbox";Cache.init=function(){Cache.BATCH3_URL=User.BASE_URL+"batch3";Cache.DURATION=5*Date.MINUTE;Cache.storage=null;Cache.channels=new Array();Cache.outbox=new Array();Cache.loadPaths=null;Cache.loaded=false;Cache.expirationDate=0;Cache.lastBuildDate=null;}
Cache.load=function(onLoaded){if(Cache.loadPaths==null){Cache.storage.getInfo(function(list){Cache.loadPaths=list;onLoaded();});return false;}
for(var i=0;i<Cache.loadPaths.length;i++){var name=Cache.loadPaths[i].name;if(Cache.channels[name]==null){Cache.storage.loadTable(name,function(data){var table=new DatabaseTable(name,data);Cache.channels[name]=table;onLoaded();});return false;}}
Cache.lastBuildDate=window.localStorage.getItem(Cache.LBD_KEY);if(Cache.lastBuildDate==null)Cache.lastBuildDate="0";try{var outbox=window.localStorage.getItem(Cache.OUTBOX_KEY);if(outbox)Cache.outbox=JSON.parse(outbox);}catch(e){console.log("Error loading outbox:"+e.message);}
return true;}
Cache.initStorage=function(onInit){if(Cache.storage!=null){return;}
if(DBStorage.isSupported()){var dbStorage=new DBStorage();dbStorage.init(function(ok){if(ok){Cache.storage=dbStorage;onInit();}else{alert(R.BROWSERNOTSUPP_ERR);}});}else{alert(R.BROWSERNOTSUPP_ERR);}}
Cache.invalidate=function(){Cache.expirationDate=0;}
Cache.insert=function(datasrc,parameterList){Cache._addOutboxQuery('POST',datasrc,parameterList);}
Cache.updateMultiple=function(datasrc,parameterList){Cache._addOutboxQuery('UPDATEMULTIPLE',datasrc,parameterList);}
Cache._addOutboxQuery=function(action,datasrc,parameterList){datasrc=Cache._makeLegacyTable(datasrc);var buffer='<query type="'+action+'" params="'+parameterList.toXMLString()+'">/uws/user/'+datasrc+'</query>';Cache.outbox.push(buffer);}
Cache.onBatchResponse=function(rss){Cache.saveError=false;if(rss!=null&&rss.channels!=null){for(var i=0;i<rss.channels.length;i++){var channel=rss.channels[i];var table=Database._getOrCreateTable(channel.title);Cache.updateStore(table,channel);}
Cache.expirationDate=new Date().getTime()+Cache.DURATION;Cache.lastBuildDate=rss.lastBuildDate;if(Cache.saveError==true){localStorage.removeItem(Cache.LBD_KEY);}else{try{localStorage.setItem(Cache.LBD_KEY,Cache.lastBuildDate);}catch(err){}}
Toast.hideProgress();}
var dataChanged=(rss&&rss.chanels&&rss.channels.length>0);return dataChanged;}
Cache.updateStore=function(table,channel){if(channel.description!=null){table.setSchema(channel.description);}
var items=table.items;var index=table.index;var hasDeletedItems=false;var map=[];var length=items.length;for(var i=0;i<length;i++){map[items[i].id]=i;}
var rssItems=channel.items;if(rssItems==null){console.log("Critical Error: no items "+table.name);return;}
for(var i=0;i<rssItems.length;i++){var rssItem=rssItems[i];if(channel.cols&&rssItem instanceof Array){rssItem=Cache.convertArrayToObject(rssItem,channel.cols);}
var pos=map[rssItem.id];if(rssItem._deleted=="1"){if(pos!=null){hasDeletedItems=true;items[pos]=null;index[rssItem.id]=null;}}else{if(pos!=null){items[pos]=rssItem;}else{items.push(rssItem);}
index[rssItem.id]=rssItem;}}
if(channel.deleteditems){hasDeletedItems=true;for(var i=0;i<channel.deleteditems.length;i++){var deletedId=channel.deleteditems[i];var pos=map[deletedId];if(pos){items[pos]=null;index[deletedId]=null;}}}
if(hasDeletedItems){table.cleanNull();}
window.setTimeout(function(){table.saveTable();console.log("Save Complete");},10);}
Cache.deleteStores=function(onFinished){localStorage.removeItem(Cache.LBD_KEY);localStorage.removeItem(Cache.OUTBOX_KEY);if(Cache.storage!=null){Cache.storage.deleteAll();Cache.storage=null;}
Cache.init();onFinished();}
Cache._saveOutbox=function(){try{localStorage.setItem(Cache.OUTBOX_KEY,JSON.stringify(Cache.outbox));}catch(e){}}
Cache.UNYBIZ_APPS=["calendar","contacts","tasks","sales","projects","forms","ideas","expenses","files"];Cache.UNY_APPS=["notes","news","shoppinglist","debtscredits"];Cache.SYSTEM_TABLES=["system.library","system.notifications","system.files","system.users","system.settings"];Cache._makeLegacyTable=function(table){if(table.indexOf(".")==-1)table=Config.appid+"."+table;table=table.toLowerCase();for(var i=0;i<Cache.SYSTEM_TABLES.length;i++){if(table==Cache.SYSTEM_TABLES[i])return table.replace("system.","system.user.");}
for(var i=0;i<Cache.UNYBIZ_APPS.length;i++){if(table.startsWith(Cache.UNYBIZ_APPS[i]))return"unybiz."+table;}
for(var i=0;i<Cache.UNY_APPS.length;i++){if(table.startsWith(Cache.UNY_APPS[i]))return"uny."+table;}
return table;}
Cache._makeLegacyAppId=function(appid){if(appid==null)return"";appid=appid.toLowerCase();for(var i=0;i<Cache.UNYBIZ_APPS.length;i++){if(appid==Cache.UNYBIZ_APPS[i])return"unybiz."+appid;}
for(var i=0;i<Cache.UNY_APPS.length;i++){if(appid==Cache.UNY_APPS[i])return"uny."+appid;}
return appid;}
Cache._removeLegacyAppId=function(appid){appid=appid.toLowerCase();if(appid.startsWith("unybiz."))return appid.substring("unybiz.".length);else if(appid.startsWith("uny."))return appid.substring("uny.".length);else return appid;}
Cache.sync=function(callback){if(Cache.storage==null){Cache.initStorage(function(){Cache.sync(callback);});return;}
if(Cache.loaded==false){Cache.loaded=Cache.load(function(){Cache.sync(callback);});if(Cache.loaded==false)return;}
if(User.token==null)return;if(Cache.outbox.length>0){Cache._saveOutbox();}
WebRequest._networkError=false;if(WebRequest.isOffline()==true){if(callback!=null)callback(false);return;}
var hasExpired=(Cache.expirationDate<new Date().getTime());var needSync=(hasExpired||Cache.outbox.length>0);if(needSync==false){if(callback!=null)callback(false);}else{var xmlData=null;if(Cache.outbox.length>0){xmlData='<batch>'+Cache.outbox.join('')+'</batch>';}
var url=Cache.BATCH3_URL;url=WebRequest.appendUrl(url,"v",3);url=WebRequest.appendUrl(url,"lbd",Cache.lastBuildDate);url=WebRequest.appendUrl(url,"auth",User.token);WebRequest._execute('POST',url,xmlData,function(rss){Cache.outbox=[];Cache._saveOutbox();var changed=Cache.onBatchResponse(rss);if(callback)callback(changed);},true);}}
Cache.convertArrayToObject=function(array,cols){var obj={};for(var i=0;i<array.length;i++){var name=cols[i];obj[name]=array[i];}
return obj;}
function Column(column){this.name=null;this.as=null;this.func=-1;this.parse(column);}
Column.prototype.parse=function(column){var parts=column.split(" AS ");if(parts.length==2){var left=parts[0].trim();var index1=left.indexOf("(");if(index1>0){var func=left.substring(0,index1);this.name=left.substring(index1+1,left.length-1);this.as=parts[1].trim();if(func=="Format.datetime")this.func=1;else if(func=="Format.date")this.func=2;else if(func=="Format.longdate")this.func=3;else if(func=="Format.time")this.func=4;else if(func=="Format.month")this.func=5;else if(func=="Format.price")this.func=6;else if(func=="Format.distance")this.func=7;else if(func=="Format.duration")this.func=8;else this.func=-1;}}else{this.name=column;this.as=column;}}
Column.prototype.formatValue=function(value){switch(this.func){case 1:return Format.datetime(parseInt(value));case 2:return Format.date(parseInt(value));case 3:return Format.dayOfWeek(parseInt(value))+", "+Format.date(parseInt(value));case 4:return Format.time(parseInt(value));case 5:return Format.month(parseInt(value));case 6:return Format.price(parseFloat(value));case 7:return Format.distance(Settings.getDistanceTo(value));case 8:return Format.duration(parseInt(value));default:return value;}}
function Counter(columnName){this.columnName=columnName;this.groupCount=null;this.totalCount=0;this.compute=function(items){this.totalCount=items.length;this.groupCount=new Array();for(var i=0;i<this.totalCount;i++){var item=items[i];var values=item[this.columnName];if(values!=null){var ids=String(values).split("|");for(var j=0;j<ids.length;j++){var curId=ids[j];if(this.groupCount[curId]==null){this.groupCount[curId]=1;}else{this.groupCount[curId]+=1;}}}}}
this.getCount=function(groupid){var count=0;if(groupid=="all"){count=this.totalCount;}else{count=this.groupCount[groupid];}
if(count==null)count=0;return count;}}
function Data(){}
Data.selectId=function(items,id){if(items==null||id==null||id=="")return null;if(items.index!=null){var item=items.index[id];if(item!=null)return item;}
for(var i=0;i<items.length;i++){var item=items[i];if(item.id==id)return item;}
return null;}
Data.select=function(items,name1,value1,name2,value2){if(items==null||items==undefined)
return null;var length=items.length;var output=new Array();if(value1!=null&&value1.length>1&&value1.substr(0,1)=='<'){value1=value1.substr(1);for(var i=0;i<length;i++){var item=items[i];if(item[name1]<value1&&(name2==null||item[name2]==value2)){output.push(item);}}
return output;}
if(value1!=null&&value1.length>1&&value1.substr(0,1)=='>'){value1=value1.substr(1);for(var i=0;i<length;i++){var item=items[i];if(item[name1]>value1&&(name2==null||item[name2]==value2)){output.push(item);}}
return output;}
for(var i=0;i<length;i++){var item=items[i];if(item[name1]==value1&&(name2==null||item[name2]==value2)){output.push(item);}}
return output;}
Data.count=function(items,name,value){if(items==null||items.length==0)return 0;var count=0;for(var i=0;i<items.length;i++){var item=items[i];if(item[name]==value)count++;}
return count;}
Data.max=function(items,name){var max=0;for(var i=0;i<items.length;i++){var value=parseFloat(items[i][name]);if(value>max)max=value;}
return max;}
Data.numsort=function(items,fieldName){if(items==null)return null;items.sort(function(o1,o2){return parseFloat(o1[fieldName])-parseFloat(o2[fieldName]);});return items;}
Data.alphasort=function(items,fieldName){if(Settings.get('localsort','0')=='1')return Data.alphasort2(items,fieldName);if(items==null)return null;items.sort(function(o1,o2){var s1=o1[fieldName];var s2=o2[fieldName];if(s1==null&&s2==null)return 0;if(s1==null)return-1;if(s2==null)return 1;var s1=s1.toLowerCase();var s2=s2.toLowerCase();if(s1<s2)
return-1;else if(s1==s2)
return 0;else
return 1;});return items;}
Data.alphasort2=function(items,fieldName){if(items==null)return null;items.sort(function(o1,o2){var s1=o1[fieldName];var s2=o2[fieldName];if(s1==null&&s2==null)return 0;if(s1==null)return-1;if(s2==null)return 1;var s1=s1.toLowerCase();var s2=s2.toLowerCase();return s1.localeCompare(s2);});return items;}
Data.alphasorttext=function(items,fieldName){if(items==null)return null;items.sort(function(o1,o2){var s1=o1[fieldName];var s2=o2[fieldName];if(s1==null&&s2==null)return 0;if(s1==null)return-1;if(s2==null)return 1;s1=Format.text(s1.toLowerCase());s2=Format.text(s2.toLowerCase());if(s1<s2)
return-1;else if(s1==s2)
return 0;else
return 1;});return items;}
Data.search=function(items,fields,value){var ret=value.match(/[\u3400-\u9FBF]/);if(ret==null)value=_normalize(value);var results=new Array();var rankMap=[];for(var i=0;i<items.length;i++){var item=items[i];for(var j=0;j<fields.length;j++){var curValue=item[fields[j]];if(curValue!=null&&curValue!=''){curValue=curValue.toString();ret=curValue.match(/[\u3400-\u9FBF]/);if(ret==null)curValue=_normalize(curValue);if(curValue.indexOf(value)>=0){rankMap[item]=j;results.push(item);break;}}}}
results.sort(function(o1,o2){return rankMap[o1]-rankMap[o2];});return results;}
Data.matchesString=function(search,text){text=_normalize(text);var parts=search.split(" ");for(var i=0;i<parts.length;i++){var part=_normalize(parts[i]);if(part.length>0&&text.indexOf(part)==-1){return false;}}
return true;}
Data.searchSimple=function(items,field,search){var results=new Array();search=_normalize(search);for(var i=0;i<items.length;i++){var item=items[i];var value=item[field];if(value!=null){var parts=value.toString().split(" ");for(var j=0;j<parts.length;j++){var part=_normalize(parts[j]);if(part.startsWith(search)){results.push(item);break;}}}}
return results;}
function Database(){}
Database._modifiedTables={};Database.NOTIF_TABLE="System.notifications";Database.FILES_TABLE="System.files";Database.selectId=function(table,id){var aTable=Database._getTable(table);if(aTable==null||id==null||id=="")return null;var item=aTable.index[id];if(item==null)return null;else return item;}
Database.count=function(table,where){var aTable=Database._getTable(table);if(aTable==null)return 0;if(where==null||where==""){return aTable.items.length;}else{var count=0;var whereList=Parameter.parseWhere(where);var length=aTable.items.length;var items=aTable.items;for(var i=0;i<length;i++){var item=items[i];if(Database._matches(item,whereList)){count++;}}
return count;}}
Database.select=function(table,columns,where,orderby){var resultset=[];var aTable=Database._getTable(table);if(aTable==null)return[];if(where==null||where==""){resultset=aTable.items.slice();}else{var whereList=Parameter.parseWhere(where);var length=aTable.items.length;var items=aTable.items;for(var i=0;i<length;i++){var item=items[i];if(Database._matches(item,whereList)){resultset.push(item);}}}
Database._sort(resultset,orderby);return resultset;}
Database._matches=function(item,whereList){var matches=true;for(var i=0;i<whereList.length;i++){if(whereList[i].matches(item)==false){return false;}}
return true;}
Database.selectDistinct=function(table,field,where){var map=[];var list=[];var items=Database.select(table,field,where);for(var i=0;i<items.length;i++){var item=items[i];var name=item[field];if(map[name]==null){list.push(item);map[name]=1;}}
Database._sort(list,field);return list;}
Database.ids=function(table,where){var ids=[];var rows=Database.select(table,null,where);for(var i=0;i<rows.length;i++){ids.push(rows[i].id);}
return"('"+ids.join("','")+"')";}
Database.search=function(table,search,columns,where,orderby){var rows=Database.select(table,null,where);var resultset=Data.search(rows,columns.split(";"),search);Database._sort(resultset,orderby);return resultset;}
Database.searchSimple=function(table,search,column,where){var rows=Database.select(table,null,where);var resultset=Data.searchSimple(rows,column,search);Database._sort(resultset,column);return resultset;}
Database.insert=function(table,values){var existingItem=(values.id!=null)?Database.selectId(table,values.id):null;if(existingItem!=null)throw new Error("insert into table "+table+" conflict with existing id "+values.id);if(values.id==null||values.id==""){values.id=Database._guid();}
var p=new ParameterList();for(key in values){var value=values[key];if(value!=null)p.add(key,value);}
Cache._addOutboxQuery('POST',table,p);if(table==Database.NOTIF_TABLE)return;if(table==Database.FILES_TABLE){values.content=undefined;}
var aTable=Database._getTable(table);if(aTable==null)throw new Error("table "+table+" does not exist");aTable.insert(values);Database._setModified(table);return values.id;}
Database.updateId=function(table,id,field,value){var p=new ParameterList("id",id);p.add(field,value);Cache._addOutboxQuery('POST',table,p);if(table==Database.NOTIF_TABLE)return;if(table==Database.FILES_TABLE&&field=="content")return;var aTable=Database._getTable(table);if(aTable==null)return;aTable.updateId(id,field,value);Database._setModified(table);}
Database.update=function(table,values,where){var aTable=Database._getTable(table);if(where==null||where=="")return;if(aTable==null)return;var whereList=Parameter.parseWhere(where);for(var i=0;i<aTable.items.length;i++){var item=aTable.items[i];if(Database._matches(item,whereList)){for(field in values){value=values[field];aTable.updateId(item.id,field,value);var p=new ParameterList("id",item.id);p.add(field,value);Cache._addOutboxQuery('POST',table,p);}}}
Database._setModified(table);}
Database.deleteId=function(table,id,flag){if(flag==null)flag="DELETE";Cache._addOutboxQuery(flag,table,new ParameterList('id',id));if(table==Database.NOTIF_TABLE)return;var aTable=Database._getTable(table);var items=aTable.items;for(var i=0;i<aTable.items.length;i++){var item=aTable.items[i];if(item!=null&&item.id==id){aTable.items[i]=null;aTable.index[id]=null;break;}}
Database._setModified(table);}
Database.archiveId=function(table,id){Database.deleteId(table,id,"ARCHIVE");}
Database.deleteIds=function(table,ids){var map=[];for(var i=0;i<ids.length;i++){map[ids[i]]=1;}
var aTable=Database._getTable(table);var items=aTable.items;for(var i=0;i<aTable.items.length;i++){var item=aTable.items[i];if(item!=null){var id=item.id;if(map[id]!=null){aTable.items[i]=null;aTable.index[id]=null;Cache._addOutboxQuery('DELETE',table,new ParameterList('id',id));}}}
Database._setModified(table);}
Database.deleteWhere=function(table,where){var aTable=Database._getTable(table);if(aTable==null||where==null||where=="")return;var whereList=Parameter.parseWhere(where);for(var i=0;i<aTable.items.length;i++){var item=aTable.items[i];if(Database._matches(item,whereList)){aTable.items[i]=null;aTable.index[item.id]=null;Cache._addOutboxQuery('DELETE',table,new ParameterList('id',item.id));}}
Database._setModified(table);}
Database.max=function(table,column,where){var max=0;var items=Database.select(table,column,where);for(var i=0;i<items.length;i++){var item=items[i];if(item[column]>max)max=item[column];}
return max;}
Database.CHARS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');Database._guid=function(){var len=30;var radix=16;var chars=Database.CHARS,uuid=[],i;radix=radix||chars.length;for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];return uuid.join('');};Database._getOrCreateTable=function(name){var table=Cache.channels[name];if(table==null){table=new DatabaseTable(name);Cache.channels[name]=table;}
return table;}
Database._getTable=function(table){var aTable=Cache.channels[Cache._makeLegacyTable(table)];return aTable;}
Database._getTableSize=function(legacytable){var aTable=Cache.channels[legacytable];if(aTable){return{size:aTable.getSize(),count:aTable.items.length};}else{return null;}}
Database._save=function(){for(var name in Database._modifiedTables){var table=Database._getTable(name);if(table!=null){table.cleanNull();table.saveTable();}}
Database._modifiedTables={};}
Database._setModified=function(name){if(Database._modifiedTables[name]==null){Database._modifiedTables[name]=1;}}
Database._sort=function(resultset,orderby){if(orderby==null||resultset.length==0)return;var descending=false;var parts=orderby.split(" ");var fieldName=parts[0];if(parts.length>=2){if(parts[1].toUpperCase()=="DESC")descending=true;}
var isString=typeof(resultset[0][fieldName])=="string";if(isString){if(AccountSettings.get('localsort')=='1'){resultset=Data.alphasort2(resultset,fieldName);}else{resultset=Data.alphasort(resultset,fieldName);}}else{resultset=Data.numsort(resultset,fieldName);}
if(descending){resultset=resultset.reverse();}}
function DatabaseTable(name,data){this.buildIndex=function(){this.index=[];var count=this.items.length;for(var i=0;i<count;i++){this.index[this.items[i].id]=this.items[i];}}
this.name=name;this.items=(data!=null&&data.items!=null)?data.items:[];this.columns=(data!=null&&data.columns!=null)?data.columns:{};this.index=null;this.buildIndex();this.cleanNull=function(){var newItems=[];var count=this.items.length;for(var i=0;i<count;i++){if(this.items[i]!=null){newItems.push(this.items[i]);}}
this.items=newItems;}
this.setSchema=function(description){if(description==null||description=="")return;var columns=description.split("|");for(var i=0;i<columns.length;i++){var parts=columns[i].split(":");this.columns[parts[0]]=parts[1];}
for(var i=0;i<this.items.length;i++){var item=this.items[i];this.setDefaultValues(item);}}
this.setDefaultValues=function(item){for(var name in this.columns){var value=item[name];var type=this.columns[name];if(value==null){item[name]=(type=="TEXT")?"":0;}else if(type!="TEXT"&&value.replace!=null){item[name]=Number(value);}}}
this.insert=function(values){if(values.id==null||values.id=="")throw new Error("DatabaseTable.insert(values) : values must contain an id");if(this.columns!=null){this.setDefaultValues(values);}else{Accounts.signOut();location.reload();return;}
this.items.push(values);this.index[values.id]=values;}
this.updateId=function(id,field,value){var type=this.columns[field];if(type==null)throw new Error("Error UpdateId: column "+field+" does not exist in table: "+this.name);var item=this.index[id];if(item!=null){value=(type=='TEXT')?String(value):Number(value);item[field]=value;}}
this.saveTable=function(){var ok=Cache.storage.saveTable({name:this.name,columns:this.columns,items:this.items});return ok;}
this.getSize=function(){return window.JSON.stringify(this.items).length;}}
function DBStorage(){this.db=null;DBStorage.TABLES="tables";DBStorage.APPS="apps";DBStorage.IMAGES="images";}
DBStorage.isSupported=function(){return(window.indexedDB!=null);}
DBStorage.prototype.init=function(callback){var aThis=this;var request=window.indexedDB.open("upvise",3);request.onupgradeneeded=function(e){var aDb=e.target.result;if(aDb.objectStoreNames.contains(DBStorage.TABLES)==false){aDb.createObjectStore(DBStorage.TABLES);}
if(aDb.objectStoreNames.contains(DBStorage.APPS)==false){aDb.createObjectStore(DBStorage.APPS);}
if(aDb.objectStoreNames.contains(DBStorage.IMAGES)==false){aDb.createObjectStore(DBStorage.IMAGES);}}
request.onsuccess=function(e){aThis.db=e.target.result;callback(true);}
request.onerror=function(e){if(console!=null)console.log("Error opening IndexedDB: !"+e.message)
callback(false);}}
DBStorage.prototype.loadTable=function(table,onLoaded){window.localStorage.removeItem(table);var store=this._getStore(DBStorage.TABLES);var request=store.get(table);request.onsuccess=function(e){var data=e.target.result;onLoaded(data);}
request.onerror=function(err){onLoaded(null);}}
DBStorage.prototype.saveTable=function(data){var store=this._getStore(DBStorage.TABLES,"readwrite");var key=data.name;store.put(data,key);}
DBStorage.prototype.deleteAll=function(){if(this.db!=null){this.db.close();this.db=null;}
var request=window.indexedDB.deleteDatabase("upvise");request.onsuccess=function(e){}
request.onerror=function(e){}}
DBStorage.prototype.getFileSize=function(filename,onFileSize){this.loadTable(filename,function(store){var size=(store!=null)?JSON.stringify(store).length:0;onFileSize(size);});}
DBStorage.prototype.getInfo=function(onFinished){var list=[];var store=this._getStore(DBStorage.TABLES);var cursor=store.openCursor();cursor.onsuccess=function(e){var res=e.target.result;if(res){list.push({name:res.key,type:2});res.continue();}else{onFinished(list);}}
cursor.onerror=function(e){onFinished(list);}}
DBStorage.prototype._getStore=function(name,mode){if(mode==null)mode="readonly";var transaction=this.db.transaction([name],mode);var store=transaction.objectStore(name);return store;}
DBStorage.prototype.getApp=function(appid,onLoaded){var store=this._getStore(DBStorage.APPS);var request=store.get(appid);request.onsuccess=function(e){var data=e.target.result;onLoaded(data);}
request.onerror=function(err){onLoaded(null);}}
DBStorage.prototype.saveApp=function(appid,js){var store=this._getStore(DBStorage.APPS,"readwrite");var request=store.put(js,appid);request.onsuccess=function(e){}
request.onerror=function(e){}}
DBStorage.prototype.getImage=function(fileid,onLoaded){var store=this._getStore(DBStorage.IMAGES);var request=store.get(fileid);request.onsuccess=function(e){var blob=e.target.result;onLoaded(blob);}
request.onerror=function(err){onLoaded(null);}}
DBStorage.prototype.saveImage=function(fileid,blob){if(blob==null)return;var store=this._getStore(DBStorage.IMAGES,"readwrite");var request=store.put(blob,fileid);request.onsuccess=function(e){}
request.onerror=function(e){}}
function Filter(){}
Filter.MIN=100;Filter._index=0;Filter.NBPAGEMAX=5;Filter.reset=function(){Filter._showAll=false;}
Filter.reset();Filter.filterByIndex=function(items,min){if(min==null)min=100;Filter.MIN=min;if(items.length<Filter.MIN)return items;Toolbar.addIndexFilter(items.length);if(Filter._index>=items.length)Filter._index=0;return items.slice(Filter._index,Filter._index+Filter.MIN);}
Filter.removeFilter=function(){Filter._showAll=true;History.reload();}
Filter.onFilterIndex=function(index){Filter._showAll=false;Filter._index=index;History.reload();}
function _writeIndexLinks(total){if(total<Filter.MIN)return'';var buf=[''];var max=Math.ceil(total/Filter.MIN);var pageFirst=_getIndexPageFirst();var pageLast=_getIndexPageLast(max);if(pageFirst>Filter.NBPAGEMAX)buf.push(' &nbsp; '+_writeLink('<','Filter.onFilterIndex',(pageFirst-2)*Filter.MIN));for(var i=pageFirst;i<=pageLast;i++){buf.push(' &nbsp; ');if(i==Filter._index/Filter.MIN+1){buf.push('<b>',i,'</b>');}else{buf.push(_writeLink(i,'Filter.onFilterIndex',(i-1)*Filter.MIN));}}
if(pageLast<max)buf.push(' &nbsp; '+_writeLink('>','Filter.onFilterIndex',pageLast*Filter.MIN));return buf.join('');}
function _getIndexPageFirst(){var floor=Math.floor((Filter._index/Filter.MIN)/Filter.NBPAGEMAX);return floor*Filter.NBPAGEMAX+1;}
function _getIndexPageLast(max){var pageLast=_getIndexPageFirst()+(Filter.NBPAGEMAX-1);if(max<pageLast)pageLast=max;return pageLast;}
Filter.search=function(items,columns){if(Toolbar.searchFilter==true&&Filter.value){if(columns==null)columns="name";var cols=columns.split(";");items=Data.search(items,cols,Filter.value);}
return items;}
var EQUALS=0;var DIFFERENT=1;var SUPERIOR=2;var INFERIOR=3;var SUPERIOR_OR_EQUAL=4;var INFERIOR_OR_EQUAL=5;var IN=6;var CONTAINS=7;var LIKE=8;var MONTH=9;var YEAR=10;var NOT_CONTAINS=11;var OPS=["!=",">=","<=","=",">","<","CONTAINS","IN","LIKE","MONTH","YEAR","NOT CONTAINS"];var OPCODES=[DIFFERENT,SUPERIOR_OR_EQUAL,INFERIOR_OR_EQUAL,EQUALS,SUPERIOR,INFERIOR,CONTAINS,IN,LIKE,MONTH,YEAR,NOT_CONTAINS];function Lexer(buffer){this.buffer=buffer!=null?buffer:"";this.pos=0;this.readName=function(){var name=new Array();var i=this.pos;var isExpr=false;while(i<this.buffer.length){var c=this.buffer.charAt(i);if(c=='('&&name.length==0){name.push(c);isExpr=true;}else if(isExpr){name.push(c);if(c==')'){this.pos=i;this.pos++;return name.join('');}}else if((c>='a'&&c<='z')||(c>='A'&&c<='Z')||c=="."){name.push(c);}else if(c>='0'&&c<='9'&&name.length>0){name.push(c);}else if(name.length>0){this.pos=i;return name.join('');}
i++;}
return null;}
this.skipSpaces=function(){while(this.pos<this.buffer.length){if(this.buffer.charAt(this.pos)==' '){this.pos++;}else{break;}}}
this.readOperator=function(){this.skipSpaces();for(var i=0;i<OPS.length;i++){var op=OPS[i];if(this.buffer.substring(this.pos,this.pos+op.length)==op){this.pos+=op.length;return OPCODES[i];}}
return null;}
this.readLiteral=function(){this.skipSpaces();var c=this.buffer.charAt(this.pos);if(c=='"'||c=='\''){return this.readString();}else if(c=='('){return this.readList();}else{return this.readNumber();}}
this.readString=function(){var quote=this.buffer.charAt(this.pos);var newPos=this.pos+1;while(newPos<this.buffer.length){if(this.buffer.charAt(newPos)==quote&&this.buffer.charAt(newPos-1)!='\\'){var token=this.buffer.substring(this.pos+1,newPos);this.pos=newPos+1;token=token.replace("\\'","'");return token;}
newPos++;}
return null;}
this.readNumber=function(){var newPos=this.pos;if(this.buffer.charAt(newPos)=='-'){newPos++;}
while(newPos<this.buffer.length){var c=this.buffer.charAt(newPos);if("0123456789.".indexOf(c)==-1){break;}
newPos++;}
var token=this.buffer.substring(this.pos,newPos);var number=new Number(token);if(isNaN(number))return null;this.pos=newPos;return number.valueOf();}
this.readList=function(){this.pos++;var newPos=this.pos;var list=new Array();var insideQuote=false;var doubleQuote=false;var insideValue=false;while(newPos<this.buffer.length){var c=this.buffer.charAt(newPos);if(c=="'"){if(insideQuote==false){insideQuote=true;}else{if(newPos<this.buffer.length-1){var next=this.buffer.charAt(newPos+1);if(next!="'"&&!doubleQuote)insideQuote=false;else if(next!="'")doubleQuote=false;else doubleQuote=true;}}}else if(c==","||c==")"){if(!insideQuote){var value=this.buffer.substring(this.pos,newPos);if(newPos<this.buffer.length-1)this.pos=newPos+1;if(value.length>0){value=this.removeSimpleQuotes(value);value=value.replace("''","'");list.push(value);}
if(c==")")break;}}
newPos++;}
return list;}
this.readSemiColumn=function(){this.skipSpaces();var c=this.buffer.charAt(this.pos);if(c==';')return c;else return null;}
this.readAnd=function(){this.skipSpaces();var newPos=this.pos;while(newPos<this.buffer.length){if(this.buffer.charAt(newPos)==' '){break;}
newPos++;}
var word=this.buffer.substring(this.pos,newPos);if(word.toUpperCase()=="AND"){this.pos=newPos;return word;}else{return null;}}
this.removeSimpleQuotes=function(str){var str=str.trim();if(str.length<2)return"";if(str.charAt(0)=="'"&&str.charAt(str.length-1)=="'"){return str.substring(1,str.length-1);}else{return str;}}
this.isAtEnd=function(){return(this.pos==this.buffer.length);}
this.readUntilName=function(){var expr=new Array();var i=this.pos;while(i<this.buffer.length){var c=this.buffer.charAt(i);if(!(c>='a'&&c<='z')&&!(c>='A'&&c<='Z')){expr.push(c);}else{this.pos=i;return expr.join('');}
i++;}
this.pos=i;return expr.join('');}}
function Parameter(){}
Parameter.parse=function(buffer){var array=new Array();var lexer=new Lexer(buffer);do{var name=lexer.readName();if(name==null)break;var operator=lexer.readOperator();if(operator==null)break;var value=lexer.readLiteral();if(value==null)break;array.push(new Parameter(name,value,operator));}while(lexer.readSemiColumn()!=null);return array;}
Parameter.parseWhere=function(buffer){var array=new Array();var lexer=new Lexer(buffer);do{var name=lexer.readName();if(name==null)break;var operator=lexer.readOperator();if(operator==null)break;var value=lexer.readLiteral();if(value==null)break;array.push(new Parameter(name,value,operator));}while(lexer.readAnd()!=null);return array;}
Parameter.parseOptions=function(buffer){var options=new Array();if(buffer==null||buffer.length==0)return options;var parts=buffer.split("|");for(var i=0;i<parts.length;i++){var part=parts[i];var label,value;var index=part.indexOf(':');if(index>-1){value=part.substring(0,index);label=part.substring(index+1);}else{value=part;label=part;}
label=label.trim();value=value.trim();if(label.length>0)options.push(new Parameter(label,value));}
return options;}
Parameter.getNames=function(multivalue,strOptions){if(multivalue==null)return"";multivalue=String(multivalue);var options=Parameter.parseOptions(strOptions);var buf=new Array();var values=multivalue.split("|");for(var i=0;i<values.length;i++){var name=Parameter.getName(values[i],options);if(name!=null&&name.length>0){buf.push(name);}else{buf.push(values[i]);}}
return buf.join(', ');}
Parameter.getName=function(value,options){if(options==null){return null;}
for(var i=0;i<options.length;i++){if(options[i].value==value){return options[i].name;}}
return null;}
function Parameter(name,value,operator){this.name=name;this.value=value;this.operator=operator;this.matches=function(item){if(this.name.charAt(0)=='(')return this.matchesExpr(item);if(this.name.indexOf("cf.")==0&&this.name.length>3)return this.matchesCustomField(item);if(item==null||item[this.name]==undefined)return false;switch(this.operator){case EQUALS:return item[this.name]==this.value;case DIFFERENT:return item[this.name]!=this.value;case SUPERIOR:return item[this.name]>this.value;case INFERIOR:return item[this.name]<this.value;case SUPERIOR_OR_EQUAL:return item[this.name]>=this.value;case INFERIOR_OR_EQUAL:return item[this.name]<=this.value;case IN:return _in(item[this.name],this.value);case CONTAINS:return _contains(item[this.name],this.value);case NOT_CONTAINS:return _notcontains(item[this.name],this.value);case LIKE:return Data.matchesString(this.value,item[this.name]);case MONTH:var d=new Date(Number(item[this.name]));return d.getMonth()==this.value;case YEAR:var d=new Date(Number(item[this.name]));return d.getFullYear()==this.value;default:return false;}}
this.matchesExpr=function(item){if(item==null)return false;var expr=this.name.substr(1,this.name.length-2);var lexer=new Lexer(expr);var buf=[];while(!lexer.isAtEnd()){var str=lexer.readUntilName();buf.push(str);var itemcol=lexer.readName();if(itemcol!=null&&itemcol!="")buf.push("item['"+itemcol+"']");}
var evaluatedExpr=eval(buf.join(''));switch(this.operator){case EQUALS:return evaluatedExpr==this.value;case DIFFERENT:return evaluatedExpr!=this.value;case SUPERIOR:return evaluatedExpr>this.value;case INFERIOR:return evaluatedExpr<this.value;case SUPERIOR_OR_EQUAL:return evaluatedExpr>=this.value;case INFERIOR_OR_EQUAL:return evaluatedExpr<=this.value;case MONTH:var d=new Date(Number(evaluatedExpr));return d.getMonth()==this.value;case YEAR:var d=new Date(Number(evaluatedExpr));return d.getFullYear()==this.value;default:return false;}}
this.matchesCustomField=function(item){if(item==null)return false;if(item.custom==null||item.custom=="")return false;var fields=CustomFields.loadValues(item.custom);var cfvalue=fields[this.name.substring(3)];if(cfvalue==null)return false;switch(this.operator){case EQUALS:return cfvalue==this.value;case DIFFERENT:return cfvalue!=this.value;case SUPERIOR:return cfvalue>this.value;case INFERIOR:return cfvalue<this.value;case SUPERIOR_OR_EQUAL:return cfvalue>=this.value;case INFERIOR_OR_EQUAL:return cfvalue<=this.value;case IN:return _in(cfvalue,this.value);case CONTAINS:return _contains(cfvalue,this.value);case NOT_CONTAINS:return _notcontains(cfvalue,this.value);case LIKE:return Data.matchesString(this.value,cfvalue);case MONTH:var d=new Date(Number(cfvalue));return d.getMonth()==this.value;case YEAR:var d=new Date(Number(cfvalue));return d.getFullYear()==this.value;default:return false;}}}
function _contains(multivalue,value){var values=multivalue.split('|');for(var i=0;i<values.length;i++){if(values[i]==value){return true;}}
return false;}
function _notcontains(multivalue,value){var values=multivalue.split('|');for(var i=0;i<values.length;i++){if(values[i]==value){return false;}}
return true;}
function _in(value,list){if(list==null)return false;for(var i=0;i<list.length;i++){if(value==list[i]){return true;}}
return false;}
function ParameterList(name,value){this.array=new Array();this.add=function(name,value){if(value==null)return;var p=new Object();p.name=name;p.value=value;this.array.push(p);}
this.addArray=function(name,values){for(var i=0;i<values.length;i++){this.add(name,values[i]);}}
if(name!=null&&value!=null)this.add(name,value);this.toURLEncodedString=function(){var buf=[''];for(var i=0;i<this.array.length;i++){if(i>0)buf.push('&');buf.push(this.array[i].name,'=',encodeURIComponent(this.array[i].value));}
return buf.join('');}
this.toXMLString=function(){return Utils.xmlEncode(this.toURLEncodedString());}
this.toJSON=function(){var obj={};for(var i=0;i<this.array.length;i++){var name=this.array[i].name;var value=this.array[i].value;if(value!=null&&value!=""){obj[name]=value;}}
return obj;}
this.isEmpty=function(){return this.array.length==0;}
this.getValue=function(name){for(var i=0;i<this.array.length;i++){if(this.array[i].name==name)return this.array[i].value;}
return null;}
this.setValue=function(name,value){for(var i=0;i<this.array.length;i++){if(this.array[i].name==name){this.array[i].value=value;return;}}
this.add(name,value);}}
function BaseBox(){}
BaseBox.evalCallback=function(func,value,id){if(func==null)return;if(func.indexOf('this.id')>0||func.indexOf('this.value')>0){this.id=id;this.value=value;}else{func=_writeJS(func,value,id);}
eval(func);}
BaseBox.getValue=function(id){var obj=_get(id);return(obj!=null)?obj.value:null;}
BaseBox.setValue=function(id,value){var obj=_get(id);obj.value=value;obj.onchange();}
BaseBox.writeHidden=function(id,value,onchange){if(onchange==null)onchange="";if(value==null)value="";_html.push('<input type=hidden name="',id,'" id="',id,'" value="',Utils.xmlEncode(value),'" onchange="',onchange,'" />');}
BaseBox.writeHelp=function(help){if(help!=null)_html.push('<span class=help>',help,'</span>');}
function Button(){}
Button.write=function(label,onclick){onclick=_func("Engine.eval",onclick);_html.push('<div class="buttoncontainer"><div class=button onclick="',onclick,'"><span>',label,'</span></div></div>');}
var CALENDAR_FRAME='<div id=cal class=cal style="position:absolute; display:none; z-index: 100;"></div>';function CalendarControl(){var calendarId='cal';var currentYear=0;var currentMonth=0;var currentDay=0;var selectedYear=0;var selectedMonth=0;var selectedDay=0;this.dateField=null;this.setDate=function(year,month,day){if(this.dateField){var d=new Date(year,month-1,day);var dateString=Date.format(d.getTime());this.dateField.value=dateString;this.dateField.onchange();var timeid=this.dateField.id.replace("_date","_time");var timeField=_get(timeid);if(timeField!=null){timeField.style.visibility='visible';}
setTimeout(function(){calendarControl.hide();},100);}
return;}
this.changeMonth=function(change){currentMonth+=change;currentDay=0;if(currentMonth>12){currentMonth=1;currentYear++;}else if(currentMonth<1){currentMonth=12;currentYear--;}
_set(calendarId,calendarDrawTable());}
this.changeYear=function(){currentYear+=change;currentDay=0;_set(calendarId,calendarDrawTable());}
function getCurrentYear(){var year=new Date().getYear();if(year<1900)year+=1900;return year;}
function getCurrentMonth(){return new Date().getMonth()+1;}
function getCurrentDay(){return new Date().getDate();}
function calendarDrawTable(){var dayOfMonth=1;var validDay=0;var startDayOfWeek=Date.getDayOfWeek(currentYear,currentMonth,dayOfMonth);var daysInMonth=Date.getDaysInMonth(currentYear,currentMonth);var css_class=null;var localdate=new Date();var table='<table cellspacing=0 border=0 onmousedown="event.cancelBubble=true;">';table+="<tr class=calheader>";table+="<td class='previous' onmousedown='changeCalendarControlMonth(-1)'>"+_icon("previous")+"</td>";table+="<td colspan='5' class='title'>"+DateFormatter.month(currentMonth-1)+" "+currentYear+"</td>";table+="<td class='next' onmousedown='changeCalendarControlMonth(1)'>"+_icon("next")+"</td>";table+="</tr>";table+="<tr class=calheader>";var indexStart=(Date.firstDayOfWeek()==Date.SUNDAY)?0:1;var indexEnd=(Date.firstDayOfWeek()==Date.SUNDAY)?7:8;for(var i=indexStart;i<indexEnd;i++){table+="<td>"+DateFormatter.dayLetter(i)+"</td>";}
table+="</tr>";for(var week=0;week<6;week++){table=table+"<tr>";for(var dayOfWeek=0;dayOfWeek<7;dayOfWeek++){if(week==0&&startDayOfWeek==dayOfWeek){validDay=1;}else if(validDay==1&&dayOfMonth>daysInMonth){validDay=0;}
if(dayOfMonth==selectedDay&&currentYear==selectedYear&&currentMonth==selectedMonth){css_class='current';}else if(dayOfMonth==localdate.getDate()&&currentYear==localdate.getFullYear()&&currentMonth==localdate.getMonth()+1){css_class='today';}else if((Date.firstDayOfWeek()==Date.SUNDAY&&(dayOfWeek==0||dayOfWeek==6))||(Date.firstDayOfWeek()==Date.MONDAY&&(dayOfWeek==5||dayOfWeek==6))){css_class='weekend';}else{css_class='weekday';}
if(validDay){table+="<td class="+css_class+" onmousedown=\"setCalendarControlDate("+currentYear+","+currentMonth+","+dayOfMonth+")\">"+dayOfMonth+"</td>";dayOfMonth++;}else{table+="<td class="+css_class+">&nbsp;</td>";}}
table=table+"</tr>";}
table+="</table>";return table;}
this.show=function(field){if(this.dateField==field){return;}else{this.dateField=field;}
if(this.dateField){try{var dateString=new String(this.dateField.value);var dateParts=dateString.split("/");if(Date.isLocaleUS()){selectedMonth=parseInt(dateParts[0],10);selectedDay=parseInt(dateParts[1],10);selectedYear=parseInt(dateParts[2],10);}
else{selectedDay=parseInt(dateParts[0],10);selectedMonth=parseInt(dateParts[1],10);selectedYear=parseInt(dateParts[2],10);}}catch(e){}}
if(!(selectedYear&&selectedMonth&&selectedDay)){selectedMonth=getCurrentMonth();selectedDay=getCurrentDay();selectedYear=getCurrentYear();}
currentMonth=selectedMonth;currentDay=selectedDay;currentYear=selectedYear;var calendar=_get(calendarId);calendar.innerHTML=calendarDrawTable(currentYear,currentMonth);_showBelowObj(calendar,this.dateField);document.body.onmousedown=hideCalendarControl;}
this.hide=function(){if(this.dateField){_hide('cal');this.dateField=null;document.body.onmousedown=null;}}
this.visible=function(){return(this.dateField!=null);}}
var calendarControl=new CalendarControl();function hideCalendarControl(){if(calendarControl.visible()){calendarControl.hide();}}
function setCalendarControlDate(year,month,day){calendarControl.setDate(year,month,day);}
function changeCalendarControlYear(change){calendarControl.changeYear(change);}
function changeCalendarControlMonth(change){calendarControl.changeMonth(change);}
function CheckBox(){}
CheckBox.write=function(id,label,value,onchange){var cheked=(value==true||value=="1"||value==1)?"checked":"";if(onchange==null)onchange="";var onchange="this.value=this.checked?'1':'0';"+onchange;_html.push('<span class=text><input type="checkbox" id="',id,'" ',cheked,' onchange="',onchange,'" />');_html.push(' <b>',label,'</b>');_html.push('</span>');}
function ColorBox(){}
ColorBox.writeColor=function(id,value,onchange,colors){if(onchange==null)onchange="";_html.push('<span class="text">');_html.push('<input type="color" name="',id,'" id="',id,'" value="',value,'" onchange="',onchange,'" />');if(colors){colors=colors.split("|");if(colors.length>0){_html.push('<datalist id="',id,'">');for(var i=0;i<colors.length;i++){_html.push('<option>',colors[i],'</option>');}
_html.push('</datalist>');}}
_html.push('</span>');}
function ComboBox(){}
ComboBox.write=function(id,options,value,onnew,onchange){ComboBox.writeInternal(id,options,value,false,onnew,onchange);}
ComboBox.writeMulti=function(id,options,value,onnew,onchange){ComboBox.writeInternal(id,options,value,true,onnew,onchange);}
ComboBox.writeSmall=function(id,options,value){ComboBox.writeInternal(id,options,value,false,null,null,"90px");}
ComboBox.hide=function(id){_hide('cb_'+id);}
ComboBox.writeInternal=function(id,options,value,isMulti,onnew,onchange,width){if(value==null)value="";if(id=="owner")options=ComboBox.fixOwnerOptions(options,value);ComboBox.writeFake(id,value,onchange,options,isMulti?"1":"0",onnew);var label;var className;if(isMulti){label=ComboBox.formatLabelMulti(id,value,options);className="comboboxmulti";}else{label=ComboBox.formatLabel(id,value,options);className="combobox";}
var onclick='ComboBox.onclick(event,this.id)';var onkeydown='ComboBox.onkeydown(event,this.id)';var style=(width!=null)?"width:"+width:"";_html.push('<span class=text>');_html.push('<span tabindex=0  style="',style,'" onkeydown="return ',onkeydown,'" onclick="',onclick,'" class=',className,' id="cb_',id,'">',label,'</span>');_html.push('</span>');}
ComboBox.writeFake=function(id,value,onchange,options,multi,onnew){if(onchange==null)onchange="";if(onnew==null)onnew="";_html.push('<input type=hidden name="',id,'" id="',id,'" value="',value,'" onchange="',onchange,'" options="',Utils.xmlEncode(options),'" onnew="',onnew,'" multi="',multi,'" />');}
ComboBox.addOption=function(id,label,value){var input=_get(id);var options=input.getAttribute("options");options+="|"+value+":"+label;input.setAttribute("options",options);if(input.getAttribute("multi")=="1"){input.value=MultiValue.add(input.value,value);label=ComboBox.formatLabelMulti(id,input.value,options);}else{input.value=value;}
input.onchange();_set('cb_'+id,label);_get('cb_'+id).focus();}
ComboBox.setValue=function(id,value){var input=_get(id);input.value=value;input.onchange();var options=input.getAttribute("options");var label=ComboBox.formatLabel(id,value,options);_set('cb_'+id,label);_get('cb_'+id).focus();}
ComboBox.setOptions=function(id,options,value){var input=_get(id);input.setAttribute("options",options);if(value==null)value="";ComboBox.setValue(id,"");}
ComboBox.parseOptions=function(strOptions,strValues){var options=new Array();if(strOptions=="")return options;var parts=strOptions.split("|");for(var i=0;i<parts.length;i++){var option=new Object();var index=parts[i].indexOf(":");if(index>-1){option.value=parts[i].substring(0,index);option.text=parts[i].substring(index+1);}else{var part=parts[i].trim();option.value=part;option.text=part;}
option.value=option.value;option.text=option.text.trim();option.selected=MultiValue.contains(strValues,option.value);options.push(option);}
return options;}
ComboBox.getSelectedOptions=function(strOptions,multivalue){if(multivalue==null)return[];multivalue=String(multivalue);var selectedOptions=[];var options=ComboBox.parseOptions(strOptions,"");var optionsMap=HashMap.fromArray(options,"value");var values=multivalue.split("|");for(var i=0;i<values.length;i++){var value=values[i];var option=optionsMap.get(value);if(option!=null){selectedOptions.push(option);}else{selectedOptions.push({text:value,value:value});}}
return selectedOptions;}
ComboBox.fixOwnerOptions=function(strOptions,owners){var parts=owners.split("|");for(var i=0;i<parts.length;i++){var owner=parts[i];if(owner!="")strOptions=MultiValue.add(strOptions,owner+":"+owner);}
return strOptions;}
ComboBox.onkeydown=function(event,id){if(ComboList.isVisible()){return ComboList.onkeydown(event);}else if(event.keyCode==13){ComboBox.onclick(event,id);event.cancelBubble=true;return false;}}
ComboBox.onclick=function(event,id){event.cancelBubble=true;if(ComboList.isVisible()){ComboList.hide();return;}
id=id.substring(3);var input=_get(id);var strOptions=input.getAttribute("options");var options=ComboBox.parseOptions(strOptions,input.value);var popup=new ComboList('cb_'+id);var onnew=input.getAttribute("onnew");if(onnew!="")popup.addNewClick=_writeJS("ComboBox._addnew",id);if(input.getAttribute("multi")!="1"){for(var i=0;i<options.length;i++){var option=options[i];if(option.text!=""){popup.writeItem(option.text,"ComboBox._onchange",id,i);if(option.selected==true){popup.selectedIndex=i;}}}}else{for(var i=0;i<options.length;i++){var option=options[i];if(option.selected==false&&option.value!=''&&option.text!=""){popup.writeItem(option.text,"ComboBox._onchange",id,i);}}}
popup.writeStop();}
ComboBox._onchange=function(id,selIndex){ComboBox.cancelBlur=true;ComboList.hide();var input=_get(id);var strOptions=input.getAttribute("options");var options=ComboBox.parseOptions(strOptions,"");var newValue=(selIndex<options.length)?options[selIndex].value:"";var label="";if(input.getAttribute("multi")=="1"){if(newValue!=""){input.value=MultiValue.add(input.value,newValue);label=ComboBox.formatLabelMulti(id,input.value,strOptions);}}else{input.value=newValue;label=ComboBox.formatLabel(id,input.value,strOptions);}
_set('cb_'+id,label);_get('cb_'+id).focus();input.onchange();}
ComboBox._addnew=function(id){var search='';var psearch=_get('psearch');if(psearch!=null)search=psearch.value;ComboList.hide();var newvalue=window.prompt('Enter name',search);if(newvalue==null)return;var input=_get(id);var callback=input.getAttribute("onnew");BaseBox.evalCallback(callback,newvalue,id);}
ComboBox._removeValue=function(id,removevalue){var input=_get(id);input.value=MultiValue.remove(input.value,removevalue);input.onchange();var options=input.getAttribute("options");var label=ComboBox.formatLabelMulti(id,input.value,options);_set('cb_'+id,label);}
ComboBox.formatLabelMulti=function(id,values,options){var buf=[];var selectedOptions=ComboBox.getSelectedOptions(options,values);for(var i=0;i<selectedOptions.length;i++){var option=selectedOptions[i];if(option.text!=""&&option.text!=R.NONE){var onclick=_writeJS("ComboBox._removeValue",id,option.value);var remove='<span class=cbremove onclick="event.cancelBubble=true;'+onclick+'">'+_icon("close")+'</span>';var text='<span>'+option.text+'</span>';buf.push('<span class=value>'+text+remove+'</span>');}}
return buf.join(' ');}
ComboBox.formatLabel=function(id,values,options){var selectedOptions=ComboBox.getSelectedOptions(options,values);if(selectedOptions.length==0)return"";var option=selectedOptions[0];return(option.text!=R.NONE)?option.text:"";}
function ComboList(){}
ComboList.cancelKey=false;ComboList.onTop=false;ComboList.onkeyup=function(input){if(ComboList.cancelKey==true){ComboList.cancelKey=false;return;}
var oldBottom=input.parentNode.offsetTop+input.parentNode.offsetHeight;var searchArray=input.value.split(" ");for(var i=0;i<searchArray.length;i++){searchArray[i]=_normalize(searchArray[i]);}
var nodes=ComboList.getNormalizedNodeList();for(var i=0;i<nodes.length;i++){var node=nodes[i];node.style.display=ComboList.matches(node.normalized,searchArray)?"":"none";node.className="";}
var visibleNodes=ComboList.getVisibleNodes();if(visibleNodes.selIndex==null&&visibleNodes.length>0)visibleNodes[0].className="selected";if(visibleNodes.length==0){_set('p_emptylist',"No result");_get('p_emptylist').style.display="block";}else{_hide('p_emptylist');}
if(ComboList.onTop){input.parentNode.style.top=(oldBottom-input.parentNode.offsetHeight)+"px";}}
ComboList.matches=function(text,searchArray){if(searchArray.length==0)return true;for(var i=0;i<searchArray.length;i++){if(text.indexOf(searchArray[i])==-1)return false;}
return true;}
ComboList.getNormalizedNodeList=function(){var obj=_get('p_list');if(obj.isNormalized!=true){for(var i=0;i<obj.childNodes.length;i++){var node=obj.childNodes[i];node.normalized=_normalize(node.innerHTML);}
obj.isNormalized=true;}
return obj.childNodes;}
ComboList.onkeydown=function(event){if(ComboList.isVisible()==false)return true;var keycode=event.keyCode;if(keycode==13){var sel=ComboList.getSelectedNode();if(sel)sel.onclick();ComboList.cancelKey=true;event.cancelBubble=true;return false;}else if(keycode==38){ComboList.selectNode("up");ComboList.cancelKey=true;event.cancelBubble=true;return false;}else if(keycode==40){ComboList.selectNode("down");ComboList.cancelKey=true;event.cancelBubble=true;return false;}else if(keycode==9||keycode==27){ComboList.hide();ComboList.cancelKey=true;event.cancelBubble=true;_get(ComboList.parentid).focus();return false;}
return true;}
ComboList.onmouseover=function(item){var sel=ComboList.getSelectedNode();if(sel!=null)sel.className="";item.className="selected";}
ComboList.onmouseout=function(item){item.className="";}
ComboList.getNodeList=function(){return _get('p_list').childNodes;}
ComboList.getVisibleNodes=function(){var nodes=ComboList.getNodeList();var list=new Array();for(var i=0;i<nodes.length;i++){var node=nodes[i];if(node.style.display=="")list.push(node);if(node.className=="selected")list.selIndex=list.length-1;}
return list;}
ComboList.getSelectedNode=function(){var nodes=ComboList.getVisibleNodes();if(nodes.selIndex!=-1)return nodes[nodes.selIndex];else return null;}
ComboList.selectNode=function(action){var nodes=ComboList.getVisibleNodes();var selNode=(nodes.selIndex!=-1)?nodes[nodes.selIndex]:null;if(action=="first"&&nodes.length>0){if(selNode!=null){selNode.className="";}
nodes[0].className="selected";}else if(action=="down"){if(selNode==null&&nodes.length>0){nodes[0].className="selected";}else if(nodes.selIndex<nodes.length-1){selNode.className="";nodes[nodes.selIndex+1].className="selected";}}else if(action=="up"&&nodes.selIndex>0){nodes[nodes.selIndex].className="";nodes[nodes.selIndex-1].className="selected";}}
function ComboList(parentId){this.parentId=parentId;this.buf=new Array();this.selectedIndex=null;this.itemCount=0;this.addNewClick=null;this.width=null;this.searchable=true;ComboList.parentid=parentId;this.getSearch=function(){var buf='<input id=psearch autocomplete=off placeholder="'+"Filter"+'" type=text onkeyup="ComboList.onkeyup(this)" onkeydown="return ComboList.onkeydown(event)" />';return buf;}
this.writeItem=function(label,onclick,param1,param2){var onmouseover="ComboList.onmouseover(this)";var onmouseout="ComboList.onmouseout(this)";var onclick=_writeJS(onclick,param1,param2);this.buf.push('<a ');if(label.length>20)this.buf.push('title="',label,'" ');this.buf.push('onmouseover="',onmouseover,'" onmouseout="',onmouseout,'" onclick="',onclick,'">',label,'</a>');this.itemCount++;}
this.setSelectedValue=function(value){this.selectedValue=value;}
this.writeStop=function(){ComboList.onTop=_getBestPosition(this.parentId,300)=="top";var popup=_get('combolist');if(popup!=null)_remove('combolist');popup=document.createElement('div');popup.id='combolist';popup.setAttribute("onclick","event.cancelBubble=true");if(this.width!=null)popup.style.width=this.width+"px";var parent=_get(this.parentId);parent.parentNode.appendChild(popup);var content='<div id=p_list>'+this.buf.join('')+'</div><div id=p_emptylist></div>';if(this.addNewClick!=null){content+=' <div id=p_addnew onclick="'+this.addNewClick+'">Add New</div>';}
if(this.searchable&&this.itemCount>5){if(ComboList.onTop){content+=this.getSearch();}else{content=this.getSearch()+content;}}
_set('combolist',content);this.buf=[''];_showBelowObj(popup,_get(this.parentId),ComboList.onTop?"top":null);document.body.onclick=ComboList.hide;if(this.selectedIndex!=null){var nodeList=ComboList.getNodeList();var item=nodeList[this.selectedIndex];item.className="selected";popup.scrollTop=this.selectedIndex*15;}
var search=_get("psearch");if(search!=null){ComboBox.cancelBlur=true;setTimeout(function(){search.focus();},50);}}}
ComboList.hide=function(){if(_get('combolist')){_remove('combolist');}
document.body.onclick=null;}
ComboList.isVisible=function(){return _isVisible(_get('combolist'));}
function Selection(x,y,w,h){this.x=x;this.y=y;this.w=w;this.h=h;this.px=x;this.py=y;this.drag=0;this.TOPLEFT=1;this.TOPRIGHT=2;this.BOTTOMRIGHT=3;this.BOTTOMLEFT=4;this.ALL=-1;}
Selection.prototype.contains=function(x,y){return(x>this.x&&x<this.x+this.w&&y>this.y&&y<this.y+this.h);}
Selection.prototype.containsEdge=function(index,x,y){var W=10/2;var pt={x:this.x,y:this.y};if(index==this.TOPRIGHT){pt.x+=this.w;}
else if(index==this.BOTTOMRIGHT){pt.x+=this.w;pt.y+=this.h;}
else if(index==this.BOTTOMLEFT){pt.y+=this.h;}
return(x>pt.x-W&&x<pt.x+W&&y>pt.y-W&&y<pt.y+W);}
Selection.prototype.mousePos=function(e){var rect=CropView.canvas.getBoundingClientRect();return{x:Math.floor(e.pageX-rect.left),y:Math.floor(e.pageY-rect.top)};}
Selection.prototype.mousedown=function(e){var mouse=this.mousePos(e);this.px=mouse.x-this.x;this.py=mouse.y-this.y;if(this.containsEdge(this.TOPLEFT,mouse.x,mouse.y))this.drag=this.TOPLEFT;else if(this.containsEdge(this.TOPRIGHT,mouse.x,mouse.y))this.drag=this.TOPRIGHT;else if(this.containsEdge(this.BOTTOMRIGHT,mouse.x,mouse.y))this.drag=this.BOTTOMRIGHT;else if(this.containsEdge(this.BOTTOMLEFT,mouse.x,mouse.y))this.drag=this.BOTTOMLEFT;else if(this.contains(mouse.x,mouse.y))this.drag=this.ALL;else this.drag=0;}
Selection.prototype.mousemove=function(e){if(this.drag==0)return;var mouse=this.mousePos(e);if(this.drag==this.ALL){this.x=mouse.x-this.px;this.y=mouse.y-this.py;}else if(this.drag==this.TOPLEFT){var delta=Math.max(mouse.x-this.x,mouse.y-this.y);this.w-=delta;this.x+=delta;this.y+=delta;}else if(this.drag==this.TOPRIGHT){var delta=Math.max(mouse.x-(this.x+this.w),-(mouse.y-this.y));this.w+=delta;this.y-=delta;}else if(this.drag==this.BOTTOMRIGHT){var delta=Math.max(mouse.x-(this.x+this.w),mouse.y-(this.y+this.h));this.w+=delta;}else if(this.drag==this.BOTTOMLEFT){var delta=Math.max(mouse.x-this.x,-(mouse.y-(this.y+this.h)));this.w-=delta;this.x+=delta;}
this.h=this.w;CropView.drawScene();}
Selection.prototype.mouseup=function(e){this.drag=0;this.px=0;this.py=0;}
function CropView(){}
CropView.selection=null;CropView.image=null;CropView.canvas=null;CropView.ctx=null;CropView.show=function(imgData,id){Toolbar.addButton("Crop Selection","CropView.onCrop("+esc(id)+")");_html.push('<canvas id="panel" width="600"></canvas>');CropView.image=new Image();CropView.image.src=imgData;List.show("pane");CropView.canvas=document.getElementById('panel');CropView.ctx=CropView.canvas.getContext('2d');var width=(CropView.image.width>600)?600:CropView.image.width;CropView.canvas.img=width;CropView.canvas.height=CropView.canvas.width*(CropView.image.height/CropView.image.width);CropView.selection=new Selection(200,200,90,90);CropView.canvas.addEventListener("mousedown",function(e){CropView.selection.mousedown(e);},false);CropView.canvas.addEventListener("mousemove",function(e){CropView.selection.mousemove(e);},false);CropView.canvas.addEventListener("mouseup",function(e){CropView.selection.mouseup(e);},false);CropView.drawScene();}
CropView.onCrop=function(id){var imgData=CropView.getResult();FileBox.insertFile(imgData,id);}
CropView.getResult=function(){var sel=CropView.selection;var temp_ctx,temp_canvas;temp_canvas=document.createElement('canvas');temp_ctx=temp_canvas.getContext('2d');temp_canvas.width=sel.w;temp_canvas.height=sel.h;temp_ctx.drawImage(CropView.image,sel.x,sel.y,sel.w,sel.h,0,0,sel.w,sel.h);var data=temp_canvas.toDataURL();return data;}
CropView.drawScene=function(){var ctx=CropView.ctx;var sel=CropView.selection;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.drawImage(CropView.image,0,0,ctx.canvas.width,ctx.canvas.height);ctx.fillStyle='rgba(0, 0, 0, 0.3)';ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.strokeRect(sel.x,sel.y,sel.w,sel.h);if(sel.w>0&&sel.h>0){var scale=CropView.image.width/CropView.canvas.width;ctx.drawImage(CropView.image,scale*sel.x,scale*sel.y,scale*sel.w,scale*sel.h,sel.x,sel.y,sel.w,sel.h);}
var W=5;ctx.fillStyle='#fff';ctx.fillRect(sel.x-W,sel.y-W,2*W,2*W);ctx.fillRect(sel.x+sel.w-W,sel.y-W,2*W,2*W);ctx.fillRect(sel.x+sel.w-W,sel.y+sel.h-W,2*W,2*W);ctx.fillRect(sel.x-W,sel.y+sel.h-W,2*W,2*W);}
function DateBox(){}
DateBox.writeDate=function(id,value,onchange){BaseBox.writeHidden(id,value,onchange);_html.push('<span class=placeholder>');DateBox.internalWriteDate(id,value);_html.push('</span>');}
DateBox.writeDateTime=function(id,value,onchange){BaseBox.writeHidden(id,value,onchange);_html.push('<span class=placeholder>');DateBox.internalWriteDate(id,value);DateBox.internalWriteTime(id,value);_html.push('</span>');}
DateBox.writeTime=function(id,value,onchange){BaseBox.writeHidden(id,value,onchange);_html.push('<span class=placeholder>');DateBox.internalWriteTime(id,value);_html.push('</span>');}
DateBox.writeDateSnooze=function(id,value,onchange){if(value=='')value=Date.today(1);BaseBox.writeHidden(id,value,onchange);_html.push('<span class=placeholder>');var options=[];options.push(Date.today(0)+":"+R.TODAY);options.push(Date.today(1)+":"+R.TOMORROW);options.push(Date.today(2)+":"+R.DAYAFTERTOMORROW);options.push(Date.today(12)+":"+R.NEXTWEEK);options.push(Date.today(30)+":"+R.THISMONTH);options.push('0'+":"+R.SOMEDAY);options.push('-1'+":"+R.CUSTOM);var onchange2="DateBox.onCombo("+esc(id)+",this.value)";ComboBox.write('_c'+id,options.join('|'),value,null,onchange2);DateBox.internalWriteDate(id,value,"display:none;");_html.push('</span>');}
DateBox.setValue=function(id,value){var input=_get(id);input.value=value;input.onchange();var strTime=Date.hasTime(value)?Date.formatTime(value):"";var strDate=Date.format(value);var timeid="_"+id+'_time';var dateid="_"+id+'_date';_get(dateid).value=strDate;_get(timeid).value=strTime;}
DateBox.internalWriteDate=function(id,value,style){var strValue=Date.format(value);var dateid="_"+id+'_date';var onchange2="DateBox.onChange('"+id+"')";if(style==null)style="";_html.push('<input type=text style="width:105px;',style,'" onchange="',onchange2,'" onblur="DateBox.onblur(this)" onclick="DateBox.onclick(this)" onkeydown="DateBox.onkeydown(event,this)" onfocus="DateBox.showCalendar(this)" id=',dateid,' value="',strValue,'">');_html.push(CALENDAR_FRAME);}
DateBox.internalWriteTime=function(id,value){var strTime=Date.hasTime(value)?Date.formatTime(value):"";var timeid="_"+id+'_time';var onchange2="DateBox.onChange('"+id+"')";_html.push(' <input type=text style="width:105px;" onchange="',onchange2,'" onkeydown="ComboList.onkeydown(event)" onclick="event.cancelBubble=true" onfocus="DateBox.showTime(this)" id="',timeid,'" value="',strTime,'" />');}
DateBox.onChange=function(id){var value=0;var dateValue=BaseBox.getValue("_"+id+"_date");var timeValue=BaseBox.getValue("_"+id+"_time");if(!((dateValue==null||dateValue=="")&&(timeValue==null||timeValue==""))){value=(dateValue!=null)?Date.parseDate(dateValue):Date.today();if(timeValue!=null)value+=Date.parseTime(timeValue);}
BaseBox.setValue(id,value);}
DateBox.onblur=function(datefield){if(calendarControl.visible()){setTimeout(function(){datefield.focus();},0);return false;}else return true;}
DateBox.onkeydown=function(event,datefield){var keycode=event.keyCode;if(keycode==13||keycode==27){if(calendarControl.visible())calendarControl.hide();else calendarControl.show(datefield);event.cancelBubble=true;return false;}else if(keycode==9){calendarControl.hide();event.cancelBubble=true;return false;}
return true;}
DateBox.onclick=function(datefield){if(calendarControl.visible()==false)calendarControl.show(datefield);}
DateBox.showCalendar=function(textField){if(calendarControl.visible()==false){calendarControl.show(textField);}}
DateBox.showTime=function(parent){var popup=new ComboList(parent.id);popup.searchable=false;popup.width=118;var defaultTime=(User.countryCode=='US')?'12hour':'24hour';var timeFormat=(User.token!=null)?AccountSettings.get('timeformat'):defaultTime;for(var i=0;i<24;i++){var label1='';var label2='';if(timeFormat=='12hour'){label1=get12hourTime(i,0);label2=get12hourTime(i,30);}else{var label=((i<10)?'0'+i:''+i);label1=label+":00";label2=label+":30";}
popup.writeItem(label1,'DateBox.setTime',parent.id,label1);popup.writeItem(label2,'DateBox.setTime',parent.id,label2);}
var selectedValue=parent.value;if(selectedValue==''){selectedValue=(timeFormat=='12hour')?'9:00am':'09:00';}
popup.writeStop();}
DateBox.setTime=function(id,value){ComboList.hide();_get(id).value=value;_get(id).onchange();}
DateBox.onCombo=function(id,value){var fake=_get(id);var comboid="_c"+id;var dateObj=_get("_"+id+'_date');if(value=='-1'){ComboBox.hide(comboid);dateObj.style.display='inline-block';dateObj.focus();}else{dateObj.style.display='none';fake.value=value;fake.onchange();}}
function DurationBox(){}
DurationBox.write=function(id,value,onchange){BaseBox.writeHidden(id,value,onchange);var span=Date.parseDuration(value);var hoursid="_"+id+'_hours';var minsid="_"+id+'_minutes';var onclick="event.cancelBubble=true;";var onchange2="DurationBox.onchange('"+id+"')";_html.push('<span class="text">');_html.push(' <input type=text onchange="',onchange2,'" onclick="',onclick,'" onkeydown="ComboList.onkeydown(event)" onfocus="DurationPopup.showHours(this)" id="',hoursid,'" value="',span.hours,'" style="width:25px;" /> <small>'+R.HOURS+'</small>');_html.push(' <input type=text onchange="',onchange2,'" onclick="',onclick,'" onkeydown="ComboList.onkeydown(event)" onfocus="DurationPopup.showMinutes(this)" id="',minsid,'" value="',span.minutes,'" style="width:25px;" /> <small>min</small>');_html.push('</span>');}
DurationBox.onchange=function(id){var hours=parseInt(BaseBox.getValue("_"+id+'_hours'));var minutes=parseInt(BaseBox.getValue("_"+id+'_minutes'));var value=hours*60+minutes;BaseBox.setValue(id,value);}
function DurationPopup(){}
DurationPopup.showDays=function(parent){var values=[0,1,2,3,4,5];DurationPopup.showInternal(parent,values);}
DurationPopup.showHours=function(parent){var values=[0,1,2,3,4,5,6,7,8];DurationPopup.showInternal(parent,values);}
DurationPopup.showMinutes=function(parent){var values=[0,5,10,15,30,45];DurationPopup.showInternal(parent,values);}
DurationPopup.showInternal=function(parent,values){var popup=new ComboList(parent.id);popup.width=35;popup.searchable=false;for(var i=0;i<values.length;i++){popup.writeItem(values[i],'DurationPopup.setValue',parent.id,values[i]);}
popup.writeStop();}
DurationPopup.setReminder=function(parent){var popup=new ComboList(parent.id);popup.width=100;popup.searchable=false;popup.writeItem(R.NONE,'DurationPopup.setValue',parent.id,'');popup.writeItem(DurationPopup.getLabel(10),'DurationPopup.setValue',parent.id,'10');popup.writeItem(DurationPopup.getLabel(15),'DurationPopup.setValue',parent.id,'15');popup.writeItem(DurationPopup.getLabel(30),'DurationPopup.setValue',parent.id,'30');popup.writeItem(DurationPopup.getLabel(60),'DurationPopup.setValue',parent.id,'60');popup.writeItem(DurationPopup.getLabel(120),'DurationPopup.setValue',parent.id,'120');popup.writeItem('1 '+R.DAY,'DurationPopup.setValue',parent.id,24*60);popup.writeStop();}
DurationPopup.getLabel=function(minutes){var label=minutes;if(minutes<30)
label=minutes+' mn';else if(minutes==30)
label='1/2 hr';else if(minutes==60)
label='1 hr';else if(minutes==90)
label='1.5 hrs';else if(minutes==120)
label='2 hrs';else if(minutes==150)
label='2.5 hrs';else if(minutes==4*60)
label='1/2 '+R.DAY;else if(minutes==8*60)
label='1 '+R.DAY;else if(minutes==2*8*60)
label='2 '+R.DAYS;else if(minutes==7*8*60)
label='7 '+R.DAYS;else if(minutes>150){label=parseInt(minutes/60)+' hrs';var min=minutes%60;if(min>0)
label+=min;}
return label;}
DurationPopup.setValue=function(id,value){_get(id).value=value;_get(id).focus();_get(id).onchange();ComboList.hide();}
function FileBox(){}
FileBox.write=function(id,value,onclick,style){BaseBox.writeHidden(id,value,onclick);var crop=(style!=null)?90:0;var file=value?Query.selectId("System.files",value):null;var url=(file!=null)?Settings.getFileUrl(file.id):"";if(file!=null&&url!=""){if(file.mime.startsWith("image"))_html.push('<img id="_p',id,'" class="filebox" src="',url,'" />');else _html.push('<a  id="_p',id,'" href="'+url+'">'+file.name+'</a>');}
var onchange='FileBox.onPickFile(this.files[0],'+esc(id)+','+esc(crop)+')';_html.push('<input type="file" id="_f',id,'" style="display:none" onchange="',onchange,'" />');FileBox.writeButton("",R.SELECTFILE,"FileBox.onSelectFile("+esc(id)+")","");var onclickDelete="FileBox.onDeleteFile("+esc(id)+","+esc(value)+")";FileBox.writeButton("_del_"+id,R.DELETE,onclickDelete,(file==null)?"none":"");}
FileBox.writeButton=function(id,label,onclick,display){_html.push('<div tabindex=0 class=button id="',id,'" style="display:',display,'" onclick="',onclick,'"><span>',label,'</span></div>');}
FileBox.onSelectFile=function(id){var button=_get('_f'+id);button.click();}
FileBox.onDeleteFile=function(id,fileid){var fileid=BaseBox.getValue(id);if(fileid!="")Query.deleteId("system.files",fileid);BaseBox.setValue(id,"");_hide("_del_"+id);var p=_get("_p"+id);if(p.tagName=="IMG")p.src="";else if(p.tagName=="A"){p.innerText="";p.href="";}}
FileBox.onPickFile=function(file,id,crop){_get('_f'+id).value="";var reader=new FileReader()
reader.onerror=function(stuff){alert(R.ERR_READ_FILE+": "+stuff.getMessage());}
reader.onload=function(e){var buffer=e.target.result;if(crop>0){CropView.show(buffer,id,name);}else{FileBox.insertFile(buffer,id,file.name);}}
reader.readAsDataURL(file);}
FileBox.insertFile=function(buffer,id,name){var index=buffer.indexOf(";base64,");if(index==-1){App.alert(R.ERR_LOAD_FILE);return;}
var content=buffer.substring(index+8);var size=window.atob(content).length;var mimetype=buffer.substring(5,index);var fileid=BaseBox.getValue(id);if(fileid!="")Query.deleteId("system.files",fileid);var values={name:name,mime:mimetype,owner:"",content:content,date:Date.now(),size:size,folderid:"system"};FilePicker.forceId(values);var newfileid=Query.insert("system.files",values);BaseBox.setValue(id,newfileid);Cache.sync(function(changed){var p=_get("_p"+id);if(p.tagName=="IMG")p.src=Settings.getFileUrl(newfileid);else if(p.tagName=="A"){p.innerText=values.name;p.href=Settings.getFileUrl(newfileid);}
_show("_del_"+id);});}
FileBox.resize=function(fileid){var maxsize=window.prompt(R.DESIREDSIZE,"800");if(maxsize==null)return;maxsize=parseInt(maxsize);App.alert(R.RESIZINGIMAGE+"...");var image=new Image();image.crossOrigin="Anonymous";image.onload=function(){var cursize=Math.max(image.width,image.height);if(cursize<=maxsize){App.alert(R.ERR_SIZESMALLER);return;}
var ratio=maxsize/cursize;image.width=parseInt(image.width*ratio);image.height=parseInt(image.height*ratio);var canvas=document.createElement('canvas');var ctx=canvas.getContext('2d');canvas.width=image.width;canvas.height=image.height;ctx.drawImage(image,0,0,image.width,image.height);var content=canvas.toDataURL();var index=content.indexOf(";base64,");content=content.substring(index+8);var size=window.atob(content).length;var file=Query.selectId("system.files",fileid);Query.updateId("system.files",fileid,"size",size);Query.updateId("system.files",fileid,"version",file.version+1);var p=new ParameterList("id",fileid);p.add("content",content);Cache._addOutboxQuery('POST',"system.files",p);Cache.sync(function(changed){History.reload();});}
image.src=Settings.getFileUrl(fileid);}
FileBox.files=null;FileBox.index=-1;FileBox.QUALITY=8;FileBox.MAXSIZE=0;FileBox.resizeMultiple=function(){var ids=Table.getChecked();if(ids.length==0){App.alert(R.SELECTFIRST);return;}
var maxsize=window.prompt(R.DESIREDSIZE,"800");if(maxsize==null)return;FileBox.MAXSIZE=parseInt(maxsize);FileBox.index=-1;FileBox.files=Query.selectIds("System.files",ids);if(App.confirm("Resize "+FileBox.files.length+" JPEG images?")==false)return;FileBox.resizeNext();}
FileBox.resizeNext=function(){FileBox.index++;if(FileBox.index==FileBox.files.length){App.alert("Done");History.reload();return;}
var file=FileBox.files[FileBox.index];if(file.mime!="image/jpeg"||file.kind!=0){FileBox.resizeNext();return;}
App.alert(R.LOADING+" "+file.name+" ("+FileBox.index+" / "+FileBox.files.length+")");var image=new Image();image.crossOrigin="Anonymous";image.onload=function(){FileBox.resizeImage(image,file,FileBox.resizeNext);}
image.src=Settings.getFileUrl(file.id);}
FileBox.resizeImage=function(image,file,callback){var cursize=Math.max(image.width,image.height);if(cursize<=FileBox.MAXSIZE){callback();return;}
App.alert("Resizing...");var ratio=FileBox.MAXSIZE/cursize;var width=parseInt(image.width*ratio);var height=parseInt(image.height*ratio);var canvas=document.createElement('canvas');var ctx=canvas.getContext('2d');canvas.width=width;canvas.height=height;ctx.drawImage(image,0,0,width,height);image=null;var content=canvas.toDataURL('image/jpeg',FileBox.QUALITY);ctx=null;canvas=null;var index=content.indexOf(";base64,");content=content.substring(index+8);var size=window.atob(content).length;Query.updateId("system.files",file.id,"size",size);Query.updateId("system.files",file.id,"version",file.version+1);var p=new ParameterList("id",file.id);p.add("content",content);Cache._addOutboxQuery('POST',"system.files",p);Cache.sync(function(changed){callback();});}
function FrequencyBox(){}
FrequencyBox.VALUES=[0,1,7,14,30,90,180,365,-1];FrequencyBox.LABELS=null;FrequencyBox.write=function(id,value,onchange){if(value==null)value=0;var options=FrequencyBox.getOptions();var styleAttr="";var comboValue="";if(FrequencyBox.IsCustomFrequency(value)){styleAttr='';comboValue=-1;}else{styleAttr=' style="visibility:hidden"';comboValue=value;}
var onchange2="FrequencyBox.set('"+id+"',this.value)";ComboBox.write('_c'+id,options,comboValue,null,onchange2);_html.push('<span id=_s',id,styleAttr,'> '+R.EVERY+' ');_html.push('<input type=text style="width:25px" onchange="',onchange,'" name="',id,'" id="',id,'" value="',value,'" />');_html.push(' '+R.DAYSPERIOD+'</span>');}
FrequencyBox.getOptions=function(){FrequencyBox.LABELS=[R.NONE,R.EVERYDAY,R.EVERYWEEK,R.EVERY2WEEKS,R.EVERYMONTH,R.EVERY3MONTHS,R.EVERY6MONTHS,R.EVERYYEAR,R.CUSTOM];var options=[];for(var i=0;i<FrequencyBox.VALUES.length;i++){options.push(FrequencyBox.VALUES[i]+":"+FrequencyBox.LABELS[i]);}
return options.join("|");}
FrequencyBox.IsCustomFrequency=function(value){for(var i=0;i<FrequencyBox.VALUES.length;i++){if(FrequencyBox.VALUES[i]==value)return false;}
return true;}
FrequencyBox.set=function(id,value){var input=_get(id);var span=_get('_s'+id);if(value==-1){span.style.visibility='visible';input.focus();}else{input.value=value;input.onchange();span.style.visibility='hidden';}}
function HtmlBox(){}
HtmlBox.write=function(id,label,value,onchange,customStyle){_html.push('<div class=htmlarea>');var style="";if(label!=null){_html.push(HtmlBox._writeToolbar(id,label));style="min-height:80px;";}
var style=(customStyle!=null)?customStyle:"min-height:80px";_html.push('<div contentEditable="true" placeholder="Type Text here" style="padding:10px;padding-left:30px;',style,' onpaste="HtmlBox.onpaste(this)" id="',id,'" onchange="',onchange,'">',value,'</div>');_html.push('</div>');}
HtmlBox.onShow=function(){var tags=document.querySelectorAll('[contenteditable=true][onchange]');for(var i=tags.length-1;i>=0;i--){var tag=tags[i];tag.data_orig=this.innerHTML;tag.onblur=function(){if(this.innerHTML!=this.data_orig){this.value=HtmlBox.filter(this.innerHTML);this.onchange();this.data_orig=this.innerHTML;HtmlBox._range=window.getSelection().getRangeAt(0);}};}}
HtmlBox.focus=function(){var tags=document.querySelectorAll("[contenteditable=true]");if(tags.length>0){var tag=tags[0];tag.focus();}}
HtmlBox._writeToolbar=function(id,title){if(title==null)title=R.NOTE;var buf=[];buf.push('<div class="bar"><span class=title>',title,"</span>");buf.push(HtmlBox._writeButton('bold','Bold (Ctrl-B)','bold'));buf.push(HtmlBox._writeButton('italic','Italic (Ctrl-I)','italic'));buf.push(HtmlBox._writeButton('underline','Underline  (Ctrl-U)','underline'));buf.push(HtmlBox._writeButton('fontSize','Title','uppercase'));buf.push(HtmlBox._writeButton('InsertUnorderedList','Bulleted List (Ctrl-Down Arrow)','bullet'));buf.push(HtmlBox._writeButton('outdent','Indent Less (Ctrl-Left Arrow)','outdent'));buf.push(HtmlBox._writeButton('indent','Indent More (Ctrl-Right Arrow)','indent'));buf.push(HtmlBox._writeButton('justifyLeft','Align Left','alignleft'));buf.push(HtmlBox._writeButton('justifyCenter','Align Center','aligncenter'));buf.push(HtmlBox._writeButton('justifyRight','Align Right','alignright'));buf.push(HtmlBox._writeButton('removeFormat','Remove Format','close'));buf.push(HtmlBox._writeButton('insertText','Insert Date','calendar'));buf.push(HtmlBox._writeButton('backColor','Highlight','penmarker'));buf.push('</div>');return buf.join('');}
HtmlBox._writeButton=function(action,title,image){var onclick="HtmlBox.onButton("+esc(action)+")";var buf=[];buf.push('<button unselectable="on" tabindex="-1" class="btn" title="',title,'" onclick="',onclick,'">',_icon(image,'editor'),'</button>');return buf.join('');}
HtmlBox.onpaste=function(obj){setTimeout(function(){obj.innerHTML=HtmlBox.filter(obj.innerHTML);},100);}
HtmlBox.onButton=function(action){var value=null;if(action=='fontSize'){if(HtmlBox.getSelectionTextSize()>=4)action="removeFormat";else value=4;}else if(action=='insertText')value=new Date().toLocaleString()+' ';else if(action=='backColor'){if(HtmlBox.getSelectionBackgroundColor()!="")action="removeFormat";else value="#FFFF00";}
document.execCommand(action,false,value);}
HtmlBox.insertText=function(id,text){var obj=_get(id);obj.focus();var sel=window.getSelection();sel.removeAllRanges();sel.addRange(HtmlBox._range);document.execCommand('insertText',false," "+text);return;}
HtmlBox.getSelectionTextSize=function(){var sel=window.getSelection();if(sel==null||sel.baseNode==null||sel.baseNode.parentNode==null)return null;return sel.baseNode.parentNode.size;}
HtmlBox.getSelectionBackgroundColor=function(){var sel=window.getSelection();if(sel==null||sel.baseNode==null||sel.baseNode.parentNode==null)return null;return sel.baseNode.parentNode.style.backgroundColor;}
HtmlBox.onShortcutTab=function(shift){if(shift==false){HtmlBox.onButton('indent');}else{HtmlBox.onButton('outdent');}}
HtmlBox.onControlShortcut=function(unicode){if(unicode==39){HtmlBox.onButton('indent');return false;}else if(unicode==37){HtmlBox.onButton('outdent');return false;}if(unicode==40){HtmlBox.onButton('InsertUnorderedList');return false;}else if(unicode==11){HtmlBox.onButton('fontSize');return false;}else if(unicode==85){HtmlBox.onButton('underline');return false;}else if(unicode==73){HtmlBox.onButton('italic');return false;}else if(unicode==66){HtmlBox.onButton('bold');return false;}else{return true;}}
HtmlBox.filter=function(contents){if(contents.toLowerCase()=='<p>&nbsp;</p>'){contents="";}
contents=contents.replace(/<\s*\/?\s*SCRIPT(\s[^>]*)?(\s*\/\s*)?>([\S\s]*<\s*\/SCRIPT\s*>)?/gi,"");contents=contents.replace(/\n/g,'');contents=contents.replace(/\r/g,'');return contents;}
HtmlBox._onFilterTag=function(tagBody,tagName,tagAttr){tagName=tagName.toLowerCase();var closingTag=(tagBody.match(/^<\//))?true:false;var TAGS=['b','p','br','ul','li','u','i','p','h1'];for(var i=0;i<TAGS.length;i++){if(tagName==TAGS[i]){return tagBody='<'+(closingTag?'/':'')+tagName+'>';}}
if(tagName=='a'||tagName=='div'||tagName=='font'){return tagBody;}else if(tagName=='tr'&&!closingTag){return'<br>';}else{return"";}}
function TextBox(){}
TextBox.writeText=function(id,value,onchange){TextBox._write(id,value,onchange);}
TextBox.writeLong=function(id,value,onchange){TextBox._write(id,value,onchange,TextBox.DOUBLE_WIDTH);}
TextBox.writeNumeric=function(id,value,onchange){TextBox._write(id,value,onchange);}
TextBox.writeDecimal=function(id,value,onchange,width){Format.init();if(Format._decimalSep==','&&onchange)onchange=onchange.replace("this.value","this.value.replace(',', '.')");TextBox._write(id,Format.real(value),onchange,width);}
TextBox.writePrice=function(id,value,onchange){Format.init();if(Format._decimalSep==','&&onchange)onchange=onchange.replace("this.value","this.value.replace(',', '.')");TextBox._write(id,Format.real(value),onchange);}
TextBox.writePassword=function(id,value,onchange){TextBox._writePassword(id,value,onchange);}
TextBox.writeUrl=function(id,value,onchange){TextBox._write(id,value,onchange,TextBox.DOUBLE_WIDTH);if(value!=null&&value.substr(0,4)=="http"){_html.push(' <a target=preview href="',Utils.xmlEncode(value),'">'+R.PREVIEW+'</a>');}}
TextBox.writeCode=function(id,value,onchange){if(value==null)value='';var style="width:1000px";_html.push('<span class="text">');_html.push('<textarea spellcheck="false" class=autoresize name="',id,'" id=',id,' onkeydown="TextBox.onKeydown(event,this)" onchange="',onchange,'" style="',style,'"/>',Utils.xmlEncode(value),'</textarea>');_html.push('</span>');}
TextBox.writeTextAutoComplete=function(id,value,oninput){if(oninput==null)oninput="";var datalistid=id+"_datalist";_html.push('<span class="text">');_html.push('<input type="text" onfocus="TextBox._focus = this" name="',id,'" id="',id,'" value="',Utils.xmlEncode(value),'" oninput="',oninput,'" list="',datalistid,'">');_html.push('<datalist id="',datalistid,'"></datalist>');_html.push('</span>');}
TextBox.onKeydown=function(e,obj){if(e.keyCode===9){var start=obj.selectionStart;var end=obj.selectionEnd;var target=e.target;var value=target.value;target.value=value.substring(0,start)
+"   "
+value.substring(end);obj.selectionStart=obj.selectionEnd=start+3;e.preventDefault();}}
TextBox.writeTextArea=function(id,value,onchange){BaseBox.writeHidden(id,value,onchange);if(Format.isHtml(value))value=Format.text(value);var style="width:"+TextBox.DOUBLE_WIDTH;var onchange2="TextBox._onTextAreaChange("+esc(id)+",this.value)";_html.push('<span class="text">');_html.push('<textarea class=autoresize onfocus="TextBox._focus = this" onchange="',onchange2,'" style="',style,'"/>',Utils.xmlEncode(value),'</textarea>');_html.push('</span>');}
TextBox._onTextAreaChange=function(id,value){value=Format.toHtml(value);BaseBox.setValue(id,value);}
TextBox.DOUBLE_WIDTH="725px";TextBox._write=function(id,value,onchange,width){if(onchange==null)onchange="";var style=(width!=null)?"width:"+width:"";_html.push('<span class="text">');_html.push('<input type="text" onfocus="TextBox._focus = this" name="',id,'" id="',id,'" value="',Utils.xmlEncode(value),'" onchange="',onchange,'" style="',style,'"/>');_html.push('</span>');}
TextBox._writePassword=function(id,value,onchange){if(onchange==null)onchange="";_html.push('<span class="text">');_html.push('<input type="password" name="',id,'" id="',id,'" value="',Utils.xmlEncode(value),'" onchange="',onchange,'" />');_html.push('</span>');}
TextBox.resizeTextArea=function(){var tags=document.getElementsByTagName('textarea');for(var i=0;i<tags.length;i++){var text=tags[i];if(text.className=='autoresize'){_observe(text,'change',TextBox.onResize);_observe(text,'cut',TextBox.onResize);_observe(text,'paste',TextBox.onResize);_observe(text,'keyup',TextBox.onResize);text.style.height='auto';text.style.height=text.scrollHeight+'px';}}}
TextBox.onResize=function(event){var event=window.event||event;var target=event.srcElement||event.target;window.setTimeout(function(){var offset=List._getOffset();target.style.height='auto';target.style.height=target.scrollHeight+'px';List._setOffset(offset);},0);}
TextBox.insertTextAtCursor=function(text){var obj=TextBox._focus;if(obj==null)return;text=" "+text;var val=obj.value;var endIndex,range;var doc=obj.ownerDocument;if(typeof obj.selectionStart=="number"&&typeof obj.selectionEnd=="number"){endIndex=obj.selectionEnd;obj.value=val.slice(0,endIndex)+text+val.slice(endIndex);obj.selectionStart=obj.selectionEnd=endIndex+text.length;}else if(doc.selection!="undefined"&&doc.selection.createRange){obj.focus();range=doc.selection.createRange();range.collapse(false);range.text=text;range.select();}
obj.onchange();return;}
function ToggleBox(){}
ToggleBox.write=function(id,label,value,onchange,strOptions){if(value==null)value="";if(onchange==null)onchange="";onchange=Utils.xmlEncode(onchange);var options=ComboBox.parseOptions(strOptions,value);ToggleBox.writeEdit(id,value,onchange,options);}
ToggleBox.writeEdit=function(id,value,onchange,options){BaseBox.writeHidden(id,value,onchange);_html.push('<div class="togglebox">');for(var i=0;i<options.length;i++){var option=options[i];var onclick="ToggleBox.onclick("+esc(id)+",this)";var style=option.selected?ToggleBox.getSelectedStyle(option.value):"";var label=option.text;if(label=="")label="?";_html.push('<div style="',style,'" value="',option.value,'" onclick="',onclick,'">',label,'</div>');}
_html.push('</div>');}
ToggleBox.formatView=function(value,options){var hasValue=false;var buf=[];buf.push('<div class="togglebox">');for(var i=0;i<options.length;i++){var option=options[i];if(option.selected==true){hasValue=true;var style=ToggleBox.getSelectedStyle(value);buf.push('<div style="',style,'">',option.text,'</div>');}}
if(hasValue==false)buf.push('<div>',"?",'</div>');buf.push('</div>');return buf.join("");}
ToggleBox.onclick=function(id,obj){var value=obj.getAttribute("value");var parent=obj.parentNode;for(var i=0;i<parent.children.length;i++){var child=parent.children[i];var style=(child==obj)?ToggleBox.getSelectedStyle(value):"";child.setAttribute("style",style);}
BaseBox.setValue(id,value);}
ToggleBox.getSelectedStyle=function(value){var color="";if(value=="1")color=Color.GREEN;else if(value=="2"||value=="3")color=Color.YELLOW;else if(value=="4"||value=="P")color=Color.ORANGE;else if(value=="5"||value=="0")color=Color.RED;else color=Color.BLUE;var style="color:white;background-color:"+color;return style;}
ToggleBox.formatScore=function(value){if(!value)value="";var parts=value.split(":");var label=parts[0];var color=(parts.length==2)?parts[1]:Color.BLUE;var buf=[];buf.push('<div class="togglebox">');var style="color:white;background-color:"+color;buf.push('<div style="',style,'">',label,'</div>');buf.push('</div>');return buf.join("");}
var _CURRENCY_LABELS=['U.S. Dollar','Euro','British Pound','Japanese Yen','Canadian Dollar','Australian Dollar','Swiss Franc','Hong Kong Dollar','New Zealand Dollar','Singapore Dollar','Sri Lanka Rupee','Swedish Krona'];var _CURRENCY_CODES=['USD','EUR','GBP','JPY','CAD','AUD','CHF','HKD','NZD','SGD','LKR','SEK'];var _CURRENCY_SYMBOLS=['$',' €','£',' ¥','C$ ','$','CHF','HK$','NZ$','S$','Rs','kr']
function getCurrencyCombo(defaultCurrencyCode,selectedCurrencyCode){var buffer="";var isDefaultListed=false;var isSelectedListed=false;for(var i=0;i<_CURRENCY_CODES.length;i++){if(i>0)buffer+="|";buffer+=_CURRENCY_CODES[i]+":"+_CURRENCY_LABELS[i];if(_CURRENCY_CODES[i]==defaultCurrencyCode)
isDefaultListed=true;if(_CURRENCY_CODES[i]==selectedCurrencyCode)
isSelectedListed=true;}
if(!isDefaultListed&&defaultCurrencyCode!=undefined)
buffer=defaultCurrencyCode+":"+defaultCurrencyCode+"|"+buffer;if(!isSelectedListed&&selectedCurrencyCode!=undefined&&selectedCurrencyCode!=defaultCurrencyCode)
buffer=selectedCurrencyCode+":"+selectedCurrencyCode+"|"+buffer;return buffer;}
function formatCurrencyLabel(currencyCode){for(var i=0;i<_CURRENCY_CODES.length;i++){if(_CURRENCY_CODES[i]==currencyCode)return _CURRENCY_LABELS[i];}
return currencyCode;}
function getCurrencySymbol(code){for(var i=0;i<_CURRENCY_CODES.length;i++){if(code==_CURRENCY_CODES[i])
return _CURRENCY_SYMBOLS[i];}
return code;}
function formatLongDay(millisec){return DateFormatter.format(millisec,DateFormatter.LONGDAY);}
function DateFormatter(){}
DateFormatter.FILEDATE=3;DateFormatter.TIME=5;DateFormatter.DATE=6;DateFormatter.LONGDAY=8;DateFormatter.dayOfWeek=function(index){var weekday=[R.SUNDAY,R.MONDAY,R.TUESDAY,R.WEDNESDAY,R.THURSDAY,R.FRIDAY,R.SATURDAY,R.SUNDAY];return weekday[index];}
DateFormatter.dayLetter=function(index){var str=DateFormatter.dayOfWeek(index);return str.substring(0,1).toUpperCase();}
DateFormatter.month=function(index){var MONTHS=[R.JAN,R.FEB,R.MAR,R.APR,R.MAY,R.JUN,R.JUL,R.AUG,R.SEP,R.OCT,R.NOV,R.DEC];return MONTHS[index];}
DateFormatter.getMonthOptions=function(){var MONTHS=[R.JAN,R.FEB,R.MAR,R.APR,R.MAY,R.JUN,R.JUL,R.AUG,R.SEP,R.OCT,R.NOV,R.DEC];var buf=[];for(var i=0;i<MONTHS.length;i++){buf.push(i+":"+MONTHS[i]);}
return buf.join('|');}
DateFormatter.getSnoozeDates=function(){var dates=[];dates.push({date:Date.today(),label:R.TODAY,img:"clock"});dates.push({date:Date.today(1),label:R.TOMORROW,img:"calendar1"});dates.push({date:Date.today(7),label:R.NEXTWEEK,img:"calendar7"});dates.push({date:Date.today(30),label:R.NEXTMONTH,img:"calendar30"});dates.push({date:0,label:R.SOMEDAY,img:"support"});return dates;}
DateFormatter.format=function(millisec,format){millisec=Number(millisec);if(millisec==0){return"";}
var date=new Date(millisec);var year=date.getFullYear();var month=date.getMonth()+1;var day=date.getDate();var hours=date.getHours();var minutes=date.getMinutes();var now=new Date();var thisYear=now.getFullYear();var thisMonth=now.getMonth()+1;var thisDay=now.getDate();var sep="/";if(User.countryCode=='CH')sep=".";switch(format){case DateFormatter.LONGDAY:var suffix='';if(year!=thisYear)suffix+=' '+year;var todayStart=Date.today();if(millisec>=todayStart&&millisec<todayStart+Date.DAY){suffix+=' ('+R.TODAY+')';}
return DateFormatter.dayOfWeek(date.getDay())+' '+DateFormatter.month(month-1)+' '+day+suffix;case DateFormatter.DATE:if(year==thisYear&&User.countryCode!='CH'&&Format._print==false){if(month==thisMonth&&day==thisDay){return R.TODAY;}else{var shortMonth=DateFormatter.month(month-1).substr(0,3);return Date.isLocaleUS()?shortMonth+' '+day:day+' '+shortMonth;}}else{if(day<10)day="0"+day;if(month<10)month="0"+month;var buffer=Date.isLocaleUS()?month+sep+day:day+sep+month;buffer+=sep+year;return buffer;}
case DateFormatter.FILEDATE:if(day<10)day="0"+day;if(month<10)month="0"+month;var buffer=Date.isLocaleUS()?month+"-"+day:day+"-"+month;buffer+="-"+year;return buffer;case DateFormatter.TIME:if(hours==0&&minutes==0)return"";if(AccountSettings.get('timeformat')=='12hour'){return get12hourTime(hours,minutes);}else{return get24hourTime(hours,minutes);}
default:return"";}}
DateFormatter.formatDiff=function(millisec){var todayStart=Date.today();if(millisec>=todayStart&&millisec<todayStart+Date.DAY){return R.TODAY;}else if(millisec>=todayStart+Date.DAY&&millisec<todayStart+2*Date.DAY){return R.TOMORROW;}else if(millisec>=todayStart-Date.DAY&&millisec<todayStart){return R.YESTERDAY;}
var dayDiff=Math.floor((todayStart-millisec)/(24*60*60*1000));var weekDiff=Math.floor(Math.abs(dayDiff)/7);var monthDiff=Math.floor(Math.abs(dayDiff)/30);var str="";if(dayDiff>0){if(monthDiff>1){str=monthDiff+" "+R.MONTHSAGO;}else if(monthDiff==1){str=R.LASTMONTH;}else if(weekDiff>1){str=weekDiff+" "+R.WEEKSAGO;}else if(weekDiff==1){str=R.LASTWEEK;}else if(dayDiff>1){str=dayDiff+" "+R.DAYSAGO;}}else if(dayDiff<0){dayDiff=-dayDiff;if(monthDiff>1){str=R.INPERIODTIME+" "+monthDiff+" "+R.MONTHSPERIOD;}else if(monthDiff==1){str=R.NEXTMONTH;}else if(weekDiff>1){str=R.INPERIODTIME+" "+weekDiff+" "+R.WEEKSPERIOD;}else if(weekDiff==1){str=R.NEXTWEEK;}else if(dayDiff>1){str=R.INPERIODTIME+" "+dayDiff+" "+R.DAYSPERIOD;}}
return str;}
function get12hourTime(hours,minutes){if(minutes<10)minutes="0"+minutes;var suffix="";if(hours<12){suffix="am";if(hours==0)hours=12;}else{suffix="pm";if(hours>12)hours=hours-12;}
return hours+":"+minutes+suffix;}
function get24hourTime(hours,minutes){if(minutes<10)minutes="0"+minutes;if(hours<10)hours="0"+hours;return hours+":"+minutes;}
function App(){}
App.mailto=function(emails,subject,body){var url;var target="";var bcc=(AccountSettings.get('bcc')=='1')?User.emailDropbox:null;var param=new ParameterList();if(window.Windows){console.log("Window 10: mailto");RT.Mailer.start(emails.join(','),subject,body);return;}
if(AccountSettings.get("email")=="gmail"&&!window.Windows){param.add("to",emails.join(","));if(bcc)param.add("bcc",bcc);if(subject)param.add("su",subject);if(body)param.add("body",body);url="https://mail.google.com/mail/?view=cm&source=mailto&fs=1&"+param.toURLEncodedString();target="_gmail";}else{if(bcc)param.add("bcc",bcc);if(subject)param.add("subject",subject);if(body)param.add("body",body);url="mailto:"+emails.join(',')+"?"+param.toURLEncodedString();}
window.open(url,target);}
App.mailto2=function(email,subject,body){App.mailto([email],subject,body);}
App.sms=function(numbers){var list=numbers.split(";");var list2=new Array();for(var i=0;i<list.length;i++){var number=_cleanPhone(list[i]);if(number!='')list2.push(number);}
if(list2.length==0){alert("No valid Phone Number for sending SMS");return;}
var url='skype:'+list2.join(';')+'?sms';document.location.href=url;}
App.call=function(number){var url="skype:"+_cleanPhone(number);document.location.href=url;}
App.alert=function(message,style){if(message==null){Toast.hideAlert();return;}
if(style=="red")Toast.showAlert(message);else if(style=="warning")Toast.showWarning(message);else Toast.show(message);}
App.confirm=function(message){if(window.Windows)return true;return window.confirm(message);}
App.sound=function(){}
App.prompt=function(title,value,style){return window.prompt(title,value);}
App.takePicture=function(linkedtable,linkedid,mode,onclick){if(Accounts.device=="phone"){var func="Camera.start("+esc(linkedtable)+","+esc(linkedid)+")";Engine.eval(func);return;}
Popup.add(R.UPLOADFILE,"FilePicker.pick("+esc(linkedtable)+","+esc(linkedid)+",'',"+esc(mode)+","+esc(onclick)+")","img:upload");if(AccountSettings.get("upload.googledrive","1")=="1")Popup.add("Google Drive","GoogleDrive.showPicker("+esc(linkedtable)+","+esc(linkedid)+")","img:google");if(AccountSettings.get("upload.googledrive","1")=="1")Popup.add("Dropbox","FilePicker.showDropbox("+esc(linkedtable)+","+esc(linkedid)+")","img:dropbox");if(AccountSettings.get("upload.camera","1")=="1")Popup.add("Camera","Camera.start("+esc(linkedtable)+","+esc(linkedid)+")","img:camera");Popup.add("One Drive","FilePicker.showOneDrive("+esc(linkedtable)+","+esc(linkedid)+")","img:app");Popup.show();}
App.duplicatePicture=function(fileid,name){return FilePicker.duplicatePicture(fileid,name);}
App.open=function(func){Engine.eval(func);}
App.downloadFile=function(url,values,filename){var frm=new Downloader2(url);for(key in values){var value=values[key];if(value!=null)frm.append(key,value);}
frm.download(filename);}
App.web=function(url){if(window.Windows){var downloader=new RT.Downloader(url);downloader.download("");return;}
window.open(url,"_blank");}
App.map=function(address,geo){if(address==null)address="";if(geo==null)geo="";if(window.Windows){RT.Map.start(address,geo);return;}
var q=(geo!="")?geo:encodeURIComponent(address);var url="http://maps.google.com/maps?q="+q;window.open(url,"_blank");}
App.video=function(youtubeid){var url="http://www.youtube.com/watch?v="+youtubeid;window.open(url);}
App.log=function(msg){if(window.console!=null)window.console.log(msg);}
App.scanCode=function(onchange){var value=App.prompt("Enter Bar code scan","");if(value==null)return;onchange=onchange.replace("this.value",esc(value));eval(onchange);}
App.uploadFile=function(linkedtable,linkedid,folderid,onclick){FilePicker.pick(linkedtable,linkedid,folderid,null,onclick);}
App.updateFile=function(fileid,onclick){FilePicker.pickUpdate(fileid,onclick);}
App.postData=function(url,values,callback){var async=false;if(callback!=null)async=true;var http=new XMLHttpRequest();http.open("POST",url,async);var data="";var formData=new FormData()
for(key in values){var value=values[key];if(value!=null){if(Array.isArray(value)){for(var i=0;i<value.length;i++){formData.append(key,value[i]);}}else{formData.append(key,value);}}}
if(callback!=null){http.upload.progress=http.onload=function(){if(http.readyState===4){if(http.status===200){var blob=http.response;callback(blob);}else{callback(null);}}}
http.onerror=function(){callback(null);}}
http.send(formData);if(http.status===200){return http.responseText}else{return null;}}
App.postData2=function(url,formData,callback){var async=true;var http=new XMLHttpRequest();http.open("POST",url,async);http.onload=function(){if(http.readyState===4){var ok=(http.status===200);callback(ok?http.response:null);}}
http.onerror=function(){callback(null);}
http.send(formData);}
App.getData=function(url){var http=new XMLHttpRequest();http.open("GET",url,false);http.send();if(http.status===200){return http.responseText}else{return null;}}
App.help=function(url){var baseUrl="https://www.upvise.com/";if(url!=null)baseUrl+=url
else baseUrl+="help/";if(Accounts.getOem()=="novade")baseUrl="https://novade.zendesk.com/hc/en-us";var customurl=AccountSettings.get("supporturl");if(customurl)baseUrl=customurl;window.open(baseUrl,"_blank");}
App.sync=function(callback){Cache.sync(function(changed){if(callback)Engine.eval(callback);});}
App.listen=function(label,callback){var text=window.prompt(label);if(text){callback=callback.replace("this.value",esc(text));eval(callback);}}
App.postDataAsync=function(url,values,message,callback){var http=new XMLHttpRequest();http.open("POST",url,true);var data="";var formData=new FormData()
for(key in values){var value=values[key];if(value!=null)formData.append(key,value);}
http.upload.addEventListener("progress",function(event){var msg=(event.loaded<event.total)?"Uploading":"Processing";if(message!=null)msg+=" "+message;Toast.showProgress(msg,event.loaded,event.total);});http.addEventListener("load",function(){if(http.readyState===4){if(http.status===200){var blob=http.response;if(callback)callback(blob);}else{if(callback)callback(null);}}});http.addEventListener("error",function(){App.alert(R.ERROR);if(callback)callback(null);});http.send(formData);}
App.copyToClipboard=function(text){if(window.clipboardData&&window.clipboardData.setData){return clipboardData.setData("Text",text);}else if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var textarea=document.createElement("textarea");textarea.textContent=text;textarea.style.position="fixed";document.body.appendChild(textarea);textarea.select();try{return document.execCommand("copy");}catch(ex){console.warn("Copy to clipboard failed.",ex);return false;}finally{document.body.removeChild(textarea);App.alert(R.COPIEDCLIPBOARD);}}}
App.createCounter=function(id,value){var action="createcounter";var params=new ParameterList();params.add("id",id);params.add("value",value);var data=[];data.push('<query type="',action,'" params="',params.toXMLString(),'" />');var SETTINGS_URL=User.BASE_URL+"settings2";WebRequest.postXml(SETTINGS_URL,data.join(''),null);}
function ChartData(){this.title=null;this.type=null;this.columns=[];this.colors=[];this.rows=[];this.onclick=[];this.style="";this.options={};}
function Chart(){}
Chart.reset=function(){Chart.data=[];Chart.curData=null;Chart.currencyFormatter=null;}
Chart.reset();Chart.init=function(colors){if(User.language=="ZH"){Chart.load=ChartO.load;Chart.show=ChartO.show;Chart._drawChart=ChartO._drawChart;}
Chart.curData=new ChartData();Chart.data.push(Chart.curData);Chart.curData.id="Chart"+Database._guid();if(colors&&Array.isArray(colors)){Chart.curData.colors=colors;}}
Chart.setColors=function(colors){if(colors)Chart.curData.colors=colors.split(";");}
Chart.setTitle=function(title){Chart.curData.title=title;}
Chart.setStyle=function(style){Chart.curData.style=style;}
Chart.setMinSlice=function(value){Chart.curData.minSlice=value;}
Chart.setOption=function(name,value){Chart.curData.options[name]=value;}
Chart.addColumn=function(type,label){Chart.curData.columns.push({type:type,label:label});}
Chart.addRow=function(){var args=null;if(arguments.length==1&&arguments[0]instanceof Array){args=arguments[0];}else{args=[].slice.call(arguments);}
Chart.curData.rows.push(args);}
Chart.addRowClick=function(onclick,color){Chart.curData.onclick.push(onclick);if(color!=null)Chart.curData.colors.push(color);}
Chart.show=function(type){List.ensureClose();Chart.curData.type=type;var style="";if(type=="pie"||type=="donut"){style="height:300px;";}else{style="padding:15px;"}
style+=Chart.curData.style;var index=Chart.data.length-1;var oncontext="Chart.showContextMenu("+esc(Chart.curData.id)+","+esc(Chart.curData.title)+")";var oncontext="Engine.eval("+esc(oncontext)+",0,event);return false";_html.push('<DIV id="',Chart.curData.id,'" style="',style,'" oncontextmenu="',oncontext,'"></DIV>');if(Debug.target=="phone"||Debug.target=="tablet")List.show();}
Chart.afterShow=function(){if(Chart.data.length==0)return;Chart.load(Chart._drawChart);}
Chart.load=function(callback){if(typeof google==="undefined"){Loader.loadScript(GoogleMap.JSAPI_URL,function(){Chart.load(callback)},Chart.onError);}else if(typeof google.visualization==='undefined'){google.load('visualization','1.1',{'callback':'Chart._drawChart()','packages':['corechart','bar','timeline','line','gantt','calendar']});}else if(callback!=null){callback();}}
Chart.onError=function(){App.alert("Cannot load Chart");}
Chart.isIE=function(){var ua=navigator.userAgent;if(ua.indexOf('MSIE')>-1){return true;}else return false;}
Chart._drawChart=function(index){if(index==null)index=0;if(index==Chart.data.length){Chart.reset();return;}
var reportData=Chart.data[index];var div=_get(reportData.id);if(div==null){Chart.reset();return;}
var hasLegend=false;var data=new google.visualization.DataTable();for(var i=0;i<reportData.columns.length;i++){var column=reportData.columns[i];data.addColumn(column.type,column.label);if(column.label!=null&&column.label!="")hasLegend=true;}
for(var i=0;i<reportData.rows.length;i++){var row=reportData.rows[i];data.addRow(row);}
var title=reportData.title;var chart=null;var options=null;var height=50+25+25*reportData.rows.length;var legend={position:(hasLegend?'bottom':'none')};var type=reportData.type;if(type=="bar"||type==null){options={title:title,chart:{title:title},legend:legend,height:200};chart=new google.charts.Bar(div);}else if(type=="stackbar"){options={chart:{title:title},legend:legend,stacked:true,height:200};chart=new google.charts.Bar(div);}else if(type=="horizontalbar"){options={chart:{title:title},legend:legend,bars:'horizontal',height:height};chart=new google.charts.Bar(div);}else if(type=="horizontalstackbar"){options={chart:{title:title},legend:legend,bars:'horizontal',height:height,stacked:true};chart=new google.charts.Bar(div);}else if(type=="line"){options={title:title,chart:{title:title},legend:legend};options.axes={y:{all:{range:{min:0}}}};chart=new google.charts.Line(div);}else if(type=="pie"){options={title:title,is3D:true,sliceVisibilityThreshold:7/360,chartArea:{width:"90%"},titleTextStyle:{color:'gray',fontSize:16,bold:false}};if(reportData.colors.length>0||reportData.minSlice===0){options.sliceVisibilityThreshold=0;}
chart=new google.visualization.PieChart(div);}else if(type=="donut"){options={title:title,sliceVisibilityThreshold:7/360,chartArea:{width:"90%"},pieHole:0.5,titleTextStyle:{color:'gray',fontSize:16,bold:false}};if(reportData.minSlice===0)options.sliceVisibilityThreshold=0;chart=new google.visualization.PieChart(div);}else if(type=="timeline"){options={title:title,height:1.5*height};if(reportData.colors.length==0)options.timeline={showRowLabels:false,singleColor:'#4285F4'};chart=new google.visualization.Timeline(div);}else if(type=="gantt"){options={height:height,gantt:{trackHeight:30}};chart=new google.visualization.Gantt(div);}else if(type=="calendar"){options={title:title,height:450};chart=new google.visualization.Calendar(div);}else{return;}
if(reportData.colors.length==0)reportData.colors=Color.ALL;if(type=="stackbar"||type=="horizontalstackbar"){options.series={};for(var i=0;i<reportData.colors.length;i++){var color=reportData.colors[i];options.series[i]={color:color};}}else{options.colors=reportData.colors;}
if(type=="gantt"){google.visualization.events.addListener(chart,'onmouseover',function(e){Chart._selectedItem={row:e.row,column:null};});google.visualization.events.addListener(chart,'select',function selectHandler(){if(Chart._selectedItem!=null){var rowIndex=Chart._selectedItem.row;var onclick=reportData.onclick[rowIndex];if(onclick!=null)Engine.eval(onclick);}});}else{google.visualization.events.addListener(chart,'select',function selectHandler(){var selection=chart.getSelection();if(selection!=null&&selection.length>0){var rowIndex=selection[0].row;var onclick=reportData.onclick[rowIndex];if(onclick!=null)Engine.eval(onclick);}});}
for(var key in reportData.options){options[key]=reportData.options[key];}
google.visualization.events.addListener(chart,'ready',function(){index++;Chart._drawChart(index);});chart.draw(data,options);}
Chart.getOldOptions=function(reportData,legend){var options={title:reportData.title,hAxis:{},vAxis:{},chartArea:{}};options.legend=legend;options.theme='material';if(reportData.colors.length>0)options.colors=reportData.colors;return options;}
Chart.showContextMenu=function(divid,filename){Popup.add("Download As Image","Chart.exportImage("+esc(divid)+","+esc(filename)+")","img:download");Popup.show();}
Chart.exportImage=function(divid,filename){Chart.getImageData(divid,function(dataUri){Chart.download(dataUri,filename);});}
Chart.download=function(dataUri,filename){var ua=navigator.userAgent;if(ua.indexOf('MSIE')>-1||ua.indexOf("Edge")>-1||navigator.appVersion.indexOf('Trident/')>-1){location.hef=dataUri;return;}
var link=document.createElement("a");link.download=filename+".png";link.href=dataUri;document.body.appendChild(link);link.click();document.body.removeChild(link);delete link;}
Chart.getImageData=function(divid,callback){var chartContainer=_get(divid);var mySVG=chartContainer.getElementsByTagName('svg')[0];var can=document.createElement('canvas');var ctx=can.getContext('2d');var loader=new Image();loader.width=can.width=chartContainer.clientWidth;loader.height=can.height=chartContainer.clientHeight;loader.onload=function(){ctx.drawImage(loader,0,0,loader.width,loader.height);var data=can.toDataURL();callback(data);};var svgAsXML=(new XMLSerializer).serializeToString(mySVG);loader.src='data:image/svg+xml,'+encodeURIComponent(svgAsXML);}
function GanttChart(){}
GanttChart.init=function(){Chart.init();Chart.addColumn('string','Task ID');Chart.addColumn('string','Task Name');Chart.addColumn('string','Resource');Chart.addColumn('date','Start Date');Chart.addColumn('date','End Date');Chart.addColumn('number','Duration');Chart.addColumn('number','Percent Complete');Chart.addColumn('string','Dependencies');}
GanttChart.addRow=function(id,name,startdate,enddate,percent,linkedid){var resource=name;if(enddate==startdate){enddate=startdate+Date.DAY;}
var count=Chart.curData.rows.length;if(count>0){var previous=Chart.curData.rows[count-1];var duration=previous[4].getTime()-previous[3].getTime();if(duration<3*Date.DAY)linkedid=null;}
Chart.addRow([id,name,resource,new Date(startdate),new Date(enddate),null,percent,linkedid]);}
GanttChart.show=function(){Chart.show("gantt");}
function Config(){}
Config.appid="";Config.tables={};function Format(){}
Format.address=function(street,city,state,zipcode,country){var lang=navigator.language||navigator.userLanguage;if(street!=null&&street!='')street=street.replace(" / ","\n")+"\n";var buf=new Array();_append(buf,street);if(Format.isAngloSaxon(country)){_append(buf,city);_append(buf,state);_append(buf,zipcode);_append(buf,country);}else if(User.language=="DE"){_append(buf,country);_append(buf,zipcode);_append(buf,city);_append(buf,state);}else{_append(buf,zipcode);_append(buf,city);_append(buf,state);_append(buf,country);}
return buf.join('');}
Format.isAngloSaxon=function(country){var isUserAnglo=(User.countryCode=="US"||User.countryCode=="GB"||User.countryCode=="AU"||User.countryCode=="CA");var isCountryAnglo=(country!=null&&country!=""&&(country.toLowerCase()=='usa'||country.toLowerCase()=='uk'||country.toLowerCase()=='australia'||country.toLowerCase()=='canada'));return(isCountryAnglo||((country==null||country=="")&&isUserAnglo));}
Format._print=false;Format.forprint=function(){Format._print=true;}
Format.date=function(millisec){return DateFormatter.format(millisec,DateFormatter.DATE);}
Format.datetime=function(millisec){if(millisec<100)return"";return Format.date(millisec)+" "+Format.time(millisec);}
Format.time=function(millisec,style){if(millisec=="NaN")return"";var str=DateFormatter.format(millisec,DateFormatter.TIME);if(style=="short"){str=str.replace("am","");str=str.replace("pm","p");}
return str;}
Format.systemdate=function(millisec){if(millisec==0)return"";var date=new Date(millisec);var year=date.getFullYear();var month=date.getMonth()+1;var day=date.getDate();if(day<10)day="0"+day;if(month<10)month="0"+month;var buffer=Date.isLocaleUS()?month+"/"+day:day+"/"+month;buffer+="/"+year;return buffer;}
Format.month=function(millisec){millisec=Number(millisec);if(millisec==0)return R.SOMEDAY;var date=new Date(millisec);var year=date.getFullYear();var month=date.getMonth();return DateFormatter.month(month)+" "+year;}
Format.monthShort=function(millisec){millisec=Number(millisec);if(millisec==0)return R.SOMEDAY;var date=new Date(millisec);var year=date.getFullYear();var month=date.getMonth();return DateFormatter.month(month).substr(0,3)+" "+year.toString().substr(2);}
Format.dayOfWeek=function(millisec){var date=new Date(millisec);return DateFormatter.dayOfWeek(date.getDay());}
Format.week=function(millisec){millisec=Number(millisec);if(millisec==0)return"";var date1=new Date(millisec);var date2=new Date(millisec);date2.setDate(date2.getDate()+6);var str=date1.getDate()+" "+DateFormatter.month(date1.getMonth()).substr(0,3)
str+=" - "+date2.getDate()+" "+DateFormatter.month(date2.getMonth()).substr(0,3)+" "+date2.getFullYear();return str;}
Format.duration=function(value,format){if(format=="hour")return(Math.round(value/60))+"h";var span=Date.parseDuration(value);var buffer=[];if(span.hours>0){buffer.push(span.hours+"h");if(span.minutes>0){if(span.minutes<=9)buffer.push("0");buffer.push(span.minutes);}}else if(span.minutes>0)buffer.push(span.minutes+"mn");return buffer.join("");}
Format.frequency=function(days){var str=Format.options(days,FrequencyBox.getOptions());if(str=="")str=R.EVERY+" "+days+" "+R.DAYSPERIOD;return str;}
Format.init=function(){if(Format._decimalSep!=null&&Format._thousandSep!=null)return;if(User.countryCode=="CH"){Format._decimalSep=".";Format._thousandSep="'";return;}
var locale=User.language;Format._decimalSep=Number("1.2").toLocaleString(locale).substr(1,1);Format._thousandSep=Number("1000").toLocaleString(locale).substr(1,1);if(Format._thousandSep=='0')Format._thousandSep=Format._decimalSep=='.'?',':' ';}
Format.price=function(amount,currency,addDecimal){Format.init();if(addDecimal==null)addDecimal=true;if(amount==null||amount=="")amount=0;amount=parseFloat(amount);var signPart=(amount<0)?" - ":"";amount=Math.abs(amount);amount=Math.round2(amount);var intPart=Math.floor(amount);var decPart=amount.toFixed(2).slice(-2);if(currency==null)currency=AccountSettings.get("currency");var symbol=getCurrencySymbol(currency);if(currency=="CHF")symbol+=" ";var str=signPart+symbol;str+=String(intPart).replace(/(?=(?!^)(?:\d{3})+(?!\d))/g,Format._thousandSep);if(addDecimal)str+=Format._decimalSep+decPart;return str;}
Format.number=function(number){return Number(number).toLocaleString(User.language);}
Format.real=function(amount){Format.init();var value;if(amount==null||amount=="")amount=0;if(Format._decimalSep==','){value=amount.toString().replace('.',',');}
else{value=amount;}
return value;}
Format.systemreal=function(amount){Format.init();var value;if(amount==null||amount=="")amount=0;if(Format._decimalSep==','){value=amount.toString().replace(',','.');}
else{value=amount;}
return value;}
Format.distance=function(meters){meters=parseInt(meters);if(meters<1000){return meters+"m";}else{var km=meters/1000;km=Math.round(km*10)/10;return km+"km";}}
Format.timediff=function(aDate){var minutes=(Date.now()-aDate)/(60*1000);return(minutes>1)?Format.duration(minutes)+" ago":"just now";}
Format.isHtml=function(str){var htmlRegex=new RegExp(/<[a-z][\s\S]*>/i);var yes=htmlRegex.test(str);return yes;}
Format.toHtml=function(str){str=str.replace(/\r/g,"");str=str.replace(/\n/g,"<br>");return str;}
Format.text=function(html,style){if(html==null||html=="")return"";var plain=html;plain=plain.replace(/\r/g,"");plain=plain.replace(/\n/g,"");plain=plain.replace(/<p>/gi,"\n");plain=plain.replace(/<br>/gi,"\n");plain=plain.replace(/<div>/gi,"\n");var plain=plain.replace(/<\/?[^>]+(>|$)/g," ");if(plain!=""){plain=plain.trim();}
plain=decodeEntities(plain);plain=plain.replace(/<\/?[^>]+(>|$)/g," ");if(style=="gray")return' <span style="color:#BBBBBB">- '+plain+'</span>';else return plain;}
Format.options=function(value,options){if(!options)return value;return Parameter.getNames(value,options);}
Format.owner=function(owner){if(owner==null||owner=="")return"";var values=owner.split('|');return values.join(", ");}
Format.capitalize=function(label){if(label!=null&&label.length>0){return label.charAt(0).toUpperCase()+label.slice(1);}else{return"";}}
Format.geo=function(geo){var url='http://maps.google.com/maps?q='+geo;var buf=['<a target=_new title="',R.VIEWMAP,'" href="',url,'">',geo,'</a>'];return buf.join('');}
Format.tag=function(str,color,onclick){if(str==null||str=="")return"";if(onclick)onclick="event.stopPropagation();"+"Engine.eval("+esc(onclick)+",0,event)";else onclick="";if(color==null||color==""||color==Color.GRAY){return'<span onclick="'+onclick+'" class="tag gray">'+str+'</span>';}else{return'<span onclick="'+onclick+'" class="tag" style="color:white;background-color:'+color+'">'+str+'</span>';}}
Format.image64=function(data){if(data==null||data=="")return null;return'<img src="data:image/png;base64,'+data+'"/>';}
Format.video=function(videoid){if(videoid==null||videoid=='')return null;var src="https://www.youtube.com/embed/"+videoid;var buf=[];buf.push('<iframe id="ytplayer" type="text/html" width="640" height="390" frameborder="0" ');buf.push(' src="',src,'?&origin="http://www.upvise.com" />');return buf.join('');}
Format.link=function(table,id){if(table==""||id==""||id==null)return"";if(table=="Forms.forms"){id=id.split(":")[0];}
var item=Query.selectId(table,id);if(item==null)return"";var func="";if(table=="Assets.assets")func="Assets.viewAsset";else if(table=="Assets.locations")func="Assets.viewSite";else if(table=="Projects.projects")func="Projects.viewProject";else if(table=="System.files")func="Files.viewFile";else if(table=="Qhse.procedures")func="Qhse.viewArticle";else if(table=="Sales.products")func="Sales.viewProduct";else if(table=="Sales.opportunities")func="Sales.viewOpp";else if(table=="Sales.quotes")func="Sales.viewQuote";else if(table=="Jobs.jobs")func="Jobs.viewJob";else if(table=="Forms.forms")func="Forms.viewForm";else if(table=="Contacts.contacts")func="Contacts.viewContact";else if(table=="Contacts.companies")func="Contacts.viewCompany";else if(table=="Calendar.events")func="Calendar.viewEvent";else if(table=="Tasks.tasks")func="Tasks.viewTask";else if(table=="Tasks.lists")func="Tasks.viewTaskList";else if(table=="Time.slots")func="Time.viewSlot";else if(table=="Tools.tools")func="Tools.viewTool";var name=item.name;if(table=="Forms.forms"){name=Query.names("Forms.templates",item.templateid)+" "+item.name;}
func=_func(func,id);var onclick="event.cancelBubble=true;"+_func("Engine.eval",func);return'<a class=link onclick="'+onclick+'">'+name+'</a>';}
Format.email=function(email,kind,id){if(email==null||email=='')return'';var onclick=(kind==null)?"App.mailto(['"+email+"'])":"ContactUtils.mailto('"+email+"','"+kind+"','"+id+"')";return'<a href=# onclick="'+onclick+'">'+email+'</a>';}
Format.web=function(url){if(url==null||url=="")return"";var index=url.indexOf("://");var label="";if(index==-1){title=url;url="http://"+url;}else{title=url.substring(index+3);}
return'<a target=_blank href="'+url+'">'+title+'</a>';}
Format.phone=function(tel,label){if(tel==null||tel=="")return"";if(Format._print==true)return tel;var buf=[];if(label!=null)buf.push(label,':&nbsp;');var onclick=_func("App.call",tel);buf.push('<a title="',R.CALL,'" onclick="',onclick,'">',tel,'</a>');return buf.join("");}
Format.skype=function(skypename){if(skypename==null||skypename=="")return"";return'<a title="'+R.CHAT+'" href="skype:'+skypename+'?chat">'+skypename+'</a>';}
Format.filesize=function(size){if(size>1024*1024){var fsize=(size)/(1024*1024);var temp=Math.floor(fsize*10);fsize=(temp)/10;return fsize+" MB";}
if(size>0){size=Math.floor(size/1024);if(size==0){size=1;}}
return size+" KB";}
Format.toggle=function(value,strOptions){if(strOptions=="")return ToggleBox.formatScore(value);var options=ComboBox.parseOptions(strOptions,value);return ToggleBox.formatView(value,options);}
Format.icon=function(style,onclick){style=List._parseStyle(style);onclick="event.preventDefault();"+_func("Engine.eval",onclick);return'<div style="display:inline-block;background-color:'+style.color+'" onclick="'+onclick+'">'+_icon(style.img,"white")+'</span>';}
var decodeEntities=(function(){var element=document.createElement('div');function decodeHTMLEntities(str){if(str&&typeof str==='string'){str=str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi,'');str=str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi,'');element.innerHTML=str;str=element.textContent;element.textContent='';}
return str;}
return decodeHTMLEntities;})();function Grid(){}
Grid.addHeader=function(header){if(header==null)_html.push("<br/>");else _html.push('<div class="grid2header"">',header,'</div>');}
Grid.add=function(label,onclick,style){if(label==null||label=="")return;style=List._parseStyle(style);var divStyle="";var borderColor=style["color"];if(borderColor)divStyle='border-left:8px solid '+borderColor;else divStyle="padding-left:7px;";onclick=_func("Engine.eval",onclick);NextPrevious.add(onclick);var count=(style!=null&&style.count!=null)?style.count:null;_html.push('<div class="grid2" style="',divStyle,'" onclick="',onclick,'">');if(style.img!=null)_html.push('<div class="icon">',_icon(style.img),'</div>');var tooltip=(label.length>20)?'title="'+label+'"':'';_html.push('<span ',tooltip,' class="text">');if(count!=null)_html.push('<span class=count>',count,'</span>');_html.push(label,'</span></div>');}
Grid.show=function(){Engine.onShow();}
function HistoryState(appid,func,offset){this.appid=appid;this.funcCall=func;this.offset=offset;this.nextprevious=null;}
HistoryState.prototype.isSame=function(state){var yes=(state!=null&&this.appid.toLowerCase()==state.appid.toLowerCase()&&this.funcCall.toLowerCase()==state.funcCall.toLowerCase());return yes;}
function History(){}
History.array=new Array();History._addState=function(state){var current=History.current();if(current!=null&&current.isSame(state)==true){return false;}
History.array.push(state);return true;}
History.add=function(funcCall){var newState=new HistoryState();newState.funcCall=funcCall;newState.appid=Engine.getFunctionAppId(funcCall);newState.offset=0;History._addState(newState);}
History.back=function(){History.remove();var current=History.current();if(current){if(current.backCall!=null)Engine.eval(current.backCall);Engine.eval(current.funcCall,current.offset,null,current.appid);}}
History.remove=function(count){if(count==null)count=1;for(var i=0;i<count;i++){History.array.pop();}}
History.replace=function(onclick,previousFuncCall){if(previousFuncCall!=null)History.add(previousFuncCall);Engine.eval(onclick);}
History.redirect=function(funcCall){Engine.eval(funcCall);}
History.clear=function(){History.array=new Array();}
History.current=function(){if(History.array.length>0){var current=History.array[History.array.length-1];return current;}else{return null;}}
History.previous=function(){if(History.array.length>1){var previous=History.array[History.array.length-2];return previous;}}
History.reload=function(funcCall){var current=History.current();if(current==null)return;if(funcCall!=null)current.funcCall=funcCall;else current.offset=History._getPageScroll();Engine.eval(current.funcCall,current.offset);}
History.count=function(){return History.array.length;}
History._getPageScroll=function(){var offset=GoogleMap._getOffset();if(offset!=null)return offset;offset=Calendar._getOffset();if(offset!=null)return offset;offset=Scheduler._getOffset();if(offset!=null)return offset;else return List._getOffset();}
History.isCurrent=function(func){var curState=History.array[History.array.length-1];return(curState.funcCall.indeOf(func)==0);}
History.getCurrentId=function(func){var cur=History.current();if(cur==null)return null;func+="(";if(cur.funcCall.startsWith(func)==false)return null;var index1=func.length+1;var index2=cur.funcCall.indexOf("'",index1);if(index2>-1)return cur.funcCall.substring(index1,index2);else return null;}
History.setbackCall=function(funcCall){var cur=History.current();if(cur==null)return null;cur.backCall=funcCall;}
function List(){}
List.forceNewLine=false;List.style=null;List.addItemTitle=function(title,subtitle,onclick,style){List.addTitle(title,subtitle,onclick,style);}
List.addItem=function(label,onclick,style){style=List._parseStyle(style);if(List.style=="leftpane")LeftPane.addItem(label,onclick,style);else List.add([label],onclick,style);}
List.addItemLabel=function(label,value,onclick,style){if(value==null||value=="")return;style=List._parseStyle(style);if(Debug.target=="phone"||Debug.target=="tablet"){List.ensureClose();var title=label;var subtitle=value;View.writeItemSubtitle(title,subtitle,onclick,style);}else{List._ensureTable();Table.writeRowLabel(_html,label,value,onclick,style);}}
List.addHeader=function(array,widths,icon,onclick){if(array==null)array="";if(List.style=="leftpane")LeftPane.addHeader(array);else{List.ensureClose();if((Debug.target=="phone"||Debug.target=="tablet")&&array.push!=null){array=String(array[0]);}
if(array.push!=null){List._ensureTable(array,widths,icon,onclick);}else{View.writeHeader(array);}}}
List.add=function(labels,onclick,style){style=List._parseStyle(style);if(Debug.target=="phone"||Debug.target=="tablet"){var title=labels[0];var subtitle=labels.length>1?labels[1]:"";List.ensureClose();View.writeItemSubtitle(title,subtitle,onclick,style);}else{List._ensureTable();Table.writeRow(_html,labels,onclick,style);}}
List._ensureTable=function(columns,widths,icon,onclick){if(List._container!=null&&List._container.name!="table"){List._container.writeStop();List._container=null;}
if(List._container==null){List._container=new Table();List._container.writeStart(columns,widths,icon,onclick);}}
List.addTitle=function(title,subtitle,onclick,style){List.ensureClose();View.writeTitle(title,subtitle,style);}
List.addItemSubtitle=function(title,subtitle,onclick,style){subtitle=subtitle.replace(/\n/g,"<br/>");style=List._parseStyle(style);if(Debug.target=="tablet"||Debug.target=="phone"){List.ensureClose();View.writeItemSubtitle(title,subtitle,onclick,style);}else{List.addItemLabel(title,subtitle,onclick,style);}}
List.addItemBox=function(label,value,onclick,style){style=List._parseStyle(style);View.writeLabelBox(label,value,onclick,style);}
List.addBubble=function(label,value,onclick,style){List.addItemSubtitle(label,value,onclick,style);}
List.addImage=function(url,onclick,style){if(url==null||url=="")return;var forceNewLine=true;View.ensure("view",forceNewLine);View.writeImage(url,onclick,style);}
List.addTextBox=function(id,label,value,onchange,style,custom){var forceNewLine=(List.forceNewLine||style=="textarea"||style=="textarea2"||style=="link"||style=="longtext"||style=="code");Form.ensure((style!="textarea")?label:null,forceNewLine);if(style=="date")DateBox.writeDate(id,value,onchange);else if(style=="datetime")DateBox.writeDateTime(id,value,onchange);else if(style=="time")DateBox.writeTime(id,value,onchange);else if(style=="link")TextBox.writeUrl(id,value,onchange);else if(style=="longtext")TextBox.writeLong(id,value,onchange);else if(style=="numeric")TextBox.writeNumeric(id,value,onchange);else if(style=="decimal")TextBox.writeDecimal(id,value,onchange);else if(style=="price")TextBox.writePrice(id,value,onchange);else if(style=="code")TextBox.writeCode(id,value,onchange);else if(style=="textarea2")TextBox.writeTextArea(id,value,onchange);else if(style=="textarea")HtmlBox.write(id,label,value,onchange,custom);else if(style=="frequency")FrequencyBox.write(id,value,onchange);else if(style=="duration")DurationBox.write(id,value,onchange);else if(style=="password")TextBox.writePassword(id,value,onchange);else if(style=="color")ColorBox.writeColor(id,value,onchange,style.colors);else if(style=="currency")ComboBox.write(id,getCurrencyCombo(AccountSettings.get("currency")),value,null,onchange);else TextBox.writeText(id,value,onchange);if((style!="textarea"))Form.ensureClose();}
List.addSignatureBox=function(id,label,value,onchange){if(id==""&&value)List.addItemLabel(label,Format.image64(value),"","img:edit");}
List.addBarcodeBox=function(id,label,value,onchange,style){List.addTextBox(id,label,value,onchange,style);}
List.addCheckBox=function(id,label,checked,onchange){var forceNewLine=true;Form.ensure(" ",forceNewLine);CheckBox.write(id,label,checked,onchange);Form.ensureClose();}
List.addComboBox=function(id,label,value,onchange,options,onnew){Form.ensure(label,List.forceNewLine);ComboBox.write(id,options,value,onnew,onchange);Form.ensureClose();}
List.addComboBoxMulti=function(id,label,value,onchange,options,onnew){Form.ensure(label,List.forceNewLine);ComboBox.writeMulti(id,options,value,onnew,onchange);Form.ensureClose();}
List.addGeoBox=function(id,label,value,onchange){List.addTextBox(id,label,value,onchange);}
List.addToggleBox=function(id,label,value,onchange,options){if(!onchange||!options){List.addItemLabel(label,Format.toggle(value,options));return;}
var forceNewLine=true;Form.ensure(label,List.forceNewLine);ToggleBox.write(id,label,value,onchange,options);Form.ensureClose();}
List.addFileBox=function(id,label,value,onchange,style){Form.ensure(label);FileBox.write(id,value,onchange,style);Form.ensureClose();}
List.addHelp=function(help){BaseBox.writeHelp(help);}
List.addHelpPane=function(help){var indented="<span style='margin-left:-120px'>"+help+"</span>";BaseBox.writeHelp(indented);}
List.addButton=function(label,onclick,style){var forceNewLine=true;View.ensure("view",forceNewLine);Button.write(label,onclick);}
List.bindItems=function(table,column,where,onclick,style){if(onclick==null)onclick="";var items=Query.select(table,column,where,column);for(var i=0;i<items.length;i++){var item=items[i];var onclick2=onclick.replace("this.id",esc(item.id));List.addItem(item[column],onclick2,style);}}
List.bindItemSubtitles=function(table,columns,where,orderby,onclick){var items=Query.select(table,columns,where,orderby);cols=columns.split(";");var field1=cols[0];var field2=cols.length>0?cols[1]:null;for(var i=0;i<items.length;i++){var item=items[i];var onclick2=onclick.replace("this.id",esc(item.id));var subtitle=null;if(field2!=null){subtitle=item[field2];if(field2.indexOf("date")!=-1)subtitle=Format.date(subtitle);}
List.addItemSubtitle(item[field1],subtitle,onclick2);}}
List.setEmpty=function(label){}
List.getValue=function(id){var obj=_get(id);if(obj==null)return"";if(obj.type=="checkbox")return obj.checked?"1":"0";else return(obj.value!=null)?obj.value:"";}
List.setValue=function(id,value,options){var obj=_get(id);if(obj!=null){if(options!=null)ComboBox.setOptions(id,options,value);else if(obj.value!=value){obj.value=value;if(obj.onchange!=null)obj.onchange();}}}
List.focus=function(id){var obj=_get(id);if(obj!=null)obj.focus();}
List.setStyle=function(style){List.style=style;if(style=="keephistory"){List.style="leftpane";LeftPane.keepHistory=true;}else{List.ensureClose();}}
List.show=function(style){if(List.style=="leftpane"){LeftPane.show();}else if(style=="pane"){List._showPane();}else{List.ensureClose();Engine.onShow();HtmlBox.onShow();if(History.current()!=null)List._setOffset(History.current().offset);}
List.style=null;List.forceNewLine=false;}
List._renderList=function(){List.ensureClose();}
List._showPane=function(){List.ensureClose();List._setOffset(0);_showPopup(Toolbar.title,Toolbar.left.join(''));HtmlBox.onShow();Toolbar.left=[];Toolbar.title="";Toolbar.style=null;}
List.ensureClose=function(){if(List._container!=null){_html.push('<div class="line"></div>');List._container.writeStop();List._container=null;}}
List._getOffset=function(){return _get("one").scrollTop;}
List._setOffset=function(offset){_get("one").scrollTop=offset;}
List._parseStyle=function(style){if(style==null)return null;else if(typeof(style)==="object")return style;else if(style.split==undefined){Debug.log("style parameter must be a string: "+style);return;}
var obj={};var parts=style.split(";");for(var i=0;i<parts.length;i++){var part=parts[i];var subparts=part.split(":");if(subparts.length==1)subparts=part.split("=");if(subparts.length==2){var key=subparts[0].trim();var value=subparts[1].trim();obj[key]=value;}}
return obj;}
List.addThumbnail=function(label,fileid,onclick){NextPrevious.add(onclick);onclick=_func("Engine.eval",onclick);_html.push('<div class="fileitem" onclick="',onclick,'">');if(fileid!=null){Thumbnail.writeThumbnail(fileid);}else{_html.push('<div class="fileicon"><div class="note"></div></div>');}
_html.push('<div class="filetitle">',label,'</div>');_html.push('</div>');}
List.addPlaceholder=function(id){_html.push('<div id="',id,'"></div');}
List.inject=function(id){_set(id,_html.join(""));_html=[''];}
function LocalSettings(){}
LocalSettings.set=function(name,value){var key="_s_"+name;if(value!=null){try{window.localStorage.setItem(key,value);}catch(e){}}else{window.localStorage.removeItem(key);}}
LocalSettings.get=function(name,defaultValue){var value=window.localStorage.getItem("_s_"+name);if(value==null&&defaultValue!=null){value=defaultValue;LocalSettings.set(name,value);}
return value;}
LocalSettings.getInt=function(name,defaultValue){return parseInt(LocalSettings.get(name,defaultValue));}
if(typeof(Map)==="undefined"){function Map(){}}
Map.items=[];Map.title=null;Map.floorplanid=null;Map.setTitle=function(title){Map.title=title;}
Map.setFloorPlan=function(fileid){Map.floorplanid=fileid;}
Map.addItem=function(title,geo,onclick,style,html){style=List._parseStyle(style);if(html!=null){if(style==null)style={};style.html=html;}
Map.items.push({title:title,geo:geo,onclick:onclick,style:style});}
Map.bindItems=function(table,columns,where,func){if(where==null)where="";if(where.length>0)where+=" AND ";where+="geo != ''";var cols=columns.split(";");var nameField=cols[0];var geoField=cols[1];var items=Query.select(table,columns,where);for(var i=0;i<items.length;i++){var item=items[i];var name=item[nameField];var geo=item[geoField];var onclick=func.replace("this.id",esc(item.id));Map.addItem(name,geo,onclick);}}
Map.addUsers=function(){var users=Query.select("System.users","name","status=1");for(var i=0;i<users.length;i++){var user=users[i];var geo=AccountSettings.get("location."+user.name);if(geo!=null&&geo!=""){var date=parseInt(AccountSettings.get("location.date."+user.name));if(date!=null&&date!=""){var hours=(Date.now()-date)/Date.HOUR;if(hours>=12)geo="";}
if((Where.owner==null||Where.owner==user.name)&&geo!=""){var style="img:user_blue;label: "+user.name;Map.addItem(user.name,geo,null,style,Map._getUserInfoWindow(user));}}}}
Map.forceRecenter=function(){var current=History.current();if(current!=null)current.offset=null;}
Map.show=function(style){if(Map.floorplanid!=null){sPlanViewer.write(Map.floorplanid);Map.floorplanid=null;if(style!="inline"){List.show();}
return;}
if(style=="split"){List.ensureClose();_html.unshift("<div  id=split1>");_html.push("</div><div id=split2>");_html.push('<div id="map_canvas"></div>');_html.push("</div>");}else{_html.push('<div id="map_canvas"></div>');}
List.show();}
Map.afterShow=function(){if(_get("map_canvas")!=null){GoogleMap.show(Map.items,Map.title);Map.items=[];Map.title=null;}}
Map.center=function(geo){GoogleMap.center(geo);}
Map._parsePoint=function(geo){if(geo==null||geo.length==0)return null;try{var parts=geo.split(",");var lat=parseFloat(parts[0]);var lng=parseFloat(parts[1]);if(lat>=-90&&lat<=90&&lng>=-180&&lng<=180){return{lat:lat,lng:lng};}}catch(err){return null;}}
Map.distance=function(geo1,geo2){var pt1=Map._parsePoint(geo1);var pt2=Map._parsePoint(geo2);if(pt1==null||pt2==null)return-1;var R=6371*1000;var dLat=deg2rad(pt2.lat-pt1.lat);var dLon=deg2rad(pt2.lng-pt1.lng);var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(deg2rad(pt1.lat))*Math.cos(deg2rad(pt2.lat))*Math.sin(dLon/2)*Math.sin(dLon/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;}
function deg2rad(deg){return deg*(Math.PI/180);}
Map._getUserInfoWindow=function(user){QuickView.setTitle(user.name);var contact=User.getContact(user.name);if(contact!=null){if(contact.mobile!=''){QuickView.addLink("Send SMS",_writeJS("App.sms",contact.mobile));QuickView.addLink("Call Mobile",_writeJS("App.call",contact.mobile));}
QuickView.addLink(R.VIEWDETAILS,_writeJS("Contacts.viewContact",contact.id));}
return QuickView.writeStop();}
function Popup(){}
Popup.parent=null;Popup._clear=function(){Popup.buf=[];Popup.isLastItemSeparator=false;Popup.count=0;Popup.circles=[];}
Popup._clear();Popup.add=function(label,onclick,style){var style=List._parseStyle(style);onclick="Popup._hide();Engine.eval("+esc(onclick)+",0,Engine._source)";Popup.buf.push('<div class=item onclick="',onclick,'">');if(style!=null&&style.circleid!=null){Popup.buf.push('<canvas id="',style.circleid,'" width="20" height="20" style="vertical-align:middle"></canvas>');if(style.circlecolor!="")Popup.circles.push({id:style.circleid,color:style.circlecolor});}
if(style!=null&&style.img!=null)Popup.buf.push(_icon(style.img));if(style!=null&&style.count!=null)label+=" ("+style.count+")";Popup.buf.push('<span class=label>',label,'</span></div>');Popup.isLastItemSeparator=false;Popup.count++;}
Popup.addHeader=function(label){if(Popup.isLastItemSeparator==true)return;Popup.isLastItemSeparator=true;if(Popup.buf.length>0)Popup.buf.push('<div class=line></div>');if(label!=null)Popup.buf.push('<div class=septitle>',label,'</div>');}
Popup.show=function(){if(Popup.parent!=null&&Popup.parent==Engine._source){Popup._clear();return;}
Popup._hide();Popup.parent=Engine._source;var popup=_get('popup2');if(popup!=null){popup.parentNode.removeChild(popup);popup=null;}
popup=document.createElement('div');popup.id='popup2';_get('toolbar').appendChild(popup);if(Popup.count>=12){popup.style.maxHeight="400px";popup.style.overflow="scroll";popup.style.overflowX="hidden";}
_set('popup2',Popup.buf.join(''));Popup.buf=[];_showBelowObj(popup,Popup.parent);for(var i=0;i<Popup.circles.length;i++){var circle=Popup.circles[i];var canvas=document.getElementById(circle.id);if(canvas!=null){var context=canvas.getContext("2d");var centerX=canvas.width/2;var centerY=canvas.height/2;var radius=canvas.width/2;context.arc(centerX,centerY,radius,0,2*Math.PI,false);context.fillStyle=circle.color;context.fill();}}
Popup._clear();window.setTimeout(function(){document.body.onclick=Popup._hide;},10);}
Popup._hide=function(){if(_get('popup2')){_hide('popup2');_set('popup2','');}
document.body.onclick=null;Popup.parent=null;}
function Query(){}
Query.selectId=function(table,id){Debug.log("Query.selectId",arguments);Query.verify(table);if(id==null)throw new Error("Query.selectId(table, id): id parameter is null for table: "+table,"query.js");return Database.selectId(table,id);}
Query.names=function(table,id){Debug.log("Query.names",arguments);Query.verify(table);if(id==null||id=="")return"";recordid=String(id);var ids=id.split('|');var buf=new Array();for(var i=0;i<ids.length;i++){var item=Database.selectId(table,ids[i]);if(item!=null&&item.name!=null&&item.name!="")buf.push(item.name);}
return buf.join(', ');}
Query.select=function(table,columns,where,orderby){Debug.log("Query.select",arguments);Query.verify(table);return Database.select(table,columns,where,orderby);}
Query.selectDistinct=function(table,field,where){Debug.log("Query.selectDistinct",arguments);Query.verify(table);return Database.selectDistinct(table,field,where);}
Query.ids=function(table,where){Debug.log("Query.ids",arguments);Query.verify(table);return Database.ids(table,where);}
Query.search=function(table,search,columns,where,orderby){Debug.log("Query.search",arguments);Query.verify(table);return Database.search(table,search,columns,where,orderby);}
Query.options=function(table,where,orderby){Debug.log("Query.options",arguments);Query.verify(table);var items=Database.select(table,"id;name",where,(orderby==null)?"name":orderby);if(table.toLowerCase()=="system.users"){var buf=[];buf.push(':'+R.NONE);for(var i=0;i<items.length;i++){var item=items[i];buf.push(item.name+':'+item.name);}
return buf.join('|');}else{return getOptions(items);}}
Query.searchLinked=function(table,search,column,linkedtable){search=_normalize(search);var items=[];var all=Database.select(table,"id",null,"name");for(var i=0;i<all.length;i++){var item=all[i];var linkedItem=Query.selectId(linkedtable,item[column]);if(linkedItem!=null&&Data.matchesString(search,linkedItem.name)){items.push(item);}}
return items;}
Query.options2=function(table,where,field2){var items=Database.select(table,"id;name",where);var buf=[];buf.push(':'+R.NONE);for(var i=0;i<items.length;i++){var item=items[i];var subtitle=item[field2];if(subtitle!=''&&subtitle!=null)subtitle=" ("+subtitle+")";buf.push(item.id+':'+item.name+subtitle);}
return buf.join('|');}
Query.count=function(table,where){Debug.log("Query.count",arguments);Query.verify(table);return Database.count(table,where);}
Query.rss=function(url){if(url.indexOf("upvise.com/")>-1){url=WebRequest.appendUrl(url,'auth',User.token);}
var xmlHttp=null;xmlHttp=new XMLHttpRequest();xmlHttp.open("GET",url,false);xmlHttp.send(null);var xml=xmlHttp.responseXML;var obj=Rss.toJson(xml);return obj;}
function Counter2(table,field,where){this.map=[];var items=Database.select(table,field,where);this.total=items.length;for(var i=0;i<items.length;i++){var value=items[i][field];if(value!=null){var values=String(value).split('|');for(var j=0;j<values.length;j++){var count=this.map[values[j]];this.map[values[j]]=(count==null)?1:count+1;}}}
this.count=function(value){if(value==null)return this.total;var nb=this.map[value];return(nb!=null)?nb:0;}}
Query.groupby=function(table,field,where){Debug.log("Query.groupby",arguments);Query.verify(table);if(field==null||field=="")throw new Error("Query.groupby(table, field, where): field parameter is null or empty","query.js");return new Counter2(table,field,where);}
Query.insert=function(table,values){Debug.log("Query.insert",arguments);Query.verify(table);if(values==null)throw new Error("Query.insert(table, values) values parameter is null","query.js");return Database.insert(table,values);}
Query.deleteWhere=function(table,values){Debug.log("Query.deleteWhere",arguments);Query.verify(table);if(values==null)throw new Error("Query.deleteWhere(table, values) values parameter is null","query.js");Database.deleteWhere(table,values);}
Query.updateId=function(table,id,field,value){Debug.log("Query.updateId",arguments);Query.verify(table);if(id==null)throw new Error("Query.updateId(table, id, field, value) id parameter is null","query.js");if(field==null||field=="")throw new Error("Query.updateId(table, id, field, value) field parameter is null or empty","query.js");if(value==null)throw new Error("Query.updateId(table, id, field, value) value parameter is null","query.js");Database.updateId(table,id,field,value);}
Query.update=function(table,values,where){Debug.log("Query.update",arguments);Query.verify(table);if(values==null)throw new Error("Query.update(Object, values, where) values parameter is null","query.js");Database.update(table,values,where);}
Query.deleteId=function(table,id){Debug.log("Query.deleteId",arguments);Query.verify(table);if(id==null)throw new Error("Query.deleteId() : id parameter is null");Database.deleteId(table,id);}
Query.deleteIds=function(table,ids){Debug.log("Query.deleteIds",arguments);Query.verify(table);if(ids==null)throw new Error("Query.deleteIds() : ids parameter is null");Database.deleteIds(table,ids);}
Query.max=function(table,column,where){Debug.log("Query.max",arguments);Query.verify(table);if(column==null)throw new Error("Query.max(table, column, where) : column parameter is null");return Database.max(table,column,where);}
Query.selectIds=function(table,ids){Debug.log("Query.selectIds",arguments);Query.verify(table);if(ids==null)throw new Error("Query.selectIds(table, ids) ids parameter is null","query.js");if(ids.replace)ids=ids.split("|");var list=[];for(var i=0;i<ids.length;i++){var item=Database.selectId(table,ids[i])
if(item!=null)list.push(item);}
return list;}
Query.verify=function(table,values){if(Accounts.DEBUG==false)return;var table2=table.toLowerCase();if(table2=="system.notifications")return;var aTable=Database._getTable(table);if(aTable==null){Debug.showError("Query Error: Table "+table+" does not exist","Query.js",-1);}}
Query.updateMultiple=function(table,id1,mutivaluefield,id2){Debug.log("Query.updateMultiple",arguments);Query.verify(table);if(id1==null||id2==null)throw new Error("Query.updateMultiple() : id parameters null");var tobeupdated=Query.select(table,"*",mutivaluefield+" CONTAINS "+esc(id2));for(var i=0;i<tobeupdated.length;i++){var rec=tobeupdated[i];rec[mutivaluefield]=MultiValue.remove(rec[mutivaluefield],id2);rec[mutivaluefield]=MultiValue.add(rec[mutivaluefield],id1);Query.updateId(table,rec.id,mutivaluefield,rec[mutivaluefield]);}}
Query.archiveId=function(table,id){Debug.log("Query.archiveId",arguments);Query.verify(table);if(id==null)throw new Error("Query.archiveId() : id parameter is null");Database.archiveId(table,id);}
Query.restoreId=function(table,id){if(id==null)throw new Error("Query.archiveId() : id parameter is null");Debug.log("Query.restoreId",arguments);Cache._addOutboxQuery('RESTORE',table,new ParameterList('id',id));}
Query.selectArchived=function(table,columns,where){return Query._selectTable(table,columns,where,"2");}
Query.selectDeleted=function(table,columns,where){return Query._selectTable(table,columns,where,"1");}
Query.selectArchivedOrDeleted=function(table,columns,where){var items=Query.selectArchived(table,columns,where);if(items.length==0)items=Query.selectDeleted(table,columns,where);return items;}
Query._selectTable=function(table,columns,where,flag){if(table==null||table==""){Debug.log("Query._selectTable Error: table parameter is null or empty ");return[];}
var http=new XMLHttpRequest();var url=User.BASE_URL+"table";if(where==null)where="";var data=new FormData();data.append("auth",User.token);data.append("table",Cache._makeLegacyTable(table));data.append("where",where);data.append("flag",flag);http.open("POST",url,false);http.send(data);if(http.status===200){try{var channel=JSON.parse(http.responseText);if(channel.items!=null){return channel.items;}else{Debug.log("Query._selectTable Error: "+channel.error);return[];}}catch(e){Debug.log("Query._selectTable Error: "+e.message);return[];}}else{Debug.log("Query._selectTable Error: HTTP Status "+http.status);return[];}}
Query.selectFormat=function(table,columns,where,sortby){var cols=[];var parts=columns.split(";");for(var i=0;i<parts.length;i++){var col=new Column(parts[i]);cols.push(col);}
var list=[];var items=Query.select(table,columns,where,sortby);for(var i=0;i<items.length;i++){var item=items[i];var item2={};for(var j=0;j<cols.length;j++){var col=cols[j];item2[col.as]=col.formatValue(item[col.name]);}
list.push(item2);}
return list;}
function WEB(){return Settings.getPlatform()=="web";}
function Settings(){}
Settings._isTouch=null;Settings._WEB=true;Settings.isTouch=function(){if(Settings._isTouch==null){var ua=navigator.userAgent.toLowerCase();var android=ua.indexOf("android")>-1;var ipad=ua.indexOf("ipad")>-1;var iphone=ua.indexOf("iphone")>-1;Settings._isTouch=(android||ipad||iphone);}
return Settings._isTouch;}
Settings.get=function(name){if(name=="privilege")return User.privilege;else if(name=="name")return User.displayName;else if(name=="company")return User.companyName;else if(name=="email")return User.email;else if(name=="location")return"";else if(name=="companyId")return User.companyId;else return window.localStorage.getItem(name);}
Settings.set=function(name,value){try{window.localStorage.setItem(name,value);}catch(err){}}
Settings.getCountry=function(){return User.countryCode.toLowerCase();}
Settings.getLanguage=function(){return User.language;}
Settings.getPlatform=function(){if(Accounts.device=="phone")return"android";if(Accounts.DEBUG==false)return"web";else if(Debug.target==null)return"web";else return Debug.target;}
Settings.isTablet=function(){if(Accounts.device=="phone")return false;else if(Accounts.DEBUG==false)return true;else if(Debug.target=="phone")return false;else return true;}
Settings.getApiLevel=function(){return 99999;}
Settings.getLocation=function(){return Geocode.getPosition();}
Settings.getAddress=function(geo){return'';}
Settings.getFileUrl=function(id){var url=User.BASE_URL+"downloadfile/";url=WebRequest.appendUrl(url,'id',id);url=WebRequest.appendUrl(url,'t',User.shareToken);return url;}
Settings.getDistanceTo=function(geo1,geo2){var parts=geo1.split(",");var lat1=parts[0];var lat2=parts[1];}
function Toolbar(){}
Toolbar.tabs=[];Toolbar.left=[];Toolbar.moreItems=[];Toolbar.isEdit=false;Toolbar.backLink=true;Toolbar.moreButton=true;Toolbar.clear=function(){Toolbar.moreItems=[];}
Toolbar.reset=function(){Toolbar.left=[];Toolbar.moreItems=[];Toolbar.tabs=[];Toolbar.title=null;Toolbar.style=null;Toolbar.isEdit=false;Toolbar.backLink=true;Toolbar.moreButton=true;if(Toolbar.searchFilter==true){Toolbar.searchFilter=false;Filter.value=null;SearchBox.reset();}}
Toolbar.setStyle=function(style){if(style=="edit"){Toolbar.backLink=false;Toolbar.moreButton=false;Toolbar.isEdit=true;}else if(style=="search"){Toolbar.searchFilter=true;}}
Toolbar.setTitle=function(title,style){Toolbar.title=title;Toolbar.style=style;}
Toolbar.addButton=function(label,onclick,style,shortcut){if(shortcut==null&&label!=null){if(label.startsWith(R.EDIT))shortcut="e";}
onclick="Engine.onToolbar("+esc(onclick)+",this)";if(shortcut!=null)Shortcuts.add(shortcut,onclick);if(style=="more"){var item={label:label,onclick:onclick};Toolbar.moreItems.push(item);return;}
var className='button';var tooltip="";if(style=="delete"){onclick='Dialog.confirmDelete('+esc(onclick)+')';label=_icon("delete","white");}else if(style=="save"){className+=" save";}else if(style=="purchase"){className+=" purchase";}else if(style=="popup"){label+='<span class="gbma" />';}else if(style=="pressed"){className+=" pressed";}else if(style!=null){tooltip=label;label=_icon(style,"white");}
Toolbar.left.push('<div title="',tooltip,'" class="',className,'" tabindex=0 onclick="',onclick,'"><span>',label,'</span></div>');}
Toolbar.addDeleteButton=function(func){Toolbar.addButton(R.DELETE,func,"delete");}
Toolbar.setColor=function(color){}
Toolbar.addTabButton=function(label,onclick,img){onclick="History.reload("+esc(onclick)+")";Toolbar.addButton(label,onclick,img);}
Toolbar.addCheckBox=function(oncheck){Toolbar.tabs.hasCheckBox=true;Toolbar.tabs.oncheck=oncheck;}
Toolbar.addTab=function(label,onclick,style){style=List._parseStyle(style);Toolbar.tabs.push({label:label,onclick:onclick,style:style});}
Toolbar.addIndexFilter=function(total){Toolbar.tabs.right="&nbsp;&nbsp;&nbsp;Page"+_writeIndexLinks(total);}
Toolbar.setNextPrevious=function(onprevious,onnext){if(onprevious==null&&onnext==null)return;onprevious="Engine.onToolbar("+esc(onprevious)+",this)";onnext="Engine.onToolbar("+esc(onnext)+",this)";Toolbar.left.push(_writeImageButton("previous",onprevious));Toolbar.left.push(_writeImageButton("next",onnext));}
Toolbar.getLeftContent=function(){if(Toolbar.moreButton)Toolbar.addButton(R.MORE,"Toolbar.showMorePopup()","dots");if(Accounts.device=="phone"){return Toolbar.getLeftContentMobile();}
var buf=[];if(History.count()>1){buf.push(_writeImageButton(Toolbar.backLink?"back":"foldertask","History.back()"));}
if(Debug.target=="phone"&&Toolbar.title!=null)buf.push('<span class="title">'+Toolbar.title+'</span>');buf.push(Toolbar.left.join(''));Toolbar.left=[];return buf.join('');}
Toolbar.getLeftContentMobile=function(){var buf=[];if(History.count()>1){buf.push(_writeImageButton(Toolbar.backLink?"back":"foldertask","History.back()"));}else{buf.push(_writeImageButton("applist","AppBar.showPopup(this,event)"));}
buf.push(Toolbar.left.join(''));Toolbar.left=[];return buf.join('');}
Toolbar.getRightContent=function(){var buf=[];var expiryMsg=Toolbar.getExpiryMessage();if(expiryMsg!=null)buf.push(expiryMsg);var label=NextPrevious.getContent();if(label!=""){buf.push("",label,"");buf.push('<span class=buttongroup>');buf.push(_writeImageButton("previous","NextPrevious.previous()"));buf.push(_writeImageButton("next","NextPrevious.next()"));buf.push('</span>');}else{if(User.isManager()||(Config.appid=="contacts"&&AccountSettings.get('sharedcontacts')=='1')){var label=Where.formatOwner();if(AccountSettings.getBool("account.showcompanyname")==true)label+=" ("+User.companyName+")";buf.push(_writePopupButton('_userfilter',label,"Toolbar.showUserFilter(this)"));}}
if(User.isManager())buf.push(_writeImageButton("settings","Toolbar.showSettings(this)"));buf.push(_writeImageButton("account","AppBar.showUser(this)",null,User.email));return buf.join('');}
Toolbar.getExpiryMessage=function(){if(User.expiryDate>0){var daysLeft=parseInt((User.expiryDate-Date.now())/Date.DAY);if(daysLeft<0)daysLeft=0;if(daysLeft<60){var msg=R.PURCHASENOW+" ("+daysLeft+" "+R.DAYSLEFT+")";var func=_func("AppLoader.openApp","settingsapp","SettingsApp.showLicenseList()");return'<a id=purchasenotif onclick=\"'+func+'">'+msg+'</a> ';}}
return null;}
Toolbar.getTabContent=function(){var buf=[];var isBrowser=(Debug.target!="phone"&&Debug.target!="tablet");if(Toolbar.tabs.hasCheckBox&&isBrowser){var onchange="Grid.toogleCheckAll(this.checked)";if(Toolbar.tabs.oncheck!=null)onchange+=";"+Toolbar.tabs.oncheck;buf.push('<input type=checkbox onchange="',onchange,'" />');}
buf.push('<div class="right">',Toolbar.tabs.right,'</div>');if(isBrowser&&Toolbar.tabs.length==0&&Toolbar.title){buf.push('<div class="tab">',Toolbar.title,"</div>");}
for(var i=0;i<Toolbar.tabs.length;i++){var tab=Toolbar.tabs[i];var className="tab";var style="";if((History.current()!=null&&tab.onclick==History.current().funcCall)){if(Toolbar.legacy===true)className+=" sel";else{className+=" sel2";var color=AppBar.getColor();if(color)style="background-color:"+color;}}
var label=Format.capitalize(tab.label);if(tab.style!=null&&tab.style.count>0)label+=" ("+tab.style.count+")";var onclick=_writeJS("Engine.onTab",tab.onclick);buf.push('<div class="',className,'" style="',style,'" onclick="',onclick,'">',label,'</div>');}
return buf.join('');}
Toolbar.showSettings=function(source){var popup=new PopupList(source);popup.align='right';if(User.isAdmin()){popup.writeImageItem("group",R.MANAGEUSERS,"AppLoader.openApp('settingsapp','SettingsApp.showUserList()')");if(User.partnercode==null)popup.writeImageItem("dollar",R.PURCHASELICENSE,"AppLoader.openApp('settingsapp','SettingsApp.showLicenseList()')");if(User["super"]=="1")popup.writeImageItem("app","Admin Interface","Toolbar.goAdmin()");popup.writeSeparator();}
if(User.isManager()){if(AccountSettings.getBool("activitylog",true))popup.writeImageItem("chart",R.ACTIVITYLOG,"AppLoader.openApp('logs')");if(AccountSettings.getBool("cloudide",true))popup.writeImageItem("upload","Cloud IDE","AppLoader.openApp('ide')");}
popup.writeStop();}
Toolbar.goAdmin=function(){document.cookie="ADMIN="+User.token+";";window.open("314159/default.aspx","new");}
Toolbar.showUserFilter=function(source){var myself=User.getName();var popup=new PopupList(source);popup.align='right';popup.writeImageItem("group",R.EVERYONE,"Toolbar.onFilterOwner()");popup.writeImageItem("contact",myself+" "+R.MEUSER,"Toolbar.onFilterOwner("+esc(myself)+")");popup.writeImageItem("support",R.UNASSIGNED,"Toolbar.onFilterOwner('')");popup.writeSeparator();var users=Query.select("System.users","name","status=1","name");for(var i=0;i<users.length;i++){var name=users[i].name;if(name!=myself)popup.writeImageItem("contact",name,"Toolbar.onFilterOwner("+esc(name)+")");}
if(User.isAdmin()){var deactivated=Query.select("System.users","name","status=0","name");if(deactivated.length>0)popup.writeSeparator(R.DEACTIVATED);for(var i=0;i<deactivated.length;i++){var name=deactivated[i].name;popup.writeImageItem("warning",name,"Toolbar.onFilterOwner("+esc(name)+")");}}
popup.writeStop();}
Toolbar.onFilterOwner=function(value){Where.setOwner(value);History.reload();Engine.evalLeftPane();}
Toolbar.showMorePopup=function(){var count=Engine.toolbarMoreItems.length;for(var i=0;i<count;i++){var item=Engine.toolbarMoreItems[i];Popup.add(item.label,item.onclick);}
if(count>0)Popup.addHeader();Popup.add(R.PRINT,'_print()');Popup.add(R.REFRESH,'Engine.refresh()');Popup.show();}
Toolbar.confirmDelete=function(){return confirm(R.DELETECONFIRM);}
function _writePopupButton(id,label,onclick){return'<div tabindex=0 class=button id="'+id+'" onclick="'+onclick+'">'+label+'<span class="gbma"></span></div>';}
function _writeImageButton(img,onclick,label,tooltip){if(tooltip==null)tooltip="";if(label)label='<span style="display:inline-block;font-weight:normal;">'+label+'</span>';else label="";return'<div tabindex=0 class=button title="'+tooltip+'" onclick="'+onclick+'">'+_icon(img,"white")+label+'</div>';}
function Toolbox(){}
Toolbox.buttons=[];Toolbox.addButton=function(label,onclick,tooltip,style){Toolbox.buttons.push({label:label,onclick:onclick,tooltip:tooltip,style:style});}
Toolbox.show=function(){List.ensureClose();_html.push('<div class="toolbox">');for(var i=0;i<Toolbox.buttons.length;i++){var button=Toolbox.buttons[i];var onclick="Engine.eval("+esc(button.onclick)+",0,this)";if(button.style=="popup")button.label+='<span class="gbma" />';_html.push('<div class="toolboxbutton" onclick="',onclick,'" title="',button.tooltip,'">',button.label,'</div>');}
_html.push('</div>');Toolbox.buttons=[];}
function User(){}
User.email=null;User.companyName=null;User.displayName=null;User.privilege=0;User.license=null;User.emailDropbox=null;User.token=null;User.shareToken=null;User.language="EN";User.accountType=null
User.countryCode=null;User.creationDate=null;User.expiryDate=null;User.BASE_URL="";User.TEAM=3;User.PROFESSIONAL=4;User.getName=function(){return User.displayName;}
User.getList=function(standardOnly){var list=new Array();var where="status=1";if(standardOnly)where+=" AND type=0";var users=Query.select("System.users","name",where,"name");for(var i=0;i<users.length;i++){list.push(users[i].name);}
return list;}
User.getInfoList=function(){var users=Query.select("System.users","name;email","status=1","name");for(var i=0;i<users.length;i++){var u=users[i];u.geo=AccountSettings.get("location."+u.name);}
return users;}
User.getLicenseType=function(){if(User.accountType==User.TEAM)return"Team";else if(User.accountType==2)return"Pro One";else return"Professional";}
function WebView(){}
WebView.showImage=function(url,label,subtitle){if(url!=null&&url.startsWith("http")==false){var fileid=url;sPhotoViewer.write(fileid);}else{_html.push('<div class=imageview>');if(url==null)label+="<br/>"+"No Preview Available";if(label!=null)_html.push('<div class=imagetitle>',label,'</div>');if(subtitle!=null)_html.push('<div class=imagesubtitle>',subtitle,'</div>');_html.push('<img src="',url,'"/>');_html.push('</div>');}
List.show();}
WebView.showUrl=function(onclick,label,subtitle){_html.push('<div class=imageview>');if(label!=null)_html.push('<div class=imagetitle>',label,'</div>');if(subtitle!=null)_html.push('<div class=imagesubtitle>',subtitle,'</div>');_html.push(_writeBoldButton(R.DOWNLOAD,onclick));_html.push('</div>');List.show();}
WebView.onButton=function(url){window.open(url,"_blank");}
WebView.showHtml=function(html,label){if(label!=null)_html.push('<div class="webviewheader">',label,"</div>");_html.push('<div class="webview">',html,"</div>");Engine.onShow();}
WebView.showIframe=function(url){_html.push('<iframe style="width:100%;height:100%;border:0" src="',url,'" />');List.show();}
function PublicForm(){}
PublicForm.templateid=null;PublicForm.token=null;PublicForm.fields=null;PublicForm.templateName=null;PublicForm.values=null;PublicForm.linkedtable=null;PublicForm.writeStart=function(){var buf=[];buf.push('<div id="header" style="text-align:center"><img id="_logo" src=""><div id="toolbar"></div></div>');buf.push('<div><div id="publicform">');buf.push('<div id="tabbar"></div>');buf.push('<div id="one"></div>');buf.push('</div></div>')
document.body.innerHTML=buf.join('');}
PublicForm.start=function(){var lang=navigator.language||navigator.userLanguage;lang=lang.toLowerCase().substring(0,2);Loader.loadUpviseResource(lang,function(){Cache.init();PublicForm.writeStart();Engine.eval("PublicForm.showNewForm()");});}
PublicForm.showNewForm=function(){PublicForm.token=AppLoader.getParameter("t");PublicForm.templateid=AppLoader.getParameter("i");PublicForm.getForm();PublicForm.values={};var url="";if(PublicForm.logo!=""){url="data:image/png;base64,"+PublicForm.logo;}else{url=User.BASE_URL+"js/"+Accounts.getDefaultLogo("white");}
_get("_logo").src=url;Toolbar.addButton(R.SUBMIT,"PublicForm.saveForm()");PublicForm.writeForm(PublicForm.templateName,PublicForm.fields);List.show();}
PublicForm.writeForm=function(title,fields){List.forceNewLine=true;List.addItemTitle(title);Toolbar.moreButton=false;if(PublicForm.getLinkName()!=""){var oninput="PublicForm.getAutoComplete(this.id,this.value)";Form.ensure(PublicForm.getLinkName(),List.forceNewLine);TextBox.writeTextAutoComplete("linkedname","",oninput);Form.ensureClose();}
var onchange="PublicForm.updateValue(this.id,this.value)";for(var i=0;i<fields.length;i++){var field=fields[i];if(field.status==-1||field.status==0||field.status==null){PublicForm.writeItem(field.name,field.type,field.label,field.value,onchange,field.seloptions);}}}
PublicForm.writeItem=function(id,type,label,value,onchange,options){if(type=='header'){List.addHeader(label);}else if(type=='select'){List.addComboBox(id,label,value,onchange,options);}else if(type=='selectmulti'){List.addComboBoxMulti(id,label,value,onchange,options);}else if(type=='toggle'){List.addToggleBox(id,label,value,onchange,options);}else if(type=='checkbox'){List.addCheckBox(id,label,parseInt(value),onchange);}else if(type=='label'){List.addItemLabel(label," ");}else if(type=='textarea'){if(Settings.getPlatform()=="web")type="textarea2";TextBox.DOUBLE_WIDTH="400px";List.addTextBox(id,label,value,onchange,type);}else if(type=="photo"||type=="contact"||type=="button"){}else{List.addTextBox(id,label,value,onchange,type);}}
PublicForm.getForm=function(){var url=User.BASE_URL+"share.aspx?a=newform&t="+encodeURIComponent(PublicForm.token)+"&i="+encodeURIComponent(PublicForm.templateid);var data=App.getData(url);var channel=JSON.parse(data);PublicForm.templateName=channel.title;PublicForm.counter=parseInt(channel.description);PublicForm.fields=channel.items;PublicForm.logo=channel.lastBuildDate;PublicForm.linkedtable=channel.link;PublicForm.fields=Data.numsort(PublicForm.fields,"rank");}
PublicForm.saveForm=function(){for(var i=0;i<PublicForm.fields.length;i++){var field=PublicForm.fields[i];var value=PublicForm.values[field.name];var isMandatory=(field.mandatory==1&&field.type!="signature"&&(field.status==0||field.status==-1));if((value==null||value=="")&&isMandatory){App.alert("Please fill in mandatory field: "+field.label);return;}}
var linkedname=(PublicForm.getLinkName()!="")?List.getValue("linkedname"):"";var name=PublicForm.counter++;var value=JSON.stringify(PublicForm.values);var values={id:Database._guid(),name:name,date:Date.now(),status:1,owner:"Public",templateid:PublicForm.templateid,value:value,linkedname:linkedname};var url=User.BASE_URL+"share.aspx?a=saveform&t="+encodeURIComponent(PublicForm.token);var channel=App.postData(url,values);History.reload("PublicForm.showFinish()");}
PublicForm.showFinish=function(){Toolbar.moreButton=false;List.addItemTitle(R.THANKYOUFORM);List.show();}
PublicForm.updateValue=function(name,value){PublicForm.values[name]=value;}
PublicForm.getAutoComplete=function(id,value){var appid="";var datalist=document.getElementById(id+"_datalist");while(datalist.hasChildNodes()){datalist.removeChild(datalist.firstChild);}
if(value.length<3)return;if(PublicForm.linkedtable=="Contacts.companies")appid="companies";else if(PublicForm.linkedtable=="Contacts.contacts")appid="contacts";var url=User.BASE_URL+"share.aspx?a="+appid+"&t="+encodeURIComponent(PublicForm.token)+"&i="+encodeURIComponent(value);var data=App.getData(url);var channel=JSON.parse(data);for(var i=0;i<channel.items.length;i++){var item=channel.items[i];var opt=document.createElement("option");opt.value=item.name;datalist.appendChild(opt);}
var f=_get("_frm");if(f==null)return;f.autocomplete="on";}
PublicForm.getLinkName=function(){if(PublicForm.linkedtable=="Contacts.companies")return R.COMPANY;else if(PublicForm.linkedtable=="Contacts.contacts")return R.CONTACT;else return"";}
function JobForm(){}
JobForm.start=function(){PublicForm.writeStart();Toolbar.reset();Thumbnail.reset();Engine.eval("JobForm.showNewForm()",null,null,"");}
JobForm.showNewForm=function(){PublicForm.token=AppLoader.getParameter("t");var useroptions=JobForm.getUserOptions();PublicForm.values={};PublicForm.fields=[];PublicForm.fields.push({type:"header",label:"1. Contact Info"});PublicForm.fields.push({type:"text",id:"companyname",label:"Company Name",mandatory:0,autocomplete:1});PublicForm.fields.push({type:"text",id:"contactname",label:"Contact Name",mandatory:1,autocomplete:1});PublicForm.fields.push({type:"text",id:"email",label:R.EMAIL,mandatory:1});PublicForm.fields.push({type:"text",id:"mobile",label:"Mobile Phone",mandatory:1});PublicForm.fields.push({type:"text",id:"contactstreet",label:"Street",mandatory:0});PublicForm.fields.push({type:"text",id:"contactcity",label:"City",mandatory:0});PublicForm.fields.push({type:"text",id:"contactstate",label:"State",mandatory:0});PublicForm.fields.push({type:"text",id:"contactzipcode",label:"Zipcode",mandatory:0});PublicForm.fields.push({type:"header",label:"2. Job Description"});PublicForm.fields.push({type:"text",id:"name",label:"Name",mandatory:0});PublicForm.fields.push({type:"textarea2",id:"description",label:"Description",mandatory:1});PublicForm.fields.push({type:"datetime",id:"date",label:"Date & Time",mandatory:1});PublicForm.fields.push({type:"select",id:"owner",label:"Assign to",mandatory:0,seloptions:useroptions});PublicForm.fields.push({type:"header",label:"3. Job Address"});PublicForm.fields.push({id:"street",label:"Street",mandatory:1});PublicForm.fields.push({id:"city",label:"City",mandatory:1});PublicForm.fields.push({id:"state",label:"State",mandatory:1});PublicForm.fields.push({id:"zipcode",label:"Zipcode",mandatory:1});Toolbar.addButton("Submit Job","JobForm.saveForm()","save");JobForm.writeForm("Job Request",PublicForm.fields);List.show();}
JobForm.writeForm=function(title,fields){List.forceNewLine=true;List.addItemTitle(title);Toolbar.moreButton=false;var onchange="PublicForm.updateValue(this.id,this.value)";var oninput="JobForm.getAutoComplete(this.id,this.value)";for(var i=0;i<fields.length;i++){var field=fields[i];if(field.autocomplete==1){Form.ensure(field.label,List.forceNewLine);TextBox.writeTextAutoComplete(field.id,field.value,oninput);Form.ensureClose();}else{PublicForm.writeItem(field.id,field.type,field.label,field.value,onchange,field.seloptions);}}}
JobForm.getUserOptions=function(){var url=User.BASE_URL+"share.aspx?a=users&t="+encodeURIComponent(PublicForm.token);var data=App.getData(url);var channel=JSON.parse(data);User.countryCode=channel.description;var buf=[];for(var i=0;i<channel.items.length;i++){var user=channel.items[i];if(user.status==1)buf.push(user.name);}
return buf.join('|');}
JobForm.getAutoComplete=function(id,value){var appid="";var datalist=document.getElementById(id+"_datalist");while(datalist.hasChildNodes()){datalist.removeChild(datalist.firstChild);}
PublicForm.updateValue(id,value);if(value.length<3)return;if(id=="companyname")appid="companies";if(id=="contactname")appid="contacts";var url=User.BASE_URL+"share.aspx?a="+appid+"&t="+encodeURIComponent(PublicForm.token)+"&i="+encodeURIComponent(value);var data=App.getData(url);var channel=JSON.parse(data);for(var i=0;i<channel.items.length;i++){var item=channel.items[i];var opt=document.createElement("option");opt.value=item.name;datalist.appendChild(opt);if(appid=="contacts"&&value==item.name){if(item.email!="")List.setValue("email",item.email);if(item.mobile!="")List.setValue("mobile",item.mobile);if(item.street!="")List.setValue("contactstreet",item.street);if(item.city!="")List.setValue("contactcity",item.city);if(item.state!="")List.setValue("contactstate",item.state);if(item.zipcode!="")List.setValue("contactzipcode",item.zipcode);}
if(appid=="companies"&&value==item.name&&item.contactoptions!=""){var contactDL=document.getElementById("contactname_datalist");while(contactDL.hasChildNodes()){contactDL.removeChild(contactDL.firstChild);}
var contacts=item.contactoptions.split('|');for(var i=0;i<contacts.length;i++){var contact=contacts[i];var opt=document.createElement("option");opt.value=contact;contactDL.appendChild(opt);}}}
var f=_get("_frm");if(f==null)return;f.autocomplete="on";}
JobForm.saveForm=function(){for(var i=0;i<PublicForm.fields.length;i++){var field=PublicForm.fields[i];var value=PublicForm.values[field.id];if(field.autocomplete==1){value=document.getElementById(field.id).value;}
var isMandatory=(field.mandatory==1);if((value==null||value=="")&&isMandatory){App.alert("Please fill in mandatory field: "+field.label);return;}}
var url=User.BASE_URL+"share.aspx?a=savejob&t="+encodeURIComponent(PublicForm.token);var channel=App.postData(url,PublicForm.values);History.reload("JobForm.showFinish()");}
JobForm.showFinish=function(){Toolbar.moreButton=false;List.addItemTitle("Thank you for submitting this job request");List.show();}
function LeadForm(){}
LeadForm.start=function(){PublicForm.writeStart();Engine.eval("LeadForm.showNewForm()");}
LeadForm.showNewForm=function(){PublicForm.token=AppLoader.getParameter("t");PublicForm.values={};PublicForm.fields=[];PublicForm.fields.push({id:"name",label:R.NAME,mandatory:1});PublicForm.fields.push({id:"email",label:R.EMAIL,mandatory:1});PublicForm.fields.push({id:"mobile",label:R.EMAIL,mandatory:1});PublicForm.fields.push({id:"note",label:R.NOTE,mandatory:1});Toolbar.addButton("Submit Form","LeadForm.saveForm()","save");var onchange="PublicForm.updateValue(this.id,this.value)";PublicForm.writeForm("Contact Us",PublicForm.fields);List.show();}
LeadForm.saveForm=function(){for(var i=0;i<PublicForm.fields.length;i++){var field=PublicForm.fields[i];var value=PublicForm.values[field.name];var isMandatory=(field.mandatory==1&&field.type!="signature"&&(field.status==0||field.status==-1));if((value==null||value=="")&&isMandatory){App.alert("Please fill in mandatory field: "+field.label);return;}}
PublicForm.values.islead=1;var url=User.BASE_URL+"share.aspx?a=savelead&t="+encodeURIComponent(PublicForm.token);var channel=App.postData(url,PublicForm.values);History.reload("LeadForm.showFinish()");}
LeadForm.showFinish=function(){Toolbar.moreButton=false;List.addItemTitle("Thank you for submitting this form");List.show();}
function RepairForm(){}
RepairForm.start=function(){PublicForm.writeStart();Engine.eval("RepairForm.showNewForm()");}
RepairForm.showNewForm=function(){PublicForm.token=AppLoader.getParameter("t");PublicForm.values={};PublicForm.fields=[];PublicForm.fields.push({id:"name",label:R.DESCRIPTION,mandatory:1});Toolbar.addButton("Submit Form","RepairForm.saveForm()","save");var onchange="PublicForm.updateValue(this.id,this.value)";PublicForm.writeForm("Job Repair Form",PublicForm.fields);List.show();}
RepairForm.saveForm=function(){for(var i=0;i<PublicForm.fields.length;i++){var field=PublicForm.fields[i];var value=PublicForm.values[field.name];if((value==null||value=="")&&field.mandatory==1){App.alert("Please fill in mandatory field: "+field.label);return;}}
var siteid=AppLoader.getParameter("i");PublicForm.values.siteid=siteid;var url=User.BASE_URL+"share.aspx?a=saverepair&t="+encodeURIComponent(PublicForm.token);var channel=App.postData(url,PublicForm.values);History.reload("RepairForm.showFinish()");}
RepairForm.showFinish=function(){Toolbar.moreButton=false;List.addItemTitle("Thank you for submitting this form");List.show();}
function WebRequest(){}
WebRequest._networkError=false;WebRequest.get=function(url,data,callback){url=WebRequest.appendUrl(url,'auth',User.token);WebRequest._execute('GET',url,data,callback);}
WebRequest.postXml=function(url,xmlData,callback){var data=[];data.push('<batch auth="',Utils.xmlEncode(User.token),'">',xmlData,'</batch>');WebRequest._execute('POST',url,data.join(""),callback);}
WebRequest._open=function(method,url,callback){if(window.XMLHttpRequest==null){alert(R.BROWSERNOTSUPP_ERR);return null;}
WebRequest._networkError=false;var http=new XMLHttpRequest();http.onreadystatechange=function(){if(http.readyState==4){if(http.status==200){WebRequest.onload(http.responseText,callback);}else{WebRequest.onerror(0);}
Toast.hideProgress();}else{if(http.status==502){window.alert("Gateway / Proxy Error: please contact support");}}};http.onprogress=function(event){var total=http.getResponseHeader("X-Content-Length");Toast.showProgress(R.SYNCING,event.loaded,total);};http.onerror=function(event){WebRequest._networkError=true;}
http.open(method,url,true);return http;}
WebRequest._execute=function(method,url,data,callback){Toast.showProgress(R.SYNCING);var xmlhttp=null;url=WebRequest.appendUrl(url,'alt','json');if(method=='GET'){if(data!=null&&data!='')url+='&'+data;var xmlhttp=WebRequest._open('GET',url,callback);xmlhttp.send(null);}else{var xmlhttp=WebRequest._open('POST',url,callback);xmlhttp.send(data);}}
WebRequest.appendUrl=function(url,name,value){if(value==null)return url;var sep=(url.indexOf('?')>=0)?'&':'?';return url+sep+name+'='+encodeURIComponent(value);}
WebRequest.onload=function(responseText,callback){if(responseText==""){alert(R.NODATA_ERR);return;}else if(responseText.substring(0,5)=="ERROR"){var errorCode=parseInt(responseText.substring(6));WebRequest.onerror(errorCode);return;}
if(callback){var channel=JSON.parse(responseText);callback(channel);}}
WebRequest.onerror=function(errorCode){switch(errorCode){case 600:case 601:Accounts.signOut();return;case 602:if(typeof(grecaptcha)!="undefined")grecaptcha.reset();App.alert(R.INVALIDEMAILPWD);var obj=_get("password");obj.value="";obj.focus();return;case 605:App.alert("Account Locked");var obj=_get("password");obj.value="";obj.focus();return;case 603:if(typeof(grecaptcha)!="undefined")grecaptcha.reset();App.alert(R.ERREMAILEXISTS);return;case 604:App.alert(R.LICENSEEXPIRED_MSG);return;default:App.alert(R.UPVISESERVER_ERR+': '+errorCode);break;}}
WebRequest.isOffline=function(){if(WebRequest._networkError==true)return true;var offline=(navigator.onLine===false);return offline;}
function CSVToArray(strData,strDelimiter){strDelimiter=(strDelimiter||",");var objPattern=new RegExp(("(\\"+strDelimiter+"|\\r?\\n|\\r|^)"+"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|"+"([^\"\\"+strDelimiter+"\\r\\n]*))"),"gi");var arrData=[[]];var arrMatches=null;while(arrMatches=objPattern.exec(strData)){var strMatchedDelimiter=arrMatches[1];if(strMatchedDelimiter.length&&(strMatchedDelimiter!=strDelimiter)){arrData.push([]);}
if(arrMatches[2]){var strMatchedValue=arrMatches[2].replace(new RegExp("\"\"","g"),"\"");}else{var strMatchedValue=arrMatches[3];}
if(strMatchedValue==null)strMatchedValue="";arrData[arrData.length-1].push(strMatchedValue);}
return(arrData);}
function DocFile(){this.frm=new Downloader2(User.BASE_URL+"export/exportdoc.aspx");this.setContent=function(html){var temp=document.createElement('div');temp.innerHTML=html;html=temp.innerHTML;document.removeChild(temp);this.frm.append('content',html);}
this.download=function(filename){if(filename.endsWith(".docx")==false)filename+=".docx";this.frm.append('filename',filename);this.frm.append("auth",User.token);this.frm.download(filename);}}
function Downloader(url){this.form=document.createElement('form');this.form.method='POST';this.form.acceptCharset="UTF-8";this.form.action=url;this.append=function(name,value){var obj=document.createElement('input');obj.type='hidden';obj.name=name;obj.value=value;this.form.appendChild(obj);}
this.download=function(filename){document.body.appendChild(this.form);this.form.submit();document.body.removeChild(this.form);}}
function Downloader2(url){this.data=new FormData();this.URL=url;this._W10Downloader=null;this._safari=null;if(window.Windows){try{this._W10Downloader=new RT.Downloader(url);}catch(e){}}else if(/safari/.test(navigator.userAgent.toLowerCase())&&!/chrome/.test(navigator.userAgent.toLowerCase())){this._safari=new Downloader(url);}
this.append=function(name,value){this.data.append(name,value);if(this._W10Downloader)this._W10Downloader.append(name,value);else if(this._safari)this._safari.append(name,value);}
this.download=function(filename){if(this._W10Downloader){this._W10Downloader.download(filename);return;}else if(this._safari){this._safari.download(filename);return;}
var http=new XMLHttpRequest();http.open("POST",this.URL,true);http.responseType="blob";http.onprogress=function(event){Toast.showProgress(R.DOWNLOADING,event.loaded,2*1024*1024);};http.onload=function(oEvent){Toast.hideProgress();Toast.show("Download Complete",true);var blob=http.response;if(window.navigator.msSaveOrOpenBlob){window.navigator.msSaveOrOpenBlob(blob,filename);}else{var elem=window.document.createElement('a');elem.href=window.URL.createObjectURL(blob);elem.download=filename;document.body.appendChild(elem);elem.click();document.body.removeChild(elem);}};Toast.show("Sending Data",false);http.send(this.data);}
this.post=function(){var http=new XMLHttpRequest();http.open("POST",this.URL,true);http.onload=function(oEvent){Toast.hideProgress();Toast.show("Complete",true);History.reload();};Toast.show("Sending...",false);http.send(this.data);}}
function ExcelFile(){this.frm=new Downloader2(User.BASE_URL+"export/exportxls.aspx");this.background=null;this.addSheet=function(filename,csv){this.frm.append('filename',filename);this.frm.append('content',csv);}
this.download=function(filename){filename=Utils.addExtension(filename,".xlsx");this.frm.append('excelfilename',filename);this.frm.append("auth",User.token);if(this.background)this.frm.append("background",this.background);this.frm.download(filename);}
this.email=function(filename,emails,subject){filename=Utils.addExtension(filename,".xlsx");this.frm.append('excelfilename',filename);Toolbar.setTitle(R.SENDBYEMAIL);Toolbar.addButton(R.SENDEMAIL,"ExcelFile.onSend()","save");Toolbar.moreButton=false;List.addTextBox("email",R.ENTEREMAIL,emails,null,"longtext");if(subject)List.addTextBox("subject",R.SUBJECT,subject,null,"longtext");List.addTextBox("body",R.MESSAGE,"",null,"textarea2");List.show("pane");ExcelFile._this=this;}
this.onSend=function(){var mailto=List.getValue('email');if(Pdf2.checkEmails(mailto)==false)return false;var body=Format.text(List.getValue('body'));this.frm.append("mailto",mailto);this.frm.append("body",body);this.frm.append("auth",User.token);this.frm.post();}}
ExcelFile.onSend=function(){ExcelFile._this.onSend();ExcelFile._this=null;}
ExcelFile.format=function(value,type,options){if(type=="numeric")return value+"##NUMERIC";else if(type=="formula")return Number.isFinite(value)?value+"##DECIMAL":value;else if(type=="decimal")return value+"##DECIMAL";else if(type=="price")return parseFloat(value)+"##PRICE";else if(type=="date")return ExcelFile.formatDate(value)+"##DATE";else if(type=="time")return ExcelFile.formatTime(value)+"##TIME";else if(type=="datetime")return ExcelFile.formatDateTime(value)+"##DATETIME";else if(type=="duration")return ExcelFile.formatDuration(value)+"##DURATION";else if(type=="textarea")return Format.text(value);else return CustomFields.formatValue(value,type,options);}
ExcelFile.setStyle=function(value,style){var buf=[];for(var key in style){buf.push(key+":"+style[key]);}
return value+"@@"+buf.join(";");}
ExcelFile.formatDateTime=function(millisec){return ExcelFile.formatDate(millisec)+" "+ExcelFile.formatTime(millisec);}
ExcelFile.formatDate=function(millisec){if(millisec==0)return"";var date=new Date(millisec);var year=date.getFullYear();var month=date.getMonth()+1;var day=date.getDate();if(day<10)day="0"+day;if(month<10)month="0"+month;return year+"-"+month+"-"+day;}
ExcelFile.formatTime=function(millisec){if(millisec==0)return"";var date=new Date(millisec);var hours=date.getHours();var minutes=date.getMinutes();return hours+":"+minutes;}
ExcelFile.formatDuration=function(minutes){var hours=Math.floor(minutes/60);minutes=minutes%60;return hours+":"+minutes;}
ExcelFile.formatPrice=function(amount,currency){amount=parseFloat(amount);if(!currency)currency=AccountSettings.get("currency");return currency+amount;}
function ExcelMerge(){this.frm=new Downloader2(User.BASE_URL+"export/exportxls.aspx");this.setTemplate=function(fileid){this.frm.append('fileid',fileid);this.frm.append('action','merge');}
this.addValue=function(id,value){this.frm.append('id',id);this.frm.append('value',value);}
this.download=function(filename){filename=Utils.addExtension(filename,".xlsx");this.frm.append("excelfilename",filename);this.frm.append("auth",User.token);this.frm.download(filename);}}
function QRCode(){this.frm=new Downloader2(User.BASE_URL+"export/qrcode.aspx");}
QRCode.getImageUrl=function(value){var url=User.BASE_URL+"export/qrcode.aspx";url+="&value="+encodeURIComponent(value);return url;}
QRCode.prototype.add=function(value,label){if(value==null)return;this.frm.append('value',value);if(label==null)label=value;this.frm.append('label',label);}
QRCode.prototype.download=function(filename){this.frm.append('action',"pdf");this.frm.append('filename',filename);this.frm.download(filename);}
function Rss(){}
Rss.toJson=function(xml){var obj={};obj.items=[];if(xml==null)return obj;var channels=xml.getElementsByTagName("channel");if(channels.length==0)return obj;var channel=channels[0];for(var i=0;i<channel.childNodes.length;i++){var node=channel.childNodes[i];if(node.nodeName=="item"){var item={};for(var j=0;j<node.childNodes.length;j++){var elem=node.childNodes[j];item[elem.nodeName]=elem.textContent;}
obj.items.push(item);}else{obj[node.nodeName]=node.textContent;}}
return obj;}
function ZipFile(){this.frm=new Downloader2(User.BASE_URL+"export/exportzip.aspx");this.add=function(filename,content){this.frm.append('filename',filename);this.frm.append('content',content);}
this.addFile=function(fileid){this.frm.append('fileid',fileid);}
this.download=function(zipfilename){zipfilename+=".zip";this.frm.append('zipfilename',zipfilename);this.frm.append("auth",User.token);this.frm.download(zipfilename);}}
function Table(){this.name="table";this.writeStart=function(header,width,icon,onclick){Table.reset();Table.setHeader(header,width,icon,onclick);Table.writeHeader(_html);}
this.writeStop=function(){Table.writeFooter(_html);}}
Table.CHECKALL=1;Table.reset=function(){Table.widths=[];Table.header=[];Table.headerclicks=[];Table.checkBox=0;Table.icon=null;Table.onCheckAll=null;Table.ondrop=null;}
Table.reset();Table.setHeader=function(header,widths,icon,onclick){Table.header=header;Table.widths=(widths!=null)?widths:[];Table.headerclicks=onclick?onclick:[];if(icon=="checkbox")Table.checkBox=Table.CHECKALL;else Table.icon=icon;}
Table.writeHeader=function(buf){NextPrevious.addSection();var count=(Table.header!=null)?Table.header.length:0;buf.push('<table cellspacing="0" class="table">');if(count>0){buf.push('<thead><tr><td class="priority"></td><td class="context"></td><td class="checkbox">');if(Table.checkBox==Table.CHECKALL)buf.push('<input type="checkbox" onclick="Table.toggleCheck(this)" />');else if(Table.icon!=null)buf.push(_icon(Table.icon));buf.push('</td>');for(var i=0;i<count;i++){var className="";if(i==0)className=' class="first"';else if(i==count-1)className=' class="last"';var style=(Table.widths[i]!=null)?' style="width:'+Table.widths[i]+'"':'';var onclick=(Table.headerclicks[i]!=null)?' onclick="Engine.eval('+esc(Table.headerclicks[i])+',0,event)"':"";buf.push('<td',className,style,onclick,'>',Table.header[i],'</td>');}
buf.push('</tr></thead>');}
buf.push('<tbody>');}
Table.writeFooter=function(buf){buf.push('</tbody></table>');Table.reset();}
Table.writeRow=function(buf,labels,onclick,style){NextPrevious.add(onclick);var rowStyle=(style!=null&&style.background!=null)?'style="background-color:'+style.background+'"':'';if(style&&style.ondrop&&style.id){rowStyle+=' id="'+style.id+'"';var ondrop='Table.drop(event,this.id,'+esc(style.ondrop)+')';rowStyle+=' ondragover="event.preventDefault();" ondrop="'+ondrop+'"';}
var priorityStyle=(style!=null&&style.priority!=null)?'style="background-color:'+style.priority+'"':'';var oncontext=(style!=null&&style.oncontext!=null)?"Engine.eval("+esc(style.oncontext)+',0,event);return false':'';var oncontext2=(style!=null&&style.oncontext!=null)?"Engine.eval("+esc(style.oncontext)+',0,this)':'';var contextImage=(oncontext2!='')?_icon("dots","gray"):'';onclick="Engine.eval("+esc(onclick)+',0,event)';buf.push('<tr onclick="',onclick,'" oncontextmenu="',oncontext,'" ',rowStyle,'>');buf.push('<td class="priority" ',priorityStyle,'> </td>');buf.push('<td class="context" onclick="event.cancelBubble=true;',oncontext2,'">',contextImage,'</td>');buf.push('<td class="checkbox" onclick="event.cancelBubble=true;">');if(style!=null){if(style.id!=null){buf.push('<input type=checkbox id="'+Utils.xmlEncode(style.id),'"');if(style.checked==true)buf.push(' checked ');if(style.oncheck!=null)buf.push(' onclick="event.cancelBubble=true;',_func("Engine.eval",style.oncheck),'"');buf.push(' />');}else if(style.img!=null){if(style.img.startsWith("http:")){_html.push('<div class="photo" style="background-image:url(',style.img,')"></div>');}
else buf.push(_icon(style.img));}}
buf.push('</td>');var count=labels.length;for(var j=0;j<count;j++){var className=(j>0&&j==count-1)?' class="last"':'';var drag="";if(style&&style.ondrop){var ondragstart="Table.dragStart(event,"+esc(style.id)+")";drag=' draggable="true" ondragstart="'+ondragstart+'" ondragend="Table.dragEnd(event)"';}
buf.push('<td',className,drag,'>',labels[j],'</td>');}
buf.push('</tr>');}
Table.writeRowLabel=function(buf,label,value,onclick,style){var valign="middle";if(value.length>400&&value.startsWith("<img")==false){label=label+"<br/>"+value;value=" ";valign="top";}
var rowStyle="label";if(onclick==null)onclick="";if(onclick!="")onclick="Engine.eval("+esc(onclick)+",0,event)";else rowStyle+=" nohover";var priorityStyle=(style!=null&&style.priority!=null)?'style="background-color:'+style.priority+'"':'';var oncontext=(style!=null&&style.oncontext!=null)?"Engine.eval("+esc(style.oncontext)+',0,event);return false':'';buf.push('<tr class="',rowStyle,'" onclick="',onclick,'" oncontextmenu="',oncontext,'">');buf.push('<td class="priority" ',priorityStyle,'> </td>');buf.push('<td class="context"></td>');buf.push('<td class="checkbox" style="vertical-align:',valign,'">');if(style!=null){if(style.img!=null){if(style.img.startsWith("http:")){_html.push('<div class="photo" style="background-image:url(',style.img,')"></div>');}
else buf.push(_icon(style.img));}}
buf.push('</td>');if(value==" "){buf.push('<td colspan="2">',label,'</td>');}else{var width=(style!=null&&style.width!=null)?style.width:"30%";buf.push('<td style="width:',width,'">',label,'</td>');var className=onclick?"link":"";buf.push('<td class="',className,'">',value,'</td>');}
buf.push('</tr>');}
Table.toggleCheck=function(checkbox){var table=Table._getTableElement(checkbox);var items=table.getElementsByTagName('input');for(var i=0;i<items.length;i++){var item=items[i];if(item.type==='checkbox'&&item.id!=null){item.checked=checkbox.checked;}}
if(Table.onCheckAll!=null)Table.onCheckAll();}
Table.getChecked=function(yes){if(yes==null)yes=true;var ids=[];var tables=Table._getTableElements();if(tables==null)return ids;for(var j=0;j<tables.length;j++){var table=tables[j];var items=table.getElementsByTagName('input');for(var i=0;i<items.length;i++){var item=items[i];if(item.type==='checkbox'&&item.id!=null&&item.id!=""){if(yes&&item.checked==true)ids.push(item.id);else if(yes==false&&item.checked==false)ids.push(item.id);}}}
return ids;}
Table._getTableElement=function(obj){if(obj==null){var tables=_get("one").getElementsByClassName('table');return tables.length>0?tables[0]:null;}else{var parent=obj.parentNode;while(parent!=null&&parent.nodeName.toUpperCase()!="TABLE"){parent=parent.parentNode;}
return parent;}}
Table._getTableElements=function(){var tables=_get("one").getElementsByClassName('table');return tables.length>0?tables:null;}
Table.dragStart=function(event,id){event.dataTransfer.setData("text",id);Table._dragId=id;_get(Table._dragId).style.backgroundColor=Color.BLUE;}
Table.drop=function(event,targetid,onDropFunc){if(Table._dragId&&targetid&&Table._dragId!=targetid){console.log("Drop source: "+Table._dragId+" on target: "+targetid);if(onDropFunc){onDropFunc=_func(onDropFunc,Table._dragId,targetid);Engine.eval(onDropFunc);}
event.preventDefault();}}
Table.dragEnd=function(event){_get(Table._dragId).style.backgroundColor="";Table._dragId=null;}
function TablePhone(){this.name="table";this.writeStart=function(){_html.push('<div class="tablephone">');}
this.addItem=function(title,subtitle,onclick,style){onclick="Engine.eval("+esc(onclick)+")";_html.push('<div class=item onclick="',onclick,'"><div class=title>',title,'</div><div class=subtitle>',subtitle,'</div>');}
this.writeStop=function(){_html.push("</div>");}}
function TableScroll(){}
TableScroll.reset=function(){TableScroll.headers=[];TableScroll.rows=[];}
TableScroll.addHeader=function(labels){TableScroll.headers=labels;TableScroll.rows=[];}
TableScroll.add=function(labels,onclick,style){TableScroll.rows.push({labels:labels,onclick:onclick,style:style});}
TableScroll.show=function(){List.ensureClose();NextPrevious.addSection();_html.push('<div class="tablescroll">');TableScroll.writeFixedColumn();TableScroll.writeRows();_html.push("</div>");TableScroll.reset();}
TableScroll.writeFixedColumn=function(){_html.push('<div class="fixedcol"><table>');_html.push('<tr><td>',TableScroll.headers[0],'</td></tr>');for(var i=0;i<TableScroll.rows.length;i++){var row=TableScroll.rows[i];var label=row.labels[0];var onclick=row.onclick?"Engine.eval("+esc(row.onclick)+',0,event)':"";if(label)_html.push('<tr onclick="',onclick,'"><td>',label,'</td></tr>');}
_html.push('</table></div>');}
TableScroll.writeRows=function(){_html.push('<div class="right"><table>');var headerRow={labels:TableScroll.headers};TableScroll.writeRow(headerRow);for(var i=0;i<TableScroll.rows.length;i++){var row=TableScroll.rows[i];TableScroll.writeRow(row);}
_html.push("</table></div>");}
TableScroll.writeRow=function(row){NextPrevious.add(row.onclick);var rowStyle="";var oncontext=(row.style!=null&&row.style.oncontext!=null)?"Engine.eval("+esc(row.style.oncontext)+',0,event);return false':'';var onclick=row.onclick?"Engine.eval("+esc(row.onclick)+',0,event)':"";_html.push('<tr onclick="',onclick,'" oncontextmenu="',oncontext,'" ',rowStyle,'>');for(var i=1;i<row.labels.length;i++){var label=row.labels[i];if(!label)label="&nbsp;";_html.push('<td>',label,'</td>');}
_html.push('</tr>');}
function View(className){this.fieldCount=0;this.name=(className!=null)?className:"view";_html.push('<div class="',this.name,'">');this.writeStop=function(){_html.push('</div>');}}
View.writeLabelBox=function(label,value,onclick,style){if(style==null)style={};var boxstyle=""
if(style.color)boxstyle=';border-left:8px solid '+style.color;var onclick=(onclick!=null)?_func("Engine.eval",onclick):null;_html.push('<div class="box" style="',boxstyle,'"');if(onclick!=null)_html.push(' onclick="',onclick,'"');var valueStyle="";if(style["text-color"]!=null)valueStyle='color: '+style["text-color"];var img=style.img?_icon(style.img,"big"):"";_html.push('>',img,'<div class="inner"><span class="label">',label,'</span><span class="value" style="',valueStyle,'">',value,'</span></div></div>');}
View.writeLabel=function(label,value,onclick,style){var className="item";if(value.length>200)className+="longtext";if(onclick!=null)value='<a onclick="'+_func("Engine.eval",onclick)+'">'+value+"</a>";_html.push('<div class="',className,'">');_html.push('<div class="label">',label,'</div>');_html.push('<div class="value">',value,'</div>');_html.push('</div>');}
View.writeTitle=function(title,subtitle,style){if(style==null)style="";if(subtitle==null)subtitle="";var style2=(style!=null)?"":"color:#427fed";var imgurl="";var list=Parameter.parseOptions(style);for(var i=0;i<list.length;i++){var item=list[i];if(item.value=="img")imgurl=item.name;}
_html.push('<div class="itemtitle" style="',style,'">');if(imgurl!=""){_html.push('<div style="background-image:url(',imgurl,')" class="photo"></div>&nbsp;&nbsp;&nbsp;');}
_html.push('<div class="text"><div class="title">',title,'</div>');if(subtitle!="")_html.push('<div class="subtitle">',subtitle,'</div>');_html.push('</div></div>');}
View.writeImage=function(url,onclick,style){var onclick="window.open("+esc(url)+",'_blank')";style=List._parseStyle(style);var style=(style!=null&&style.height!=null)?"height:"+style.height:"";_html.push('<img class="imgvalue" style="',style,'" onclick="',onclick,'" src="',url,'" />');}
View.writeHeader=function(label,style){if(style!=null&&style.count!=null)label+=" ("+style.count+")";if(style!=null&&style.size=='small'){_html.push('<div class=smallsection>',label,'</div>');}else{var img=(style!=null)?style.img:null;View.writeSection(label,img);}}
View.writeItemSubtitle=function(title,subtitle,onclick,style){if(onclick!=null)onclick=' onclick="'+_func('Engine.eval',onclick)+'"';var count=null;if(style){if(style.count)count=style.count;else if(style.number)count=style.number;}
if(count)title+=" ("+count+")";_html.push('<div class="itemsubtitle"',onclick,'>');if(style&&style.img!=null)_html.push('<span style="float:left;padding-right:10px;">',_icon(style.img),'</span>');if(style&&style.label)subtitle+=' <span style="float:right;color:'+Color.BLUE+'">'+style.label+'</span>';_html.push('<div class="title">',title,'</div>');_html.push('<div class="subtitle">',subtitle,'</div>');_html.push('</div>');}
View.writeSection=function(title,icon){_html.push('<table class="sectionheader" cellpadding=0 cellspacing=0><tr>');_html.push('<td class=icon><span class=',icon,'></span></td>');_html.push('<td><span class=title>',title,'</span>');_html.push('</tr></table>');}
View.ensure=function(name,forceNewLine){if(List._container!=null&&List._container.name!=name){List._container.writeStop();List._container=null;}
if(List._container==null){List._container=new View(name);List._container.fieldCount=0;}
if(name=="view"){if(forceNewLine&&List._container.fieldCount%2!=0)List._container.fieldCount++;if(List._container.fieldCount%2==0)_html.push('<div class="line2"></div>');List._container.fieldCount++;if(forceNewLine)List._container.fieldCount++;}}
function AutoSave(){}
AutoSave.modified=false;AutoSave.table=null;AutoSave.timerId=null;AutoSave.PERIOD=30000;AutoSave.start=function(table){AutoSave.table=table;AutoSave.modified=false;AutoSave.timerId=setTimeout("AutoSave.onTimer();",AutoSave.PERIOD);}
AutoSave.stop=function(){AutoSave.table=null;AutoSave.modified=false;if(AutoSave.timerId!=null){clearTimeout(AutoSave.timerId);AutoSave.timerId=null;}}
AutoSave.needsAutoSave=function(){AutoSave.modified=true;}
AutoSave.onTimer=function(){if(AutoSave.table==null)return;if(AutoSave.modified==true){AutoSave.modified=false;}
AutoSave.timerId=setTimeout("AutoSave.onTimer();",AutoSave.PERIOD);}
AutoSave.onSaved=function(){if(AutoSave.table==null)return;App.alert(R.AUTOSAVED+" "+Format.time(Date.now()),"yellow");}
function CalendarEntry(){this.title="";this.date=0;this.duration=0;this.user=null;this.tooltip=null;this.onclick=null;this.color=null;}
function Calendar(){}
Calendar.entries=null;Calendar.date=null;Calendar.dayCount=0;Calendar.startdate=null;Calendar.stopdate=null;Calendar.title=null;Calendar.tip="";Calendar.mode="";Calendar.users=null;Calendar.onItemMoved=null;Calendar.onNewItem=null;Calendar.onDayClick=null;Calendar.SHOW_STARTTIME=false;Calendar.WEEKSTART_DAY=0;Calendar.NO_USER;Calendar.setMode=function(mode){Calendar.mode=mode;Calendar.setDate(Calendar.date);}
Calendar.setDate=function(date){Calendar.date=date;if(Calendar.mode=="day"){Calendar.startdate=date;Calendar.stopdate=Date.addDays(date,1);Calendar.dayCount=1;Calendar.title=formatLongDay(date);}else if(Calendar.mode=="week"){Calendar.startdate=Date.weekStart(date);Calendar.stopdate=Date.addDays(Calendar.startdate,7);Calendar.dayCount=7;Calendar.title=Format.week(Calendar.startdate);}else if(Calendar.mode=="5days"){Calendar.startdate=Date.weekStart(date);Calendar.stopdate=Date.addDays(Calendar.startdate,5);Calendar.dayCount=5;Calendar.title=Format.week(Calendar.startdate);}else if(Calendar.mode=="month"){Calendar.setDateMonth(date);Calendar.title=Format.month(date);}
Calendar.entries=[];}
Calendar.getIncrement=function(){if(Calendar.mode=="day")return 1;else if(Calendar.mode=="5days")return 5;else if(Calendar.mode=="week")return 7;else if(Calendar.mode=="month")return 30;else return 0;}
Calendar.setDateMonth=function(millisecond){var monthCal=new CalendarMonth();monthCal.setDate(millisecond);Calendar.dayCount=monthCal.dayCount;Calendar.startdate=monthCal.startdate;Calendar.stopdate=monthCal.stopdate;}
Calendar.nextDate=function(){var increment=Calendar.getIncrement();var date=Date.addDays(Calendar.date,increment);Calendar.setDate(date);}
Calendar.previousDate=function(){var increment=Calendar.getIncrement();var date=Date.addDays(Calendar.date,-increment);Calendar.setDate(date);}
Calendar.setEntries=function(entries){Calendar.entries=entries;}
Calendar.setUsers=function(users){Calendar.users=users;}
Calendar.show=function(){List.ensureClose();if(Calendar.startdate==null){Calendar.mode="week";Calendar.setDate(Date.today());}
Calendar.writeTitle(Calendar.tip);if(Calendar.NO_USER==null)Calendar.NO_USER=R.UNASSIGNED;if(Calendar.mode=="day")DayView.write();else if(Calendar.mode=="5days")Calendar.writeWeek(5);else if(Calendar.mode=="week")Calendar.writeWeek(7);else if(Calendar.mode=="month")Calendar.writeMonth();Engine.onShow();if(Calendar.mode=="day"){DayView.showEntries();}else if(Calendar.mode=="week"){var weekcal=_get("weekcal");Calendar.resizeWeekTable(weekcal);}}
Calendar.writeTitle=function(tip){_html.push('<div class=caltitle id=caltitle>');_html.push('<span class="arrow left" onclick="Calendar.onPrevious()">',_icon("previous"),'</span>');_html.push('<span class="arrow right" onclick="Calendar.onNext()">',_icon("next"),'</span></span>');_html.push('<span class="text">',Calendar.title,'</span>');if(tip!=null)_html.push('<small>',tip,'</small>');_html.push('</div>');}
Calendar.getEntries=function(day,user){var list=[];for(var i=0;i<Calendar.entries.length;i++){var entry=Calendar.entries[i];var date1=entry.date;var date2=entry.date+entry.duration*Date.MINUTE;if(date2==date1)date2+=1;if(date2>day&&date1<day+Date.DAY&&(user==null||MultiValue.contains(entry.user,user)||(entry.user==''&&user==''))){list.push(entry);}}
return list;}
Calendar._makeOnclick=function(func){if(func==null)return"";return"event.cancelBubble = true;"+_func("Engine.eval",func);}
Calendar.makeOnContext=function(func){if(func==null)return"";return"Engine.eval("+esc(func)+",null,event);return false";}
Calendar.writeEntry=function(entry,day,user){var style="";if(entry.color==""||entry.color==Color.GRAY)style="color:black;background:#EEEEEE";else if(entry.color==Color.STRIKE)style="color:black;background:#EEEEEE;text-decoration:line-through";else if(entry.color=="#FFFFA5")style="color:black;background:#FFFFA5";else style="color:white;background:"+entry.color;var ondrag="Calendar.drag(event,"+esc(entry.id)+","+esc(user)+","+esc(entry.type)+")";var onclick=Calendar._makeOnclick(entry.onclick);var oncontext=Calendar.makeOnContext(entry.oncontext);var title=(Calendar.SHOW_STARTTIME&&Date.isSameDay(entry.date,day))?Format.time(entry.date,"short"):"";if(title.length>0)title+=" ";title+=entry.title;if(title==""||title==null)title=R.NONAME;_html.push('<div class=entry onclick="',onclick,'" oncontextmenu="',oncontext,'" ondragstart="',ondrag,'" draggable="true" style="',style,'" title="',entry.tooltip,'">');_html.push(title,'</div>');}
Calendar.dragEntryId=null;Calendar.dragUser=null;Calendar.drayEntryType=null;Calendar.ctrlKey=false;Calendar.drag=function(event,entryid,user,entrytype){Calendar.dragEntryId=entryid;Calendar.dragUser=user;Calendar.drayEntryType=entrytype;event.dataTransfer.setData("text",entryid);}
Calendar.drop=function(event,day,user){if(Calendar.dragEntryId==null||day==null||Calendar.onItemMoved==null)return;Calendar.ctrlKey=event.ctrlKey;var func=_writeJS(Calendar.onItemMoved,Calendar.dragEntryId,day,user,Calendar.dragUser,Calendar.drayEntryType);Engine.eval(func);Calendar.dragEntryId=null;Calendar.dragUser=null;Calendar.drayEntryType=null;Calendar.ctrlKey=false;event.preventDefault();}
Calendar.viewDay=function(day){Calendar.setMode("day");Calendar.setDate(day);History.reload();}
Calendar._makeDayClick=function(day){var onclick="event.cancelBubble=true;";if(Calendar.onDayClick!=null){onclick+='Engine.eval('+esc(_func(Calendar.onDayClick,day))+',0,event)';}else{onclick+='Calendar.viewDay('+esc(day)+')';}
return onclick;}
Calendar.writeWeek=function(nbdays){_html.push('<table class=weekcal><thead><tr class=header>');_html.push('<td></td>');for(var i=0;i<nbdays;i++){var day=Date.addDays(Calendar.startdate,i);var className=(day==Date.today())?"today":"";var label=Format.dayOfWeek(day).substring(0,3)+" "+Format.date(day);var onclick=Calendar._makeDayClick(day);_html.push('<td onclick="',onclick,'" class="',className,'">',label,'</td>');}
_html.push('</tr></thead><tbody id=weekcal>');for(var i=0;i<Calendar.users.length;i++){var user=Calendar.users[i];var userLabel=(user!="")?user:Calendar.NO_USER;_html.push('<tr><td class=user>',_icon("contact"),'<span>',userLabel,'</span></td>');Calendar.writeWeekLine(nbdays,user);}
_html.push('</tbody></table>');}
Calendar.writeWeekLine=function(nbdays,user,width){for(var i=0;i<nbdays;i++){var day=Date.addDays(Calendar.startdate,i);var className=(day==Date.today())?"today":"";var onnewclick='event.cancelBubble=true;Engine.eval('+esc(_func(Calendar.onNewItem,day,user))+',0,event)';var ondrop="Calendar.drop(event,"+esc(day)+","+esc(user)+")";_html.push('<td onclick="',onnewclick,'" ondrop="',ondrop,'" class="',className,'" ondragover="event.preventDefault()">');var entries=Calendar.getEntries(day,user);for(var j=0;j<entries.length;j++){Calendar.writeEntry(entries[j],day,user);}
_html.push('</td>');}
_html.push('</tr>');}
Calendar.resizeWeekTable=function(weekcal){var USERCOL_WIDTH=150;var DAYCOL_WIDTH=Math.round((Layout.mainPaneWidth()-USERCOL_WIDTH)/7);var table=document.getElementById("weekcal").parentNode;for(var i=0,row;row=table.rows[i];i++){for(var j=0,cell;cell=row.cells[j];j++){var width=(j==0)?USERCOL_WIDTH:DAYCOL_WIDTH;cell.style.width=width+"px";}}
var caltitle=_get("caltitle");var THEAD=35+2+4;var height=one.clientHeight-caltitle.clientHeight-THEAD-16;weekcal.style.height=height+"px";var offset=History.current()?History.current().offset:null
if(offset)weekcal.scrollTop=offset;}
Calendar.writeMonth=function(){_html.push('<table class=monthcal>');_html.push('<tr class=header>');for(var i=0;i<7;i++){var day=Date.addDays(Calendar.startdate,i);var label=Format.dayOfWeek(day);_html.push('<td class=header>',label,'</td>');}
_html.push('</tr>');var count=0;var day=Calendar.startdate;var cellHeight=Calendar.getMonthCellHeight();for(var week=0;week<6;week++){_html.push("<tr>");for(var dayOfWeek=0;dayOfWeek<7;dayOfWeek++){Calendar.writeMonthCell(day,cellHeight);count++;day=Date.addDays(day,1);}
_html.push("</tr>");if(count==Calendar.dayCount){break;}}
_html.push('</table>');}
Calendar.writeMonthCell=function(day,height){height-=16+2;var className=(day==Date.today())?"today":"";var strDay=new Date(day).getDate();var ondrop="Calendar.drop(event,"+esc(day)+")";var ondayclick=Calendar._makeDayClick(day);var onnewclick='event.cancelBubble=true;Engine.eval('+esc(_func(Calendar.onNewItem,day))+',0,event)';_html.push('<td onclick="',onnewclick,'" ondrop="',ondrop,'" class="',className,'" ondragover="event.preventDefault()">');_html.push('<div class=day onclick="',ondayclick,'"><span>',strDay,' </span><span class="new"> ',Format.month(day),'</span></div>');_html.push('<div style="height:',height,'px" class=list>');var entries=Calendar.getEntries(day,null);for(var i=0;i<entries.length;i++){Calendar.writeEntry(entries[i],day);}
_html.push('</div>');_html.push('</td>');}
Calendar.getMonthCellHeight=function(){var rows=Math.floor(Calendar.dayCount/7);var titleHeight=52;var headerHeight=36+2+4;var height=(Layout.pageHeight()-titleHeight-headerHeight);height=height/rows;return Math.floor(height);}
Calendar._getOffset=function(){var weekcal=_get("weekcal");if(weekcal)return weekcal.scrollTop;var daylcal=_get('daycalcontainer');if(daylcal)return DayView._getOffset();return null;}
Calendar.onResize=function(width,height){var weekcal=_get("weekcal");if(weekcal){Calendar.resizeWeekTable(weekcal);}}
function CalendarMonth(){this.date=null;this.startdate=null;this.stopdate=null;this.dayCount=0;this.setDate=function(date){this.date=date;var objDate=new Date(date);var firstDay=new Date(objDate.getFullYear(),objDate.getMonth(),1);var lastDay=new Date(objDate.getFullYear(),objDate.getMonth()+1,0);this.dayCount=lastDay.getDate();var firstDayOfWeek=Date.firstDayOfWeek();while(firstDay.getDay()!=firstDayOfWeek){firstDay.setDate(firstDay.getDate()-1);this.dayCount++;}
this.startdate=firstDay.getTime();var lastDayOfWeek=Date.lastDayOfWeek();while(lastDay.getDay()!=lastDayOfWeek){lastDay.setDate(lastDay.getDate()+1);this.dayCount++;}
this.stopdate=Date.addDays(lastDay.getTime(),1);}}
Calendar.onNext=function(){Calendar.nextDate();History.reload();}
Calendar.onPrevious=function(){Calendar.previousDate();History.reload();}
function CalendarNav(){}
CalendarNav.date=null;CalendarNav.onclick=null;CalendarNav.write=function(date,onclick){CalendarNav.date=new Number(date);CalendarNav.onclick=onclick;return'<div id=leftcal class=cal>'+CalendarNav.drawTable()+'</div>';}
CalendarNav.drawTable=function(){var monthCal=new CalendarMonth();monthCal.setDate(CalendarNav.date);var buf=[];buf.push("<table id='calnav' cellspacing=0 border=0 onmousedown='event.cancelBubble=true;'>");buf.push("<tr class=calheader>");buf.push('<td onmousedown="CalendarNav.onChangeMonth(-1)">',_icon("previous"),'</td>');buf.push("<td colspan='5' class='title'>"+Format.month(monthCal.date)+"</td>");buf.push('<td onmousedown="CalendarNav.onChangeMonth(1)">',_icon("next"),'</td>');buf.push("</tr>");buf.push("<tr class=calheader>");for(var i=0;i<7;i++){var day=Date.addDays(monthCal.startdate,i);var label=Format.dayOfWeek(day).substring(0,1);buf.push('<td>',label,'</td>');}
buf.push('</tr>');var count=0;var day=monthCal.startdate;for(var week=0;week<6;week++){buf.push("<tr>");for(var dayOfWeek=0;dayOfWeek<7;dayOfWeek++){var d=new Date(day);var css_class="weekday";if(day==Date.today())css_class="today";else if(day==monthCal.date)css_class="current";else if(d.getDay()==Date.SUNDAY||d.getDay()==Date.SATURDAY)css_class="weekend";var func=_func(CalendarNav.onclick,day);var onclick=_func("Engine.onLeftPane",func);buf.push("<td class=",css_class,' onmousedown="',onclick,'">',d.getDate(),"</td>");day=Date.addDays(day,1);count++;}
buf.push("</tr>");if(count==monthCal.dayCount){break;}}
buf.push('</table>');return buf.join("");}
CalendarNav.onChangeMonth=function(increment){CalendarNav.date=new Date(Date.addMonths(CalendarNav.date,increment));_set('leftcal',CalendarNav.drawTable());}
function ChartO(){}
ChartO.load=function(callback){if(typeof Chart2==="undefined"){Loader.loadScript("js/Chart2.js",function(){ChartO.load(callback);},Chart.onError);}else if(callback){callback();}};ChartO.show=function(type){List.ensureClose();Chart.curData.type=type;var style=(type=="pie"||type=="donut")?"height:300px;":"padding:15px;";style+=Chart.curData.style;var index=Chart.data.length-1;var oncontext="Chart.showContextMenu("+esc(Chart.curData.id)+","+esc(Chart.curData.title)+")";oncontext="Engine.eval("+esc(oncontext)+",0,event);return false";if(type.match(/horizontal.*bar/i)){var category_height=25;if(!type.match(/stack/i))
category_height*=Chart.curData.columns.length-1;var height=50+category_height*Chart.curData.rows.length;var style_obj=List._parseStyle(style);if(!style_obj.height)style+="height:"+height+"px";}
_html.push('<div style="',style,'">');_html.push('<canvas id="',Chart.curData.id,'"></canvas>');_html.push('</div>');};ChartO._drawChart=function(index){if(!index)index=0;if(index==Chart.data.length){Chart.reset();return;}
var reportData=Chart.data[index];var div=_get(reportData.id);if(!div){Chart.reset();return;}
var hasLegend=false;var ctx=document.getElementById(Chart.data[index].id);var data={datasets:[],labels:[]};var options={responsive:true,maintainAspectRatio:false,title:{display:!!reportData.title,text:reportData.title,},legend:{}};for(var i=1;i<reportData.columns.length;i++){var column=reportData.columns[i];data.datasets.push({data:[],label:column.label});if(column.label)hasLegend=true;}
for(i=0;i<reportData.rows.length;i++){var row=reportData.rows[i];for(var j=0;j<row.length;j++){var nb=row[j];if(j===0)data.labels.push(nb);else data.datasets[j-1].data.push(nb);}}
var set;var type=reportData.type;if(!type)type="bar";if(type=="bar"){options.scales={yAxes:[{ticks:{beginAtZero:true}}]};}else if(type=="stackbar"){type="bar";options.scales={xAxes:[{stacked:true}],yAxes:[{stacked:true,ticks:{beginAtZero:true}}]};}else if(type=="horizontalbar"){type="horizontalBar";options.scales={xAxes:[{ticks:{beginAtZero:true}}]};}else if(type=="horizontalstackbar"){type="horizontalBar";options.scales={xAxes:[{stacked:true,ticks:{beginAtZero:true}}],yAxes:[{stacked:true,barPercentage:0.9,categoryPercentage:0.9}]};}else if(type=="line"){for(i=0;i<data.datasets.length;i++){set=data.datasets[i];set.fill=false;}
options.scales={xAxes:[{ticks:{autoSkip:true,maxTicksLimit:20}}]};}else if(type=="pie"||type=="donut"||type=="donut"){type="doughnut";options.animation={onProgress:writePercentagesInSlices};}else if(type=="timeline"){}else if(type=="gantt"){}else{return;}
var colorAttribute=type=="line"?"borderColor":"backgroundColor";if(reportData.colors&&reportData.colors.length>0){if(data.datasets.length>1){for(i=0;i<data.datasets.length;i++){set=data.datasets[i];set[colorAttribute]=reportData.colors[i];}}else{data.datasets[0][colorAttribute]=reportData.colors;}}else{if(data.datasets.length>1||type!="doughnut"){for(i=0;i<data.datasets.length;i++){set=data.datasets[i];set[colorAttribute]=getColorGradient(i,data.datasets.length-1);}}else{data.datasets[0][colorAttribute]=[];for(i=0;i<data.datasets[0].data.length;i++){data.datasets[0][colorAttribute].push(Color.ALL[i%Color.ALL.length]);}}}
var labelCount=0;for(i=0;i<data.datasets.length;i++){var dataset=data.datasets[i];if(dataset.label)labelCount++;}
options.legend.display=0<labelCount&&labelCount<10;var myChart=new Chart2(ctx,{type:type,data:data,options:options});if(type=="gantt"){}else{ctx.onclick=function(evt){var activePoints=myChart.getElementsAtEvent(evt);if(activePoints.length){var index=activePoints[0]["_index"];var onclick=reportData.onclick[index];if(onclick)Engine.eval(onclick);}};}
ChartO._drawChart(index+1);};function getColorGradient(value,max){var start={red:87,green:148,blue:218,};var end={red:227,green:237,blue:249,};var x=max!==0?value/max:0;var res={red:start.red+Math.round(x*(end.red-start.red)),green:start.green+Math.round(x*(end.green-start.green)),blue:start.blue+Math.round(x*(end.blue-start.blue))};return"rgb("+res.red+", "+res.green+", "+res.blue+")";}
function writePercentagesInSlices(obj){var ctx=this.chart.ctx;ctx.font="Verdana";ctx.textAlign='center';ctx.textBaseline='bottom';this.data.datasets.forEach(function(dataset){for(var i=0;i<dataset.data.length;i++){var model=dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,total=dataset._meta[Object.keys(dataset._meta)[0]].total,mid_radius=model.innerRadius+(model.outerRadius-model.innerRadius)/2,start_angle=model.startAngle,end_angle=model.endAngle,mid_angle=start_angle+(end_angle-start_angle)/2;if(start_angle==end_angle)continue;var x=mid_radius*Math.cos(mid_angle);var y=mid_radius*Math.sin(mid_angle);ctx.fillStyle='#fff';var percent=Math.round(dataset.data[i]/total*1000)/10;if(percent>=3)ctx.fillText(percent+"%",model.x+x,model.y+y);}});}
function DayView(){}
DayView.START_HOUR=0;DayView.STOP_HOUR=24;DayView.LINE_HEIGHT=24;DayView.adjustEntries=function(entries,day){for(var i=0;i<entries.length;i++){var entry=entries[i];var duration=entry.duration;if(duration==0)duration=(DayView.STOP_HOUR-DayView.START_HOUR)*60;else if(duration<30)duration=30;entry.start=Math.floor((entry.date-day)/Date.MINUTE);entry.stop=entry.start+duration;if(entry.start<0){entry.start=DayView.START_HOUR*60;if(entry.stop<entry.start)entry.stop=entry.start+60;}else if(entry.start==0||entry.start<DayView.START_HOUR*60){entry.start=DayView.START_HOUR*60;entry.stop=entry.start+duration;}else if(entry.start>=DayView.STOP_HOUR*60){entry.start=(DayView.STOP_HOUR-1)*60;}
if(entry.stop>DayView.STOP_HOUR*60){entry.stop=DayView.STOP_HOUR*60;}}}
DayView.onResize=function(width,height){var container=_get("outer");if(container==null)return;container.style.height=(height-35-40)+"px";}
DayView.write=function(){var USER_WIDTH=210;var pageWidth=_get('one').clientWidth;DayView.HOUR_WIDTH=Math.floor((pageWidth-USER_WIDTH)/(DayView.STOP_HOUR-DayView.START_HOUR));if(DayView.HOUR_WIDTH<80)DayView.HOUR_WIDTH=80;_html.push('<div id=outer><div id=daycalcontainer><table id=daytable class=daycal>');_html.push('<tr class=header>');_html.push('<td class="user" style="top:0;height:39px;border-top:1px solid #c2c3c5;border-right:2px solid #F1F1F1;"> </td>');for(var i=DayView.START_HOUR;i<DayView.STOP_HOUR;i++){_html.push('<td width="',DayView.HOUR_WIDTH,'px"> ',i,':00</td>');}
_html.push('</tr>');for(var i=0;i<Calendar.users.length;i++){var user=Calendar.users[i];var entries=Calendar.getEntries(Calendar.date,user);DayView.adjustEntries(entries,Calendar.date);var userLabel=(user!="")?user:Calendar.NO_USER;_html.push('<tr>');_html.push('<td id="cell_',user,'" class=user><span class="contact"></span><span>',userLabel,'</span></td>');for(var j=DayView.START_HOUR;j<DayView.STOP_HOUR;j++){var id="cell_"+user+"_"+j;var date=Calendar.date+j*Date.HOUR;var onclick=_writeJS(Calendar.onNewItem,date,user);var ondrop="Calendar.drop(event,"+esc(date)+","+esc(user)+")";_html.push('<td id="',id,'" onclick="',onclick,'" ondrop="',ondrop,'" ondragover="event.preventDefault()"> </td>');}
_html.push('</tr>');}
_html.push('</table></div></div>');_html.push('<div id=dayscroll></div>');}
DayView.showEntries=function(){for(var i=0;i<Calendar.users.length;i++){var user=Calendar.users[i];var cellid="cell_"+user+"_"+DayView.START_HOUR;var cell=_get(cellid);var top=cell.offsetTop;var entries=Calendar.getEntries(Calendar.date,user);for(var j=0;j<entries.length;j++){var entry=entries[j];DayView.writeEntry(entry,user,top);}
var user_cell=_get("cell_"+user);user_cell.style.height=(cell.offsetHeight-user_cell.style.paddingTop*2)+"px";}
var table=_get("daycalcontainer");var scrollbar=_get("dayscroll");scrollbar.style.overflow='auto';scrollbar.style.overflowY='hidden';scrollbar.appendChild(document.createElement('div'));scrollbar.firstChild.style.width=table.scrollWidth+'px';scrollbar.firstChild.style.paddingTop='1px';scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));scrollbar.onscroll=function(){table.scrollLeft=scrollbar.scrollLeft;};table.onscroll=function(){scrollbar.scrollLeft=table.scrollLeft;};var offset=(History.current()!=null)?History.current().offset:null;if(offset==null){offset=DayView.lastOffset;if(offset==null){var startHour=parseInt(LocalSettings.get("Calendar.starthour",6));offset={left:startHour*DayView.HOUR_WIDTH+12,top:0};}}
table.scrollLeft=offset.left;var outer=table.parentNode;outer.scrollTop=offset.top;}
DayView._getOffset=function(){var obj=_get('daycalcontainer');if(obj==null)return null;var outer=obj.parentNode;DayView.lastOffset={left:1+obj.scrollLeft,top:outer.scrollTop};return DayView.lastOffset;}
DayView.getCell=function(minutes,user){var startHour=Math.floor(minutes/60);var minutesOffset=(minutes-startHour*60);if(startHour>DayView.STOP_HOUR-1){startHour=DayView.STOP_HOUR-1;minutesOffset=60;}
var cellid="cell_"+user+"_"+startHour;var cell=_get(cellid);return cell;}
DayView.writeEntry=function(entry,user,top){var style="";if(entry.color==""||entry.color==Color.GRAY)style="color:black;background:"+Color.GRAY;else style="color:white;background:"+entry.color;var width=(entry.stop-entry.start)*DayView.HOUR_WIDTH/60;width-=14;var startHour=Math.floor(entry.start/60);var minutesOffset=(entry.start-startHour*60);var left=minutesOffset*DayView.HOUR_WIDTH/60;style+=";left:"+left+"px;width:"+width+"px";var ondrag="Calendar.drag(event,"+esc(entry.id)+","+esc(user)+","+esc(entry.type)+")";var onclick=Calendar._makeOnclick(entry.onclick);var oncontext=Calendar.makeOnContext(entry.oncontext);var title=entry.title;if(title==""||title==null)title=R.NONAME;var buf=[];buf.push('<div class=entry draggable=true onclick="',onclick,'" oncontextmenu="',oncontext,'" ondragstart="',ondrag,'" style="',style,'" title="',entry.tooltip,'">',title,'</div>');var cell=DayView.getCell(entry.start,user);_create2(entry.id,buf.join(''),cell);var nbhours=Math.ceil((entry.stop-entry.start)/60);for(var i=1;i<nbhours;i++){var cellid="cell_"+user+"_"+(startHour+i);var cell=_get(cellid);var obj=document.createElement('div');obj.className="transparententry";cell.appendChild(obj);}}
function _create2(id,html,parent){var obj=_get(id);if(obj==null){obj=document.createElement('div');parent.appendChild(obj);obj.outerHTML=html;}else{obj.outerHTML=html;}}
function Dialog(){}
Dialog.callback=null;Dialog.confirm=function(title,callback){Dialog.callback=callback;var dlg=document.createElement("DIV");dlg.id="_dlg";dlg.className="modalDialog";var buf=[];buf.push('<div><span class=title>',title,'</span><span class=button onclick="Dialog.onButton(1)">',R.YES,'</span> <span class=button onclick="Dialog.onButton(0)">',R.NO,'</span> </div>');dlg.innerHTML=buf.join('');document.body.appendChild(dlg);}
Dialog.onButton=function(value){document.body.removeChild(_get("_dlg"));Dialog.callback(value);}
Dialog.confirmDelete=function(onclick){Dialog.confirm(R.DELETECONFIRM,function(value){if(value==1)eval(onclick);});}
function DropboxView(){}
DropboxView.show=function(){Toolbar.reset();List.addTitle(R.DROPBOXADDRESS);List.addHeader(R.DROPBOXRECEIVEDEMAIL);_html.push('<ul>');_html.push('<li>'+R.DROPBOXRECEIVEDEMAIL_NOTE1+'</li>');_html.push('<li>'+R.DROPBOXRECEIVEDEMAIL_NOTE2+'</li>');_html.push('<li>'+R.DROPBOXRECEIVEDEMAIL_NOTE3+'</li>');_html.push('<li>'+R.DROPBOXRECEIVEDEMAIL_NOTE4+'</li>');_html.push('</ul>');List.addHeader(R.DROPBOXSENTEMAILS);_html.push('<ul>');_html.push('<li>'+R.DROPBOXSENTEMAILS_NOTE1+'</li>');_html.push('<li>'+R.DROPBOXSENTEMAILS_NOTE2+'</li>');_html.push('<li>'+R.DROPBOXSENTEMAILS_NOTE3+'</li>');_html.push('</ul>');List.addHeader(R.DROPBOXNEWNOTE);_html.push('<ul>');_html.push('<li>'+R.DROPBOXNEWNOTE_NOTE1+'</li>');_html.push('<li>'+R.DROPBOXNEWNOTE_NOTE2+'</li>');_html.push('<li>'+R.DROPBOXNEWNOTE_NOTE3+'</li>');_html.push('<li><b>/contact</b> <i>aContactNameOrEmail</i></li>');_html.push('<li><b>/company</b> <i>aCompanyName</i></li>');_html.push('<li><b>/project</b> <i>aProjectName</i> or <i>aProjectId</i></li>');_html.push('<li><b>/deal</b> <i>aDealName</i> or <i>aDealId</i></li>');_html.push('<li><b>/job</b> <i>aJobName</i> or <i>aJobId</i></li>');_html.push('</ul>');_html.push(R.DROPBOXNEWNOTE_NOTE4);List.addHeader(R.DROPBOXCREATETASK);_html.push('<ul>');_html.push('<li>'+R.DROPBOXCREATETASK_NOTE1+'</li>');_html.push('<li>'+R.DROPBOXCREATETASK_NOTE2+'</li>');_html.push('<li><b>/due</b> <i>MM/DD/YYYY</i></li>');_html.push('<li><b>/priority</b> <i>0, 1 or 2</i></li>');_html.push('<li><b>/list</b> <i>aTaskListName</i></li>');_html.push('<li><b>/contact</b> <i>aContactNameOrEmail</i></li>');_html.push('<li><b>/company</b> <i>aCompanyName</i></li>');_html.push('<li><b>/project</b> <i>aProjectName</i> or <i>aProjectId</i></li>');_html.push('<li><b>/deal</b> <i>aDealName</i> or <i>aDealId</i></li>');_html.push('<li><b>/job</b> <i>aJobName</i> or <i>aJobId</i></li>');_html.push('</ul>');List.show();}
function Form(){_html.push('<form id="_frm" autocomplete="off" name="_frm" class=frm onsubmit="return false;">');this.name="Form";this.fieldCount=0;this.writeStop=function(){_html.push('</form>');}}
Form.setFocus=function(){var f=_get("_frm");if(f==null)return;for(var i=0;i<f.elements.length;i++){var e=f.elements[i];if(e.tagName!='INPUT'||(e.type!='hidden'&&e.type!='submit'&&e.type!='button')){if(e.tagName!='SELECT'&&e.tagName!='BUTTON'&&_isVisible(e)){if(e.name!=''&&e.name.startsWith("_")==false){e.focus();if(e.tagName=='INPUT'&&e.type=="text"&&e.setSelectionRange!=null){e.setSelectionRange(e.value.length,e.value.length);}}
return;}}}
HtmlBox.focus();}
Form.ensure=function(label,forceNewLine){if(List._container!=null&&List._container.name!="Form"){List._container.writeStop();List._container=null;}
if(List._container==null){List._container=new Form();}
if(forceNewLine&&List._container.fieldCount%2!=0)List._container.fieldCount++;if(List._container.fieldCount%2==0)_html.push('<div class="line"></div>');List._container.fieldCount++;if(forceNewLine)List._container.fieldCount++;if(label!=null){_html.push('<div class=edititem>');var style=(forceNewLine==true)?' style="width:100%"':"";_html.push('<label',style,'>',Format.capitalize(label),'</label>');}}
Form.ensureClose=function(){_html.push('</div>');}
function isEmail(strValue){strValue=strValue.trim();var objRE=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return(strValue!=''&&objRE.test(strValue));}
function GoogleMap(){}
GoogleMap._map=null;GoogleMap.PINS=null;GoogleMap.USE_CLUSTER=true;GoogleMap._PARAMS='key=AIzaSyB_T0ub_nU_Snkmz_Y0h2qZkcjdOdewQxw&sensor=false&libraries=geometry';GoogleMap.info=null;GoogleMap.JSAPI_URL="https://www.google.com/jsapi";GoogleMap.preload=function(callback){if(typeof google==="undefined"){Loader.loadScript(GoogleMap.JSAPI_URL,function(){GoogleMap.preload(callback)});}else if(google.maps==null){google.load("maps","3",{other_params:GoogleMap._PARAMS,callback:callback});}else if(callback!=null){callback();}}
GoogleMap.center=function(geo){var pt=Map._parsePoint(geo);if(pt==null||GoogleMap._map==null)return;GoogleMap._map.setCenter(new google.maps.LatLng(pt.lat,pt.lng));GoogleMap._map.setZoom(18);}
GoogleMap.show=function(items,title){GoogleMap.preload(function(){GoogleMap.onShow(items,title);});}
GoogleMap.onShow=function(items,title){google.maps.visualRefresh=true;evalLabel();GoogleMap.info=null;var obj=document.getElementById('map_canvas');var mapOptions={mapTypeId:google.maps.MapTypeId.ROADMAP,minZoom:3,scaleControl:true};var map=new google.maps.Map(obj,mapOptions);var markers=[];var markerBounds=new google.maps.LatLngBounds();var useCluster=(GoogleMap.USE_CLUSTER==true&&items.length>2);var geoErrorCount=0;for(var i=0;i<items.length;i++){var item=items[i];if(item.style==null)item.style={};if(item.style["img"]=="path"){GoogleMap.addPath(map,item);}else{var pt=Map._parsePoint(item.geo);if(pt!=null){var pos=new google.maps.LatLng(pt.lat,pt.lng);var marker=new google.maps.Marker({position:pos,map:useCluster?null:map,icon:GoogleMap._getIcon(item.style),title:item.title});var markerLabel=(item.style!=null)?item.style.label:null;if(markerLabel!=null){var label=new Label({map:map});label.set('zIndex',1234);label.bindTo('position',marker,'position');label.set('text',markerLabel);}
marker.html=(item.style!=null)?item.style.html:null;if(marker.html==null){QuickView.setTitle(item.title);if(item.onclick!=null)QuickView.addLink(R.VIEWDETAILS,item.onclick);marker.html=QuickView.writeStop();}
google.maps.event.addListener(marker,"click",function(){GoogleMap.onItemClick(this)});markerBounds.extend(pos);markers.push(marker);}else{geoErrorCount++;}}}
if(useCluster){var markerCluster=new MarkerClusterer(map,markers,{maxZoom:16});}
GoogleMap.USE_CLUSTER=true;var offset=null;if(History.current()!=null)offset=History.current().offset;if(offset!=null&&offset.lat!=null&&offset.zoom!=null){var center=new google.maps.LatLng(offset.lat,offset.lng);map.setCenter(center);map.setZoom(offset.zoom);}else if(items.length>1){map.fitBounds(markerBounds);}else if(items.length==1){var pos=markerBounds.getCenter();map.setCenter(pos);map.setZoom(13);}else{map.setCenter(new google.maps.LatLng(0,0));map.setZoom(3);}
if(title!=null){var centerControlDiv=document.createElement('div');var centerControl=new MapTitleControl(centerControlDiv,title);centerControlDiv.index=1;map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);}
GoogleMap._map=map;Layout.resize();}
GoogleMap._getOffset=function(){var obj=_get('map_canvas');if(obj!=null&&GoogleMap._map!=null){var center=GoogleMap._map.getCenter();return{lat:center.lat(),lng:center.lng(),zoom:GoogleMap._map.getZoom()};}else{return null;}}
GoogleMap.onItemClick=function(marker){if(marker.html!=null){if(GoogleMap.info!=null)GoogleMap.info.close();GoogleMap.info=new google.maps.InfoWindow({content:marker.html});GoogleMap.info.open(GoogleMap._map,marker);}}
GoogleMap.addPath=function(map,item){var points=[];var parts=item.geo.split("|");for(var i=0;i<parts.length;i++){var geo=parts[i];var pt=Map._parsePoint(geo);if(pt!=null)points.push(new google.maps.LatLng(pt.lat,pt.lng));}
var color=(item.style!=null&&item.style.color!=null)?item.style.color:"#00B3FD";var path=new google.maps.Polyline({path:points,strokeColor:color,strokeOpacity:1.0,strokeWeight:3});path.setMap(map);}
GoogleMap._getIcon=function(style){if(GoogleMap.PINS==null){var PINS=[];PINS["user_blue"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_blue.png");PINS["user_green"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_green.png");PINS["user_gray"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_gray.png");PINS["user_red"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_red.png");PINS["user_orange"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_orange.png");PINS["user_yellow"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_yellow.png");PINS["user_purple"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_purple.png");PINS["user_brown"]=new google.maps.MarkerImage(User.BASE_URL+"js/user_brown.png");GoogleMap.PINS=PINS;}
var img=style["img"];var backColor=style["background-color"];if(backColor==null)backColor=Color.RED;if(backColor==Color.GRAY)backColor='gray'
else if(backColor==Color.RED)backColor='#DD4337';else if(backColor==Color.GREEN)backColor='#129D5A';else if(backColor==Color.BLUE)backColor='#4286F5';else if(backColor==Color.YELLOW)backColor='#F6B501';var pin=GoogleMap.PINS[img];if(pin!=null)return pin;var path;if(img=="circle"||img==null)path=google.maps.SymbolPath.CIRCLE;var icon={path:path,fillOpacity:1,fillColor:backColor,strokeOpacity:1.0,strokeWeight:2.0,strokeColor:'white',scale:12}
return icon;}
GoogleMap._getColor=function(color){if(color=="red"||"markerred")return"FE2232";else if(color=="orange")return"FFAF00";else if(color=="green")return"00A256";else if(color=="blue"||"markerblue")return"326BBB";else if(color=="gray")return"FFFFFF";else if(color=="yellow")return"FFAF00";else if(color=="black")return"326BBB";else if(color!=null&&color.length>1)return color.substring(1);else return"FE2232";}
function Label(opt_options){this.setValues(opt_options);var span=this.span_=document.createElement('span');span.style.cssText='position: relative; left: 20%; top: -20px; '+'white-space: nowrap;color:#ffffff;'+'padding: 2px;padding-right: 5px;padding-left:5px;font-family: Arial; font-weight: bold;'+'background:#5C5C5C;border-radius:5px;'+'font-size: 12px;';var div=this.div_=document.createElement('div');div.appendChild(span);div.style.cssText='position: absolute; display: none';};function evalLabel(){Label.prototype=new google.maps.OverlayView();Label.prototype.onAdd=function(){var pane=this.getPanes().overlayImage;pane.appendChild(this.div_);var me=this;this.listeners_=[google.maps.event.addListener(this,'position_changed',function(){me.draw();}),google.maps.event.addListener(this,'text_changed',function(){me.draw();}),google.maps.event.addListener(this,'zindex_changed',function(){me.draw();})];};Label.prototype.onRemove=function(){this.div_.parentNode.removeChild(this.div_);for(var i=0,I=this.listeners_.length;i<I;++i){google.maps.event.removeListener(this.listeners_[i]);}};Label.prototype.draw=function(){var projection=this.getProjection();var position=projection.fromLatLngToDivPixel(this.get('position'));var div=this.div_;div.style.left=position.x+'px';div.style.top=position.y+'px';div.style.display='block';div.style.zIndex=this.get('zIndex');this.span_.innerHTML=this.get('text').toString();};}
function MapTitleControl(controlDiv,title){var controlUI=document.createElement('div');controlUI.style.backgroundColor='#fff';controlUI.style.border='2px solid #fff';controlUI.style.borderRadius='3px';controlUI.style.boxShadow='0 2px 6px rgba(0,0,0,.3)';controlUI.style.cursor='pointer';controlUI.style.marginBottom='22px';controlUI.style.textAlign='center';controlDiv.appendChild(controlUI);var controlText=document.createElement('div');controlText.style.color='rgb(25,25,25)';controlText.style.fontFamily='Roboto,Arial,sans-serif';controlText.style.fontSize='16px';controlText.style.lineHeight='38px';controlText.style.paddingLeft='5px';controlText.style.paddingRight='5px';controlText.innerHTML=title;controlUI.appendChild(controlText);}
function ImageMarker(){}
ImageMarker.create=function(item,imageWidth,imageHeight){if(ImageMarker.isZoneMarker(item)){return ImageMarker.createZone(item,imageWidth,imageHeight);}
var backcolor=item.style["background-color"];if(backcolor==null&&bordercolor==null){backcolor=Color.BLUE;}
var bordercolor=item.style["border-color"];var img=item.style["img"];var obj=document.createElement("div");obj.setAttribute("onclick",_func("Engine.eval",item.onclick));obj.setAttribute("title",item.title);if(backcolor){var style2="opacity:0.9;background-color:"+backcolor;var inner=[];if(img!=null&&img!=""){img="w-"+img;inner.push('<div class="img" style="',style2,'">','<div style="margin:2px" class='+img+'></div>','</div>');}else{inner.push('<div class="inside" style="',style2,'">',item.style["count"],'</div>');}
obj.className="fillcircle";obj.innerHTML=inner.join("");}else if(bordercolor){obj.className="circle";obj.style="border-color:"+bordercolor+";color:"+bordercolor;obj.innerText=item.style["count"];}
item.point=ImageMarker.parsePoint(item.geo,imageWidth,imageHeight);return obj;}
ImageMarker.parsePoint=function(geo,imageWidth,imageHeight){var point={x:0,y:0};if(geo==null)return point;var parts=geo.split(",");if(parts.length==2){var x=parseFloat(parts[0]);var y=parseFloat(parts[1]);point.x=Math.round(x*imageWidth/100);point.y=Math.round(y*imageHeight/100);}
if(isNaN(point.x))point.x=0;if(isNaN(point.y))point.y=0;return point;}
ImageMarker.isZoneMarker=function(item){return item.geo.split(",").length>=4;}
ImageMarker.createZone=function(item,imageWidth,imageHeight){var backcolor=Color.RED;var obj=document.createElement("div");obj.setAttribute("onclick",_func("Engine.eval",item.onclick));obj.setAttribute("title",item.title);var style2="opacity:0.9;background-color:"+backcolor;var inner=[];img="w-edit";inner.push('<div class="img" style="',style2,'">','<div style="margin:2px" class='+img+'></div>','</div>');obj.className="zone";obj.style.border="3px solid red";item.rect=ImageMarker.parseRect(item.geo,imageWidth,imageHeight);return obj;}
ImageMarker.parseRect=function(geo,imageWidth,imageHeight){var rect={x1:0,y1:0,x2:0,y2:0};if(geo==null)return point;var parts=geo.split(",");if(parts.length>=4){var x1=parseFloat(parts[0]);var y1=parseFloat(parts[1]);var x2=parseFloat(parts[2]);var y2=parseFloat(parts[3]);rect.x1=Math.round(x1*imageWidth/100);rect.y1=Math.round(y1*imageHeight/100);rect.x2=Math.round(x2*imageWidth/100);rect.y2=Math.round(y2*imageHeight/100);}
if(isNaN(rect.x1))rect.x1=0;if(isNaN(rect.y1))rect.y1=0;if(isNaN(rect.x2))rect.x2=0;if(isNaN(rect.y2))rect.y2=0;rect.width=(rect.x2-rect.x1)/2;rect.height=(rect.y2-rect.y1)/2;return rect;}
var sPlanViewer=new ImageViewer("_PLAN_TAG","white");var sPhotoViewer=new ImageViewer("_PHOTO_TAG");function ImageViewer(tag,color){this.TAG=tag;this.backcolor=color;this.fileid=null;this.version=null;this.imgObj=null;this.zoomInObj=null;this.zoomOutObj=null;this.previousEvent=null;this.isDragging=false;this.bgRect={x:0,y:0,width:0,height:0};this.naturalWidth;this.naturalHeight;this.bgInitialWidth=0;this.bgInitialHeight=0;this.markers=[];this.tittle=null;}
ImageViewer.prototype.write=function(fileid,style){_html.push('<div id="',this.TAG,'" fileid="',fileid,'" />');}
ImageViewer.prototype.setTitle=function(title){this.title=title;}
ImageViewer.prototype.afterShow=function(){var placeholder=_get(this.TAG);if(placeholder==null){this.markers=[];return;}else{this.markers=Map.items;Map.items=[];}
if(this.imgObj==null){this.imgObj=document.createElement("div");this.imgObj.id="imgview";if(this.backcolor!=null)this.imgObj.style.backgroundColor=this.backcolor;document.body.appendChild(this.imgObj);this.imgObj.addEventListener("mousewheel",this.mouseWheel.bind(this),false);this.imgObj.addEventListener('mousedown',this.mouseDown.bind(this),false);this.imgObj.addEventListener('mousemove',this.mouseMove.bind(this),false);this.imgObj.addEventListener('mouseup',this.mouseUp.bind(this),false);this.imgObj.addEventListener('dblclick',this.mouseDoubleClick.bind(this),false);this.zoomInObj=document.createElement("div");this.zoomInObj.id="zoomin";this.zoomInObj.innerHTML="+";this.zoomInObj.addEventListener('click',this.zoomIn.bind(this),false);this.zoomOutObj=document.createElement("div");this.zoomOutObj.id="zoomout";this.zoomOutObj.innerHTML="-";this.zoomOutObj.addEventListener('click',this.zoomOut.bind(this),false);}
this.imgObj.innerHTML="";this.imgObj.appendChild(this.zoomInObj);this.imgObj.appendChild(this.zoomOutObj);var fileid=placeholder.getAttribute("fileid");var file=Query.selectId("System.files",fileid);if(file==null)return;var key=file.id+":"+file.version;if(this.key==key){placeholder.parentNode.replaceChild(this.imgObj,placeholder);this.createMarkers();this.redraw(this.bgRect);return;}else{this.fileid=fileid;this.key=key;this.imgObj.style.backgroundImage="";placeholder.parentNode.replaceChild(this.imgObj,placeholder);}
var aThis=this;Cache.storage.getImage(key,function(blob){if(blob!=null){aThis.show(blob);}else{var url=Settings.getFileUrl(file.id);Loader.downloadImage(url,function(blob){aThis.show(blob);Cache.storage.saveImage(key,blob);});}});}
ImageViewer.prototype.show=function(blob){var url=URL.createObjectURL(blob);var aThis=this;var img=new Image();img.onload=function(){aThis.onImageLoaded(img);};Toast.showProgress("Loading...");img.src=url;}
ImageViewer.prototype.onImageLoaded=function(img){this.naturalWidth=img.naturalWidth;this.naturalHeight=img.naturalHeight;var rect=this.initPosition();this.bgInitialWidth=rect.width;this.bgInitialHeight=rect.height;this.imgObj.style.backgroundImage="url("+img.src+")";this.createMarkers();this.redraw(rect);Toast.hideProgress();}
ImageViewer.prototype.initPosition=function(){var scale=1;var scaleX=this.imgObj.clientWidth/this.naturalWidth;var scaleY=this.imgObj.clientHeight/this.naturalHeight;if(scaleX>=1&&scaleY>=1)scale=1;else if(scaleX<scaleY)scale=scaleX;else scale=scaleY;var rect={};rect.width=Math.round(this.naturalWidth*scale);rect.height=Math.round(this.naturalHeight*scale);rect.x=Math.round((this.imgObj.clientWidth-rect.width)/2);rect.y=Math.round((this.imgObj.clientHeight-rect.height)/2);return rect;}
ImageViewer.prototype.mouseDown=function(event){if(this.bgRect.width<=this.imgObj.clientWidth&&this.bgRect.height<=this.imgObj.clientHeight)this.isDragging=false;else this.isDragging=true;this.imgObj.style.cursor=this.isDragging?"move":"";this.previousEvent=event;event.preventDefault();return false;}
ImageViewer.prototype.mouseUp=function(event){this.isDragging=false;this.previousEvent=null;this.imgObj.style.cursor="";event.preventDefault();return false;}
ImageViewer.prototype.mouseMove=function(event){if(this.isDragging==false)return true;var rect={};rect.x=this.bgRect.x+(event.pageX-this.previousEvent.pageX);rect.y=this.bgRect.y+(event.pageY-this.previousEvent.pageY);rect.width=this.bgRect.width;rect.height=this.bgRect.height;this.redraw(rect);this.previousEvent=event;event.preventDefault();console.log("mouseMove "+JSON.stringify(rect));return false;}
ImageViewer.prototype.mouseWheel=function(event){var delta=event.wheelDelta>0?1:-1;var offset=this.getOffset(event);this.zoom(delta,offset.x,offset.y);event.preventDefault();return false;}
ImageViewer.prototype.getOffset=function(event){var point={x:event.offsetX,y:event.offsetY};var parent=event.target;while(parent!=null&&parent.id!="imgview"){point.x+=parent.offsetLeft;point.y+=parent.offsetTop;parent=parent.offsetParent}
return point;}
ImageViewer.prototype.zoom=function(delta,offsetX,offsetY){var bgCursorX=offsetX-this.bgRect.x;var bgCursorY=offsetY-this.bgRect.y;var bgRatioX=bgCursorX/this.bgRect.width;var bgRatioY=bgCursorY/this.bgRect.height;var ZOOM=0.2;var factor=1;if(delta=="max")factor=this.naturalWidth/this.bgRect.width;else if(delta>0)factor=(1+ZOOM);else if(delta<0)factor=(1-ZOOM);var rect={};rect.width=Math.round(this.bgRect.width*factor);rect.height=Math.round(this.bgRect.height*factor);rect.x=offsetX-Math.round(rect.width*bgRatioX);rect.y=offsetY-Math.round(rect.height*bgRatioY);var scale=rect.width/this.naturalWidth;if(delta>0&&scale>=3){console.log("Reached Max zoom");return;}
scale=rect.width/this.bgInitialWidth;if(delta<0&&scale<=1){console.log("Min zoom reached: reset");rect=this.initPosition();}
console.log("zoom "+JSON.stringify(rect));this.redraw(rect);}
ImageViewer.prototype.zoomToPoint=function(contentX,contentY){var rect={};rect.x=-contentX+this.imgObj.clientWidth/2;rect.y=-contentY+this.imgObj.clientHeight/2;rect.width=this.naturalWidth;rect.height=this.naturalHeight;this.redraw(rect);}
ImageViewer.prototype.mouseDoubleClick=function(event){if(event.target.id!="imgview")return false;var scale=this.bgRect.width/this.bgInitialWidth;if(scale>1){console.log("zoom to fit");this.reset(event);}else{var offsetX=event.offsetX;var offsetY=event.offsetY;console.log("zoom to max");this.zoom("max",offsetX,offsetY);}
event.preventDefault();return false;}
ImageViewer.prototype.redraw=function(rect,smooth){this.imgObj.style.transition=(smooth==true)?"all 0.5s":"";this.bgRect=rect;this.imgObj.style.backgroundPosition=rect.x+'px '+rect.y+'px';this.imgObj.style.backgroundSize=rect.width+'px '+rect.height+'px';this.redrawMarkers();}
ImageViewer.prototype.zoomIn=function(event){var offsetX=this.imgObj.clientWidth/2;var offsetY=this.imgObj.clientHeight/2;this.zoom(1,offsetX,offsetY);event.preventDefault();return false;}
ImageViewer.prototype.zoomOut=function(event){var offsetX=this.imgObj.clientWidth/2;var offsetY=this.imgObj.clientHeight/2;this.zoom(-1,offsetX,offsetY);event.preventDefault();return false;}
ImageViewer.prototype.reset=function(event){var rect=this.initPosition();this.redraw(rect,true);event.preventDefault();return false;}
ImageViewer.prototype.createMarkers=function(){for(var i=0;i<this.markers.length;i++){var marker=this.markers[i];marker.obj=ImageMarker.create(marker,this.naturalWidth,this.naturalHeight);this.imgObj.appendChild(marker.obj);}}
ImageViewer.prototype.redrawMarkers=function(){for(var i=0;i<this.markers.length;i++){var marker=this.markers[i];this.redrawMarker(marker);}}
ImageViewer.prototype.redrawMarker=function(marker){var scale=this.bgRect.width/this.naturalWidth;if(marker.point!=null){var x=Math.floor(this.bgRect.x+marker.point.x*scale);var y=Math.floor(this.bgRect.y+marker.point.y*scale);var MARKER_SIZE=marker.obj.offsetWidth;x-=MARKER_SIZE/2;y-=MARKER_SIZE/2;marker.obj.style.left=x+'px';marker.obj.style.top=y+'px';}else if(marker.rect!=null){var x=Math.floor(this.bgRect.x+marker.rect.x1*scale);var y=Math.floor(this.bgRect.y+marker.rect.y1*scale);var width=Math.floor(marker.rect.width*scale);var height=Math.floor(marker.rect.height*scale);marker.obj.style.left=x+'px';marker.obj.style.top=y+'px';marker.obj.style.width=width+'px';marker.obj.style.height=height+'px';}}
ImageViewer.prototype.onResize=function(){if(_get("imgview")==null)return;if(this.imgObj==null)return;if(this.bgRect.x>=0||this.bgRect.y>0){var rect=this.initPosition();this.redraw(rect);}}
ImageViewer.prototype.toHtml=function(){var html=[];var url=Settings.getFileUrl(this.fileid);if(url.startsWith("http")==false){var base=window.location.href;var index=base.lastIndexOf("/");if(index>-1)base=base.substring(0,index);url=base+"/"+url;}
var width=1500;var scale=width/this.naturalWidth;var height=Math.floor(scale*this.naturalHeight);html.push('<div style="position:relative;width:',width,'px;height:',height,'px;background-size:',width,'px ',height,'px;background-image:url(',url,')">');for(var i=0;i<this.markers.length;i++){var marker=this.markers[i];if(marker.point){var left=Math.floor(marker.point.x*scale);var top=Math.floor(marker.point.y*scale);var label=marker.style["count"];if(label==null)label=i+1;var color=marker.style["background-color"];if(color==null)color=Color.BLUE;label=String(label);var fontsize=(label.length>2)?20:30;label='<div style="text-align:center;vertical-align:middle;line-height:40px;font-size:'+fontsize+'px;font-weight:bold;color:white">'+label+'</div>';html.push('<div style="position:absolute;left:',left,'px;top:',top,'px;background-color:',color,';xmargin:10px;width:40px;height:40px;border-radius:40px;">',label,'</div>');}else if(marker.rect){}}
html.push("</div>");return html.join("");}
function MarkerClusterer(map,opt_markers,opt_options){this.extend(MarkerClusterer,google.maps.OverlayView);this.map_=map;this.markers_=[];this.clusters_=[];this.sizes=[53,56,66,78,90];this.styles_=[];this.ready_=false;var options=opt_options||{};this.gridSize_=options['gridSize']||60;this.minClusterSize_=options['minimumClusterSize']||2;this.maxZoom_=options['maxZoom']||null;this.styles_=options['styles']||[];this.imagePath_=options['imagePath']||this.MARKER_CLUSTER_IMAGE_PATH_;this.imageExtension_=options['imageExtension']||this.MARKER_CLUSTER_IMAGE_EXTENSION_;this.zoomOnClick_=true;if(options['zoomOnClick']!=undefined){this.zoomOnClick_=options['zoomOnClick'];}
this.averageCenter_=false;if(options['averageCenter']!=undefined){this.averageCenter_=options['averageCenter'];}
this.setupStyles_();this.setMap(map);this.prevZoom_=this.map_.getZoom();var that=this;google.maps.event.addListener(this.map_,'zoom_changed',function(){var zoom=that.map_.getZoom();if(that.prevZoom_!=zoom){that.prevZoom_=zoom;that.resetViewport();}});google.maps.event.addListener(this.map_,'idle',function(){that.redraw();});if(opt_markers&&opt_markers.length){this.addMarkers(opt_markers,false);}}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_='https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/'+'images/m';MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_='png';MarkerClusterer.prototype.extend=function(obj1,obj2){return(function(object){for(var property in object.prototype){this.prototype[property]=object.prototype[property];}
return this;}).apply(obj1,[obj2]);};MarkerClusterer.prototype.onAdd=function(){this.setReady_(true);};MarkerClusterer.prototype.draw=function(){};MarkerClusterer.prototype.setupStyles_=function(){if(this.styles_.length){return;}
for(var i=0,size;size=this.sizes[i];i++){this.styles_.push({url:this.imagePath_+(i+1)+'.'+this.imageExtension_,height:size,width:size});}};MarkerClusterer.prototype.fitMapToMarkers=function(){var markers=this.getMarkers();var bounds=new google.maps.LatLngBounds();for(var i=0,marker;marker=markers[i];i++){bounds.extend(marker.getPosition());}
this.map_.fitBounds(bounds);};MarkerClusterer.prototype.setStyles=function(styles){this.styles_=styles;};MarkerClusterer.prototype.getStyles=function(){return this.styles_;};MarkerClusterer.prototype.isZoomOnClick=function(){return this.zoomOnClick_;};MarkerClusterer.prototype.isAverageCenter=function(){return this.averageCenter_;};MarkerClusterer.prototype.getMarkers=function(){return this.markers_;};MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length;};MarkerClusterer.prototype.setMaxZoom=function(maxZoom){this.maxZoom_=maxZoom;};MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_;};MarkerClusterer.prototype.calculator_=function(markers,numStyles){var index=0;var count=markers.length;var dv=count;while(dv!==0){dv=parseInt(dv/10,10);index++;}
index=Math.min(index,numStyles);return{text:count,index:index};};MarkerClusterer.prototype.setCalculator=function(calculator){this.calculator_=calculator;};MarkerClusterer.prototype.getCalculator=function(){return this.calculator_;};MarkerClusterer.prototype.addMarkers=function(markers,opt_nodraw){for(var i=0,marker;marker=markers[i];i++){this.pushMarkerTo_(marker);}
if(!opt_nodraw){this.redraw();}};MarkerClusterer.prototype.pushMarkerTo_=function(marker){marker.isAdded=false;if(marker['draggable']){var that=this;google.maps.event.addListener(marker,'dragend',function(){marker.isAdded=false;that.repaint();});}
this.markers_.push(marker);};MarkerClusterer.prototype.addMarker=function(marker,opt_nodraw){this.pushMarkerTo_(marker);if(!opt_nodraw){this.redraw();}};MarkerClusterer.prototype.removeMarker_=function(marker){var index=-1;if(this.markers_.indexOf){index=this.markers_.indexOf(marker);}else{for(var i=0,m;m=this.markers_[i];i++){if(m==marker){index=i;break;}}}
if(index==-1){return false;}
marker.setMap(null);this.markers_.splice(index,1);return true;};MarkerClusterer.prototype.removeMarker=function(marker,opt_nodraw){var removed=this.removeMarker_(marker);if(!opt_nodraw&&removed){this.resetViewport();this.redraw();return true;}else{return false;}};MarkerClusterer.prototype.removeMarkers=function(markers,opt_nodraw){var removed=false;for(var i=0,marker;marker=markers[i];i++){var r=this.removeMarker_(marker);removed=removed||r;}
if(!opt_nodraw&&removed){this.resetViewport();this.redraw();return true;}};MarkerClusterer.prototype.setReady_=function(ready){if(!this.ready_){this.ready_=ready;this.createClusters_();}};MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length;};MarkerClusterer.prototype.getMap=function(){return this.map_;};MarkerClusterer.prototype.setMap=function(map){this.map_=map;};MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_;};MarkerClusterer.prototype.setGridSize=function(size){this.gridSize_=size;};MarkerClusterer.prototype.getMinClusterSize=function(){return this.minClusterSize_;};MarkerClusterer.prototype.setMinClusterSize=function(size){this.minClusterSize_=size;};MarkerClusterer.prototype.getExtendedBounds=function(bounds){var projection=this.getProjection();var tr=new google.maps.LatLng(bounds.getNorthEast().lat(),bounds.getNorthEast().lng());var bl=new google.maps.LatLng(bounds.getSouthWest().lat(),bounds.getSouthWest().lng());var trPix=projection.fromLatLngToDivPixel(tr);trPix.x+=this.gridSize_;trPix.y-=this.gridSize_;var blPix=projection.fromLatLngToDivPixel(bl);blPix.x-=this.gridSize_;blPix.y+=this.gridSize_;var ne=projection.fromDivPixelToLatLng(trPix);var sw=projection.fromDivPixelToLatLng(blPix);bounds.extend(ne);bounds.extend(sw);return bounds;};MarkerClusterer.prototype.isMarkerInBounds_=function(marker,bounds){return bounds.contains(marker.getPosition());};MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport(true);this.markers_=[];};MarkerClusterer.prototype.resetViewport=function(opt_hide){for(var i=0,cluster;cluster=this.clusters_[i];i++){cluster.remove();}
for(var i=0,marker;marker=this.markers_[i];i++){marker.isAdded=false;if(opt_hide){marker.setMap(null);}}
this.clusters_=[];};MarkerClusterer.prototype.repaint=function(){var oldClusters=this.clusters_.slice();this.clusters_.length=0;this.resetViewport();this.redraw();window.setTimeout(function(){for(var i=0,cluster;cluster=oldClusters[i];i++){cluster.remove();}},0);};MarkerClusterer.prototype.redraw=function(){this.createClusters_();};MarkerClusterer.prototype.distanceBetweenPoints_=function(p1,p2){if(!p1||!p2){return 0;}
var R=6371;var dLat=(p2.lat()-p1.lat())*Math.PI/180;var dLon=(p2.lng()-p1.lng())*Math.PI/180;var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(p1.lat()*Math.PI/180)*Math.cos(p2.lat()*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;};MarkerClusterer.prototype.addToClosestCluster_=function(marker){var distance=40000;var clusterToAddTo=null;var pos=marker.getPosition();for(var i=0,cluster;cluster=this.clusters_[i];i++){var center=cluster.getCenter();if(center){var d=this.distanceBetweenPoints_(center,marker.getPosition());if(d<distance){distance=d;clusterToAddTo=cluster;}}}
if(clusterToAddTo&&clusterToAddTo.isMarkerInClusterBounds(marker)){clusterToAddTo.addMarker(marker);}else{var cluster=new Cluster(this);cluster.addMarker(marker);this.clusters_.push(cluster);}};MarkerClusterer.prototype.createClusters_=function(){if(!this.ready_){return;}
var mapBounds=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast());var bounds=this.getExtendedBounds(mapBounds);for(var i=0,marker;marker=this.markers_[i];i++){if(!marker.isAdded&&this.isMarkerInBounds_(marker,bounds)){this.addToClosestCluster_(marker);}}};function Cluster(markerClusterer){this.markerClusterer_=markerClusterer;this.map_=markerClusterer.getMap();this.gridSize_=markerClusterer.getGridSize();this.minClusterSize_=markerClusterer.getMinClusterSize();this.averageCenter_=markerClusterer.isAverageCenter();this.center_=null;this.markers_=[];this.bounds_=null;this.clusterIcon_=new ClusterIcon(this,markerClusterer.getStyles(),markerClusterer.getGridSize());}
Cluster.prototype.isMarkerAlreadyAdded=function(marker){if(this.markers_.indexOf){return this.markers_.indexOf(marker)!=-1;}else{for(var i=0,m;m=this.markers_[i];i++){if(m==marker){return true;}}}
return false;};Cluster.prototype.addMarker=function(marker){if(this.isMarkerAlreadyAdded(marker)){return false;}
if(!this.center_){this.center_=marker.getPosition();this.calculateBounds_();}else{if(this.averageCenter_){var l=this.markers_.length+1;var lat=(this.center_.lat()*(l-1)+marker.getPosition().lat())/l;var lng=(this.center_.lng()*(l-1)+marker.getPosition().lng())/l;this.center_=new google.maps.LatLng(lat,lng);this.calculateBounds_();}}
marker.isAdded=true;this.markers_.push(marker);var len=this.markers_.length;if(len<this.minClusterSize_&&marker.getMap()!=this.map_){marker.setMap(this.map_);}
if(len==this.minClusterSize_){for(var i=0;i<len;i++){this.markers_[i].setMap(null);}}
if(len>=this.minClusterSize_){marker.setMap(null);}
this.updateIcon();return true;};Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_;};Cluster.prototype.getBounds=function(){var bounds=new google.maps.LatLngBounds(this.center_,this.center_);var markers=this.getMarkers();for(var i=0,marker;marker=markers[i];i++){bounds.extend(marker.getPosition());}
return bounds;};Cluster.prototype.remove=function(){this.clusterIcon_.remove();this.markers_.length=0;delete this.markers_;};Cluster.prototype.getSize=function(){return this.markers_.length;};Cluster.prototype.getMarkers=function(){return this.markers_;};Cluster.prototype.getCenter=function(){return this.center_;};Cluster.prototype.calculateBounds_=function(){var bounds=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(bounds);};Cluster.prototype.isMarkerInClusterBounds=function(marker){return this.bounds_.contains(marker.getPosition());};Cluster.prototype.getMap=function(){return this.map_;};Cluster.prototype.updateIcon=function(){var zoom=this.map_.getZoom();var mz=this.markerClusterer_.getMaxZoom();if(mz&&zoom>mz){for(var i=0,marker;marker=this.markers_[i];i++){marker.setMap(this.map_);}
return;}
if(this.markers_.length<this.minClusterSize_){this.clusterIcon_.hide();return;}
var numStyles=this.markerClusterer_.getStyles().length;var sums=this.markerClusterer_.getCalculator()(this.markers_,numStyles);this.clusterIcon_.setCenter(this.center_);this.clusterIcon_.setSums(sums);this.clusterIcon_.show();};function ClusterIcon(cluster,styles,opt_padding){cluster.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView);this.styles_=styles;this.padding_=opt_padding||0;this.cluster_=cluster;this.center_=null;this.map_=cluster.getMap();this.div_=null;this.sums_=null;this.visible_=false;this.setMap(this.map_);}
ClusterIcon.prototype.triggerClusterClick=function(event){var markerClusterer=this.cluster_.getMarkerClusterer();google.maps.event.trigger(markerClusterer,'clusterclick',this.cluster_,event);if(markerClusterer.isZoomOnClick()){this.map_.fitBounds(this.cluster_.getBounds());}};ClusterIcon.prototype.onAdd=function(){this.div_=document.createElement('DIV');if(this.visible_){var pos=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(pos);this.div_.innerHTML=this.sums_.text;}
var panes=this.getPanes();panes.overlayMouseTarget.appendChild(this.div_);var that=this;google.maps.event.addDomListener(this.div_,'click',function(event){that.triggerClusterClick(event);});};ClusterIcon.prototype.getPosFromLatLng_=function(latlng){var pos=this.getProjection().fromLatLngToDivPixel(latlng);if(typeof this.iconAnchor_==='object'&&this.iconAnchor_.length===2){pos.x-=this.iconAnchor_[0];pos.y-=this.iconAnchor_[1];}else{pos.x-=parseInt(this.width_/2,10);pos.y-=parseInt(this.height_/2,10);}
return pos;};ClusterIcon.prototype.draw=function(){if(this.visible_){var pos=this.getPosFromLatLng_(this.center_);this.div_.style.top=pos.y+'px';this.div_.style.left=pos.x+'px';}};ClusterIcon.prototype.hide=function(){if(this.div_){this.div_.style.display='none';}
this.visible_=false;};ClusterIcon.prototype.show=function(){if(this.div_){var pos=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(pos);this.div_.style.display='';}
this.visible_=true;};ClusterIcon.prototype.remove=function(){this.setMap(null);};ClusterIcon.prototype.onRemove=function(){if(this.div_&&this.div_.parentNode){this.hide();this.div_.parentNode.removeChild(this.div_);this.div_=null;}};ClusterIcon.prototype.setSums=function(sums){this.sums_=sums;this.text_=sums.text;this.index_=sums.index;if(this.div_){this.div_.innerHTML=sums.text;}
this.useStyle();};ClusterIcon.prototype.useStyle=function(){var index=Math.max(0,this.sums_.index-1);index=Math.min(this.styles_.length-1,index);var style=this.styles_[index];this.url_=style['url'];this.height_=style['height'];this.width_=style['width'];this.textColor_=style['textColor'];this.anchor_=style['anchor'];this.textSize_=style['textSize'];this.backgroundPosition_=style['backgroundPosition'];this.iconAnchor_=style['iconAnchor'];};ClusterIcon.prototype.setCenter=function(center){this.center_=center;};ClusterIcon.prototype.createCss=function(pos){var style=[];style.push('background-image:url('+this.url_+');');var backgroundPosition=this.backgroundPosition_?this.backgroundPosition_:'0 0';style.push('background-position:'+backgroundPosition+';');if(typeof this.anchor_==='object'){if(typeof this.anchor_[0]==='number'&&this.anchor_[0]>0&&this.anchor_[0]<this.height_){style.push('height:'+(this.height_-this.anchor_[0])+'px; padding-top:'+this.anchor_[0]+'px;');}else if(typeof this.anchor_[0]==='number'&&this.anchor_[0]<0&&-this.anchor_[0]<this.height_){style.push('height:'+this.height_+'px; line-height:'+(this.height_+this.anchor_[0])+'px;');}else{style.push('height:'+this.height_+'px; line-height:'+this.height_+'px;');}
if(typeof this.anchor_[1]==='number'&&this.anchor_[1]>0&&this.anchor_[1]<this.width_){style.push('width:'+(this.width_-this.anchor_[1])+'px; padding-left:'+this.anchor_[1]+'px;');}else{style.push('width:'+this.width_+'px; text-align:center;');}}else{style.push('height:'+this.height_+'px; line-height:'+
this.height_+'px; width:'+this.width_+'px; text-align:center;');}
var txtColor=this.textColor_?this.textColor_:'black';var txtSize=this.textSize_?this.textSize_:11;style.push('cursor:pointer; top:'+pos.y+'px; left:'+
pos.x+'px; color:'+txtColor+'; position:absolute; font-size:'+
txtSize+'px; font-family:Arial,sans-serif; font-weight:bold');return style.join('');};window['MarkerClusterer']=MarkerClusterer;MarkerClusterer.prototype['addMarker']=MarkerClusterer.prototype.addMarker;MarkerClusterer.prototype['addMarkers']=MarkerClusterer.prototype.addMarkers;MarkerClusterer.prototype['clearMarkers']=MarkerClusterer.prototype.clearMarkers;MarkerClusterer.prototype['fitMapToMarkers']=MarkerClusterer.prototype.fitMapToMarkers;MarkerClusterer.prototype['getCalculator']=MarkerClusterer.prototype.getCalculator;MarkerClusterer.prototype['getGridSize']=MarkerClusterer.prototype.getGridSize;MarkerClusterer.prototype['getExtendedBounds']=MarkerClusterer.prototype.getExtendedBounds;MarkerClusterer.prototype['getMap']=MarkerClusterer.prototype.getMap;MarkerClusterer.prototype['getMarkers']=MarkerClusterer.prototype.getMarkers;MarkerClusterer.prototype['getMaxZoom']=MarkerClusterer.prototype.getMaxZoom;MarkerClusterer.prototype['getStyles']=MarkerClusterer.prototype.getStyles;MarkerClusterer.prototype['getTotalClusters']=MarkerClusterer.prototype.getTotalClusters;MarkerClusterer.prototype['getTotalMarkers']=MarkerClusterer.prototype.getTotalMarkers;MarkerClusterer.prototype['redraw']=MarkerClusterer.prototype.redraw;MarkerClusterer.prototype['removeMarker']=MarkerClusterer.prototype.removeMarker;MarkerClusterer.prototype['removeMarkers']=MarkerClusterer.prototype.removeMarkers;MarkerClusterer.prototype['resetViewport']=MarkerClusterer.prototype.resetViewport;MarkerClusterer.prototype['repaint']=MarkerClusterer.prototype.repaint;MarkerClusterer.prototype['setCalculator']=MarkerClusterer.prototype.setCalculator;MarkerClusterer.prototype['setGridSize']=MarkerClusterer.prototype.setGridSize;MarkerClusterer.prototype['setMaxZoom']=MarkerClusterer.prototype.setMaxZoom;MarkerClusterer.prototype['onAdd']=MarkerClusterer.prototype.onAdd;MarkerClusterer.prototype['draw']=MarkerClusterer.prototype.draw;Cluster.prototype['getCenter']=Cluster.prototype.getCenter;Cluster.prototype['getSize']=Cluster.prototype.getSize;Cluster.prototype['getMarkers']=Cluster.prototype.getMarkers;ClusterIcon.prototype['onAdd']=ClusterIcon.prototype.onAdd;ClusterIcon.prototype['draw']=ClusterIcon.prototype.draw;ClusterIcon.prototype['onRemove']=ClusterIcon.prototype.onRemove;function MatrixChart(){}
MatrixChart.onclick=null;MatrixChart.show=function(map){var SEVERITY=["Very Low<br/>Severity","Low<br/>Severity","Medium<br/>Severity","High<br/>Severity","Very High<br/>Severity"];var PROBA=["Very Low<br/>Probability","Low<br/>Probability","Medium<br/>Probability","High<br/>Probability","Very High<br/>Probability"];var buf=[];buf.push('<table cellspacing="0" class="matrix">');buf.push('<thead><tr><td></td>');for(var i=1;i<=5;i++){buf.push('<td>',SEVERITY[i-1],'</td>');}
buf.push('</tr></thead>');buf.push('<tbody>');for(var i=5;i>=1;i--){buf.push('<tr><td>',PROBA[i-1],'</td>');for(var j=1;j<=5;j++){var label=map.get(i+":"+j);var color=MatrixChart.getColor(i,j);var onclick=_func(MatrixChart.onclick,i,j);onclick=_func("Engine.eval",onclick);buf.push('<td class=value onclick="',onclick,'" style="background-color:',color,'">',label,'</td>');}
buf.push('</tr>');}
buf.push('</tbody></table>');_html.push(buf.join(''));}
MatrixChart.getColor=function(severity,probability){var value=severity*probability;if(value>=15)return Color.RED;else if(value>=10)return Color.ORANGE;else if(value>=4)return Color.YELLOW;else return Color.GREEN;}
function PopupList(parent){this.parent=parent;this.buf=new Array();this.height=null;this.align="left";this.isLastItemSeparator=true;this.count=0;this.write=function(html){this.buf.push(html);}
this.writeItem=function(label,onclick,param1,param2,param3){var onmouseover="PopupList.onmouseover(this)";var onmouseout="PopupList.onmouseout(this)";onclick=PopupList._makeOnClick(onclick,param1,param2,param3);this.buf.push('<a onmouseover="',onmouseover,'" onmouseout="',onmouseout,'" onclick="',onclick,'">',label,'</a>');this.isLastItemSeparator=false;this.count++;}
this.writeImageItem=function(img,label,onclick,param1,param2,param3){onclick=PopupList._makeOnClick(onclick,param1,param2,param3);this.buf.push('<div class=item onclick="',onclick,'">');this.buf.push(_icon(img),'<span class=label>',label,'</span></div>');this.isLastItemSeparator=false;this.count++;}
this.writeSeparator=function(title){if(this.isLastItemSeparator==false){this.isLastItemSeparator=true;this.buf.push('<div class=line></div>');if(title!=null)this.buf.push('<div class=septitle>',title,'</div>');}}
this.writeStop=function(){if(this.parent!=null&&PopupList.parent==this.parent)return;PopupList.hide();var popup=_get('popup2');if(popup!=null){popup.parentNode.removeChild(popup);popup=null;}
popup=document.createElement('div');popup.id='popup2';if(this.className!=null)popup.setAttribute("class",this.className);_get('toolbar').appendChild(popup);if(this.count>=12&&this.height==null)this.height="400px";if(this.height!=null){popup.style.maxHeight="400px";popup.style.overflow="scroll";popup.style.overflowX="hidden";}
_set('popup2',this.buf.join(''));this.buf=[''];_showBelowObj(popup,this.parent,this.align);PopupList.parent=this.parent;window.setTimeout(function(){document.body.onclick=PopupList.hide;},10);}}
PopupList.onmouseover=function(item){var sel=PopupList.getSelectedNode(item.parentNode);if(sel!=null)sel.className="";item.className="selected";}
PopupList.onmouseout=function(item){item.className="";}
PopupList.getVisibleNodes=function(parentNode){var nodes=parentNode.childNodes;var list=new Array();for(var i=1;i<nodes.length;i++){var node=nodes[i];if(node.style.display=="")list.push(node);if(node.className=="selected")list.selIndex=list.length-1;}
return list;}
PopupList.getSelectedNode=function(parentNode){var nodes=PopupList.getVisibleNodes(parentNode);if(nodes.selIndex!=-1)return nodes[nodes.selIndex];else return null;}
PopupList._makeOnClick=function(func,param1,param2,param3){var onclick=_writeJS(func,param1,param2,param3);onclick="Engine.eval("+esc(onclick)+",0,Engine._source)";return"PopupList.hide();"+onclick;}
PopupList.hide=function(){if(_get('popup2')){_hide('popup2');_set('popup2','');}
document.body.onclick=null;PopupList.parent=null;}
function QuickView(){}
QuickView.title=null;QuickView.onclick=null;QuickView.items=new Array();QuickView.links=new Array();QuickView._clear=function(){QuickView.title=null;QuickView.items=new Array();QuickView.links=new Array();}
QuickView.setTitle=function(title,onclick){QuickView.title=title;QuickView.onclick=onclick;}
QuickView.addItem=function(label){if(label!=null)QuickView.items.push({label:label});}
QuickView.addLink=function(label,onclick){QuickView.links.push({label:label,value:onclick});}
QuickView.addLinkPopup=function(id,label,onclick){QuickView.links.push({id:id,label:label,value:onclick});}
QuickView.writeStop=function(){var buf=[];buf.push('<div class="infowindow scrollfix">');buf.push('<div class=title>',QuickView.title,'</div>');for(var i=0;i<QuickView.items.length;i++){var item=QuickView.items[i];buf.push('<div class=popupmap><span class=label>',item.label,'</span>');if(item.id!=null){buf.push(QuickView.writeCombo(item));}else{if(item.value!=null)buf.push(": ",item.value);}
buf.push('</div>');}
for(var i=0;i<QuickView.links.length;i++){var link=QuickView.links[i];var onclick="event.cancelBubble=true;"+_func("Engine.eval",link.value);buf.push('<div class=link onclick="',onclick,'">',link.label,'</div>');}
var html=buf.join('');QuickView._clear();return html;}
QuickView.writeCombo=function(item){var buf=[];var options=item.options.split("|");for(var i=0;i<options.length;i++){var option=options[i];var parts=option.split(":");var value=parts[0];var label=parts[1];var onclick=_writeJS(item.onchange,item.id,value);buf.push('<a onclick="',onclick,">",label,'</a>');}
return buf.join(', ');}
function Scheduler(){}
Scheduler.onEventMoved=function(projectid,eventid){}
Scheduler.onNewEvent=function(projectid,user){}
Scheduler.reset=function(){Scheduler.projects=[];Scheduler.users=[];Scheduler.eventMap=new HashMap();Scheduler.allocatedUserMap=new HashMap();}
Scheduler.addProject=function(id,name,onclick){Scheduler.projects.push({id:id,name:name,onclick:onclick});}
Scheduler.addUser=function(name,jobtitle){Scheduler.users.push({name:name,jobtitle:jobtitle});}
Scheduler.addEvent=function(id,name,projectid,user,onclick){var event={id:id,name:name,projectid:projectid,user:user,onclick:onclick};var list=Scheduler.eventMap.get(projectid);if(list==null){list=[];Scheduler.eventMap.set(projectid,list);}
list.push(event);Scheduler.allocatedUserMap.set(user,projectid);}
Scheduler.show=function(){var pageWidth=_get('one').clientWidth;var width=pageWidth-200;_html.push('<div id="scheduler">');_html.push('<div id="resleft" style="width:',width,'px">');_html.push('<table cellpadding=0 cellspacing=0>');_html.push('<thead><tr><td class="label">',"Projects",'</td><td>',"Staff",'</td></tr></thead>');for(var i=0;i<Scheduler.projects.length;i++){var project=Scheduler.projects[i];var events=Scheduler.eventMap.get(project.id);Scheduler.writeLine(project,events);}
_html.push('</table>');_html.push('</div>');_html.push('<div id="resright"ondragover="event.preventDefault()" ondrop="Scheduler.drop(null)">');for(var i=0;i<Scheduler.users.length;i++){var user=Scheduler.users[i];if(Scheduler.allocatedUserMap.get(user.name)==null){Scheduler.writeUser(user);}}
_html.push('</div>');_html.push('</div>');}
Scheduler.writeLine=function(project,events){var onclick=project.onclick?onclick="Engine.eval("+esc(project.onclick)+",0,event)":"";var ondrop=_func("Scheduler.drop",project.id);var img='<span style="margin-left:20px;margin-right:20px">'+_icon("project")+"</span> ";_html.push('<tr ondragover="event.preventDefault()" ondrop="',ondrop,'"><td class="label" onclick="',onclick,'">',img,project.name,'</td><td>');if(events!=null){for(var i=0;i<events.length;i++){var event=events[i];_html.push(Scheduler.formatEvent(event));}}
_html.push('</td></tr>');}
Scheduler.formatEvent=function(event){var onclick=event.onclick?onclick="Engine.eval("+esc(event.onclick)+",0,event)":"";var ondrag=_func("Scheduler.drag",event.id,null);var style="background-color:"+Color.GREEN;var buf=[];var label=event.user;if(event.name)label+=" "+event.name;buf.push('<div class=entry draggable=true ondrag="',ondrag,'" onclick="',onclick,'" style="',style,'">',_icon("contact","white"),'<span>',label,'</span></div>');return buf.join("");}
Scheduler.writeUser=function(user){var ondrag=_func("Scheduler.drag",null,user.name);var style="background-color:"+Color.BLUE;var label=user.name;if(user.jobtitle)label+=" ("+user.jobtitle+")";_html.push('<div class=entry draggable=true ondrag="',ondrag,'" style="',style,'">',_icon("contact","white"),'<span>',label,'</span></div>');}
Scheduler.onResize=function(width,height){var container=_get("scheduler");if(container==null)return;height-=35+40;width-=220+1;var resright=_get("resright");if(resright==null)return;resright.style.height=height+"px";_get("resleft").style.height=height+"px";_get("resleft").style.width=width+"px";}
Scheduler._getOffset=function(){var obj=_get('resleft');if(obj==null)return null;return obj.scrollTop;}
Scheduler.afterShow=function(){var offset=History.current()?History.current().offset:null;if(!offset)return;var obj=_get('resleft');if(obj==null)return;obj.scrollTop=offset;}
Scheduler.dragEventId=null;Scheduler.dragUser=null;Scheduler.ctrlKey=false;Scheduler.drag=function(eventid,user){Scheduler.dragEventId=eventid;Scheduler.dragUser=user;Scheduler.ctrlKey=false;}
Scheduler.drop=function(projectid){Scheduler.ctrlKey=event.ctrlKey;var func;if(Scheduler.onEventMoved&&Scheduler.dragEventId)func=_func(Scheduler.onEventMoved,projectid,Scheduler.dragEventId);if(Scheduler.onNewEvent&&Scheduler.dragUser)func=_func(Scheduler.onNewEvent,projectid,Scheduler.dragUser);if(func)Engine.eval(func);Scheduler.dragEntryId=null;Scheduler.dragUser=null;Scheduler.ctrlKey=false;}
var _html=[''];function U_show(id){if(id==undefined)id='one';var cur=History.current();if(cur!=null)cur.nextprevious=NextPrevious.list;NextPrevious.list=[];_set("toolbar",Toolbar.getLeftContent());_set('onefilter',Toolbar.getRightContent());var tabs=Toolbar.getTabContent();if(tabs=="")_hide('tabbar');else{_set('tabbar',tabs);_show('tabbar');}
Engine.toolbarMoreItems=Toolbar.moreItems;_set(id,_html.join(""));_html=[''];Layout.resize();Format._print=false;AutoSave.stop();var one=_get("one");if(one!=null)one.addEventListener("scroll",function(e){ComboList.hide();PopupList.hide();});FilePicker.afterShow();sPlanViewer.afterShow();sPhotoViewer.afterShow();Thumbnail.afterShow();if(Map.afterShow)Map.afterShow();Chart.afterShow();Scheduler.afterShow();var setFocus=true;if(History.current()&&History.current().offset>0)setFocus=false;if(typeof(Forms)!="undefined"){if(Forms.FOCUS_ID){var obj=_get("cb_"+Forms.FOCUS_ID);if(obj==null)obj=_get("_"+Forms.FOCUS_ID+"_date");if(obj==null)obj=_get("_"+Forms.FOCUS_ID+"_time");if(obj==null)obj=_get(Forms.FOCUS_ID);Forms.FOCUS_ID=null;if(obj){obj.focus();return;}}}
if(setFocus==true)setTimeout("afterShow();",10);}
function afterShow(){Form.setFocus();TextBox.resizeTextArea();}
function _showPopup(title,buttons){var popup=_get('popup');var one=_get('one');if(popup!=null){popup.parentNode.removeChild(popup);popup=null;}
popup=document.createElement('div');popup.id='popup';one.insertBefore(popup,one.childNodes[0]);_hide("tabbar");if(title==null)title="";var buf=[];buf=[];buf.push('<div class="paneheader"><div onclick="_hidePopup()">',_icon("close"),'</div><div class="title">',title,"</div></div>");buf.push('<div class="panecontent">',_html.join(""),'</div>');if(buttons!=null)buf.push('<div class="panefooter">',buttons,'</div>');_set('popup',buf.join(''));_html=[''];setTimeout("afterShow();",100);}
function _hidePopup(){_hide('popup');History.reload();}
function _show(id){_get(id).style.display='';}
function _hide(id){_get(id).style.display='none';}
function _toggle(id){var display=(_get(id).style.display=='')?'none':'';_get(id).style.display=display;LocalSettings.set('display.'+id,display);}
function _get(id){return document.getElementById(id);}
function _set(id,html){var obj=_get(id);if(obj!=null)obj.innerHTML=html;}
function _remove(id){var obj=_get(id);obj.parentNode.removeChild(obj);}
function _pos(obj){var pos=new Object();pos.left=0;pos.top=0;pos.width=obj.offsetWidth;pos.height=obj.offsetHeight;pos.left=obj.offsetLeft;pos.top=obj.offsetTop;var parent=obj.offsetParent;while(parent!=null){pos.top+=parent.offsetTop;pos.top-=parent.scrollTop;pos.left+=parent.offsetLeft;parent=parent.offsetParent;}
var parent=obj.parentNode;while(parent!=null){if(parent.className=="toolbox"){break;}
if(parent.id=="one"){pos.top-=List._getOffset();break;}
parent=parent.parentNode;}
pos.bottom=pos.top+pos.height;return pos;}
function _showBelowObj(obj,parentObj,align){if(parentObj==null)return _showCentered(obj);var pos;if(parentObj.pageX!=null){pos={left:parentObj.pageX+4,top:parentObj.pageY};pos.bottom=pos.top;}else{pos=_pos(parentObj);if(align=='right'){pos.left+=parentObj.offsetWidth-obj.offsetWidth;}}
if(align==null&&(pos.top+obj.offsetHeight)>window.innerHeight-50){align="top";}
obj.style.display='block';obj.style.left=pos.left+'px';if(align=="top"){obj.style.top=(pos.top-obj.offsetHeight)+'px';}else{obj.style.top=pos.bottom+'px';}}
function _showCentered(obj){var one=_get("one");var pos=_pos(one);obj.style.display="block";obj.style.top=pos.top+Math.round((one.offsetHeight-obj.offsetHeight)/2)+'px';obj.style.left=pos.left+Math.round((one.offsetWidth-obj.offsetWidth)/2)+'px';}
function _getBestPosition(parentId,popupHeight){var pos=_pos(_get(parentId));var windowHeight=(window.innerHeight!=null)?window.innerHeight:document.body.clientHeight;if(pos.top+popupHeight-document.body.scrollTop<windowHeight){return"below";}else{return"top";}}
function _isVisible(obj){if(obj==null)return false;if(obj.style.visibility=='hidden'||obj.style.display=='none'){return false;}
var p=obj.parentNode;while(p&&p.tagName.toLowerCase()!='body'){if(p.style.visibility=='hidden'||p.style.display=='none'){return false;}
p=p.parentNode;}
return true;}
function _print(){var one=_get('one');if(one!=null)one.style.marginLeft="0px";var imgview=_get('imgview');if(imgview!=null)imgview.style.backgroundPositionX="0px";window.print();}
var _observe;if(window.attachEvent){_observe=function(element,event,handler){element.attachEvent('on'+event,handler);};}
else{_observe=function(element,event,handler){element.addEventListener(event,handler,false);};}
function _writeEmpty(message,label,onclick,label2,onclick2){_html.push('<div class=empty><h2>',message,'</h2>');if(label!=null)_html.push(_writeLink(label,onclick));if(label2!=null)_html.push(' '+R.OR+' ',_writeLink(label2,onclick2));_html.push('</div>');}
function _cleanPhone(number){var buffer='';for(var i=0;i<number.length;i++){var c=number.charAt(i);if(c=='+'||(c>='0'&&c<='9'))buffer+=c;}
var phoneCountryCode=_getUserPhoneCountryCode();if(buffer.charAt(0)!='+'&&phoneCountryCode!=0){buffer="+"+phoneCountryCode+buffer;}
return buffer;}
function _getUserPhoneCountryCode(){var code=User.countryCode;if(code=="FR")return 33;else if(code=="US")return 1;else if(code=="UK")return 44;else if(code=="SG")return 65;else if(code=="AU")return 61;else if(code=="DE")return 49;else if(code=="CH")return 41;else if(code=="IT")return 39;else if(code=="SE")return 46;else if(code=="NO")return 47;else if(code=="JP")return 81;else if(code=="IN")return 91;else if(code=="CN")return 86;else return 0;}
function _writeButton(label,onclick,param1,param2){onclick=_writeJS(onclick,param1,param2);return'<div tabindex=0 class=button onclick="'+onclick+'"><span>'+label+'</span></div>';}
function _writeBoldButton(label,onclick,param){onclick=_writeJS(onclick,param);var onkeydown="if (event.keyCode == 13) "+onclick;return'<div tabindex=0 class="button save" onkeydown="'+onkeydown+'" onclick="'+onclick+'"><span>'+label+'</span></div>';}
function _writeLink(label,onclick,param1,param2,className){onclick=_writeJS(onclick,param1,param2);if(className!=undefined){className=' class="'+className+'"';}else{className="";}
return'<a onclick="event.cancelBubble=true;'+onclick+'"'+className+'>'+label+'</a>';}
function getOptions(items,addNone){if(items==null||items.length==0)return"";var buf=[];if(addNone==null||addNone==true){buf.push(':'+R.NONE);}
for(var i=0;i<items.length;i++){var item=items[i];buf.push(item.id+':'+item.name);}
return buf.join('|');}
function getComboString(arrayValues){var buffer="";for(var i=0;i<arrayValues.length;i++){if(i>0)buffer+="|";buffer+=i+":"+arrayValues[i];}
return buffer;}
function _append(array,str){if(str==null||str=='')return;if(array.length>0)array.push(' ')
array.push(str);}
function Layout(){}
Layout.resize=function(){if(Debug.target=="phone"||Debug.target=="tablet")return;var header=_get('header');var left=_get('leftpane');var tabbar=_get('tabbar');var one=_get('one');var oneHeight=document.documentElement.clientHeight;if(header!=null)oneHeight-=header.clientHeight;if(left!=null)left.style.height=oneHeight+"px";if(tabbar!=null)oneHeight-=tabbar.clientHeight+1;if(one!=null)one.style.height=oneHeight+"px";var split1=_get("split1");var split2=_get("split2");if(split1!=null&&split2!=null){split1.style.width=(pageWidth()-240)/2+"px";split1.style.height=oneHeight+"px";split2.style.height=oneHeight+"px";}
var map=_get("map_canvas");if(map!=null){map.style.height=oneHeight+"px";}
sPhotoViewer.onResize()
sPlanViewer.onResize()
var width=Layout.mainPaneWidth();DayView.onResize(width,oneHeight);Scheduler.onResize(width,oneHeight);Calendar.onResize(width,oneHeight);}
window.onresize=Layout.resize;function pageWidth(){return document.documentElement.clientWidth;}
function leftpaneWidth(){var left=_get('leftpane');return(left!=null)?left.clientWidth:0;}
function headerHeight(){var header=_get('header');return header!=null?header.clientHeight:0;}
Layout.mainPaneWidth=function(){var one=_get('one');return one?one.clientWidth:0;}
Layout.pageHeight=function(){var header=_get('header');var tabbar=_get("tabbar");var height=document.documentElement.clientHeight-header.clientHeight-tabbar.clientHeight;return height;}
Layout.firstColumn=function(style){if(style==null)style="";List.ensureClose();_html.push('<table class="layout" style="',style,'"><tr><td class="col1">');}
Layout.secondColumn=function(){List.ensureClose();_html.push('</td><td class="col2">');}
Layout.stop=function(){List.ensureClose();_html.push('</td></tr></table>');}
function AccountSettings(){}
AccountSettings.get=function(name,defaultValue){var value="";var item=Query.selectId("System.settings",name);if(item!=null)value=item.value;else if(defaultValue!=null)value=defaultValue;return value;}
AccountSettings.set=function(name,value){var item=Query.selectId("System.settings",name);if(item==null){Query.insert("System.settings",{id:name,value:value});}else if(item.value!=value){Query.updateId("System.settings",name,"value",value);}}
AccountSettings.getBool=function(name,defaultValue){var value=AccountSettings.get(name,defaultValue);return value=="1";}
AccountSettings.getInt=function(name,defaultValue){var number=parseInt(AccountSettings.get(name));if(isNaN(number))number=defaultValue;return number;}
AccountSettings.setBool=function(name,yes){AccountSettings.set(name,yes?'1':'0');}
AccountSettings.getLogo=function(){var fileid=AccountSettings.get("logo");if(fileid==""){var files=Query.select("System.files","id","linkedrecid='logo'");if(files.length>0)fileid=files[0].id;AccountSettings.set("logo",fileid);}
return fileid;}
function Color(){}
Color.BLUE='#5794DA';Color.GREEN='#74B749';Color.ORANGE='#E66700';Color.YELLOW='#FFB400';Color.RED='#F1524C';Color.GRAY='#EEEEEE';Color.BROWN='#AC725E';Color.PURPLE='#7E53C6';Color.BLUEGRAY="#607D8B";Color.INDIGO="#3E50B4";Color.TEAL="#009587";Color.STRIKE='-1';Color.ALL=[Color.BLUE,Color.GREEN,Color.ORANGE,Color.RED,Color.PURPLE,Color.BROWN];Color.PASTELS=["#5B90BF","#96B5B4","#A3BE8C","#AB7967","#D08770","#B48EAD"]
Color.hexToRgb=function(hex){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?{r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)}:null;}
Color.opacity=function(hex,opacity){var color=Color.hexToRgb(hex);return"rgba("+color.r+","+color.g+","+color.b+","+opacity+")";}
Color.luminance=function(hex,lum){hex=String(hex).replace(/[^0-9a-f]/gi,'');if(hex.length<6){hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];}
lum=lum||0;var rgb="#",c,i;for(i=0;i<3;i++){c=parseInt(hex.substr(i*2,2),16);c=Math.round(Math.min(Math.max(0,c+(c*lum)),255)).toString(16);rgb+=("00"+c).substr(c.length);}
return rgb;}
Color.getOptions=function(){var options=[];options.push("#000000"+":None");options.push(Color.BLUE+":Blue");options.push(Color.GREEN+":Green");options.push(Color.ORANGE+":Orange");options.push(Color.RED+":Red");options.push(Color.PURPLE+":Purple");options.push(Color.BROWN+":Brown");return options.join("|");}
function CsvFile(){this.buffer=[];this.types=[];}
CsvFile.prototype.writeLine=function(values){for(var i=0;i<values.length;i++){if(i>0)this.buffer.push(',');var value=values[i];if(value==null)value='';if(value.replace!=undefined)value=value.replace(/"/g,'""');this.buffer.push('"',value,'"');}
this.buffer.push('\r\n');}
CsvFile.prototype.clear=function(){this.buffer=new Array();}
CsvFile.prototype.getContent=function(){return this.buffer.join('');}
CsvFile.prototype.download=function(filename){filename=Utils.addExtension(filename,".csv");var content=this.buffer.join('');var frm=new Downloader2(User.BASE_URL+"export/exportcsv.aspx");frm.append("filename",filename);frm.append("content",content);if(this.type)frm.append("types",this.types.join(";"));frm.download(filename);}
Date.SECOND=1000;Date.MINUTE=60*Date.SECOND;Date.HOUR=60*Date.MINUTE;Date.DAY=24*Date.HOUR;Date.YEAR=365*Date.DAY;Date.SUNDAY=0;Date.MONDAY=1;Date.SATURDAY=6;Date.now=function(){return new Date().getTime();}
Date.today=function(days){var now=new Date();var today=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);if(days!=null){return Date.addDays(today.getTime(),days);}else{return today.getTime();}}
Date.addDays=function(millisec,days){if(days%30==0){return Date.addMonths(millisec,days/30);}else{var d=new Date(new Number(millisec));d.setDate(d.getDate()+Number(days));return d.getTime();}}
Date.addMonths=function(millisec,months){var d=new Date(new Number(millisec));var newmonth=d.getMonth()+months;var oldday=d.getDate();d.setDate(1);d.setMonth(newmonth);var newday=Math.min(oldday,Date.getDaysInMonth(d.getFullYear(),d.getMonth()+1));d.setDate(newday);return d.getTime();}
Date.getDaysInMonth=function(year,month){return[31,((!(year%4)&&((year%100)||!(year%400)))?29:28),31,30,31,30,31,31,30,31,30,31][(month-1)%12];}
Date.addBusinessDays=function(millisec,nbDays){var date=new Date(Number(millisec));if(nbDays==undefined||nbDays==0){return millisec;}else{var intDays=Math.floor(nbDays);var intHours=nbDays.toFixed(2).slice(-2);var nbBusDays=0;while(nbBusDays<intDays){date.setDate(date.getDate()+1);if(date.getDay()!=0&&date.getDay()!=6){nbBusDays++;}}
date.setHours(intHours);return date.getTime();}}
Date.isBusinessDay=function(millisec){var date=new Date(Number(millisec));var day=date.getDay();return(day!=0&&day!=6);}
Date.dayStart=function(milliseconds){var date=new Date(milliseconds);date.setHours(0,0,0,0);return date.getTime();}
Date.weekStart=function(millisec){var date=new Date();if(millisec!=null)date.setTime(millisec);date.setHours(0,0,0,0);var dayOfWeek=date.getDay();if(Date.firstDayOfWeek()==Date.MONDAY){if(dayOfWeek==0)dayOfWeek=7;dayOfWeek--;}
return Date.addDays(date.getTime(),-dayOfWeek);}
Date.monthStart=function(millisec){var date=new Date();if(millisec!=null)date.setTime(millisec);var monthStart=new Date(date.getFullYear(),date.getMonth(),1,0,0,0,0);return monthStart.getTime();}
Date.quarterStart=function(millisec){var date=new Date();if(millisec!=null)date.setTime(millisec);month=3*Math.floor(date.getMonth()/3);var quarterStart=new Date(date.getFullYear(),month,1,0,0,0,0);return quarterStart.getTime();}
Date.yearStart=function(millisec){var date=new Date();if(millisec!=null)date.setTime(millisec);var yearStart=new Date(date.getFullYear(),0,1,0,0,0,0);return yearStart.getTime();}
Date.hasTime=function(millisec){millisec=new Number(millisec);if(millisec==100)return false;var date=new Date(millisec);return(date.getHours()>0||date.getMinutes()>0);}
Date.nextHour=function(){var now=new Date().getTime();var date=new Date(now);var minutes=date.getMinutes();var addms=(60-minutes)*60*1000;return now+addms;}
Date.timeDiff=function(millisec1,millisec2){millisec1=new Number(millisec1);millisec2=new Number(millisec2);millisec1=Math.floor(millisec1/Date.MINUTE)*Date.MINUTE;millisec2=Math.floor(millisec2/Date.MINUTE)*Date.MINUTE;var diff=Date.today()+millisec2-millisec1;return diff;}
if(Date.firstDayOfWeek==undefined){Date.firstDayOfWeek=function(){return Date.MONDAY;}}
function FxRates(){}
FxRates.map=null;FxRates.refCurrency=null;FxRates.init=function(){FxRates.refCurrency=AccountSettings.get("currency");FxRates.map=new HashMap();var rates=Query.select("Sales.fxrates","code;value");for(var i=0;i<rates.length;i++){var rate=rates[i];FxRates.map.set(rate.code,rate.value);}}
FxRates.convert=function(amount,currency){if(FxRates.map==null)FxRates.init();if(currency==null||currency==""||currency==FxRates.refCurrency)return amount;var fxValue=FxRates.map.get(currency);if(fxValue!=null&&fxValue>0){return amount/fxValue;}else{return amount;}}
function HashMap(){this.keys=[];this.values={};this.increment=function(key,amount){var value=this.get(key);if(value==null)value=0;this.set(key,value+amount);}
this.set=function(key,value){if(this.values[key]==null){this.keys.push(key);}
this.values[key]=value;}
this.get=function(key){return this.values[key];}
this.sortDescending=function(name){var VAL=this.values;this.keys.sort(function(k1,k2){var value1=VAL[k1];var value2=VAL[k2];if(name){value1=value1[name];value2=value2[name];}
return value2-value1;});}
this.sort=function(name){var VAL=this.values;this.keys.sort(function(k1,k2){var obj1=VAL[k1];var obj2=VAL[k2];return obj1[name]>obj2[name];});}
this.initDays=function(startdate,enddate,value){var date=startdate;while(true){this.set(date,value);date=Date.addDays(date,1);if(date>enddate)break;}}}
HashMap.fromArray=function(array,key){var map=new HashMap();for(var i=0;i<array.length;i++){var item=array[i];map.set(item[key],item);}
return map;}
function _getMap(table,where){var map=[];var items=Query.select(table,"id;name",where);for(var i=0;i<items.length;i++){map[items[i].id]=items[i].name;}
return map;}
Math.round1=function(number){if(typeof number==='undefined')return"";return Math.round(number*10)/10;}
Math.round2=function(number){if(typeof number==='undefined')return"";return Math.round(number*100)/100;}
function MultiValue(){}
MultiValue.contains=function(multivalue,value){if(multivalue===null||multivalue==='')return false;multivalue=String(multivalue);var parts=multivalue.split('|');for(var i=0;i<parts.length;i++){if(parts[i]==value){return true;}}
return false;}
MultiValue.add=function(multivalue,newvalue){if(multivalue==null||multivalue=="")return newvalue;if(MultiValue.contains(multivalue,newvalue))return multivalue;return multivalue+"|"+newvalue;}
MultiValue.remove=function(multivalue,removeValue){if(multivalue==null||multivalue=="")return"";multivalue=String(multivalue);var parts=multivalue.split('|');for(var i=parts.length-1;i>=0;i--){if(parts[i]==removeValue){parts.splice(i,1);}}
return parts.join("|");}
MultiValue.diff=function(multivalue1,multivalue2){if(multivalue1=="")return multivalue2;if(multivalue2=="")return"";var map=new HashMap();var values1=multivalue1.split("|");for(var i=0;i<values1.length;i++)map.set(values1[i],1);var values2=multivalue2.split("|");var diff=[];for(var i=0;i<values2.length;i++){if(map.get(values2[i])==null)diff.push(values2[i]);}
return diff.join("|");}
MultiValue.addMulti=function(multivalue1,multivalue2){var diff=MultiValue.diff(multivalue1,multivalue2);if(diff=="")return multivalue1;else if(multivalue1=="")return diff;else return multivalue1+"|"+diff;}
function Notif(){}
Notif.TABLE="System.notifications";Notif.send=function(title,body,onclick,type,emails){if(emails==null)emails=User.getManagerEmails().join(";");var values={title:title,body:body,onclick:onclick,type:type,emails:emails};Query.insert(Notif.TABLE,values);}
Notif.sendSystem=function(onclick,email){var values={title:"",body:"",onclick:onclick,type:"",emails:email};Query.insert(Notif.TABLE,values);}
Notif.sendNow=function(values,emails){if(emails==null)emails=User.getManagerEmails().join(";");values.emails=emails;Query.insert(Notif.TABLE,values);}
Notif.sendAtDate=function(values,emails,date){values.date=date;Notif.sendNow(values,emails);}
Notif.deleteId=function(id){Query.deleteId(Notif.TABLE,id);}
Notif.updateId=function(id,field,value){Query.updateId(Notif.TABLE,id,field,value);}
Notif.sendPdfArchive=function(email,html){if(email==null||email=="")return;var values={title:"",body:html,type:"pdf",emails:email};Query.insert("System.notifications",values);}
Notif.sendPdfSave=function(html,linkedtable,linkedid){var email=linkedtable+";"+linkedid;var values={body:html,type:"savepdf",emails:emails};Query.insert("System.notifications",values);}
Notif.sendCsv=function(email,csv,filename){if(email==null||email=="")return;var values={title:filename,body:csv,type:"csv",emails:email};Query.insert("System.notifications",values);}
function Pdf2(){}
Pdf2.URL=null;Pdf2.init=function(fontsize){Pdf2.buf=[];Pdf2.style=[];Pdf2.footer="";Pdf2.watermark="";Pdf2.watermarkcolor="";Pdf2.filename="";Pdf2.fileid="";Pdf2.tags=[];Pdf2.linkedpdfids=[];Pdf2.orientation="portrait";Pdf2.body="";Pdf2.subject="";if(fontsize==null)fontsize="1.4em";Pdf2.addStyle("BODY, TD","font-family:Arial;font-size:"+fontsize);Pdf2.addStyle("IMG","page-break-inside:avoid;");Pdf2.addStyle(".twocols","width:100%;text-align:left;border:0;margin-top:1em;margin-bottom:1em;");Pdf2.addStyle(".twocols TD","width:50%;vertical-align:top;");Pdf2.addStyle(".table","width:100%;border:0;padding:0;margin:0;");Pdf2.addStyle(".table TR TD","padding:1em;text-align:left;vertical-align:top;");Pdf2.addStyle(".table THEAD TD","font-weight:bold;");Pdf2.addStyle(".table TR TD:last-child","text-align:right;");Pdf2.addStyle("span.label","width:250px;display:inline-block;");Pdf2.addStyle(".labeltext","font-weight:bold;");Pdf2.addStyle("DIV.header","background-color:rgba(204, 204, 204, 0.5);border:1px solid #CCC;padding:1em;font-weight:bold;margin-top:2em;");Pdf2.addStyle("IMG.photo","margin:5px;");Pdf2.addStyle("DIV.photo2","display:inline-table;width:1%;margin:10px");Pdf2.addStyle("DIV.photo2caption","background-color:#EEE;line-height:1.2em;height:1.2em;overflow:hidden;padding:5px;");Pdf2.addStyle("TABLE.block","clear:both;width:100%;border-collapse:collapse;border:1px solid #AAA;margin-top:3em;margin-bottom:1em;");Pdf2.addStyle("TABLE.block TR TD","padding:0.3em;padding-left:1em;border:1px solid #AAA;vertical-align:top;");Pdf2.addStyle("TABLE.block THEAD TR TD","font-size:2em;background-color:rgba(204, 204, 204, 0.5)");Pdf2.addStyle("TABLE.block TD:nth-child(1)","width:150px;font-weight:bold;");Pdf2.addStyle("TABLE.block TD:nth-child(3)","width:150px;font-weight:bold;");if(Settings._WEB==true){Pdf2.URL=User.BASE_URL+"export/exportpdf.aspx?auth="+encodeURIComponent(User.token);}else{var baseUrl=Settings.get("baseurl");if(baseUrl==null||baseUrl=="")baseUrl="https://www.upvise.com/uws";Pdf2.URL=baseUrl+"/export/exportpdf.aspx?auth="+encodeURIComponent(Settings.get("token"));}
if(Format.forprint!=null)Format.forprint();}
Pdf2.setWatermark=function(text,color){Pdf2.watermark=text;Pdf2.watermarkcolor=color;}
Pdf2.setFilename=function(filename){Pdf2.filename=Utils.addExtension(filename,".pdf");}
Pdf2.setFileid=function(id){Pdf2.fileid=id;}
Pdf2.addTag=function(name,value){Pdf2.tags.push({name:name,value:value});}
Pdf2.setFooter=function(footer){Pdf2.footer=footer;}
Pdf2.setHeader=function(logoid){var text="";if(logoid==null||logoid==""){logoid=AccountSettings.getLogo();text=AccountSettings.get('companyaddress');}
var img='<img src="##BASE##'+logoid+'" >';if(text==""){Pdf2.add('<div style="margin-bottom:2px;text-align:center">',img,'</div>');}else{text=text.split("\n").join("<br/>");Pdf2.add('<span style="color:gray;float:left">',text,'</span><span style="float:right">',img,'</span><div style="clear:both;margin-bottom:2px;"></div>');}}
Pdf2.addStyle=function(selector,value){Pdf2.style.push(selector+" {"+value+"}");}
Pdf2.add=function(){for(var i=0;i<arguments.length;i++)Pdf2.buf.push(arguments[i]);}
Pdf2.addTitle=function(title){Pdf2.add("<h1>",title,"</h1>");}
Pdf2.addText=function(label,text){if(text==null||text=="")return;Pdf2.add('<p><span class=labeltext>',label,'</span><br/>',text,'</p>');}
Pdf2.firstColumn=function(style){if(style==null)style="";Pdf2.add('<table class="twocols" cellspacing="0"><tr><td style="',style,'">');}
Pdf2.secondColumn=function(style){if(style==null)style="";Pdf2.add('</td><td style="',style,'">');}
Pdf2.stopColumn=function(){Pdf2.add('</td></tr></table>');}
Pdf2.formatAddress=function(contact,company,address){var contactName=null;if(contact!=null){contactName=(contact.salutation!=null&&contact.salutation!='')?contact.salutation+" ":'';contactName+=contact.name;}
var pdfAddress="";var companyAddress=company?Format.address(company.street,company.city,company.state,company.zipcode,company.country).trim():"";var contactAddress=contact?Format.address(contact.street,contact.city,contact.state,contact.zipcode,contact.country).trim():"";if(address!=null&&address!="")pdfAddress=Format.text(address);else if(contactAddress!=""&&companyAddress!="")pdfAddress=contactAddress;else if(contactAddress!="")pdfAddress=contactAddress;else pdfAddress=companyAddress;var buffer=[];if(company!=null){if(Settings.getCountry().toLowerCase()=="ch"){buffer.push(company.name);if(contactName!=null)buffer.push(contactName);}else{if(contactName!=null)buffer.push(contactName);buffer.push(company.name);}
buffer.push(pdfAddress);}else if(contact!=null){buffer.push(contactName);buffer.push(pdfAddress);}
buffer=buffer.join("\n");buffer=buffer.split(" / ").join('\n');var lines=buffer.split('\n');return lines;}
Pdf2.addLabel=function(label,value){Pdf2.add('<div><span class=label>',label,'</span><span class=value>',value,'</span></div>');}
Pdf2.startTable=function(headers,styles,className){if(className==null)className="table";Pdf2.add('<table cellspacing="0" class="',className,'">');if(headers!=null){Pdf2.add('<thead><tr>');for(var i=0;i<headers.length;i++){var style=(styles!=null)?styles[i]:"";Pdf2.add('<td style="',style,'">',headers[i],'</td>');}
Pdf2.add('</tr></thead>');}}
Pdf2.startTitleBlock=function(title,color,pagebreak){if(Pdf2.footer==null)Pdf2.footer=title;var style=(pagebreak===true)?"page-break-before:always":"";var style2=(color&&color!="#000000")?"color:white;background-color:"+color:"";Pdf2.add('<table class=block style="',style,'"><thead><tr><td colspan=4 style="',style2,'">',title,'</td></tr></thead>');}
Pdf2.addRow=function(columns,style){Pdf2.add('<tr>');style=(style!=null)?' style="'+style+'"':'';for(var i=0;i<columns.length;i++){Pdf2.add('<td',style,'>',columns[i],'</td>');}
Pdf2.add('</tr>');}
Pdf2.stopTable=function(){Pdf2.add('</table>');}
Pdf2.addSignature=function(label,base64){Pdf2.add('<div>');if(label!=null)Pdf2.add('<b>',label.toUpperCase(),'</b><br/>');if(base64)Pdf2.add('<img height="100" src="data:image/png;base64,'+base64+'" />');Pdf2.add('</div>');}
Pdf2.addImage=function(fileid,height){if(fileid==null||fileid=="")return;Pdf2.add('<img class="photo" src="##BASE##',fileid,'"');if(height!=null)Pdf2.add(' height="',height,'"');Pdf2.add('/> ');}
Pdf2.addImage2=function(fileid,label,height){if(fileid==null||fileid=="")return;if(Pdf2.photocaption==true){Pdf2.add('<div class="photo2"><img src="##BASE##',fileid,'"');if(height!=null)Pdf2.add(' height="',height,'"');Pdf2.add('/>');if(label){if(label.length>15)label='<span style="font-size:0.6em">'+label+'</span>';Pdf2.add('<div class="photo2caption">',label,'</div>');}
Pdf2.add('</div>');}else{Pdf2.addImage(fileid,height);}}
Pdf2.addImages=function(label,files,height){if(files.length==0)return;if(label)Pdf2.add(label,'<br/>');for(var i=0;i<files.length;i++){var file=files[i];if(file.mime.substr(0,5)=="image"){Pdf2.addImage2(file.id,file.name,height);}else if(file.mime=="application/pdf"){Pdf2.linkedpdfids.push(file.id);}}}
Pdf2.addFloorPlan=function(){if(WEB()&&sPlanViewer!=null){var html=sPlanViewer.toHtml();Pdf2.add(html);return true;}else{return false;}}
Pdf2.addPageBreak=function(){Pdf2.add('<div style="page-break-before:always">&nbsp;</div>');}
Pdf2.addHeader=function(header,style){if(style)style=' style="'+style+'"';Pdf2.add('<div class="header"',style,'>',header,'</div>');}
Pdf2.getContent=function(){var buf=[];buf.push('<html><head>');buf.push('<meta name="version" content="2">');buf.push('<meta name="footer" content="',Pdf2.footer,'">');buf.push('<meta name="watermark" content="',Pdf2.watermark,'">');buf.push('<meta name="watermarkcolor" content="',Pdf2.watermarkcolor,'">');buf.push('<meta name="filename" content="',Pdf2.filename,'">');buf.push('<meta name="fileid" content="',Pdf2.fileid,'">');buf.push('<meta name="linkedpdfids" content="',Pdf2.linkedpdfids.join(';'),'">');buf.push('<meta name="orientation" content="',Pdf2.orientation,'">');buf.push('<meta name="subject" content="',Utils.xmlEncode(Pdf2.subject),'">');buf.push('<meta name="body" content="',Utils.xmlEncode(Pdf2.body),'">');for(var i=0;i<Pdf2.tags.length;i++){buf.push('<meta name="',Pdf2.tags[i].name,'" content="',Pdf2.tags[i].value,'">');}
buf.push('<style>',Pdf2.style.join('\r'),'</style>');buf.push('</head><body>',Pdf2.buf.join(''),'</body></html>');return buf.join('');}
Pdf2.download=function(){if(Pdf2.filename=="")Pdf2.filename="untitled.pdf";var content=Pdf2.getContent();if(Settings._WEB==true){var data={content:content};App.downloadFile(Pdf2.URL,data,Pdf2.filename);}else{var postData="content="+encodeURIComponent(content);var filepath=App.downloadFile(Pdf2.URL,postData,Pdf2.filename);if(filepath!=null){App.openFile(filepath);}}}
Pdf2.email=function(emails){if(Pdf2.filename=="")Pdf2.filename="untitled.pdf";if(Settings.getPlatform()!="web"){var content=Pdf2.getContent();var postData="content="+encodeURIComponent(content);var filepath=App.downloadFile(Pdf2.URL,postData,Pdf2.filename);if(filepath==null||filepath=="")return false;var emailto=(emails!=null)?emails:"";if(App.mailto3!=undefined){var subject=Pdf2.subject?Format.text(Pdf2.subject):null;var body=Pdf2.body?Format.text(Pdf2.body):null;App.mailto3(emailto,subject,body,filepath);}else{App.mailto(emailto,filepath);}}else{Pdf2.sendWebEmail(emails);}
return true;}
Pdf2.archiveEmail=function(email,subject,body){if(email==null||email=="")return false;if(subject)Pdf2.subject=subject;if(body)Pdf2.body=body;var html=Pdf2.getContent();Notif.sendPdfArchive(email,html);}
Pdf2.save=function(linkedtable,linkedid){var html=Pdf2.getContent();Notif.sendPdfSave(html,linkedtable,linkedid);}
Pdf2.sendWebEmail=function(emails){Toolbar.setTitle(R.SENDBYEMAIL);Toolbar.addButton(R.SENDEMAIL,"Pdf2.onSend()","save");Toolbar.moreButton=false;List.addTextBox("email",R.ENTEREMAIL,emails,null,"longtext");if(Pdf2.subject)List.addTextBox("subject",R.SUBJECT,Pdf2.subject,null,"longtext");List.addTextBox("body",R.MESSAGE,Pdf2.body,null,"textarea2");List.addCheckBox("ccme",R.SENDCOPY,"0");List.show("pane");}
Pdf2.onSend=function(){var mailto=List.getValue('email');if(Pdf2.checkEmails(mailto)==false)return false;var data={};data.content=Pdf2.getContent();data.mailto=mailto;var subject=List.getValue('subject');if(subject!=null&&subject!="")data.subject=subject;data.body=Format.text(List.getValue('body'));data.ccme=List.getValue("ccme");App.postData(Pdf2.URL,data);History.reload();App.alert("Email sent");}
Pdf2.checkEmails=function(emails){emails=emails.trim();if(emails==""){App.alert("Please enter an email");List.focus("email");return false;}
var parts=emails.split(';');for(var i=0;i<parts.length;i++){var part=parts[i];part=part.trim();if(isEmail(part)==false){App.alert(part+" is not a valid email!");List.focus("email");return false;}}
return true;}
User.STANDARD=0;User.MANAGER=2;User.ADMIN=1;User.isAdmin=function(){var privilege=Settings.get("privilege");return(privilege=="1");}
User.isAdminOrManager=function(){var privilege=Settings.get("privilege");return(privilege=="1"||privilege=="2");}
User.isManager=function(name){if(name!=null){return Query.count("System.users","type!={User.STANDARD} AND status=1 AND name={name}")>0;}
var privilege=Settings.get("privilege");return(privilege=="1"||privilege=="2");}
User.canEdit=function(owner){if(User.isAdminOrManager())return true;if(owner==null||owner=="")return false;var user=User.getName();var parts=owner.split("|");for(var i=0;i<parts.length;i++){if(parts[i]==user)return true;}
return false;}
User.canEditOptions=function(){if(User.isManager()==false)return false;if(User.isAdmin()==true)return true;return(AccountSettings.get("manager.options")!="0");}
User.getInfoList=function(){var users=Query.select("System.users","name;email","status=1","name");for(var i=0;i<users.length;i++){var u=users[i];u.geo=AccountSettings.get("location."+u.name);}
return users;}
User.hasApp=function(appid){if(appid=="settingsapp"||appid=="logs"){return true;}
var APPS=["contacts","sales","forms","expenses","tasks","calendar","files","ideas","projects"];for(var i=0;i<APPS.length;i++){if(appid==APPS[i]){appid="unybiz."+appid;break;}}
if(appid=="notes")appid="uny.notes";var app=Query.selectId("System.library",appid);return(app!=null);}
User.getContact=function(name){if(name==null)name=User.getName();var users=Query.select("System.users","email","name="+esc(name));if(users.length>0)return User.getContactFromEmail(users[0].email);else return null;}
User.getCompany=function(name){var contact=User.getContact(name);return(contact!=null)?Query.selectId("Contacts.companies",contact.companyid):null;}
User.getContactFromEmail=function(email){var contacts=Query.select("Contacts.contacts","id;name;jobtitle;email;email2;mobile;groupid;photoid;code;rate;weekendrate","email="+esc(email));return(contacts.length>0)?contacts[0]:null;}
User.getManagerEmails=function(){var myEmail=Settings.get("email");var myContact=User.getContactFromEmail(myEmail);if(myContact==null)return[];var groupMap=new HashMap();var groups=myContact.groupid.split("|");for(var i=0;i<groups.length;i++){var groupid=groups[i];if(groupid!=""&&groupid!="team")groupMap.set(groupid,1);}
var emails=[];var managers=Query.select("System.users","email","type!=0 AND status=1 AND email!="+esc(myEmail));if(groupMap.keys.length==0){for(var i=0;i<managers.length;i++){emails.push(managers[i].email);}
return emails;}
for(var i=0;i<managers.length;i++){var manager=User.getContactFromEmail(managers[i].email);if(manager!=null){var groups=manager.groupid.split("|");for(var j=0;j<groups.length;j++){var groupid=groups[j];if(groupMap.get(groupid)!=null){emails.push(manager.email);break;}}}}
return emails;}
User.getContacts=function(){var emails=[];var users=Query.select("System.users","email","status=1");for(var i=0;i<users.length;i++){emails.push(users[i].email.replace("'","''"));}
var where="email IN ('"+emails.join("','")+"')";var contacts=Query.select("Contacts.contacts","id;name;jobtitle;photoid",where,"name");return contacts;}
User.getEmails=function(staff){var emails=[];var users=Query.select("system.users","email","status=1 AND name IN "+list(staff));for(var i=0;i<users.length;i++){emails.push(users[i].email);}
return emails.join(";");}
User.getOptions=function(type){var where="status=1";if(type=="manager")where+=" AND type!={User.STANDARD}";return Query.options("System.users",where);}
User.exists=function(email){email=email.toLowerCase();return Query.count("System.users","status=1 AND email="+esc(email))>0;}
User.getManagerMobile=function(){var emails=User.getManagerEmails();for(var i=0;i<emails.length;i++){var contact=User.getContactFromEmail(emails[i]);if(contact.mobile!="")return contact.mobile;}
return"";}
User.getInitials=function(){var parts=User.getName().split(" ");var name="";if(parts.length==1)name=parts[0].substring(0,3);else name=parts[0].substring(0,1)+parts[parts.length-1].substring(0,2);return name.toUpperCase();}
User.getRole=function(userid){if(userid==null){var users=Query.select("System.users","id","name="+esc(User.getName()));if(users.length==0)return null;userid=users[0].id;}
var roleid=AccountSettings.get("role:"+userid);return roleid?Query.selectId("System.roles",roleid):null;}
function Utils(){}
Utils.clone=function(item){var item2=JSON.parse(JSON.stringify(item));item2.id=undefined;return item2;}
Utils.xmlEncode=function(str){if(str==null)return null;str=String(str);return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&apos;').replace(/"/g,'&quot;');}
Utils.xmlEncodeFormat=function(text){if(text=="")return text;var lines=text.split("\n");var insideList=false;var buf=[];for(var i=0;i<lines.length;i++){var line=lines[i];var start=line.substring(0,2);if(start=="* "||start=="> "){if(insideList==false){buf.push("<ul>");insideList=true;}
buf.push("<li>",Utils.xmlEncode(line.substring(2)),"</li>");}else{if(insideList==true){buf.push("</ul>");insideList=false;}else if(i>0){buf.push("<br/>");}
buf.push(Utils.xmlEncode(line));}}
if(insideList==true)buf.push("</ul>");return buf.join('');}
Utils.addExtension=function(filename,ext){var isPresent=(filename.substr(filename.length-ext.length)==ext);return isPresent?filename:filename+ext;}
function Where(){}
Where.owner=null;Where.initialized=false;Where.clear=function(){Where.owner=null;Where.startdate=null;Where.period=null;}
Where.setOwner=function(value){Where.owner=value;Where.initialized=true;}
Where.addOwner=function(where){if(where==null)where="";if(Where.owner==null)return where;var where2=null;if(Where.owner=="")where2="owner = ''";else where2="owner CONTAINS "+esc(Where.owner);if(where==null||where=="")return where2;else return where+" AND "+where2;}
Where.addCreator=function(where){if(where==null)where="";if(Where.owner==null)return where;var where2=null;if(Where.owner=="")where2="creator = ''";else where2="creator CONTAINS "+esc(Where.owner);if(where==null||where=="")return where2;else return where+" AND "+where2;}
Where.formatOwner=function(){if(Where.owner==null)return R.EVERYONE;else if(Where.owner=="")return R.UNASSIGNED;else return Where.owner;}
Where.popupOwner=function(unassigned){if(unassigned==null)unassigned=true;var myself=User.getName();var users=Query.select("System.users","name","status=1","name");Popup.add(R.EVERYONE,"Where.onFilterOwner()","img:group");Popup.add(myself+" "+R.MEUSER,"Where.onFilterOwner("+esc(myself)+")","img:contact");if(unassigned==true)Popup.add(R.UNASSIGNED,"Where.onFilterOwner('')","img:support");Popup.addHeader("");for(var i=0;i<users.length;i++){var name=users[i].name;if(name!=myself)Popup.add(name,"Where.onFilterOwner("+esc(name)+")","img:contact");}
Popup.show();}
Where.onFilterOwner=function(owner){Where.setOwner(owner);History.reload();}
Where.startdate=null;Where.period=1;Where.initStartDate=function(startdate,period){if(Where.startdate==null){Where.startdate=startdate;Where.period=period;}}
Where.addDateRange=function(where,datefield){if(datefield==null)datefield="date";if(where==null)where="";if(Where.startdate==null)return where;var enddate=Date.addDays(Where.startdate,Where.period);if(where!="")where+=" AND ";where+=" "+datefield+">="+esc(Where.startdate)+" AND "+datefield+"<"+esc(enddate);return where;}
Where.formatDateRange=function(){if(Where.startdate==null)return"";var enddate=Date.addDays(Where.startdate,Where.period);enddate=Date.addDays(enddate,-1);var buffer=Format.date(Where.startdate);if(Where.startdate!=enddate)buffer+=" "+R.TO+" "+Format.date(enddate);return buffer;}
Where.popupDateRange=function(){Popup.add(R.ALL,"Where.onDateRange()");Popup.addHeader();Popup.add(R.TODAY,"Where.onDateRange("+esc(Date.today())+",1)");Popup.add(R.YESTERDAY,"Where.onDateRange("+esc(Date.today(-1))+",1)");Popup.add(R.THISWEEK,"Where.onDateRange("+esc(Date.weekStart())+",7)");Popup.add(R.THISMONTH,"Where.onDateRange("+esc(Date.monthStart())+",30)");Popup.add(R.DATERANGE,"Where.showDatePane()");Popup.show();}
Where.onDateRange=function(date,period){Where.startdate=date;Where.period=period;History.reload();}
Where.showDatePane=function(){Toolbar.setTitle(R.SELECTPERIOD);Toolbar.addButton(R.FILTER,"Where.onDatePane()");List.addTextBox('startdate',R.DATE,Date.monthStart(),null,"date");List.addComboBox("period",R.PERIOD,30,null,"1:"+R.DAY+"|7:"+R.WEEK+"|30:"+R.MONTH+"|90:3 "+R.MONTHSPERIOD+"|180:6 "+R.MONTHSPERIOD+"|360:12 "+R.MONTHSPERIOD);List.show("pane");}
Where.onDatePane=function(){var startdate=parseInt(List.getValue("startdate"));var period=parseInt(List.getValue("period"));Where.onDateRange(startdate,period);}
Where.popupMonth=function(){var cur=Date.monthStart();Popup.add(R.ALL,"Where.onDateRange()");Popup.addHeader();for(var i=0;i<6;i++){var month=Date.addMonths(cur,-i);Popup.add(Format.month(month),"Where.onDateRange("+esc(month)+",30)");}
Popup.add(R.CUSTOM,"Where.showDatePane()");Popup.show();}
Where.popupWeek=function(){var cur=Date.weekStart();for(var i=0;i<8;i++){var day=Date.addDays(cur,-i*7);var label="";if(i==0)label=R.THISWEEK;else if(i==1)label=R.LASTWEEK;else label=Format.week(day);Popup.add(label,"Where.onDateRange("+esc(day)+",7)");}
Popup.add(R.CUSTOM,"Where.showDatePane()");Popup.show();}
Where.regionid=null;Where.addRegion=function(where){if(where==null)where="";if(Where.regionid==null)return where;var where2="regionid="+esc(Where.regionid);if(where=="")return where2;else return where+" AND "+where2;}
Where.formatRegion=function(){if(Where.regionid==null)return"";else if(Where.regionid=='')return R.UNASSIGNED;else return Query.names("Contacts.regions",Where.regionid);}
Where.popupRegion=function(regionidlist){var where=(regionidlist!=null)?"id IN "+list(regionidlist):null;var regions=Query.select("Contacts.regions","id;name",where,"name");Popup.add(R.ALL,"Where.onFilterRegion()","img:pinpoint");Popup.add(R.UNASSIGNED,"Where.onFilterRegion('')","img:support");Popup.addHeader();for(var i=0;i<regions.length;i++){var region=regions[i];Popup.add(region.name,"Where.onFilterRegion("+esc(region.id)+")","img:pinpoint");}
Popup.show();}
Where.onFilterRegion=function(regionid){Where.regionid=regionid;History.reload();}
R.CALENDAR="Calendar";R.CONTACTS="Contacts";R.TASKS="Tasks";R.NOTEBOOKS="Notebooks";R.SALES="Sales";R.PROJECTS="Projects";R.FORMS="Forms";R.JOBS="Jobs";R.FILES="Files";R.EXPENSES="Expenses";R.TIMESHEETS="Timesheets";R.ASSETS="Assets";R.EQUIPMENT="Equipment";R.IDEAS="Ideas";R.NEWS="News";R.QUALITY="Quality";R.SAFETY="Safety";R.LOGISTICS="Logistics";R.MAINTENANCE="Maintenance";R.ACTIVITY="Activity";R.WORKFORCE="Workforce";R.PEOPLE="People";R.SETTINGS="Settings";R.CONFIRMPURCHASELICENSE="This application requires a valid Upvise license. Do you want to purchase one now?";R.DOYOUWANTTOIMPORT="Do you want to import xx records?";R.SELECTEXCELFILE="Select Excel File";R.DOWNLOAD="Download";R.DOWNLOADING="Downloading";R.ERROR="Error";R.MYACCOUNT="My Account";R.SIGNOUT="Signout";R.SIGNINOTHERUSER="Sign In as other user";R.ADDNEWAPP="Add New Application";R.GROUPS="Groups";R.NEWGROUP="New Group";R.NEW="New";R.SAVE="Save";R.NAME="Name";R.RANK="Rank";R.EDIT="Edit";R.COLOR="Color";R.OF="of";R.ERRPASSWORD="Enter a password with at least 7 characters";R.SIGNIN="Sign in";R.EMAIL="email";R.EMAILNOTVALID="Email is not valid";R.INSTANTSEARCH="Search";R.PASSWORD="Password";R.FORGOTPASSWORD="Forgot Password?";R.NOACCOUNTYET="No account yet?";R.CREATEACCOUNT="Create a new Account";R.EMAIL_ERR="Please enter a valid email";R.PASSWORD_ERR="Please enter a valid password";R.CREATEPASSWORD="Create Password";R.ENTERFULLNAME="Enter Full Name";R.ENTERCOMPANYNAME="Enter Company Name";R.SIGNUPAPPS1="I am interested in...";R.SIGNUPAPPS2="Field Service Businesses Apps";R.SIGNUPAPPS3="Sales & CRM Apps";R.SIGNUPAPPS4="All Upvise Apps";R.AGREETERMS="By clicking on the button above, you agree with the Terms of Use and the Privacy Policy";R.BROWSERNOTSUPP_ERR="We are sorry, your web browser is not supported! (cannot create an XMLHTTP instance)";R.NONE="None";R.TODAY="Today";R.TOMORROW="Tomorrow";R.DAYAFTERTOMORROW="Day after tomorrow";R.NEXTWEEK="Next Week";R.THISMONTH="This Month";R.SOMEDAY="Someday";R.CUSTOM="Custom...";R.HOURS="hours";R.DAY="day";R.DAYS="days";R.SELECTFILE="Select File";R.DELETE="Delete";R.ERR_READ_FILE="Error reading file";R.ERR_LOAD_FILE="Error loading file";R.DESIREDSIZE="Enter Desired size in pixels";R.RESIZINGIMAGE="Resizing Image";R.ERR_SIZESMALLER="Image size is already smaller than desired size.";R.SELECTFIRST="Please select some items.";R.LOADING="Loading";R.EVERY="Every";R.DAYSPERIOD="days";R.EVERYDAY="Everyday";R.EVERYWEEK="Every week";R.EVERY2WEEKS="Every 2 weeks";R.EVERYMONTH="Every month";R.EVERY3MONTHS="Every 3 months";R.EVERY6MONTHS="Every 6 months";R.EVERYYEAR="Every year";R.NOTE="Note";R.PREVIEW="Preview";R.SUNDAY="Sunday";R.MONDAY="Monday";R.TUESDAY="Tuesday";R.WEDNESDAY="Wednesday";R.THURSDAY="Thursday";R.FRIDAY="Friday";R.SATURDAY="Saturday";R.JAN="January";R.FEB="February";R.MAR="March";R.APR="April";R.MAY="May";R.JUN="June";R.JUL="July";R.AUG="August";R.SEP="September";R.OCT="October";R.NOV="November";R.DEC="December";R.NEXTMONTH="Next Month";R.YESTERDAY="Yesterday";R.MONTHSAGO="months ago";R.LASTMONTH="Last Month";R.WEEKSAGO="weeks ago";R.LASTWEEK="Last Week";R.DAYSAGO="days ago";R.INPERIODTIME="in";R.MONTHSPERIOD="months";R.WEEKSPERIOD="weeks";R.UPLOADFILE="Upload File";R.COPIEDCLIPBOARD="Copied to clipboard";R.VIEWMAP="View Map";R.CALL="Call";R.CHAT="Chat with Skype";R.VIEWDETAILS="View Details";R.MORE="More";R.PURCHASENOW="Purchase Now";R.DAYSLEFT="days left";R.MANAGEUSERS="Manage Users";R.PURCHASELICENSE="Purchase License";R.ACTIVITYLOG="Activity Log";R.EVERYONE="Everyone";R.MEUSER="(me)";R.UNASSIGNED="Unassigned";R.DEACTIVATED="Deactivated";R.PRINT="Print";R.REFRESH="Refresh";R.DELETECONFIRM="Are you sure you want to delete this record?";R.SUBMIT="Submit";R.THANKYOUFORM="Thank you for submitting this form";R.COMPANY="Company";R.CONTACT="Contact";R.DESCRIPTION="Description";R.SYNCING="Syncing...";R.NODATA_ERR="Error: no data received";R.INVALIDEMAILPWD="invalid email or password";R.ERREMAILEXISTS="There is already an account with this email";R.LICENSEEXPIRED_MSG="License has expired. Please renew from the Users section.";R.UPVISESERVER_ERR="Upvise Server Error";R.SENDBYEMAIL="Send by Email";R.SENDEMAIL="Send Email";R.ENTEREMAIL="Enter Email";R.SUBJECT="Subject";R.MESSAGE="Message";R.AUTOSAVED="Page last auto-saved at";R.NONAME="#No Name";R.YES="Yes";R.NO="No";R.DROPBOXADDRESS="Personal Email Dropbox address";R.DROPBOXRECEIVEDEMAIL="Convert any received email message into a note";R.DROPBOXRECEIVEDEMAIL_NOTE1="Simply forward to your Upvise Dropbox email the message you want to add to Upvise";R.DROPBOXRECEIVEDEMAIL_NOTE2="The note will be linked to the contact who sent you the message. If it does not already exist in Upvise, a new contact will be created automatically.";R.DROPBOXRECEIVEDEMAIL_NOTE3="Any attached file in the forwarded message will also be linked to this contact as well.";R.DROPBOXRECEIVEDEMAIL_NOTE4="To link the message to a company, project, deal or job, use the flags detailed below at the beginning of the body of the forwarded email.";R.DROPBOXSENTEMAILS="Keep track of emails you send to contacts";R.DROPBOXSENTEMAILS_NOTE1="Click on the More/Options button in the Contacts web app.";R.DROPBOXSENTEMAILS_NOTE2="Check the option to automatically Bcc your Upvise dropbox on every email you send from the Contacts web app.";R.DROPBOXSENTEMAILS_NOTE3="Upvise will automatically attach a copy of your email as a note to the recipient Contact or Company.";R.DROPBOXNEWNOTE="Create a new Note by email";R.DROPBOXNEWNOTE_NOTE1="Create a new email message and send to your personal email account";R.DROPBOXNEWNOTE_NOTE2="Use the subject and the email body to put your note content";R.DROPBOXNEWNOTE_NOTE3="Link your note to a contact, company, project, deal or job by using these flags (one per line) at the beginning of your message body";R.DROPBOXNEWNOTE_NOTE4="N.B.: you can only specify one line for each type of flag, i.e. to link to more than one contact or company, you need to create several emails";R.DROPBOXCREATETASK="Create a Task by email";R.DROPBOXCREATETASK_NOTE1="In the subject of the email, add the <b>/task</b> keyword followed by the task name";R.DROPBOXCREATETASK_NOTE2="Use the flags below (one per line) at the beginning of your message body";R.OR="or";R.SENDCOPY="Send a copy to my email address";R.TO="To";R.ALL="All";R.THISWEEK="This Week";R.DATERANGE="Date Range";R.SELECTPERIOD="Select Period";R.FILTER="Filter";R.DATE="Date";R.PERIOD="Period";R.WEEK="Week";R.MONTH="Month";