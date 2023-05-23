import { DataSource } from '@angular/cdk/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { Pageable } from '../models/page.model';

export class ProdutoDataSource implements DataSource<Produto> {

  private dataSubject = new BehaviorSubject<Produto[]>([]);
  public totalElements: number;

  constructor(
    private service: ProdutoService,
    private snack: MatSnackBar
  ) {}

  connect(collectionViewer: CollectionViewer):
    Observable<Produto[] | readonly Produto[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  load(pageable?: Pageable): void {
    this.service.listProdutos(pageable).subscribe(
      (response) => {
        this.dataSubject.next(response.content);
        this.totalElements = response.totalElements;
      },
      (error) => {
        this.dataSubject.error(error)
        this.snack.open('Não foi possivel recuperar os dados!')
      }
    )
  }

}
