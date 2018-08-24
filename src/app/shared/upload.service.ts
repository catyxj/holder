import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, filter} from "rxjs/internal/operators";
import {Observable, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private filesUrl = '/bin_file_list';

  constructor(private http: HttpClient) { }

  // 获取文件列表
  getFiles(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.filesUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadFile(formData): Observable<any> {
    const req = new HttpRequest('POST', '/bin_file_upload', formData, {
      reportProgress: true
    });
    return this.http
      .request(req)
      .pipe(
        filter(e => e instanceof HttpResponse),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `错误代码 ${error.status}, ` +
        `错误内容: ${error.error}`);
    }
    return throwError(
      error.error);
  }

}
