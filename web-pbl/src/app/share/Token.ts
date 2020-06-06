export class TokenHandler{

  public static getToken():string{
      return localStorage.getItem("token");
  }

  public static setToken(token:string):void{
      localStorage.setItem("token", token);
  }
  public static deleteToken(): void{
    localStorage.removeItem("token");
  }

  public getToken():string{
    return localStorage.getItem("token");
  }

  public setToken(token:string):void{
    localStorage.setItem("token", token);
  }
  public deleteToken(): void{
    localStorage.removeItem("token");
  }
}
