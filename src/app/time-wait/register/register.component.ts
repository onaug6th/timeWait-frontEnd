import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { registerDataModal } from './register.model';

import { CommonService } from '../../services/common.service';
import { RegisterService } from './register.service';

import * as moment from 'moment';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

    public userForm: FormGroup;
    public userInfo: registerDataModal = new registerDataModal();

    public formErrors = {
        'userName': '',
        'email': '',
        'passWord': '',
        'confirmPassWord': '',
        'formError': ''
    };
    validationMessages = {
        'userName': {
            'required': '用户名必须输入。',
            // 'minlength': '用户名4到32个字符。',
            'maxlength': '名字取这么长干嘛？',
            'pattern':'你名字是空格吗？'
        },
        'email': {
            'required': '邮箱必须输入。',
            'pattern': '请输入正确的邮箱地址。'
        },
        'passWord': {
            'required': '密码必须输入。',
            'minlength': '密码至少要1位。',
            'pattern':'你见过密码有空格的吗？'
        },
        'confirmPassWord': {
            'required': '重复密码必须输入。',
            'minlength': '密码至少要1位。',
            'pattern':'你见过密码有空格的吗？',
            'validateEqual': "两次输入的密码不一致。"
        }
    };

    constructor(
        public fb: FormBuilder,
        public CommonService:CommonService,
        public RegisterService: RegisterService,
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.CommonService.userNameModify.subscribe(result =>{
            if(result.isModfiy == true){
                this.freeForName(result.userName);
            }
        });
        this.buildForm();
    }

    public buildForm(): void {
        this.userForm = this.fb.group({
            "userName": [
                this.userInfo.userName,
                [
                    Validators.required,
                    // Validators.minLength(4),
                    Validators.maxLength(32),
                    Validators.pattern("[^\\s]{1,}")
                ]
            ],
            "email": [
                this.userInfo.email,
                [
                    Validators.required,
                    Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
                ]
            ],
            "passWord": [
                this.userInfo.passWord,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.pattern("[^\\s]{1,}")
                ]
            ],
            "confirmPassWord": [
                this.userInfo.confirmPassWord,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.pattern("[^\\s]{1,}")
                ]
            ]
        });
        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    public onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;
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

    public register() {
        var that = this;
        if (!that.userForm.valid) {
            window['swal']({ title: "???", text: "资料都没填完想注册什么" });
            return;
        }
        window["swal"]({
            title: "超严肃的提示",
            text: "邮箱填正确了吗，以后要靠这个找回密码的",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    if (that.userForm.valid) {
                        that.userInfo = that.userForm.value;
                        that.userInfo.registerDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        that.RegisterService.register(that.userInfo).subscribe(result => {
                            if (result) {
                                if (result.code == 0) {
                                    window['swal']("注册成功", "", "success");
                                    that.router.navigateByUrl("/timeWait/login");
                                }
                                if (result.code == 1) {
                                    window['swal'](result.msg, result.detailMsg, "info");
                                }
                            }
                        });
                    }
                }
            });
    }

    public freeForName(userName){
        this.userForm.setValue(
            { 
                userName: userName,
                email:this.userForm.value.email,
                passWord:this.userForm.value.passWord,
                confirmPassWord:this.userForm.value.confirmPassWord
            }
        );
    }
}