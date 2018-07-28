import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TerminalService} from '../../../shared/terminal.service';
import {TemplateService} from "../../../shared/template.service";

@Component({
  selector: 'app-group-config',
  templateUrl: './group-config.component.html',
  styleUrls: ['./group-config.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupConfigComponent implements OnInit {

  @Input()
  checkList;

  public template;
  public templates;
  public showData = false;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService,
              private templateService:  TemplateService) { }

  ngOnInit() {
    /*this.terList = [
      {
        start: null,
        end: null,
        template: ''
      }
    ];*/

    this.template = '';
    this.getTemplates();

  }

  // 获取模板列表--下拉
  getTemplates() {
    this.templateService.getTemplateAll()
      .subscribe(tem => {
        this.templates = tem;
        // console.log(this.templates);
      });
  }

  /*addTer() {
    this.terList.push({
      start: null,
      end: null,
      template: ''
    });
  }

  removeTer(index) {
    this.terList.splice(index, 1);
  }*/

  save() {
    /*let item = [];
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
      });*/

    let data = {
      terminals: this.checkList,
      template: this.template
    };

    this.terminalService.groupConfig(data)
      .subscribe(val => {
        alert('发送成功，正在配置');
        this.activeModal.close('ok');
      });

  }

}
