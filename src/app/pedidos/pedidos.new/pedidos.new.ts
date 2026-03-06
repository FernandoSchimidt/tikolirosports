import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cliente } from '../../clientes/model/cliente';
import { Produto } from '../../produtos/model/produto';
import { PedidosService } from '../../services/pedidos.service';
import { ClientesService } from '../../services/clientes.service';
import { ProdutoService } from '../../services/produto.service';
import { Pedido } from '../model/pedido';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos.new',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule],
  templateUrl: './pedidos.new.html',
  styleUrl: './pedidos.new.css',
})
export class PedidosNew implements OnInit {
  form!: FormGroup;
  clientes: Cliente[] = [];
  produtosFiltrados: Produto[] = [];
  displayedColumns = ['nome', 'categoria', 'precoVenda', 'tamanho', 'estoque', 'acoes'];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidosService,
    private clienteService: ClientesService,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarClientes();
  }

  inicializarForm(): void {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      formaPagamento: ['PIX', Validators.required],
      encomenda: [false],
      itens: this.fb.array([]),
      filtroProduto: ['']
    });

    // Observa o campo de filtro e busca os produtos dinamicamente
    this.form.get('filtroProduto')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((valor: string) => {
        if (!valor || valor.trim().length < 2) {
          this.produtosFiltrados = [];
          return of([]);
        }
        return this.produtoService.pesquisarPorNome(valor);
      })
    ).subscribe({
      next: (resultados: any) => {
        console.log('Resultado da busca:', resultados);

        // Ajusta para lidar com respostas paginadas ou diretas
        if (Array.isArray(resultados)) {
          this.produtosFiltrados = resultados;
        } else if (resultados && resultados.content) {
          this.produtosFiltrados = resultados.content;
        } else {
          this.produtosFiltrados = [];
        }
      },
      error: (erro) => console.error('Erro ao buscar produtos', erro)
    });
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  novoItem(produto: Produto): FormGroup {
    return this.fb.group({
      produto: [produto, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      precoUnitario: [produto.precoVenda, [Validators.required, Validators.min(0)]],
      reservado: [false]
    });
  }

  adicionarItem(produto: Produto): void {
    this.itens.push(this.novoItem(produto));
    this.form.get('filtroProduto')?.reset();
    this.produtosFiltrados = [];
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (dados) => (this.clientes = dados),
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  salvar(): void {
    if (this.form.invalid || this.itens.length === 0) {
      this.snackBar.open('Preencha todos os campos e adicione ao menos um item.', 'Fechar', { duration: 3000 });
      return;
    }

    const pedido: Pedido = this.form.value;
    this.pedidoService.criar(pedido).subscribe({
      next: () => {
        this.snackBar.open('Pedido registrado com sucesso!', 'Fechar', { duration: 3000 });
        this.form.reset();
        this.itens.clear();
      },
      error: (err) => {
        console.error('Erro ao salvar pedido', err);
        this.snackBar.open('Erro ao registrar pedido!', 'Fechar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/pedidos']);
  }
}