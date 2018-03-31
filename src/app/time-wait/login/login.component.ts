import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { loginDataModal } from './login.model';

import { loginModalAPPService } from '../../common/login-modal/login-modal.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    public userForm: FormGroup;
    public userInfo: loginDataModal = new loginDataModal();

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
            'pattern':'你用户名或邮箱有空格吗？'
        },
        'passWord': {
            'required': '密码必须输入。',
            'minlength': '密码至少要1位。',
            'pattern':'我允许你密码用空格了吗？'
        }
    };

    constructor(
        public fb: FormBuilder,
        public loginModalAPPService: loginModalAPPService,
        public router: Router,
        public route: ActivatedRoute
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
                    window['swal']("登陆成功", "", "success");
                    window["$"]('#loginModal').modal('hide');
                    
                    //  TODO  临时解决方案，这里将后端返回登陆的用户名存在sessionStorage
                    sessionStorage.setItem("currentUser", JSON.stringify(result.data));
                    this.loginModalAPPService.subject.next(Object.assign({}, result.data));

                    //  登陆成功跳去广场
                    that.router.navigateByUrl("/timeWait/square");
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }
}