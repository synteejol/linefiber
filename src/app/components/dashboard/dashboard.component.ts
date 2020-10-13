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
  delete(event, rinn: Rinnovi){
    event.stopPropagation();
    console.log(rinn);
    this.rinnovi.deleteSezione(rinn)
      .subscribe(() => {
          const index = this.rinn.findIndex(b => b.id === rinn.id);
          this.rinn.splice(index, 1);
         // console.log('delete');
        },
        //(error) => this.error = error
        
      );
      
  
  }

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
