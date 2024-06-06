import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosCreateComponent } from './documentos-create.component';



describe('documentosCreateComponent', () => {
  let component: DocumentosCreateComponent;
  let fixture: ComponentFixture<DocumentosCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosCreateComponent]
    });
    fixture = TestBed.createComponent(DocumentosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
