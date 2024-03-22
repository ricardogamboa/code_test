
export default interface Transaction {
    id?: number;
    userEmail: string;
    amount: number;
    type: string;
    createdAt?: string | null;
}
