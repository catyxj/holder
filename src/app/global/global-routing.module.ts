
import {MainComponent} from '../main/main.component';


export const GlobalRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    loadChildren: '../modules/modules.module#ModulesModule'
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})*/
// export class GlobalRoutingModule { }
