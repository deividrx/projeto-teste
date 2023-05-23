import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = `${environment.api}/user`

export interface Authority {
  authority: string
}

export interface UserDetails {
  username: string;
  authorities: Array<Authority>;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: string = "";
  userDetails: UserDetails;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  public login(username: string, password: string) {
    let token = `${username}:${password}`;
    this.token = btoa(token);

    this.getUserInfo(this.token).subscribe(
      (value) => {
        localStorage.setItem("token", this.token);
        this.userDetails = value;
        this.isLoggedIn = true;
        this.router.navigate([''])
      },
      error => {
        this.snack.open("Error no login")
      })
  }

  public logout() {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  }

  private getUserInfo(token: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(URL, {
      headers: {
        Authorization: `Basic ${token}`
      }
    })
  }
}
