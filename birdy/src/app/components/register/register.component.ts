import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Register';
  username: String;
  password: String;
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    if (!this.validateService.validateRegister(user)) {
      console.log("Wrong inputs");
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/login']);
        console.log('register success');
      } else {
        console.log('error on register');
      }
    });
  }

}