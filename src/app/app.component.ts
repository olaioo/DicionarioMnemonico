import {Component, OnInit} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {DicionarioService} from "./dicionario.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'DicionarioMnemonico';
  consoantes: FormControl = new FormControl();
  subject: Subject<string[]> = new Subject<string[]>();
  palavrasList: Observable<string[]> = this.subject.asObservable();

  constructor(public dicionarioService: DicionarioService) {
  }

  ngOnInit(): void {
    this.consoantes.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(term => {
        this.dicionarioService.buscarPalavras(term).subscribe(this.subject);
    });
    this.palavrasList.subscribe(e=> console.log(e));
  }

}
