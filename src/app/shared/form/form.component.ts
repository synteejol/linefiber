import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Piani, Punti, Rinnovi, Tecnici} from '../../model/rinnovi';
import {RinnoviService} from '../../services/rinnovi.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() active: Rinnovi;
  @Input() rinn: Rinnovi[];
  @Output() resetClick: EventEmitter<Rinnovi> = new EventEmitter<Rinnovi>();
  imageSrc: string;
  punti_aff: Punti [];
  tecnici: Tecnici [];
  piani: Piani [];
  error: any;
  // utente: any;
  save(form: FormGroup){
    // if (this.active){
    //   this.edit(form);
    // } else {
    //   this.add(form);
    // }
    this.add(form);
  }
  add(form: FormGroup){
    this.rinnoviService.addRinnovo(form)
      .subscribe((res: Rinnovi) => {
        setTimeout(( ) => {
          this.rinn.push(res);
        }, 500);
        location.reload();
        form.reset();
        // this.imageSrc = null;

      });
  }
  // edit(form: NgForm){
  //   this.rinnoviService.editrinnione(form, this.active)
  //     .subscribe(res => {
  //       const index = this.rinn.findIndex(b => b.id === this.active.id);
  //       this.rinn[index] = res;
  //       location.reload();
  //
  //     });
  // }

  reset(form: NgForm){
    this.active = null;
    // this.imageSrc = null;
    this.resetClick.emit();
    form.reset();
  }

  // readUrl(event: any){
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length){
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  //     if (this.active) {
  //       reader.onload = () =>
  //       {
  //         this.active.immagine = this.imageSrc = reader.result as string;
  //       };
  //     } else {
  //       reader.onload = () => {
  //         this.imageSrc = reader.result as string;
  //       };
  //     }
  //   }
  //
  // }

  getAllPunti(){
    this.rinnoviService.getAllPunti()
      .subscribe(  (res: Punti[]) => {
          this.punti_aff = res;
          // console.log(res[0].nome_punto);
        },
        (error) => this.error = error
      );
  }
  getAllPiani(){
    this.rinnoviService.getAllPiani()
      .subscribe(  (res: Piani[]) => {
          this.piani = res;
          // console.log(res[0].nome_punto);
        },
        (error) => this.error = error
      );
  }

  getAllTecnici(){
    this.rinnoviService.getAllTecnici()
      .subscribe(  (res: Tecnici[]) => {
          this.tecnici = res;
          // console.log(res[0].nome_punto);
        },
        (error) => this.error = error
      );
  }
  @ViewChild('select') select : HTMLSelectElement
  onChange() {
    // console.log(this.select.nativeElement.value)
  }

  rinnform = new FormGroup({
    aff: new FormControl(this.punti_aff),
    piano: new FormControl(this.piani),
    tecnico: new FormControl(this.tecnici),
    utente: new FormControl()
  });
  constructor(private http: HttpClient, private rinnoviService: RinnoviService) {

  }

  ngOnInit(): void {
    this.getAllPunti();
    this.getAllPiani();
    this.getAllTecnici();
  }

}
