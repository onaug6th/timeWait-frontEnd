import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginUserDataModal } from './login-modal.model';
import { loginModalAPPService } from './login-modal.service';

declare var $: any;

@Component({
    selector: 'loginModal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

    public userForm: FormGroup;

    public userInfo: LoginUserDataModal = new LoginUserDataModal();

    public formErrors = {
        'userName': '',
        'passWord': '',
        'formError': ''
    };
    validationMessages = {
        'userName': {
            'required': '不填你是要用空气登陆吗。',
            // 'minlength': '用户名4到32个字符。',
            'maxlength': '有这么长的用户名？',
            'pattern': '你用户名或邮箱有空格吗？'
        },
        'passWord': {
            'required': '密码必须输入。',
            'minlength': '密码至少要1位。',
            'pattern': '我允许你密码用空格了吗？'
        }
    };

    constructor(
        public fb: FormBuilder,
        public router: Router,
        public loginModalAPPService: loginModalAPPService
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
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
            "passWord": [
                this.userInfo.passWord,
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

    onValueChanged(data?: any) {
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

    public login() {
        var that = this;
        if (!that.userForm.valid) {
            window['swal']({ title: "???", text: "资料都没填完想登陆什么" });
            return;
        }
        that.userInfo = that.userForm.value;
        this.loginModalAPPService.login(that.userInfo).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    //  清空登陆表单内容
                    that.userForm.setValue({ userName: "", passWord: "" });
                    that.formErrors.userName = "";
                    that.formErrors.passWord = "";

                    window['swal']({title:"登陆成功", type: "success"});
                        $('#loginModal').modal('hide');
                        //  TODO  临时解决方案，这里将后端返回登陆的用户名存在sessionStorage
                        sessionStorage.setItem("currentUser", JSON.stringify(result.data));
                        that.loginModalAPPService.subject.next(Object.assign({}, result.data));
                        // location.reload();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

}
