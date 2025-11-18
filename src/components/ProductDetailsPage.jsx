import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function ProductDetailsPage(){
  const { productId } = useParams();
  const { addItem } = useCart();
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch(`${API}/api/products/${productId}`).then(r=>r.json()).then(setData).catch(()=>{});
  },[productId]);

  if(!data) return <div className="max-w-7xl mx-auto px-6 py-16 text-center text-slate-600">Loading...</div>;
  const p = data.item;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square rounded-xl overflow-hidden border bg-slate-100">
            {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />}
          </div>
          {p.images?.length>1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {p.images.slice(1).map((img,idx)=> (
                <div key={idx} className="aspect-square rounded-md overflow-hidden border bg-slate-100">
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <div className="text-slate-600 mt-1">Category: {p.category}</div>
          <div className="text-3xl font-semibold mt-3">${p.price.toFixed(2)}</div>
          <div className="mt-2 text-sm text-amber-600">Rating: {p.rating} / 5</div>
          <p className="mt-4 text-slate-700 whitespace-pre-line">{p.description}</p>
          {p.materials?.length>0 && <div className="mt-4 text-sm">Materials: {p.materials.join(', ')}</div>}
          <button onClick={()=>addItem(p,1)} className="mt-6 px-5 py-3 bg-slate-900 text-white rounded-md">Add to cart</button>

          {data.related?.length>0 && (
            <div className="mt-10">
              <h3 className="font-semibold mb-3">Related products</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.related.map(r => (
                  <a key={r.id} href={`/products/${r.id}`} className="rounded-lg overflow-hidden border bg-white">
                    <div className="aspect-square bg-slate-100">
                      {r.images?.[0] && <img src={r.images[0]} alt={r.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-2 text-sm">
                      <div className="font-medium line-clamp-1">{r.title}</div>
                      <div className="text-slate-600">${r.price.toFixed(2)}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
