import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from "../../../shared/boiler.service";
import {OrganizationService} from "../../../shared/organization.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-boiler',
  templateUrl: './edit-boiler.component.html',
  styleUrls: ['./edit-boiler.component.css']
})
export class EditBoilerComponent implements OnInit {
  @Input()
  currentData: any;

  public data: any;
  public templates: any[];
  public orgTypes: any[];
  public orgLists: any[];
  public info = [];
  public links = [];
  public imgUrl: any = '' ;
  public img: any;
  public errMes = '';
  public user;
  public isLoading = false;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private orgService: OrganizationService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.data = {
      uid: this.currentData.Uid,
      name: this.currentData.Name,
      templateId: this.currentData.Template ? this.currentData.Template.Uid : '',
      infos: [],
      links: []
    };
    this.getUser();
    this.getTemplates();
    this.getOrgType();


    this.initInfos();
    this.imgUrl = this.currentData.Image;
    if (!this.imgUrl) {
      this.imgUrl = 'assets/images/no_image.png';
    }

  }


  // 获取用户信息
  getUser() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
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
        this.initOrg();
      });
  }


//  关联企业信息列表
  initOrg() {

    for (let i = 0; i < this.orgTypes.length; i++) {
      let ot = this.orgTypes[i];
      let uid = '';
      let eptCtlPlg = false;
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

      if (!this.currentData.OrganizationsLinked) {
        this.currentData.OrganizationsLinked = [];
      }
      for (let n = 0; n < this.currentData.OrganizationsLinked.length; n++) {
        const or = this.currentData.OrganizationsLinked[n];
        if (or.Type.TypeId === ot.TypeId) {
          uid = or.Uid;
          eptCtlPlg = or.EptCtlPlg;
        }
      }


      this.links[i].orgs = orgs;
      this.links[i].uid = uid;
      this.links[i].eptCtlPlg = eptCtlPlg;
    }

    console.log(this.links);
    /*if (this.currentData.OrganizationsLinked) {
      for (let i = 0; i < this.currentData.OrganizationsLinked.length; i++) {
        const or = this.currentData.OrganizationsLinked[i];
        this.links.push({
          type: or.Type.TypeId,
          uid: or.Uid,
          eptCtlPlg: or.EptCtlPlg
        });
        let orgs = [];
        for (let j in this.orgLists) {
          let og = this.orgLists[j];
          if (og.Type__TypeId === this.links[i].type) {
            orgs.push(og);
          }
        }
        this.links[i].orgs = orgs;
      }
    }*/

    // console.log(this.links);
  }

  initInfos() {
    if (this.currentData.EquipmentInfo) {
      for (let i = 0; i < this.currentData.EquipmentInfo.length; i++) {
        let info = this.currentData.EquipmentInfo[i];
        this.info.push(
          {
            title: info.Name,
            value: info.Value
          }
        );
      }
    }
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
  /*addNewLink() {
    this.links.push({type: 0, uid: '', eptCtlPlg: false});
  }*/

//  删除企业关联
  /*removeLink(index) {
    this.links.splice(index, 1);
  }*/

  // 企业关联下拉列表
  /*linkTypeChanged(link) {
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
  }*/



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
    this.data.infos = [];
    this.data.links = [];

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
      this.data.links.push({type: link.type, uid: link.uid, eptCtlPlg: link.eptCtlPlg });
    }

    if (this.data.links.length <= 0) {
      alert('请添加关联企业');
      return;
    }

    // 图片上传
    if (this.img) {
      this.data.imgUrl = this.imgUrl;
    }

    // console.log(this.data);
    this.isLoading = true;
    this.boilerService.updateBoiler(this.data)
      .subscribe( val => {
        this.isLoading = false;
        Swal(
          '保存成功！',
          '',
          'success'
        ).then(function () {
          that.activeModal.close('ok');
        });

      }, err => {
        this.isLoading = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );
        // this.data.links = [];
        // this.data.infos = [];
      });

  }





}
