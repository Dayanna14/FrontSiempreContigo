import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CursosService } from '../../services/cursos-service';
import { EstadoEmocionalservice } from '../../services/estado-emocionalservice';
@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './graficos.html',
  styleUrl: './graficos.css',
})
export class Graficos implements OnInit {
  
  // --- GRÁFICO 1: CURSOS MÁS DEMANDADOS (Barras) ---
  hasDataCursos = false;
  barChartOptions: ChartOptions = { responsive: true };
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  // --- GRÁFICO 2: TENDENCIA EMOCIONAL (Líneas) ---
  hasDataEmocional = false;
  lineChartOptions: ChartOptions = { responsive: true };
  lineChartLegend = true;
  lineChartLabels: string[] = [];
  lineChartData: ChartDataset[] = [];
  lineChartType: ChartType = 'line';

  constructor(
    private curS: CursosService,
    private estS: EstadoEmocionalservice
  ) { }

  ngOnInit(): void {
    this.cargarGraficoCursos();
    this.cargarGraficoEmocional();
  }

  cargarGraficoCursos(): void {
    this.curS.getReporteInscritos().subscribe((data) => {
      if (data.length > 0) {
        this.hasDataCursos = true;
        // La consulta de Spring devuelve [["Curso", Cantidad], ...]
        this.barChartLabels = data.map((item) => item[0]); 
        
        this.barChartData = [
          {
            data: data.map((item) => item[1]),
            label: 'Cantidad de Inscritos',
            backgroundColor: [
              '#1b5e20', // Verdes adaptados a SiempreContigo
              '#2e7d32', 
              '#388e3c', 
              '#4caf50', 
              '#81c784',
            ],
          },
        ];
      } else {
        this.hasDataCursos = false;
      }
    });
  }

  cargarGraficoEmocional(): void {
    this.estS.getReporteTendencia().subscribe((data) => {
      if (data.length > 0) {
        this.hasDataEmocional = true;
        // Convertimos la fecha de Spring Boot a formato de Perú
        this.lineChartLabels = data.map((item) => new Date(item[0]).toLocaleDateString('es-PE'));
        
        this.lineChartData = [
          {
            data: data.map((item) => item[1]),
            label: 'Promedio de Estado Emocional',
            backgroundColor: 'rgba(46, 125, 50, 0.2)', // Relleno verde transparente
            borderColor: '#2e7d32', // Línea verde oscuro
            fill: true,
            tension: 0.4 // Hace que la línea sea curva y moderna
          },
        ];
      } else {
        this.hasDataEmocional = false;
      }
    });
  }
}