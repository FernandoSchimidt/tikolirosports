import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TimesService } from '../../services/times.service';
import { Time } from '../../times/model/time';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../categorias/model/categoria';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-produtos-new',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './produtos-new.html',
  styleUrl: './produtos-new.css',
})
export class ProdutosNew implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  times: Time[] = [];
  categorias: Categoria[] = [];
  tamanhos: string[] = ['PP', 'P', 'M', 'G', 'GG', '1XG', '2XG', '3XG', '4XG'];
  modelos: string[] = ['Masculino', 'Feminino', 'Infantil', 'Unissex', 'Outros'];
  versao: string[] = ['Jogador', 'Torcedor', 'Retrô', 'Outras'];
  form!: FormGroup;
  titulo = 'Novo Produto';
  idProduto?: number;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private timesService: TimesService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.caerrgarTimes();
    this.carregarCategorias();

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required]],
      time: ['', [Validators.required]],
      tamanho: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      versao: ['', [Validators.required]],
      anoLancamento: [0, [Validators.min(1900)]],
      precoCusto: [0, [Validators.required, Validators.min(0)]],
      precoVenda: [0, [Validators.required, Validators.min(0)]],
      estoqueAtual: [0, [Validators.required, Validators.min(0)]],
      estoqueMinimo: [0, [Validators.required, Validators.min(0)]],
    })

    this.idProduto = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idProduto) {
      this.titulo = 'Editar Produto';
      this.produtoService.buscarPorId(this.idProduto).subscribe({
        next: (produto) => {
          this.form.patchValue(produto);
        },
        error: (erro) => {
          console.error('Erro ao buscar produto:', erro);
          alert('Erro ao carregar produto para edição!');
          this.router.navigate(['/produtos']);
        }
      });
    }

  }
  salvar(): void {
    if (this.form.invalid) return;

    const produto = this.form.value as Produto;

    if (this.idProduto) {
      // EDITAR
      this.produtoService.atualizar(this.idProduto, produto).subscribe({
        next: () => {
          this.uploadImagemSeExistir(this.idProduto!);
        },
        error: (erro) => console.error('Erro ao atualizar produto:', erro)
      });
    } else {
      // CRIAR
      this.produtoService.salvar(produto).subscribe({
        next: (produtoSalvo) => {
          if (produtoSalvo?.id !== undefined) {
            this.uploadImagemSeExistir(produtoSalvo.id);
          } else {
            this.router.navigate(['/produtos']);
          }
        },
        error: (erro) => console.error('Erro ao criar produto:', erro)
      });
    }
  }

  uploadImagemSeExistir(produtoId: number) {

    if (!this.selectedFile) {
      this.router.navigate(['/produtos']);
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.produtoService.uploadImagem(produtoId, formData)
      .subscribe({
        next: () => {
          this.router.navigate(['/produtos']);
        },
        error: (erro) => {
          console.error('Erro ao enviar imagem:', erro);
          this.router.navigate(['/produtos']);
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }

  caerrgarTimes(): void {
    this.timesService.listar().subscribe({
      next: (times) => {
        this.times = times;
      },
      error: (erro) => {
        console.error('Erro ao carregar times:', erro);
        alert('Erro ao carregar times!');
      }
    });
  }

  carregarCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
        alert('Erro ao carregar categorias!');
      }
    });
  }
  compareCategoria(categoria1: Categoria, categoria2: Categoria): boolean {
    return categoria1 && categoria2 ? categoria1.id === categoria2.id : categoria1 === categoria2;
  }
  compareTime(time1: Time, time2: Time): boolean {
    return time1 && time2 ? time1.id === time2.id : time1 === time2;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
