import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {Name: '', Role: { Name: '' } };
  @Output() toggle = new EventEmitter<void>();
  constructor(private userService: UserService) { }

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
});
}

}
