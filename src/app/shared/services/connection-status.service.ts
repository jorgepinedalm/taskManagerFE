import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable, of, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConnectionStatusService {
    
    onlineEvent: Observable<Event> | undefined;
    offlineEvent!: Observable<Event>;
    subscriptions: Subscription[] = [];

    connectionStatusMessage!: string;
    private connectionStatus: BehaviorSubject<boolean>;
    private networkStatus$: Subscription = Subscription.EMPTY;

    constructor(){
        console.log("constructor connection");
        this.connectionStatus = new BehaviorSubject<boolean>(true);
        this.checkNetworkStatus();
    }

    checkNetworkStatus() {
        this.connectionStatus.next(navigator.onLine);
        this.networkStatus$ = merge(
          of(null),
          fromEvent(window, 'online'),
          fromEvent(window, 'offline')
        )
          .pipe(map(() => navigator.onLine))
          .subscribe(status => {
            console.log('status', status);
            this.connectionStatus.next(status);
        });
    }

    getConnectionStatus(): Observable<boolean> {
        return this.connectionStatus.asObservable();
    }
    
}