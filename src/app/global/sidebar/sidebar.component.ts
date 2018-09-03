import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  user: any;

  public submenuShow: Array<boolean> = [true, true, true, false];
  /*public user;
  public roleId;*/

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.getUser();
  }

  submenuToggle(n) {
    this.submenuShow[n] = !this.submenuShow[n];
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
