import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { defer, lastValueFrom } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductDto } from '../models/productDto.model';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let http: HttpClient;
  let service: ProductsService;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [ProductsService, { provide: HttpClient, useValue: httpSpy }],
    }).compileComponents();
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(ProductsService);
  });

  it('should create', inject(
    [ProductsService],
    async (service: ProductsService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should get a products list ', inject(
    [ProductsService],
    async (service: ProductsService) => {
      // Arrange
      const expected: Product[] = [
        {
          id: 1,
          name: 'product 1',
          description: 'description 1',
          ageRestriction: 10,
          company: 'company test 1',
          price: 10,
          imageName: '',
          imageLocation: '',
        },
        {
          id: 2,
          name: 'product 2',
          description: 'description 2',
          ageRestriction: 20,
          company: 'company test 2',
          price: 20,
          imageName: '',
          imageLocation: '',
        },
      ];

      http.get = jasmine
        .createSpy('get')
        .and.returnValue(defer(() => Promise.resolve(expected)));

      // Act
      const actual = await lastValueFrom(service.getProducts());

      // Assert
      expect(actual).toEqual(expected);
    }
  ));

  it('should get a product by ID', inject(
    [ProductsService],
    async (service: ProductsService) => {
      // Arrange
      const id = '1';
      const expected: Product = {
        id: 1,
        name: 'product 1',
        description: 'description 1',
        ageRestriction: 10,
        company: 'company test 1',
        price: 10,
        imageName: '',
        imageLocation: '',
      };

      http.get = jasmine
        .createSpy('get')
        .and.returnValue(defer(() => Promise.resolve(expected)));

      // Act
      const actual = await lastValueFrom(service.get(id));

      // Assert
      expect(actual).toEqual(expected);
    }
  ));

  it('should create a new product', inject(
    [ProductsService],
    async (service: ProductsService) => {
      // Arrange
      const model: ProductDto = {
        name: 'product 1',
        description: 'description 1',
        ageRestriction: 10,
        company: 'company test 1',
        price: 10,
        imageName: '',
        imageLocation: '',
      };

      http.post = jasmine
        .createSpy('post')
        .and.returnValue(defer(() => Promise.resolve(true)));

      // Act
      const actual = await lastValueFrom(service.post(model));

      // Assert
      expect(actual).toBeTrue();
    }
  ));

  it('should update a product', inject(
    [ProductsService],
    async (service: ProductsService) => {
      // Arrange
      const id = '1';
      const model: Product = {
        id: 1,
        name: 'product 1',
        description: 'description 1',
        ageRestriction: 10,
        company: 'company test 1',
        price: 10,
        imageName: '',
        imageLocation: '',
      };

      http.put = jasmine
        .createSpy('put')
        .and.returnValue(defer(() => Promise.resolve(true)));

      // Act
      const actual = await lastValueFrom(service.put(id, model));

      // Assert
      expect(actual).toBeTrue();
    }
  ));

  it('should delete a product', inject(
    [ProductsService],
    async (service: ProductsService) => {
      // Arrange
      const id = '1';

      http.delete = jasmine
        .createSpy('delete')
        .and.returnValue(defer(() => Promise.resolve(true)));

      // Act
      const actual = await lastValueFrom(service.delete(id));

      // Assert
      expect(actual).toBeTrue();
    }
  ));
});
