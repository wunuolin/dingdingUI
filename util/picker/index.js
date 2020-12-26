export default {
  data: {
    // 初始值
    value: [0]
  },
  pickerChangeFun: {
    onPickerChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
  }
}
