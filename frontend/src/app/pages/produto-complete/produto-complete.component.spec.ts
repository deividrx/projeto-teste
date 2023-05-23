import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCompleteComponent } from './produto-complete.component';

describe('ProdutoCompleteComponent', () => {
  let component: ProdutoCompleteComponent;
  let fixture: ComponentFixture<ProdutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
