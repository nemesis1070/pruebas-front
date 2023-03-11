import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EntidadService } from './entidad.service';

describe('EntidadService', () => {
  let service: EntidadService;
  let httpClientSpy: {get: jasmine.Spy};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient',['get']);
    service = new EntidadService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar un usuario por id', (done: DoneFn) => {
    
     var mockResult =	{
       "statusCode": 200,
       "exitoso": false,
       "datosResultado": {
         "idEntidad": 1,
         "nombre": "Avianca",
         "direccion": "Calle26"
       }
     }
      
    httpClientSpy.get.and.returnValue(of(mockResult)) //TODO: Observable!


    service.ConsultarEntidad(1).subscribe(resultado => { //TODO: No se sabe el tiempo 
        console.log(resultado)
        expect(resultado).toEqual(mockResult)
        done()
      })
    
  });
});
