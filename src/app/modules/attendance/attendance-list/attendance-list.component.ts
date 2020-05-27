import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../../../shared/attendance.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  public user;
  public attendances;
  private attendanceAll;
  public page = 1;
  public totalItems = 0;
  public dateRange;
  public startDate;
  public endDate;
  // public search: string;
  // public deleteList = [];
  // public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private attendService: AttendanceService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getattendances();
  }

  // 获取集群列表
  getattendances() {

    /*this.attendances = [
      {
        Uid: 'at1111111111',
        name: 'sdfgsd',
        CreatedDate: new Date(),
        AttendanceAddress: 'asdf',
        user: 'asdfa',
        WeixinName: 'asdf',
        CreatedBy: {
          MobileNumber: '12355891',
          Name: 'aaaaa'
        },
        Equipment: {
          Name: 'bbb'
        }
      },
      {
        Uid: 'at1111122222',
        name: 'aasddddd',
        CreatedDate: new Date(),
        AttendanceAddress: 'asdf',
        user: 'asdfa',
        WeixinName: 'qqqq',
        CreatedBy: {
          MobileNumber: '12355891',
          Name: 'ggggg'
        },
        Equipment: {
          Name: 'cccc'
        }
      }
    ];
    this.totalItems = 2;*/


    this.isSpinning = true;
    const post = {
      pageNum: this.page,
      pageSize: this.pageSize,
      startTime: this.startDate,
      endTime: this.endDate
    };
    this.attendService.getList(post)
      .subscribe( data => {
        this.isSpinning = false;
        this.attendances = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }


  getAll() {
    this.attendService.getListAll()
      .subscribe( data => {
        this.attendanceAll = data;
        // this.totalItems = data.counts;
        this.export();
      }, err => {

      });

    /*this.attendanceAll = [
      {
        Uid: 'asdfsadsf22222',
        name: 'sdfgsd',
        CreatedDate: new Date(),
        AttendanceAddress: 'asdf',
        user: 'asdfa',
        WeixinName: 'asdf',
        CreatedBy: {
          MobileNumber: '12355891',
          Name: 'aaaaa'
        },
        Equipment: {
          Name: 'bbb'
        }
      }
    ];
    this.export();*/
  }

  export() {
    // 导出表格
    // let start = this.datePipe.transform(this.dateRange[0], 'yyyy.MM.dd');
    // let end = this.datePipe.transform(this.dateRange[1], 'yyyy.MM.dd');
    const today = new Date().getTime();

    let table = `<table border="1"><tr></tr><tr><th> 编号 </th>
        <th> 设备名称 </th>
        <th> 签到时间 </th>
        <th> 签到地点 </th>
        <th> 签到角色 </th>
        <th> 关联微信 </th>
        <th> 联系方式 </th>`;

    table += '</tr>';
    this.attendanceAll.forEach((record) => {
      const date = this.datePipe.transform(record.CreatedDate, 'yyyy-MM-dd HH:mm:ss');
      table += `<tr><td> ${ record.Uid }  </td>
          <td> ${ record.Equipment.Name } </td>
          <td> ${ date }  </td>
          <td> ${ record.AttendanceAddress } </td>
          <td> ${ record.CreatedBy.Name} </td>
          <td> ${ record.WeixinName} </td>
          <td>
            ${ record.CreatedBy.MobileNumber }
          </td>`;

      table += '</tr>';
    });
    table += '</table>';

    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
    const html = '<html><head><meta charset=\'utf-8\' /></head><body>' + table + '</body></html>';

    const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

    const fileName = `考勤管理${today}.xlsx`;

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


  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getattendances();
  }


  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.startDate = result[0];
    this.endDate = result[1];
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(23, 59, 59, 0);
    const post = {
      page: this.page,
      pageSize: this.pageSize,
      start: this.startDate,
      end: this.endDate
    };
    this.getattendances();
    console.log(post);
  }

}
