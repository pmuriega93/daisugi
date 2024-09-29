export interface Client {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    user?:    Client;
    roles?:   string[];
}
