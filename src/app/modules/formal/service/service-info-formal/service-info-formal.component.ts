import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceAddFormalComponent} from "../modals/service-add-formal/service-add-formal.component";
import {ServiceService} from "../../../../shared/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-service-info-formal',
  templateUrl: './service-info-formal.component.html',
  styleUrls: ['./service-info-formal.component.css']
})
export class ServiceInfoFormalComponent implements OnInit {
  public type = 1;
  public questionList = [];
  public answerList = [];
  public currentData;
  public page = 1;
  public totalItems;

  constructor(private modalService: NgbModal,
              private serviceService: ServiceService,
              private router: Router) { }

  ngOnInit() {
    /*this.questionList = [
      {
        uid: 'asdfadfasdf1111',
        name: 'asdfadf1'
      },
      {
        uid: 'aasdf1231sdf2222',
        name: 'asdf3eqr2'
      }
    ];
    this.totalItems = 20;
    this.answerList = [
      {
        rel_html: 'asdfadsf',
        name: 'aaaaaa'
      },
      {
        rel_html: 'asdfadsfsssss',
        name: 'aaaassssaa'
      }
    ];*/

    this.getQuestion();

  }


  // 获取问题列表
  getQuestion() {
    this.serviceService.getQuestionF(this.page, 10, this.type)
      .subscribe(data => {
        this.questionList = data.data;
        this.totalItems = data.count;
        this.currentData = this.questionList[0].id;
        this.getAnswer();
      }, err => {

      });
  }


  // 获取推荐答案
  getAnswer() {
    this.serviceService.getQDetailF(this.currentData)
      .subscribe(data => {
        this.answerList = data.data;
      }, err => {

      });
  }

  // 点击问题
  question(data) {
    this.currentData = data.id;
    this.getAnswer();
  }

  // 翻页
  pageChange() {
    this.getQuestion();
  }


  // 选择类型
  changeType(n) {
    if (this.type === n) {
      return;
    }
    this.type = n;
    this.page = 1;
    this.pageChange();
  }


  add() {
    let that = this;
    const modalRef = this.modalService.open(ServiceAddFormalComponent, {windowClass: 'modal_m', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // that.router.navigate(['/admin/formal/service/list']);
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  goBack() {
    window.history.go(-1);
  }


}
