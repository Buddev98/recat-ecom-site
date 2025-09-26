import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart()
  const navigate = useNavigate()

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
      return
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="ml-2 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-sm">
                {state.items.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500">Start shopping to add items to your cart</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-4 border-b last:border-b-0 animate-fadeIn"
                >
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-indigo-600 font-medium">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 min-w-[2rem] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t p-4 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-indigo-600">${state.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              disabled={state.items.length === 0}
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
