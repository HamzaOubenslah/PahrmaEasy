import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { STOCK_STATUS } from "../../constants/Pharmassist";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  fetchCategories,
  createCategory,
} from "../../store/pharmacyThunk";

const Medicines = () => {
  const dispatch = useDispatch();
  const { medicines, categories, loading, error } = useSelector((state) => state.medicine);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    status: STOCK_STATUS.NORMAL,
  });

  // Fetch medicines and categories on initial render
  useEffect(() => {
    dispatch(fetchMedicines());
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log("This Is The Categories",categories)

  const allCategories = ["All Categories", ...(categories !== undefined ? categories.map((cat) => cat.name) : [])];

  // Filter medicines based on search query and selected category
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || medicine.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      [STOCK_STATUS.NORMAL]: "bg-green-100 text-green-800",
      [STOCK_STATUS.LOW]: "bg-yellow-100 text-yellow-800",
      [STOCK_STATUS.CRITICAL]: "bg-red-100 text-red-800",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  // Handle deleting a medicine
  const handleDelete = (id) => {
    dispatch(deleteMedicine(id));
  };

  // Handle editing a medicine
  const handleEdit = (medicine) => {
    setCurrentMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category?._id || "",
      stock: medicine.stock,
      price: medicine.price,
      status: medicine.status || STOCK_STATUS.NORMAL,
    });
    setIsFormOpen(true);
  };

  // Handle opening the add new medicine form
  const handleAdd = () => {
    setCurrentMedicine(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      status: STOCK_STATUS.NORMAL,
    });
    setIsFormOpen(true);
  };

  // Handle input change in the medicine form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submitting the medicine form
  const handleSubmit = (e) => {
    e.preventDefault();

    const medicineData = {
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
      status: formData.status,
    };

    if (currentMedicine) {
      // Update existing medicine
      dispatch(updateMedicine({ medicineId: currentMedicine._id, medicineData }));
    } else {
      // Add new medicine
      dispatch(createMedicine(medicineData));
    }

    // Close form and reset state
    setIsFormOpen(false);
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      status: STOCK_STATUS.NORMAL,
    });
  };

  // Determine stock status based on stock value
  const determineStatus = (stock) => {
    const stockValue = parseInt(stock);
    if (stockValue <= 5) return STOCK_STATUS.CRITICAL;
    if (stockValue <= 15) return STOCK_STATUS.LOW;
    return STOCK_STATUS.NORMAL;
  };

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      await dispatch(createCategory({ name: newCategoryName }));
      setNewCategoryName("");
      setIsCategoryFormOpen(false);
    }
  };

  // Loading and error handling
  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6 relative mt-6">
      {/* Category Form Overlay */}
      {isCategoryFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Category</h2>
              <button onClick={() => setIsCategoryFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#037847] hover:bg-[#02673e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#037847]"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Medicine Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentMedicine ? "Edit Medicine" : "Add New Medicine"}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  required
                >
                  <option value={STOCK_STATUS.NORMAL}>Normal</option>
                  <option value={STOCK_STATUS.LOW}>Low</option>
                  <option value={STOCK_STATUS.CRITICAL}>Critical</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#037847] hover:bg-[#02673e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#037847]"
              >
                {currentMedicine ? "Update Medicine" : "Add Medicine"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Search Medicines"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          <Plus className="h-5 w-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedicines.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No medicines found</div>
        ) : (
          filteredMedicines.map((medicine) => (
            <div key={medicine._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{medicine.name}</h3>
                  <div className="text-sm text-gray-500">{medicine.category?.name}</div>
                  <div className="text-sm text-gray-500">Stock: {medicine.stock}</div>
                  <div className="text-sm text-gray-500">Price: ${medicine.price.toFixed(2)}</div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <StatusBadge status={medicine.status} />
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(medicine)} className="text-blue-500 hover:text-blue-700">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(medicine._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Medicines;
