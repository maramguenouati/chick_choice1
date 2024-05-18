import { Component } from '@angular/core';

interface Product {
  productName: string;
  category: string;
  price: string;
  image: string; 
}
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {

}
