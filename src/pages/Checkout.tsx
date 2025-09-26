import { useCart } from '../context/CartContext'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MINIMUM_ORDER_AMOUNT = 50 // Minimum threshold in dollars

export default function Checkout() {
  const { state } = useCart()
  const navigate = useNavigate()
  const canCheckout = state.total >= MINIMUM_ORDER_AMOUNT

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

          {!canCheckout && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Minimum order amount is ${MINIMUM_ORDER_AMOUNT}. Please add more items to proceed.
                    Current total: ${state.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${state.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">$0.00</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">${state.total.toFixed(2)}</p>
              </div>
            </div>

            <button
              disabled={!canCheckout}
              className={`w-full py-3 px-4 rounded-md shadow-sm text-white text-sm font-medium 
                ${canCheckout 
                  ? 'bg-indigo-600 hover:bg-indigo-700' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {canCheckout ? 'Place Order' : `Add ${(MINIMUM_ORDER_AMOUNT - state.total).toFixed(2)} more to checkout`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
