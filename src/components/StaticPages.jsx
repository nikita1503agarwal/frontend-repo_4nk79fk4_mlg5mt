import React from 'react';

export function AboutPage(){
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-slate-700">At LuxLiving, we believe modern spaces deserve furniture that blends comfort, quality, and timeless style.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-xl border bg-white">
          <div className="font-semibold mb-2">Brand story</div>
          <p className="text-slate-600">Born in a small studio, we’ve grown into a global brand trusted by thousands of modern homes.</p>
        </div>
        <div className="p-6 rounded-xl border bg-white">
          <div className="font-semibold mb-2">Our mission</div>
          <p className="text-slate-600">To make luxury design accessible and sustainable with responsible materials.</p>
        </div>
        <div className="p-6 rounded-xl border bg-white">
          <div className="font-semibold mb-2">Our vision</div>
          <p className="text-slate-600">A world where every home feels considered, calm, and comfortable.</p>
        </div>
      </div>
      <div className="mt-8 p-6 rounded-xl border bg-white">
        <div className="font-semibold mb-2">Why choose us</div>
        <ul className="list-disc pl-5 text-slate-600 space-y-2">
          <li>Premium materials and craftsmanship</li>
          <li>Fair pricing with direct-to-consumer model</li>
          <li>Fast, reliable delivery and friendly support</li>
        </ul>
      </div>
    </div>
  );
}

export function ContactPage(){
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={(e)=>e.preventDefault()} className="space-y-3">
          <input placeholder="Name" className="w-full px-3 py-2 border rounded-md" />
          <input placeholder="Email" type="email" className="w-full px-3 py-2 border rounded-md" />
          <textarea placeholder="Message" rows="5" className="w-full px-3 py-2 border rounded-md" />
          <button className="px-4 py-2 bg-slate-900 text-white rounded-md">Send message</button>
        </form>
        <div className="space-y-4">
          <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center text-slate-600">Google Map Placeholder</div>
          <div className="p-4 rounded-xl border bg-white text-sm">
            <div>Phone: +1 (555) 012-3456</div>
            <div>Email: hello@luxliving.com</div>
            <div>Address: 123 Skyline Ave, Suite 400, Metropolis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
