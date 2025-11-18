import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function HomePage() {
  const [top, setTop] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/products/top-selling`).then(r=>r.json()).then(d=>setTop(d.items||[])).catch(()=>{});
    fetch(`${API}/api/products/new-arrivals`).then(r=>r.json()).then(d=>setNewArrivals(d.items||[])).catch(()=>{});
    fetch(`${API}/api/testimonials`).then(r=>r.json()).then(d=>setTestimonials(d.items||[])).catch(()=>{});
  }, []);

  return (
    <div>
      {/* Hero with Spline background */}
      <section className="relative h-[70vh] overflow-hidden">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">Modern Furniture for Urban Living</h1>
            <p className="mt-4 text-slate-700 text-lg">Elevate your space with luxurious, contemporary pieces crafted for comfort.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link to="/products" className="px-5 py-3 bg-slate-900 text-white rounded-md">Shop Now</Link>
              <a href="#categories" className="px-5 py-3 bg-white border rounded-md">Explore Categories</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {['Chair','Sofa','Bed','Table','Decor'].map(cat=> (
            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="group relative rounded-xl overflow-hidden border bg-white">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="absolute inset-0 flex items-end p-3">
                <span className="px-2 py-1 bg-white rounded-md text-sm font-medium group-hover:bg-slate-900 group-hover:text-white transition">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top-selling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Top-selling products</h2>
          <Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">View all</Link>
        </div>
        <ProductGrid items={top} />
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">New arrivals</h2>
          <Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">View all</Link>
        </div>
        <ProductGrid items={newArrivals} />
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6">What our customers say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t,idx)=> (
              <div key={idx} className="p-6 rounded-xl border bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="font-semibold">{t.name}</div>
                </div>
                <div className="text-slate-700">{t.message}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h3 className="text-2xl font-bold">Stay in the loop</h3>
        <p className="text-slate-600 mt-2">Get new drops, exclusive offers and interior inspo.</p>
        <form onSubmit={(e)=>e.preventDefault()} className="mt-6 flex gap-2 justify-center">
          <input className="w-72 max-w-full px-4 py-3 border rounded-md" placeholder="Enter your email" />
          <button className="px-5 py-3 bg-slate-900 text-white rounded-md">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

function ProductGrid({ items }){
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(p => (
        <Link to={`/products/${p.id}`} key={p.id} className="group rounded-xl overflow-hidden border bg-white">
          <div className="aspect-square bg-slate-100">
            {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />}
          </div>
          <div className="p-3">
            <div className="font-medium line-clamp-1">{p.title}</div>
            <div className="text-slate-600 text-sm">${p.price.toFixed(2)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
