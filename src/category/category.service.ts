/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// category/category.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try {
      // Check if a category with the same name already exists
      const existingCategory = await this.prisma.category.findFirst({
        where: { name: data.name },
      });

      if (existingCategory) {
        throw new HttpException(
          {
            success: false,
            message: 'Category with this name already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      const category = await this.prisma.category.create({
        data,
        include: { partners: true },
      });

      return {
        success: true,
        message: 'Category created successfully',
        data: category,
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          success: false,
          message: 'Failed to create category',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

async findAll() {
    try {
      const categories = await this.prisma.category.findMany({
        include: { 
          partners: {
            // Bhitorer partners gulo ke creation time onujayi shajabe
            orderBy: {
              createdAt: 'asc' 
            }
          } 
        },
        // Main categories gulo ke name onujayi shajabe
        orderBy: { 
          name: 'asc' 
        },
      });

      return {
        success: true,
        message: 'Categories fetched successfully',
        data: categories,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch categories',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

async findOne(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { 
          partners: {
            // Partners gulo ke create korar serial onujayi shajabe
            orderBy: {
              createdAt: 'asc'
            }
          } 
        },
      });

      if (!category) {
        throw new HttpException(
          { success: false, message: 'Category not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        message: 'Category fetched successfully',
        data: category,
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch category',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    try {
      // Manual deleteMany dorkor nai jodi schema-te onDelete: Cascade thake
      const category = await this.prisma.category.delete({
        where: { id },
      });

      return {
        success: true,
        message: 'Category and all related partners deleted successfully',
        data: category,
      };
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete category',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, data: UpdateCategoryDto) {
    try {
      const existing = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new HttpException(
          { success: false, message: 'Category not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      // Check for duplicate name if name is being updated
      if (data.name && data.name !== existing.name) {
        const duplicate = await this.prisma.category.findFirst({
          where: { name: data.name },
        });

        if (duplicate) {
          throw new HttpException(
            {
              success: false,
              message: 'Category with this name already exists',
            },
            HttpStatus.CONFLICT,
          );
        }
      }

      const category = await this.prisma.category.update({
        where: { id },
        data,
        include: { partners: true },
      });

      return {
        success: true,
        message: 'Category updated successfully',
        data: category,
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          success: false,
          message: 'Failed to update category',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

