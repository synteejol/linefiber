import { Injectable } from '@angular/core';
import {Piani, Punti, Rinnovi, Tecnici} from "../model/rinnovi";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {FormGroup, NgForm} from "@angular/forms";
const ApiUrl = 'https://lit-crag-25077.herokuapp.com/db_conn.php';
const PuntiApiUrl = 'https://lit-crag-25077.herokuapp.com/video.php';
const TecniciApiUrl = 'https://lit-crag-25077.herokuapp.com/tecnici.php';
const PianiApiUrl = 'https://lit-crag-25077.herokuapp.com/piani.php';
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
  // METODO DELETE CANCELLAZIONE DATI
  deleteSezione(rinnovi: Rinnovi): Observable<Rinnovi>{
    return this.http.delete<Rinnovi>(`${ApiUrl}?id=${rinnovi.id}`);
  }

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
