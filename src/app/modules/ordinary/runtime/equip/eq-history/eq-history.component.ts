import { Component, OnInit } from '@angular/core';
import {RuntimeService} from "../../../../../shared/runtime.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eq-history',
  templateUrl: './eq-history.component.html',
  styleUrls: ['./eq-history.component.css']
})
export class EqHistoryComponent implements OnInit {
  public uid;
  public params = [];
  public history = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  public rangeValue = 'day';
  public dateRange = [];
  public name;
  public isSpinning = false;
  public isLoading = false;

  constructor(private runtimeService: RuntimeService,
              private datePipe: DatePipe,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.selectDate();
  }


  // 选择时间区间
  changeDate() {
    // console.log(this.dateRange);
    this.page = 1;
    this.refreshData();
  }

  selectDate() {
    /* // 筛选时间
    let start = new Date();
    let end = new Date();
    switch (this.rangeValue) {
      case 'day':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        let d1 = start.getDate() - 7;
        start.setDate(d1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }

    this.dateRange = [start, end];*/

    // console.log(this.dateRange);
    this.page = 1;
    this.refreshData();
  }


  // 获取数据
  refreshData() {
    /*let postData = {
      uid: this.uid,
      startDate: this.dateRange[0],
      endDate: this.dateRange[1],
      page: this.page,
      pageSize: this.pageSize,
    };*/
    this.isSpinning = true;
    this.runtimeService.getHistory(this.uid, this.page, this.pageSize)
      .subscribe( data => {
        // console.log(data);
        this.isSpinning = false;
        this.totalItems = data.count;
        let runtimes = data.history;

        this.params = [];
        this.history = [];
        let param = data.channels;
        // let lists = runtimes.slice();

        // 通道列表
        for ( let i = 0; i < param.length; i++) {
          let pa = param[i];
          let da = {
            id: '',
            Name: '',
            Unit: ''
          };
          da.id = pa.channel_type + '_' + pa.channel_number;
          da.Name = pa.name;
          da.Unit = pa.unit;
          this.params.push(da);
        }

        // 历史数据列表
        if (runtimes) {
          for (let i = 0; i < runtimes.length; i++) {
            console.log(typeof runtimes[i].json_data);
            let li = JSON.parse(runtimes[i].json_data);
            let his = {
              date: '',
              data: {}
            };
            his.date = runtimes[i].receive_time;
            for (let j = 0; j < li.length; j++) {
              let dat = li[j];
              let id = dat.channel_type + '_' + dat.channel_number;
              his.data[id] = dat.value.toString();
            }
            this.history.push(his);
          }
        }

        // console.log(this.params, this.history);

      }, err => {
        this.isSpinning = false;
      });
  }

  pageChange() {
    this.refreshData();
  }

  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.refreshData();
  }

  // 页码跳转
  goPage() {
    let totalPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.pageNum > totalPage) {
      return;
    }
    this.page = this.pageNum;
    this.pageChange();
  }


  // 导出
  export(data) {
    // let postData = {
    //   uid: this.uid,
    //   startDate: this.dateRange[0],
    //   endDate: this.dateRange[1]
    // };
    /*this.isLoading = true;
    this.rangeValue = data;
    this.runtimeService.getHistoryExport(this.uid, data)
      .subscribe( data => {
        // let totalItems = data.count;
        let runtimes = data;

        let params = [];
        let history = [];
        let param = runtimes.channels;
        let lists = runtimes.history;



        // 通道列表
        for ( let i = 0; i < param.length; i++) {
          let pa = param[i];
          let da = {
            id: pa.channel_type + '_' + pa.channel_number,
            Name: pa.name,
            Unit: pa.unit
          };
          params.push(da);
        }

        // 历史数据列表
        if (lists) {
          for (let i = 0; i < lists.length; i++) {
            let li = JSON.parse(lists[i].json_data);
            let his = {
              date: lists[i].receive_time,
              data: {}
            };
            for (let j = 0; j < li.length; j++) {
              let dat = li[j];
              let id = dat.channel_type + '_' + dat.channel_number;
              his.data[id] = dat.value.toString();
            }
            history.push(his);
          }
        }

        // console.log(history);

        // 导出表格
        // let start = this.datePipe.transform(this.dateRange[0], 'yyyy.MM.dd');
        // let end = this.datePipe.transform(this.dateRange[1], 'yyyy.MM.dd');

        let time = '';
        switch (this.rangeValue) {
          case 'day':
            time = '今日';
            break;
          case 'week':
            time = '一周';
            break;
          case 'month':
            time = '一月';
        }
        let name = '历史数据';

        let table = `<table><tr><td>${name}</td><td></td><td>时间： ${time}</td> </tr><tr><td>采样时间</td>`;

        // headers
        for (let i = 0; i < params.length; i++) {
          table += `<td>${params[i].Name} ${params[i].Unit}</td>`;
        }
        table += '</tr>';
        history.forEach((record) => {
          let date = this.datePipe.transform(record.date, 'yyyy-MM-dd HH:mm:ss');
          table += `<tr><td>${date}</td>`;
          for (let i = 0; i < params.length; i++) {
            table += `<td>${record.data[params[i].id] || '' }</td>`;
          }
          table += '</tr>';
        });
        table += '</table>';

        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        let html = "<html><head><meta charset='utf-8' /></head><body>" + table + "</body></html>";

        const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

        const fileName = `${name}(${this.rangeValue}).xlsx`;

        if (window.navigator.msSaveOrOpenBlob) { // IE浏览器
          navigator.msSaveOrOpenBlob(blob,  fileName);
        } else { //  其他浏览器
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.setAttribute('style', 'display:none');
          link.setAttribute('href', objectUrl);
          link.setAttribute('download', fileName);
          link.click();
          document.body.removeChild(link);
          // 释放URL地址
          URL.revokeObjectURL(objectUrl);
        }

        this.isLoading = false;

      });*/

    let token = localStorage.getItem('authToken');
    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/runtime/history/export`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/runtime/history/export`;
    }

    const objectUrl = `${url}?uid=${this.uid}&type=${data}&token=${token}`;
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display:none');
    link.setAttribute('href', objectUrl);
    // link.setAttribute('download', '历史数据');
    link.target = '_blank';
    link.click();
    document.body.removeChild(link);

  }



  goBack() {
    window.history.go(-1);
  }

}
