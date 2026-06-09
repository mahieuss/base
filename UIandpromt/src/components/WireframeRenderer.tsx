/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, User, Check, CheckCircle2, 
  ArrowLeft, ArrowRight, Star, Share2, HelpCircle, 
  ShieldCheck, Mail, AlertCircle, ShoppingBag, Percent,
  ChevronRight, Sparkles, Clock, Calendar, 
  X, FileText, Trash2, Camera, Heart, Activity,
  MessageCircle, Send, Sliders, Phone, Wallet, CreditCard, Award
} from 'lucide-react';
import { WireframeScreen, BreakpointId } from '../types';

interface WireframeRendererProps {
  screen: WireframeScreen;
  breakpoint: BreakpointId;
  showGrid: boolean;
  showPins: boolean;
  activePinId: number | null;
  onPinClick: (pinId: number) => void;
  isComparative?: boolean;
}

export function WireframePlaceholder({ 
  className = '', 
  children = null,
  text = '' 
}: { 
  className?: string; 
  children?: React.ReactNode;
  text?: string;
}) {
  return (
    <div className={`relative bg-neutral-50 border border-dashed border-neutral-300 overflow-hidden flex items-center justify-center select-none ${className}`}>
      <svg className="absolute inset-0 w-full h-full text-neutral-200" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
        {text && <span className="font-mono text-[9px] text-neutral-400 font-medium uppercase tracking-wider">{text}</span>}
        {children}
      </div>
    </div>
  );
}

