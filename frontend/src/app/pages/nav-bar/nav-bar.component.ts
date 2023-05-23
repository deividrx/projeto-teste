import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    private auth: AuthService,
    private route: Router
  ) {}

  logout() {
    this.auth.logout();
    this.route.navigate(['/login'])
  }

  isGerente(): boolean {
    return this.auth.userDetails.authorities.some((value) => value.authority === "ROLE_GERENTE");
  }
}
