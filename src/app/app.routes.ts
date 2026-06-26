import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolListarComponent } from './components/rolcomponent/rol-listar/rol-listar';
import { RolInsertarComponent } from './components/rolcomponent/rol-insertar/rol-insertar';
import { RolActualizar } from './components/rolcomponent/rol-actualizar/rol-actualizar';


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
    {
        path: 'roles',
        component: Rolcomponent,
        children: [
        { path: '', component: RolListarComponent
        },
        { path: 'nuevo', component: RolInsertarComponent 
        },
        { path: 'actualizar/:id', component: RolActualizar  }]
    },
];
