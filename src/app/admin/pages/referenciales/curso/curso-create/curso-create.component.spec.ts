import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoCreateComponent } from './curso-create.component';



describe('cursoCreateComponent', () => {
  let component: CursoCreateComponent;
  let fixture: ComponentFixture<CursoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoCreateComponent]
    });
    fixture = TestBed.createComponent(CursoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
