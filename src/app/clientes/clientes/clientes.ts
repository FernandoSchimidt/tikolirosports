import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Time } from '../../times/model/time';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css'],
  standalone: true,
})
export class Clientes implements OnInit {
  displayedColumns = ['nome', 'telefone', 'email', 'time', 'observacao', 'actions'];
  dataSource: Cliente[] = [];
  times: Time[] = [];

  constructor(
    private clienteService: ClientesService,
    private cd: ChangeDetectorRef,
    private router: Router) { }


  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (dados) => {
        console.log('Dados recebidos:', dados);
        this.dataSource = dados;
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar clientes:', erro)
    });
  }
  novoCliente(): void {
    this.router.navigate(['/clientes/novo']);
  }
  removeCliente(cliente: Cliente): void {
    if (confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`)) {
      this.clienteService.deletar(cliente.id!).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.carregarClientes(); // recarrega lista
        },
        error: (erro) => {
          console.error('Erro ao excluir cliente:', erro);
          alert('Erro ao excluir cliente!');
        },
      })
    }

  }
  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id, 'editar']);
  }
  compararTimes(time1: Time, time2: Time): boolean {
    return time1 && time2 ? time1.id === time2.id : time1 === time2;
  }
}

