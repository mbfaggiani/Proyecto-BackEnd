import productModel from "./models/products.schema.js";
import faker from "@faker-js/faker"

export class ProductMangerDB{

  async getProduct(queryList){
      const {query, sort} = queryList
      
      try{
          if (queryList){
              const productsParams = await productModel.paginate(query?{category: query}:{},{limit:queryList.limit || 10, page:queryList.page || 1});
              if (sort === 'asc'){
                  const productsParamas = await productModel.aggregate([
                      {
                          $sort: {price :1}
                      }
                  ])
                  return productsParamas
              }
              if (sort === 'desc'){
                  const productsParamas = await productModel.aggregate([
                      {
                          $sort: {price:-1}
                      }
                  ])
                  return productsParamas
              }
               return productsParams; 
          }
      }
      catch(err){
          throw err; 
      }
  }

  async createProduct(product) {
      try {
          const newProduct = new productModel(product);
          await newProduct.save();
          return product;
      } catch (err) {
          throw err;
      }
  }

  async updateProduct(id, product) {
      try{
          const update = await productModel.findByIdAndUpdate(id, product);
          return update;
      }
      catch (err) {
          throw err;
      }
  }

  async deleteProduct(id) {
      try {
          const deleteProd = await productModel.findByIdAndDelete(id);
          return deleteProd;
      }
      catch (err) {
          throw err;
      }
  }

  async mockingProducts() {
    const mockingProduct = [];
    for (let i = 1; i <= 100; i++) {
      const product = new productModel({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number({ min: 1, max: 100 }),
        thumbnail: faker.image.imageUrl(),
        code: `code${i}`,
        stock: faker.datatype.number({ min: 1, max: 100 })
      });
  
      mockingProduct.push(product.dto());
    }
  
    return mockingProduct;
  }
}

