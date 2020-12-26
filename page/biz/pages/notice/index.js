Page({
  data:{
      closeShow:true,
      closeActionShow:true
  },
  linkClick() {
      dd.showToast({
          content: '你点击了图标Link NoticeBar',
          duration: 3000
      });
  },
  closableClick() {
      this.setData({
          closeShow:false
      })
      dd.showToast({
          content: '你点击了图标close NoticeBar',
          duration: 3000
      });
  },
  linkActionClick() {
      dd.showToast({
          content: '你点击了文本Link NoticeBar',
          duration: 3000
      });
  },
  closableActionClick() {
      this.setData({
          closeActionShow:false
      })
      dd.showToast({
          content: '你点击了文本close NoticeBar',
          duration: 3000
      });
  }
})