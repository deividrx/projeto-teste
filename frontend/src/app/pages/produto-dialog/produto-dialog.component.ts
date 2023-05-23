import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getValidationErrors } from 'src/app/util';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

const produtoValidator: ValidatorFn = (fg: FormGroup) => {
  const quantidadeMinima = fg.get('quantidadeMinima').value;
  const saldoInicial = fg.get('saldoInicial').value;

  if (quantidadeMinima == 0) return null;

  return saldoInicial !== null && quantidadeMinima !== null && saldoInicial > quantidadeMinima
    ? null
    : { saldoInicial: true };
}


@Component({
  selector: 'app-produto-dialog',
  templateUrl: './produto-dialog.component.html',
  styleUrls: ['./produto-dialog.component.css']
})
export class ProdutoDialogComponent implements OnInit {
  produtoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<ProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Produto,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      id: [{ value: this.produto?.id ?? '', disabled: true }, Validators.required],
      nome: [this.produto?.nome ?? '', Validators.required],
      codigoDeBarras: [this.produto?.codigoDeBarras ?? '', Validators.required],
      quantidadeMinima: [this.produto?.quantidadeMinima ?? '', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      saldoInicial: [{ value: this.produto?.saldoInicial ?? '', disabled: this.produto != null }, Validators.required]
    }, {
      validators: produtoValidator
    })
  }

  salvar() {
    if (!this.produtoForm.valid) {
      const error = getValidationErrors(this.produtoForm).shift()
      let text = ''

      switch (error.error_name) {
        case 'required':
          text = `Campos não prenchidos`
          break;
        case 'saldoInicial':
          text = `O Saldo deve ser maior que a quantidade mínima`
          break;
        default:
          text = "Campos invalidos"
          break;
      }

      this.snack.open(text)
      return
    }

    let value = this.produtoForm.getRawValue();

    if (this.produto != null) {
      this.produtoService.updateProduto(value).subscribe(
        (value) => this.dialogRef.close(),
        (error) => this.snack.open(error.error.message)
      );
      return;
    }

    this.produtoService.createProduto(value).subscribe(
      (value) => this.dialogRef.close(),
      (error) => this.snack.open(error.error.message)
    );
  }

  close() {
    this.dialogRef.close();
  }

}
