import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import * as _ from 'lodash'

// 接口
interface HttpClientConfig {
    isShowLoading?: boolean;
	isAlterError?: boolean;
	isAuthHttp?: boolean;
	loadingText?: string;
	isReturnOriginal?: boolean;
	headers?: any[];
}

@Injectable()
export class HttpClientService {
    
    constructor(
        public http: Http
    ){}

    /**
     * 控制器
     * @param {any} type 请求类型
     * @param {any} url 请求地址
     * @param {any} [reqBody] 请求体
     * @param {any} [postConfig] 请求配置
     * @memberof HttpClientService
     */
    _handler(type, url, reqBody?, postConfig?) {
        let serverUrl;
        // _.startsWith，如果${url}开头包含 http:// 
        if (_.startsWith(url, "http://") || _.startsWith(url, "https://")) {
			serverUrl = new window['URI'](url)
		} else {
			serverUrl = new window['URI'](environment.server + url)
        }
        let requestOptions: any = {};
        
        var headers = new Headers();
        if (postConfig && postConfig.headers) {
			_.each(postConfig.headers, function (item, index) {
				var key = _.findKey(item);
				headers.append(key, item[key]);
			})
		}
        requestOptions.headers = headers;

        // 初始化配置
		let defaultPostConfig = {
			isShowLoading: true,
			isAuthHttp: false,
			isAlterError: true,
			isReturnOriginal: false
		}
		// 覆盖配置文件 合并两个参数相同的属性，以第二个为先
		let _postConfig = _.assignIn(defaultPostConfig, postConfig);

		// 定义连接
		let _httpClient = this.http;

		let reqUrl, __httpClient;

		if (type === 'get' || type === 'delete') {
			serverUrl.search(reqBody);
			// 置空header
			reqUrl = serverUrl.toString();
			__httpClient = _httpClient[type](reqUrl, requestOptions);
		} else {
			reqUrl = serverUrl.toString();
			__httpClient = _httpClient[type](reqUrl, reqBody, requestOptions);
		}
		return __httpClient.timeout(environment.timeout).map(res => {
			let result = res.json();
			if (_postConfig.isReturnOriginal) {
				return result;
			} else {
				if (result.code + '' !== '0') {
					window['swal']("提示", result.msg, "error");
					return null;
				} else {
					return result.data ? result.data : "success";
				}
			}
		}).catch(err => {
			let tips;
			if (err.status == 0) {
				tips = '网络连接出错,请检查网络状态';
			} else if (err.status == 401) {
				tips = '登录过期,请重新登录';
			} else if (err.status == 404) {
				tips = '访问接口不存在,请检查后重试';
			} else if (err.status == 500) {
				tips = '系统发生一个错误,请稍后重试!';
			} else {
				tips = '系统发生一个错误,请稍后重试!';
			}
			if (_postConfig.isAlterError) {
				window['swal']("提示", tips, "error");
			}
			return Observable.of(null);
		}).finally(() => {
			if (_postConfig.isShowLoading) {

			}
		});
    }

    // post方法
    post(url, reqBody?, postConfig?: HttpClientConfig) {
		return this._handler('post', url, reqBody, postConfig);
	}

    // put方法
	put(url, reqBody?, postConfig?: HttpClientConfig) {
		return this._handler('put', url, reqBody, postConfig);
	}

    // delete方法
	delete(url, reqBody?, postConfig?: HttpClientConfig) {
		return this._handler('delete', url, reqBody, postConfig);
	}

    // get方法
	get(url, reqBody?, postConfig?: HttpClientConfig) {
		return this._handler('get', url, reqBody, postConfig);
	}
}