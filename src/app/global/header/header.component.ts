import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // user = {Uid: '', Name: '', Role: { Name: '' } };
  @Output() toggle = new EventEmitter<void>();

  @Input()
  user: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    // this.getUser();
  }

  onClick() {
    this.toggle.emit();
  }

  /*getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      });
    }*/

  logout() {
    this.userService.logout(this.user.Uid)
      .subscribe();
    sessionStorage.user = false;
    this.router.navigate(['/login']);
  }

}
