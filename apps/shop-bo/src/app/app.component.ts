import { Component } from '@angular/core';
import { CoreService } from '@novavisio/core';

@Component({
  selector: 'novavisio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
     * Creates an instance of app component.
     * @param coreService Herramientras para app.
     */
    constructor(private readonly coreService: CoreService) {}

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {
        // Inicializa configuración de app.
        // this.coreService.initConfigApp();

        // Registra íconos de la app.
        this.registerIcons();
    }

    /**
     * Registra íconos personalizados para usar como íconos de angular material.
     */
    private registerIcons(): void {
      // TODO: Register custom icons.
    }
}
