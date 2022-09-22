import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientsComponent } from "./clients.component";
import { ClientDetailsComponent } from "./components/details/details.component";

const routes: Routes = [
    { path: '', component: ClientsComponent, title: 'Walinzi - Clients' },
    { path: 'Client-Details/:id', component: ClientDetailsComponent, title: 'Walinzi - Client Details' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ClientsRoutingModule { }