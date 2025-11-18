import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from './CartContext';

export default function Layout() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 rounded-md hover:bg-slate-100">
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="font-extrabold text-xl">LuxLiving</Link>
              <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm">
                <NavLink to="/" className={({isActive})=>`hover:text-slate-900 ${isActive? 'text-slate-900' : 'text-slate-600'}`}>Home</NavLink>
                <NavLink to="/products" className={({isActive})=>`hover:text-slate-900 ${isActive? 'text-slate-900' : 'text-slate-600'}`}>Shop</NavLink>
                <NavLink to="/about" className={({isActive})=>`hover:text-slate-900 ${isActive? 'text-slate-900' : 'text-slate-600'}`}>About</NavLink>
                <NavLink to="/contact" className={({isActive})=>`hover:text-slate-900 ${isActive? 'text-slate-900' : 'text-slate-600'}`}>Contact</NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100">
                <Search className="w-4 h-4 text-slate-500" />
                <input placeholder="Search products" className="bg-transparent outline-none text-sm w-56" />
              </div>
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-slate-100">
                <ShoppingCart className="w-5 h-5" />
                {count>0 && <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full px-1.5 py-0.5">{count}</span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="mt-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8 text-sm text-slate-600">
          <div>
            <div className="font-bold text-slate-900 mb-3">LuxLiving</div>
            <p>Modern furniture for contemporary spaces. Crafted with quality and comfort in mind.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-3">Company</div>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-slate-900">About</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-3">Newsletter</div>
            <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
              <input placeholder="Enter your email" className="flex-1 px-3 py-2 border rounded-md" />
              <button className="px-4 py-2 bg-slate-900 text-white rounded-md">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
