import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  constructor(private validateService: ValidateService) { }

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
  }

}