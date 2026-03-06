import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisesService } from '../../services/paises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { MatSelectModule } from '@angular/material/select';
import { Time } from '../../times/model/time';
import { TimesService } from '../../services/times.service';

@Component({
  selector: 'app-clientes-new',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './clientes-new.html',
  styleUrl: './clientes-new.css',
})
export class ClientesNew implements OnInit {
  form!: FormGroup;
  titulo = 'Novo Cliente';
  idCliente?: number;
  times: Time[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private timesService: TimesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: [''],
      email: [''],
      timeFavorito: [''],
      observacao: [''],
    });

    this.carregarTimes();

    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idCliente) {
      this.titulo = 'Editar Cliente';
      this.clienteService.buscarPorId(this.idCliente).subscribe({
        next: (cliente) => this.form.patchValue(cliente),
        error: (erro) => {
          console.error('Erro ao buscar cliente:', erro);
          alert('Erro ao carregar cliente para edição!');
          this.router.navigate(['/clientes']);
        },
      });
    }
  }

  salvar(): void {
    const cliente = this.form.value as Cliente;
    if (this.idCliente) {
      this.clienteService.atualizar(this.idCliente, cliente).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          alert('Erro ao atualizar cliente!');
        },
      });
    } else {
      this.clienteService.salvar(cliente).subscribe({
        next: () => {
          alert('Cliente salvo com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (erro) => {
          console.error('Erro ao salvar cliente:', erro);
          alert('Erro ao salvar cliente!');
        },
      });
    }
  }
  cancelar(): void {
    this.router.navigate(['/clientes']);
  }

  carregarTimes(): void {
    this.timesService.listar().subscribe({
      next: (times) => this.times = times,
      error: (erro) => {
        console.error('Erro ao carregar times:', erro);
        alert('Erro ao carregar times!');
      }
    });
  }

  compararTimes(time1: Time, time2: Time): boolean {
    return time1 && time2 ? time1.id === time2.id : time1 === time2;
  }

}
