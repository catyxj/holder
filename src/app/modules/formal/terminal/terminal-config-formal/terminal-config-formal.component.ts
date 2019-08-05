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

  constructor(private modalService: NgbModal,
              private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
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
