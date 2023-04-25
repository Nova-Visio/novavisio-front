import { Inject, Injectable } from '@angular/core';
import { BarcodeScanner, CheckPermissionResult, ScanResult } from '@capacitor-community/barcode-scanner';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, of, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Haptics } from '@capacitor/haptics';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { LatLng } from '@novavisio/interfaces';
import { Device, DeviceInfo } from '@capacitor/device';
import { App, AppInfo } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { SafeArea, StatusBarInfo } from 'capacitor-plugin-safe-area';
import { DOCUMENT } from '@angular/common';
import { Geolocation, PermissionStatus as GeolocationPermissionStatus } from '@capacitor/geolocation';
import { Messenger, MessengerService, MessengerType } from '@novavisio/components';

/**
 * Administra las operaciones del módulo device.
 */
@Injectable()
export class DeviceService {

    /** Clase de estilo cuando está encendido el escanner. */
    private scanningClassName = 'scanner-enabled';

    /** Referencia para habilitar el modo escaneo. */
    public startScan$: Subject<boolean> = new Subject<boolean>();

    /** Referencia para desuscribir observables del componente. */
    public stopScan$: Subject<boolean> = new Subject<boolean>();

    public scannedQR$: Observable<string>;

    /**
     * Creates an instance of scanner qr service.
     * @param translateService Administra operaciones de i18n.
     * @param messengerService Servicio que muestra mensajes en un modal.
     * @param media Servicio que reproducir archivos.
     * @param launchNavigator Servicio para navegar una ruta con otra app.
     *
     */
    constructor(
        public translateService: TranslateService,
        private messengerService: MessengerService,
        private media: Media,
        private launchNavigator: LaunchNavigator,
        @Inject(DOCUMENT)
        private document: Document
    ) {

        this.scannedQR$ = this.startScan$
            .pipe(
                switchMap(() => this.checkScanPermission()),
                switchMap((grantedPermission: boolean) => {
                    if (!grantedPermission) {
                        return throwError(() => 'Denied permission');
                    } else {
                        return of(grantedPermission);
                    }
                }),
                tap(() => {
                    document.body.classList.add(this.scanningClassName);
                }),
                switchMap(() => from(BarcodeScanner.hideBackground())),
                switchMap(() => from(BarcodeScanner.startScan())),
                filter((scan: ScanResult) => scan?.hasContent),
                map((scan: ScanResult) => scan.content),
                takeUntil(this.stopScan$)
            );
    }

    /**
     * Devuelve true si el escanner está encendido. False de lo contrario.
     * @returns True si el escanner está encendido. False de lo contrario.
     */
    public isScanEnabled(): boolean {
        const ret: boolean = document.body.classList.contains(this.scanningClassName);
        return ret;
    }

    /**
     * Finaliza el modo de scaneo de código QR.
     */
    public finishScan(): void {
        document.body.classList.remove(this.scanningClassName);

        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();

    }

    /**
     * Chequea si se tienen los permisos necesarios para escanear el código.
     * @returns Confirmación de permiso.
     */
    public checkScanPermission(): Observable<boolean> {

        // Chequea si está dado el permiso (sin pedirlo).
        return from(BarcodeScanner.checkPermission({ force: false }))
            .pipe(
                switchMap((status: CheckPermissionResult) => {

                    // Permiso concedido.
                    if (status.granted) {
                        return of(true);
                    } else if (status.neverAsked) {
                        // Si nunca fue solicitado el permiso, se explica y solicita el permiso.

                        // Configuración de message modal.
                        const messenger: Messenger = {
                            message: this.translateService.instant('PERMISSION.CAMERA.INFO'),
                            type: MessengerType.Info,
                            actions: [{
                                text: this.translateService.instant('ACCEPT'),
                                pallete: 'primary',
                                actionClass: 'mat-raised-button'
                            }]
                        };

                        return this.messengerService.show(messenger).afterClosed()
                            .pipe(
                                switchMap(() => BarcodeScanner.checkPermission({ force: true })),
                                switchMap((statusRequest: CheckPermissionResult) => of(statusRequest.granted))
                            );
                    } else {
                        // No otorga los permisos.

                        // Configuración de message modal.
                        const messageModal: Messenger = {
                            message: this.translateService.instant('PERMISSION.CAMERA.DENIED'),
                            type: MessengerType.Warning,
                            actions: [{
                                text: this.translateService.instant('ACCEPT'),
                                pallete: 'primary',
                                actionClass: 'mat-raised-button'
                            }]
                        };

                        return this.messengerService.show(messageModal).afterClosed()
                            .pipe(
                                switchMap(() => BarcodeScanner.checkPermission({ force: true })),
                                switchMap((statusRequest: CheckPermissionResult) => of((statusRequest.granted)))
                            );
                    }
                })
            );
    }

