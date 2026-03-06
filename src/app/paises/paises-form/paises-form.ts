import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisesService } from '../../services/paises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from '../model/pais';

@Component({
  selector: 'app-paises-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './paises-form.html',
  styleUrls: ['./paises-form.css'],
})
export class PaisesForm implements OnInit {
  form!: FormGroup;
  titulo = 'Novo País';
  idPais?: number;

  constructor(
    private fb: FormBuilder,
    private paisService: PaisesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sigla: ['', [Validators.required]],
    });

    this.idPais = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idPais) {
      this.titulo = 'Editar País';
      this.paisService.buscarPorId(this.idPais).subscribe({
        next: (pais) => this.form.patchValue(pais),
        error: (erro) => {
          console.error('Erro ao buscar país:', erro);
          alert('Erro ao carregar país para edição!');
          this.router.navigate(['/paises']);
        },
      });
    }
  }

  salvar(): void {
    const pais = this.form.value as Pais;
    if (this.idPais) {
      this.paisService.atualizar(this.idPais, pais).subscribe({
        next: () => {
          alert('País atualizado com sucesso!');
          this.router.navigate(['/paises']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar país:', erro);
          alert('Erro ao atualizar país!');
        },
      });
    } else {
      this.paisService.salvar(pais).subscribe({
        next: () => {
          alert('País salvo com sucesso!');
          this.router.navigate(['/paises']);
        },
        error: (erro) => {
          console.error('Erro ao salvar país:', erro);
          alert('Erro ao salvar país!');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/paises']);
  }
}
