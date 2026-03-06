import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { EstoqueService } from '../../services/estoque.service';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,],
  templateUrl: './estoque-form.html',
  styleUrl: './estoque-form.css',
})
export class EstoqueForm implements OnInit {
  form!: FormGroup;
  produtos: any[] = [];
  movimentos: any[] = [];

  displayedColumns = ['data', 'tipo', 'quantidade', 'descricao'];

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarProdutos();
    this.carregarHistorico();
  }

  inicializarForm(): void {
    this.form = this.fb.group({
      produto: [null, Validators.required],
      tipo: ['ENTRADA', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      descricao: ['', Validators.required],
    });
  }

  carregarProdutos(): void {
    this.produtoService.listar(0, 100).subscribe({
      next: (dados) => (this.produtos = dados.content || dados),
      error: (erro) => console.error('Erro ao carregar produtos:', erro),
    });
  }

  carregarHistorico(): void {
    this.estoqueService.listar().subscribe({
      next: (dados) => (this.movimentos = dados),
      error: (erro) => console.error('Erro ao carregar histórico:', erro),
    });
  }

  salvar(): void {
    if (this.form.invalid) return;

    const movimento = {
      tipo: this.form.value.tipo,
      quantidade: this.form.value.quantidade,
      descricao: this.form.value.descricao,
      produto: { id: this.form.value.produto },
    };

    this.estoqueService.movimentar(movimento).subscribe({
      next: () => {
        this.snackBar.open('Movimento registrado com sucesso!', 'Fechar', { duration: 3000 });
        this.form.reset({ tipo: 'ENTRADA' });
        this.carregarHistorico();
      },
      error: (erro) => {
        console.error('Erro ao registrar movimento:', erro);
        this.snackBar.open('Erro ao registrar movimento!', 'Fechar', { duration: 3000 });
      },
    });
  }

  limpar(): void {
    this.form.reset({ tipo: 'ENTRADA' });
  }

  novaMovimentacao(): void {
    this.limpar();
  }

}
