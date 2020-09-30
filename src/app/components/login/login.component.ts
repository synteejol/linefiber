import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modelpassword: string;
  modelusername: string;
  public showerrmsg: string;

  sendLogin(form: NgForm) {
    this.auth.login(form)
      .subscribe(res => {
          alert('token passato: ' + res);
          this.router.navigateByUrl('dashboard');
        },
        error => this.showerrmsg = error
      );
  }

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // this.auth.logout();
  }

}

