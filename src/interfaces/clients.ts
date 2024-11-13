export interface Client {
    id?:       string;
    email:    string;
    file: string;
    phone: string;
    fullName: string;
    isActive?: boolean;
    user?:    Client;
    roles?:   string[];
    audiences?: any[],
    groups?: any[],
    birthday?: string
}
