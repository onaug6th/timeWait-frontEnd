import { Injectable } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FileUploadService {

	constructor(
		public httpClient: HttpClientService
	) { }

}
