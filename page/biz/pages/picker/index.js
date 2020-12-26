import pickerChange from '/util/picker';
Page({
  ...pickerChange.pickerChangeFun,
  data: {
    ...pickerChange.data,
    pickerlist: [],
    showBottom: false,
    valobj: {arr:[0],str: 0},
  },
  onLoad() {
    this.data.pickerlist = [
      { id: "86986901", text: "选择1" },
      { id: "86925301", text: "选择2" },
      { id: "86498660", text: "选择3" },
      { id: "85235590", text: "选择4" },
      { id: "82636901", text: "选择5" },
      { id: "86623190", text: "选择6" }
    ]
    this.data.valobj.text = this.data.pickerlist[0].text
    this.data.valobj.id = this.data.pickerlist[0].id
  },
  onBottomBtnTap() {
    this.setData({
      showBottom: true,
    })
  },
  onPopupClose() {
    this.setData({
      showBottom: false,
    });
  },
  tapCancel() {
    this.setData({
      showBottom: false,
    })
  },
  tapConfirm() {
    let valarr = this.data.value,
        valobj = this.data.valobj;
    valobj.arr = valarr
    valobj.str = valarr[0]
    valobj.text = this.data.pickerlist[valobj.str].text
    valobj.id = this.data.pickerlist[valobj.str].id

    this.setData({
      showBottom: false,
      valobj,
      pickertext: valobj.text
    })
    console.log(this.data.valobj)
  },
})