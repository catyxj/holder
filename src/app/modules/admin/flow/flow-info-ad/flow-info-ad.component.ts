import { Component, OnInit } from '@angular/core';
import {FlowService} from '../../../../shared/flow.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FlowChargeInlineAdComponent} from '../modals/flow-charge-inline-ad/flow-charge-inline-ad.component';

@Component({
  selector: 'app-flow-info-ad',
  templateUrl: './flow-info-ad.component.html',
  styleUrls: ['./flow-info-ad.component.css']
})
export class FlowInfoAdComponent implements OnInit {
  public uid;
  public basic;
  public operate;
  public isSpinning = false;

  constructor(private flowService: FlowService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getBasic();
    this.getOperate();
  }

  // 获取基础信息
  getBasic() {
    this.isSpinning = true;
    this.flowService.getBasic(this.uid)
      .subscribe(data => {
        this.isSpinning = false;
        this.basic = data;
      }, err => {
        this.isSpinning = false;
      });
  }


  // 获取记录信息
  getOperate() {
    this.flowService.getOperate(this.uid)
      .subscribe(data => {
        this.operate = data;
      }, err => {

      });
  }

  // 在线充值模态框
  charge() {
    const that = this;
    const modalRef = this.modalService.open(FlowChargeInlineAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

}
