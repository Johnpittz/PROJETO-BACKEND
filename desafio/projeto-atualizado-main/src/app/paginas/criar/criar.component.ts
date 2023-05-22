import { Component, OnInit } from '@angular/core';
import { ITarefaEnum } from 'src/app/shared/models/ITarefa';
import { TarefaService } from 'src/app/shared/service/tarefa.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})
export class CriarComponent implements OnInit {

  public atividades: ITarefaEnum[] = [];

  constructor(private tarefaService: TarefaService, public http: HttpClient) { }

  ngOnInit(): void {
    this.tarefaService.getAtividades().subscribe(atividades => this.atividades = atividades);
  }

  public adicionar(nomeTarefa: string) {
    if (nomeTarefa.trim().length === 0) {
      return;
    }
    const tarefaEncontrada = this.atividades.find(item => item.nome.toLowerCase() === nomeTarefa.toLowerCase());

    if (!tarefaEncontrada) {
      const novaTarefa = {
        nome: nomeTarefa,
        concluida: false
      };
      this.http.post<string>("http://localhost:3000/tarefas", novaTarefa).subscribe(() => {
        this.tarefaService.getAtividades().subscribe(atividades => this.atividades = atividades);
      });
    }
  }

  public concluir(id: number): void {
    const tarefaEncontrada = this.atividades.find(item => item.id === id);

    if (tarefaEncontrada) {
      tarefaEncontrada.concluida = !tarefaEncontrada.concluida;
      this.tarefaService.atualizarAtividade(tarefaEncontrada);
    }
  }
}
