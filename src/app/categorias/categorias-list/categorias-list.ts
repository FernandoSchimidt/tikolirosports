import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Categoria } from '../model/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './categorias-list.html',
  styleUrls: ['./categorias-list.css'],
  standalone: true
})
export class CategoriasList implements OnInit {
  displayedColumns = [ 'nome', 'descricao', 'actions'];
  dataSource: Categoria[] = [];

  constructor(
    private categoriaService: CategoriasService,
    private cd: ChangeDetectorRef,
    private router: Router) { }


  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => {
        this.dataSource = dados;
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar categorias:', erro)
    });
  }
  novaCategoria() {
    this.router.navigate(['/categorias/nova']);
  }
  removeCategoria(categoria: Categoria): void {
    // chama o backend para verificar se há produtos vinculados
    this.categoriaService.verificarItens(categoria.id).subscribe({
      next: (possuiItens) => {
        if (possuiItens) {
          alert(`A categoria "${categoria.nome}" não pode ser excluída pois possui itens associados.`);
        } else if (confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`)) {
          this.categoriaService.deletar(categoria.id).subscribe({
            next: () => {
              alert('Categoria excluída com sucesso!');
              this.carregarCategorias(); // recarrega lista
            },
            error: (erro) => {
              console.error('Erro ao excluir categoria:', erro);
              alert('Erro ao excluir categoria!');
            },
          });
        }
      },
      error: (erro) => {
        console.error('Erro ao validar itens da categoria:', erro);
        alert('Erro ao validar exclusão da categoria.');
      },
    });
  }

  editarCategoria(categoria: Categoria): void {
    this.router.navigate(['/categorias', categoria.id, 'editar']);
  }


}
