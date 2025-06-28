import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, FilterX, CheckCircle, XCircle, Loader2, Truck } from "lucide-react";
import { 
  fetchPharmacyOrders, 
  updateOrderStatus 
} from "../../store/pharmacyThunk/pharmacyThunk";
import { ORDER_STATUS } from '../../constants/Pharmassist';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.pharmacy);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusUpdating, setStatusUpdating] = useState({});

  useEffect(() => {
    dispatch(fetchPharmacyOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order._id.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(prev => ({ ...prev, [orderId]: true }));
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      dispatch(fetchPharmacyOrders());
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setStatusUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      [ORDER_STATUS.pending]: "bg-yellow-100 text-yellow-800",
      [ORDER_STATUS.shipped]: "bg-blue-100 text-blue-800",
      [ORDER_STATUS.delivered]: "bg-green-100 text-green-800",
      [ORDER_STATUS.cancelled]: "bg-red-100 text-red-800",
    };
    
    const statusIcons = {
      [ORDER_STATUS.pending]: <Loader2 className="h-3 w-3 mr-1 animate-spin" />,
      [ORDER_STATUS.shipped]: <Truck className="h-3 w-3 mr-1" />,
      [ORDER_STATUS.delivered]: <CheckCircle className="h-3 w-3 mr-1" />,
      [ORDER_STATUS.cancelled]: <XCircle className="h-3 w-3 mr-1" />,
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && !orders.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading orders: {error.message || "Unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="text-sm text-gray-500">
          {orders.length} total orders • {filteredOrders.length} filtered
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            placeholder="Search by customer name or order ID..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value={ORDER_STATUS.pending}>Pending</option>
          <option value={ORDER_STATUS.shipped}>Shipped</option>
          <option value={ORDER_STATUS.delivered}>Delivered</option>
          <option value={ORDER_STATUS.cancelled}>Cancelled</option>
        </select>
        
        {(searchQuery || statusFilter !== "all") && (
          <button 
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FilterX className="h-4 w-4 mr-2" />
            Clear Filters
          </button>
        )}
      </div>
      
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{order.customer?.name || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{order.customer?.email || ''}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      {order.orderItems?.slice(0, 2).map((item, index) => (
                        <div key={index}>
                          {item.medicine?.name || 'Unknown'} ×{item.quantity}
                        </div>
                      ))}
                      {order.orderItems?.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{order.orderItems.length - 2} more items
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(order.updatedAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    €{order.totalPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {order.status === ORDER_STATUS.pending && (
                      <>
                        <button
                          onClick={() => handleStatusChange(order._id, ORDER_STATUS.shipped)}
                          disabled={statusUpdating[order._id]}
                          className="inline-flex items-center px-3 py-1 border border-green-200 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          {statusUpdating[order._id] ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleStatusChange(order._id, ORDER_STATUS.cancelled)}
                          disabled={statusUpdating[order._id]}
                          className="inline-flex items-center px-3 py-1 border border-red-200 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          {statusUpdating[order._id] ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </>
                          )}
                        </button>
                      </>
                    )}
                    {order.status === ORDER_STATUS.shipped && (
                      <button
                        onClick={() => handleStatusChange(order._id, ORDER_STATUS.delivered)}
                        disabled={statusUpdating[order._id]}
                        className="inline-flex items-center px-3 py-1 border border-blue-200 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {statusUpdating[order._id] ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <>
                            <Truck className="h-4 w-4 mr-1" />
                            Mark Delivered
                          </>
                        )}
                      </button>
                    )}
                    {order.status === ORDER_STATUS.delivered && (
                      <span className="text-xs text-gray-500">Completed</span>
                    )}
                    {order.status === ORDER_STATUS.cancelled && (
                      <span className="text-xs text-gray-500">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;