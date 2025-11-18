import React from 'react';
import { useCart } from './CartContext';

export default function CartPage(){
  const { items, removeItem, updateQty, totals } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Your cart</h1>
      {items.length===0 ? (
        <div className="text-slate-600">Your cart is empty.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map(i => (
              <div key={i.id} className="flex items-center gap-4 p-4 border rounded-xl bg-white">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
                  {i.image && <img src={i.image} alt={i.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-slate-600 text-sm">${i.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>updateQty(i.id, i.quantity-1)} className="px-3 py-1.5 border rounded">-</button>
                  <input value={i.quantity} onChange={e=>updateQty(i.id, parseInt(e.target.value||'1',10))} className="w-14 text-center border rounded py-1.5" />
                  <button onClick={()=>updateQty(i.id, i.quantity+1)} className="px-3 py-1.5 border rounded">+</button>
                </div>
                <div className="w-20 text-right font-semibold">${(i.price*i.quantity).toFixed(2)}</div>
                <button onClick={()=>removeItem(i.id)} className="text-red-600 text-sm">Remove</button>
              </div>
            ))}
          </div>
          <div className="p-5 border rounded-xl bg-white h-fit">
            <div className="flex justify-between mb-2"><span className="text-slate-600">Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between mb-2"><span className="text-slate-600">Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
            <div className="flex justify-between text-lg font-semibold border-t pt-3"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
            <a href="/checkout" className="mt-4 block text-center px-4 py-2 bg-slate-900 text-white rounded-md">Checkout</a>
          </div>
        </div>
      )}
    </div>
  );
}
