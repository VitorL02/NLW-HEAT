
//Sobrescreve a tipagem do typescript

declare namespace Express{
    export interface Request{
        user_id: string;
    }
}