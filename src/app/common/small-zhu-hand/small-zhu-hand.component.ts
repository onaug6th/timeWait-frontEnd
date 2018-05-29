import { Component, OnInit, ElementRef, ViewChild, Directive } from '@angular/core';

import { CommonService } from '../../services/common.service';

declare var $: any;

@Component({
    selector: 'smallZhuHand',
    templateUrl: './small-zhu-hand.component.html',
    styleUrls: ['./small-zhu-hand.component.scss']
})
export class SmallZhuHandComponent implements OnInit {


    public messageList = [
        {
            message: "你好,我刚被写出来.现在还不怎么会讲话",
            type: "answer",
            additional: 0
        }
    ];

    public firstOpen = true;

    public currentUser = sessionStorage.getItem("currentUser");

    /**
     * 设置大体区域内容ref
     * @type {ElementRef}
     */
    @ViewChild('dialogbody')
    public dialogbody: ElementRef;

    /**
     * 设置大体区域文本框ref
     * @type {ElementRef}
     */
    @ViewChild('dialogInput')
    public dialogInput: ElementRef;

    constructor(
        public CommonService: CommonService
    ) { }

    ngOnInit() {
        this.hideTopBtn();
        this.bindEnterEvents();
    }

    /**
     * 呼出小助手函数
     */
    public toggleSmallZhuHand() {
        //  当小助手的right属性小于0px，说明在屏幕之外处于隐藏状态，这时让他显示，否则隐藏
        if ($(".smallzhuhand-dialog").css("right") < "0px") {
            //  当处于小屏幕时的特殊处理
            if ($(window).width() < 500) {
                $(".smallzhuhand-dialog").animate({ right: "0px" }).css("display", "");
                $(".smallzhuhand-dialog").attr("style", "width:100%");
            } else {
                $(".smallzhuhand-dialog").animate({ right: "46px" }).css("display", "");
                $(".smallzhuhand-dialog").attr("style", "width:400px");
            }

            if (this.firstOpen) {
                var addressUrl = location.pathname;
                if (addressUrl.includes("/timeWait/register")) {
                    const message = {
                        message: ``,
                        type: "answer",
                        additional: 1
                    }
                    this.messageList.push(message);
                    this.firstOpen = false;
                }
            }

        } else {
            $(".smallzhuhand-dialog").animate({ right: "-400px" }).fadeOut();
        }
        this.scrollToBottom();
    }

