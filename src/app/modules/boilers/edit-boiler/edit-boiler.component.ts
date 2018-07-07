import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from "../../../shared/boiler.service";
import {OrganizationService} from "../../../shared/organization.service";
import {UserService} from "../../../shared/user.service";

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

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private orgService: OrganizationService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.getTemplates();
    this.getOrgType();
    this.getOrgs();
    this.data = {
      uid: this.currentData.Uid,
      name: this.currentData.Name,
      templateId: this.currentData.Template.TemplateId,
      info: [],
      links: []
    };

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
        // console.log(this.orgTypes);
      });
  }

  //  获取企业列表
  getOrgs() {
    this.orgService.getOrgList()
      .subscribe(orgs => {
        this.orgLists = orgs.params;
        this.initOrg();
      });
  }


//  关联企业信息列表
  initOrg() {
    if (this.currentData.OrganizationsLinked) {
      for (let i = 0; i < this.currentData.OrganizationsLinked.length; i++) {
        const or = this.currentData.OrganizationsLinked[i];
        this.links.push({
          type: or.Type.TypeId,
          uid: or.Uid
        });
        let orgs = [];
        for (let j in this.orgLists) {
          let og = this.orgLists[j];
          if (og.Type.TypeId === this.links[i].type) {
            orgs.push(og);
          }
        }
        this.links[i].orgs = orgs;
      }
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
    this.links.push({type: 0, uid: ''});
  }

//  删除企业关联
  removeLink(index) {
    this.links.splice(index, 1);
  }

  // 企业关联下拉列表
  linkTypeChanged(link) {
    let orgs = [];
    for (let i in this.orgLists) {
      let og = this.orgLists[i];
      if (og.Type.TypeId === parseInt(link.type)) {
        orgs.push(og);
      }
    }
    link.orgs = orgs;
    link.uid = '';
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
    console.log(isPNG, isLt200k);
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
    console.log(this.info);
    console.log('links:', this.links);

    // 其他信息
    if (this.info.length > 0) {
      for (let i = 0; i < this.info.length; i++) {
        let info = this.info[i];
        if (info.title === '') {
          continue;
        }
        this.data.info.push(info);
      }
    }

    // 关联企业
    for (let i = 0; i < this.links.length; i++) {
      let link = this.links[i];
      if (link.uid === '') {
        continue;
      }
      this.data.links.push({type: link.type, uid: link.uid });
    }

    if (this.data.links.length <= 0) {
      alert('请添加关联企业');
      return;
    }

    // 图片上传
    if (this.img) {
      this.data.imgUrl = this.imgUrl;
    }

    console.log(this.data);

    this.boilerService.addBoiler(this.data)
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });

  }





}
