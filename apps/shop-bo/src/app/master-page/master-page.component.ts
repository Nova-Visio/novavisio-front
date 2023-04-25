import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, takeUntil, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Message, MessengerService,NavItem } from '@novavisio/components';
import { AuthActions, fromAuth, selectUserEmail, selectUserSession, selectUsername } from '@novavisio/auth';
import { Store } from '@ngrx/store';
import { selectAppVersion, selectNavItems, selectOpenedSidenav } from '../shared/state/shared.selectors';
import { SharedStateModel } from '../shared/state/shared.state-model';
import * as navConfig from '../config/navigation.config';
import * as SharedActions from '../shared/state/shared.actions';
import { User } from '@novavisio/interfaces';

/**
 * Componente para la vista master-page.
 */
@Component({
    selector: 'app-master-page',
    templateUrl: './master-page.component.html',
    styleUrls: ['./master-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MasterPageComponent implements OnInit, OnDestroy {

    /** Referencia del menú de navegación. */
    @ViewChild(MatSidenav)
    public sidenav: MatSidenav;

    /** Verisón de la app. */
    public appVersion$: Observable<string>;

    /** Nombre del usuario logeado. */
    public username$: Observable<string>;
    
    /** Correo electrónico del usuario logeado. */
    public userEmail$: Observable<string>;

    /** Items del menú de navegación. */
    public navItems$: Observable<NavItem[]>;

        /** True si el sidenav debe estar abierto. False de lo contrario. */
    public openedSidenav$: Observable<boolean>;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading$: Observable<boolean>;

    /** Modo de visualización del sidenav. */
    public sidenavMode: 'over' | 'push' | 'side';

    /** True si el sidenav debe estar lockeado. False de lo contrario. */
    public lockedSidenav: boolean;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of login component.
     * @param router Administra operaciones de ruteo.
     * @param breakpointObserver Observador de cambios en la resolución de la vista.
     * @param translateService Administra operaciones de i18n.
     * @param messengerService Administra las operaciones del módulo Message Modal.
     * @param deviceService Administra las operaciones del módulo device.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        private readonly router: Router,
        private readonly breakpointObserver: BreakpointObserver,
        private readonly translateService: TranslateService,
        private readonly messengerService: MessengerService,
        private readonly store: Store<fromAuth.State & SharedStateModel>
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {
        this.appVersion$ = this.store.select(selectAppVersion);
        this.username$ = this.store.select(selectUsername);
        this.userEmail$ = this.store.select(selectUserEmail);
        this.navItems$ = this.store.select(selectNavItems);
        this.openedSidenav$ = this.store.select(selectOpenedSidenav);

        // Emite valores cuando aplica o dejan de aplicar los breakpoints observados.
        this.breakpointObserver.observe('(min-width: 960px)')
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: BreakpointState) => {
                this.sidenavMode = state.matches ? 'side' : 'over';
                this.sidenavOpenedChange(state.matches);
            });

        this.listenChangeNavItems();
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /**
     * Evento de selección de un item del menú de navegación.
     * @param navItem Item de navegación.
     */
    public selectNavItem(navItem: NavItem): void {
        if (this.sidenavMode === 'over') {
            this.store.dispatch(SharedActions.setOpenedSidenav({ opened: false }));
        }
        if (!!navItem && navItem.name === navConfig.logoutKey) {
            this.logout();
        } else if (navItem?.url && navItem.url !== this.router.url) {
            this.router.navigateByUrl(navItem.url);
        }
    }

    /**
     * Escucha los cambios en la visibilidad del sidenav.
     * @param opened True si está visible. False de lo contrario.
     */
    public sidenavOpenedChange(opened: boolean): void {
        this.store.dispatch(SharedActions.setOpenedSidenav({ opened }));
    }

    /**
     * Se cargan los items de navegación.
     */
    private listenChangeNavItems(): void {
        this.store.select(selectUserSession)
            .pipe(
                distinctUntilChanged((prev, current) => {
                    const ret = prev?.role === current?.role;
                    return ret;
                }),
                map(( userSession: User ) => {
                    return navConfig.navItems
                        .filter((navItem: NavItem) => this.filterItemByUser(navItem, userSession))
                        .map((navItem: NavItem) => ({
                            ...navItem,
                            disabled: navItem.disabled ? navItem.disabled : !this.enableItemByUser(navItem, userSession)
                        }));
                }),
                takeUntil(this.destroy$))
            .subscribe((navItems: NavItem[]) => this.store.dispatch(SharedActions.setNavItems({ navItems })));
    }

    /**
     * Realiza el toggle del sidenav.
     */
    public toggleSidenav(): void {
        this.openedSidenav$.pipe(first())
            .subscribe((openedSidenav: boolean) => this.store.dispatch(SharedActions.setOpenedSidenav({ opened: !openedSidenav })));
    }

    /**
     * Devuelve true si el item de navegación debe mostrarse dependiendo el usuario. False de lo contrario.
     * @param navItem Item de navegación.
     * @param user Datos del usuario.
     * @returns True si el item de navegación debe mostrarse dependiendo el usuario. False de lo contrario.
     */
    private filterItemByUser(navItem: NavItem, user: User): boolean {
        return true;
    }

    /**
     * Devuelve true si el item de navegación está habilitado. False de lo contrario.
     * @param navItem Item de navegación.
     * @param user Datos del usuario.
     * @returns True si el item de navegación está habilitado. False de lo contrario.
     */
    private enableItemByUser(navItem: NavItem, user: User): boolean {
        return true;
    }

    /**
     * Realiza el logout del usuario.
     */
    private logout(): void {
        const messenger: Message = { text: this.translateService.instant('AUTH.LOGIN.LOGOUT.WARNING')};
        this.messengerService.showConfirmation(messenger).afterClosed()
            .pipe(
                tap(() => this.store.dispatch(AuthActions.logout())),
                first(),
                takeUntil(this.destroy$)
            ).subscribe();
    }
}