    /**
     * 隐藏回到顶部按钮函数
     */
    public hideTopBtn() {
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#gotop").fadeIn(500);
            }
            else {
                $("#gotop").fadeOut(500);
            }
        });
    }

    public customMessage(message) {

    }

    /**
     * 回到顶部函数
     */
    public goTop() {
        eval(`$('html,body').animate({ scrollTop: 0 }, 1000)`);
    }

    /**
     * 绑定回车事件
     */
    public bindEnterEvents() {
        var that = this;
        this.dialogInput.nativeElement.onkeydown = e => {
            if (e.keyCode == 13) {
                that.sendMessage();
            }
        }
    }

    /**
     * 聊天内容部分滚动到底部函数
     */
    public scrollToBottom() {
        /*
        * clientHeight 这个元素的高度,占用整个空间的高度.
        * offsetHeight	是指元素内容的高度,包括可见部分及以滚动条下面的不可见部分。
        */
        let offsetHeight = this.dialogbody.nativeElement.scrollHeight;
        $(this.dialogbody.nativeElement).animate({ scrollTop: offsetHeight }, 1000);
    }

    /**
     * 快速回复函数
     */
    public quickAnswer($event) {
        //$event vue that.target
        var targetText = $event.target.text;
        this.dialogInput.nativeElement.value = targetText;
    }

    /**
     * 发送消息函数
     */
    public sendMessage() {
        var sendText = this.dialogInput.nativeElement.value;
        if (sendText == "" || sendText == null) {

        }
        else {
            const message = {
                message: this.dialogInput.nativeElement.value,
                type: "ask",
                additional: 0
            }
            this.messageList.push(message);
            this.scrollToBottom();
            //清空文本框
            this.dialogInput.nativeElement.value = "";
            this.thinkingAnswer(sendText);
        }
    }

    /**
     * 思考问题函数
     * @param {any} par 用户发送的内容
     */
    public thinkingAnswer(par) {
        const that = this;
        var answerText = "";
        var strLength = par.split('').length;
        if (strLength > 60) {
            answerText = "太长不看";
        }
        else {
            answerText = that.executeAnswer(par);
        }
        var message = {
            message: answerText,
            type: "answer",
            additional: 0
        }
        var dtd = $.Deferred();	// 新建一个deferred对象
        var wait = function (dtd) {
            var tasks = function () {
                dtd.resolve();	// 改变deferred对象的执行状态
            };
            setTimeout(tasks, 2000);
            return dtd;
        };
        $.when(wait(dtd))
            .done(function () {

                if (par == "帮助") {
                    message = {
                        message: '',
                        type: "answer",
                        additional: 99
                    }
                }

                that.messageList.push(message);
                that.scrollToBottom();
            })
            .fail(function () { console.log("出错！"); });
    }

    /**
     * 处理回复函数
     * @param {any} par 
     */
    public executeAnswer(par) {
        let answer = "";
        let flag = true;
        let dictionary: Array<any> = [
            [
                {
                    "key": ["你好", "hello", "雷猴"],
                    "value": "你好啊"
                },
                {
                    "key": ["你的名字", "你叫什么名字", "你是", "你是谁"],
                    "value": "我的名字叫小助手,目前是这个"
                },
                {
                    "key": ["开发者", "团队", "作者"],
                    "value": "我们的开发者分别是 前端august,后端august"
                },
                {
                    "key": ["购物"],
                    "value": "在卖入口里购物"
                },
            ],
            [
                {
                    "key": ["深圳通"],
                    "value": "我怎么知道怎么充深圳通?"
                },
                {
                    "key": ["没有吃的"],
                    "value": "没有,自己买"
                },
                {
                    "key": ["住,我们", "开黑", "者荣耀"],
                    "value": "可以,我诸葛亮贼6"
                }
            ],
            [
                {
                    "key": ["杨文杰", "ywj"],
                    "value": "你认识这个人吗"
                },
                {
                    "key": ["郭浩填", "ght", "镇", "郭浩镇", "臭镇", "浩填"],
                    "value": "臭镇"
                },
                {
                    "key": ["谢雄", "xx", "谢熊", "发发", "臭发", "熊"],
                    "value": "哇丢,这个发发"
                },
                {
                    "key": ["叶涛", "yt", "涛", "没脑"],
                    "value": "叶涛sb"
                },
                {
                    "key": ["巫苏龙", "wsl", "ab", "臭AB"],
                    "value": "臭AB"
                },
                {
                    "key": ["赵春源", "zcy", "猪", "臭猪", "臭春", "春源"],
                    "value": "臭春"
                },
                {
                    "key": ["郭钟仁", "gzr", "dt", "短腿"],
                    "value": "DT"
                },
                {
                    "key": ["林灿炜", "lcw", "灿炜"],
                    "value": "灿炜阳痿"
                },
                {
                    "key": ["吴家烨", "wjy", "肚毛"],
                    "value": "肚毛佬"
                },
                {
                    "key": ["黄泽波", "hzb"],
                    "value": "四眼"
                },
                {
                    "key": ["刘杨", "ly","胖子","迅捷斥候"],
                    "value": "胖子"
                }
            ],
        ];
        dictionary.forEach(function (item) {
            if (flag) {
                item.forEach(function (detail) {
                    for (var i = 0; i < detail.key.length; i++) {
                        try {
                            if (!(par.toLowerCase().indexOf(detail.key[i]) < 0)) {
                                answer = detail.value;
                                flag = false;
                            } else {
                                if (flag) {
                                    answer = "不好意思，词典里没有这个记录，麻烦你去百度吧";
                                }
                            }
                        } catch (err) {
                            console.info(`发生错误，错误是${err}`);
                        }
                    };
                });
            }
        });
        return answer;
    }

    public unKonwName() {
        var a = ['长', '栓', '狗', '来', '大', '守', '傻', '福', '龟', '二', '胖', '臭'];
        var b = ['芳', '妮', '剩', '球', '坑', '根', '岁', '娃', '毛', '歪', '姑', '英', '妹', '肥', '霞', '狗', '虎', '花', '凤', '腚', '村', '蛋', '妞', '木', '翠', '爱', '财', '头', '胖', '发'];
        var ab = a[parseInt((Math.random() * 12).toString())] + b[parseInt((Math.random() * 30).toString())];
        this.CommonService.userNameSubject.next(Object.assign({}, { isModfiy: true, userName: ab }));
    }
}
