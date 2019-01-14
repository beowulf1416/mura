export class User {
    constructor(
        public email: string,
        public permissions: Array<string>
    ) {}

    get is_signed_in(): boolean {
        return this.email !== '';
    }

    public has_permission(permission: string): boolean {
        return this.permissions.indexOf(permission) !== -1;
    }
}
