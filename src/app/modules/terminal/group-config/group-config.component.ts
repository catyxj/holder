import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TerminalService} from '../../../shared/terminal.service';
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-group-config',
  templateUrl: './group-config.component.html',
  styleUrls: ['./group-config.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupConfigComponent implements OnInit {

  public terList;
  public templates;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.terList = [
      {
        start: null,
        end: null,
        template: ''
      }
    ];
    this.getTemplates();

  }


  getTemplates() {
    this.terminalService.getTemplate()
      .subscribe(tem => {
        this.templates = tem;
        console.log(this.templates);
      });
  }

  addTer() {
    this.terList.push({
      start: null,
      end: null,
      template: ''
    });
  }

  removeTer(index) {
    this.terList.splice(index, 1);
  }

  save() {
    let item = [];
    for (let i = 0; i < this.terList.length; i++) {
      if (!this.terList[i].start || !this.terList[i].end || !this.terList[i].template) {
        continue;
      }
      item.push(this.terList[i]);
    }
    if (item.length < 0) {
      alert('没有配置数据或数据不完整');
      return false;
    }

    this.terminalService.groupConfig(item)
      .subscribe(val => {
        alert('发送成功，正在配置');
        this.activeModal.close('ok');
      });

  }

}
