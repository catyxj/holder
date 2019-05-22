import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, filter} from "rxjs/internal/operators";
import {Observable, throwError} from "rxjs/index";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private filesUrl = '/bin_file_list';
  private filesAllUrl = '/bin_file_list_all';

  constructor(private http: HttpClient) { }

  // 获取文件列表
  getFiles(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.filesUrl}/?page=${n}&row=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取文件列表-下拉
  getFileList(): Observable<any> {
    return this.http.get<any>(this.filesAllUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除文件
  deleteFile(data): Observable<any> {
    return this.http.post('/bin_file_delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 上传文件
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
    if (error.status === 550) {
      window.location.reload();
    }
    return throwError(
      error.error);
  }

}