    /**
     * Chequea si se tienen los permisos necesarios de geolocalización.
     * @returns Confirmación de permiso.
     */
    public checkGeolocationPermission(): Observable<GeolocationPermissionStatus> {


        return from(Geolocation.checkPermissions())
            .pipe(
                switchMap((status: GeolocationPermissionStatus) => {

                    // Permiso concedido.
                    if (status.location === 'granted') {
                        return of(status);
                    } else if (status.location !== 'denied') {

                        // Configuración de message modal.
                        const messageModal: Messenger = {
                            message: this.translateService.instant('PERMISSION.GEOLOCATION.INFO'),
                            type: MessengerType.Info,
                            actions: [{
                                text: this.translateService.instant('ACCEPT'),
                                pallete: 'primary',
                                actionClass: 'mat-raised-button'
                            }]
                        };
                        return this.messengerService.show(messageModal).afterClosed()
                    } else {
                        return throwError(() => ({ error: { errorCode: 'ERR_USER_PERMISSION' } }));
                    }
                })
            );
    }

    /**
     * Habilita la cámara para tomar una foto.
     * @param options Result Type.
     * @returns Foto.
     */
    public takePhoto(options?: ImageOptions): Observable<Photo> {
        const imageOptions: ImageOptions = {
            quality: 90,
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            allowEditing: false,
            ...options
        };
        return from(Camera.getPhoto(imageOptions));
    }

    /**
     * Convierte una foto (cámara o seleccionada) en un archivo.
     * @param photo Foto (cámara o seleccionada).
     * @param name Nombre del archivo.
     * @returns Archivo.
     */
    public parsePhotoToFile(photo: Photo, name: string): File {
        const byteCharacters = atob(photo.base64String);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const filename = `${name}.${photo.format}`;
        const mimeType = `image/${photo.format}`;
        const file: File = new File(byteArrays, filename, { type: mimeType, lastModified: Date.now() });
        return file;
    }

    /**
     * Realiza una vibración del dispositivo.
     * @returns Realiza una vibración del dispositivo.
     */
    public vibrate(): Observable<void> {
        return from(Haptics.vibrate());
    }

    /**
     * Reproduce sonido.
     * @param filename Archivo a reproducir.
     */
    public playSound(filename: string): void {
        const mediaFile: MediaObject = this.media.create(filename);
        mediaFile.play();
    }

    /**
     * Realiza una llamada al número indicado.
     * @param phoneNumber Número de teléfono.
     */
    public callTo(phoneNumber: string): void {
        location.href = `tel:${phoneNumber}`;
    }

    /**
     * Navega a todas las direcciones de la orden de ruta.
     * @param destinations Destinos a navegar.
     */
    public navigateDestinations(destinations: { latLng?: LatLng, name?: string }[]): void {
        if (destinations.length > 1) {
            this.navigateWithGMapsApi(destinations);
        } else {
            const itemDestination: { latLng?: LatLng, name?: string } = destinations[0];
            const latLngPoint: number[] = [itemDestination.latLng?.lat, itemDestination.latLng?.lng];
            const launchOptions: LaunchNavigatorOptions = {
                launchModeGoogleMaps: 'turn-by-turn',
                destinationName: itemDestination.name
            };
            this.launchNavigator?.navigate(latLngPoint, launchOptions)
                .catch(() => {
                    this.navigateWithGMapsApi(destinations);
                });
        }
    }

