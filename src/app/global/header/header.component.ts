import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {Uid: '', Name: '', Role: { Name: '' } };
  @Output() toggle = new EventEmitter<void>();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  onClick() {
    this.toggle.emit();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        if (!this.user) {
          sessionStorage.user = false;
          this.router.navigate(['/login']);
        }
      });
    }

  logout() {
    this.userService.logout(this.user.Uid)
      .subscribe();
    sessionStorage.user = false;
    this.router.navigate(['/login']);
  }

}
