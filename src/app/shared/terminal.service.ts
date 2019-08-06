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


  // private dataListUrlF = '/api/formal/terminal/list';
  private dataBasicUrlF = '/api/formal/terminal/detail';
  private dataOperateUrlF = '/api/formal/terminal/log/info';
  private dataOperateMoreUrlF = '/api/formal/terminal/log/info/more';

  private dataListUrlF = 'assets/server/terminal_list.json';


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

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&status=${status}&search=${search}&value=${value}&online=${online}`;
    }
    if (roleId === '10') {
      url = `${this.dataListUrlF}?page=${n}&rows=${pageSize}&status=${status}&search=${search}&value=${value}&online=${online}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取基本信息
  getBasic(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataBasicUrl}?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `${this.dataBasicUrlF}?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // 获取记录信息
  getOperate(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataOperateUrl}?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `${this.dataOperateUrlF}?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息列表
  getOperateMore(uid, n, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataOperateMoreUrl}?uid=${uid}&page=${n}&rows=${pageSize}`;
    }
    if (roleId === '10') {
      url = `${this.dataOperateMoreUrlF}?uid=${uid}&page=${n}&rows=${pageSize}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 新增终端
  addData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/terminal/add';
    }
    if (roleId === '10') {
      url = '/api/formal/terminal/create';
    }

    return this.http.post(url, data, httpOptions)
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

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/terminal/batch/delete';
    }
    if (roleId === '10') {
      url = '/api/formal/terminal/batch/delete';
    }

    return this.http.post(url, data, httpOptions)
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

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/terminal/update';
    }
    if (roleId === '10') {
      url = '/api/formal/terminal/update';
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取流量卡信息
  getFlow(iccid) {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/admin/terminal/traffic/card/query?iccid=${iccid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /*----正式用户-------------------------------------*/
  // 下发
  issued(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/batch/issued', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取终端调试列表
  getMessage(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    return this.http.get(`/api/formal/terminal/debug/list?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取通信参数信息
  getCmt(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/cmt/config/detail?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取模板配置基本信息
  getEpt(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/ept/config/detail?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取通道基本信息
  getChannelBrief(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/channel/config/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取组态基本信息
  getzZTBrief(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/zt/config/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取通道具体信息
  getChannelInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/channel/config/detail?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // 获取组态内容
  getContent(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get('assets/server/device.json', httpOptions);
    // return this.http.get<any>(`/api/formal/terminal/zt/config/detail?uid=${uid}`, httpOptions)
    //   .pipe(
    //     catchError(this.handleError)
    //   );

  }


  // 通信接口地址
  getCorrespond(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.correspondUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 数据位
  getDataBit(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.dataBitUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 心跳包频率
  getHeartbeat(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.heartbeatUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 校验位
  getParity(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.parityUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 从机地址
  getSlave(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.slaveUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 停止位
  getStopBit(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.stopBitUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 波特率
  getBaudRate(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.baudRateUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 包类型
  getDataType(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.dataTypeUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 保存组态
  saveZ(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/zt_save', data, httpOptions);
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




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `错误代码 ${error.status}, ` +
        `错误内容: ${error.error}`);
    }
    if (error.status === 550) {
      localStorage.removeItem('authToken');
      window.location.reload();
    }
    return throwError(
      error.error);
  }

}
