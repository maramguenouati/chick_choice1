import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebare',
    templateUrl: './sidebare.component.html',
    styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent {
    isWardrobeOpen = false;

    toggleWardrobe() {
        this.isWardrobeOpen = !this.isWardrobeOpen;
    }
}
