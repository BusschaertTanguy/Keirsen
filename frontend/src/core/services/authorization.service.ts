import {Injectable} from "@angular/core";
import {from, map, Observable, of} from "rxjs";
import {User, UserManager} from "oidc-client";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {
    private userManager: UserManager | null = null;

    public isAuthenticated(): Observable<boolean> {
        return this.getUser().pipe(map((user: User | null) => !!user))
    }

    public getToken(): Observable<string | null> {
        return this.getUser().pipe(map((user: User | null) => user && user.access_token));
    }

    public async signIn(): Promise<void> {
        try {
            await this.userManager?.signinSilent({returnUrl: window.location.origin})
        } catch (silentError) {
            await this.userManager?.signinRedirect({returnUrl: window.location.origin})
        }
    }

    public async completeSignIn(url: string): Promise<void> {
        await this.userManager?.signinCallback(url);
    }

    public async signOut(): Promise<void> {
        await this.userManager?.signoutRedirect({returnUrl: window.location.origin});
    }

    public async completeSignOut(url: string): Promise<void> {
        await this.userManager?.signoutCallback(url);
    }

    public async load(): Promise<void> {
        const response = await fetch(`${environment.apiUrl}/_configuration/Keirsen`);

        if (!response.ok) {
            throw new Error("Could not load settings for 'Keirsen'");
        }

        const settings: any = await response.json();

        settings.automaticSilentRenew = true;
        settings.includeIdTokenInSilentRenew = true;

        this.userManager = new UserManager(settings);

        this.userManager.events.addUserSignedOut(async () => {
            await this.userManager?.removeUser();
        });
    }

    private getUser(): Observable<User | null> {
        return from(this.userManager?.getUser() ?? of(null))
    }
}
