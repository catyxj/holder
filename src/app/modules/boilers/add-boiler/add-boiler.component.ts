import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from '../../../shared/boiler.service';
import {OrganizationService} from '../../../shared/organization.service';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-boiler',
  templateUrl: './add-boiler.component.html',
  styleUrls: ['./add-boiler.component.css']
})
export class AddBoilerComponent implements OnInit {

  @Input()
  currentUser: any;

  myControl = new FormControl();
  public data: any;
  public templates: any[];
  public orgTypes: any[];
  public orgLists: any[];
  public info = [];
  public links = [];
  public imgUrl: any = '' ;
  public img: any;
  public errMes = '';
  public isLoading = false;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private orgService: OrganizationService
              ) { }

  ngOnInit() {
    this.data = {
      name: '',
      templateId: '',
      infos: [],
      links: []
    };
    this.getTemplates();
    this.getOrgType();

    this.imgUrl = 'assets/images/no_image.png';

  }


  //  获取锅炉型态列表
  getTemplates() {
    this.boilerService.getTemplates()
      .subscribe(temp => {
        this.templates = temp;
      });
  }

  //  获取企业类型列表
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {
        this.orgTypes = types;

        this.getOrgs();
        // console.log(this.orgTypes);
      });
  }

  //  获取企业列表
  getOrgs() {
    this.orgService.getOrgList()
      .subscribe(orgs => {
        this.orgLists = orgs;
        // this.getUser();
        this.initOrg();
      });
  }

  // 获取用户信息-企业信息
  getUser() {
    // console.log(this.currentUser);
    if (this.currentUser.Role.RoleId > 1 && this.currentUser.Organization) {
      this.links = [
        {
          type: this.currentUser.Organization.Type.TypeId,
          uid: this.currentUser.Organization.Uid
        }
      ];
      let orgs = [];
      for (let i in this.orgLists) {
        let og = this.orgLists[i];
        if (og.Type__TypeId === this.links[0].type) {
          orgs.push(og);
        }
      }
      this.links[0].orgs = orgs;
      // console.log( this.links);
    }
  }

  initOrg() {

      for (let i = 0; i < this.orgTypes.length; i++) {
        let ot = this.orgTypes[i];
        this.links[i] = {};
        this.links[i].type = ot.TypeId;
        this.links[i].typeName = ot.Name;
        let orgs = [{
          Uid: '',
          Name: '请选择关联企业'
        }];
        for (let j = 0; j < this.orgLists.length; j++) {
          let og = this.orgLists[j];
          if (og.Type__TypeId === ot.TypeId) {
            orgs.push(og);
          }
        }
        this.links[i].orgs = orgs;
        this.links[i].uid = '';
        this.links[i].eptCtlPlg = false;
      }

      console.log(this.links);
  }



//  添加其他信息
  addNewInfo() {
    this.info.push({title: '', value: ''});
  }

//  删除其他信息
  removeInfo(index) {
    this.info.splice(index, 1);
  }

  //  添加企业关联
  addNewLink() {
    this.links.push({type: 0, uid: '', eptCtlPlg: false});
  }

//  删除企业关联
  removeLink(index) {
    this.links.splice(index, 1);
  }

  // 企业关联下拉列表
  linkTypeChanged(link) {
    let orgs = [];
    for (let i = 0; i < this.orgLists.length; i++) {
      let og = this.orgLists[i];
      if (og.Type__TypeId === parseInt(link.type)) {
        orgs.push(og);
      }
    }
    link.orgs = orgs;
    link.uid = '';
    link.eptCtlPlg = false;
  }

//  上传图片
  imgChange(event) {
    let that = this;
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.img = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function() {
        // 显示图片
        that.imgUrl = this.result;
        that.errMes = ' ';
        // console.log(that.imgUrl);
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }



//  保存
  save() {

    let that = this;
    this.data.links = [];
    this.data.infos = [];
    // 其他信息
    if (this.info.length > 0) {
      for (let i = 0; i < this.info.length; i++) {
        let info = this.info[i];
        if (info.title === '') {
          continue;
        }
        this.data.infos.push(info);
      }
    }

    // 关联企业
    for (let i = 0; i < this.links.length; i++) {
      let link = this.links[i];
      if (link.uid === '') {
        continue;
      }
      if (typeof(link.type) !== 'number') {
        link.type = parseInt(link.type);
      }
      this.data.links.push(
        {type: link.type, uid: link.uid, eptCtlPlg: link.eptCtlPlg }
        );
    }

    if (this.data.links.length <= 0) {
      Swal(
        '请添加关联企业',
        '',
        'warning'
      );
      return;
    }

    // 图片上传
    if (this.img) {
      this.data.imgUrl = this.imgUrl;
    }

    // console.log(this.data);
    this.isLoading = true;
    this.boilerService.addBoiler(this.data)
      .subscribe( val => {
        this.isLoading = false;
        Swal(
          '保存成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        this.isLoading = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );

      });

  }

}
