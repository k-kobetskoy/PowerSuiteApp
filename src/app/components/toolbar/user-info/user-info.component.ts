import { Component, OnInit } from '@angular/core';
import { GraphDataService } from 'src/app/services/data/graph-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  imageToShow: any
  imageLoading: boolean

  constructor(private graphDataService: GraphDataService) { }

  ngOnInit() {
    this.getImage()
  }



  getImage() {
    this.imageLoading = true
    this.graphDataService.getProfileImage().subscribe(data => {
      this.createImageFromBlob(data)
      this.imageLoading = false
    },
      error => {
        this.imageLoading = false
        console.error(error)
      }
    )
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



}
