export class Urls {
    public static base_url = 'https://mura.local/api/';

    /* user management */
    public static url_user_signin = Urls.base_url + 'v1/user/signin';
    public static url_user_signout = Urls.base_url + 'v1/user/signout';
    public static url_user_permissions = Urls.base_url + 'v1/user/permissions';

    public static url_user_clients = Urls.base_url + 'v1/user/clients';
    public static url_user_client_select = Urls.base_url + 'v1/user/clients/select';
}
