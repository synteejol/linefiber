import { Injectable } from '@angular/core';
import {Piani, Punti, Rinnovi, Tecnici} from "../model/rinnovi";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {FormGroup, NgForm} from "@angular/forms";
const ApiUrl = 'http://localhost/db_conn.php';
const PuntiApiUrl = 'http://localhost/video.php';
const TecniciApiUrl = 'http://localhost/tecnici.php';
const PianiApiUrl = 'http://localhost/piani.php';
@Injectable({
  providedIn: 'root'
})
export class RinnoviService {
  // METODO GET RICEZIONE DATI
  getAll(): Observable <Rinnovi[]> {
    return this.http.get<Rinnovi[]>(ApiUrl);
  }
  // METODO POST AGGIUNTA DATI
  addRinnovo(form: FormGroup): Observable<Rinnovi>{
    console.log(form.value);

    return this.http.post<Rinnovi>(`${ApiUrl}`, form.value, { responseType: 'json' });
  }
  // // METODO PATCH MODIFICA DATI
  // editSezione(form: NgForm, active: Rinnovi): Observable<Rinnovi>{
  //   return this.http.patch<Rinnovi>(`${ApiUrl}?id=${active.id}`, form.value);
  // }
  // detailSection(id): Observable <Rinnovi>{
  //   return  this.http.get<Rinnovi>(`${ApiVideoUrl}${id}`);
  // }
  // getVideoById(id): Observable<Video[]>{
  //   return this.http.get<Video[]>(`${ApiVideoUrl}${id}`);
  // }
  // // METODO DELETE CANCELLAZIONE DATI
  // deleteSezione(sezione: Rinnovi): Observable<Rinnovi>{
  //   return this.http.delete<Rinnovi>(`${ApiUrl}?id=${sezione.id}`);
  // }

  // METODO RICEZIONE PUNTI AFFILIATI
  getAllPunti(): Observable <Punti[]> {
    return this.http.get<Punti[]>(PuntiApiUrl);
  }

  getAllPiani(): Observable <Piani[]> {
    return this.http.get<Piani[]>(PianiApiUrl);
  }
  getAllTecnici(): Observable <Tecnici[]> {
    return this.http.get<Tecnici[]>(TecniciApiUrl);
  }
  constructor(private http: HttpClient) { }
}
