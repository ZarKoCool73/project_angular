import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Card,
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMsg = '';

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  login() {
    this.errorMsg = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/matrix'])
      }
    });
  }
}
