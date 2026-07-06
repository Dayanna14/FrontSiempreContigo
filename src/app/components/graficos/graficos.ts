import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { CursosService } from '../../services/cursos-service';
import { EstadoEmocionalservice } from '../../services/estado-emocionalservice';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './graficos.html',
  styleUrl: './graficos.css',
})
export class Graficos implements OnInit {
  
  dataCursos: any[] = [];
  dataEmocional: any[] = [];

  colorScheme: Color = {
    name: 'temaVerde',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#558B2F', '#7CB342', '#2E7D32', '#A1D6A0']
  };

  constructor(
    private curS: CursosService,
    private estS: EstadoEmocionalservice
  ) {}

  ngOnInit(): void {
    this.cargarGraficoCursos();
    this.cargarGraficoEmocional();
  }

  cargarGraficoCursos() {
    this.curS.getReporteInscritos().subscribe(data => {
      this.dataCursos = data.map(item => ({
        name: item[0],
        value: item[1]
      }));
    });
  }

  cargarGraficoEmocional() {
    this.estS.getReporteTendencia().subscribe(data => {
      this.dataEmocional = [{
        name: "Evolución Emocional",
        series: data.map(item => ({
          name: new Date(item[0]).toLocaleDateString('es-PE'),
          value: Number(item[1])
        }))
      }];
    });
  }
}