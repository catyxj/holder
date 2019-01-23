import { Component, OnInit } from '@angular/core';
import {OverviewService} from '../../../shared/overview.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  public list = [];
  public pageNum = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;

  constructor(private overviewService: OverviewService) {
    this.overviewService.fileStatus$ // 监测档案变化
      .subscribe( data => {
          this.getList();
        }
      );
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    /*this.list = [
      {
        uid: 'adfaasf111',
        name: '档案名称',
        equip: '设备名称',
        term: '终端型号',
        temp: '模板1'
      },
      {
        uid: 'adfaest67467358',
        name: '档案名称2',
        equip: '设备名称2',
        term: '终端型号2',
        temp: '模板2'
      },
      {
        uid: 'adfaasf54373',
        name: '档案名称',
        equip: '设备名称',
        term: '终端型号',
        temp: ''
      },
      {
        uid: 'adfaasdfsadsf23',
        name: '档案名称2',
        equip: '设备名称2',
        term: '',
        temp: ''
      }
    ];
    this.totalItems = 222;*/

    this.overviewService.getFileList(this.pageNum, this.pageSize)
      .subscribe(data => {
        this.list = data.params;
        this.totalItems = data.counts;
      });

  }

  pageChange() {
    this.getList();
  }

  // 删除
  delete(data) {
    let post = {
      fileUid: data
    };
    const cf = confirm(`确定删除？`);
    if (cf === true) {
      this.overviewService.deleteFile(post)
        .subscribe( () => {
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          Swal(
            '删除失败！',
            err,
            'error'
          );
        });
    }

  }



}
