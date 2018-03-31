import { Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewChild, Injectable } from '@angular/core';
import { FileUploadService } from "./file-upload.service";
import { environment } from '../../../environments/environment';
import * as _ from 'lodash'
import { FileUploader } from 'ng2-file-upload';

declare var $: any;

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [FileUploadService]
})
export class FileUploadComponent implements OnInit {

    @Input()
    /**
     * [modalConfig 配置参数]
     * @type {object} {
     *     modalTile: "", // modal title
     *     title: "", // titel
     *     modalType : "", // avarar,blogBackground
     *     url: "", // url
     *     method: "", // POST OR GET
     *     itemAlias: "", // file alias
     *     formDatas: [] // POST 参数
     * };
     */
    public modalConfig: any;

    @Output()
    public close: EventEmitter<boolean> = new EventEmitter<boolean>();

    //  是否上传成功
    public isUploadSuccess = false;

    // 上传的文件名称
    public fileName: string;

    public isUploading = false;

    /**
     * fileupload对象
     */
    public uploader: FileUploader = new FileUploader({});

    @ViewChild("modal")
    public modal: ElementRef;

    /**
     * 文件上传input框
     */
    @ViewChild("fileInput")
    public fileInput: ElementRef;

    constructor(public fileUploadNormalService: FileUploadService) {

    }

    ngOnInit() {

    }

    //  选择文件上传
    public chooseFile(){
        this.uploader.clearQueue();
        this.fileInput.nativeElement.value = null;
        this.fileInput.nativeElement.click();
    }

    /**
     * 选择上传文件
     * @param event 
     */
    public selectedFileOnChanged(event: any) {
        this.fileName = event.target.value;
    }

    /**
     * 开始上床文件
     */
    public uploadFile() {
        const that = this;
        this.isUploading = true;
        
        const fileItem = _.last(this.uploader.queue); //    上传最后一个选择的文件

        fileItem.url = this.modalConfig.url;
        fileItem.method = this.modalConfig.method;
        fileItem.alias = this.modalConfig.itemAlias;

        //  添加 POST 其他参数
        this.uploader.onBuildItemForm = (item, form) => {
            if (this.modalConfig.formDatas) {
                this.modalConfig.formDatas.forEach((item,index)=>{
                    for(let i in item){
                        form.append(i,item[i]);
                    }
                });
            }
        };
        //  成功后的回调
        fileItem.onSuccess = function (response, status, headers) {
            const result = JSON.parse(response);
            if (result.code === 0) {
                window['swal']({ title: "修改成功", type: "success" });
                that.isUploadSuccess = true;
                that.closeModal(result);
            } else {
                //  上传文件后获取服务器返回的数据错误
                window["swal"]("上传失败", result.detailMsg, "error");
            }
        };
        fileItem.upload(); // 开始上传
    }

    /**
     * 打开上传文件模态框
     */
    public openModal(): void {
        this.isUploadSuccess = false;
        $(this.modal.nativeElement).modal('show');
    }

    /**
     * 关闭上传文件模态框
     * @param data 服务器返回数据
     */
    public closeModal(data?): void {
        if(this.isUploadSuccess && data){
            this.close.emit(data);//   关闭后触发上层刷新事件
        }
        this.clearFileQueue();
        $(this.modal.nativeElement).modal('hide');
    }

    //  清空上传队列
    public clearFileQueue() {
        this.fileInput.nativeElement.value = null;
        this.uploader.clearQueue();
    }
}
