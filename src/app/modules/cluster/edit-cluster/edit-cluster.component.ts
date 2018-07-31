import {Component, Input, OnInit} from '@angular/core';
import {ClusterService} from "../../../shared/cluster.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.css']
})
export class EditClusterComponent implements OnInit {

  @Input()
  currentData;

  public name;
  public imgUrl: any = '' ;
  public img: any;
  public errMes = '';

  constructor(public activeModal: NgbActiveModal,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.name = this.currentData.Name;
    this.imgUrl = this.currentData.imgUrl;
    if ( !this.imgUrl) {
      this.imgUrl = 'assets/images/no_image.png';
    }
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
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  save() {
    this.clusterService.editCluster({uid: this.currentData.Uid, name: this.name, img: this.imgUrl})
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });
  }

}
