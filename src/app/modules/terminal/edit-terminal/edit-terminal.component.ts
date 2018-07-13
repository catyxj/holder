import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TerminalService} from '../../../shared/terminal.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-terminal',
  templateUrl: './edit-terminal.component.html',
  styleUrls: ['./edit-terminal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTerminalComponent implements OnInit {
  @Input()
  currentData: any;

  public data;
  public editing;
  public editingCode;
  public bin;
  public bins;
  panelColor = new FormControl('red');

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.editing = true;
    this.data = {
      code: this.currentData.TerminalCode,
      org: this.currentData.Organization.Name,
    };
    this.getBin();
  }



  // 重置终端编码
  resetCode() {
    this.editingCode = true;
  }

  // bin文件选择
  getBin() {
    this.terminalService.getBin()
      .subscribe( bin => {
        this.bins = bin;
      });
  }

  upgrade() {
    this.terminalService.upgrade(this.bin)
      .subscribe( () => {
        alert('升级成功');
      });
  }


}
