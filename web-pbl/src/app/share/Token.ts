export class TokenHandler{
    private token:string;

    public getToken():string{
        return this.token;
    }

    public setToken(token:string):void{
        this.token = token;
    }
}
