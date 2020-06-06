export class TokenHandler{

    public static getToken():string{
        return sessionStorage.getItem("token");
    }

    public static setToken(token:string):void{
        sessionStorage.setItem("token", token);
    }
    public static deleteToken(): void{
      sessionStorage.removeItem("token");
    }

  public getToken():string{
    return sessionStorage.getItem("token");
  }

  public setToken(token:string):void{
    sessionStorage.setItem("token", token);
  }
  public deleteToken(): void{
    sessionStorage.removeItem("token");
  }
}
