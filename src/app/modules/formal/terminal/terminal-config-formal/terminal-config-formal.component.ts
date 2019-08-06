import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../shared/terminal.service";
import {TerminalCommunicationEditFormalComponent} from "../modals/terminal-communication-edit-formal/terminal-communication-edit-formal.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-terminal-config-formal',
  templateUrl: './terminal-config-formal.component.html',
  styleUrls: ['./terminal-config-formal.component.css']
})
export class TerminalConfigFormalComponent implements OnInit {
  public uid;
  public basic;
  public communication;
  public channels;
  public zutai;

  constructor(private modalService: NgbModal,
              private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getCommunication();
    this.getBasic();
    this.getChannel();
    this.getZT();
  }

  // 获取通信参数
  getCommunication() {
    this.terminalService.getCmt(this.uid)
      .subscribe(data => {
        this.communication = data;
      }, err => {

      });
  }


  // 获取通道信息
  getChannel() {
    this.terminalService.getChannelBrief(this.uid)
      .subscribe(data => {
        this.channels = data;
      }, err => {

      });
  }

  // 获取组态信息
  getZT() {
    this.terminalService.getzZTBrief(this.uid)
      .subscribe(data => {
        this.zutai = data;
      }, err => {

      });
  }

  // 获取模板基本信息
  getBasic() {
    this.terminalService.getEpt(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }

  communicationSet() {
    const modalRef = this.modalService.open(TerminalCommunicationEditFormalComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // this.pageChange();
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
