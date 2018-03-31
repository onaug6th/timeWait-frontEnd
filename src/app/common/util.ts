import * as moment from "moment";
export class Util {
  public static $ = window["$"];

  /**
   * 日期时间范围插件daterangepicker初始化
   * @param {string} selector 要被初始化DOM元素css选择器
   * @param {string} config 配置对象
   * @param {boolean} mergeDefaultConfig 是否以默认配置为基础，进行默认配置和用户配置对象进行合并
   * @param {boolean} initToday 是否默认初始化当天日期
   */
  public static daterangepickerPluginInit(selector: string = "",
                                          config: Object = {},
                                          mergeDefaultConfig: boolean = true,
                                          initToday: boolean = false) {
    const defaultConfig = {
      autoUpdateInput: false,
      "locale": {
        applyLabel: '确定',
        cancelLabel: '清空',
        format: "YYYY-MM-DD",
        separator: " - ",
        daysOfWeek: [
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六"
        ],
        monthNames: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
    };
    if (mergeDefaultConfig) {
      config = Util.$.extend(true, {}, defaultConfig, config);
    }
    Util.$(selector)
      .daterangepicker(config)
      .each((index, item) => {
        Util.$(item)
          .on('apply.daterangepicker', function (ev, picker) {
            Util.$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 至 ' + picker.endDate.format('YYYY-MM-DD'));
          })
          .on('cancel.daterangepicker', function () {
            Util.$(this).val('');
          });
        if (initToday) {
          const initValue = moment(new Date()).format('YYYY-MM-DD') + ' 至 ' + moment(new Date()).format('YYYY-MM-DD');
          Util.$(selector).val(initValue);
        }
      });
  }

  /**
   * 日期插件datepicker初始化
   * @param {string} selector 要被初始化DOM元素css选择器
   * @param config 配置对象
   * @param {boolean} mergeDefaultConfig 是否以默认配置为基础，进行默认配置和用户配置对象进行合并
   */
  public static datepickerPluginInit(selector: string = "", config: Object = {}, mergeDefaultConfig: boolean = true) {
    const defaultConfig = {
      language: "zh-CN",
      format: "yyyy-mm-dd"
    };
    if (mergeDefaultConfig) {
      config = Util.$.extend(true, {}, defaultConfig, config);
    }
    Util.$(selector).datepicker(config);
  }

  /**
   * 重置指定表单元素，输入框和下拉框将被赋值为空字符串，单选按钮，多选按钮将被取消勾选状态
   * @param selector 要被操作的表单DOM元素css选择器
   */
  public static resetInputs(selector: string = "") {
    if (selector.length > 0) {
      Util.$(selector).each((index, item) => {
        const $item = Util.$(item);
        const type = item.type;
        const select2 = $item.data('select2');
        switch (type) {
          case 'text':
          case 'select':
          case 'select-one':
          case 'select-multiple':
            (select2 != null) ? $item.select2('val', ['']) : $item.val('');
            break;
          case 'checkbox':
          case 'radio':
            $item.prop('checked', false);
            break;
        }
      });
    }
  }
}
