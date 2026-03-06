import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TimesService } from '../../services/times.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-times-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './times-list.html',
  styleUrl: './times-list.css',
})
export class TimesList implements OnInit {
  displayedColumns = ['nome', 'pais', 'campeonato', 'categoria', 'actions'];
  dataSource: any[] = [];

  constructor(
    private timeService: TimesService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarTimes();
  }

  carregarTimes(): void {
    this.timeService.listar().subscribe({
      next: (dados) => {
        this.dataSource = dados;
        console.log('Times carregados:', this.dataSource);
        this.cd.detectChanges();
      }
    });
  }

  novoTime() {
    this.router.navigate(['/times/novo']);
  }
  editarTime(time: any): void {
    this.router.navigate(['/times',time.id,'editar']);
  }
  removeTime(time: any): void {
    if (confirm(`Tem certeza que deseja remover o time "${time.nome}"?`)) {
      this.timeService.deletar(time.id).subscribe({
        next: () => {
          alert('Time removido com sucesso!');
          this.carregarTimes();
        },
        error: (err) => {
          console.error('Erro ao remover time:', err);
          alert('Erro ao remover time. Por favor, tente novamente.');
        }
      });
    }
  }
}