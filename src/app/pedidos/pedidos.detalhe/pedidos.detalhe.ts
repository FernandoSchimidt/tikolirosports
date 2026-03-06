import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { PedidosService } from '../../services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../model/pedido';

@Component({
  selector: 'app-pedidos.detalhe',
  imports: [CommonModule, MatTableModule,
    MatButtonModule, MatIconModule,
    MatSnackBarModule,
    MatCardModule],
  templateUrl: './pedidos.detalhe.html',
  styleUrl: './pedidos.detalhe.css',
})
export class PedidosDetalhe implements OnInit {
  idPedido?: number;
  pedido: Pedido | undefined;
  displayedColumns = ['produto', 'quantidade', 'precoUnitario', 'tamanho', 'subtotal'];

  constructor(
    private pedidoService: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.carregarPedido();
  }

  carregarPedido(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idPedido) {
      this.pedidoService.getPedidoById(this.idPedido).subscribe({
        next: (pedido) => {
          console.log('Pedido carregado:', pedido);
          this.pedido = pedido;
        },
        error: (error) => {
          console.error('Erro ao carregar o pedido:', error);
        }
      });
    }

  }

  voltar(): void {
    this.router.navigate(['/pedidos']);
  }

}
