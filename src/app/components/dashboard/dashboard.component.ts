import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RinnoviService} from "../../services/rinnovi.service";
import {Rinnovi} from "../../model/rinnovi";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rinn: Rinnovi [];
  error: any;
  active: Rinnovi;
  p = 1;
  term;
  constructor(private http: HttpClient, private rinnovi: RinnoviService) { }

  getAll(){
    this.rinnovi.getAll()
      .subscribe(  (res: Rinnovi[]) => {
          this.rinn = res;

        },
        (error) => this.error = error
      );
  }
  // delete(event, sezione: Rinnovi){
  //   event.stopPropagation();
  //   console.log(sezione);
  //   this.rinnovi.deleteSezione(sezione)
  //     .subscribe(() => {
  //         const index = this.sez.findIndex(b => b.id === sezione.id);
  //         this.sez.splice(index, 1);
  //         console.log('delete');
  //       },
  //       (error) => this.error = error
  //     );
  //
  // }

  setActive(rinnovo: Rinnovi){
    this.active = rinnovo;
  }

  reset() {
    this.active = null;
  }
  ngOnInit(): void {
    this.getAll();
  }

}
