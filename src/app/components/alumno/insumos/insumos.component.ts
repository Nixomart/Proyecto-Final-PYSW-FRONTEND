import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/catgorias/categoria.service';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css'],
})
export class InsumosComponent {
  insumos: Array<any> = [];
  insumosReal: Array<any> = [];
  categorias: Array<any> = [];
  categoriaActual: string = '';
  constructor(
    private insumoService: InsumoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.insumoService.getInsumos().subscribe((result) => {
      this.insumos = result;
      this.insumosReal = result;
    });
    this.categoriaService.getcategorias().subscribe((result) => {
      this.categorias = result;
      console.log(this.categorias);
    });
  }

  onCategoriaChange = (categoria: string) => {
    if (categoria == 'Selecciona una categoria') {
      this.insumos = this.insumosReal
    }else{

      const insumosFiltrados = this.insumosReal.filter(
        (insumo) => insumo.categoria.descripcion === categoria
        );
        console.log('Insumos filtrados:', insumosFiltrados);
        
        // Actualizar el array de insumos con los insumos filtrados
        this.insumos = insumosFiltrados;
      }
      };
}
