import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/Utilidades/angular-material/angular-material.module';

import { EntidadComponent } from './entidad.component';

describe('EntidadComponent', () => {
  let component: EntidadComponent;
  let fixture: ComponentFixture<EntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports:[
            ReactiveFormsModule,
            FormsModule,
            AngularMaterialModule,
            HttpClientTestingModule,
            BrowserAnimationsModule,
            NoopAnimationsModule
        ],
      declarations: [ EntidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creacion componente', () => {
    expect(component).toBeTruthy();
  });
  
});
