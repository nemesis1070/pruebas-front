import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Login }  from '../Interfaces/login';
import { ResponseApi } from '../Interfaces/response-api';
import { UsuarioService } from './usuario.service';

describe('Pruebas Servicio login', () => {
  let service: UsuarioService;
  let httpClientSpy: {post: jasmine.Spy};

  beforeEach(() => {
    //TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('httpClient',['post']);
    service = new UsuarioService(httpClientSpy as any)
  });

  it('creacion correcta servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar un true login correcto', (done: DoneFn) => {
    
    const mockUserCredentials: Login  ={ //TODO: Exito!
        nombreUsuario : "prueba",
        password: "12"
      };


     var mockResultLogin ={
        statusCode:200,
        datosResultado: true,
        exitoso :true 
     }; 
      
    httpClientSpy.post.and.returnValue(of(mockResultLogin)) //TODO: Observable!

    //TODO: Act

    //const { nombreUsuario, password } = mockUserCredentials

    service.IniciarSesion(mockUserCredentials)
      .subscribe(resultado => { //TODO: No se sabe el tiempo 
        console.log(resultado)
        expect(resultado).toEqual(mockResultLogin)
        done()
      })
  });
});
