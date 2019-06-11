import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../shared/authority.service";


@Component({
  selector: 'app-auth-add',
  templateUrl: './auth-add.component.html',
  styleUrls: ['./auth-add.component.css']
})
export class AuthAddComponent implements OnInit {
  public name;
  public func;
  public addr;
  public type;
  public funcs;

  constructor(private authorityService: AuthorityService ) { }

  ngOnInit() {
    this.getFunc();
  }

  getFunc() {
    this.funcs = [
      {
        Uid: 'adsfad2',
        Name: 'aaaa'
      },
      {
        Uid: 'adsfad3',
        Name: 'bbbbb'
      },
      {
        Uid: 'adsfad4',
        Name: 'ccccc'
      }
    ]

    /*this.authorityService.getFunc()
      .subscribe(data => {
        this.funcs = data;
      });*/
  }

  postAuth() {
    let post = {
      name: this.name,
      func: this.func,
      addr: this.addr,
      type: this.type
    };
    console.log(post);
    this.authorityService.postAuth(post)
      .subscribe(val => {

      });
  }

}
