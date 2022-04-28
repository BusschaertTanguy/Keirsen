import {Injectable} from "@angular/core";
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {
    public constructor(private readonly securityService: OAuthService) {
    }

    public async load(config: AuthConfig): Promise<void> {
        this.securityService.configure(config);
        await this.securityService.loadDiscoveryDocumentAndTryLogin();
    }

    public login(): void {
        this.securityService.initCodeFlow();
    }

    public logout(): Promise<void> {
        return this.securityService.revokeTokenAndLogout();
    }

    public getToken(): string | null {
        return this.securityService.getAccessToken();
    }

    public isAuthenticated(): boolean {
        return this.securityService.hasValidAccessToken();
    }
}
