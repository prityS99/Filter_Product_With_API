const Products = require("../models/products");

class ProductsApiController {
  async createProduct(req, res) {
    console.log(req.body);
    try {
      const { name, size, color, image, brand, price } = req.body;
      const data = new Products({
        name,
        size,
        color,
        image,
        brand,
        price,
      });
      const products = await data.save();

      return res.status(201).json({
        success: true,
        message: "Products created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const data = await Products.find();

      return res.status(201).json({
        success: true,
        message: "Product List",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getEditProduct(req, res) {
    try {
      const id = req.params.id;
      const data = await Products.findById(id);
      return res.status(200).json({
        success: true,
        message: "Get product",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product id is required",
        });
      }

      const data = await Products.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "Products updated successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const data = await Products.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
        { new: true },
      );

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async searchProducts(req, res) {
    try {
      const { search, size, color, minPrice, maxPrice, brand } = req.query;
      let query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { desc: { $regex: search, $options: "i" } },
        ];
      }
      if (size) {
        const sizeArray = Array.isArray(size) ? size : size.split(",");
        query.size = { $in: sizeArray };
      }
      if (color) {
        const colorArray = Array.isArray(color) ? color : color.split(",");
        query.color = { $in: colorArray };
      }
      if (brand) {
        const brandArray = Array.isArray(brand) ? brand : brand.split(",");
        query.brand = { $in: brandArray };
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      const products = await ProductModel.find(query);

      return res.status(200).json({
        success: true,
        message: "Filtered products fetched successfully",
        count: products.length,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async filterProduct(req, res) {
  try {
    const {
      name,
      sizes,      
      colors,     
      brands,     
      minPrice,
      maxPrice,
      page = 1,
      limit = 12
    } = req.query;

    let filter = {};

  
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (sizes) {
      const sizeArray = Array.isArray(sizes) ? sizes : sizes.split(',');
      filter.size = { $in: sizeArray };
    }

    if (colors) {
      const colorArray = Array.isArray(colors) ? colors : colors.split(',');
      filter.color = { $in: colorArray };
    }

    if (brands) {
      const brandArray = Array.isArray(brands) ? brands : brands.split(',');
      filter.brand = { $in: brandArray };
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Products.find(filter)
      .sort({ createdAt: -1 })  
      .limit(Number(limit))
      .skip(skip)
      .lean();  

    const total = await Products.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error('Filter error:', error);
    return res.status(500).json({
      success: false,
      message: "Server error during filtering"
    });
  }
}


async restoreProducts(req, res) {
  try {
    const id = req.params.id;

    const data = await Products.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product restored successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


}

module.exports = new ProductsApiController();
