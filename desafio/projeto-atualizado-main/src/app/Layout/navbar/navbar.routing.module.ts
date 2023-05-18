import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarComponent } from 'src/app/paginas/criar/criar.component';
import { EditarComponent } from 'src/app/paginas/editar/editar.component';
import { ExcluirComponent } from 'src/app/paginas/excluir/excluir.component';

const routes: Routes = [
    {
      path: 'criar',
      component: CriarComponent,
    },

    {
      path: 'editar',
      component: EditarComponent,
    },

    {
      path: 'excluir',
      component: ExcluirComponent,
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }


