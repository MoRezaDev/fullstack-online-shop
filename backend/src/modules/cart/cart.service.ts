import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CartService {
  constructor(private databaseService: DatabaseService) {}

  async addItemToCart() {
    
  }
}
