"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


type ProductForm = {
  name: string;
  price: string;
  brand: string;
  desc: string;
  size: string[];
  color: string[];
  image: string | File;
};

export default function EditProduct() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: "",
    brand: "",
    desc: "",
    size: [],
    color: [],
    image: "",
  });


  const [loading, setLoading] = useState(true);

  // const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4002/api/v1/products/${id}`);
        const result = await res.json();

        console.log("RESULT:", result);

        if (result.success) {
          const product = result.data;

          setFormData({
            name: product.name || "",
            price: product.price || "",
            brand: product.brand || "",
            desc: product.desc || "",
            size: product.size || [],
            color: product.color || [],
            image: product.image || "",
          });

          setImagePreview(product.image || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // useEffect(() => {
  //   if (!id) return;

  //   fetch(`http://localhost:4002/api/v1/products/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.success) {
  //         setFormData(data.data);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`http://localhost:4002/api/v1/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="h-10 w-10 border-4 bg-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (

    <div className="min-h-screen flex items-center display-flex justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
      {/* <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        /> */}
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-8 transition-all duration-500">

        <h1 className="mt-10 text-3xl font-bold text-gray-800 mb-8">
          ✏️ Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <label className="text-sm text-gray-600">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm text-gray-600">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-md"
            >
              Update Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Navbar from "../../../../compo/Navbar";

// export default function EditProduct() {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     desc: "",
//     brand: "",
//     size: [] as string[],
//     color: [] as string[],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     fetch(`http://localhost:4002/api/v1/product/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success && data.data) {
//           setFormData({
//             name: data.data.name,
//             price: data.data.price,
//             desc: data.data.desc,
//             brand: data.data.brand || "",
//             size: data.data.size || [],
//             color: data.data.color || [],
//           });
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCheckboxChange = (e: any, type: "size" | "color") => {
//     const { value, checked } = e.target;
//     let updated = [...formData[type]];

//     if (checked) updated.push(value);
//     else updated = updated.filter((item) => item !== value);

//     setFormData({ ...formData, [type]: updated });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         `http://localhost:3009/api/v1/products/edit/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         alert("Product Updated!");
//         router.push("/");
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen pb-10">
//       {/* <Navbar /> */}

//       <div className="max-w-2xl mx-auto mt-8 px-4">
//         <div className="bg-white shadow-md rounded-lg">
//           <div className="p-8">
//             <h2 className="text-2xl font-semibold text-center mb-6">
//               Edit Product
//             </h2>

//             <form onSubmit={handleSubmit}>
//               {/* Product Name */}
//               <div className="mb-5">
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                 />
//               </div>

//               {/* Price */}
//               <div className="mb-5">
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Price *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                 />
//               </div>

//               {/* Size */}
//               <div className="mb-5">
//                 <p className="font-semibold mb-2">Size:</p>
//                 <div className="flex gap-4 flex-wrap">
//                   {["S", "M", "L", "XL", "XXL"].map((s) => (
//                     <label key={s} className="flex items-center gap-1">
//                       <input
//                         type="checkbox"
//                         value={s}
//                         checked={formData.size.includes(s)}
//                         onChange={(e) =>
//                           handleCheckboxChange(e, "size")
//                         }
//                         className="accent-emerald-600"
//                       />
//                       <span>{s}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Color */}
//               <div className="mb-5">
//                 <p className="font-semibold mb-2">Color:</p>
//                 <div className="flex gap-4 flex-wrap">
//                   {["white", "purple", "blue", "black"].map((c) => (
//                     <label key={c} className="flex items-center gap-1 capitalize">
//                       <input
//                         type="checkbox"
//                         value={c}
//                         checked={formData.color.includes(c)}
//                         onChange={(e) =>
//                           handleCheckboxChange(e, "color")
//                         }
//                         className="accent-emerald-600"
//                       />
//                       <span>{c}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Brand */}
//               <div className="mb-5">
//                 <label className="font-semibold block mb-2">
//                   Brand:
//                 </label>
//                 <select
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                 >
//                   <option value="">Select Brand</option>
//                   <option value="Levi's">Levi's</option>
//                   <option value="H&M">H&M</option>
//                   <option value="Zara">Zara</option>
//                   <option value="Nike">Nike</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="mb-6">
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Product Description *
//                 </label>
//                 <textarea
//                   rows={3}
//                   name="desc"
//                   value={formData.desc}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                 />
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="w-full bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-800 transition"
//               >
//                 UPDATE
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
