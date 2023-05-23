import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estoque } from '../models/estoque.model';
import { Pageable } from '../models/page.model';
import { EstoqueFilter, EstoqueService } from '../services/estoque.service';

export class EstoqueDataSource implements DataSource<Estoque> {

  private dataSubject = new BehaviorSubject<Estoque[]>([]);
  public totalElements: number;

  constructor(
    private service: EstoqueService,
    private snack: MatSnackBar
  ) {}

  connect(collectionViewer: CollectionViewer):
    Observable<Estoque[] | readonly Estoque[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  load(pageable?: Pageable, filter?: EstoqueFilter): void {
    this.service.listEstoque(pageable, filter).subscribe(
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
