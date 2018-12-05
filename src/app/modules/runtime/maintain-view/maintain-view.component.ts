import { Component, OnInit } from '@angular/core';
import {MaintainService} from "../../../shared/maintain.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-maintain-view',
  templateUrl: './maintain-view.component.html',
  styleUrls: ['./maintain-view.component.css']
})
export class MaintainViewComponent implements OnInit {
  public uid;
  public create;
  public date;
  public viewList;

  constructor(private maintainService: MaintainService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('uid');
      this.date = params.get('date');
      this.create = params.get('create');
      this.getList();
    } );

  }

  getList() {
    this.maintainService.getDetail(this.uid)
      .subscribe(data => {
        this.viewList = data;
      });

    /*this.viewList = [
      {
        Name: 'asdfasdf',
        Result: true,
        Remark: 'asdfa'
      },
      {
        Name: 'cffgh',
        Result: false,
        Remark: 'd'
      },
      {
        Name: 'asdfsa233145',
        Result: false,
        Remark: 'b'
      },
      {
        Name: 'kkytu',
        Result: true,
        Remark: 'aa'
      }
    ];*/
  }


}
