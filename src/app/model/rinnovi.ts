export interface Rinnovi {
  id: number;
  utente: number;
  tecnico: Tecnici[];
  punto_affiliato: Punti[];
  piano: Piani[];
  mensilita: number;
}

export interface Punti {
  nome_punto: string;

}
export interface Piani {
  nome_piano: string;
  prezzo: number;
}

export interface Tecnici {
  nome_tec: string;
}
