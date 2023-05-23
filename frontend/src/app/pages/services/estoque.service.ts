import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoRequest } from '../models/produto-request.model';
import { Page, Pageable } from '../models/page.model';
import { Produto } from '../models/produto.model';
import { EstoqueRequest } from '../models/estoque-request.model';
import { Estoque } from '../models/estoque.model';

export interface EstoqueFilter {
  produtoId?: number;
  dataInicial?: string;
  dataFinal?: string;
  tipo?;
}

const URL = `${environment.api}/estoque`

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(
    private http: HttpClient
  ) { }

  public createEstoque(produto: EstoqueRequest): Observable<void> {
    return this.http.post<void>(`${URL}`, produto);
  }

  public listEstoque(pageable?: Pageable, filter?: EstoqueFilter): Observable<Page<Estoque>> {
    let httpParams = new HttpParams();

    if (pageable)
      Object.entries(pageable).forEach(
        ([key, value]) => {
          if(value != null) httpParams = httpParams.set(key, value)
        }
    );

    if (filter)
      Object.entries(filter).forEach(
        ([key, value]) => {
          if(value != null) httpParams = httpParams.set(key, value)
        }
    );

    return this.http.get<Page<Estoque>>(`${URL}`, {params: httpParams});
  }
}
