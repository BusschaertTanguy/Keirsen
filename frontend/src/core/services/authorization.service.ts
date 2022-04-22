import {Injectable} from "@angular/core";
import {from, map, Observable, switchMap} from "rxjs";
import {User, UserManager} from "oidc-client";

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {
    private userManager: UserManager | null = null;

    public isAuthenticated(): Observable<boolean> {
        return this.getUser().pipe(map((user: User | null) => !!user));
    }

    public getToken(): Observable<string | null> {
        return this.getUser().pipe(map((user: User | null) => user && user.access_token));
    }

    public async signIn(): Promise<void> {
        await this.ensureUserManagerInitialized();

        try {
            await this.userManager?.signinSilent({returnUrl: "http://localhost:4200/"})
        } catch (silentError) {
            await this.userManager?.signinRedirect({returnUrl: "http://localhost:4200/"})
        }
    }

    public async completeSignIn(url: string): Promise<void> {
        await this.ensureUserManagerInitialized();
        await this.userManager?.signinCallback(url);
    }

    public async signOut(): Promise<void> {
        await this.ensureUserManagerInitialized();
        await this.userManager?.signoutRedirect({returnUrl: "http://localhost:4200/"});
    }

    public async completeSignOut(url: string): Promise<void> {
        await this.ensureUserManagerInitialized();
        await this.userManager?.signoutCallback(url);
    }

    private getUser(): Observable<User | null> {
        return from(this.ensureUserManagerInitialized()).pipe(switchMap(() => this.userManager!.getUser()));
    }

    private async ensureUserManagerInitialized(): Promise<void> {
        if (this.userManager) {
            return;
        }

        const response = await fetch("https://localhost:5001/_configuration/Keirsen");

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
}
