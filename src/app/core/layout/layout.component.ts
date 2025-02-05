import { Component, input } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
    selector: 'app-layout',
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {
  headerIcon = input<string>('');
  headerTitle = input<string>('');
}
