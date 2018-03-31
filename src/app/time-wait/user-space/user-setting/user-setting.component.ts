import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Util } from "../../../common/util";

import { UserSettingService } from './user-setting.service';
import { CommonService } from '../../../services/common.service';

import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../../common/file-upload/file-upload.component';

export class importantProfileModal {
    userName: string;
    email: string;
    [propName: string]: any;
}

declare var $: any;
@Component({
    templateUrl: './user-setting.component.html',
    styleUrls: ['./user-setting.component.scss'],
    providers:[UserSettingService]
})

export class UserSettingComponent implements OnInit, AfterViewInit {

    //  默认头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  头像上传modal配置信息
    public fileUploadModal = {
        modalTile: "",
        title: "",
        modalType :"",
        url: "",
        method: "", // POST OR GET
        itemAlias: "", // file alias
        formDatas: [] // POST 参数
    };

    //  表单对象：重要资料
    public importantProfileForm: FormGroup;

    //  变量：重要资料
    public importantProfileInfo: importantProfileModal = new importantProfileModal();

    //  变量：基本信息变量
    public baseProfileInfo: any = {};

    //  表单错误信息
    public formErrors = {
        'userName': '',
        'email': ''
    };

    //  错误信息对象，从中取值
    public validationMessages = {
        'userName': {
            'required': '用户名是必填的',
            'maxlength': '有这么长的用户名？',
            'pattern': '用户名不允许有空格'
        },
        'email': {
            'required': '邮箱必须输入。',
            'pattern': '请输入正确的邮箱地址。'
        }
    };

    //  当前已经登陆的用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));

    //  当前设置类型
    public nowType = 1;

    //  修改密码模态框双向绑定变量
    public updataModalData: any = {
        oldPassWord: "",
        newPassWord: ""
    };

    @ViewChild('WZRYSelect')
    public WZRYSelect: ElementRef;

    //  上传文件模态框
    @ViewChild(FileUploadComponent)
    private FileUploadComponent: FileUploadComponent;

    constructor(
        public fb: FormBuilder,
        public activeRoute: ActivatedRoute,
        public UserSettingService: UserSettingService,
        public CommonService: CommonService
    ) { }

    ngOnInit() {
        //  获取用户重要信息
        this.getCurrentLoggedInUserImportantProfile();
        //  获取用户基本信息
        this.getCurrentLoggedInUserBaseProfile();
        //  建立表单
        this.buildForm();
        //  发射，告诉顶部导航栏我属于timewait。给我跑出来
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    //  建立表单
    public buildForm(): void {
        this.importantProfileForm = this.fb.group({
            "userName": [
                this.importantProfileInfo.userName,
                [
                    Validators.required,
                    // Validators.minLength(4),
                    Validators.maxLength(32),
                    Validators.pattern("[^\\s]{1,}")
                ]
            ],
            "email": [
                this.importantProfileInfo.email,
                [
                    Validators.required,
                    Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
                ]
            ]
        });
        this.importantProfileForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    //  表单内容发生改变
    public onValueChanged(data?: any) {
        if (!this.importantProfileForm) {
            return;
        }
        const form = this.importantProfileForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    //  获取当前登陆用户重要信息
    public getCurrentLoggedInUserImportantProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.UserSettingService.getImportantProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.importantProfileForm.setValue(
                        {
                            userName: result.data.userName,
                            email: result.data.email
                        }
                    )
                }
                else {
                    window['swal']('出BUG啦，快点联系程序员');
                }
            }
        });
    }

    //  提交重要信息
    public submitImportantProfile() {
        var that = this;
        if (!that.importantProfileForm.valid) {
            window['swal']({ title: "???", text: "请乖乖的填完要修改的资料" });
            return;
        }
        that.importantProfileInfo = that.importantProfileForm.value;
        that.importantProfileInfo.userID = that.currentLoggedInUser.userID;
        that.UserSettingService.updateImportantProfile(that.importantProfileInfo).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    const newStorage: any = {
                        userName: that.importantProfileInfo.userName,
                        userID: that.currentLoggedInUser.userID
                    }
                    sessionStorage.setItem("currentUser", JSON.stringify(newStorage));
                    window['swal']({ title: "修改成功", type: "success" },
                        function (isConfirm) {
                            location.reload();
                        }
                    );
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.UserSettingService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.baseProfileInfo = result.data;
                    if(this.baseProfileInfo.avatar){
                        this.avatarCDN = this.baseProfileInfo.avatar;
                    }
                }
            }
        });
    }

    //  提交基础信息
    public submitBaseProfile() {
        const that = this;
        that.baseProfileInfo.userID = that.currentLoggedInUser.userID;
        that.baseProfileInfo.userName = that.currentLoggedInUser.userName;
        //  因为datepicker的内容不能双向绑定
        that.baseProfileInfo.birthDay = $("#birthDay").val();
        that.UserSettingService.updateBaseProfile(that.baseProfileInfo).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    window['swal']({ title: "修改资料成功", type: "success" });
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }


    /**
     * 切换设置
     * @param {any} type 要切换的类型
     * @memberof UserSettingComponent
     */
    public toggleSetting(type) {
        this.nowType = type;
    }

    //  隐藏王者荣耀选择框
    public hideWZRYSelect($event) {
        if ($event.target.value == "破下拉框都没有我的选择") {
            window["swal"]("已经帮你删掉破下拉框了");
            this.WZRYSelect.nativeElement.hidden = true;
        }
    }

    //  修改密码
    public updatePassword() {
        if (!this.updataModalData["oldPassWord"] || !this.updataModalData["newPassWord"]) {
            return window["swal"]("你好像没有输入你的密码");
        }
        const param = {
            userID: this.currentLoggedInUser.userID,
            oldPassWord: this.updataModalData['oldPassWord'],
            newPassWord: this.updataModalData['newPassWord']
        };
        return this.UserSettingService.updatePassword(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    window['swal']({ title: "修改密码成功", text: "下次登陆用新密码登陆噢", type: "success" });
                    this.updataModalData = {};
                    $("#update-password").modal('hide');
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    public openUploadModal() {
        //  配置上传文件信息
        this.fileUploadModal = {
            modalTile: "上传新头像",
            title: "选择一张照片上传新头像",
            modalType : "avatar",
            url: environment.server + "file/photo/avatar",
            method: "POST",
            itemAlias: "avatar",
            formDatas: [{ 
                userID: this.currentLoggedInUser.userID,
                userName : this.currentLoggedInUser.userName
            }]
        };
        this.FileUploadComponent.openModal();
    }

    /**
     * @param result 服务器返回数据时触发
     */
    public updateUserAvatar(result){
        const param = {
            userID:this.currentLoggedInUser.userID,
            avatar:result.data.picSrc
        }
        return this.UserSettingService.updateAvatar(param).subscribe(result => {
            if(result){
                if( result.code == 0){
                    location.reload();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

}