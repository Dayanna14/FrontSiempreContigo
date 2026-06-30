//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Cita } from '../../../models/cita';
//import { CitaService } from '../../../services/cita-service';
//import { Router } from '@angular/router';
//import { ActivatedRoute, Params } from '@angular/router';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from '@angular/material/input';
//import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatNativeDateModule } from '@angular/material/core';
//import { MatButtonModule } from '@angular/material/button';
//
//@Component({
//  selector: 'app-cita-actualizar',
//  standalone: true,
//  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule, MatButtonModule],
//  templateUrl: './cita-actualizar.html',
//  styleUrl: './cita-actualizar.css',
//})
//export class CitaActualizar implements OnInit{
//
//  form: FormGroup = new FormGroup({});
//  cita: Cita = new Cita();
//  id: number = 0;
//
//
//  constructor(
//    private cT:CitaService,
//    private router: Router,
//    private formBuilder: FormBuilder,
//    private route: ActivatedRoute
//  ){}
//ngOnInit(): void {
//    
//    this.form = this.formBuilder.group({
//      codigo: [0],
//      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
//      fechaCita: ['', Validators.required],
//      motivo: ['', [Validators.required, Validators.maxLength(500)]],
//      horaCita: ['', Validators.required],
//      estadoCita: ['', Validators.required]
//      
//    });
//
//    
//    this.route.params.subscribe((params: Params) =>{
//      this.id = params['id'];
//      this.initForm();
//    });
//  }
//
//  initForm(){
//    this.cT.listId(this.id).subscribe((data)=>{
//      this.form.patchValue({
//        codigo: data.idCita,
//        idUsuario: data.usuario?.idUsuario,
//        fechaCita: data.fechaCita,   
//        horaCita: data.horaCita,     
//        motivo: data.motivo,
//        estadoCita: data.estadoCita
//      });
//    });
//  }
//
//  aceptar():void{
//    if (this.form.valid){
//      this.cita.idCita = this.form.value.codigo;
//      this.cita.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
//      this.cita.fechaCita = this.form.value.fechaCita; 
//      this.cita.horaCita = this.form.value.horaCita;  
//      this.cita.motivo = this.form.value.motivo;
//      this.cita.estadoCita = this.form.value.estadoCita;
//      
//      this.cT.update(this.cita).subscribe({
//        next: ()=>{
//          this.router.navigate(['/citas/actualiza']) 
//        }
//      });
//    }
//  }
//}