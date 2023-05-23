import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoDialogComponent } from '../produto-dialog/produto-dialog.component';
import { ProdutoRequest } from '../models/produto-request.model';
import { ProdutoDataSource } from './produto.datasource';
import { ProdutoService } from '../services/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['codigoDeBarras', 'nome', 'quantidadeMinima', 'saldoInicial', 'actions'];
  dataSource: ProdutoDataSource;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private produtoService: ProdutoService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataSource = new ProdutoDataSource(this.produtoService, this.snack);
    this.dataSource.load();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(
        () => this.loadTable()
      )
    ).subscribe();
  }

  loadTable(): void {
    this.dataSource.load({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
    })
  }

  openDialog(element?: ProdutoRequest) {
    const dialogRef = this.dialog.open(ProdutoDialogComponent, {
      width: "40%",
      data: element
    });

    dialogRef.afterClosed().subscribe(
      (value) => this.dataSource.load()
    )

  }
}
