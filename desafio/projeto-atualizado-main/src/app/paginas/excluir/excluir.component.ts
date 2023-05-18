import { Component, OnInit } from '@angular/core';
import { ITarefaEnum } from 'src/app/shared/models/ITarefa';
import { TarefaService } from 'src/app/shared/service/tarefa.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.scss']
})
export class ExcluirComponent implements OnInit {

  public atividades: ITarefaEnum[] = [];

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.tarefaService.getAtividades().subscribe(atividades => this.atividades = atividades);
  }

  public excluir(id: number): void {
    const tarefaEncontrada = this.atividades.find(item => item.id === id);

    if (tarefaEncontrada) {
      this.tarefaService.excluirTarefa(tarefaEncontrada).subscribe(() => {
        this.atividades = this.atividades.filter(item => item.id !== id);
      });
    }
  }
}
