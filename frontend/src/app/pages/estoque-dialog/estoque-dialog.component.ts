import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EstoqueService } from '../services/estoque.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EstoqueRequest } from '../models/estoque-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estoque-dialog',
  templateUrl: './estoque-dialog.component.html',
  styleUrls: ['./estoque-dialog.component.css']
})
export class EstoqueDialogComponent implements OnInit {
  formEstoque: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EstoqueDialogComponent>,
    private estoqueService: EstoqueService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formEstoque = this.fb.group({
      data: ['', Validators.required],
      produto: ['', Validators.required],
      tipo: ['', Validators.required],
      motivo: [''],
      quantidade: ['',Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      documento: [null]
    });
  }

  salvar() {
    if (!this.formEstoque.valid) {
      this.snack.open("Campos inválidos!")
      return
    }

    let estoque = new EstoqueRequest();
    estoque.tipoMovimento = this.formEstoque.value['tipo'];
    estoque.produtoId = this.formEstoque.value['produto'].id;
    estoque.data = (this.formEstoque.value['data'] as Date).toISOString();
    estoque.quantidade = this.formEstoque.value['quantidade'];
    estoque.motivo = this.formEstoque.value['motivo'];
    estoque.documento = this.formEstoque.value['documento'];

    this.estoqueService.createEstoque(estoque).subscribe(
      (value) => {this.dialogRef.close();},
      (error: HttpErrorResponse) => {
        this.snack.open(error?.error?.message ?? "Error ao salvar o estoque")
        console.log(error);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
