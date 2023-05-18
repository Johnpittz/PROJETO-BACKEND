import { ITarefaEnum } from '../models/ITarefa';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'http://localhost:3000/tarefas';

  constructor(private http: HttpClient) { }

  public getAtividades(): Observable<ITarefaEnum[]> {
    return this.http.get<ITarefaEnum[]>(this.apiUrl);
  }

  public adicionarAtividade(atividade: ITarefaEnum): Observable<any> {
    return this.http.post(this.apiUrl, atividade);
  }

  public atualizarAtividade(atividade: ITarefaEnum): Observable<ITarefaEnum> {
    const url = `${this.apiUrl}/${atividade.id}`;
    return this.http.put<ITarefaEnum>(url, atividade);
  }

  public excluirTarefa(tarefa: ITarefaEnum): Observable<any> {
    const url = `${this.apiUrl}/${tarefa.id}`;
    return this.http.delete(url);
  }
}
