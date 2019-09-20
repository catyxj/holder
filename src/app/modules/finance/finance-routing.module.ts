
import {FinanceMainComponent} from "./finance-main/finance-main.component";
import {InvoiceMainFiComponent} from "./invoice/invoice-main-fi/invoice-main-fi.component";
import {InvoiceListFiComponent} from "./invoice/invoice-list-fi/invoice-list-fi.component";
import {InvoiceInfoFiComponent} from "./invoice/invoice-info-fi/invoice-info-fi.component";

export const FinanceRoutingModule = [
  {
    path: '',
    component: FinanceMainComponent,
    children: [
      { path: '', redirectTo: 'invoice', pathMatch: 'full' },
      {
        path: 'invoice',
        component: InvoiceMainFiComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: InvoiceListFiComponent
          },
          {
            path: 'info/:uid/:page',
            component: InvoiceInfoFiComponent
          }
        ]
      },

    ]
  }
];
