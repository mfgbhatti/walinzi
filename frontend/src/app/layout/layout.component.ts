import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalLayoutComponent } from './horizontal/horizontal.component';
import { EmptyLayoutComponent } from './empty/empty.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [CommonModule, HorizontalLayoutComponent, EmptyLayoutComponent],
})
export class LayoutComponent implements OnInit {
  layout!: string;

  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.updateLayout();
  }

  updateLayout(): void {
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    // // 1. Set the layout from the config
    // this.layout = this.config.layout;

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
    // console.log(layoutFromQueryParam);
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
    }
    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data['layout']
      ) {
        // Set the layout
        this.layout = path.routeConfig.data['layout'];
        // console.log(this.layout);
      }
    });
  }
}
