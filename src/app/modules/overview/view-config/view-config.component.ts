import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TemplateService} from '../../../shared/template.service';
import Swal from 'sweetalert2';
import {OverviewService} from "../../../shared/overview.service";

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.css']
})
export class ViewConfigComponent implements OnInit {
  public uid: string;
  public name: string;
  public editName = false;
  public equipName;
  public termCode;
  public tempSelect;
  public templates = [];
  public template;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private templateService: TemplateService,
              private overviewService: OverviewService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('uid');
      this.getFileInfo();
    } );
    // this.uid = this.route.snapshot.paramMap.get('uid');
    this.getTemplates();
  }

  getFileInfo() {
    this.overviewService.getFileInfo(this.uid)
      .subscribe(data => {
        this.name = data.Name;
        this.equipName = data.FileEquipment ? data.FileEquipment.Name : '';
        this.termCode = data.Terminal ? data.Terminal.TerminalCode : null;
        this.template = data.Template ? data.Template.Uid : '';
      });
  }

  // 获取模板列表
  getTemplates () {
    this.templateService.getTemplateAll()
      .subscribe(res => {
        this.templates = res;
        this.templates.unshift({
          Name: '选择模板'
        });

      }, err => { });
  }

  // 选择模板添加模式
  selTemp() {
    this.tempSelect = 1;
  }

  // 新增模板
  addTemp() {
    if (!this.termCode) {
      Swal({
        title: '请先添加终端编码',
        // text: err,
        type: 'error'
      });
      return;
    }
    let data = {
      fileUid: this.uid,
      name: this.name,
      code: this.termCode
    };
    this.tempSelect = 2;
    this.overviewService.addTerm(data)
      .subscribe( res => {
        this.overviewService.fileMission('ok'); // 传递刷新档案列表
        this.router.navigate(['/admin/overview/template', this.uid]);
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });

  }

  // 完成
  update() {
    let data = {
      fileUid: this.uid,
      name: this.name,
      code: this.termCode,
      templateUid: this.template
    };
    this.overviewService.addTerm(data)
      .subscribe( res => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.overviewService.fileMission('ok'); // 传递刷新档案列表
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }



}
