import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth } from './auth';
import { MaterialModule } from '../../../material_module';
import { ReactiveFormsModule } from '@angular/forms';

describe('Auth', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule],
      declarations: [Auth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
