import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError, last, map, tap} from 'rxjs/internal/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  }),
  // reportProgress: true,
  // observe: 'events'
};


@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private dataListUrl = '/api/admin/terminal/list';
  private dataBasicUrl = '/api/admin/terminal/detail';
  private dataOperateUrl = '/api/admin/terminal/log/info';
  private dataOperateMoreUrl = '/api/admin/terminal/log/list';



  // private dataListUrl = 'assets/server/terminal_list.json';


  private messageUrl = 'assets/server/terminal_origin_message_list.json';
  private funcUrl = 'assets/server/term_function_code_list.json';
  private byteUrl = 'assets/server/term_byte_list.json';
  private correspondUrl = 'assets/server/correspond_type_list.json';
  private dataBitUrl = 'assets/server/date_bit_list.json';
  private heartbeatUrl = 'assets/server/heartbeat_packet_list.json';
  private parityUrl = 'assets/server/parity_bit.json';
  private slaveUrl = 'assets/server/slave_address_list.json';
  private stopBitUrl = 'assets/server/stop_bit_list.json';
  private baudRateUrl = 'assets/server/baud_rate_list.json';
  private channelUrl = 'assets/server/chan_config_list.json';

  private dataTypeUrl = '/channel_data_type_list';

  constructor(private http: HttpClient) { }

  // 获取终端列表
  getLists(n: number, pageSize: number, status?: string, search?: string, value?: string, online?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&status=${status}&search=${search}&value=${value}&online=${online}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取基本信息
  getBasic(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataBasicUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // 获取记录信息
  getOperate(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataOperateUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息列表
  getOperateMore(uid, n, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataOperateMoreUrl}?uid=${uid}&page=${n}&rows=${pageSize}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 新增终端
  addData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/terminal/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量新增终端
  addBatchData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/terminal/batch/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 删除
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/terminal/batch/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 报废
  scrap(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/admin/terminal/scrapped?uid=${data}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 编辑基础信息
  updateBasic(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/terminal/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  getFlow(iccid) {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/admin/terminal/traffic/card/query?iccid=${iccid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }






  // 获取bin文件
  getBin(): Observable<any> {
    return this.http.get<any>('/bin_file_list_all')
      .pipe(
        catchError(this.handleError)
      );
  }

  // 升级配置
  upgrade(bin): Observable<any> {
    return this.http.post('/term_app_upgrade', bin, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 重启终端
  restart(code): Observable<any> {
    return this.http.post('/term_restart', code, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 下发
  issued(data): Observable<any> {
    return this.http.post('/term_config_issued', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取plc告警列表
  getPlcAlarm(code: string, n: number, pageSize: number): Observable<any> {
    const url = `/plc_alarm_list/?code=${code}&page=${n}&pageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取功能码
  getFuncode(): Observable<any> {
    return this.http.get<any>(this.funcUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取高低字节
  getByte(): Observable<any> {
    return this.http.get<any>(this.byteUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 通信接口地址
  getCorrespond(): Observable<any> {
    return this.http.get<any>(this.correspondUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 数据位
  getDataBit(): Observable<any> {
    return this.http.get<any>(this.dataBitUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 心跳包频率
  getHeartbeat(): Observable<any> {
    return this.http.get<any>(this.heartbeatUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 校验位
  getParity(): Observable<any> {
    return this.http.get<any>(this.parityUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 从机地址
  getSlave(): Observable<any> {
    return this.http.get<any>(this.slaveUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 停止位
  getStopBit(): Observable<any> {
    return this.http.get<any>(this.stopBitUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 波特率
  getBaudRate(): Observable<any> {
    return this.http.get<any>(this.baudRateUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 包类型
  getDataType(): Observable<any> {
    return this.http.get<any>(this.dataTypeUrl)
      .pipe(
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
