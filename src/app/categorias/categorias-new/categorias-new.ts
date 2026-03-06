import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoriasService } from '../../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categorias-new',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './categorias-new.html',
  styleUrl: './categorias-new.css',
})
export class CategoriasNew implements OnInit {
  form!: FormGroup;
  titulo = 'Nova Categoria';
  idCategoria?: number;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required]],
    });


    this.idCategoria = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idCategoria) {
      this.titulo = 'Editar Categoria';
      this.categoriaService.buscarPorId(this.idCategoria).subscribe({
        next: (categoria) => {
          this.form.patchValue(categoria);
        },
        error: (erro) => {
          console.error('Erro ao buscar categoria:', erro);
          alert('Erro ao carregar categoria para edição!');
          this.router.navigate(['/categorias']);
        }
      });
    }
  }
  salvar(): void {
    const categoria = this.form.value as Categoria;

    if (this.idCategoria) {
      // Atualiza
      this.categoriaService.atualizar(this.idCategoria, categoria).subscribe({
        next: () => {
          alert('Categoria atualizada com sucesso!');
          this.router.navigate(['/categorias']);
        },
        error: (erro) => console.error('Erro ao atualizar categoria:', erro),
      });
    } else {
      // Cria
      this.categoriaService.salvar(categoria).subscribe({
        next: () => {
          alert('Categoria criada com sucesso!');
          this.router.navigate(['/categorias']);
        },
        error: (erro) => console.error('Erro ao salvar categoria:', erro),
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/categorias']);
  }

}
