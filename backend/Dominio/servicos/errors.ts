export function logErroObterTarefas(error: Error): void {
  console.error('Erro ao obter as tarefas:', error);
  throw error;
}

export function logErroAtualizarTarefa(error: Error): void {
  console.error('Erro ao atualizar a tarefa:', error);
  throw error;
}

export function logErroExcluirTarefa(error: Error): void {
  console.error('Erro ao excluir a tarefa:', error);
  throw error;
}

export function throwTarefaNaoEncontradaError(): void {
  throw new Error('Tarefa não encontrada');
}