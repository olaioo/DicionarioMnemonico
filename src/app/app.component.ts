import {Component, OnInit} from '@angular/core';
import {debounceTime, tap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {DicionarioService} from "./dicionario.service";
import {Observable, Subject} from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'DicionarioMnemonico';
  consoantes: FormControl = new FormControl();

  vogais: string = "aeiou";
  palavrasList: string[] = [];
  palavrasFiltered: string[] = [];

  carregando: boolean = false;

  constructor(
    private dicionarioService: DicionarioService,
    private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dicionarioService.carregarListaPalavras().subscribe(palavras => {
      this.palavrasList = palavras;
    });
    this.consoantes.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(term => {
        this.filtrarPalavras(this.palavrasList, term);
        this.carregando = false;
    });
  }

  filtrarPalavras(palavras: string[], consoantes: string): void {
    this.palavrasFiltered = consoantes.length > 0 ? palavras.filter(s => this.checarPalavra(s, consoantes)): [];
    if(this.palavrasFiltered.length <= 0) {
      console.log("Dentro");
      this.mostrarMensagem("Nenhuma palavra foi encontrada!");
    }
  }

  checarPalavra(palavra: string, consoantes: string): boolean {
    let palavraSemVogais = "";
    for(let i=0; i<palavra.length; i++){
      if(!this.vogais.includes(palavra.charAt(i))){
        palavraSemVogais = palavraSemVogais.concat(palavra.charAt(i));
      }
    }
    return palavraSemVogais === consoantes;
  }

  onKeyUp(): void{
    console.log("keydown");
    this.carregando = true;
  }

  mostrarMensagem(mensagem: string): void{
    this.snackbar.open(mensagem, 'Close', {
      duration: 3000
    });
  }

}
