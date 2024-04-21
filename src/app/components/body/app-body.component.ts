import {Component, OnInit, ViewChild} from '@angular/core';
import {SectorService} from "../../services/SectorService";
import {UserData} from "../../models/UserData";
import {UserService} from "../../services/UserService";
import {NgForm} from "@angular/forms";

interface SectorNode {
  id: number;
  name: string;
  children?: SectorNode[];
}

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrl: './app-body.component.css'
})
export class AppBodyComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  sectors: SectorNode[] = [];
  userData: UserData = {name: '', userSectors: [], agreeToTerms: false};
  submitted: boolean = false;

  constructor(private sectorService: SectorService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadSectors();
    this.fetchUserData();
  }

  loadSectors(): void {
    this.sectorService.getAllSectors().subscribe(
      sectors => {
        this.sectors = sectors.filter(sector => !sector.parentId);
        this.buildHierarchy(this.sectors, sectors);
      },
      error => {
        console.error('Error loading sectors:', error);
      }
    );
  }

  buildHierarchy(parentSectors: SectorNode[], allSectors: any[]): void {
    parentSectors.forEach(parentSector => {
      parentSector.children = allSectors.filter(sector => sector.parentId === parentSector.id);
      this.buildHierarchy(parentSector.children, allSectors);
    });
  }

  fetchUserData(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserData(+userId).subscribe(
        {
          next: (userData: UserData) => {
            if (userData) {
              this.userData = userData;
            }
          },
          error: (error) => {
            console.error('Error fetching user data:', error);
          }
        }
      );
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    this.userService.submitUserData(this.userData).subscribe(
      {
        next: (userId) => {
          console.log('Form data submitted successfully: UserId: ', userId);
          localStorage.setItem('userId', userId.toString());
          this.submitted = false;
        },
        error: (error) => {
          console.error('Error occurred while submitting form data:', error);
        }
      }
    );
  }
}
