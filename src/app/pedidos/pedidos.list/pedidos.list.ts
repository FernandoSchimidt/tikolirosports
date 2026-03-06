import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Pedido } from '../model/pedido';
import { PedidosService } from '../../services/pedidos.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pedidos.list',
  imports: [CommonModule, MatTableModule,
    MatButtonModule, MatIconModule,
    MatSnackBarModule,
    MatCardModule, MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './pedidos.list.html',
  styleUrl: './pedidos.list.css',
})
export class PedidosList implements OnInit {

  dataInicio!: Date;
  dataFim!: Date;
  clientes: any[] = [];
  clienteSelecionado: number | null = null;
  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['cliente', 'data', 'status', 'valorTotal', 'valorPago', 'acoes'];

  constructor(
    private pedidosService: PedidosService,
    private snackBar: MatSnackBar,
    private clienteService: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarClientes();
  }
  filtrarPedidos() {

    this.pedidosService
      .filtrarPedidos(this.dataInicio, this.dataFim, this.clienteSelecionado!)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }

  carregarPedidos(): void {
    this.pedidosService.listar().subscribe({
      next: (dados) => {
        // console.log('Pedidos carregados:', dados);
        this.pedidos = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos', err);
        this.snackBar.open('Erro ao carregar pedidos!', 'Fechar', { duration: 3000 });
      }
    });
  }

  visualizar(pedido: Pedido): void {
    this.router.navigate(['pedidos/pedido', pedido.id]);
  }

  marcarEntregue(pedido: Pedido): void {
    this.pedidosService.entregar(pedido.id!).subscribe({
      next: () => {
        this.snackBar.open(`Pedido #${pedido.id} marcado como entregue.`, 'Fechar', { duration: 3000 });
        this.carregarPedidos();
      },
      error: (err) => {
        console.error('Erro ao marcar como entregue', err);
        this.snackBar.open('Erro ao atualizar pedido!', 'Fechar', { duration: 3000 });
      }
    });
  }

  registrarPagamento(pedido: Pedido): void {
    const valor = prompt('Informe o valor do pagamento:');
    if (!valor) return;

    const pagamento = {
      valor: parseFloat(valor),
      forma: 'PIX',
      observacao: 'Pagamento registrado manualmente'
    };

    this.pedidosService.registrarPagamento(pedido.id!, pagamento).subscribe({
      next: () => {
        this.snackBar.open('Pagamento registrado com sucesso!', 'Fechar', { duration: 3000 });
        this.carregarPedidos();
      },
      error: (err) => {
        console.error('Erro ao registrar pagamento', err);
        this.snackBar.open('Erro ao registrar pagamento!', 'Fechar', { duration: 3000 });
      }
    });
  }
  novoPedido(): void {
    this.router.navigate(['/pedidos/novo']);
  }



  carregarClientes() {
    this.clienteService.listar().subscribe(res => {
      this.clientes = res;
    });
  }
  limparFiltro() {

    this.dataInicio = null!;
    this.dataFim = null!;
    this.clienteSelecionado = null;

    this.carregarPedidos();

  }

}
