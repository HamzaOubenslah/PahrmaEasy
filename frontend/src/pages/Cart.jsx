import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  addCart,
  removeMedicineFromCart,
  clearCart,
  updateItemInCart,
} from "../store/cartThunk/cartThunk";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading, error, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleAddQuantity = (medicineId) =>
    dispatch(addCart({ medicineId, quantity: 1 }));
  const handleRemoveQuantity = (medicineId) =>
    dispatch(removeMedicineFromCart({ medicineId }));
  const handleClearCart = () => dispatch(clearCart());

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
          Error loading cart: {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        {items.length > 0 && (
          <Button
            variant="ghost"
            onClick={handleClearCart}
            className="text-red-500 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Browse our collection and find something you like
          </p>
          <Link to="/medicines">
            <Button className="gap-2">
              Shop Medicines
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.medicine._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.medicine.image || "/medicine-placeholder.jpg"}
                      alt={item.medicine.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.medicine.name}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          {item.medicine.description?.substring(0, 60)}...
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.medicine.price} DH
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:bg-gray-100 rounded-r-none"
                          onClick={() =>
                            dispatch(
                              updateItemInCart({
                                medicineId: item.medicine._id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="px-4 text-gray-900">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:bg-gray-100 rounded-l-none"
                          onClick={() =>
                            dispatch(
                              updateItemInCart({
                                medicineId: item.medicine._id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleRemoveQuantity(item.medicine._id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">
                    {totalPrice.toFixed(2)} DH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} DH</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-8 h-12 text-lg" size="lg">
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center text-sm text-gray-500">
                or{" "}
                <Link to="/medicines" className="text-primary hover:underline">
                  continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
