import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AlertaInsertar } from './components/alerta/alerta-insertar/alerta-insertar';
import { AlertaListar } from './components/alerta/alerta-listar/alerta-listar';
import { AlertaActualizar } from './components/alerta/alerta-actualizar/alerta-actualizar';
import { AlertaBuscar } from './components/alerta/alerta-buscar/alerta-buscar';
import { CitaInsertar } from './components/cita/cita-insertar/cita-insertar';
import { CitaListar } from './components/cita/cita-listar/cita-listar';
import { CitaActualizar } from './components/cita/cita-actualizar/cita-actualizar';
import { CitaBuscar } from './components/cita/cita-buscar/cita-buscar';
import { ConfigAppInsertar } from './components/config-app/config-app-insertar/config-app-insertar';
import { ConfigAppListar } from './components/config-app/config-app-listar/config-app-listar';
import { ConfigAppActualizar } from './components/config-app/config-app-actualizar/config-app-actualizar';
import { ConfigAppBuscar } from './components/config-app/config-app-buscar/config-app-buscar';
import { CursosInsertar } from './components/cursos/cursos-insertar/cursos-insertar';
import { CursosListar } from './components/cursos/cursos-listar/cursos-listar';
import { CursosActualizar } from './components/cursos/cursos-actualizar/cursos-actualizar';
import { CursosBuscar } from './components/cursos/cursos-buscar/cursos-buscar';
import { EstEmocionalInsertar } from './components/est-emocional/est-emocional-insertar/est-emocional-insertar';
import { EstEmocionalListar } from './components/est-emocional/est-emocional-listar/est-emocional-listar';
import { EstEmocionalActualizar } from './components/est-emocional/est-emocional-actualizar/est-emocional-actualizar';
import { EstEmocionalBuscar } from './components/est-emocional/est-emocional-buscar/est-emocional-buscar';
import { FormularioInsertar } from './components/formulario/formulario-insertar/formulario-insertar';
import { FormularioListar } from './components/formulario/formulario-listar/formulario-listar';
import { FormularioActualizar } from './components/formulario/formulario-actualizar/formulario-actualizar';
import { FormularioBuscar } from './components/formulario/formulario-buscar/formulario-buscar';
import { ChatInsertar } from './components/chat/chat-insertar/chat-insertar';
import { ChatListar } from './components/chat/chat-listar/chat-listar';
import { ChatActualizar } from './components/chat/chat-actualizar/chat-actualizar';
import { ChatBuscar } from './components/chat/chat-buscar/chat-buscar';
import { NotificacionInsertar } from './components/notificacion/notificacion-insertar/notificacion-insertar';
import { NotificacionListar } from './components/notificacion/notificacion-listar/notificacion-listar';
import { NotificacionActualizar } from './components/notificacion/notificacion-actualizar/notificacion-actualizar';
import { NotificacionBuscar } from './components/notificacion/notificacion-buscar/notificacion-buscar';
import { PerfilProfInsertar } from './components/perfil-prof/perfil-prof-insertar/perfil-prof-insertar';
import { PerfilProfListar } from './components/perfil-prof/perfil-prof-listar/perfil-prof-listar';
import { PerfilProfActualizar } from './components/perfil-prof/perfil-prof-actualizar/perfil-prof-actualizar';
import { PerfilProfBuscar } from './components/perfil-prof/perfil-prof-buscar/perfil-prof-buscar';
import { ProgSesionInsertar } from './components/prog-sesion/prog-sesion-insertar/prog-sesion-insertar';
import { ProgSesionListar } from './components/prog-sesion/prog-sesion-listar/prog-sesion-listar';
import { ProgSesionActualizar } from './components/prog-sesion/prog-sesion-actualizar/prog-sesion-actualizar';
import { ProgSesionBuscar } from './components/prog-sesion/prog-sesion-buscar/prog-sesion-buscar';
import { RolInsertar } from './components/rol/rol-insertar/rol-insertar';
import { RolListar } from './components/rol/rol-listar/rol-listar';
import { RolActualizar } from './components/rol/rol-actualizar/rol-actualizar';
import { RolBuscar } from './components/rol/rol-buscar/rol-buscar';
import { SesionInsertar } from './components/sesion/sesion-insertar/sesion-insertar';
import { SesionListar } from './components/sesion/sesion-listar/sesion-listar';
import { SesionActualizar } from './components/sesion/sesion-actualizar/sesion-actualizar';
import { SesionBuscar } from './components/sesion/sesion-buscar/sesion-buscar';
import { UsuarioInsertar } from './components/usuario/usuario-insertar/usuario-insertar';
import { UsuarioListar } from './components/usuario/usuario-listar/usuario-listar';
import { UsuarioActualizar } from './components/usuario/usuario-actualizar/usuario-actualizar';
import { UsuarioBuscar } from './components/usuario/usuario-buscar/usuario-buscar';
import { UserCursoInsertar } from './components/user-curso/user-curso-insertar/user-curso-insertar';
import { UserCursoListar } from './components/user-curso/user-curso-listar/user-curso-listar';
import { UserCursoActualizar } from './components/user-curso/user-curso-actualizar/user-curso-actualizar';
import { UserCursoBuscar } from './components/user-curso/user-curso-buscar/user-curso-buscar';
import { ValoracionInsertar } from './components/valoracion/valoracion-insertar/valoracion-insertar';
import { ValoracionListar } from './components/valoracion/valoracion-listar/valoracion-listar';
import { ValoracionActualizar } from './components/valoracion/valoracion-actualizar/valoracion-actualizar';
import { ValoracionBuscar } from './components/valoracion/valoracion-buscar/valoracion-buscar';
import { Login } from './components/login/login';
import { IniciarSesion } from './components/login/iniciar-sesion/iniciar-sesion';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'homes',
        component: Home
    },

    // 1. Alertas
  {
    path: 'alertas',
    children: [
      { path: 'nuevo', component: AlertaInsertar },
      { path: 'lista', component: AlertaListar },
      { path: 'edits/:id', component: AlertaActualizar },
      { path: 'buscar', component: AlertaBuscar }
    ]
  },
  // 2. Citas
  {
    path: 'cita',
    children: [
      { path: 'nuevo', component: CitaInsertar },
      { path: 'lista', component: CitaListar },
      { path: 'edits/:id', component: CitaActualizar },
      { path: 'buscar', component: CitaBuscar }
    ]
  },
  // 3. Configuración Aplicación
  {
    path: 'config-app',
    children: [
      { path: 'nuevo', component: ConfigAppInsertar },
      { path: 'lista', component: ConfigAppListar },
      { path: 'edits/:id', component: ConfigAppActualizar },
      { path: 'buscar', component: ConfigAppBuscar }
    ]
  },
  // 4. Cursos
  {
    path: 'cursos',
    children: [
      { path: 'nuevo', component: CursosInsertar },
      { path: 'lista', component: CursosListar },
      { path: 'edits/:id', component: CursosActualizar },
      { path: 'buscar', component: CursosBuscar }
    ]
  },
  // 5. Estado Emocional
  {
    path: 'est-emocional',
    children: [
      { path: 'nuevo', component: EstEmocionalInsertar },
      { path: 'lista', component: EstEmocionalListar },
      { path: 'edits/:id', component: EstEmocionalActualizar },
      { path: 'buscar', component: EstEmocionalBuscar }
    ]
  },
  // 6. Formulario
  {
    path: 'formulario',
    children: [
      { path: 'nuevo', component: FormularioInsertar },
      { path: 'lista', component: FormularioListar },
      { path: 'edits/:id', component: FormularioActualizar },
      { path: 'buscar', component: FormularioBuscar }
    ]
  },
  // 7. Mensajes de Chat
  {
    path: 'chat',
    children: [
      { path: 'nuevo', component: ChatInsertar },
      { path: 'lista', component: ChatListar },
      { path: 'edits/:id', component: ChatActualizar },
      { path: 'buscar', component: ChatBuscar }
    ]
  },
  // 8. Notificaciones
  {
    path: 'notificacion',
    children: [
      { path: 'nuevo', component: NotificacionInsertar },
      { path: 'lista', component: NotificacionListar },
      { path: 'edits/:id', component: NotificacionActualizar },
      { path: 'buscar', component: NotificacionBuscar }
    ]
  },
  // 9. Perfil Profesional
  {
    path: 'perfil-prof',
    children: [
      { path: 'nuevo', component: PerfilProfInsertar },
      { path: 'lista', component: PerfilProfListar },
      { path: 'edits/:id', component: PerfilProfActualizar },
      { path: 'buscar', component: PerfilProfBuscar }
    ]
  },
  // 10. Progreso Sesión
  {
    path: 'prog-sesion',
    children: [
      { path: 'nuevo', component: ProgSesionInsertar },
      { path: 'lista', component: ProgSesionListar },
      { path: 'edits/:id', component: ProgSesionActualizar },
      { path: 'buscar', component: ProgSesionBuscar }
    ]
  },
  // 11. Rol
  {
    path: 'rol',
    children: [
      { path: 'nuevo', component: RolInsertar },
      { path: 'lista', component: RolListar },
      { path: 'edits/:id', component: RolActualizar },
      { path: 'buscar', component: RolBuscar }
    ]
  },
  // 12. Sesion
  {
    path: 'sesion',
    children: [
      { path: 'nuevo', component: SesionInsertar },
      { path: 'lista', component: SesionListar },
      { path: 'edits/:id', component: SesionActualizar },
      { path: 'buscar', component: SesionBuscar }
    ]
  },
  // 13. Usuario
  {
    path: 'usuario',
    children: [
      { path: 'nuevo', component: UsuarioInsertar },
      { path: 'lista', component: UsuarioListar },
      { path: 'edits/:id', component: UsuarioActualizar },
      { path: 'buscar', component: UsuarioBuscar }
    ]
  },
  // 14. Usuario Curso (Inscripciones)
  {
    path: 'user-curso',
    children: [
      { path: 'nuevo', component: UserCursoInsertar },
      { path: 'lista', component: UserCursoListar },
      { path: 'edits/:id', component: UserCursoActualizar },
      { path: 'buscar', component: UserCursoBuscar }
    ]
  },
  // 15. Valoración Curso
  {
    path: 'valoracion',
    children: [
      { path: 'nuevo', component: ValoracionInsertar },
      { path: 'lista', component: ValoracionListar },
      { path: 'edits/:id', component: ValoracionActualizar },
      { path: 'buscar', component: ValoracionBuscar }
    ]
  },
  {
    path: 'login',
    component: Login,
    children: [
      { path: '', redirectTo: 'iniciar', pathMatch: 'full' },
      { path: 'iniciar', component: IniciarSesion }
    ]
  }
   
];
