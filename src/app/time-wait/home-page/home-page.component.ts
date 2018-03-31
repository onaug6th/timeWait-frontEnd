import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../services/common.service';
import { simAnim } from '../../common/sim-anim';

declare var $: any;

@Component({
    templateUrl:'./home-page.component.html',
    styleUrls:['./home-page.component.scss'],
    animations:[simAnim]
})

export class HomePageComponent implements OnInit {


    

    constructor(
        public CommonService : CommonService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
    }
    
}