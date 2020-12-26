(function () {
  var CircularJSON = JSON;

  var replacer = function replacer(k, v) {
    if (v === undefined) {
      return '©undefined';
    } else if (v === null) {
      return '©null';
    } else if (v === -Infinity) {
      return '©- Infinity';
    } else if (v === Infinity) {
      return '©Infinity';
    } else if (typeof v === 'number' && isNaN(v)) {
      return '©NaN';
    } else if (typeof v === 'function') {
      return '©function';
    }
    return v;
  };
  try {
    CircularJSON = eval('(function(JSON,RegExp){var specialChar="~",safeSpecialChar="\\\\x"+("0"+specialChar.charCodeAt(0).toString(16)).slice(-2),escapedSafeSpecialChar="\\\\"+safeSpecialChar,specialCharRG=new RegExp(safeSpecialChar,"g"),safeSpecialCharRG=new RegExp(escapedSafeSpecialChar,"g"),safeStartWithSpecialCharRG=new RegExp("(?:^|([^\\\\\\\\]))"+escapedSafeSpecialChar),indexOf=[].indexOf||function(v){for(var i=this.length;i--&&this[i]!==v;);return i},$String=String;function generateReplacer(value,replacer,resolve){var doNotIgnore=false,inspect=!!replacer,path=[],all=[value],seen=[value],mapp=[resolve?specialChar:"[Circular]"],last=value,lvl=1,i,fn;if(inspect){fn=typeof replacer==="object"?function(key,value){return key!==""&&replacer.indexOf(key)<0?void 0:value}:replacer}return function(key,value){if(inspect)value=fn.call(this,key,value);if(doNotIgnore){if(last!==this){i=lvl-indexOf.call(all,this)-1;lvl-=i;all.splice(lvl,all.length);path.splice(lvl-1,path.length);last=this}if(typeof value==="object"&&value){if(indexOf.call(all,value)<0){all.push(last=value)}lvl=all.length;i=indexOf.call(seen,value);if(i<0){i=seen.push(value)-1;if(resolve){path.push((""+key).replace(specialCharRG,safeSpecialChar));mapp[i]=specialChar+path.join(specialChar)}else{mapp[i]=mapp[0]}}else{value=mapp[i]}}else{if(typeof value==="string"&&resolve){value=value.replace(safeSpecialChar,escapedSafeSpecialChar).replace(specialChar,safeSpecialChar)}}}else{doNotIgnore=true}return value}}function retrieveFromPath(current,keys){for(var i=0,length=keys.length;i<length;current=current[keys[i++].replace(safeSpecialCharRG,specialChar)]);return current}function generateReviver(reviver){return function(key,value){var isString=typeof value==="string";if(isString&&value.charAt(0)===specialChar){return new $String(value.slice(1))}if(key==="")value=regenerate(value,value,{});if(isString)value=value.replace(safeStartWithSpecialCharRG,"$1"+specialChar).replace(escapedSafeSpecialChar,safeSpecialChar);return reviver?reviver.call(this,key,value):value}}function regenerateArray(root,current,retrieve){for(var i=0,length=current.length;i<length;i++){current[i]=regenerate(root,current[i],retrieve)}return current}function regenerateObject(root,current,retrieve){for(var key in current){if(current.hasOwnProperty(key)){current[key]=regenerate(root,current[key],retrieve)}}return current}function regenerate(root,current,retrieve){return current instanceof Array?regenerateArray(root,current,retrieve):current instanceof $String?current.length?retrieve.hasOwnProperty(current)?retrieve[current]:retrieve[current]=retrieveFromPath(root,current.split(specialChar)):root:current instanceof Object?regenerateObject(root,current,retrieve):current}var CircularJSON={stringify:function stringify(value,replacer,space,doNotResolve){return CircularJSON.parser.stringify(value,generateReplacer(value,replacer,!doNotResolve),space)},parse:function parse(text,reviver){return CircularJSON.parser.parse(text,generateReviver(reviver))},parser:JSON};return CircularJSON})(JSON,RegExp)');
  } catch (e) {
    console.error(e);
  }

  // eslint-disable-next-line
  var OriginalFunction = Function;
  var OriginalFetch = self.fetch;
  var OriginalBridgeCall = self.AlipayJSBridge && self.AlipayJSBridge.call;

  var callInternalAPI = function callInternalAPI(api, param) {
    var actionData = {
      data: {
        method: api,
        param: param
      },
      action: 'internalAPI'
    };
    var apiQueryString = encodeURIComponent(JSON.stringify(actionData));
    var url = 'https://alipay.kylinBridge/?data=' + apiQueryString;

    if (OriginalFetch) {
      // android
      OriginalFetch(url, {
        mode: 'no-cors'
      }).then(function () {}).catch(function () {});
    } else {
      // iOS
      OriginalBridgeCall('internalAPI', {
        method: api,
        param: param
      });
    }
  };

  var eventHandler = function eventHandler(data) {
    try {
      if (data.fromVConsoleToWorker) {
        var requestId = data.requestId;

        if (data.method === 'exec') {
          var sendBack = function sendBack(value) {
            return callInternalAPI('tinyDebugConsole', {
              type: 'msgFromWorkerToVConsole',
              content: CircularJSON.stringify({
                requestId: requestId,
                returnValue: value
              }, replacer)
            });
          };
          try {
            new OriginalFunction('requestId', 'sendBack', '\n              const res = ' + data.script + ';\n              console.log(res);\n            ')(requestId, sendBack);
          } catch (error) {
            console.error(error.name + ':' + error.message);
          }
        }
      }
    } catch (e) {}
  };

  setTimeout(function () {
    if (self.document) {
      self.document.addEventListener('push', function (e) {
        try {
          eventHandler(JSON.parse(e.data.param.content));
        } catch (e) {}
      });
    }
    // eslint-disable-next-line
    self.addEventListener('push', function (e) {
      try {
        var data = JSON.parse(JSON.parse(e.data.text()).param.data.content);
        eventHandler(data);
      } catch (e) {}
    });
  }, 10);

  ['log', 'info', 'error', 'debug', 'warn'].forEach(function (type) {
    var originalType = 'o' + type;
    if (console[originalType]) {
      return;
    }
    console[originalType] = console[type];
    console[type] = function () {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console)[originalType].apply(_console, args);
      var content = void 0;
      try {
        content = CircularJSON.stringify(args.map(function (i) {
          return i instanceof Error ? i.name + ': ' + i.message : i;
        }), replacer);
      } catch (e) {
        console.error(e.name + ': ' + e.message);
        return;
      }
      callInternalAPI('tinyDebugConsole', {
        content: content,
        type: 'console_' + type
      });
    };
  });
})();if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../..//app');
require('../../component/Counter/index');
require('../../component/Search-bar/index');
require('../../component/Swipeaction/index');
require('../../component/List-component/list-item/index');
require('../../component/Date-select/index');
require('../../component/List-component/index');
require('../../component/Notice/index');
require('../../component/Popup/index');
require('../../component/Picker/index');
require('../../component/Footer/index');
require('../../page/component/index');
require('../../page/component/action-sheet/action-sheet');
require('../../page/component/button/button');
require('../../page/component/canvas/canvas');
require('../../page/component/checkbox/checkbox');
require('../../page/component/form/form');
require('../../page/component/icon/icon');
require('../../page/component/image/image');
require('../../page/component/input/input');
require('../../page/component/label/label');
require('../../page/component/loading/loading');
require('../../page/component/map/map');
require('../../page/component/modal/modal');
require('../../page/component/navigator/navigate');
require('../../page/component/navigator/redirect');
require('../../page/component/navigator/reLaunch');
require('../../page/component/navigator/navigator');
require('../../page/component/picker/picker');
require('../../page/component/picker-view/picker-view');
require('../../page/component/progress/progress');
require('../../page/component/radio/radio');
require('../../page/component/scroll-view/scroll-view');
require('../../page/component/slide-tab/slide-tab');
require('../../page/component/slider/slider');
require('../../page/component/swiper/swiper');
require('../../page/component/switch/switch');
require('../../page/component/text/text');
require('../../page/component/textarea/textarea');
require('../../page/component/toast/toast');
require('../../page/component/view/view');
require('../../page/component/lifestyle/lifestyle');
require('../../page/component/contact-button/contact-button');
require('../../page/API/index/index');
require('../../page/API/share/share');
require('../../page/API/action-sheet/action-sheet');
require('../../page/API/alert/alert');
require('../../page/API/animation/animation');
require('../../page/API/canvas/canvas');
require('../../page/API/card-pack/card-pack');
require('../../page/API/choose-city/choose-city');
require('../../page/API/choose-location/choose-location');
require('../../page/API/confirm/confirm');
require('../../page/API/contact/contact');
require('../../page/API/date-picker/date-picker');
require('../../page/API/option-menu/option-menu');
require('../../page/API/download-file/download-file');
require('../../page/API/file/file');
require('../../page/API/get-auth-code/get-auth-code');
require('../../page/API/get-location/get-location');
require('../../page/API/get-network-type/get-network-type');
require('../../page/API/get-system-info/get-system-info');
require('../../page/API/get-server-time/get-server-time');
require('../../page/API/get-user-info/get-user-info');
require('../../page/API/get-image-info/get-image-info');
require('../../page/API/image/image');
require('../../page/API/keyboard/keyboard');
require('../../page/API/loading/loading');
require('../../page/API/make-phone-call/make-phone-call');
require('../../page/API/phone/phone');
require('../../page/API/multi-level-select/multi-level-select');
require('../../page/API/navigation-bar-loading/navigation-bar-loading');
require('../../page/API/navigator/navigator');
require('../../page/API/open-location/open-location');
require('../../page/API/pull-down-refresh/pull-down-refresh');
require('../../page/API/pay-sign-center/pay-sign-center');
require('../../page/API/request/request');
require('../../page/API/request-payment/request-payment');
require('../../page/API/scan-code/scan-code');
require('../../page/API/set-navigation-bar/set-navigation-bar');
require('../../page/API/show-auth-guide/show-auth-guide');
require('../../page/API/storage/storage');
require('../../page/API/toast/toast');
require('../../page/API/upload-file/upload-file');
require('../../page/API/vibrate/vibrate');
require('../../page/API/watch-shake/watch-shake');
require('../../page/API/clipboard/clipboard');
require('../../page/API/bluetooth/bluetooth');
require('../../page/API/rsa/rsa');
require('../../page/API/page-scroll-to/page-scroll-to');
require('../../page/API/websocket/websocket');
require('../../page/API/zm-credit-borrow/zm-credit-borrow');
require('../../page/API/create-selector-query/create-selector-query');
require('../../page/API/sdk-version/sdk-version');
require('../../page/API/user-capture-screen/user-capture-screen');
require('../../page/API/screen/screen');
require('../../page/API/compress-image/compress-image');
require('../../page/API/report-analytics/report-analytics');
require('../../page/API/text-risk-identification/text-risk-identification');
require('../../page/biz/index');
require('../../page/biz/pages/collapse/index');
require('../../page/biz/pages/dropdown/index');
require('../../page/biz/pages/error-view/index');
require('../../page/biz/pages/grid/index');
require('../../page/biz/pages/list/index');
require('../../page/biz/pages/tag/index');
require('../../page/biz/pages/counter/index');
require('../../page/biz/pages/search-bar/index');
require('../../page/biz/pages/swipeaction/index');
require('../../page/biz/pages/date-select/index');
require('../../page/biz/pages/list-component/index');
require('../../page/biz/pages/notice/index');
require('../../page/biz/pages/popup/index');
require('../../page/biz/pages/picker/index');
require('../../page/biz/pages/footer/index');
require('../../page/biz/pages/refresh/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}