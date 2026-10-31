import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OfferId } from './config/offers';
import { PDPPage } from './pages/PDPPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackerPage } from './pages/OrderTrackerPage';

export function App() {
  const [selectedOfferId, setSelectedOfferId] = useState<OfferId>('duo');

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Shopify-Style Compact Product Page (PDP) */}
        <Route
          path="/"
          element={
            <PDPPage
              selectedOfferId={selectedOfferId}
              onSelectOffer={setSelectedOfferId}
            />
          }
        />

        {/* Real-Time Order Tracking Page */}
        <Route path="/suivi" element={<OrderTrackerPage />} />

        {/* Direct Checkout Flow */}
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              selectedOfferId={selectedOfferId}
              onSelectOffer={setSelectedOfferId}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
