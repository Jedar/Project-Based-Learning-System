export class TokenHandler{

    public getToken():string{
        return sessionStorage.getItem("token");
    }

    public setToken(token:string):void{
        sessionStorage.setItem("token", token);
    }
}
