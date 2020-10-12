import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
// const ApiUrl = 'http://localhost/auth/index.php';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  private option: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) {
    this.url = 'https://lit-crag-25077.herokuapp.com/auth/index.php';
  }

  login(datiform): Observable<string> {
    const body = this.body(datiform);
    return this.http.post(this.url, body, { headers: this.option})
      .pipe(
        map(res => {
          if (res['token']) {
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorhandler)
      );

  }
  private setSession(jwt: string) {
    let expired: number = new Date().getTime() + 60000 * 60;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expire', expired.toString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }


  private body(df: NgForm) {
    let param = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);
    return param;
  }

  notExpired(): boolean {
    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire'));
      return new Date().getTime() < expire;
    }
    return false;
  }

  checkDir() {
    if ( this.notExpired()) {
      return 'dashboard/';
    }
    return '';
  }


  /*GESTIONE ERRORI*/
  errorhandler(error: any) {
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = 'Applicazione offline';
      } else {
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }
}
