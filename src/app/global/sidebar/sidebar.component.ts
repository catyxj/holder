import { Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  user: any;
  @Input()
  sideList: any;

  /*public user;
  public roleId;*/
  // public sideList;

  constructor(private userService: UserService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    // this.getUser();

  }

  submenuToggle(item) {
    // this.submenuShow[n] = !this.submenuShow[n];
    item.checked = !item.checked;
  }





  // 获取用户信息
  /*getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.roleId = this.user.Role.RoleId;
      });
  }*/


}
