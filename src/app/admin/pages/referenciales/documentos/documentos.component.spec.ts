import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosComponent } from './documentos.component';

describe('documentosComponent', () => {
  let component: DocumentosComponent;
  let fixture: ComponentFixture<DocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosComponent]
    });
    fixture = TestBed.createComponent(DocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
