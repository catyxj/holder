import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  // private terminalsUrl = 'assets/server/terminal_list.json';
  // private messageUrl = 'assets/server/terminal_origin_message_list.json';
  // private funcUrl = 'assets/server/term_function_code_list.json';
  // private byteUrl = 'assets/server/term_byte_list.json';
  // private templateUrl = 'assets/server/template_list.json';
  // private correspondUrl = 'assets/server/correspond_type_list.json';
  // private dataBitUrl = 'assets/server/date_bit_list.json';
  // private heartbeatUrl = 'assets/server/heartbeat_packet_list.json';
  // private parityUrl = 'assets/server/parity_bit.json';
  // private slaveUrl = 'assets/server/slave_address_list.json';
  // private stopBitUrl = 'assets/server/stop_bit_list.json';
  // private baudRateUrl = 'assets/server/baud_rate_list.json';
  // private channelUrl = 'assets/server/chan_config_list.json';


  private terminalsUrl = '/terminal_list';
  private messageUrl = '/terminal_origin_message_list';
  private funcUrl = '/term_function_code_list';
  private byteUrl = '/term_byte_list';
  private templateUrl = '/terminal_template';
  private correspondUrl = '/correspond_type_list';
  private dataBitUrl = '/data_bit_list';
  private heartbeatUrl = '/heartbeat_packet_list';
  private parityUrl = '/parity_bit';
  private slaveUrl = '/slave_address_list';
  private stopBitUrl = '/stop_bit_list';
  private baudRateUrl = '/baud_rate_list';
  private channelUrl = '/chan_config_list';

  constructor(private http: HttpClient) { }

  // 获取终端列表
  getTerminals(n: number, pageSize: number, search?: string ): Observable<any> {
    // TODO: send the message _after_ fetching the heroes
    const url = `${this.terminalsUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取通道配置数据
  getChannel(code: string): Observable<any> {
    const url = `${this.channelUrl}/?code=${code}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取调试消息
  getMessage(code: string): Observable<any> {
    const url = `${this.messageUrl}/?dev=origin&terminal=${code}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加终端
  addTerminal(ter): Observable<any> {
    return this.http.post('/terminal_add/', ter, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量添加终端
  groupAdd(ter): Observable<any> {
    return this.http.post('/terminal_group_add/', ter, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量配置模板
  groupConfig(item): Observable<any> {
    return this.http.post('/template_group_config', item, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteTerminal(uid): Observable<any> {
    return this.http.post('/terminal_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 提交
  save(data): Observable<any> {
    return this.http.post('/channel_config_update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取bin文件
  getBin(): Observable<any> {
    return this.http.get<any>('/bin_list')
      .pipe(
        catchError(this.handleError)
      );
  }

  // 升级配置
  upgrade(bin): Observable<any> {
    return this.http.post('/upgrade_configuration', bin, httpOptions)
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

  getTemplate(): Observable<any> {
    return this.http.get<any>(this.templateUrl)
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
