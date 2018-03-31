import { Component,OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { CommonService } from '../../services/common.service';

declare var $: any;

@Component({
    templateUrl:'./not-found.component.html',
    styleUrls:['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {



    constructor(
        public CommonService : CommonService
    ) { }

    ngOnInit() {
       //  发射
       this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
    }

}