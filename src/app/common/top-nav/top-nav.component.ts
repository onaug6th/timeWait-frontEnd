import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { loginModalAPPService } from '../login-modal/login-modal.service';
import { LoginUserDataModal } from '../login-modal/login-modal.model';
import { CommonService } from '../../services/common.service';


declare var $: any;

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit {
    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  变量：基本信息变量
    public baseProfileInfo: any = {};

    //  当前登陆用户
    public currentLoggedInUser: LoginUserDataModal;

    //  搜索框变量，双向绑定
    public searchParam: String = "";

    public $nav: any;

    // nav是否隐藏,默认为false 未隐藏
    public navIsHide: boolean = false;

    @ViewChild('nav')
    public nav: ElementRef

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public loginModalAPPService: loginModalAPPService,
        public commonService: CommonService
    ) { }

    ngOnInit() {
        this.$nav = $(this.nav.nativeElement);
        this.currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentLoggedInUser) {
            this.getCurrentLoggedInUserBaseProfile();
        }
        //  监听？
        this.loginModalAPPService.getCurrentLoggedInUser
            .merge(this.loginModalAPPService.getCurrentLoggedInUser)
            .subscribe(
            data => {
                this.currentLoggedInUser = data;
                this.getCurrentLoggedInUserBaseProfile();
                let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
                let routerState: RouterState = this.router.routerState;
                let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
            },
            error => console.error(error)
            );

        //  来自通用服务的一个观察函数 isBlog 当他发现值发生改变的时候就
        this.commonService.isBlog.subscribe(data => {
            if (data) {
                if (data.isBlog === true) {
                    this.hideNavBar();
                }
                if (data.isTimeWait === true) {
                    this.showNavBar();
                }
            }
        },
            error => console.error(error)
        );
    }

    /**
     * 隐藏导航栏
     * @memberof TopNavAppComponent
     */
    public showNavBar() {
        this.navIsHide = false;
        this.$nav.animate({ top: '0px' });
        $("body").animate({ paddingTop: '50px' });
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.loginModalAPPService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.baseProfileInfo = result.data;
                    if (this.baseProfileInfo.avatar) {
                        this.avatarCDN = this.baseProfileInfo.avatar;
                    }
                }
            }
        });
    }

    /**
     * 隐藏导航栏
     * @memberof TopNavAppComponent
     */
    public hideNavBar() {
        if (this.navIsHide) {
            this.navIsHide = !this.navIsHide;
            this.$nav.animate({ top: '0px' });
            $("#blogTopNav").animate({ top: '50px' });
            $("body").animate({ paddingTop: '50px' });
        } else {
            this.navIsHide = !this.navIsHide;
            this.$nav.animate({ top: '-50px' });
            $("#blogTopNav").animate({ top: '0px' });
            $("body").animate({ paddingTop: '0px' });
        }
    }

    public toggleShow(){
        if ($(window).width() < 1107) {
            $("#topnav-hide-btn").click();
        }
    }

    /**
     * 搜索
     * @param param 搜索内容
     */
    public search() {
        this.toggleShow();
        this.router.navigateByUrl("/timeWait/search/" + this.searchParam);
    }

    /**
     * 退出一波
     */
    public logout(): void {
        this.loginModalAPPService.logout().subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.router.navigateByUrl("");
                }
            }
        });
    }
}