export default function WireframeRenderer({
  screen,
  breakpoint,
  showGrid,
  showPins,
  activePinId,
  onPinClick,
  isComparative = false,
}: WireframeRendererProps) {
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isDesktop = breakpoint === 'desktop';

  // --- E-COMMERCE INTERACTIVE PROTOTYPING STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Interactivity States for Vietnam User Requests
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<string[]>(['Ultra Slim Tech 2', 'Ultra Slim Tech 3']);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Hello! Welcome to the RETAIL_SG Support Hub. We offer 2-hour express delivery across Singapore. How can we serve you today?', time: 'Just now' }
  ]);

  // --- STORE LOCATOR STATES ---
  const [selectedDistance, setSelectedDistance] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedMall, setSelectedMall] = useState<string>('all');
  const [activeStoreId, setActiveStoreId] = useState<number>(1);

  // --- WISHLIST STATES ---
  const [wishlistProducts, setWishlistProducts] = useState([
    { name: 'AERO-X Pro Wireless Headphones', price: 499.00, rating: 4.8, reviews: 1240, status: 'in_stock', type: 'HEADPHONES' },
    { name: 'High-Performance Speed Mouse X', price: 129.00, rating: 4.6, reviews: 450, status: 'low_stock', type: 'SPEED MOUSE' },
    { name: 'Ultra Pro Laptop Sleek Case (14-inch)', price: 89.00, rating: 4.5, reviews: 180, status: 'out_stock', type: 'LAPTOP SLEEVE' },
    { name: 'Ergonomic Workspace Office Desk Cushion', price: 59.50, rating: 4.7, reviews: 230, status: 'in_stock', type: 'DESK CUSHION' }
  ]);

  // --- PROFILE STATES ---
  const [activeOrderStatusFilter, setActiveOrderStatusFilter] = useState<string>('all');

  // --- AUTH PORTAL STATES ---
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [authEmail, setAuthEmail] = useState('GiaHanHoang2001@gmail.com');
  const [authPassword, setAuthPassword] = useState('MySecurePass123!');
  const [authName, setAuthName] = useState('Hoang Gia Han');
  const [authPhone, setAuthPhone] = useState('8765 4321');
  const [tempEmail, setTempEmail] = useState('GiaHanHoang2001@gmail.com');
  const [tempPassword, setTempPassword] = useState('MySecurePass123!');
  const [tempName, setTempName] = useState('Hoang Gia Han');
  const [tempPhone, setTempPhone] = useState('8765 4321');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authOtpCode, setAuthOtpCode] = useState('');
  const [authOtpSent, setAuthOtpSent] = useState(false);
  const [authOtpTimer, setAuthOtpTimer] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState<number>(3); // 1 = weak, 2 = medium, 3 = strong

  // --- QUICK VIEW STATES ---
  const [quickViewProduct, setQuickViewProduct] = useState<{
    name: string;
    price: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
    variants: string[];
  } | null>(null);
  const [selectedQuickViewVariant, setSelectedQuickViewVariant] = useState<string>('');

  // --- PRODUCT DETAIL STATES ---
  const [selectedProductColor, setSelectedProductColor] = useState<string>('Noir Edition (Default)');
  const [selectedProductCushion, setSelectedProductCushion] = useState<string>('Standard Over-Ear');

  const openQuickView = (name: string, price: number, status: 'in_stock' | 'low_stock' | 'out_of_stock', variants: string[]) => {
    setQuickViewProduct({ name, price, status, variants });
    setSelectedQuickViewVariant(variants[0] || '');
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Ultra-Quiet Mechanical Keyboard', details: 'Space Grey / Optical Switches', price: 189.00, qty: 1, imgText: 'KEYBOARD' },
    { id: '2', name: 'Ergonomic Vertical Mouse', details: 'Wireless / Matte Finish', price: 124.00, qty: 2, imgText: 'MOUSE' },
    { id: '3', name: 'Recycled Leather Laptop Sleeve', details: '14-inch / Obsidian Black', price: 59.00, qty: 1, isSoldOut: true, imgText: 'SLEEVE' }
  ]);
  const [appliedVoucher, setAppliedVoucher] = useState<'FIRST10' | null>('FIRST10');
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [voucherError, setVoucherError] = useState<string | null>(null);

  // Filter conditions search
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['TechPro SG']);
  const [priceMinInput, setPriceMinInput] = useState('50');
  const [priceMaxInput, setPriceMaxInput] = useState('1500');
  const [ratingTerm, setRatingTerm] = useState(5);

  // Refund parameters
  const [refundReason, setRefundReason] = useState('Defective product');
  const [refundNotes, setRefundNotes] = useState('');
  const [refundPhotos, setRefundPhotos] = useState<string[]>(['defect_housing.png']);
  const [refundMethodOption, setRefundMethodOption] = useState<'original' | 'store'>('original');

  // Rating and feedback
  const [ratingSentiment, setRatingSentiment] = useState(5);
  const [ratingQualityValue, setRatingQualityValue] = useState(5);
  const [reviewNoteText, setReviewNoteText] = useState('');
  const [reviewAnonymity, setReviewAnonymity] = useState(true);
  const [uploadedReviewPhotos, setUploadedReviewPhotos] = useState<string[]>([]);

  // Cancellation parameters
  const [cancelReasonVal, setCancelReasonVal] = useState('I changed my mind about the purchase');
  const [cancelNotes, setCancelNotes] = useState('');

  // Checkout choices
  const [delivSpeed, setDelivSpeed] = useState<'standard' | 'collect'>('standard');
  const [payGateway, setPayGateway] = useState<'paynow' | 'visa' | 'mastercard'>('paynow');

  // Next-day timeline countdown simulation
  const [countdownString, setCountdownString] = useState('04:22:10');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownString(prev => {
        const parts = prev.split(':').map(Number);
        let [h, m, s] = parts;
        s--;
        if (s < 0) {
          s = 59;
          m--;
          if (m < 0) {
            m = 59;
            h--;
            if (h < 0) {
              h = 4;
              m = 22;
              s = 10;
            }
          }
        }
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (authOtpTimer > 0) {
      const interval = setInterval(() => {
        setAuthOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [authOtpTimer]);

  // --- CALCULATOR TOTALS ---
  const activeCartItems = cartItems.filter(item => !item.isSoldOut);
  const getSubtotalAmount = () => {
    return activeCartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };
  const getVoucherDiscountRatio = () => {
    return appliedVoucher === 'FIRST10' ? 0.10 : 0.00;
  };
  const getDiscountAmount = () => {
    return getSubtotalAmount() * getVoucherDiscountRatio();
  };
  const getGstAmount = () => {
    const activeSub = getSubtotalAmount() - getDiscountAmount();
    return activeSub * 0.09;
  };
  const getGrandTotalOrderValue = () => {
    return getSubtotalAmount() - getDiscountAmount() + getGstAmount();
  };
  const cartItemsCount = activeCartItems.reduce((sum, i) => sum + i.qty, 0);

  // Helper additions
  const addAccessoryToCart = (name: string, price: number, imgText: string) => {
    setCartItems(prev => {
      const match = prev.find(item => item.name === name);
      if (match) {
        return prev.map(item => item.name === name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: Date.now().toString(), name, details: 'Office Accessory Upgrade', price, qty: 1, imgText }];
    });
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const adjustQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.qty + delta);
        return { ...item, qty: nextQty };
      }
      return item;
    }));
  };

  // --- GENERAL STATIC LAYOUTS MODULES ---
  const renderTopNotificationRibbon = () => (
    <div className="bg-[#09090B] font-mono text-white py-1 px-4 text-[10px] uppercase font-bold text-center border-b border-zinc-800 select-none flex justify-between items-center tracking-tight">
      <span className="flex items-center gap-1">
        <Sparkles size={11} className="text-[#E11D48] animate-pulse" />
        Singapore National Day Special Sale: Up to 58% Off
      </span>
      {!isMobile && (
        <div className="flex gap-4 text-[9px] text-zinc-500">
          <span>SECURE ENCRYPTED CHECKOUTS ACTIVE</span>
          <span>SUPPORT: 1800 1234 (SGP-ZONE)</span>
        </div>
      )}
    </div>
  );

  const renderGlobalHeader = () => (
    <header className="border-b border-zinc-200 bg-white px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 select-none col-span-12">
      <div className="flex items-center justify-between sm:justify-start gap-4">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} className="text-zinc-950 stroke-[2.5]" />
          <span className="font-mono text-base font-black tracking-tighter text-zinc-950 uppercase">RETAIL_SG</span>
          <span className="text-[8px] font-mono px-1 py-0.2 bg-zinc-100 text-zinc-650 rounded">SGP-OUTLET</span>
        </div>
        
        {/* Help indicators */}
        {!isMobile && !isTablet && (
          <nav className="flex items-center gap-4 text-[10.5px] font-mono font-bold uppercase text-zinc-500 ml-4">
            <span className="hover:text-zinc-900 cursor-pointer">Electronics</span>
            <span className="hover:text-zinc-900 cursor-pointer">Fashion</span>
            <span className="hover:text-zinc-900 cursor-pointer font-extrabold text-[#E11D48] hover:text-[#E11D48]">Sale</span>
          </nav>
        )}
      </div>

      {/* SEARCH BAR (Bổ sung thanh tìm kiếm sản phẩm) */}
      <div className="flex-1 max-w-sm sm:max-w-md relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
          <Search size={13} />
        </span>
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-100 border border-zinc-200 rounded-md py-1 px-8 text-xs font-sans focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-850"
          >
            <X size={11} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        {!isMobile && (
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-zinc-500">
            <MapPin size={11} className="text-zinc-400" strokeWidth={2.5} />
            <span>Singapore Hub</span>
          </div>
        )}

        {/* WISHLIST BUTTON (Bổ sung wishlist dưới dạng icon button) */}
        <button 
          onClick={() => setShowWishlistModal(prev => !prev)}
          className={`p-1.5 text-zinc-700 hover:text-[#E11D48] hover:bg-zinc-50 rounded-full transition-colors relative cursor-pointer ${showWishlistModal ? 'bg-zinc-100 text-[#E11D48]' : ''}`}
          title="Yêu thích (Wishlist)"
        >
          <Heart size={16} className={likedProducts.length > 0 ? "fill-[#E11D48] text-[#E11D48]" : ""} />
          {likedProducts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E11D48] text-white rounded-full w-4 h-4 text-[8px] font-mono font-bold flex items-center justify-center border border-white">
              {likedProducts.length}
            </span>
          )}
        </button>

        {/* PROFILE BUTTON (Bổ sung profile dưới dạng icon button) */}
        <button 
          onClick={() => setShowProfileModal(prev => !prev)}
          className={`p-1.5 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 rounded-full transition-colors cursor-pointer ${showProfileModal ? 'bg-zinc-100' : ''}`}
          title="Tài khoản cá nhân"
        >
          <User size={16} />
        </button>

        <div className="relative">
          <ShoppingBag size={16} className="text-zinc-950 stroke-[2]" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#E11D48] text-white rounded-full w-4 h-4 text-[9px] font-mono font-bold flex items-center justify-center">
            {cartItemsCount}
          </span>
        </div>
      </div>
    </header>
  );

  const renderGlobalFooter = () => (
    <footer className="border-t border-zinc-200 bg-[#F4F4F5] px-6 py-6 font-mono text-[9px] text-zinc-400 select-none grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <p className="font-bold text-zinc-900 uppercase tracking-widest mb-1.5 font-sans">RETAIL_SG BRANDING</p>
        <p className="leading-relaxed">Singapore's premium destination for trusted tech brands and everyday essentials. Secure SSL checkout encryption active.</p>
        <p className="mt-2 text-zinc-500">Support Hotline: 1800 1234 (SGP-ZONE)</p>
      </div>
      <div>
        <p className="font-bold text-zinc-900 uppercase tracking-widest mb-1.5 font-sans">SECURE ESCROW GUARANTEES</p>
        <p className="leading-relaxed">Complimentary return replacements processed free of charge. Full NinjaVan drop-off logistics synchronization active.</p>
      </div>
      <div className="text-left md:text-right flex flex-col md:items-end justify-between">
        <span className="bg-zinc-200 text-zinc-800 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase">
          RETAIL_SG PROTOCOL ACTIVE
        </span>
        <p className="mt-2 leading-relaxed">© 2026 RETAIL_SG Ltd. Singapore Marketplace Platform.</p>
      </div>
    </footer>
  );

  // --- FLOATING ANNOTATION PINS ---
  const renderAnnotationPins = () => {
    if (!showPins) return null;
    return screen.annotations.map((pin) => {
      const isActive = activePinId === pin.id;
      const leftValue = pin.x !== undefined ? `${pin.x}%` : '50%';
      const topValue = pin.y !== undefined ? `${pin.y}%` : '50%';

      return (
        <button
          key={pin.id}
          onClick={() => onPinClick(pin.id)}
          style={{ left: leftValue, top: topValue }}
          className={`absolute translate-x-[-50%] translate-y-[-50%] z-50 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-black pointer-events-auto transition-all ${
            isActive 
              ? 'bg-[#E11D48] text-white border-2 border-white scale-125 ring-4 ring-red-100 shadow-md' 
              : 'bg-zinc-900 text-white border border-zinc-700 hover:scale-110 shadow-sm'
          }`}
          title={`${pin.elementName} (#${pin.id})`}
        >
          {pin.id}
        </button>
      );
    });
  };

  // --- CUSTOM HELPERS FOR VIETNAM SPECIFIC REQUIREMENTS ---
  const renderStockTag = (status: 'in_stock' | 'low_stock' | 'out_of_stock') => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm select-none">
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            in stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            low in stock
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-sm select-none">
            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            out of stock
          </span>
        );
    }
  };

  const toggleLikeProduct = (productName: string) => {
    setLikedProducts(prev => 
      prev.includes(productName)
        ? prev.filter(name => name !== productName)
        : [...prev, productName]
    );
  };

  const renderFavoriteButton = (productName: string) => {
    const isLiked = likedProducts.includes(productName);
    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleLikeProduct(productName);
          setToastMessage(isLiked ? `Đã xoá khỏi Wishlist: ${productName}` : `Đã thêm vào Wishlist: ${productName}`);
        }}
        className="p-1.5 bg-white hover:bg-zinc-50 text-zinc-400 hover:text-[#E11D48] rounded-full border border-zinc-200 shadow-xs transition-all cursor-pointer z-10 hover:scale-110 active:scale-95"
        title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}
      >
        <Heart size={14} className={isLiked ? "fill-[#E11D48] text-[#E11D48]" : "text-zinc-400"} />
      </button>
    );
  };

  // S01: Home Page
  const renderHomeScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 select-none">
      {/* SEC 2: Seasonal Hero Promo Block */}
      <div className="border border-zinc-250 bg-[#18181B] rounded p-6 md:p-8 text-white relative overflow-hidden flex flex-col items-start gap-4 shadow-sm">
        <span className="px-2 py-0.5 bg-[#E11D48] text-white rounded-xs font-mono text-[9px] font-black uppercase tracking-wider">
          SEASONAL SPECIAL
        </span>
        <h2 className="font-sans font-black text-xl md:text-3xl uppercase tracking-tight leading-none text-zinc-100 max-w-xl">
          Singapore National Day Sale: Up to 58% Off
        </h2>
        <p className="text-zinc-400 text-[11px] md:text-xs leading-relaxed max-w-lg font-sans">
          Celebrate our grand national milestone with premium catalog specials, tech bundles, and free delivery across Singapore. Limited time only.
        </p>
        <button className="px-4 py-2 bg-white text-zinc-950 font-bold font-mono text-[10.5px] uppercase rounded hover:bg-zinc-100 transition-colors shadow">
          Shop the Collection
        </button>
      </div>

      {/* SEC 3: New Arrivals Bento Columns */}
      <div>
        <h3 className="font-mono text-[10px] font-black uppercase tracking-widest text-[#E11D48] mb-3">
          ● NEW ARRIVALS FOR YOU
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-4 rounded flex flex-col justify-between gap-4 relative">
            <div className="absolute top-4 right-4 z-15">
              {renderFavoriteButton('High Performance Laptop Ultra Pro X1')}
            </div>
            <div className="flex gap-4 w-full">
              <WireframePlaceholder className="w-24 h-24 rounded shrink-0" text="PRO X1 LAPTOP" />
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">LAPTOPS & PC</span>
                <div className="flex items-start justify-between gap-4 w-full">
                  <h4 className="font-bold text-sm text-zinc-950">High Performance Laptop Ultra Pro X1</h4>
                  <div className="shrink-0">
                    {renderStockTag('in_stock')}
                  </div>
                </div>
                <p className="text-[10.5px] text-zinc-500 font-sans leading-relaxed">Intel Core i9 Extreme, 32GB RAM, 1TB SSD. SGP keyboard layout.</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="font-mono font-black text-xs text-zinc-900">SGD 1,299.00</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => openQuickView(
                    'High Performance Laptop Ultra Pro X1', 
                    1299.00, 
                    'in_stock', 
                    ['Intel Core i9 / 32GB RAM / 1TB SSD', 'Intel Core i7 / 16GB RAM / 512GB SSD']
                  )}
                  className="px-3 py-1 bg-zinc-900 text-white font-mono text-[10px] font-bold uppercase rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Quick view
                </button>
                <button 
                  onClick={() => {
                    addAccessoryToCart('High Performance Laptop Ultra Pro X1', 1299.00, 'LAPTOP');
                    setToastMessage('Đã thêm High Performance Laptop Ultra Pro X1 vào giỏ hàng!');
                  }}
                  className="p-1.5 px-2.5 border border-zinc-300 hover:border-rose-300 rounded cursor-pointer transition-colors hover:bg-zinc-50 flex items-center justify-center animate-none"
                >
                  <ShoppingBag size={13} className="text-zinc-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded flex flex-col justify-between gap-4 relative">
            <div className="absolute top-4 right-4 z-15">
              {renderFavoriteButton('Ultra Slim Tech 2')}
            </div>
            <div className="space-y-2 w-full">
              <WireframePlaceholder className="w-full h-16 rounded" text="SMART WATCH 2" />
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">ACCESSORIES</span>
                <div className="flex items-start justify-between gap-2 w-full">
                  <h4 className="font-bold text-xs text-zinc-950 leading-tight">Ultra Slim Tech 2</h4>
                  <div className="shrink-0">
                    {renderStockTag('low_stock')}
                  </div>
                </div>
                <p className="font-mono text-[10px] text-zinc-900 font-black mt-1">SGD 899.00</p>
              </div>
            </div>
            <div className="flex gap-1.5 mt-1">
              <button 
                onClick={() => openQuickView(
                  'Ultra Slim Tech 2', 
                  899.00, 
                  'low_stock', 
                  ['40mm Charcoal Black', '44mm Charcoal Black', '44mm Platinum Silver']
                )}
                className="flex-1 py-1.5 border border-zinc-200 text-zinc-700 font-bold font-mono text-[9px] uppercase rounded hover:border-zinc-400 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                Quick view
              </button>
              <button 
                onClick={() => {
                  addAccessoryToCart('Ultra Slim Tech 2', 899.00, 'WATCH');
                  setToastMessage('Đã thêm Ultra Slim Tech 2 vào giỏ hàng!');
                }}
                className="p-1 px-2.5 bg-zinc-950 hover:bg-[#E11D48] text-white rounded transition-colors flex items-center justify-center gap-1 cursor-pointer font-extrabold font-mono text-[9px] uppercase shadow-xs animate-none"
              >
                <ShoppingBag size={11} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEC 5: Curated Top Picks Row */}
      <div>
        <h3 className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
          ● TOP PRODUCTS CAROUSEL
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Ultra Slim Tech 3', 'Ultra Slim Tech 4', 'Ultra Slim Tech 5'].map((pick, id) => {
            const stockStatuses: ('in_stock' | 'low_stock' | 'out_of_stock')[] = ['in_stock', 'low_stock', 'out_of_stock'];
            const status = stockStatuses[id % stockStatuses.length];
            const carouselVariantsMap: Record<string, string[]> = {
              'Ultra Slim Tech 3': ['Carbon Black / Silicone Band', 'Silver / Leather Band'],
              'Ultra Slim Tech 4': ['Carbon Black / Silicone Band', 'Gold / Sport Band'],
              'Ultra Slim Tech 5': ['Classic Navy / Mesh Loop', 'Silver / Milanese Loop']
            };
            return (
              <div key={id} className="border border-zinc-200 bg-white p-3 rounded flex flex-col justify-between gap-3 relative">
                <div className="absolute top-3 right-3 z-15">
                  {renderFavoriteButton(pick)}
                </div>
                <WireframePlaceholder className="h-20 w-full rounded" text={pick.toUpperCase()} />
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs text-zinc-950 truncate flex-1">{pick}</h4>
                    <div className="shrink-0">
                      {renderStockTag(status)}
                    </div>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-950 font-black mt-0.5">SGD 899.00</p>
                </div>
                <div className="flex gap-1.5 mt-1">
                  <button 
                    onClick={() => openQuickView(
                      pick,
                      899.00,
                      status,
                      carouselVariantsMap[pick] || ['Standard Size']
                    )}
                    className="flex-1 py-1 border border-zinc-200 text-zinc-705 font-bold font-mono text-[9px] uppercase rounded hover:border-zinc-400 transition-colors cursor-pointer"
                  >
                    Quick View
                  </button>
                  <button 
                    onClick={() => {
                      addAccessoryToCart(pick, 899.00, 'CHOSEN');
                      setToastMessage(`Added ${pick} to cart!`);
                    }}
                    className="p-1 px-2.5 bg-zinc-950 hover:bg-[#E11D48] text-white rounded transition-colors flex items-center justify-center gap-1 cursor-pointer font-extrabold font-mono text-[9px] uppercase shadow-xs"
                    title="Add to Cart"
                  >
                    <ShoppingBag size={10} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEC Extra: Campaign Promo Banner (giữa Top Product Carousel và Flashsale Deal) */}
      <div 
        id="campaign-promo-banner"
        className="border border-[#E11D48] bg-gradient-to-r from-rose-50 to-orange-50/75 p-5 rounded flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden select-none shadow-xs"
      >
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-12 text-rose-500 opacity-10 pointer-events-none">
          <Sparkles size={120} />
        </div>
        <div className="space-y-1.5 z-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-block px-2 py-0.5 bg-[#E11D48] text-white rounded-xs font-mono text-[8.5px] font-black uppercase tracking-widest">
              MEGA CAMPAIGN VOUCHER
            </span>
            <span className="inline-block px-1.5 py-0.5 border border-[#E11D48]/30 text-[#E11D48] bg-white rounded-xs font-mono text-[8.5px] font-bold">
              Expires in 12h
            </span>
          </div>
          <h4 className="font-sans font-black text-sm md:text-base text-zinc-950 uppercase tracking-tight">
            Upgrade your tech ecosystem to the ultimate level today
          </h4>
          <p className="text-[11px] text-zinc-650 font-sans leading-relaxed max-w-xl">
            Use the promo code <strong className="font-mono text-[#E11D48] bg-white px-1.5 py-0.5 rounded border border-rose-100 font-black">FIRST10</strong> for an instant 10% discount on all orders starting from SGD 100.00 at RETAIL_SG. Next-day Orchard dispatch enabled.
          </p>
        </div>
        <div className="z-10 shrink-0">
          <button 
            id="campaign-redeem-act-btn"
            onClick={() => {
              setAppliedVoucher('FIRST10');
              setToastMessage('Congratulations! Promo code FIRST10 has been applied successfully.');
            }}
            className="px-4 py-2 bg-zinc-950 hover:bg-[#E11D48] text-white font-mono text-[10px] uppercase font-black tracking-wider rounded shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Apply Coupon
          </button>
        </div>
      </div>

      {/* SEC 6: Active Flash Sale Grid */}
      <div>
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
          <h3 className="font-mono text-[10px] font-black uppercase tracking-widest text-[#E11D48]">
            ⚡ FLASHSALE DEALS (TICKING ACTIVE)
          </h3>
          <span className="font-mono text-[10px] text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded font-black">
            ENDS IN: {countdownString}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Ultra Slim Tech 6', 'Ultra Slim Tech 7', 'Ultra Slim Tech 8', 'Ultra Slim Tech 9'].map((p, idx) => {
            const saleStatuses: ('in_stock' | 'low_stock' | 'out_of_stock')[] = ['in_stock', 'in_stock', 'low_stock', 'out_of_stock'];
            const currentStatus = saleStatuses[idx % saleStatuses.length];
            const flashVariantsMap: Record<string, string[]> = {
              'Ultra Slim Tech 6': ['Sport Red / Nylon Loop', 'Space Grey / Rubber Loop'],
              'Ultra Slim Tech 7': ['Midnight Blue', 'Starlight Gold'],
              'Ultra Slim Tech 8': ['Rose Gold / Pink Sand Band', 'Silver / White Band'],
              'Ultra Slim Tech 9': ['Obsidian Black', 'Titanium Silver']
            };
            return (
              <div key={idx} className="border border-zinc-200 bg-white p-3 rounded flex flex-col gap-2 relative">
                <div className="absolute top-2 right-2 z-15">
                  {renderFavoriteButton(p)}
                </div>
                <span className="absolute top-2 left-2 bg-[#E11D48] text-white font-mono font-bold text-[8px] px-1 rounded z-10">
                  -30%
                </span>
                <WireframePlaceholder className="h-16 w-full rounded" text="FLASH ITEM" />
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-[11px] text-zinc-950 truncate flex-1">{p}</h4>
                    <div className="shrink-0">
                      {renderStockTag(currentStatus)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1 mt-1 bg-white">
                  <span className="font-mono text-[10px] text-[#E11D48] font-black shrink-0">SGD 899</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => openQuickView(
                        p, 
                        899.00, 
                        currentStatus, 
                        flashVariantsMap[p] || ['Standard Variant']
                      )}
                      className="px-1.5 py-1 text-[8.5px] font-mono border border-zinc-200 text-zinc-650 rounded hover:border-zinc-400 hover:text-zinc-950 transition-colors uppercase font-bold cursor-pointer"
                    >
                      Quick View
                    </button>
                    <button 
                      onClick={() => {
                        addAccessoryToCart(p, 899.00, 'DISCOUNT');
                        setToastMessage(`Đã thêm ${p} vào giỏ hàng với giá ưu đãi!`);
                      }}
                      className="p-1 border border-zinc-200 rounded text-zinc-650 hover:bg-zinc-105 cursor-pointer transition-colors"
                    >
                      <ShoppingBag size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // S02: Search Results
  const renderSearchScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* SEC 2: Advanced Progressive Filters Sidebar */}
        <div className="col-span-1 border border-zinc-200 p-4 bg-[#F4F4F5]/50 rounded flex flex-col gap-4">
          <div className="font-mono text-[10px] font-black uppercase text-zinc-400 tracking-wider">
            Vetting Filters
          </div>

          <div className="space-y-2">
            <span className="font-mono font-bold text-[10px] text-zinc-900 uppercase">Price Range (SGD)</span>
            <div className="flex gap-2 items-center">
              <input 
                type="text" 
                value={priceMinInput}
                onChange={(e) => setPriceMinInput(e.target.value)}
                className="w-1/2 border border-zinc-300 bg-white rounded px-2 py-1 text-[10px] font-mono text-center text-zinc-700"
              />
              <span className="text-zinc-400 text-xs">-</span>
              <input 
                type="text" 
                value={priceMaxInput}
                onChange={(e) => setPriceMaxInput(e.target.value)}
                className="w-1/2 border border-zinc-300 bg-white rounded px-2 py-1 text-[10px] font-mono text-center text-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono font-bold text-[10px] text-zinc-900 uppercase">Corporate Brand</span>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-zinc-650">
              {['TechPro SG', 'Nexus Systems', 'Alpha Audio'].map((brand, bIdx) => (
                <label key={bIdx} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      setSelectedBrands(prev => 
                        prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                      );
                    }}
                    className="accent-zinc-950"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono font-bold text-[10px] text-zinc-900 uppercase">Customer Reviews</span>
            <div className="flex flex-col gap-1 text-[10px] font-mono">
              {[5, 4, 3].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRatingTerm(star)}
                  className={`flex items-center gap-1.5 p-1 px-2 rounded border text-left cursor-pointer ${
                    ratingTerm === star 
                      ? 'bg-zinc-900 text-white border-zinc-900' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <span className="flex text-amber-500">
                    {Array.from({ length: star }).map((_, i) => (
                      <Star key={i} size={8} fill="currentColor" />
                    ))}
                    {Array.from({ length: 5 - star }).map((_, i) => (
                      <Star key={i} size={8} />
                    ))}
                  </span>
                  <span>& Up</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEC 3: Products Grid */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <div>
              <h2 className="text-base font-black uppercase text-zinc-900 font-mono">Electronics</h2>
              <p className="text-[10px] text-zinc-500 leading-normal">Showing 1 - 12 of 48 high-performance results tailored for you.</p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-zinc-400 uppercase">Sort by:</span>
              <select className="border border-zinc-250 bg-white rounded p-1 text-[10px]">
                <option>Relevance Score</option>
                <option>Price (Low to High)</option>
                <option>Rating (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Top picked high level product */}
            <div className="col-span-1 sm:col-span-2 border border-zinc-200 bg-white p-4 rounded flex flex-col sm:flex-row items-center gap-4 justify-between relative">
              <div className="absolute top-4 right-4 z-15">
                {renderFavoriteButton('High Performance Laptop Ultra Pro X1')}
              </div>
              <div className="flex gap-4 w-full">
                <WireframePlaceholder className="w-16 h-16 rounded shrink-0" text="PRODUCT X1" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono bg-red-100 text-[#E11D48] px-1 rounded font-bold uppercase">MUST SECURE</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 w-full">
                    <h4 className="font-extrabold text-sm text-zinc-950">High Performance Laptop Ultra Pro X1</h4>
                    <div className="shrink-0">{renderStockTag('in_stock')}</div>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">Singapore ultimate performance desktop companion.</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1 shrink-0 mt-3 sm:mt-0 pr-12">
                <span className="font-mono font-black text-xs text-zinc-950">SGD 1,299.00</span>
                <button 
                  onClick={() => addAccessoryToCart('High Performance Laptop Ultra Pro X1', 1299.00, 'LAPTOP')}
                  className="px-3 py-1 bg-[#E11D48] text-white font-mono text-[10px] font-black uppercase rounded shadow-xs"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Generated grid electronics items */}
            {['Ultra Slim Tech 2', 'Ultra Slim Tech 3', 'Ultra Slim Tech 4', 'Ultra Slim Tech 5', 'Ultra Slim Tech 6', 'Ultra Slim Tech 7'].map((el, elIdx) => {
              const searchStatuses: ('in_stock' | 'low_stock' | 'out_of_stock')[] = ['low_stock', 'in_stock', 'low_stock', 'out_of_stock', 'in_stock', 'in_stock'];
              const currentStatus = searchStatuses[elIdx % searchStatuses.length];
              const searchVariantsMap: Record<string, string[]> = {
                'Ultra Slim Tech 2': ['40mm Charcoal Black', '44mm Charcoal Black', '44mm Platinum Silver'],
                'Ultra Slim Tech 3': ['Carbon Black / Silicone Band', 'Silver / Leather Band'],
                'Ultra Slim Tech 4': ['Carbon Black / Silicone Band', 'Gold / Sport Band'],
                'Ultra Slim Tech 5': ['Classic Navy / Mesh Loop', 'Silver / Milanese Loop'],
                'Ultra Slim Tech 6': ['Sport Red / Nylon Loop', 'Space Grey / Rubber Loop'],
                'Ultra Slim Tech 7': ['Midnight Blue', 'Starlight Gold']
              };
              return (
                <div key={elIdx} className="border border-[#E2E8F0] bg-white p-3 rounded flex flex-col justify-between gap-3 shadow-2xs relative">
                  <div className="absolute top-3 right-3 z-15">
                    {renderFavoriteButton(el)}
                  </div>
                  <WireframePlaceholder className="h-20 w-full rounded" text={el.toUpperCase()} />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-xs text-zinc-900 leading-snug">{el}</h4>
                      <div className="shrink-0">
                        {renderStockTag(currentStatus)}
                      </div>
                    </div>
                    <p className="font-mono text-[10.5px] text-zinc-950 font-black mt-1">SGD 899.00</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openQuickView(
                        el,
                        899.00,
                        currentStatus,
                        searchVariantsMap[el] || ['Standard Variant']
                      )}
                      className="flex-1 py-1 bg-zinc-100 hover:bg-zinc-200 font-mono text-[9px] font-bold uppercase rounded cursor-pointer"
                    >
                      Quick view
                    </button>
                    <button 
                      onClick={() => addAccessoryToCart(el, 899.00, 'CATALOG')}
                      className="p-1 px-2 border border-zinc-200 rounded hover:bg-zinc-105 text-zinc-850"
                    >
                      <ShoppingBag size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SEC 4: Catalog Pagination */}
          <div className="flex justify-center items-center gap-1.5 font-mono text-[10px] pt-4">
            <button className="p-1 px-2 border border-zinc-200 rounded text-zinc-400 bg-white">&lt;</button>
            <button className="p-1 px-2 bg-zinc-900 text-white rounded font-bold">1</button>
            <button className="p-1 px-2 border border-zinc-200 rounded text-zinc-600 bg-white">2</button>
            <button className="p-1 px-2 border border-zinc-200 rounded text-zinc-600 bg-white">3</button>
            <span className="text-zinc-400 font-bold px-1">...</span>
            <button className="p-1 px-2 border border-zinc-200 rounded text-zinc-600 bg-white">12</button>
            <button className="p-1 px-2 border border-zinc-200 rounded text-zinc-600 bg-white">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );

  // S03: Product Detail
  const renderProductScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      {/* SEC 1: Breadcrumb Nav */}
      <div className="font-mono text-[9.5px] text-zinc-400 flex items-center gap-1 border-b border-zinc-100 pb-2 select-none">
        <span>Home</span> <ChevronRight size={8} />
        <span>Electronics</span> <ChevronRight size={8} />
        <span className="text-zinc-850 font-semibold uppercase">AERO-X Pro Wireless PDP</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* SEC 2: Left column Photo showcase gallery */}
        <div className="space-y-4">
          <div className="border border-zinc-200 bg-white rounded p-4 relative">
            <div className="absolute top-3 right-3 z-15">
              {renderFavoriteButton('AERO-X Pro Wireless Headphones')}
            </div>
            <WireframePlaceholder className="w-full h-52 rounded" text="AERO-X NOIR EDITION" />
            <span className="absolute top-3 left-3 bg-[#E11D48] text-white font-mono text-[8px] font-black px-1.5 py-0.5 rounded uppercase shadow-2xs">
              Noir Selected
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <WireframePlaceholder className="h-14 rounded border-zinc-900 border-2" text="THUMB NOIR" />
            <WireframePlaceholder className="h-14 rounded cursor-not-allowed text-zinc-400" text="THUMB SILVER" />
            <WireframePlaceholder className="h-14 rounded cursor-not-allowed text-zinc-400" text="THUMB GOLD" />
          </div>
        </div>

        {/* SEC 3 & 4: Purchase Panel & Countdown clock */}
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] font-bold text-zinc-400 uppercase tracking-widest">Premium Audio Set</span>
              <span className="bg-emerald-100 text-emerald-800 text-[8.5px] font-mono px-1 rounded font-bold uppercase">In Stock</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-zinc-950 uppercase font-sans">
              AERO-X Pro Wireless Noise-Cancelling Headphones
            </h1>
            <div className="flex items-center gap-1 mt-0.5 select-none">
              <Star size={11} fill="currentColor" className="text-amber-500 text-amber-500 shrink-0" />
              <span className="text-xs font-mono font-bold text-zinc-700">4.9 / 5.0 Rating</span>
              <span className="text-[9px] text-[#A1A1AA] font-mono font-bold uppercase tracking-wider ml-1">● 1.2K verified reviews</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
              Structural precision meets acoustic excellence. Engineering-grade hardware layouts tailored for the decerning audiophile customer database.
            </p>
          </div>

          <div className="border-t border-b border-zinc-100 py-3 flex items-center justify-between">
            <span className="font-mono text-zinc-450 text-[10.5px] uppercase tracking-wide">Singapore Price:</span>
            <span className="font-mono font-black text-base text-[#E11D48]">SGD 499.00</span>
          </div>

          {/* SEC 3.5: PDP Product Variant Selection Option */}
          <div className="space-y-3 py-1 flex flex-col gap-2.5">
            <div className="space-y-1">
              <span className="text-[9.5px] font-mono font-black text-zinc-550 uppercase tracking-wider block">Chọn màu sắc (Color Variant):</span>
              <div className="flex gap-2 flex-wrap">
                {['Noir Edition (Default)', 'Platinum Silver', 'Champagne Gold'].map((color) => {
                  const isActive = selectedProductColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedProductColor(color);
                        setToastMessage(`Đã chọn màu: ${color}`);
                      }}
                      className={`px-3 py-1.5 border transition-all text-[10.5px] font-mono rounded cursor-pointer ${
                        isActive
                          ? 'border-zinc-950 bg-zinc-950 text-white font-bold shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9.5px] font-mono font-black text-zinc-550 uppercase tracking-wider block">Chọn đệm tai (Ear Cushion option):</span>
              <div className="flex gap-2 flex-wrap">
                {['Standard Over-Ear', 'Pro Active Cushion Upgrade (+SGD 40)'].map((cushion) => {
                  const isActive = selectedProductCushion === cushion;
                  return (
                    <button
                      key={cushion}
                      onClick={() => {
                        setSelectedProductCushion(cushion);
                        setToastMessage(`Đã chọn đệm tai: ${cushion}`);
                      }}
                      className={`px-2.5 py-1.5 border transition-all text-[10px] font-mono rounded cursor-pointer ${
                        isActive
                          ? 'border-zinc-950 bg-zinc-950 text-white font-bold shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      {cushion}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SEC 4 Next Day Clocks */}
          <div className="bg-zinc-950 text-white p-3.5 rounded border border-zinc-800 flex items-center gap-3 relative shadow-xs">
            <Clock className="text-[#E11D48] shrink-0 animate-pulse" size={16} />
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#E11D48] block font-black">NEXT DAY SGP DELIVERY TIMELINES ACTIVED</span>
              <p className="font-mono text-[10.5px] font-medium leading-none text-zinc-300">
                Order in <span className="font-bold text-white font-mono">{countdownString}</span> to receive tomorrow
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => addAccessoryToCart('AERO-X Pro Wireless Headphones (' + selectedProductColor + ' / ' + selectedProductCushion + ')', 499.00, 'AERO_X')}
              className="flex-1 py-2.5 bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-zinc-850 transition-colors cursor-pointer text-center"
            >
              Buy Now / Secure Checkouts
            </button>
            <button 
              onClick={() => addAccessoryToCart('AERO-X Pro Wireless Headphones (' + selectedProductColor + ' / ' + selectedProductCushion + ')', 499.00, 'AERO_X')}
              className="px-4 py-2.5 border border-zinc-950 text-zinc-950 font-mono text-[11px] font-bold uppercase rounded hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              Add to Basket +
            </button>
          </div>
        </div>
      </div>

      {/* SEC 5: Detailed Headphone Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
        <div>
          <h3 className="font-mono text-[10px] font-black uppercase text-zinc-950 pb-2 border-b border-zinc-150 mb-3">
            Audio Specifications Matrix
          </h3>
          <div className="border border-zinc-200 rounded overflow-hidden">
            <table className="w-full font-mono text-[10.5px]">
              <tbody>
                <tr className="border-b border-zinc-150"><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650 w-1/3">Acoustic Driver</td><td className="px-3 py-1.5 bg-white text-zinc-800">40mm custom Dynamic, custom composite</td></tr>
                <tr className="border-b border-zinc-150"><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650">Freq Response</td><td className="px-3 py-1.5 bg-white text-zinc-800">10Hz - 40,000Hz (Audiophile Certified)</td></tr>
                <tr className="border-b border-zinc-150"><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650">Smart Chipset</td><td className="px-3 py-1.5 bg-white text-zinc-800">RETAIL_SG Dual ANC Audio Processor</td></tr>
                <tr className="border-b border-zinc-150"><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650">Battery Cap</td><td className="px-3 py-1.5 bg-white text-zinc-800">48h Active ANC On / Type-C 2h Rapid Charge</td></tr>
                <tr className="border-b border-zinc-150"><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650">Connectivity</td><td className="px-3 py-1.5 bg-white text-zinc-800">Bluetooth 5.3 + Singapore LE audio node support</td></tr>
                <tr><td className="px-3 py-1.5 bg-zinc-50 font-bold text-zinc-650">Accessories</td><td className="px-3 py-1.5 bg-white text-zinc-800">EVA Secure Travel Hardcase, Braided audio lines</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEC 6: Verified Audiophile Reviews Hub */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-150">
            <h3 className="font-mono text-[10px] font-black uppercase text-zinc-950">
              Verified Audiophile Reviews
            </h3>
            <span className="font-mono text-[10px] text-zinc-500 font-black">Score: 4.9/5 (1.2k total)</span>
          </div>
          <div className="space-y-2">
            <div className="border border-zinc-150 p-2.5 rounded bg-zinc-50/20 font-sans text-[10.5px] leading-relaxed">
              <div className="flex justify-between font-mono text-[9px] mb-1">
                <span className="font-bold text-zinc-900 font-sans">Sarah Lim (Verified Buyer SGP)</span>
                <span className="text-zinc-400">May 2026</span>
              </div>
              <p className="text-zinc-600">"The next-day Orchard shipment arrived within exactly 18 hours. Acoustical housing build quality is insane."</p>
            </div>
            <div className="border border-zinc-150 p-2.5 rounded bg-zinc-50/20 font-sans text-[10.5px] leading-relaxed">
              <div className="flex justify-between font-mono text-[9px] mb-1">
                <span className="font-bold text-zinc-900 font-sans">Marcus Tan (Professional Review)</span>
                <span className="text-zinc-400">May 2026</span>
              </div>
              <p className="text-zinc-600">"Unmatched composite ANC performance during Singapore Mass Rapid Transit commutes."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // S04: Your Cart
  const renderCartScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* SEC 2: Basket Items List with Statuses */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="border-b border-zinc-200 pb-2 flex justify-between items-center select-none">
            <h2 className="text-base font-black uppercase text-zinc-950 font-mono">Your Active Cart</h2>
            <span className="font-mono text-[10px] text-zinc-500">({cartItems.length} listed items)</span>
          </div>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="border border-zinc-200 p-4 rounded bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <WireframePlaceholder className="w-12 h-12 rounded" text={item.imgText} />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-950">{item.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.details}</p>
                    {item.isSoldOut && (
                      <span className="inline-block bg-red-100 text-red-800 text-[8.5px] font-mono px-1 rounded uppercase mt-1 font-bold">
                        Sold Out Inventory
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <button 
                      disabled={item.isSoldOut}
                      onClick={() => adjustQty(item.id, -1)}
                      className="w-5 h-5 rounded border border-zinc-300 flex items-center justify-center font-mono text-xs hover:border-zinc-500 disabled:opacity-20 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs w-6 text-center font-bold">{item.qty}</span>
                    <button 
                      disabled={item.isSoldOut}
                      onClick={() => adjustQty(item.id, 1)}
                      className="w-5 h-5 rounded border border-zinc-300 flex items-center justify-center font-mono text-xs hover:border-zinc-500 disabled:opacity-20 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-950 font-bold block min-w-[70px]">
                      SGD {(item.price * item.qty).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeCartItem(item.id)}
                      className="text-zinc-400 hover:text-red-650 cursor-pointer p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEC 6: Pairs Well With... (Cross-sell) */}
          <div className="border border-dashed border-zinc-350 p-4 rounded bg-zinc-50/50 space-y-3">
            <span className="font-mono font-black text-[10px] text-zinc-950 uppercase tracking-widest block">
              ● Pairs Well With Your Cart (Desk Upgrades)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'SGP Felt Desk Pad', price: 45.00, desc: '900x400 Natural wool composite', slug: 'DESK_PAD' },
                { name: 'Braided USB-C Cable', price: 22.00, desc: '1.5m nylon high power speed line', slug: 'CABLE' }
              ].map((acc, id) => (
                <div key={id} className="bg-white border border-zinc-200 p-3 rounded flex justify-between items-center gap-3">
                  <div>
                    <h5 className="font-bold text-[11px] text-zinc-980">{acc.name}</h5>
                    <p className="text-[9px] text-zinc-400 mt-0.5 truncate">{acc.desc}</p>
                    <span className="font-mono text-[10px] font-black text-[#E11D48] mt-1 block">SGD {acc.price}</span>
                  </div>
                  <button 
                    onClick={() => addAccessoryToCart(acc.name, acc.price, acc.slug)}
                    className="px-2.5 py-1 bg-zinc-950 text-white font-mono text-[9px] font-bold uppercase rounded cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEC 3 & 4: Order calculations with GST and Voucher */}
        <div className="col-span-1 space-y-4">
          <div className="border border-zinc-200 p-5 rounded bg-white space-y-4 shadow-2xs">
            <h3 className="font-mono text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Secure Calculations Invoice
            </h3>

            <div className="space-y-2.5 font-mono text-[10.5px] text-zinc-650">
              <div className="flex justify-between">
                <span>Basket Subtotal:</span>
                <span className="font-bold text-zinc-900">SGD {getSubtotalAmount().toFixed(2)}</span>
              </div>
              
              {appliedVoucher && (
                <div className="flex justify-between text-[#E11D48] font-bold">
                  <span>FIRST10 Discount (10%):</span>
                  <span>-SGD {getDiscountAmount().toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping SGP Rate:</span>
                <span className="text-zinc-500 font-medium">calculated at checkout</span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Estimated GST Tax (9%):</span>
                <span className="font-mono text-zinc-950 font-bold">SGD {getGstAmount().toFixed(2)}</span>
              </div>

              <div className="border-t border-zinc-200 pt-2 flex justify-between text-zinc-950 font-black text-xs">
                <span>GRAND ESTIMATED TOTAL:</span>
                <span>SGD {getGrandTotalOrderValue().toFixed(2)}</span>
              </div>
            </div>

            {/* SEC 3: Voucher entry block with validation warning */}
            <div className="border-t border-zinc-150 pt-3 space-y-2">
              <span className="font-mono font-bold text-[10px] uppercase text-zinc-900 block">Voucher Promotion Code</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Insert voucher code..." 
                  value={voucherCodeInput}
                  onChange={(e) => setVoucherCodeInput(e.target.value)}
                  className="flex-1 border border-zinc-300 bg-zinc-50 rounded px-2 text-[10px] focus:outline-none focus:bg-white"
                />
                <button 
                  onClick={() => {
                    const cleanCode = voucherCodeInput.trim().toUpperCase();
                    if (cleanCode === 'FIRST10') {
                      setAppliedVoucher('FIRST10');
                      setVoucherError(null);
                    } else if (cleanCode === 'SG_NATIONAL_DAY') {
                      setVoucherError('This voucher has reached maximum redemptions.');
                    } else if (cleanCode === '') {
                      setVoucherError('Please enter a voucher code.');
                    } else {
                      setVoucherError('Unable to validate voucher credentials.');
                    }
                  }}
                  className="px-3 py-1 bg-zinc-950 text-white font-mono text-[10px] font-bold uppercase rounded cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {voucherError && (
                <div className="bg-red-50 border border-red-200 p-2 text-red-800 text-[9px] font-mono rounded flex items-start gap-1.5 animate-bounce">
                  <AlertCircle size={12} className="shrink-0 mt-0.5" />
                  <span>{voucherError}</span>
                </div>
              )}

              {appliedVoucher && (
                <div className="flex items-center justify-between p-1 px-2 border border-emerald-250 bg-emerald-50 text-emerald-800 text-[9px] font-mono rounded">
                  <span>Code <strong>FIRST10</strong> active (10% Off)</span>
                  <button onClick={() => setAppliedVoucher(null)} className="font-bold ml-1.5">✕</button>
                </div>
              )}
            </div>

            <button className="w-full py-2 bg-[#09090B] text-white font-bold text-[11px] uppercase tracking-wider rounded cursor-pointer text-center hover:bg-zinc-800 transition-colors">
              Proceed to secure checkout
            </button>
          </div>

          <div className="border border-zinc-200 rounded p-3 bg-zinc-50/50 flex items-center justify-center gap-1.5 font-mono text-[9px] text-zinc-400">
            <ShieldCheck size={14} className="text-zinc-650" />
            <span>Singapore SSL Encrypted checkout servers active</span>
          </div>
        </div>
      </div>
    </div>
  );

  // S05: Refund Request Form
  const renderRefundScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Main Refund form input column */}
        <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-6 rounded flex flex-col gap-5">
          <div className="space-y-1.5 border-b pb-3">
            <h1 className="text-base font-black font-sans uppercase text-zinc-950">Refund Request Form</h1>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              To request item return and secure refund reimbursements, define active order details beneath. Reverse logistics validations are approved within 24-48 business hours.
            </p>
          </div>

          {/* SEC 1: Order detail Reference row */}
          <div className="bg-zinc-50 border border-zinc-200 p-3 rounded flex justify-between items-center font-mono text-[10.5px]">
            <div>
              <span className="text-zinc-400 text-[9.5px]">Return target item:</span>
              <h4 className="font-extrabold text-zinc-950 mt-0.5">Ergonomic Office Chair v2 (Obsidian Edition)</h4>
              <p className="text-[9px] text-zinc-500 font-sans mt-0.5">Order ID: #SPR-2026-9931 • Payout: SGD 189.00 • Qty: 01</p>
            </div>
            <button className="px-2 py-1 border border-zinc-300 text-zinc-500 text-[8.5px] rounded font-bold hover:bg-zinc-100 bg-white cursor-not-allowed uppercase shrink-0">
              + Other items
            </button>
          </div>

          {/* SEC 2: Return Motives Options List */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">1. REASON FOR RETURN</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10.5px]">
              {[
                { id: 'defective', label: 'Defective Product' },
                { id: 'not_described', label: 'Not As Described' },
                { id: 'change_of_mind', label: 'Change of Mind' }
              ].map((motive) => (
                <label 
                  key={motive.id}
                  className={`border p-3 rounded flex items-center gap-2 cursor-pointer select-none transition-all ${
                    refundReason === motive.id 
                      ? 'border-zinc-950 bg-zinc-50/50 font-bold' 
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="return_motive_group"
                    checked={refundReason === motive.id}
                    onChange={() => setRefundReason(motive.id)}
                    className="accent-zinc-950"
                  />
                  <span>{motive.label}</span>
                </label>
              ))}
            </div>
            <textarea 
              placeholder="Provide specific notes on the return condition (optional)..."
              value={refundNotes}
              onChange={(e) => setRefundNotes(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded p-2.5 text-[10.5px] font-sans focus:outline-none focus:bg-white focus:border-zinc-400 h-20"
            />
          </div>

          {/* SEC 3: Defective condition photos upload camera Placeholder */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">2. DAMAGE/LABEL PHOTO ATTACHMENT</h3>
            <p className="text-[9.5px] text-zinc-500 leading-normal font-sans">
              Upload at least 2 clear captures showing the item's current condition and shipping labels to secure rapid refund approval.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {refundPhotos.map((file, fIdx) => (
                <div key={fIdx} className="border border-zinc-200 rounded h-14 bg-zinc-50 relative flex items-center justify-center">
                  <span className="font-mono text-[8px] text-zinc-400 truncate px-1">{file}</span>
                  <button 
                    onClick={() => setRefundPhotos([])} 
                    className="absolute -top-1 -right-1 bg-zinc-950 text-white rounded-full w-3.5 h-3.5 text-[8px] flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div 
                onClick={() => setRefundPhotos(prev => [...prev, `condition_capture_${prev.length + 1}.png`])}
                className="border border-dashed border-zinc-300 rounded h-14 flex flex-col items-center justify-center text-zinc-400 cursor-pointer hover:border-zinc-500"
              >
                <Camera size={14} />
                <span className="text-[7.5px] font-mono mt-1">UPLOAD +</span>
              </div>
            </div>
          </div>

          {/* SEC 4: Refund Method card choices */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">3. TARGET REFUND METHOD</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
              <div 
                onClick={() => setRefundMethodOption('original')}
                className={`border p-3.5 rounded cursor-pointer transition-all flex items-start gap-3 ${
                  refundMethodOption === 'original' 
                    ? 'border-zinc-950 bg-zinc-50/50 ring-1 ring-zinc-950' 
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input 
                  type="radio" 
                  checked={refundMethodOption === 'original'}
                  onChange={() => setRefundMethodOption('original')}
                  className="accent-zinc-950 mt-0.5"
                />
                <div>
                  <h4 className="font-bold text-xs text-zinc-950">Original Card Visa</h4>
                  <p className="text-[9.5px] text-zinc-500 leading-normal mt-0.5 font-sans">Reimburse back onto Visa card ****1234. Requires 3-5 business delivery days standard processing.</p>
                </div>
              </div>

              <div 
                onClick={() => setRefundMethodOption('store')}
                className={`border p-3.5 rounded cursor-pointer transition-all flex items-start gap-3 ${
                  refundMethodOption === 'store' 
                    ? 'border-zinc-950 bg-zinc-50/55 ring-1 ring-zinc-950' 
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input 
                  type="radio" 
                  checked={refundMethodOption === 'store'}
                  onChange={() => setRefundMethodOption('store')}
                  className="accent-zinc-950 mt-0.5"
                />
                <div>
                  <h4 className="font-bold text-xs text-zinc-950">RETAIL_SG Wallet Credits</h4>
                  <p className="text-[9.5px] text-zinc-500 leading-normal mt-0.5 font-sans">Receive SGD 189.00 store balance instantly on requests approved. Never expires.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEC 5: Logistics warnings NinjaVan pickup address */}
        <div className="col-span-1 border border-zinc-250 p-5 rounded bg-zinc-50/50 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-black uppercase text-zinc-400">Shipment Operations details</span>
            <h3 className="font-sans font-bold text-xs text-zinc-950">Reverse Logistics Routing</h3>
          </div>

          <div className="p-3 border border-zinc-200 bg-white rounded space-y-2.5 font-sans text-[10.5px] leading-relaxed text-zinc-505">
            <div className="flex gap-2 items-start">
              <AlertCircle size={14} className="text-[#E11D48] shrink-0 mt-0.5" />
              <span>After request authorization approves, pack files as originally received. Bring box parcels to any designated Singapore NinjaVan cargo center.</span>
            </div>
            <div className="border-t border-zinc-150 pt-2 font-mono text-[9px] text-zinc-700">
              <strong className="block font-sans text-[10px] text-zinc-950 uppercase mb-0.5">SGP Drop-off Logistics Coordinates:</strong>
              NinjaVan Return Hub, Warehouse 42, Precision Logistics Center, Singapore 638210
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-3 space-y-3 font-mono text-[11px]">
            <div className="flex justify-between items-center text-zinc-950 font-black">
              <span>Total Estim. Refund:</span>
              <span className="text-[#E11D48] font-black text-xs">SGD 189.00</span>
            </div>
            <button className="w-full py-2 bg-zinc-950 text-white font-bold uppercase tracking-wider text-[10.5px] rounded cursor-pointer hover:bg-zinc-850">
              SUBMIT REFUND REQUEST
            </button>
            <p className="text-[8.5px] leading-normal text-zinc-400 font-sans text-center">
              By submitting, you agree to comply with Singapore RETAIL_SG's statutory return rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // S06: Feedback Form
  const renderRateScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Rating feedback form panel */}
        <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-6 rounded flex flex-col gap-5">
          <div className="space-y-1.5 border-b pb-3 select-none">
            <h1 className="text-base font-black font-sans uppercase text-zinc-950">Rate Your Experience</h1>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Thank you for shopping with RETAIL_SG. Provide honest sentiment indicators to secure our high operational performance criteria.
            </p>
          </div>

          {/* SEC 2: Overall Stars */}
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">OVERALL TRANSACTION SATISFACTION</h3>
            <span className="text-[10px] font-mono text-zinc-500 block">How did you feel about overall fulfillment?</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRatingSentiment(star)}
                  className="text-amber-500 p-1 hover:scale-125 transition-transform cursor-pointer"
                >
                  <Star 
                    size={22} 
                    fill={star <= ratingSentiment ? 'currentColor' : 'none'} 
                    className="stroke-[1.5]"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">DETAILED COMPLAINT/COMPLIMENT NOTES</h3>
            <textarea 
              placeholder="What did you like or dislike about the product specifications, shipping speeds, or delivery rider services?"
              value={reviewNoteText}
              onChange={(e) => setReviewNoteText(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded p-2.5 text-[10.5px] font-sans focus:outline-none focus:bg-white focus:border-zinc-400 h-24"
            />
            {/* SEC 3 Review notes anonymity */}
            <label className="flex items-center gap-2 font-mono text-[9.5px] text-zinc-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={reviewAnonymity}
                onChange={() => setReviewAnonymity(prev => !prev)}
                className="accent-zinc-950"
              />
              <span>Keep my identity anonymous on the public catalog reviews panel.</span>
            </label>
          </div>
        </div>

        {/* Right side individual product rating checklist */}
        <div className="col-span-1 border border-zinc-200 p-4 bg-zinc-50/50 rounded flex flex-col gap-4">
          <div className="space-y-1 select-none">
            <span className="text-[9px] font-mono font-black uppercase text-zinc-400">PRODUCT EVALUATIONS</span>
            <h3 className="font-sans font-bold text-xs text-zinc-950">Active Ordered Item</h3>
          </div>

          <div className="border border-zinc-200 bg-white p-3 rounded flex gap-3">
            <WireframePlaceholder className="w-10 h-10 rounded shrink-0" text="CHAIR" />
            <div className="space-y-0.5">
              <h4 className="font-bold text-[10.5.px] text-zinc-955">Ergonomic Office Chair v2</h4>
              <p className="text-[9px] text-zinc-450 font-mono">Singapore Delivery • Qty: 1</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[9px] font-black uppercase text-zinc-504">Specific Product Quality Match:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRatingQualityValue(star)}
                  className="text-amber-500 cursor-pointer"
                >
                  <Star 
                    size={15} 
                    fill={star <= ratingQualityValue ? 'currentColor' : 'none'} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SEC 4 Photo Uploads Product reviews */}
          <div className="space-y-2">
            <label className="font-mono text-[9px] font-black uppercase text-zinc-500 block">PRODUCT MEDIA PHOTOGRAPHY</label>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {uploadedReviewPhotos.map((file, idx) => (
                <div key={idx} className="border border-zinc-200 rounded h-11 bg-zinc-100 flex items-center justify-center font-mono text-[7px] truncate px-0.5 text-zinc-400 relative">
                  <span>{file}</span>
                  <button onClick={() => setUploadedReviewPhotos([])} className="absolute -top-1 -right-1 bg-zinc-900 text-white rounded-full w-3 h-3 text-[7px] flex items-center justify-center">✕</button>
                </div>
              ))}
              <div 
                onClick={() => setUploadedReviewPhotos(prev => [...prev, `review_photo_${prev.length + 1}.png`])}
                className="border border-dashed border-zinc-300 rounded h-11 bg-white cursor-pointer hover:border-zinc-500 flex flex-col items-center justify-center text-zinc-400"
              >
                <Camera size={11} />
                <span className="text-[7px] font-mono mt-0.5">TẢI LÊN</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-zinc-950 text-white font-bold uppercase tracking-wider text-[11px] rounded mt-2 hover:bg-zinc-850 cursor-pointer">
            Send Review →
          </button>
        </div>
      </div>
    </div>
  );

  // S07: Order Cancellation Page
  const renderCancelScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Reasons Cancellation Checklist form */}
        <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-6 rounded flex flex-col gap-5">
          <div className="space-y-1.5 border-b pb-3">
            <span className="font-mono text-[9px] font-black bg-red-150 text-[#E11D48] px-1.5 rounded uppercase">
              Financial Retraction System
            </span>
            <h1 className="text-base font-black font-sans uppercase text-zinc-950">Order Cancellation Request</h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              To cancel or request item withdrawal, specify matching retraction reasons below. Approved payouts return to original accounts within 3-5 Singapore business days.
            </p>
          </div>

          {/* SEC 2 Cancellation checklists */}
          <div className="space-y-3 font-sans">
            <h3 className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Reasons for Order Cancellation:</h3>
            <div className="flex flex-col gap-2 font-mono text-[10.5px]">
              {[
                'I changed my mind about the purchase',
                'Incorrect delivery postcode coordinates',
                'Fulfillment delivery time was too far out',
                'I managed to secure a cheaper price elsewhere'
              ].map((reason, idx) => (
                <label 
                  key={idx}
                  className={`border p-3 rounded flex items-center gap-3 cursor-pointer select-none transition-all ${
                    cancelReasonVal === reason 
                      ? 'border-zinc-950 bg-zinc-50/50 font-bold' 
                      : 'border-zinc-200'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="cancel_opt_group" 
                    checked={cancelReasonVal === reason}
                    onChange={() => setCancelReasonVal(reason)}
                    className="accent-zinc-950"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <textarea 
              placeholder="Provide specific details about your decision (optional)..."
              value={cancelNotes}
              onChange={(e) => setCancelNotes(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded p-2.5 text-[10.5px] font-sans focus:outline-none focus:bg-white h-20"
            />
          </div>
        </div>

        {/* Side summaries invoices */}
        <div className="col-span-1 border border-zinc-200 p-5 rounded bg-zinc-50/50 space-y-4 font-sans">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-400 uppercase font-black tracking-widest">Calculated Payouts</span>
            <h3 className="font-bold text-xs text-zinc-950">Refund Summary Details</h3>
          </div>

          <div className="space-y-2 border-b border-zinc-200 pb-3 font-mono text-[10px] text-zinc-500 leading-normal">
            <div className="flex gap-2">
              <WireframePlaceholder className="w-8 h-8 rounded shrink-0" text="WATCH" />
              <div>
                <h4 className="font-bold text-zinc-900">Precision Chrono Watch</h4>
                <p>1 x SGD 450.00 • Midnight Black</p>
              </div>
            </div>
            <div className="flex gap-2">
              <WireframePlaceholder className="w-8 h-8 rounded shrink-0" text="STRAP" />
              <div>
                <h4 className="font-bold text-zinc-900">Minimalist Leather Strap</h4>
                <p>1 x SGD 85.00 • Tan Brown</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-[10.5px] text-zinc-650">
            <div className="flex justify-between">
              <span>Checkout Subtotal:</span>
              <span className="font-bold text-zinc-900">SGD 535.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Standard:</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="border-t border-zinc-200 pt-2 flex justify-between text-zinc-950 font-black">
              <span>Total Refund Amount:</span>
              <span>SGD 535.00</span>
            </div>
          </div>

          <button className="w-full py-2 bg-[#E11D48] text-white font-bold text-[10.5px] uppercase tracking-wider rounded hover:bg-red-700 transition-colors cursor-pointer text-center">
            ORDER CANCELLATION CONFIRMATION
          </button>
          <button className="w-full py-1.5 bg-zinc-200 text-zinc-700 font-bold text-[10px] uppercase rounded hover:bg-zinc-250 cursor-pointer">
            KEEP MY ORDER ACTIVE
          </button>
        </div>
      </div>
    </div>
  );

  // S08: Secure Checkout
  const renderCheckoutScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* SEC 1: Shipping Coordinates Section */}
        <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-6 rounded flex flex-col gap-5">
          <div className="space-y-1 pb-3 border-b border-zinc-150 select-none">
            <h1 className="text-base font-black font-sans uppercase text-zinc-950">Secure Checkout</h1>
            <p className="text-xs text-zinc-500 leading-normal font-sans">
              Provide recipient shipping details and complete scanning using SGP digital platforms to finalize your checkout balance ledger.
            </p>
          </div>

          {/* SEC 1 Shipping address details */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-sans">1. SINGAPORE DELIVERY LOCATION ADDRESS</h3>
            <div className="border border-zinc-200 p-4 rounded bg-zinc-50/30 flex justify-between items-start font-mono text-[10.5px] relative">
              <div className="space-y-1.5">
                <span className="font-bold text-zinc-950 block text-xs">Jonathan Tan</span>
                <p className="text-zinc-500 font-medium">88 Orchard Road, #12-04 ION Orchard, Singapore 238823</p>
                <p className="text-zinc-400 font-medium">Focal Contact: +65 9123 4567 • Estimated: 2-3 standard delivery days</p>
              </div>
              <button className="px-2.5 py-1 border border-zinc-300 text-zinc-700 text-[9px] font-bold rounded hover:bg-zinc-100 bg-white cursor-pointer uppercase shrink-0">
                Change Address
              </button>
            </div>
          </div>

          {/* SEC 3: Secure SG PayNow checkout QR Code box */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-[#E11D48] font-sans">2. SG PAYNOW FAST NET SYSTEM INTEGRATION</h3>
            
            <div className="border border-zinc-200 p-4 rounded bg-zinc-950 text-white flex flex-col sm:flex-row items-center gap-4">
              {/* PayNow QR scan generator */}
              <div className="w-24 h-24 bg-white border border-zinc-700 rounded relative flex items-center justify-center p-1 shrink-0 shadow-sm animate-pulse">
                <svg className="w-full h-full text-zinc-950" viewBox="0 0 100 100">
                  <rect x="8" y="8" width="22" height="22" fill="currentColor"></rect>
                  <rect x="70" y="8" width="22" height="22" fill="currentColor"></rect>
                  <rect x="8" y="70" width="22" height="22" fill="currentColor"></rect>
                  <rect x="14" y="14" width="10" height="10" fill="white"></rect>
                  <rect x="76" y="14" width="10" height="10" fill="white"></rect>
                  <rect x="14" y="76" width="10" height="10" fill="white"></rect>
                  <rect x="35" y="35" width="30" height="30" fill="currentColor"></rect>
                  <rect x="42" y="42" width="16" height="16" fill="white"></rect>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#E11D48] text-white font-black font-mono text-[7px] px-1 py-0.2 rounded uppercase tracking-wider">
                    PAYNOW
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 font-sans">
                <h4 className="font-bold text-sm text-zinc-100">Frictionless Scan & Pay Now</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed leading-normal">
                  UEN Merchant node generated. Simply scan using DBS PayLah, OCBC Digital or UOB TMRW apps inside Singapore to lock stock inventories immediately. Auto-validates payment in milliseconds.
                </p>
                <span className="font-mono text-[9px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                  UEN MERCHANT LOCK: RETAILSG_SGP_2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEC 4: Sticky summaries black card totals */}
        <div className="col-span-1 space-y-4">
          <div className="border border-zinc-200 bg-white p-5 rounded space-y-4 shadow-sm">
            <h3 className="font-mono text-[10px] font-black uppercase text-zinc-450">Fulfillment Tiers</h3>
            
            {/* Delivery tiers options */}
            <div className="grid grid-cols-1 gap-2">
              <label 
                onClick={() => setDelivSpeed('standard')}
                className={`border p-3 rounded flex items-center justify-between cursor-pointer select-none transition-all ${
                  delivSpeed === 'standard' 
                    ? 'border-zinc-950 bg-zinc-50' 
                    : 'border-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <input type="radio" checked={delivSpeed === 'standard'} onChange={() => {}} className="accent-zinc-950" />
                  <div>
                    <span className="font-bold block text-zinc-900 font-sans">Standard Postal Code Delivery</span>
                    <span className="text-zinc-400 text-[9.5px]">2-4 business fulfillment days</span>
                  </div>
                </div>
                <span className="font-mono text-zinc-850 font-bold text-[9.5px]">FREE</span>
              </label>

              <label 
                onClick={() => setDelivSpeed('collect')}
                className={`border p-3 rounded flex items-center justify-between cursor-pointer select-none transition-all ${
                  delivSpeed === 'collect' 
                    ? 'border-zinc-950 bg-zinc-50 font-bold' 
                    : 'border-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <input type="radio" checked={delivSpeed === 'collect'} onChange={() => {}} className="accent-zinc-950" />
                  <div>
                    <span className="font-bold block text-zinc-900 font-sans">Click & Collect Orchard Store</span>
                    <span className="text-zinc-400 text-[9.5px]">Instant pickup coordination</span>
                  </div>
                </div>
                <span className="font-mono text-zinc-850 text-[9.5px]">SGD 12.00</span>
              </label>
            </div>
          </div>

          <div className="border border-zinc-900 bg-[#18181B] text-white p-5 rounded space-y-4 relative leading-none shadow-md">
            <span className="text-[10px] font-mono font-bold text-zinc-450 uppercase block border-b border-zinc-800 pb-2">
              Secure Ledger calculations
            </span>

            <div className="space-y-3 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-zinc-501 text-zinc-400">Total Sourced Items Value:</span>
                <span className="font-bold text-zinc-100">SGD 1,240.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Singapore Delivery Fee:</span>
                <span className="text-zinc-100">FREE</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated GST Rate (9%):</span>
                <span className="text-zinc-100 font-bold">SGD 111.60</span>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between text-white font-extrabold text-xs">
                <span>GRAND SETTLED TOTAL:</span>
                <span className="text-[#E11D48] text-sm">SGD 1,351.60</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-white text-zinc-950 font-sans font-black text-xs uppercase tracking-widest rounded hover:bg-zinc-100 transition-colors mt-3">
              Place Order (SGD 1,351.60)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // S09: Thank You Screen
  const renderThankYouScreen = () => (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      {/* SEC 1: Success message Header banner */}
      <div className="border border-zinc-200 bg-white p-6 rounded text-center space-y-3 max-w-2xl mx-auto flex flex-col items-center shadow-xs">
        <CheckCircle2 size={36} className="text-zinc-950 stroke-[2.5]" />
        <h1 className="text-base font-black font-sans tracking-tight uppercase text-zinc-950">
          Payment Confirmed Successfully
        </h1>
        <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-lg">
          Thank you for shopping with RETAIL_SG. Your digital invoice transactions are locked, and your product parcels have been released for custom logistics delivery.
        </p>
        <span className="inline-block bg-zinc-100 text-zinc-900 font-mono text-[9.5px] px-2.5 py-0.5 rounded font-black border border-zinc-200">
          ORDER TRACK TOKEN: #SG-99284-2026-UEN
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* SEC 4: SingPost logistics live tracking timeline */}
        <div className="col-span-1 md:col-span-2 border border-zinc-200 bg-white p-6 rounded flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-zinc-900 font-mono border-b pb-1">
            SingPost Logistics Delivery Milestones
          </h3>
          
          <div className="space-y-4 font-mono text-[10.5px]">
            {[
              { id: '1', title: 'Payment Validated & Invoiced', desc: 'Secure payment scanned using PayNow Singapore gateways UEN verified.', done: true, date: '12 May, 01:10 PM' },
              { id: '2', title: 'Acoustic Headset Packaged & Dispatched', desc: 'Released for fulfillment from SGP central warehouse, tracking token assigned.', done: true, date: '14 May, 08:30 AM' },
              { id: '3', title: 'Arrived at SingPost Sorting Hub', desc: 'Sorting coordinates approved for Orchard region delivery dispatch.', done: false, date: 'Pending tracking' },
              { id: '4', title: 'Fulfillment Handover Complete', desc: 'Handed over securely to recipient: Jonathan Tan (88 Orchard Rd).', done: false, date: 'Estimated: 16 May' }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-3 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${step.done ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-300 border border-zinc-200'}`}>
                    {step.done ? <Check size={11} /> : step.id}
                  </div>
                  {idx < 3 && <div className="w-0.5 h-12 bg-zinc-100 mt-1"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h4 className={`font-bold ${step.done ? 'text-zinc-950' : 'text-zinc-400 font-medium'}`}>{step.title}</h4>
                    <span className="text-[8.5px] text-zinc-400">{step.date}</span>
                  </div>
                  <p className="text-[9.5px]/relaxed text-zinc-500 font-sans mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEC 5: Support checklist coordinates */}
        <div className="col-span-1 border border-zinc-250 p-5 rounded bg-zinc-50/50 space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-xs text-zinc-900 font-sans">Need Customer Assistance?</h3>
            <p className="text-[9.5px] text-zinc-450 font-sans mt-0.5">Connect straight to Singapore operations delivery team</p>
          </div>

          <div className="space-y-2.5 font-mono text-[10px] text-zinc-650">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-zinc-900" />
              <span>operations@retailsg.com.sg</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-zinc-900" />
              <span>Mon - Sun: 09:00 - 21:00 SGT</span>
            </div>
          </div>

          <p className="text-[9.5px] leading-relaxed text-zinc-500 font-sans">
            Quote your track token <strong>#SG-99284-2026-UEN</strong> for priority hotlines routing support checks.
          </p>

          <button className="w-full py-2 bg-zinc-950 text-white font-bold text-[10.5px] uppercase tracking-wider rounded cursor-pointer text-center hover:bg-zinc-850">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  // S10: Store Locator Screen
  const renderStoreScreen = () => {
    const STORES = [
      {
        id: 1,
        name: 'RETAIL_SG Flagship Orchard Road',
        region: 'Central',
        mall: 'ION Orchard',
        distance: 1.2,
        address: '2 Orchard Turn, #B4-12, Singapore 238801',
        phone: '+65 6789 0123',
        open: '10:00 AM - 10:00 PM',
        status: 'Active / Pickup slots available',
        x: 48,
        y: 55
      },
      {
        id: 2,
        name: 'RETAIL_SG Marina Bay Sands Special',
        region: 'Central',
        mall: 'The Shoppes at MBS',
        distance: 2.8,
        address: '10 Bayfront Ave, #B2-45, Singapore 018956',
        phone: '+65 6789 4556',
        open: '10:00 AM - 10:30 PM',
        status: 'Active / High stock levels',
        x: 55,
        y: 62
      },
      {
        id: 3,
        name: 'RETAIL_SG Eastside Tech Jeweller',
        region: 'East',
        mall: 'Jewel Changi',
        distance: 18.5,
        address: '78 Airport Blvd, #03-220, Singapore 819666',
        phone: '+65 6789 9876',
        open: '10:00 AM - 10:00 PM',
        status: 'Active / Instant Collection',
        x: 88,
        y: 42
      },
      {
        id: 4,
        name: 'RETAIL_SG Westgate Mall Express',
        region: 'West',
        mall: 'Westgate Jurong',
        distance: 12.1,
        address: '3 Gateway Dr, #01-18, Singapore 608532',
        phone: '+65 6789 2210',
        open: '10:00 AM - 10:00 PM',
        status: 'Active / Call to check availability',
        x: 15,
        y: 51
      },
      {
        id: 5,
        name: 'RETAIL_SG Northpoint City Outlet',
        region: 'North',
        mall: 'Northpoint City',
        distance: 14.8,
        address: '930 Yishun Ave 2, #02-05, Singapore 769098',
        phone: '+65 6789 3345',
        open: '10:00 AM - 10:00 PM',
        status: 'Active / Collect Tomorrow',
        x: 45,
        y: 18
      }
    ];

    const filteredStores = STORES.filter(store => {
      if (selectedDistance !== 'all') {
        const maxDist = parseFloat(selectedDistance);
        if (store.distance > maxDist) return false;
      }
      if (selectedRegion !== 'all' && store.region !== selectedRegion) return false;
      if (selectedMall !== 'all' && store.mall !== selectedMall) return false;
      return true;
    });

    const activeStore = STORES.find(s => s.id === activeStoreId) || STORES[0];

    return (
      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 select-none font-sans bg-white">
        
        {/* SEC 1: Dropdown Filters Bar */}
        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-mono font-black text-[#E11D48] uppercase tracking-wider flex items-center gap-1.5">
              <span>● SEC 1: STORE SEARCH FILTER DIRECTORY</span>
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">Choose proximity radii, regional sectors, or specific shopping center complexes to search offline pickup coordinates.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Khoảng cách (Distance)</label>
              <select 
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-full bg-white border border-zinc-200 p-2 rounded text-xs text-zinc-950 font-medium focus:ring-1 focus:ring-zinc-950 outline-none h-9"
              >
                <option value="all">Trong mọi khoảng cách (All Distances)</option>
                <option value="3">Dưới 3 km (&lt; 3km)</option>
                <option value="13">Dưới 13 km (&lt; 13km)</option>
                <option value="15">Dưới 15 km (&lt; 15km)</option>
                <option value="20">Dưới 20 km (&lt; 20km)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Khu vực (Region Zone)</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white border border-zinc-200 p-2 rounded text-xs text-zinc-950 font-medium focus:ring-1 focus:ring-zinc-950 outline-none h-9"
              >
                <option value="all">Tất cả khu vực (All Regions)</option>
                <option value="Central">Central Sector</option>
                <option value="East">East Sector</option>
                <option value="West">West Sector</option>
                <option value="North">North Sector</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Trung tâm thương mại (Mall)</label>
              <select 
                value={selectedMall}
                onChange={(e) => setSelectedMall(e.target.value)}
                className="w-full bg-white border border-zinc-200 p-2 rounded text-xs text-zinc-950 font-medium focus:ring-1 focus:ring-zinc-950 outline-none h-9"
              >
                <option value="all">Tất cả trung tâm mua sắm (All Malls)</option>
                <option value="ION Orchard">ION Orchard</option>
                <option value="The Shoppes at MBS">The Shoppes at MBS</option>
                <option value="Jewel Changi">Jewel Changi</option>
                <option value="Westgate Jurong">Westgate Jurong</option>
                <option value="Northpoint City">Northpoint City</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic List and Map Sections wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* SEC 2: List of Outlets (Left Column) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-3 min-h-[450px]">
            <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center justify-between">
              <span>● SEC 2: LISTED STORES ({filteredStores.length})</span>
              {filteredStores.length > 0 && <span className="text-[9px] bg-zinc-200 text-zinc-650 px-1.5 py-0.2 rounded-xs">FILTERED SGP INDEX</span>}
            </h3>

            <div className="flex-1 overflow-y-auto max-h-[420px] scrollbar-thin border border-zinc-200 rounded p-1.5 bg-zinc-50/50 space-y-2.5">
              {filteredStores.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 bg-white rounded border border-dashed border-zinc-200">
                  <AlertCircle size={24} className="text-zinc-300" />
                  <p className="text-xs font-bold text-zinc-650 font-sans">Không tìm thấy cửa hàng phù hợp (No Stores Found)</p>
                  <p className="text-[10px] text-zinc-400 font-sans">Hãy điều chỉnh lại bộ lọc bán kính hoặc phân vùng khu vực của bạn.</p>
                  <button 
                    onClick={() => { setSelectedDistance('all'); setSelectedRegion('all'); setSelectedMall('all'); }}
                    className="mt-2 px-3 py-1 bg-zinc-950 text-white rounded text-[10px] font-mono uppercase font-bold cursor-pointer"
                  >
                    Reset Bộ lọc (Clear)
                  </button>
                </div>
              ) : (
                filteredStores.map((store) => {
                  const isActive = activeStoreId === store.id;
                  return (
                    <div 
                      key={store.id}
                      onClick={() => setActiveStoreId(store.id)}
                      className={`p-3 border rounded cursor-pointer transition-all ${
                        isActive 
                          ? 'border-[#E11D48] bg-zinc-900 text-white shadow-sm' 
                          : 'border-zinc-200 bg-white hover:border-zinc-400 text-zinc-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <span className={`text-[8.5px] font-mono font-black uppercase px-1.5 py-0.2 rounded-xs ${isActive ? 'bg-[#E11D48] text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                              {store.region} SG
                            </span>
                            <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded-xs border ${isActive ? 'border-zinc-700 bg-zinc-800 text-zinc-300' : 'border-zinc-200 bg-zinc-50 text-zinc-500'}`}>
                              {store.distance} km
                            </span>
                          </div>
                          <h4 className="font-sans font-bold text-xs">{store.name}</h4>
                        </div>
                        <MapPin size={14} className={isActive ? 'text-[#E11D48]' : 'text-zinc-400'} />
                      </div>
                      
                      <div className="mt-3 space-y-1 text-[10px] leading-relaxed">
                        <p className={isActive ? 'text-zinc-300' : 'text-zinc-500'}>
                          <strong className={isActive ? 'text-zinc-100' : 'text-zinc-700'}>Địa chỉ:</strong> {store.address}
                        </p>
                        <p className={isActive ? 'text-zinc-300' : 'text-zinc-500'}>
                          <strong className={isActive ? 'text-zinc-100' : 'text-zinc-700'}>Hotline:</strong> {store.phone}
                        </p>
                        <p className={isActive ? 'text-zinc-300' : 'text-zinc-500'}>
                          <strong className={isActive ? 'text-zinc-100' : 'text-zinc-700'}>Mở cửa:</strong> {store.open}
                        </p>
                      </div>

                      <div className={`mt-3 pt-2 border-t text-[9px] font-bold uppercase tracking-wider flex items-center justify-between ${isActive ? 'border-zinc-850 text-emerald-400' : 'border-zinc-100 text-emerald-700'}`}>
                        <span>{store.status}</span>
                        {isActive && <span className="text-[9px] text-[#E11D48] font-mono font-black animate-pulse">● SELECT</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* SEC 3: Interactive Geographic Map Canvas Section (Right Column) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-3 min-h-[450px]">
            <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center justify-between">
              <span>● SEC 3: MAP VISUALIZER SECTION</span>
              <span className="text-[9px] text-zinc-400 font-normal font-sans">Click pins to match items database</span>
            </h3>

            {/* Simulated Vector Singapore Map canvas container */}
            <div className="flex-1 bg-zinc-50 border border-zinc-250 rounded p-4 relative flex flex-col justify-between overflow-hidden shadow-xs min-h-[380px]">
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px]"></div>

              <div className="absolute bottom-3 left-4 text-[9px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest select-none">
                SINGAPORE STRAIT
              </div>
              <div className="absolute top-3 left-4 text-[9px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest select-none">
                JOHOR STRAIT
              </div>

              {/* Singapore SVG outline as Map Background */}
              <div className="absolute inset-0 top-6 pointer-events-none flex items-center justify-center opacity-10">
                <svg viewBox="0 0 800 450" className="w-full h-full max-w-full max-h-full">
                  <path 
                    d="M 120 230 C 130 180, 200 150, 320 140 C 450 130, 520 110, 680 120 C 740 120, 780 160, 790 200 C 800 240, 750 280, 700 300 C 650 310, 500 320, 410 330 C 320 340, 210 350, 160 330 C 120 310, 110 270, 120 230" 
                    fill="#18181b" 
                    stroke="#18181b" 
                    strokeWidth="3"
                  />
                  <polygon points="50,110 90,120 95,140 60,150" fill="#18181b" />
                  <polygon points="720,320 750,330 760,350 730,360" fill="#18181b" />
                </svg>
              </div>

              {/* Interactive Point Pins on Simulated Map Frame */}
              {STORES.map((pin) => {
                let complies = true;
                if (selectedDistance !== 'all') {
                  const maxDist = parseFloat(selectedDistance);
                  if (pin.distance > maxDist) complies = false;
                }
                if (selectedRegion !== 'all' && pin.region !== selectedRegion) complies = false;
                if (selectedMall !== 'all' && pin.mall !== selectedMall) complies = false;

                const isCurrentActive = activeStoreId === pin.id;

                return (
                  complies && (
                    <button
                      key={pin.id}
                      onClick={() => {
                        setActiveStoreId(pin.id);
                        setToastMessage(`Đã chọn: ${pin.name}`);
                      }}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group z-30 ${
                        isCurrentActive ? 'scale-115 z-40' : 'scale-100 hover:scale-110'
                      }`}
                    >
                      <span className={`relative flex h-6 w-6 rounded-full items-center justify-center shadow border ${
                        isCurrentActive 
                          ? 'bg-[#E11D48] border-white text-white font-mono text-[9px] font-bold' 
                          : 'bg-zinc-950 border-zinc-700 text-zinc-100 font-mono text-[9px] font-bold'
                      }`}>
                        <MapPin size={11} className={isCurrentActive ? 'animate-bounce' : ''} />
                      </span>
                      
                      <div className={`mt-0.5 bg-zinc-950 text-white font-mono text-[8px] px-1.5 py-0.5 rounded border border-zinc-850 shadow whitespace-nowrap leading-none transition-all ${
                        isCurrentActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'
                      }`}>
                        {pin.mall}
                      </div>
                    </button>
                  )
                );
              })}

              <div className="absolute top-2 right-2 bg-white/90 border border-zinc-200 p-2 rounded shadow-2xs max-w-[170px] z-10 font-mono text-[8.5px] text-zinc-500 space-y-0.5">
                <span className="font-bold text-zinc-800 uppercase block border-b border-zinc-100 pb-0.5">SGP RADAR GPS</span>
                <p>System: WGS84 EPSG</p>
                <p>Status: <span className="text-emerald-600 font-bold">Online</span></p>
                <p>Matches: <span className="text-[#E11D48] font-black">{filteredStores.length} outlets</span></p>
              </div>

              {/* Store Detail HUD Card under the Map */}
              <div className="mt-auto bg-zinc-950 border border-zinc-850 text-white rounded p-3 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1 py-0.2 bg-[#E11D48] rounded text-[8px] font-mono tracking-widest font-black uppercase text-white">SELECTED OUTLET HUB</span>
                    <span className="text-[9.5px] text-amber-400 font-mono font-bold">★ {activeStore.distance} km away</span>
                  </div>
                  <h4 className="font-bold text-xs font-sans text-zinc-100 leading-tight">{activeStore.name}</h4>
                  <p className="text-[9.5px] text-zinc-400 font-sans">{activeStore.address}</p>
                </div>

                <div className="flex flex-row sm:flex-col gap-1.5 shrink-0 w-full sm:w-auto">
                  <button 
                    onClick={() => setToastMessage(`Chỉ đường GPS đến: ${activeStore.name}`)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-[#E11D48] hover:bg-red-700 text-white rounded text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer"
                  >
                    Chỉ đường
                  </button>
                  <button 
                    onClick={() => setToastMessage(`Đã chọn phương án nhận hàng tại outlet: ${activeStore.mall}`)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer"
                  >
                    Chọn pickup
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    );
  };

  // S11: Wishlist Screen
  const renderWishlistScreen = () => {
    const handleRemoveWishItem = (name: string) => {
      setWishlistProducts(prev => prev.filter(p => p.name !== name));
      setToastMessage(`Đã xoá thành công: ${name}`);
    };

    const REC_PRODUCTS = [
      {
        name: 'Space Grey Dual-Port USB-C Hub 8-in-1 SGP Plus',
        category: 'ELECTRONICS ACC',
        price: 89.00,
        originalPrice: 119.00,
        rating: 4.8,
        reviews: 420,
        status: 'in_stock',
        tag: 'Often purchased together'
      },
      {
        name: 'Silicon Armour Protective Carrying Headset Case Noir',
        category: 'PROTECTIONS',
        price: 45.00,
        originalPrice: 59.00,
        rating: 4.7,
        reviews: 130,
        status: 'low_stock',
        tag: 'Headset addon match'
      },
      {
        name: 'Premium Alcantara Comfort Cushion Set (Pair)',
        category: 'SPARES & UPGRADES',
        price: 79.00,
        originalPrice: 99.00,
        rating: 4.9,
        reviews: 80,
        status: 'in_stock',
        tag: 'Premium upgrade match'
      },
      {
        name: 'Desktop Workspace Felt Desk Mat XL (100x40)',
        category: 'WORKSPACE COMFORT',
        price: 39.00,
        originalPrice: 65.00,
        rating: 4.6,
        reviews: 310,
        status: 'in_stock',
        tag: 'Based on chair specs search'
      }
    ];

    return (
      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 select-none font-sans bg-white">
        
        {/* SEC 1 & 2: Active Wishlist Items Grid */}
        <div className="space-y-4">
          <div className="flex flex-col gap-0.5 border-b border-zinc-100 pb-2">
            <h3 className="text-xs font-mono font-black text-[#E11D48] tracking-widest uppercase">
              ● SEC 1: SAVED WISHLIST GRID ({wishlistProducts.length} ARTICLES)
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">Tracks warehouse availability (In Stock, Low In Stock, Out of Stock). Conditional action block disables depleted stock cart additions.</p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-zinc-50 rounded border border-dashed border-zinc-200">
              <Heart size={28} className="text-zinc-300 animate-pulse" />
              <p className="text-xs font-bold text-zinc-600">Wishlist is currently empty</p>
              <p className="text-[10px] text-zinc-400 max-w-sm">Search and explore our seasonal discount laptop grids to fill your wishlist ledger records.</p>
              <button 
                onClick={() => {
                  setWishlistProducts([
                    { name: 'AERO-X Pro Wireless Headphones', price: 499.00, rating: 4.8, reviews: 1240, status: 'in_stock', type: 'HEADPHONES' },
                    { name: 'High-Performance Speed Mouse X', price: 129.00, rating: 4.6, reviews: 450, status: 'low_stock', type: 'SPEED MOUSE' },
                    { name: 'Ultra Pro Laptop Sleek Case (14-inch)', price: 89.00, rating: 4.5, reviews: 180, status: 'out_stock', type: 'LAPTOP SLEEVE' },
                    { name: 'Ergonomic Workspace Office Desk Cushion', price: 59.50, rating: 4.7, reviews: 230, status: 'in_stock', type: 'DESK CUSHION' }
                  ]);
                  setToastMessage("Wishlist items successfully restored");
                }}
                className="px-4 py-1.5 bg-zinc-950 text-white rounded text-[10px] font-mono uppercase font-bold cursor-pointer hover:bg-zinc-800"
              >
                Restore Default Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((item) => {
                const isOutOfStock = item.status === 'out_stock';
                return (
                  <div 
                    key={item.name}
                    className={`relative border rounded p-4 flex flex-col justify-between h-[340px] transition-all duration-200 ${
                      isOutOfStock ? 'border-zinc-200 bg-zinc-50/60' : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="space-y-2 relative">
                      <div className="relative">
                        <WireframePlaceholder className={`w-full h-28 rounded flex items-center justify-center ${isOutOfStock ? 'opacity-40' : ''}`} text={item.type} />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-white/10 flex items-center justify-center rounded">
                            <span className="bg-zinc-950/80 text-white font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded-xs select-none">
                              OUT OF STOCK / DISABLE
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[8.5px] font-mono text-zinc-400 font-bold tracking-tight">{item.type}</span>
                        {renderStockTag(isOutOfStock ? 'out_of_stock' : item.status as any)}
                      </div>

                      <h4 className={`font-sans font-bold text-xs leading-tight line-clamp-2 ${isOutOfStock ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
                        {item.name}
                      </h4>

                      <div className="flex items-center justify-between">
                        <p className={`font-mono text-xs font-black ${isOutOfStock ? 'text-zinc-400' : 'text-[#E11D48]'}`}>
                          SGD {item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-0.5 font-mono text-[9px] text-zinc-500">
                          <Star size={9} className="text-amber-500 fill-amber-500" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Section: Disabled if Out Of Stock, ONLY Remove active */}
                    <div className="pt-3 border-t border-zinc-100 flex gap-1.5 w-full mt-3">
                      <button
                        onClick={() => {
                          if (!isOutOfStock) {
                            setToastMessage(`Đã thêm vào giỏ: ${item.name}`);
                          }
                        }}
                        disabled={isOutOfStock}
                        className={`flex-1 py-1.5 text-[9.5px] uppercase font-bold font-mono tracking-wide rounded text-center transition-colors ${
                          isOutOfStock
                            ? 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed'
                            : 'bg-zinc-950 hover:bg-zinc-850 text-white cursor-pointer'
                        }`}
                      >
                        {isOutOfStock ? 'Disabled' : 'Add to Cart'}
                      </button>

                      <button
                        onClick={() => handleRemoveWishItem(item.name)}
                        className="p-1.5 border border-zinc-200 text-zinc-400 hover:text-[#E11D48] hover:border-red-200 rounded transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SEC 3: Recommends for you section based on user behavior */}
        <div className="space-y-4 pt-4 border-t border-zinc-100">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xs font-mono font-black text-zinc-500 tracking-widest uppercase">
              ● SEC 3: RECOMMENDS FOR YOU SECTION
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">
              Personalized items suggested based custom analytics of previous click-through patterns and head-wear specs verification logs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REC_PRODUCTS.map((rec) => (
              <div 
                key={rec.name}
                className="border border-zinc-200 bg-white rounded p-4 flex flex-col justify-between h-[340px] hover:border-zinc-300 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 bg-[#E11D48] text-white font-mono text-[7px] font-black uppercase px-2 py-0.5 tracking-wider rounded-bl">
                  {rec.status === 'low_stock' ? 'URGENT' : 'BEHAVIOR MATCH'}
                </div>

                <div className="space-y-1.5">
                  <WireframePlaceholder className="w-full h-28 rounded" text={rec.category} />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] font-mono text-zinc-400 font-bold uppercase">{rec.category}</span>
                    {renderStockTag(rec.status as any)}
                  </div>

                  <h4 className="font-sans font-bold text-xs leading-tight line-clamp-2 text-zinc-900 group-hover:text-[#E11D48] transition-colors">
                    {rec.name}
                  </h4>

                  <span className="block text-[8.5px] font-sans text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-xs w-fit font-medium">
                    {rec.tag}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <p className="font-mono text-xs font-black text-zinc-950">SGD {rec.price.toFixed(2)}</p>
                    <p className="font-mono text-[10px] text-zinc-400 line-through font-medium">SGD {rec.originalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex gap-2 mt-3.5">
                  <button 
                    onClick={() => setToastMessage(`Đã thêm đề cử: ${rec.name}`)}
                    className="w-full py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-colors rounded text-[9.5px] font-mono font-bold uppercase tracking-wider text-center cursor-pointer"
                  >
                    Quick Add to Cart
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  // S12: Profile Screen
  // S12: Profile Screen
  const renderProfileScreen = () => {
    if (!isUserLoggedIn) {
      return (
        <div className="p-8 flex flex-col items-center justify-center min-h-[420px] select-none font-sans bg-white border border-zinc-200 rounded m-6 shadow-xs animate-fade-in text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-250">
            <User size={28} />
          </div>
          <h3 className="font-extrabold text-sm uppercase text-zinc-950 tracking-tight mb-2">Sign-In Required</h3>
          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-6">
            You are not logged into RETAIL_SG. Please select the <strong className="text-[#E11D48] font-mono font-black">S13 Auth Portal</strong> tab in the navigation above to sign in or create a new account.
          </p>
          <div className="bg-zinc-50 border border-zinc-200 p-4 rounded text-[10px] text-zinc-500 font-mono space-y-1 w-full max-w-sm text-left">
            <span className="font-black text-zinc-800 uppercase block mb-1.5 pb-1 border-b border-zinc-200">Demo Testing Credentials:</span>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="text-zinc-950 font-bold">GiaHanHoang2001@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span>Password:</span>
              <span className="text-zinc-950 font-bold">MySecurePass123!</span>
            </div>
          </div>
        </div>
      );
    }

    const ORDERS_DB = [
      { id: 'O-2026-8810', item: 'AERO-X Pro Wireless Headset (Noir)', status: 'delivery', statusText: 'Chờ giao hàng (In Transit via SingPost Express)', price: 499.00, date: '26/05/2026', itemsCount: 1 },
      { id: 'O-2026-9931', item: 'High Performance Laptop Ultra Pro X1', status: 'pending', statusText: 'Chờ thanh toán (Awaiting PayNow QR Verification)', price: 1899.00, date: '27/05/2026', itemsCount: 1 },
      { id: 'O-2026-5520', item: 'Ergonomic Office Chair Comfort Master', status: 'pickup', statusText: 'Chờ lấy hàng (Ready at ION Orchard Complex Floor 4)', price: 349.00, date: '25/05/2026', itemsCount: 1 },
      { id: 'O-2026-1105', item: 'Ultra Slim Tech Accessories Mat XL', status: 'rate', statusText: 'Chờ đánh giá (Delivered successfully, awaiting feedback score)', price: 49.00, date: '20/05/2026', itemsCount: 2 },
      { id: 'O-2026-0545', item: 'Precision Active Pro Aluminum Stylus Pen', status: 'rate', statusText: 'Chờ đánh giá (Delivered successfully, awaiting feedback score)', price: 79.50, date: '18/05/2026', itemsCount: 1 }
    ];

    const filteredOrders = activeOrderStatusFilter === 'all'
      ? ORDERS_DB
      : ORDERS_DB.filter(order => order.status === activeOrderStatusFilter);

    const countPending = ORDERS_DB.filter(o => o.status === 'pending').length;
    const countPickup = ORDERS_DB.filter(o => o.status === 'pickup').length;
    const countDelivery = ORDERS_DB.filter(o => o.status === 'delivery').length;
    const countRate = ORDERS_DB.filter(o => o.status === 'rate').length;

    // Mini avatar helper
    const userInitials = authName
      ? authName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';

    return (
      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 select-none font-sans bg-white">
        
        {/* SEC 1: User Profile Header Block */}
        <div className="border border-zinc-200 bg-zinc-50 p-5 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-3xs">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 text-white flex items-center justify-center font-mono font-black text-lg shadow-sm relative shrink-0">
              {userInitials}
              <span className="absolute bottom-0 right-1 border-2 border-zinc-50 w-3 h-3 bg-emerald-500 rounded-full"></span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm text-zinc-900 leading-none">{authName}</h3>
                <span className="px-2 py-0.5 bg-[#E11D48] text-white font-mono text-[7.5px] font-black uppercase tracking-wider rounded-xs">
                  Platinum Elite VIP
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans leading-none tracking-tight">Email: {authEmail}</p>
              <p className="text-[10px] text-zinc-500 font-sans tracking-tight font-sans">Phone: +65 {authPhone}</p>
              <p className="text-[10.5px] text-zinc-650 leading-tight font-sans">
                Address: #14-20 Orchard Boulevard Tower A, Singapore 237973
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:text-right font-mono text-[9px] text-zinc-400 border-t sm:border-t-0 border-zinc-200 pt-3 sm:pt-0 w-full sm:w-auto shrink-0 items-start sm:items-end">
            <span className="font-extrabold uppercase text-zinc-500 tracking-widest leading-none">CORE AUDIT ACCOUNT:</span>
            <span className="font-sans font-bold text-[#E11D48] mt-0.5">Lead UX Specification Auditor</span>
            <span className="text-zinc-500 text-[8.5px] mt-0.5 uppercase">UEN SGP REGISTERED LOGS</span>
            <button
              onClick={() => {
                setIsUserLoggedIn(false);
                setToastMessage("Successfully logged out of RETAIL_SG!");
              }}
              className="mt-3 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-[9px] uppercase font-black px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              Log Out
            </button>
          </div>

        </div>

        {/* SEC 2: Orders Section with dynamic filters */}
        <div className="space-y-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xs font-mono font-black text-[#E11D48] uppercase tracking-widest flex items-center gap-1.5">
              <span>● SEC 2: HISTORICAL PURCHASES REGISTRY</span>
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">View purchase status counters totals. Clicking status categories re-filters logistics records inside of table layouts below.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => setActiveOrderStatusFilter(activeOrderStatusFilter === 'pending' ? 'all' : 'pending')}
              className={`p-3 border rounded text-left flex justify-between items-center transition-all cursor-pointer ${
                activeOrderStatusFilter === 'pending'
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-900'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[9px] uppercase font-mono font-black leading-none ${activeOrderStatusFilter === 'pending' ? 'text-white' : 'text-zinc-500'}`}>
                  Chờ mua hàng
                </span>
                <p className={`text-[9.5px] font-sans ${activeOrderStatusFilter === 'pending' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  Wait PayNow
                </p>
              </div>
              <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                activeOrderStatusFilter === 'pending' ? 'bg-white text-[#E11D48]' : 'bg-zinc-100 text-zinc-800'
              }`}>{countPending}</span>
            </button>

            <button 
              onClick={() => setActiveOrderStatusFilter(activeOrderStatusFilter === 'pickup' ? 'all' : 'pickup')}
              className={`p-3 border rounded text-left flex justify-between items-center transition-all cursor-pointer ${
                activeOrderStatusFilter === 'pickup'
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-900'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[9px] uppercase font-mono font-black leading-none ${activeOrderStatusFilter === 'pickup' ? 'text-white' : 'text-zinc-500'}`}>
                  Chờ lấy hàng
                </span>
                <p className={`text-[9.5px] font-sans ${activeOrderStatusFilter === 'pickup' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  Ready Pickup
                </p>
              </div>
              <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                activeOrderStatusFilter === 'pickup' ? 'bg-white text-[#E11D48]' : 'bg-zinc-100 text-zinc-800'
              }`}>{countPickup}</span>
            </button>

            <button 
              onClick={() => setActiveOrderStatusFilter(activeOrderStatusFilter === 'delivery' ? 'all' : 'delivery')}
              className={`p-3 border rounded text-left flex justify-between items-center transition-all cursor-pointer ${
                activeOrderStatusFilter === 'delivery'
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-900'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[9px] uppercase font-mono font-black leading-none ${activeOrderStatusFilter === 'delivery' ? 'text-white' : 'text-zinc-500'}`}>
                  Chờ giao hàng
                </span>
                <p className={`text-[9.5px] font-sans ${activeOrderStatusFilter === 'delivery' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  In Logistics
                </p>
              </div>
              <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                activeOrderStatusFilter === 'delivery' ? 'bg-white text-[#E11D48]' : 'bg-zinc-100 text-zinc-800'
              }`}>{countDelivery}</span>
            </button>

            <button 
              onClick={() => setActiveOrderStatusFilter(activeOrderStatusFilter === 'rate' ? 'all' : 'rate')}
              className={`p-3 border rounded text-left flex justify-between items-center transition-all cursor-pointer ${
                activeOrderStatusFilter === 'rate'
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-900'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[9px] uppercase font-mono font-black leading-none ${activeOrderStatusFilter === 'rate' ? 'text-white' : 'text-zinc-500'}`}>
                  Đánh giá
                </span>
                <p className={`text-[9.5px] font-sans ${activeOrderStatusFilter === 'rate' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  To Be Rated
                </p>
              </div>
              <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                activeOrderStatusFilter === 'rate' ? 'bg-white text-[#E11D48]' : 'bg-zinc-100 text-zinc-800'
              }`}>{countRate}</span>
            </button>
          </div>

          {activeOrderStatusFilter !== 'all' && (
            <div className="flex items-center justify-between bg-zinc-50 px-3.5 py-1 rounded text-[10.5px] font-mono font-bold text-zinc-500 border border-zinc-200 mt-1">
              <span>Đang lọc theo: <strong className="text-[#E11D48] uppercase font-black">{activeOrderStatusFilter === 'pending' ? 'Chờ mua hàng' : activeOrderStatusFilter === 'pickup' ? 'Chờ lấy hàng' : activeOrderStatusFilter === 'delivery' ? 'Chờ giao hàng' : 'Yêu cầu Đánh giá'}</strong></span>
              <button 
                onClick={() => setActiveOrderStatusFilter('all')}
                className="text-[9px] bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded cursor-pointer hover:bg-zinc-950 hover:text-white transition-colors"
              >
                Hiện tất cả (Clear)
              </button>
            </div>
          )}

          <div className="border border-zinc-200 rounded p-1.5 bg-zinc-50/50 space-y-2">
            {filteredOrders.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 font-sans text-xs">Không tìm thấy đơn hàng nào ở trạng thái lọc này.</div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-3 bg-white border border-zinc-200 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:border-zinc-300 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-black tracking-widest text-[#E11D48] bg-red-50 border border-red-100 px-1.5 py-0.2 rounded">
                        {order.id}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">{order.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-zinc-950">{order.item}</h4>
                    <p className="text-[9.5px] text-zinc-500 font-mono tracking-tight flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                      Trạng thái: <strong className="text-zinc-700 uppercase">{order.statusText}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-zinc-100 pt-2 md:pt-0">
                    <div className="md:text-right leading-none">
                      <p className="text-[9px] text-zinc-400 uppercase font-mono font-bold">Invoiced SGD</p>
                      <p className="font-mono text-xs font-black text-zinc-950 mt-0.5">SGD {order.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      {order.status === 'rate' && (
                        <button 
                          onClick={() => setToastMessage(`Nhập bình luận đánh giá cho sản phẩm thuộc hoá đơn ${order.id}`)}
                          className="px-2.5 py-1 bg-[#E11D48] hover:bg-red-700 text-white font-bold text-[9px] font-mono uppercase rounded-xs transition-colors cursor-pointer"
                        >
                          Đánh giá (Rate)
                        </button>
                      )}
                      <button 
                        onClick={() => setToastMessage(`Tải hóa đơn PDF của đơn hàng ${order.id}`)}
                        className="px-2.5 py-1 border border-zinc-200 text-zinc-650 hover:bg-zinc-100 text-[9px] font-mono uppercase font-bold rounded-xs transition-colors cursor-pointer"
                      >
                        Hóa đơn (Receipt)
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SEC 3: User utilities (Tiện ích của tôi) */}
        <div className="space-y-4 pt-4 border-t border-zinc-100">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xs font-mono font-black text-zinc-500 tracking-widest uppercase">
              ● SEC 3: SECURED DIGITAL UTILITIES & WALLETS
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">Provides instant top-up store pocket wallet, accrued royalty points ledger points, and Kop-Voucher coupons folders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Store Wallet */}
            <div className="border border-zinc-200 bg-white rounded p-4 flex flex-col justify-between h-[150px] hover:border-zinc-300 shadow-3xs">
              <div className="space-y-0.5">
                <span className="text-[8.5px] font-mono font-bold tracking-wider text-zinc-400 uppercase">UTILITY CARD 01</span>
                <h4 className="font-sans font-bold text-xs text-zinc-900">Ví Cửa Hàng (Store Wallet)</h4>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight">Pay cashless using store balances for additional 2% checkout cash-back rewards.</p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-150 pt-2.5 mt-2 select-none">
                <div className="leading-none">
                  <span className="text-[8px] font-mono text-zinc-400 block font-bold uppercase">WALLET SAVING</span>
                  <span className="font-mono text-sm font-black text-[#E11D48] mt-0.5">SGD 245.50</span>
                </div>
                <button 
                  onClick={() => setToastMessage("Top-up ví cửa hàng thành công via PayNow QR")}
                  className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-850 text-white rounded text-[9px] font-mono uppercase font-bold cursor-pointer transition-colors"
                >
                  Nạp tiền (Top Up)
                </button>
              </div>
            </div>

            {/* Loyalty points */}
            <div className="border border-zinc-200 bg-white rounded p-4 flex flex-col justify-between h-[150px] hover:border-zinc-300 shadow-3xs">
              <div className="space-y-0.5">
                <span className="text-[8.5px] font-mono font-bold tracking-wider text-zinc-400 uppercase">UTILITY CARD 02</span>
                <h4 className="font-sans font-bold text-xs text-zinc-900">Điểm Tích Luỹ (Loyalty points)</h4>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight">Earn 1 loyalty point per SGD 1 spent. Points never expire, convert to promo codes.</p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-150 pt-2.5 mt-2 select-none">
                <div className="leading-none">
                  <span className="text-[8px] font-mono text-zinc-400 block font-bold uppercase">VIP POINTS ACCRUED</span>
                  <span className="font-mono text-sm font-black text-emerald-600 mt-0.5">1,250 PTS</span>
                </div>
                <button 
                  onClick={() => setToastMessage("Đã quy đổi 1,000 điểm lấy mã voucher giảm SGD10")}
                  className="px-2.5 py-1 border border-zinc-200 text-zinc-900 hover:bg-zinc-100 rounded text-[9px] font-mono uppercase font-bold cursor-pointer transition-colors"
                >
                  Đổi Quà (Redeem)
                </button>
              </div>
            </div>

            {/* Voucher vault */}
            <div className="border border-zinc-200 bg-white rounded p-4 flex flex-col justify-between h-[150px] hover:border-zinc-300 shadow-3xs">
              <div className="space-y-0.5">
                <span className="text-[8.5px] font-mono font-bold tracking-wider text-zinc-400 uppercase">UTILITY CARD 03</span>
                <h4 className="font-sans font-bold text-xs text-zinc-900">Kho Voucher (Voucher Vault)</h4>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight">Click coupon tabs inside the box folders below to copy discount codes directly.</p>
              </div>

              <div className="flex items-center gap-1.5 border-t border-zinc-150 pt-2.5 mt-2">
                <div 
                  onClick={() => {
                    setToastMessage("Voucher: ND58-58OFF copied!");
                    navigator.clipboard?.writeText?.("ND58-58OFF");
                  }}
                  className="flex-1 bg-zinc-50 border border-zinc-200 p-1 rounded cursor-pointer hover:border-[#E11D48] text-center"
                >
                  <p className="font-mono text-[8px] font-black tracking-tight text-[#E11D48]">ND58-58OFF</p>
                  <span className="text-[7px] font-sans text-zinc-400 uppercase block leading-none mt-0.5">58% Off</span>
                </div>
                <div 
                  onClick={() => {
                    setToastMessage("Voucher: FREE_SHIP copied!");
                    navigator.clipboard?.writeText?.("FREE_SHIP");
                  }}
                  className="flex-1 bg-zinc-50 border border-zinc-200 p-1 rounded cursor-pointer hover:border-[#E11D48] text-center"
                >
                  <p className="font-mono text-[8px] font-black tracking-tight text-[#E11D48]">FREE_SHIP</p>
                  <span className="text-[7px] font-sans text-zinc-400 uppercase block leading-none mt-0.5">Free standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // S13: Authenticate Screen
  const renderAuthScreen = () => {
    // Input validation helpers
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!tempEmail.includes('@')) {
        setToastMessage("Error: Invalid email format (Missing '@' pattern)!");
        return;
      }
      if (tempPassword.length < 4) {
        setToastMessage("Error: Password too short (Must be at least 4 chars)!");
        return;
      }
      
      // Complete login
      setAuthEmail(tempEmail);
      setAuthName(tempEmail.split('@')[0].toUpperCase()); // mock display name from email
      setIsUserLoggedIn(true);
      setToastMessage(`Logged in successfully! Welcome back, ${tempEmail.split('@')[0]}!`);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!tempName.trim()) {
        setToastMessage("Error: Full Name is required!");
        return;
      }
      if (!tempEmail.includes('@')) {
        setToastMessage("Error: Registration email is invalid!");
        return;
      }
      if (!tempPhone.trim()) {
        setToastMessage("Error: Please provide a valid Singapore mobile number (+65)!");
        return;
      }
      if (tempPassword.length < 6) {
        setToastMessage("Error: Password must be at least 6 characters!");
        return;
      }

      // Complete registration
      setAuthEmail(tempEmail);
      setAuthName(tempName);
      setAuthPhone(tempPhone);
      setAuthPassword(tempPassword);
      setIsUserLoggedIn(true);
      setToastMessage(`Account created successfully! Welcome ${tempName} to RETAIL_SG!`);
    };

    const handleSendOtp = () => {
      if (!tempPhone.trim()) {
        setToastMessage("Error: Please enter a mobile number before requesting an OTP code!");
        return;
      }
      setAuthOtpSent(true);
      setAuthOtpTimer(60);
      setToastMessage(`A 6-digit verification code has been dispatched to +65 ${tempPhone}!`);
    };

    const handleVerifyOtp = () => {
      if (authOtpCode !== '123456' && authOtpCode.length !== 6) {
        setToastMessage("Error: Invalid OTP code. Use bypass code '123456' for testing!");
        return;
      }
      setAuthEmail(`phone_${tempPhone}@retail.sg`);
      setAuthName(`User ${tempPhone}`);
      setAuthPhone(tempPhone);
      setIsUserLoggedIn(true);
      setToastMessage("Logged in successfully via Singapore SMS OTP!");
    };

    // Calculate password strength rating
    const getPassStrength = (pass: string) => {
      if (!pass) return 0;
      if (pass.length < 6) return 1; // Weak
      const hasNumbers = /\d/.test(pass);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
      if (hasNumbers && hasSpecial) return 3; // Excellent
      return 2; // Medium
    };

    const strength = getPassStrength(tempPassword);

    return (
      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 select-none font-sans bg-white max-w-4xl mx-auto">
        {/* Active Session Status Jumbotron */}
        {isUserLoggedIn ? (
          <div className="border border-zinc-200 bg-zinc-50 p-6 rounded text-center space-y-4 animate-fade-in">
            <div className="inline-flex w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full items-center justify-center border border-emerald-300">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest block font-bold">System Authentication State</span>
              <h2 className="text-base font-extrabold text-zinc-905 uppercase">Successfully Authenticated (Auth Active)</h2>
              <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                Welcome <strong className="text-zinc-900">{authName}</strong>! You are securely connected to the RETAIL_SG system. Your VIP data and order history have successfully linked to the S12 Profile Hub.
              </p>
            </div>

            <div className="bg-white border rounded p-4 max-w-sm mx-auto font-mono text-[10.5px] text-zinc-500 space-y-1.5 text-left shadow-3xs">
              <div className="flex justify-between border-b pb-1">
                <span>Display Name:</span>
                <span className="text-zinc-950 font-bold">{authName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Account Email:</span>
                <span className="text-zinc-950 font-bold">{authEmail}</span>
              </div>
              <div className="flex justify-between">
                <span>Singapore Secure Phone:</span>
                <span className="text-zinc-950 font-bold">+65 {authPhone}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsUserLoggedIn(false);
                  setToastMessage("You have logged out of your account!");
                }}
                className="px-4 py-2 bg-zinc-950 text-white font-mono text-xs uppercase font-bold hover:bg-zinc-850 rounded cursor-pointer transition-colors"
              >
                Sign Out / Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left section: The login form (7 cols) */}
            <div className="md:col-span-7 bg-white border border-zinc-200 rounded p-6 shadow-3xs space-y-5">
              
              {/* Sliding header swapper tabs */}
              <div className="flex font-mono text-xs font-bold uppercase text-center border-b border-zinc-200 pb-px">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setTempPassword('MySecurePass123!');
                    setTempEmail('GiaHanHoang2001@gmail.com');
                  }}
                  className={`flex-1 pb-3 text-[10.5px] transition-all relative cursor-pointer ${
                    authMode === 'login' 
                      ? 'text-zinc-900 border-b-2 border-[#E11D48] font-bold' 
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  Quick Sign In
                  {authMode === 'login' && <span className="absolute bottom-[-1.5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E11D48] rounded-full"></span>}
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setTempPassword('');
                    setTempEmail('');
                    setTempPhone('8765 4321');
                    setTempName('');
                  }}
                  className={`flex-1 pb-3 text-[10.5px] transition-all relative cursor-pointer ${
                    authMode === 'register' 
                      ? 'text-zinc-900 border-b-2 border-[#E11D48] font-bold' 
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  Create Account
                  {authMode === 'register' && <span className="absolute bottom-[-1.5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E11D48] rounded-full"></span>}
                </button>
              </div>

              {/* Form body */}
              {authMode === 'login' ? (
                // Sign In Form View
                <form onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(e); }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                      Account Email Address:
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <Mail size={13} />
                      </span>
                      <input
                        type="text"
                        placeholder="example@gmail.com"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 pl-9 pr-3 text-xs font-sans focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                        Access Password:
                      </label>
                      <button
                        type="button"
                        onClick={() => setToastMessage("Forgot Password flow registered in layout specifications!")}
                        className="text-[9.5px] font-mono text-[#E11D48] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative font-mono">
                      <input
                        type={showAuthPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 px-3 text-xs focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                      >
                        {showAuthPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-850 text-white font-mono text-[10.5px] font-bold uppercase rounded cursor-pointer transition-colors"
                    >
                      SECURE SIGN IN
                    </button>
                  </div>
                </form>
              ) : (
                // Sign Up Form View 
                <form onSubmit={(e) => { e.preventDefault(); handleRegisterSubmit(e); }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hoang Gia Han"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 px-3 text-xs font-sans focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                        Email Address:
                      </label>
                      <input
                        type="text"
                        placeholder="name@example.com"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 px-3 text-xs font-sans focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                        Singapore Mobile (+65):
                      </label>
                      <div className="relative font-mono">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-[10.5px] font-bold">
                          +65
                        </span>
                        <input
                          type="text"
                          placeholder="8765 4321"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 pl-11 pr-3 text-xs focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                        Choose Password:
                      </label>
                      <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">Min 6 chars</span>
                    </div>
                    <div className="relative font-mono">
                      <input
                        type={showAuthPassword ? "text" : "password"}
                        placeholder="Your secure password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded py-2 px-3 text-xs focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                      >
                        {showAuthPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>

                    {/* Password strength visual validation indicator */}
                    {tempPassword && (
                      <div className="pt-2 space-y-1 animate-fade-in font-mono text-[9px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-400">Complexity (Strength):</span>
                          {strength === 1 && <span className="text-[#E11D48] font-bold uppercase">Weak (1/3)</span>}
                          {strength === 2 && <span className="text-amber-500 font-bold uppercase">Medium (2/3)</span>}
                          {strength === 3 && <span className="text-emerald-500 font-bold uppercase">Strong (3/3)</span>}
                        </div>
                        <div className="flex gap-1 h-1">
                          <div className={`flex-1 rounded-sm ${strength >= 1 ? (strength === 1 ? 'bg-[#E11D48]' : strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-zinc-100'}`}></div>
                          <div className={`flex-1 rounded-sm ${strength >= 2 ? (strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-zinc-100'}`}></div>
                          <div className={`flex-1 rounded-sm ${strength === 3 ? 'bg-emerald-500' : 'bg-zinc-100'}`}></div>
                        </div>
                        <p className="text-[8px] text-zinc-400 font-sans leading-none">Password complexity matches Singapore digital commerce Cyber-Safety SLAs.</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-850 text-white font-mono text-[10.5px] font-bold uppercase rounded cursor-pointer transition-colors"
                    >
                      SUBMIT & JOIN RETAIL_SG VIP
                    </button>
                  </div>
                </form>
              )}

              {/* Divider lines */}
              <div className="flex items-center gap-3 py-2">
                <span className="flex-1 h-px bg-zinc-200"></span>
                <span className="text-[9.5px] font-mono text-zinc-400 uppercase font-bold tracking-widest leading-none">OR SMS OTP MOBILE VERIFICATION</span>
                <span className="flex-1 h-px bg-zinc-200"></span>
              </div>

              {/* SMS One-Time Password Verification Workflow section */}
              <div className="border border-dashed border-zinc-300 p-4 rounded bg-zinc-50 space-y-3.5 select-none">
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-xs text-zinc-900 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-ping"></span>
                    Singapore +65 SMS OTP Fast Access
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans leading-tight">
                    Verify your account instantly using Singapore cellular networks. No password recall required.
                  </p>
                </div>

                {!authOtpSent ? (
                  <div className="flex gap-2">
                    <div className="relative font-mono text-xs flex-1 max-w-[200px]">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                        +65
                      </span>
                      <input
                        type="text"
                        placeholder="8765 4321"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded py-1.5 pl-11 pr-3 text-xs focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-[9.5px] font-bold uppercase rounded cursor-pointer transition-colors"
                    >
                      SEND SMS CODE / OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 animate-fade-in font-mono">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Enter 6-digit (e.g. 123456)"
                        value={authOtpCode}
                        onChange={(e) => setAuthOtpCode(e.target.value)}
                        className="max-w-[170px] bg-white border border-zinc-250 rounded py-1.5 px-3 text-xs text-center font-bold font-mono focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[9.5px] font-bold uppercase rounded cursor-pointer transition-colors"
                      >
                        VERIFY OTP / ACCESS
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Clock size={10} />
                        OTP expires in: <strong className="text-[#E11D48] font-bold">{authOtpTimer}s</strong>
                      </span>
                      {authOtpTimer === 0 ? (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[#E11D48] underline hover:text-[#BE123C] cursor-pointer"
                        >
                          Resend Code
                        </button>
                      ) : (
                        <span>Testing Bypass OTP Code: <strong>123456</strong></span>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right section: Social Sign In logins and Specs notes (5 cols) */}
            <div className="md:col-span-5 space-y-6 select-none font-mono text-[10px]">
              {/* Social Login list */}
              <div className="border border-zinc-200 bg-zinc-50/50 p-4 rounded space-y-4 shadow-3xs">
                <span className="text-[9px] font-black uppercase text-zinc-400 block tracking-widest">
                  Integrated Social Handshakes (SEC 4)
                </span>
                
                <h3 className="font-sans font-bold text-xs text-zinc-950 uppercase leading-tight">
                  One-Click verification methods
                </h3>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAuthEmail("g.workspace@gmail.com");
                      setAuthName("Jonathan Tan GWorkspace");
                      setIsUserLoggedIn(true);
                      setToastMessage("Google Workspace authentication handshake successful!");
                    }}
                    className="w-full py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-colors flex items-center justify-center gap-2.5 rounded cursor-pointer"
                  >
                    <span className="font-sans font-bold text-[10.5px]">Sign in with Google</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthEmail("apple.sec@icloud.com");
                      setAuthName("Apple Secure User");
                      setIsUserLoggedIn(true);
                      setToastMessage("Apple Secure ID authentication successful!");
                    }}
                    className="w-full py-2 bg-zinc-950 text-white hover:bg-zinc-850 transition-colors flex items-center justify-center gap-2.5 rounded cursor-pointer"
                  >
                    <span className="font-sans font-bold text-[10.5px]">Sign in with Apple ID</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthEmail("singpass_001@sgp.digital.gov.sg");
                      setAuthName("Tan Keng Hock (SGP Singpass)");
                      setIsUserLoggedIn(true);
                      setToastMessage("Singapore Singpass government gateway handshake authenticated successfully!");
                    }}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center justify-center gap-2.5 rounded cursor-pointer border border-rose-750"
                  >
                    <span className="font-sans font-bold text-[10.5px] tracking-wide uppercase">Connect with Singpass (SGP Secure)</span>
                  </button>
                </div>
              </div>

              {/* Wireframe design rationale */}
              <div className="border border-zinc-200 bg-zinc-50 p-4 rounded space-y-3 text-zinc-550">
                <span className="text-[9px] font-black text-[#E11D48] uppercase tracking-widest block">
                  ● DESIGN RATIONALE SPEC S13
                </span>
                <p className="font-sans leading-relaxed text-[10.5px] text-zinc-650">
                  Authentication flows prioritizes friction minimization during cart-add processes.
                </p>
                <div className="space-y-1.5 pt-1.5 border-t border-zinc-200 font-mono text-[9px]">
                  <div className="flex gap-1">
                    <span className="text-blue-600 font-bold shrink-0">[t-action]</span>
                    <span className="leading-snug text-zinc-600">Tapping Google or Singpass immediately provisions verified active shopper logins.</span>
                  </div>
                  <div className="flex gap-1 text-[9px]">
                    <span className="text-emerald-000 text-emerald-600 font-bold shrink-0">[t-rule]</span>
                    <span className="leading-snug text-zinc-600">SMS timer automatically counts down 60 seconds of secure active lifecycle limits.</span>
                  </div>
                  <div className="flex gap-1 text-[9px]">
                    <span className="text-orange-600 font-bold shrink-0">[t-edge]</span>
                    <span className="leading-snug text-zinc-600">SMS dispatch throttles limit validation counts to maximum 3 OTP allocations per calendar day.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    );
  };

  const renderActiveScreenWireframe = () => {
    switch (screen.id) {
      case 'home':
        return renderHomeScreen();
      case 'search':
        return renderSearchScreen();
      case 'product':
        return renderProductScreen();
      case 'cart':
        return renderCartScreen();
      case 'refund':
        return renderRefundScreen();
      case 'rate':
        return renderRateScreen();
      case 'cancel':
        return renderCancelScreen();
      case 'checkout':
        return renderCheckoutScreen();
      case 'thankyou':
        return renderThankYouScreen();
      case 'store':
        return renderStoreScreen();
      case 'wishlist':
        return renderWishlistScreen();
      case 'profile':
        return renderProfileScreen();
      case 'auth':
        return renderAuthScreen();
      default:
        return <div className="p-8 font-mono text-xs uppercase">Rendering standard screen placeholder matrix for: {screen.id}</div>;
    }
  };

  const getBreakpointClasses = () => {
    switch (breakpoint) {
      case 'desktop':
        return 'w-[1440px] h-[950px] border border-zinc-300 shadow-xl';
      case 'tablet':
        return 'w-[768px] h-[950px] border border-zinc-300 shadow-lg';
      case 'mobile':
        return 'w-[390px] h-[950px] border-2 border-zinc-400 rounded-[16px] shadow-sm';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex justify-center p-4 bg-zinc-100/40 relative min-h-[600px] overflow-x-auto select-none">
      {/* 12-Column Grid Guide layout overlay */}
      {showGrid && (
        <div className="absolute inset-0 max-w-7xl mx-auto grid grid-cols-12 gap-8 px-8 pointer-events-none z-50 opacity-[0.06]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full bg-pink-500 border-x border-pink-700"></div>
          ))}
        </div>
      )}

      {/* Styled mockup frame */}
      <div 
        onWheel={(e) => {
          if (isComparative) {
            // Programmatically scroll the viewport when zoomed comparative mode is on
            const mainElement = e.currentTarget.querySelector('main');
            if (mainElement) {
              mainElement.scrollTop += e.deltaY;
            }
          }
        }}
        className={`bg-white transition-all duration-300 overflow-hidden shrink-0 flex flex-col relative ${getBreakpointClasses()}`}
      >
        {/* Device camera bump sim on pure phone screens */}
        {isMobile && (
          <div className="bg-zinc-950 text-white h-5 flex justify-center items-center text-[9px] font-mono font-bold tracking-widest px-4 select-none justify-between">
            <span>RETAIL_SG LTE</span>
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
            <span>3:18 PM</span>
          </div>
        )}

        {/* Global notification header */}
        {renderTopNotificationRibbon()}
        {renderGlobalHeader()}

        {/* Dynamic wireframe page inner body flow */}
        <main className="flex-1 bg-white relative overflow-y-auto scrollbar-thin">
          {renderActiveScreenWireframe()}
          {renderGlobalFooter()}
          {renderAnnotationPins()}
        </main>

        {/* Floating Custom Toast Overlay */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-y-1/2 z-50 bg-zinc-950 border border-zinc-800 text-white rounded px-4 py-2 flex items-center gap-3 shadow-xl font-mono text-[10px] max-w-sm animate-bounce select-none">
            <Sparkles size={11} className="text-[#E11D48] shrink-0 animate-pulse" />
            <span className="font-sans font-semibold text-zinc-200 leading-snug">{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-zinc-500 hover:text-white cursor-pointer ml-1"
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* Wishlist Drawer Popover */}
        {showWishlistModal && (
          <div className="absolute top-16 right-4 w-72 bg-white border border-zinc-250 shadow-2xl rounded-sm z-40 select-none flex flex-col font-sans">
            <div className="bg-zinc-950 text-white px-3 py-2 flex items-center justify-between">
              <span className="font-mono text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5">
                <Heart size={11} className="fill-[#E11D48] text-[#E11D48]" />
                Wishlist ({likedProducts.length})
              </span>
              <button onClick={() => setShowWishlistModal(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                <X size={11} />
              </button>
            </div>
            
            <div className="p-3 max-h-60 overflow-y-auto space-y-2.5">
              {likedProducts.length === 0 ? (
                <div className="py-6 text-center text-zinc-400 text-[10px]">
                  Your wishlist is empty. Tap the <Heart size={10} className="inline mx-0.5" /> button on any product to save it here.
                </div>
              ) : (
                likedProducts.map((p, pIdx) => (
                  <div key={pIdx} className="flex gap-2 items-center justify-between border-b border-zinc-100 pb-2 text-[10.5px]">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-zinc-900 truncate">{p}</h5>
                      <p className="font-mono text-[9px] text-[#E11D48] font-bold">SGD 899.00</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => {
                          addAccessoryToCart(p, 899.00, 'FAV');
                          setToastMessage(`Added ${p} to cart!`);
                        }}
                        className="p-1 border border-zinc-200 hover:border-zinc-900 text-zinc-700 hover:text-zinc-900 rounded bg-zinc-50 hover:bg-zinc-100 cursor-pointer"
                        title="Thêm vào giỏ"
                      >
                        <ShoppingBag size={10} />
                      </button>
                      <button 
                        onClick={() => {
                          toggleLikeProduct(p);
                        }}
                        className="p-1 border border-zinc-200 text-zinc-400 hover:text-[#E11D48] rounded cursor-pointer"
                        title="Xoá"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-2.5 bg-zinc-50 border-t border-zinc-150 flex gap-2">
              <button 
                onClick={() => {
                  likedProducts.forEach(p => addAccessoryToCart(p, 899.00, 'FAV'));
                  setToastMessage('Successfully added all wishlist products to cart!');
                  setShowWishlistModal(false);
                }}
                disabled={likedProducts.length === 0}
                className="flex-1 py-1.5 bg-zinc-950 text-white hover:bg-zinc-850 text-[9.5px] font-bold uppercase rounded text-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Add all to cart
              </button>
              <button 
                onClick={() => setLikedProducts([])}
                disabled={likedProducts.length === 0}
                className="p-1 px-2 border border-zinc-300 text-zinc-500 hover:text-[#E11D48] hover:border-rose-300 text-[9.5px] rounded cursor-pointer transition-colors"
                title="Xoá hết"
              >
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        )}

        {/* Profile Card Popover */}
        {showProfileModal && (
          <div className="absolute top-16 right-4 w-60 bg-white border border-zinc-250 shadow-2xl rounded-sm z-40 select-none flex flex-col font-sans text-[10.5px]">
            <div className="bg-zinc-950 text-white p-2 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase font-black tracking-wider flex items-center gap-1.5">
                <User size={11} className="text-zinc-400" />
                USER_PROFILE
              </span>
              <button onClick={() => setShowProfileModal(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                <X size={11} />
              </button>
            </div>
            
            <div className="p-3 text-center border-b border-zinc-100 space-y-1">
              <div className="w-10 h-10 bg-zinc-100 rounded-full mx-auto flex items-center justify-center border border-zinc-200 text-zinc-500">
                <User size={16} />
              </div>
              <h4 className="font-bold text-zinc-900 text-xs">Phạm Việt Hoàng</h4>
              <p className="text-[9.5px] text-zinc-500 font-mono">hoang.pv@retailsg.vn</p>
              <span className="inline-block px-1.5 py-0.2 bg-zinc-100 text-zinc-700 rounded-xs text-[8px] font-mono border font-bold">
                LEVEL: VIP MEMBER
              </span>
            </div>
            
            <div className="p-2.5 space-y-1.5 font-mono text-[8.5px] text-zinc-500 bg-zinc-50/50">
              <div className="flex justify-between">
                <span>Fulfillment Hub:</span>
                <span className="text-zinc-900 font-bold">Singapore Hub</span>
              </div>
              <div className="flex justify-between">
                <span>Voucher:</span>
                <span className="text-[#E11D48] font-bold">{appliedVoucher || 'NOT APPLIED'}</span>
              </div>
            </div>
            
            <div className="p-2 border-t border-zinc-100 flex gap-1.5">
              <button 
                onClick={() => {
                  setToastMessage("Demo Session Reset!");
                  setShowProfileModal(false);
                  setLikedProducts([]);
                  setAppliedVoucher(null);
                }}
                className="w-full py-1 border border-zinc-300 rounded hover:border-zinc-500 text-[9px] text-zinc-650 transition-colors uppercase font-mono font-bold cursor-pointer"
              >
                Reset Demo
              </button>
            </div>
          </div>
        )}

        {/* Quick View Dialog / Popup Box */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none animate-fade-in">
            <div className="bg-white border border-zinc-300 w-full max-w-md rounded shadow-2xl relative overflow-hidden font-sans text-xs">
              {/* Header */}
              <div className="bg-zinc-950 text-white px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-ping"></span>
                  Quick Product Overview
                </span>
                <button 
                  onClick={() => setQuickViewProduct(null)} 
                  className="text-zinc-400 hover:text-white cursor-pointer transition-colors p-1"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Photo & Main Stats */}
              <div className="p-4 space-y-4">
                <div className="flex gap-4 items-start">
                  <WireframePlaceholder className="w-24 h-24 rounded shrink-0 border border-zinc-100" text={quickViewProduct.name.toUpperCase()} />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-zinc-100 text-zinc-800 text-[8px] font-mono font-bold px-1 rounded uppercase border">
                        SGD {quickViewProduct.price.toFixed(2)}
                      </span>
                      {renderStockTag(quickViewProduct.status)}
                    </div>
                    <h3 className="font-extrabold text-sm text-zinc-950 tracking-tight leading-snug uppercase">
                      {quickViewProduct.name}
                    </h3>
                    <p className="text-[10px] text-zinc-550 leading-relaxed">
                      High performance retail mock companion specs under Singapore's highest system SLA operations.
                    </p>
                  </div>
                </div>

                {/* Variant selection */}
                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="border-t border-zinc-150 pt-3 space-y-2">
                    <span className="text-[9.5px] font-mono font-black text-zinc-500 uppercase tracking-wider block">Chọn biến thể sản phẩm (Select Variant):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickViewProduct.variants.map((variant) => {
                        const isActive = selectedQuickViewVariant === variant;
                        return (
                          <button
                            key={variant}
                            onClick={() => setSelectedQuickViewVariant(variant)}
                            className={`px-2.5 py-1 border transition-all text-[10px] font-mono rounded cursor-pointer ${
                              isActive
                                ? 'border-zinc-950 bg-zinc-950 text-white font-bold animate-[#E11D48]'
                                : 'border-zinc-200 bg-white text-zinc-650 hover:border-zinc-400 hover:bg-zinc-50'
                            }`}
                          >
                            {variant}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer specs */}
                <div className="bg-zinc-50 p-2.5 rounded border border-zinc-250 font-mono text-[9px] text-zinc-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Authentic Guarantee:</span>
                    <span className="text-zinc-800 font-bold">100% Original SGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courier Pickup SGP:</span>
                    <span className="text-zinc-800 font-bold">Free Next Day Orchard</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1 border-t border-zinc-150">
                  <button
                    onClick={() => {
                      const finalName = selectedQuickViewVariant 
                        ? `${quickViewProduct.name} (${selectedQuickViewVariant})` 
                        : quickViewProduct.name;
                      addAccessoryToCart(finalName, quickViewProduct.price, 'QUICKVIEW');
                      setToastMessage(`Đã thêm vào giỏ: ${finalName}`);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-850 text-white font-mono text-[10.5px] font-black uppercase rounded cursor-pointer transition-colors text-center"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => {
                      toggleLikeProduct(quickViewProduct.name);
                      setToastMessage(`Đã cập nhật wishlist: ${quickViewProduct.name}`);
                    }}
                    className="p-2 border border-zinc-200 rounded hover:bg-rose-50 hover:text-[#E11D48] cursor-pointer transition-all flex items-center justify-center w-8 h-8"
                  >
                    <Heart size={14} className={likedProducts.includes(quickViewProduct.name) ? "fill-[#E11D48] text-[#E11D48]" : "text-zinc-600"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Contact Chat Bubble Button (Bổ sung liên hệ nhanh) */}
        <div className="absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2 text-sans select-none">
          {/* Support Panel Popup */}
          {showChatPopup && (
            <div className="w-72 sm:w-80 h-96 bg-white border border-zinc-250 shadow-2xl rounded-md flex flex-col relative overflow-hidden animate-slide-up text-xs">
              {/* Header */}
              <div className="bg-zinc-950 text-white px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] font-mono tracking-wider">RETAIL_SG TELE-ASSIST</h4>
                    <p className="text-[8px] text-zinc-400 font-sans leading-none">Singapore Operations 24/7</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChatPopup(false)}
                  className="text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Chat Body & History */}
              <div className="flex-1 p-3 overflow-y-auto bg-zinc-50/50 space-y-3 flex flex-col scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div className={`p-2 rounded text-[10px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-zinc-950 text-white rounded-br-none' 
                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-3xs'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-zinc-400 mt-0.5 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Answers */}
              <div className="px-2 py-1.5 border-t border-zinc-150 bg-white flex flex-wrap gap-1 shrink-0 select-none">
                {[
                  { label: '📦 Check My Order', reply: 'Your latest order #SG-99284-2026-UEN is currently being sorted by the SingPost Singapore logistics network.' },
                  { label: '🎫 Redeem FIRST10 Code', reply: 'The 10% discount code FIRST10 has been prepared! Simply click the "Apply Coupon" button on our promo banner in the middle of the homepage to activate it.' },
                  { label: '📞 Singapore Helpline', reply: 'Our direct Singapore Hub helpline is +65 1800 1234 (SGP-ZONE), available daily from 9:00 AM to 9:00 PM SGT.' }
                ].map((prompt, pIdx) => (
                  <button 
                    key={pIdx}
                    onClick={() => {
                      const userMsg = prompt.label;
                      const agentReply = prompt.reply;
                      
                      setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
                      
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, { sender: 'agent', text: agentReply, time: 'Just now' }]);
                      }, 500);
                    }}
                    className="px-1.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-[8.5px] text-zinc-700 rounded border border-zinc-200 cursor-pointer max-w-full truncate transition-colors font-mono"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  const text = chatInput;
                  setChatInput('');
                  setChatMessages(prev => [...prev, { sender: 'user', text, time: 'Just now' }]);
                  
                  setTimeout(() => {
                    setChatMessages(prev => [...prev, { 
                      sender: 'agent', 
                      text: `RETAIL_SG Support has received your request: "${text}". An agent will reply shortly! You can also contact our helpline at +65 1800 1234.`, 
                      time: 'Just now' 
                    }]);
                  }, 650);
                }}
                className="p-1.5 border-t border-zinc-200 bg-white flex gap-1 shrink-0"
              >
                <input 
                  type="text"
                  placeholder="Ask our 24/7 Singapore support team..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1 text-[10px] focus:outline-none focus:bg-white focus:border-zinc-350 font-sans"
                />
                <button 
                  type="submit"
                  className="p-1 bg-zinc-950 text-white rounded hover:bg-zinc-805 transition-colors cursor-pointer flex items-center justify-center w-7 h-7"
                >
                  <Send size={11} />
                </button>
              </form>
            </div>
          )}

          {/* Trigger Button */}
          <button 
            id="quick-chat-bubble-trigger-btn"
            onClick={() => setShowChatPopup(prev => !prev)}
            className="w-10 h-10 bg-zinc-950 hover:bg-[#E11D48] text-white rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer select-none hover:scale-110 active:scale-95 border border-zinc-800"
            title="Chat Helpline"
          >
            {showChatPopup ? <X size={16} /> : <MessageCircle size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
