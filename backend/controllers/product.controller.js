import Product from "../models/product.model.js";
import  redis  from '../lib/redis.js';
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); 
      res.status(200).json({ products });    
    } catch (error) {
      console.error("Error in getAllProducts controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  export const getFeaturedProducts = async (req, res) => {
    try {
      let featuredProducts = await redis.get("featured_products");
      if (featuredProducts) {
        return res.json(JSON.parse(featuredProducts));
      }
  
      // Fetch from MongoDB if not in Redis
      featuredProducts = await Product.find({ isFeatured: true }).lean();
  
      if (!featuredProducts || featuredProducts.length === 0) {
        return res.status(404).json({ message: "No featured products found" });
      }
  
      // Store in Redis for next time
      await redis.set("featured_products", JSON.stringify(featuredProducts));
  
      res.json(featuredProducts);
    } catch (error) { // ✅ catch is paired correctly with try
      console.error("Error in getFeaturedProducts controller:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

export const createProduct = async (req, res) => {
try {
    const {name, description, price, image, category} = req.body;

    let cloudinaryResponse = null
    if(image){
    cloudinaryResponse = await cloudinary.uploader.upload(image, {folder:"products"})
    }
    const product = await Product.create({
        name,
        description, 
        price,
        image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        category
    })

    res.status(201).json(product);
} catch (error) {
     console.log("Error in createProduct controller", error.message);
     res.status(500).json({ message: "Server error", error: error.message});
}
}

export const deleteProduct = async  (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0]; //this will get the if of the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleted image from from cloudinary")
            } catch (error) {
                console.log("error deleting image from cloudinary", error)
            }
        }
        await Product.findByIdAndDelete(req.params.id)

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.loh("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message})
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:3} //three diffrent product to see
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1, 
                    image:1,
                    price:1
                }
            }
        ]) 
        res.json(products)
    } catch (error) {
       console.log("Error in getRecommendedProducts controller", error.message);
       res.status(500).json({ message: "Server error", error: error.message}); 
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        console.log("Category param:", category); // ✅ Add this

        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message); // ✅ Log error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function updateFeaturedProductCache() {

    try {
        const featuredProducts = await Product.find({ idFeatured: true}).lean(); // returns plain js objects instead of full mongoose docs.
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in update cache function")
    }
}