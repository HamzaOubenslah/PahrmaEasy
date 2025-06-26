import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { MEDICINES, MEDICINE_CATEGORIES, STOCK_STATUS } from "../../constants/Pharmassist";

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [medicines, setMedicines] = useState(MEDICINES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    status: STOCK_STATUS.NORMAL
  });

  const allCategories = ["All Categories", ...Object.values(MEDICINE_CATEGORIES)];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || medicine.category === selectedCategory;
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
  console.log(medicines);
  
  const handleDelete = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  const handleEdit = (medicine) => {
    setCurrentMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      stock: medicine.stock,
      price: medicine.price,
      status: medicine.status
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setCurrentMedicine(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      status: STOCK_STATUS.NORMAL
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentMedicine) {
      // Update existing medicine
      setMedicines(medicines.map(medicine => 
        medicine.id === currentMedicine.id ? { ...medicine, ...formData } : medicine
      ));
    } else {
      // Add new medicine
      const newMedicine = {
        id: `med00${medicines.length + 1}`,
        ...formData,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price)
      };
      setMedicines([...medicines, newMedicine]);
    }
    
    setIsFormOpen(false);
  };

  const determineStatus = (stock) => {
    const stockValue = parseInt(stock);
    if (stockValue <= 5) return STOCK_STATUS.CRITICAL;
    if (stockValue <= 15) return STOCK_STATUS.LOW;
    return STOCK_STATUS.NORMAL;
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md ">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-xl font-bold">
                {currentMedicine ? "Edit Medicine" : "Add New Medicine"}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
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
                  {Object.values(MEDICINE_CATEGORIES).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData(prev => ({
                      ...prev,
                      status: determineStatus(e.target.value)
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#037847] focus:border-[#037847]"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="mt-1">
                  <StatusBadge status={formData.status} />
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#037847] hover:bg-[#02673e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#037847]"
                >
                  {currentMedicine ? "Update Medicine" : "Add Medicine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isFormOpen ? "opacity-10 pointer-events-none" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Medicines Management</h1>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-[#037847] text-white rounded-md shadow-sm transition-colors hover:bg-[#02673e] focus:outline-none focus:ring-2 focus:ring-[#037847] focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Medicine
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              placeholder="Search medicines..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#037847] focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#037847] focus:border-green-500"
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Medicines Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {medicine.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={medicine.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    €{medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#037847]"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Medicines;