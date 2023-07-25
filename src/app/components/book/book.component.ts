import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LibroModel } from 'src/app/model/libro';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  listBook : LibroModel[]=[];
  formBook : FormGroup = new FormGroup({});
  isUpdate: Boolean=false;
  constructor(private bookService: BookServiceService) {}
  ngOnInit(): void {
    this.list();
    this.formBook = new FormGroup({
      id: new FormControl(),
      nombre:new FormControl(''),
      autor:new FormControl(''),
      hojas:new FormControl(''),
      precio:new FormControl(''),
      fechaRegistro:new FormControl(''),
      fechaPublicacion:new FormControl(''),
      status:new FormControl(''),
      code:new FormControl('')
    });
  }
  list(){
    return this.bookService.getAllActive().subscribe(resp=>{
      if(resp){
        this.listBook=resp;
      }
    })
  }
  selectBook(item :any){
    this.isUpdate= true;
    this.formBook.controls['id'].setValue(item.id);
    this.formBook.controls['nombre'].setValue(item.nombre);
    this.formBook.controls['autor'].setValue(item.autor);
    this.formBook.controls['hojas'].setValue(item.hojas);
    this.formBook.controls['precio'].setValue(item.precio);
    this.formBook.controls['fechaRegistro'].setValue(item.fechaRegistro);
    this.formBook.controls['fechaPublicacion'].setValue(item.fechaPublicacion);
    this.formBook.controls['status'].setValue(item.status);
    this.formBook.controls['code'].setValue(item.code);

  }
  delete(id: any , entity: LibroModel ){
    this.bookService.deleteBook(id, entity).subscribe(resp=>{

      if(resp){
        this.list();
      }
    })
  }
  newBook(){
    this.isUpdate=false;
    this.formBook.reset();
  }
  save() {
    this.formBook.controls['status'].setValue('1');
    this.bookService.saveBook(this.formBook.value)
    .subscribe(resp=>{
      if(resp){
        this.list();
        this.formBook.reset();
        alert("Libro guardado correctamente");
      }
    })
  }
  updateBook(){
    this.bookService.updateBook(this.formBook.value)
    .subscribe(resp=>{
      if(resp){
        this.list();
        this.formBook.reset();
        alert("Libro actualizado correctamente");
      }
    })
  }


}
