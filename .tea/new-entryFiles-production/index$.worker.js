if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');

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
require('../../app.js?appxworker=1');
require('../../component/Counter/index.js?appxworker=1');
require('../../component/Search-bar/index.js?appxworker=1');
require('../../component/Swipeaction/index.js?appxworker=1');
require('../../component/List-component/list-item/index.js?appxworker=1');
require('../../component/Date-select/index.js?appxworker=1');
require('../../component/List-component/index.js?appxworker=1');
require('../../component/Notice/index.js?appxworker=1');
require('../../component/Popup/index.js?appxworker=1');
require('../../component/Picker/index.js?appxworker=1');
require('../../component/Footer/index.js?appxworker=1');
require('../../page/component/index.js?appxworker=1');
require('../../page/component/action-sheet/action-sheet.js?appxworker=1');
require('../../page/component/button/button.js?appxworker=1');
require('../../page/component/canvas/canvas.js?appxworker=1');
require('../../page/component/checkbox/checkbox.js?appxworker=1');
require('../../page/component/form/form.js?appxworker=1');
require('../../page/component/icon/icon.js?appxworker=1');
require('../../page/component/image/image.js?appxworker=1');
require('../../page/component/input/input.js?appxworker=1');
require('../../page/component/label/label.js?appxworker=1');
require('../../page/component/loading/loading.js?appxworker=1');
require('../../page/component/map/map.js?appxworker=1');
require('../../page/component/modal/modal.js?appxworker=1');
require('../../page/component/navigator/navigate.js?appxworker=1');
require('../../page/component/navigator/redirect.js?appxworker=1');
require('../../page/component/navigator/reLaunch.js?appxworker=1');
require('../../page/component/navigator/navigator.js?appxworker=1');
require('../../page/component/picker/picker.js?appxworker=1');
require('../../page/component/picker-view/picker-view.js?appxworker=1');
require('../../page/component/progress/progress.js?appxworker=1');
require('../../page/component/radio/radio.js?appxworker=1');
require('../../page/component/scroll-view/scroll-view.js?appxworker=1');
require('../../page/component/slide-tab/slide-tab.js?appxworker=1');
require('../../page/component/slider/slider.js?appxworker=1');
require('../../page/component/swiper/swiper.js?appxworker=1');
require('../../page/component/switch/switch.js?appxworker=1');
require('../../page/component/text/text.js?appxworker=1');
require('../../page/component/textarea/textarea.js?appxworker=1');
require('../../page/component/toast/toast.js?appxworker=1');
require('../../page/component/view/view.js?appxworker=1');
require('../../page/component/lifestyle/lifestyle.js?appxworker=1');
require('../../page/component/contact-button/contact-button.js?appxworker=1');
require('../../page/API/index/index.js?appxworker=1');
require('../../page/API/share/share.js?appxworker=1');
require('../../page/API/action-sheet/action-sheet.js?appxworker=1');
require('../../page/API/alert/alert.js?appxworker=1');
require('../../page/API/animation/animation.js?appxworker=1');
require('../../page/API/canvas/canvas.js?appxworker=1');
require('../../page/API/card-pack/card-pack.js?appxworker=1');
require('../../page/API/choose-city/choose-city.js?appxworker=1');
require('../../page/API/choose-location/choose-location.js?appxworker=1');
require('../../page/API/confirm/confirm.js?appxworker=1');
require('../../page/API/contact/contact.js?appxworker=1');
require('../../page/API/date-picker/date-picker.js?appxworker=1');
require('../../page/API/option-menu/option-menu.js?appxworker=1');
require('../../page/API/download-file/download-file.js?appxworker=1');
require('../../page/API/file/file.js?appxworker=1');
require('../../page/API/get-auth-code/get-auth-code.js?appxworker=1');
require('../../page/API/get-location/get-location.js?appxworker=1');
require('../../page/API/get-network-type/get-network-type.js?appxworker=1');
require('../../page/API/get-system-info/get-system-info.js?appxworker=1');
require('../../page/API/get-server-time/get-server-time.js?appxworker=1');
require('../../page/API/get-user-info/get-user-info.js?appxworker=1');
require('../../page/API/get-image-info/get-image-info.js?appxworker=1');
require('../../page/API/image/image.js?appxworker=1');
require('../../page/API/keyboard/keyboard.js?appxworker=1');
require('../../page/API/loading/loading.js?appxworker=1');
require('../../page/API/make-phone-call/make-phone-call.js?appxworker=1');
require('../../page/API/phone/phone.js?appxworker=1');
require('../../page/API/multi-level-select/multi-level-select.js?appxworker=1');
require('../../page/API/navigation-bar-loading/navigation-bar-loading.js?appxworker=1');
require('../../page/API/navigator/navigator.js?appxworker=1');
require('../../page/API/open-location/open-location.js?appxworker=1');
require('../../page/API/pull-down-refresh/pull-down-refresh.js?appxworker=1');
require('../../page/API/pay-sign-center/pay-sign-center.js?appxworker=1');
require('../../page/API/request/request.js?appxworker=1');
require('../../page/API/request-payment/request-payment.js?appxworker=1');
require('../../page/API/scan-code/scan-code.js?appxworker=1');
require('../../page/API/set-navigation-bar/set-navigation-bar.js?appxworker=1');
require('../../page/API/show-auth-guide/show-auth-guide.js?appxworker=1');
require('../../page/API/storage/storage.js?appxworker=1');
require('../../page/API/toast/toast.js?appxworker=1');
require('../../page/API/upload-file/upload-file.js?appxworker=1');
require('../../page/API/vibrate/vibrate.js?appxworker=1');
require('../../page/API/watch-shake/watch-shake.js?appxworker=1');
require('../../page/API/clipboard/clipboard.js?appxworker=1');
require('../../page/API/bluetooth/bluetooth.js?appxworker=1');
require('../../page/API/rsa/rsa.js?appxworker=1');
require('../../page/API/page-scroll-to/page-scroll-to.js?appxworker=1');
require('../../page/API/websocket/websocket.js?appxworker=1');
require('../../page/API/zm-credit-borrow/zm-credit-borrow.js?appxworker=1');
require('../../page/API/create-selector-query/create-selector-query.js?appxworker=1');
require('../../page/API/sdk-version/sdk-version.js?appxworker=1');
require('../../page/API/user-capture-screen/user-capture-screen.js?appxworker=1');
require('../../page/API/screen/screen.js?appxworker=1');
require('../../page/API/compress-image/compress-image.js?appxworker=1');
require('../../page/API/report-analytics/report-analytics.js?appxworker=1');
require('../../page/API/text-risk-identification/text-risk-identification.js?appxworker=1');
require('../../page/biz/index.js?appxworker=1');
require('../../page/biz/pages/collapse/index.js?appxworker=1');
require('../../page/biz/pages/dropdown/index.js?appxworker=1');
require('../../page/biz/pages/error-view/index.js?appxworker=1');
require('../../page/biz/pages/grid/index.js?appxworker=1');
require('../../page/biz/pages/list/index.js?appxworker=1');
require('../../page/biz/pages/tag/index.js?appxworker=1');
require('../../page/biz/pages/counter/index.js?appxworker=1');
require('../../page/biz/pages/search-bar/index.js?appxworker=1');
require('../../page/biz/pages/swipeaction/index.js?appxworker=1');
require('../../page/biz/pages/date-select/index.js?appxworker=1');
require('../../page/biz/pages/list-component/index.js?appxworker=1');
require('../../page/biz/pages/notice/index.js?appxworker=1');
require('../../page/biz/pages/popup/index.js?appxworker=1');
require('../../page/biz/pages/picker/index.js?appxworker=1');
require('../../page/biz/pages/footer/index.js?appxworker=1');
require('../../page/biz/pages/refresh/index.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success: success }) : success();
}