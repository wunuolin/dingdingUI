Component({
  data: {
    flag: false,
    yearMonth: [],
  },
  props: {  //设置默认值和返回值（函数返回）
    startyear: 2000,
    endyear: '',
    onSubmit: function onSubmit() { }
  },
  didMount: function didMount() {
    // 只执行一次
    // 只做视图的渲染和初始的日期（当前日期）
    var firstdata = {},
      myDate = new Date(),
      nowy = myDate.getFullYear(),
      nowm = String(myDate.getMonth() + 1).length == 1 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1,
      year_month = nowy + '-' + nowm,
      y, m,
      ym = this.data.yearMonth,
      year = [],
      month = [],
      nowYear = myDate.getFullYear();
    var _props = this.props,
      startyear = _props.startyear,
      endyear = _props.endyear;
    if (endyear == '') {
      endyear = nowy
    }
    // 创建视图数据
    if (ym.length != 2) {
      for (let i = 1; i <= 12; i++) {
        i = String(i).length == 1 ? '0' + i : String(i)
        month.push(i)
      }
      ym.push(month)
      for (let i = startyear; i <= endyear; i++) {
        year.push(String(i))
      }
      ym.push(year)
    }

    // 初始日期
    y = this.data.yearMonth[1]
    m = this.data.yearMonth[0]
    firstdata.ymstr = []
    for (let i = 0; i < y.length; i++) {
      if (Number(y[i]) == nowy) {
        firstdata.ymstr.push(i)
        break
      }
    }
    for (let i = 0; i < m.length; i++) {
      if (Number(m[i]) == Number(nowm)) {
        firstdata.ymstr.push(i)
        break
      }
    }
    firstdata.ym = year_month
    this.setData({
      searchdate: firstdata,
      yearMonth: this.data.yearMonth
    })
    dd.setStorageSync({
      key: 'searchdate',
      data: firstdata
    })
  },
  didUpdate: function didUpdate() {
    // 稍微有点更新改动就执行
  },
  methods: {
    fadeInOut:  function fadeInOut(num) {
      var animation = dd.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
      });
      this.animation = animation;
      animation.opacity(num).step();
      this.setData({
        animationInfo: animation.export()
      })
    },
    show: function show() {
      this.setData({ flag: true })
      this.fadeInOut(1)
    },
    hid: function hid() {
      this.setData({ flag: false })
    },
    tapShow: function tapShow() {
      this.show()
    },
    onChangeDate: function onChangeDate(e) {
      this.setData({
        value: e.detail.value,
      })
    },
    viewCancle: function viewCancle() {
      this.hid()
    },
    viewConfirm: function viewConfirm() {
      let year_month,
        searchdate = {},
        onSubmit = this.props.onSubmit;
      if (this.data.value === undefined) {
        searchdate = (dd.getStorageSync({ key: 'searchdate' })).data
        year_month = searchdate.ym
      } else {
        let user_id, url,
          getdate = this.data.value,
          getym = this.data.yearMonth,
          gety = getdate[0],
          getm = getdate[1];
        year_month = String(getym[1][gety] + '-' + getym[0][getm])
        searchdate.ym = year_month
        searchdate.ymstr = getdate
      }
      dd.setStorageSync({
        key: 'searchdate',
        data: searchdate
      })
      this.setData({
        searchdate
      })
      this.hid()
      onSubmit(year_month)
    },
  }
})