import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoRequest } from '../models/produto-request.model';
import { Page, Pageable } from '../models/page.model';
import { Produto } from '../models/produto.model';

const URL = `${environment.api}/produto`

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  public createProduto(produto: ProdutoRequest): Observable<void> {
    return this.http.post<void>(`${URL}`, produto);
  }

  public updateProduto(produto: Produto): Observable<void> {
    return this.http.put<void>(`${URL}`, produto);
  }

  public listProdutos(pageable?: Pageable, search?: string): Observable<Page<Produto>> {
    let httpParams = new HttpParams();

    if (pageable)
      Object.entries(pageable).forEach(
        ([key, value]) => {
          httpParams = httpParams.set(key, value)
        }
      );

    if (search) httpParams = httpParams.set('search', search)

    return this.http.get<Page<Produto>>(`${URL}`, { params: httpParams });
  }
}
