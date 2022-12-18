import { NgModule } from '@angular/core';
import { LayoutComponent } from '@layout/layout.component';
import { EmptyLayoutModule } from '@layout/layouts/empty/empty.module';
import { CenteredLayoutModule } from '@layout/layouts/horizontal/centered/centered.module';
import { EnterpriseLayoutModule } from '@layout/layouts/horizontal/enterprise/enterprise.module';
import { MaterialLayoutModule } from '@layout/layouts/horizontal/material/material.module';
import { ModernLayoutModule } from '@layout/layouts/horizontal/modern/modern.module';
import { ClassicLayoutModule } from '@layout/layouts/vertical/classic/classic.module';
import { ClassyLayoutModule } from '@layout/layouts/vertical/classy/classy.module';
import { CompactLayoutModule } from '@layout/layouts/vertical/compact/compact.module';
import { DenseLayoutModule } from '@layout/layouts/vertical/dense/dense.module';
import { FuturisticLayoutModule } from '@layout/layouts/vertical/futuristic/futuristic.module';
import { ThinLayoutModule } from '@layout/layouts/vertical/thin/thin.module';
import { SettingsModule } from '@layout/common/settings/settings.module';
import { SharedModule } from '@shared/shared.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    CenteredLayoutModule,
    EnterpriseLayoutModule,
    MaterialLayoutModule,
    ModernLayoutModule,

    // Vertical navigation
    ClassicLayoutModule,
    ClassyLayoutModule,
    CompactLayoutModule,
    DenseLayoutModule,
    FuturisticLayoutModule,
    ThinLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        SettingsModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