    /**
     * Navega a una lista de direcciones usando el api nativa de Google Maps.
     * @param destinations Destinos a navegar.
     */
    public navigateWithGMapsApi(destinations: { latLng?: LatLng, name?: string }[]): void {
        const destinationIdx: number = destinations.length - 1;
        const origin: string = destinationIdx === 0 ? null
            : destinations[0]?.latLng ?
                `${destinations[0]?.latLng.lat},${destinations[0]?.latLng.lng}`
                : destinations[0]?.name;
        const destination: string = destinations[destinationIdx]?.latLng ?
            `${destinations[destinationIdx]?.latLng.lat},${destinations[destinationIdx]?.latLng.lng}`
            : destinations[destinationIdx]?.name;

        const waypoints: string = destinations.length <= 2
            ? null
            : destinations.slice(1, -1).reduce(
                (acumWaypoints: string, currentDestination: { latLng?: LatLng, name?: string }) => {
                    if (acumWaypoints?.length > 0) {
                        acumWaypoints += '| ';
                    }
                    acumWaypoints += `${currentDestination.latLng?.lat},${currentDestination.latLng?.lng}`;
                    return acumWaypoints;
                },
                '');
        const originParam: string = origin ? `&origin=${origin}` : '';
        const destinationParam: string = destination ? `&destination=${destination}` : '';
        const waypointsParam: string = waypoints ? `&waypoints=${waypoints}` : '';
        const linkToMap = `https://www.google.com/maps/dir/?api=1&${originParam}${destinationParam}${waypointsParam}&travelmode=driving`;
        window.open(linkToMap, '_blank');
    }

    /**
     * Devuelve true si el dispositivo es mobile. False de lo contrario.
     * @returns Devuelve true si el dispositivo es mobile. False de lo contrario.
     */
    public async isNativePlatform(): Promise<boolean> {
        const deviceinfo: DeviceInfo = await Device.getInfo();
        const ret: boolean = deviceinfo.platform !== 'web';
        return ret;
    }

    /**
     * Devuelve true si el dispositivo es android. False de lo contrario.
     * @returns Devuelve true si el dispositivo es android. False de lo contrario.
     */
    public async isAndroid(): Promise<boolean> {
        const deviceinfo: DeviceInfo = await Device.getInfo();
        const ret: boolean = deviceinfo.platform === 'android';
        return ret;
    }

    /**
     * Devuelve el id de la plataforma para registrar el token del dispositivo y recibir push notifications..
     * @returns Id de la plataforma para registrar el token del dispositivo y recibir push notifications.
     */
    public async getIdPlatformByPushNotifications(): Promise<string> {
        const deviceinfo: DeviceInfo = await Device.getInfo();
        let idPlatform: string = null;
        switch (deviceinfo.platform) {

            case 'android':
                idPlatform = 'AND';
                break;

            case 'ios':
                idPlatform = 'IOS';
                break;

            default:
                idPlatform = 'UNKNOWN';
        }

        return idPlatform;
    }

    /**
     * Devuelve true si el dispositivo es mobile. False de lo contrario.
     * @returns Devuelve true si el dispositivo es mobile. False de lo contrario.
     */
    public async isEnableCamera(): Promise<boolean> {
        const deviceinfo: DeviceInfo = await Device.getInfo();
        const ret: boolean = deviceinfo.platform !== 'web';
        return ret;
    }

    /**
     * Devuelve la versión de la aplicación.
     * @returns Versión de la aplicación.
     */
    public async getAppVersion(): Promise<string> {
        const isNativePlatform: boolean = await this.isNativePlatform();
        if (!isNativePlatform) {
            return null;
        }
        const appInfo: AppInfo = await App.getInfo();
        const appVersion: string = appInfo.version && appInfo.build ? `${appInfo.version}-${appInfo.build}` : null;
        return appVersion;
    }

    /**
     * Redirije a la vista para generar un envío.
     */
    public async initConfigApp(): Promise<void> {
        const isNativePlatform: boolean = await this.isNativePlatform();
        if (isNativePlatform) {
            const statusBarHeight: StatusBarInfo = await SafeArea.getStatusBarHeight();
            const isAndroid: boolean = await this.isAndroid();
            if (statusBarHeight.statusBarHeight > 0 && !isAndroid) {
                this.document.body?.classList.add('device-with-status-bar');
            }

            await SplashScreen.hide();
        }

    }
}
