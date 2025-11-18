import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API = import.meta.env.VITE_BACKEND_URL || '';

function useQuery(){
  const { search } = useLocation();
  return useMemo(()=> new URLSearchParams(search), [search]);
}

export default function ProductsPage(){
  const q = useQuery();
  const [items,setItems] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [filters,setFilters] = useState({
    search: q.get('search') || '',
    category: q.get('category') || '',
    materials: '',
    price_min: '',
    price_max: '',
    rating_min: ''
  });

  const pageSize = 12;

  useEffect(()=>{ fetchData(1); // eslint-disable-next-line
  },[]);

  const buildParams = (p) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k,v])=>{ if(v) params.set(k,v); });
    params.set('page', p);
    params.set('page_size', pageSize);
    return params.toString();
  }

  const fetchData = async (p=1) => {
    setLoading(true);
    try{
      const res = await fetch(`${API}/api/products?${buildParams(p)}`);
      const data = await res.json();
      setItems(data.items||[]);
      setTotal(data.total||0);
      setPage(data.page||1);
    } finally { setLoading(false); }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop products</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <input value={filters.search} onChange={e=>setFilters({...filters, search:e.target.value})} placeholder="Search" className="w-full px-3 py-2 border rounded-md" />
          <select value={filters.category} onChange={e=>setFilters({...filters, category:e.target.value})} className="w-full px-3 py-2 border rounded-md">
            <option value="">All categories</option>
            {['Chair','Sofa','Bed','Table','Decor'].map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input value={filters.price_min} onChange={e=>setFilters({...filters, price_min:e.target.value})} placeholder="Min price" type="number" className="px-3 py-2 border rounded-md" />
            <input value={filters.price_max} onChange={e=>setFilters({...filters, price_max:e.target.value})} placeholder="Max price" type="number" className="px-3 py-2 border rounded-md" />
          </div>
          <input value={filters.materials} onChange={e=>setFilters({...filters, materials:e.target.value})} placeholder="Materials (comma)" className="w-full px-3 py-2 border rounded-md" />
          <input value={filters.rating_min} onChange={e=>setFilters({...filters, rating_min:e.target.value})} placeholder="Min rating" type="number" step="0.1" min="0" max="5" className="w-full px-3 py-2 border rounded-md" />
          <button onClick={()=>fetchData(1)} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md">Apply filters</button>
        </aside>

        <main className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-slate-600">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="flex items-center justify-center gap-2 mt-6">
                <button disabled={page<=1} onClick={()=>fetchData(page-1)} className="px-3 py-1.5 border rounded disabled:opacity-50">Prev</button>
                <span className="text-sm">Page {page} of {totalPages}</span>
                <button disabled={page>=totalPages} onClick={()=>fetchData(page+1)} className="px-3 py-1.5 border rounded disabled:opacity-50">Next</button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
