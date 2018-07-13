import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import {TerminalService} from '../../../shared/terminal.service';

@Component({
  selector: 'app-add-terminal',
  templateUrl: './add-terminal.component.html',
  styleUrls: ['./add-terminal.component.css']
})
export class AddTerminalComponent implements OnInit {

  public data;
  public orgLists;

  constructor(public activeModal: NgbActiveModal,
              private orgService: OrganizationService,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.getOrg();
    this.data = {
      name: '',
      code: '',
      org: '',
      simNum: ''
    };
  }

  getOrg() {
    this.orgService.getOrgList()
      .subscribe(orgs => {
        this.orgLists = orgs;
      });
  }

  save() {
    let ter = {
      code: this.data.code,
      org: this.data.org
    };
    this.terminalService.addTerminal(ter)
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });
  }

}
