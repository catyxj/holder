import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-logo-order-service-dir',
  templateUrl: './logo-order-service-dir.component.html',
  styleUrls: ['./logo-order-service-dir.component.css']
})
export class LogoOrderServiceDirComponent implements OnInit {
  public title;
  public type;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    switch (this.type) {
      case '1':
        this.title = '视频监控';
        break;
      case '2':
        this.title = 'LOGO定制';
        break;
      case '3':
        this.title = '集群服务';
        break;
      case '4':
        this.title = '蓝牙支持';
        break;
      case '5':
        this.title = '参数计算';
        break;
      case '6':
        this.title = '设备控制';
        break;
      case '7':
        this.title = '云台监控';
        break;
      case '8':
        this.title = '维保服务';
        break;
    }
  }

}
