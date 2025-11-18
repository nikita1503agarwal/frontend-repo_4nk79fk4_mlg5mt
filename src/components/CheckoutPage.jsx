import React, { useState } from 'react';
import { useCart } from './CartContext';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function CheckoutPage(){
  const { items, clear, totals } = useCart();
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', payment_method:'COD' });
  const [status, setStatus] = useState(null);

  const placeOrder = async (e) => {
    e.preventDefault();
    if(items.length===0) return;
    setStatus('placing');
    try{
      const res = await fetch(`${API}/api/orders`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ customer: { name: form.name, email: form.email, phone: form.phone, address: form.address }, items: items.map(i=>({ product_id: i.id, title: i.title, price: i.price, quantity: i.quantity, image: i.image })), payment_method: form.payment_method })
      });
      const data = await res.json();
      if(res.ok){
        clear();
        setStatus(`Order placed. ID: ${data.id}`);
      } else {
        setStatus(data.detail || 'Failed to place order');
      }
    } catch(err){ setStatus('Network error'); }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" className="px-3 py-2 border rounded-md" required />
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="px-3 py-2 border rounded-md" required />
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="px-3 py-2 border rounded-md" />
            <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Address" className="px-3 py-2 border rounded-md sm:col-span-2" required />
          </div>

          <div>
            <div className="font-semibold mb-2">Payment options</div>
            <div className="flex flex-wrap gap-3 text-sm">
              {['COD','Stripe','SSLCommerz'].map(p => (
                <label key={p} className={`px-3 py-2 border rounded-md cursor-pointer ${form.payment_method===p ? 'bg-slate-900 text-white' : ''}`}>
                  <input type="radio" className="hidden" name="payment" checked={form.payment_method===p} onChange={()=>setForm({...form, payment_method:p})} />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border rounded-xl bg-white h-fit">
          <div className="mb-3 font-semibold">Order summary</div>
          <div className="space-y-2 text-sm">
            {items.map(i => (
              <div key={i.id} className="flex justify-between"><span>{i.title} × {i.quantity}</span><span>${(i.price*i.quantity).toFixed(2)}</span></div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-slate-600"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-semibold border-t pt-3 mt-2"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
          <button disabled={items.length===0 || status==='placing'} className="mt-4 w-full px-4 py-2 bg-slate-900 text-white rounded-md">Place order</button>
          {status && <div className="mt-3 text-sm text-slate-700">{status}</div>}
        </div>
      </form>
    </div>
  );
}
