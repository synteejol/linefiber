import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
const ApiUrl = 'http://localhost/auth/index.php';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private options: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  login(datiForm): Observable<string>{
    const body = this.body(datiForm);
    return this.http.post(ApiUrl, body, {headers: this.options})
      .pipe(
        map(res => {
          if (res['token']){
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorhandler)
      );
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expired');
  }
  private setSession(jwt){
    let expire: number = new Date().getTime() + 10000;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expired', expire.toString());
  }
  notExpired(): boolean {
    if (localStorage.getItem('expire')){
      // tslint:disable-next-line:radix
      let expire: number = parseInt(localStorage.getItem('expire'));
      return new Date().getTime() < expire;
    }
    return false;

  }
  private body(df: NgForm) {
    let params = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);
  }
  /* Gestione Errori */
  errorhandler(error: any){
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse){
      if (error.status === 0){
        msg = 'Applicazione offline';
      }else{
        msg = `Si è verificato un errore : ${error.error.msg} (serve status code  ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo ${error.message}`);
  }
}
