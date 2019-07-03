import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../shared/terminal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-term-list-ad',
  templateUrl: './term-list-ad.component.html',
  styleUrls: ['./term-list-ad.component.css']
})
export class TermListAdComponent implements OnInit {
  public terminals = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public status = 0;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public user;
  public isLoading1 = false;
  public isLoading2 = false;

  constructor(private terminalService: TerminalService,
              private modalService: NgbModal) { }

  ngOnInit() {
    /*let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getTerminals();*/
  }


  // 获取终端列表
  /*getTerminals(): void {
    this.isSpinning = true;
    this.terminalService.getTerminals(this.page, this.pageSize, this.status, this.search)
      .subscribe(terminals => {
        this.isSpinning = false;
        this.totalItems = terminals.counts;
        this.terminals = terminals.params;
        if (!this.terminals || this.terminals.length <= 0) {
          return;
        }
        for (let i = 0; i < this.terminals.length; i++) {
          let terminal = this.terminals[i];
          if ( terminal.IsOnline === 1) {
            terminal.isOnline = '在线';
          } else {
            terminal.isOnline = '离线';
          }

          terminal.checkDelete = false;
        }

      }, err => {
        this.isSpinning = false;
      });
  }*/






}
