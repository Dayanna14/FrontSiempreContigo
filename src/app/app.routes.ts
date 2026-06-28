import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolListarComponent } from './components/rolcomponent/rol-listar/rol-listar';
import { RolInsertarComponent } from './components/rolcomponent/rol-insertar/rol-insertar';
import { RolActualizar } from './components/rolcomponent/rol-actualizar/rol-actualizar';
import { Login } from './components/login/login';
import { IniciarSeccion } from './components/login/iniciar-seccion/iniciar-seccion';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioListar } from './components/usuariocomponent/usuario-listar/usuario-listar';
import { UsuarioInsertar } from './components/usuariocomponent/usuario-insertar/usuario-insertar';
import { UsuarioActualizar } from './components/usuariocomponent/usuario-actualizar/usuario-actualizar';
import { UsuarioBuscar } from './components/usuariocomponent/usuario-buscar/usuario-buscar';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'homes',
        component: Homecomponent
    },
    // 11. Rol
    {
        path: 'roles',
        component: Rolcomponent,
        children: [
        { path: '', component: RolListarComponent},
        { path: 'nuevo', component: RolInsertarComponent},
        { path: 'actualizar/:id', component: RolActualizar}]
    },
    // 13. Usuario
    {
    path: 'usuario',
    component:Usuariocomponent,
    children: [
      { path: '', component: UsuarioListar },
      { path: 'nuevo', component: UsuarioInsertar },
      { path: 'edits/:id', component: UsuarioActualizar },
      { path: 'buscar', component: UsuarioBuscar } ]
    },
    {
    path: 'login',
    component: Login,
    children: [
      { path: '', redirectTo: 'iniciar', pathMatch: 'full' },
      { path: 'iniciar', component: IniciarSeccion }
    ]
  }
];
