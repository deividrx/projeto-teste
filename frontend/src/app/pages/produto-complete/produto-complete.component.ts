import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, exhaustMap, map, scan, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-complete',
  templateUrl: './produto-complete.component.html',
  styleUrls: ['./produto-complete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProdutoCompleteComponent),
      multi: true,
    },
  ],
})
export class ProdutoCompleteComponent implements OnInit, ControlValueAccessor {
  produtoList: Produto[] = [];
  produtoFilterList: Observable<Produto[]>;
  produtoSubject = new Subject()
  produtoFormControl = new FormControl();

  onChange = (value: Produto) => undefined;
  onTouched = () => undefined;

  constructor(
    private produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    let produtoFormControlObservable = this.produtoFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(
        (value) => {
          this.onChange(value)
        }
      )
    )

    this.produtoFilterList = produtoFormControlObservable.pipe(
      switchMap((filter: string | Produto) => {
        let currentPage = 0
        return this.produtoSubject.pipe(
          startWith(currentPage),
          exhaustMap(
            (value: number) => {
              // O valor retornado pode set uma string ou o proprio objeto
              if (typeof filter === "string")
                return this.getProdutoList(filter, currentPage)
              else
                return this.getProdutoList(filter.nome, currentPage)
            }
          ),
          tap(
            () => {
              currentPage++;
            }
          ),
          takeWhile(
            (p: Produto[]) => p.length > 0,
            true
          ),
          scan((allMunicipios: Produto[], newMunicipios: Produto[]) => {
            return allMunicipios.concat(newMunicipios);
          }, [])
        )
      })
    )
  }

  getProdutoList(startWith: string, page: number): Observable<Produto[]> {
    return this.produtoService.listProdutos({ page: page }, startWith).pipe(
      map(
        (value) => {
          return value.content
        }
      )
    )
  }

  displayProduto(municipio: Produto): string {
    return municipio ? municipio.nome : null;
  }

  onScroll(): void {
    this.produtoSubject.next()
  }

  writeValue(obj: any): void {
    if (obj != null && obj != undefined)
      this.produtoFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.produtoFormControl.disable({ emitEvent: false })
    } else {
      this.produtoFormControl.enable({ emitEvent: false })
    }
  }

}
