import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimesService } from '../../services/times.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Time } from '../model/time';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../categorias/model/categoria';
import { MatSelectModule } from '@angular/material/select';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../paises/model/pais';

@Component({
  selector: 'app-times-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatSelectModule],
  templateUrl: './times-form.html',
  styleUrl: './times-form.css',
})
export class TimesForm implements OnInit {
  form!: FormGroup;
  categorias: Categoria[] = [];
  paises: Pais[] = [];
  titulo = 'Novo Time';
  idTime?: number;

  constructor(
    private fb: FormBuilder,
    private timeService: TimesService,
    private categoriaService: CategoriasService,
    private paisService: PaisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      pais: ['', [Validators.required]],
      campeonato: [''],
      categoria: ['']
    });

    this.carregarCategorias();
    this.carregarPaises();

    this.idTime = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idTime) {
      this.titulo = 'Editar Time';
      this.timeService.buscarPorId(this.idTime).subscribe({
        next: (time) => {
          this.form.patchValue(time);
        },
        error: (erro) => {
          console.error('Erro ao buscar time:', erro);
          alert('Erro ao carregar time para edição!');
          this.router.navigate(['/times']);
        }
      });
    }
  } salvar(): void {
    const time = this.form.value as Time;
    if (this.idTime) {
      this.timeService.atualizar(this.idTime, time).subscribe({
        next: () => {
          alert('Time atualizado com sucesso!');
          this.router.navigate(['/times']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar time:', erro);
          alert('Erro ao atualizar time!');
        }
      });
    } else {
      console.log('Salvando time:', time);
      this.timeService.salvar(time).subscribe({
        next: () => {
          alert('Time criado com sucesso!');
          this.router.navigate(['/times']);
        },
        error: (erro) => {
          console.error('Erro ao criar time:', erro);
          alert('Erro ao criar time!');
        }
      });
    }
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
        alert('Erro ao carregar categorias!');
      }
    });
  }
  carregarPaises(): void {
    this.paisService.listar().subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (erro) => {
        console.error('Erro ao carregar paises:', erro);
        alert('Erro ao carregar paises!');
      }
    });
  }
  cancelar(): void {
    this.router.navigate(['/times']);
  }
  comparePais(p1: Pais, p2: Pais): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  compareCategoria(c1: Categoria, c2: Categoria): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
