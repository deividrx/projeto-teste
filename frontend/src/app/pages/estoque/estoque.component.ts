import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EstoqueDialogComponent } from '../estoque-dialog/estoque-dialog.component';
import { EstoqueFilter, EstoqueService } from '../services/estoque.service';
import { EstoqueDataSource } from './estoque.datasource';
import { Estoque } from '../models/estoque.model';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'data', 'produto', 'tipoMovimento',
    'documento', 'quantidade', 'motivo', 'saldo', 'situacao'
  ];
  dataSource: EstoqueDataSource;
  formFilter: FormGroup;
  filtros: EstoqueFilter = {};

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private estoqueService: EstoqueService,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formFilter = this.fb.group({
      tipo: [null],
      dataFinal: [null],
      dataInicial: [null],
      produto: [null]
    })
    this.dataSource = new EstoqueDataSource(this.estoqueService, this.snack);
    this.dataSource.load();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange).pipe(
      tap(
        () => this.loadTable()
      )
    ).subscribe();
  }

  loadTable(): void {
    this.dataSource.load({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.direction ? `${this.sort.active},${this.sort.direction}` : null
    }, this.filtros)
  }

  limpar() {
    this.filtros = {};
    this.formFilter.patchValue({
      tipo: [null],
      dataFinal: [null],
      dataInicial: [null],
      produto: [null]
    })
    this.loadTable();
  }

  filtrar() {

    if (this.formFilter.value['dataFinal'] !== null)
      this.filtros.dataFinal = (this.formFilter.value['dataFinal'] as Date).toISOString()
    if (this.formFilter.value['dataInicial'] !== null)
      this.filtros.dataInicial = (this.formFilter.value['dataInicial'] as Date).toISOString()

    this.filtros.tipo = this.formFilter.value['tipo'];
    this.filtros.produtoId = this.formFilter.value['produto']?.id;

    console.log(this.filtros)
    this.paginator.pageIndex = 0
    this.loadTable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EstoqueDialogComponent, {
      width: "40%",
    });

    dialogRef.afterClosed().subscribe(
      (value) => this.dataSource.load()
    )
  }

  situacao(estoque: Estoque): string {
    let temMinima = estoque.produto.quantidadeMinima > 0;
    if (temMinima && estoque.produto.quantidadeMinima > estoque.saldo) {
      return "Inferior ao Mínimo";
    }

    return "OK";
  }
}
