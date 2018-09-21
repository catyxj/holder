import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/index";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit, OnDestroy {

  public user;
  public subscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {

    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.userService.StatusMission(this.user);
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
