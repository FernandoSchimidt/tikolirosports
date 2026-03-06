import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-produtos-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule, MatPaginatorModule, MatIconModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './produtos-list.html',
  styleUrls: ['./produtos-list.css'],
  standalone: true
})
export class ProdutosList implements OnInit {
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;
  sortField = 'id';
  sortDirection = 'asc';
  filterValue = '';


  displayedColumns = ['imagem', 'nome', 'time', 'tamanho', 'modelo', 'versao', 'anoLancamento', 'precoCusto', 'precoVenda', 'estoqueAtual', 'estoqueMinimo', 'categoria', 'actions'];
  dataSource: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarProdutos(0, 5);
  }

  carregarProdutos(page: number, size: number): void {
    this.produtoService.listar(page, size, this.sortField, this.sortDirection, this.filterValue).subscribe({
      next: (dados) => {
        console.log(dados.content); // 👈 veja o valor de imagemUrl
        this.dataSource = dados.content || [];
        this.totalElements = dados.totalElements;
        this.pageSize = dados.size;
        this.pageIndex = dados.number;
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar produtos:', erro)
    });
  }
  novoProduto() {
    this.router.navigate(['/produtos/novo']);
  }
  editarProduto(produto: Produto): void {
    this.router.navigate(['/produtos', produto.id, 'editar']);
  }
  removeProduto(produto: any): void {
    if (confirm(`Tem certeza que deseja remover o produto "${produto.nome}"?`)) {
      this.produtoService.deletar(produto.id).subscribe({
        next: () => {
          alert('Produto removido com sucesso!');
          this.carregarProdutos(this.pageIndex, this.pageSize);
        },
        error: (erro) => {
          console.error('Erro ao remover produto:', erro);
          alert('Falha ao remover o produto. Tente novamente.');
        }
      });
    }
  }

  onPageChange(event: any): void {
    this.carregarProdutos(event.pageIndex, event.pageSize);
  }
  onSortChange(event: Sort): void {
    this.sortField = event.active;
    this.sortDirection = event.direction || 'asc';
    this.carregarProdutos(this.pageIndex, this.pageSize);
  }
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = value;
    this.carregarProdutos(0, this.pageSize);
  }

  getImagemUrl(produto: any): string {
    if (!produto.imagemUrl) {
      return 'assets/no-image.png';
    }

    // Se já for URL completa
    if (produto.imagemUrl.startsWith('http')) {
      return produto.imagemUrl;
    }

    // Se for caminho do backend
    return 'http://localhost:8080' + produto.imagemUrl;
  }
}
