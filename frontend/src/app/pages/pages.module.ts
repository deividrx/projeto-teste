import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EstoqueComponent } from './estoque/estoque.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProdutoComponent } from './produto/produto.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProdutoDialogComponent } from './produto-dialog/produto-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteOptionsScrollDirective } from './directive/mat-autocomplete-options-scroll.directive';
import { EstoqueDialogComponent } from './estoque-dialog/estoque-dialog.component';
import { ProdutoCompleteComponent } from './produto-complete/produto-complete.component';

@NgModule({
  declarations: [
    ProdutoComponent,
    EstoqueComponent,
    PagesComponent,
    NavBarComponent,
    ProdutoDialogComponent,
    MatAutocompleteOptionsScrollDirective,
    EstoqueDialogComponent,
    ProdutoCompleteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})
export class PagesModule { }
