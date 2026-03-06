import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Pais } from '../model/pais';
import { PaisesService } from '../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './paises-list.html',
  styleUrl: './paises-list.css',
})
export class PaisesList implements OnInit {
  displayedColumns = ['nome', 'sigla', 'actions'];
  dataSource: Pais[] = [];

  constructor(
    private paisService: PaisesService,
    private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.carregarPaises();
  }
  carregarPaises(): void {
    this.paisService.listar().subscribe({
      next: (dados) => {
        this.dataSource = dados;
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar países:', erro)
    });
  }

  editarPais(pais: Pais): void {
    this.router.navigate(['/paises', pais.id, 'editar']);
  }
  novoPais(): void {
    this.router.navigate(['/paises/novo']);
  }
  removePais(pais: Pais): void {
    if (confirm(`Tem certeza que deseja excluir o país "${pais.nome}"?`)) {
      this.paisService.deletar(pais.id).subscribe({
        next: () => {
          alert('País excluído com sucesso!');
          this.carregarPaises(); // recarrega lista
        },
        error: (erro) => {
          console.error('Erro ao excluir país:', erro);
          alert('Erro ao excluir país!');
        },
      })
    }


  }
}
