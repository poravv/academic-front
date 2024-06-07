import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnhoLectivoCreateComponent } from './anho_lectivo-create.component';



describe('anho_lectivoCreateComponent', () => {
  let component: AnhoLectivoCreateComponent;
  let fixture: ComponentFixture<AnhoLectivoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnhoLectivoCreateComponent]
    });
    fixture = TestBed.createComponent(AnhoLectivoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
