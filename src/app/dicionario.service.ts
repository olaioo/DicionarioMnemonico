import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DicionarioService {

  private vogais: string = "aeiou";
  private palavraSemVogais: string = "";

  constructor(public http: HttpClient) {
  }

  carregarListaPalavras(): Observable<string[]> {
    let urlToTxt = 'assets/list-pt-br.txt';

    return this.http.get(urlToTxt, { responseType: "text", headers: new HttpHeaders().set("Cache-Control", "no-cache") })
      .pipe(
        map(s => s.split("\n"))
      );
  }

}
