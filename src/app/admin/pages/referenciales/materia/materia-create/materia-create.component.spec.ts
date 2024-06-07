import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaCreateComponent } from './materia-create.component';




describe('materiaCreateComponent', () => {
  let component: MateriaCreateComponent;
  let fixture: ComponentFixture<MateriaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriaCreateComponent]
    });
    fixture = TestBed.createComponent(MateriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
