import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, first, map, take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DicionarioService {

  private vogais: string = "aeiou";
  private palavraSemVogais: string = "";

  constructor(public http: HttpClient) {
  }


  buscarPalavras(consoantes: string): Observable<string[]> {
    let urlToTxt = 'assets/list-pt-br.txt';

    return this.http.get(urlToTxt, {responseType: "text", headers: new HttpHeaders().set("Cache-Control", "no-cache")})
      .pipe(
        map(s => s.split("\n")),
        map(s => this.filtrarPalavras(s, consoantes))
      );
  }

  private filtrarPalavras(palavras: string[], consoantes: string): string[] {
    return palavras.filter(s => this.checarPalavra(s, consoantes));
  }

  private checarPalavra(palavra: string, consoantes: string): boolean {
    this.palavraSemVogais = "";
    for(let i=0; i<palavra.length; i++){
      if(!this.vogais.includes(palavra.charAt(i))){
        this.palavraSemVogais = this.palavraSemVogais.concat(palavra.charAt(i));
      }
    }
    return this.palavraSemVogais === consoantes;
  }

}
