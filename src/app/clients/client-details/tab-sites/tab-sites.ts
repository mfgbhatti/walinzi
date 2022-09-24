import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-client-details-sites',
  templateUrl: './tab-sites.html',
  styleUrls: ['./tab-sites.scss']
})

export class ClientTabSitesComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['serial', 'name'];
  ngOnInit(): void {

  }
}