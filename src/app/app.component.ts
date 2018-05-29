import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

import { AppComponentService } from './app.service';
import { loginModalAPPService } from './common/login-modal/login-modal.service';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppComponentService,
    loginModalAPPService
  ]
})
export class AppComponent implements OnInit {

  //  当前已经登陆的用户变量
  public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser"));

  /**
   * 当前用户已经获得的成就及等级
   * {
   *    "成就类型"："成就等级"
   * }
   */
  public currentLoggedInUserAchievement = {};

  //  全部成就列表变量
  public allAachievementList;

  //  成就无聊的计数
  public boringClickCount: number = 0;

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer,
    public AppComponentService: AppComponentService,
    public loginModalAPPService: loginModalAPPService
  ) { }

  ngOnInit() {
    console.log(`%c 你好啊 😄 %c 开发者 💻`,
                "background:#014983 ; font-size : 14px;color : white; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
                "background:#ccc ; font-size : 14px; color : #014983; padding: 1px; border-radius: 0 3px 3px 0;");

    console.log(`%c很高兴在这里看到你 😊`,
    "background:#fff ; color : #014983;font-size : 14px; padding: 1px; border-radius: 0 3px 3px 0;");

    console.info('%c这是我的联系方式 wechat 🛰️: onaug6th ,qq 🐧: 592986151','font-size : 14px;');

    const that = this;
    //  首次加载先获取全部成就列表
    that.getAllAchievementList();

    //  如果是已登陆用户，先获取当前用户的已获得的成就
    if (this.currentLoggedInUser) {
      this.getCurrentLoggedInUserAchievementList();
    }

    //  一开始没有登陆，监听,当登陆的时候再获取成就信息
    this.loginModalAPPService.getCurrentLoggedInUser.subscribe(data => {
      this.currentLoggedInUser = data;
      this.getCurrentLoggedInUserAchievementList();
    },
      error => console.error(error)
    );

    that.renderer.listen(that.elementRef.nativeElement, 'click', (event: any) => {
      if (event.target.dataset.field === "boring") {
        if (that.boringClickCount < 10) {
          that.boringClickCount += 1;
          //  判断点击次数为10，并且当前用户没有拥有这个成就
          if (that.boringClickCount == 10 && !that.currentLoggedInUserAchievement["1"] && this.currentLoggedInUser) {
            //  这里定义请求变量，因为一开始请求了全部成就列表数据。所以用lodash的filter方法筛选出符合（初级无聊成就的数据）并取出id，将其传送到后端添加到用户信息表
            const param = {
              userID: that.currentLoggedInUser.userID,
              //  这里获得了初级成就，无聊类一级成就 所以是 achievementType:1,achievementLevel:1
              achievementID: _.filter(that.allAachievementList, { "achievementType": 1, "achievementLevel": 1 })[0]["_id"]
            }
            that.AppComponentService.sendCurrentLoggedInUserGetAchievment(param).subscribe(result => {
              if (result) {
                if (result.code == 0) {
                  console.info("保存新成就成功！");
                }
                if (result.code == 1) {
                  window['swal'](result.msg, result.detailMsg, "info");
                }
              }
            });
            window["swal"](
              {
                title: "噢我的老伙计！",
                text: `恭喜你获得了<strong style="color:red">无聊</strong>的初级成就！<br><p style="color:#f0ad4e">你可以在个人成就里看到已经获得的成就！</p>`,
                type: "success",
                html: true,
                closeOnConfirm: true,
                confirmButtonText: "太棒了！"
              });
          }
        }

        if (that.boringClickCount >= 10) {
          this.boringClickCount += 1;
          if (that.boringClickCount == 20 && that.currentLoggedInUserAchievement["1"] < 2 && this.currentLoggedInUser) {
            const param = {
              userID: that.currentLoggedInUser.userID,
              achievementID: _.filter(that.allAachievementList, { "achievementType": 1, "achievementLevel": 2 })[0]["_id"]
            }
            that.AppComponentService.sendCurrentLoggedInUserGetAchievment(param).subscribe(result => {
              if (result) {
                if (result.code == 0) {
                  console.info("保存新成就成功！");
                }
                if (result.code == 1) {
                  window['swal'](result.msg, result.detailMsg, "info");
                }
              }
            });
            window["swal"](
              {
                title: "噢我的老伙计！",
                text: `哇哦，你又获得了<strong style="color:red">超无聊</strong>的中级成就！<br><p style="color:#f0ad4e">你可以在个人成就里看到已经获得的成就！</p>`,
                type: "success",
                html: true,
                closeOnConfirm: true,
                confirmButtonText: "太棒了！"
              });
          }
        }
      }

    });

    // that.renderer.listen(that.elementRef.nativeElement, 'mouseover', (event: any) => {
    //   event.target
    // });
  }

  //  获取所有成就列表
  public getAllAchievementList() {
    return this.AppComponentService.getAllAchievementList().subscribe(result => {
      if (result) {
        if (result.code == 0) {
          this.allAachievementList = result.data;
        }
        if (result.code == 1) {
          window['swal'](result.msg, result.detailMsg, "info");
        }
      }
    });
  }

  //  获取当前登陆用户的成就列表
  public getCurrentLoggedInUserAchievementList() {
    const param = {
      userID: this.currentLoggedInUser.userID
    }
    return this.AppComponentService.getAchievementList(param).subscribe(result => {
      if (result) {
        if (result.code == 0) {
          var arr = result.data;
          var hashTable = {};
          for (let i = 0; i < arr.length; i++) {
            //  这里将返回的成就数组组成一个新对象，键值对为成就类型/成就等级。  hashTable[arr[i].achievementType] == undefined 为第一次发现这个属性
            if ((arr[i].achievementLevel > hashTable[arr[i].achievementType]) || hashTable[arr[i].achievementType] == undefined) {
              hashTable[arr[i].achievementType] = arr[i].achievementLevel;
            }
          }
          this.currentLoggedInUserAchievement = hashTable;
        }
      }
    });
  }

  //  去重函数
  public unique(arr) {
    let hashTable = {};
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      //  如果hashTable 中 不存在 arr[i] 这个属性
      if (!hashTable[arr[i]]) {
        //  如果不存在，则设置 hashTable 的 arr[i]的属性为true
        hashTable[arr[i]] = true;
        //  然后将 arr[i] 推入数组
        data.push(arr[i]);
      }
    }
    return data
  }
}
