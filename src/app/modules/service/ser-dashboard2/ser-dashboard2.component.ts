import {Component, Input, OnInit} from '@angular/core';
import {ServiceService} from '../../../shared/service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SerAddComponent} from '../ser-add/ser-add.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ser-dashboard2',
  templateUrl: './ser-dashboard2.component.html',
  styleUrls: ['./ser-dashboard2.component.css']
})
export class SerDashboard2Component implements OnInit {
  /*@Input()
  currentType1;*/


  public id;
  public typeName;
  public questionList = [];
  public currentData;  // 选中问题
  public page = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;

  constructor(private serviceService: ServiceService,
              private router: Router,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.typeName = params.get('name');
      this.page = 1;
      this.getList();
    } );

    // console.log(this.currentType1);

  }

  getList() {
    this.serviceService.getQuestion(this.page, this.pageSize, this.id)
      .subscribe(data => {
        this.questionList = data.params;
        this.totalItems = data.counts;
        this.currentData = this.questionList[0].uid;
      });

    /*this.questionList = [
      {
        title: '1asdfasfda',
        Uid: '134646'
      },
      {
        title: '2asdfasfda1234adfadfafdasdfasfasf',
        Uid: '11111asdgqertwe'
      },
      {
        title: '3asdfad',
        Uid: '22222asdgre324234'
      },
      {
        title: '4asdfasfda',
        Uid: '33333asdfasdfg'
      }
    ];
    this.totalItems = 200;
    this.currentData = this.questionList[0].uid;*/
  }

  question(data) {
    this.currentData = data.Uid;
  }


  // 每页数量
  /*pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }*/

  // 页码变化
  pageChange(): void {
    this.getList();
  }


  add() {
    // this.router.navigate(['/admin/service/add']);
    const modalRef = this.modalService.open(SerAddComponent);
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.typeName = this.typeName;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


}
