import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import {TerminalService} from '../../../shared/terminal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-terminal',
  templateUrl: './add-terminal.component.html',
  styleUrls: ['./add-terminal.component.css'],
  encapsulation: ViewEncapsulation.None
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
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
