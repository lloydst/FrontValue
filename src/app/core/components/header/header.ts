import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'cn-header',
    imports: [RouterLink, RouterLinkActive, MatIconModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {}
