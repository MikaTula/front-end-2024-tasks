import {Component} from '@angular/core';
import {TaskDataSource} from '../../data-sources/task.data-source';
import {MatTableModule} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [
    // AsyncPipe,
    MatTableModule,
    MatButton,
    MatInput,
    FormsModule
  ],
  standalone: true,
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public dataSource = new TaskDataSource();

  public displayedColumns: string[] = ['title', 'description'];

  public searchTerm: string = '';

  public search() {
    this.dataSource.search(this.searchTerm);
  }
}
