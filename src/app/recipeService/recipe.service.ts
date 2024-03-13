import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

export interface Recipe{
    name: string;
    ings: string;
    inst: string;
    lmt?: string;
}

const URL_DB = "http://127.0.0.1:3000"
const URL_TABLE = "/recipes"

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipes: Recipe[] = [];

    constructor(private http: HttpClient, private ngZone: NgZone) {
        try{
            http.get<HttpResponse<any>>(URL_DB + URL_TABLE).subscribe({
                next: (response) => {
                    if(response != null){
                        for(let r of response as any){
                            this.recipes.push(r);
                        }
                    }
                },
                error: (e) =>{
                    console.log(e)
                    alert("Failed to retrieve existing recipes.")
                }
            })
        }
        catch (e){
            console.log(e)
            alert("Failed to retrieve existing recipes.")
        }
    }

    putRecipe(r: Recipe){
        try {
            let body = {
                "name": r.name,
                "ings": r.ings,
                "inst": r.inst
            }
            this.http.put<HttpResponse<any>>(URL_DB + URL_TABLE, body, { headers: {"Content-Type": "application/json"}, responseType: "text" as "json" }).subscribe({
                next: (response) => {
                    this.refreshRecipes()
                },
                error: (e) =>{
                    console.log(e)
                    alert("Failed to put recipe: " + r.name + ".")
                }
            })
        } catch (e) {
            console.log(e)
            alert("Failed to put recipe: " + r.name + ".")
        }
    }

    deleteRecipe(r: Recipe){
        try {
            let httpBody = {
                name: r.name,
            }
            this.http.delete<HttpResponse<any>>(URL_DB + URL_TABLE, {body: httpBody, headers: {"Content-Type": "application/json"}, responseType: "text" as "json" }).subscribe({
                next: (response) => {
                    this.refreshRecipes()
                },
                error: (e) =>{
                    console.log(e)
                    alert("Failed to delete recipe: " + r.name + ".")
                }
            })
        } catch (e) {
            console.log(e)
            alert("Failed to delete recipe: " + r.name + ".")
        }
    }

    getRecipe(): Observable<HttpResponse<any>>{
        return this.http.get<HttpResponse<any>>(URL_DB + URL_TABLE)
    }
    
    refreshRecipes(){
        try{
            this.getRecipe().subscribe({
                next: (response) => {
                    this.recipes.splice(0, this.recipes.length)
                    if(response != null){
                        for(let r of response as any){
                            this.recipes.push(r);
                        }
                    }
                },
                error: (e) =>{
                    console.log(e)
                    alert("Failed to refresh recipes.")
                }
            })
        }
        catch (e){
            console.log(e)
            alert("Failed to refresh recipes.")
        }
    }

    getRecipeLocal(rName: string){
        return this.recipes.find((r: Recipe) => (r.name == rName))
    }
}
