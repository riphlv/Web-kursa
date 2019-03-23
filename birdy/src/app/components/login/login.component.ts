import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  username: String;
  password: String;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authUser(user).subscribe(data => {
      var a = data.success;
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
        console.log('login success');
      } else {
        console.log('error on login');
      }
    });
  }
}
