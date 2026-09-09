export const initialCategories = [
  {
    id: 'cat-1',
    name: 'Chrono',
    description: 'Precision multi-dial chronographs engineered for performance and prestige.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 'cat-2',
    name: 'Automatic',
    description: 'Self-winding mechanical movements with sapphire crystal and tourbillon craftsmanship.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 'cat-3',
    name: 'Dress',
    description: 'Slim ultra-sleek cases with genuine Italian leather and Milanese mesh straps.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 'cat-4',
    name: 'Sports',
    description: '300M water-resistant stainless steel timepieces with luminous hands and rotating bezel.',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 'cat-5',
    name: 'Smart',
    description: 'High-definition AMOLED smartwatches cased in aviation-grade titanium and gold.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 'cat-6',
    name: 'Vault',
    description: 'Ultra-rare skeleton timepieces with diamond-accented dials and handcrafted leather cases.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  }
];

export const initialProducts = [
  // --- CHRONO (8 Products) ---
  {
    id: 'prod-1',
    title: 'Royal Oak Black & Gold Chronograph',
    category: 'Chrono',
    price: 18500,
    originalPrice: 22500,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Featuring a 42mm 18k gold-plated case, Japanese Miyota chronograph movement, scratch-resistant sapphire glass, and a solid stainless steel butterfly clasp bracelet.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-c2',
    title: 'Daytona Steel & Ceramic Chronograph',
    category: 'Chrono',
    price: 19800,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    description: 'Black ceramic tachymeter bezel with high-precision sub-dials, 316L solid steel case, screw-down pushers, and luminescent hour markers.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-c3',
    title: 'Speedmaster Tachymeter Black Dial',
    category: 'Chrono',
    price: 17200,
    originalPrice: 21000,
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic space-heritage design with triple sub-dial layout, Hesalite crystal display, and brushed steel bracelet with safety fold-over clasp.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-c4',
    title: 'Monaco Square Vintage Chrono',
    category: 'Chrono',
    price: 21500,
    originalPrice: 26000,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
    description: 'Distinctive square 39mm stainless steel case with blue sunray dial, white sub-dials, and perforated racing leather strap.',
    sizes: ['Standard 39mm'],
    inStock: true
  },
  {
    id: 'prod-c5',
    title: 'Grand Carrera Rose Gold Chronometer',
    category: 'Chrono',
    price: 22900,
    originalPrice: 27500,
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
    description: 'Rose gold PVD casing with rotating disc chronograph system, double anti-reflective sapphire glass, and dark brown alligator leather strap.',
    sizes: ['Standard 43mm'],
    inStock: true
  },
  {
    id: 'prod-c6',
    title: 'Pilot Chrono Pioneer Edition',
    category: 'Chrono',
    price: 16800,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=800&q=80',
    description: 'Aviation cockpit inspired high-contrast dial with soft-iron inner case for magnetic field protection and thick calfskin pilot strap.',
    sizes: ['Standard 41mm'],
    inStock: true
  },
  {
    id: 'prod-c7',
    title: 'Silver Arrow Racing Chronograph',
    category: 'Chrono',
    price: 15900,
    originalPrice: 19500,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    description: 'Polished silver steel finish with red racing accents, 1/10th second split timing function, and rally-style perforated steel bracelet.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-c8',
    title: 'Midnight Blue Stealth Chrono',
    category: 'Chrono',
    price: 18900,
    originalPrice: 23000,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
    description: 'Deep navy blue dial with stealth black PVD case, date window display, and water resistance up to 100 meters.',
    sizes: ['Standard 42mm'],
    inStock: true
  },

  // --- AUTOMATIC (8 Products) ---
  {
    id: 'prod-2',
    title: 'Skeleton Open-Heart Automatic Tourbillon',
    category: 'Automatic',
    price: 24000,
    originalPrice: 29000,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Visible 21-jewel self-winding mechanical movement with 48-hour power reserve. Transparent exhibition case back with genuine alligator pattern leather strap.',
    sizes: ['Standard 41mm'],
    inStock: true
  },
  {
    id: 'prod-a2',
    title: 'GMT Master II Pepsi Bezel Automatic',
    category: 'Automatic',
    price: 26500,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Dual timezone GMT automatic movement with bi-color red & blue ceramic rotating bezel and 5-link jubilee stainless steel bracelet.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-a3',
    title: 'Nautilus Sunburst Blue Mechanical',
    category: 'Automatic',
    price: 28000,
    originalPrice: 34000,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic octagonal bezel design with horizontal embossed blue dial, integrated steel bracelet, and ultra-thin automatic movement.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-a4',
    title: 'President Day-Date Gold Fluted Automatic',
    category: 'Automatic',
    price: 29900,
    originalPrice: 36000,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    description: '18k yellow gold electroplated case with signature fluted bezel, full day and date display windows, and semi-circular 3-piece link president bracelet.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-a5',
    title: 'Seamaster Co-Axial Master Chronometer',
    category: 'Automatic',
    price: 25000,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    description: 'Laser-engraved wave dial with helium escape valve, anti-magnetic self-winding caliber, and sapphire exhibition case back.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-a6',
    title: 'Tourbillon Celestial Moonphase Mechanical',
    category: 'Automatic',
    price: 32500,
    originalPrice: 39000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Complex astronomical moonphase wheel with cage tourbillon mechanism at 6 oclock, blue starlight dial, and genuine blue leather strap.',
    sizes: ['Standard 43mm'],
    inStock: true
  },
  {
    id: 'prod-a7',
    title: 'Heritage 1968 Self-Winding Vintage',
    category: 'Automatic',
    price: 22000,
    originalPrice: 27000,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage domed acrylic crystal with cream dial, gold dauphine hands, 28,800 vph automatic caliber, and hand-stitched tan leather strap.',
    sizes: ['Standard 38mm'],
    inStock: true
  },
  {
    id: 'prod-a8',
    title: 'Executive Emerald Green Open Heart',
    category: 'Automatic',
    price: 23800,
    originalPrice: 28500,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Deep emerald green sunburst dial featuring an open balance wheel window, rose gold markers, and double locking deployment clasp.',
    sizes: ['Standard 41mm'],
    inStock: true
  },

  // --- DRESS (8 Products) ---
  {
    id: 'prod-3',
    title: 'Noir Slim Minimalist Leather Quartz',
    category: 'Dress',
    price: 8900,
    originalPrice: 11500,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-thin 6.5mm case profile with matte black dial, gold indices, and soft hand-stitched Italian calfskin strap. Water resistant to 30M.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-d2',
    title: 'Patrimony Ultra-Slim Rose Gold Dress Watch',
    category: 'Dress',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Clean minimalist silver dial with rose gold hour markers, ultra-flat case profile, and dark brown alligator grain leather strap.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-d3',
    title: 'Tank Americaine Roman Dial Classic',
    category: 'Dress',
    price: 14000,
    originalPrice: 17500,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
    description: 'Rectangular polished steel case with bold Roman numeral indices, blue sword-shaped hands, and sapphire cabochon crown.',
    sizes: ['Standard 35x27mm'],
    inStock: true
  },
  {
    id: 'prod-d4',
    title: 'Cellini Dual Time White Dial Leather',
    category: 'Dress',
    price: 11800,
    originalPrice: 14500,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Double bezel with domed and fluted finish, sub-dial second time zone with day/night indicator, and black leather strap.',
    sizes: ['Standard 39mm'],
    inStock: true
  },
  {
    id: 'prod-d5',
    title: 'Saxonia Thin Champagne Gold Edition',
    category: 'Dress',
    price: 13200,
    originalPrice: 16000,
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant champagne gold dial with baton hour markers, 5.9mm thin profile, and premium brown Italian leather strap.',
    sizes: ['Standard 39mm'],
    inStock: true
  },
  {
    id: 'prod-d6',
    title: 'Calatrava Guilloche Dial Black Leather',
    category: 'Dress',
    price: 15500,
    originalPrice: 19000,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-carved hobnail pattern bezel with porcelain white dial, black Roman numerals, and shiny black alligator leather strap.',
    sizes: ['Standard 38mm'],
    inStock: true
  },
  {
    id: 'prod-d7',
    title: 'Elite Classic Silver Milanese Mesh',
    category: 'Dress',
    price: 9800,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek silver sunburst dial with magnetic stainless steel Milanese mesh strap for quick adjustment and effortless luxury.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-d8',
    title: 'Royal Slim Sapphire Dial Dress Edition',
    category: 'Dress',
    price: 10900,
    originalPrice: 13500,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
    description: 'Deep midnight blue sunray face with diamond crystal hour accents at 12, 3, 6, 9 and slim black leather wristband.',
    sizes: ['Standard 40mm'],
    inStock: true
  },

  // --- SPORTS (8 Products) ---
  {
    id: 'prod-4',
    title: 'Oceanic Submariner 300M Diver',
    category: 'Sports',
    price: 15200,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    description: 'Unidirectional rotating ceramic bezel, Super-LumiNova dial markers, screw-down crown, and solid 316L stainless steel oyster bracelet.',
    sizes: ['Standard 43mm'],
    inStock: true
  },
  {
    id: 'prod-s2',
    title: 'Aquaracer 500M Titanium Sports Diver',
    category: 'Sports',
    price: 18500,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight grade-2 titanium case with rubberized dive bezel, yellow accent secondhand, and adjustable wet-suit extension strap.',
    sizes: ['Standard 43mm'],
    inStock: true
  },
  {
    id: 'prod-s3',
    title: 'Royal Oak Offshore Tactical Rubber Strap',
    category: 'Sports',
    price: 21000,
    originalPrice: 25500,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    description: 'Mega Tapisserie waffle pattern dial with rubber crown guards, titanium bezel screws, and vulcanized black rubber sport strap.',
    sizes: ['Standard 44mm'],
    inStock: true
  },
  {
    id: 'prod-s4',
    title: 'Explorer II Polar White Dial GMT',
    category: 'Sports',
    price: 17900,
    originalPrice: 21500,
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    description: 'High-visibility polar white dial with orange 24-hour GMT hand, 24-hour fixed bezel, and scratchproof sapphire lens.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-s5',
    title: 'Pelagos Carbon Matte Black Tactical',
    category: 'Sports',
    price: 19500,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=800&q=80',
    description: 'Forged carbon composite case with snowflake hands, helium escape valve, and matte black tactical NATO strap.',
    sizes: ['Standard 43mm'],
    inStock: true
  },
  {
    id: 'prod-s6',
    title: 'Seamaster Planet Ocean Orange Accent',
    category: 'Sports',
    price: 16800,
    originalPrice: 20500,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    description: 'Orange ceramic ringed bezel with liquidmetal scale, 600M depth rating, and black rubber strap with orange stitching.',
    sizes: ['Standard 43.5mm'],
    inStock: true
  },
  {
    id: 'prod-s7',
    title: 'Luminor Submersible Steel Cushion Case',
    category: 'Sports',
    price: 22500,
    originalPrice: 27000,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
    description: 'Patented trademark crown-protecting lever mechanism, cushion-shaped steel case, luminous indices, and accordeon rubber strap.',
    sizes: ['Standard 44mm'],
    inStock: true
  },
  {
    id: 'prod-s8',
    title: 'Alpine Eagle Integrated Bracelet Sports Watch',
    category: 'Sports',
    price: 20200,
    originalPrice: 24800,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Textured eagle-iris blue dial with compass rose engraved crown and integrated ultra-resistant Lucent steel bracelet.',
    sizes: ['Standard 41mm'],
    inStock: true
  },

  // --- SMART (8 Products) ---
  {
    id: 'prod-5',
    title: 'Smart Horizon AMOLED Gold Edition',
    category: 'Smart',
    price: 12800,
    originalPrice: 15500,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: '1.43" Retina AMOLED display, heart rate & SpO2 tracking, Bluetooth calling, custom luxury watch faces, and 10-day battery life.',
    sizes: ['Standard 45mm'],
    inStock: true
  },
  {
    id: 'prod-sm2',
    title: 'Titanium Ultra Cellular Smartwatch',
    category: 'Smart',
    price: 16500,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Aerospace grade titanium 49mm casing, flat sapphire front crystal, dual-frequency GPS, siren feature, and orange ocean band.',
    sizes: ['Standard 49mm'],
    inStock: true
  },
  {
    id: 'prod-sm3',
    title: 'Luxe Sapphire Edge Smartwatch',
    category: 'Smart',
    price: 14200,
    originalPrice: 17500,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Curved borderless HD glass with gold PVD stainless steel body, wireless charging pad, AI voice assistant, and leather strap.',
    sizes: ['Standard 44mm'],
    inStock: true
  },
  {
    id: 'prod-sm4',
    title: 'Horizon Pro ECG & Blood Oxygen Smart Edition',
    category: 'Smart',
    price: 13900,
    originalPrice: 16800,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Medical grade ECG tracking, body temperature monitoring, 100+ sport modes, notification sync, and IP68 waterproof rating.',
    sizes: ['Standard 45mm'],
    inStock: true
  },
  {
    id: 'prod-sm5',
    title: 'Apex Ceramic Fitness & Golf Smartwatch',
    category: 'Smart',
    price: 15800,
    originalPrice: 19000,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    description: 'Scratchproof ceramic bezel with preloaded 40,000 golf course maps, swing tempo analysis, and 14-day battery stamina.',
    sizes: ['Standard 46mm'],
    inStock: true
  },
  {
    id: 'prod-sm6',
    title: 'Cyberpunk LED Dual Display Smart Series',
    category: 'Smart',
    price: 11500,
    originalPrice: 14000,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Hybrid dual-screen tech combining digital smart OLED panel with physical mechanical hands for up to 30 days battery.',
    sizes: ['Standard 44mm'],
    inStock: true
  },
  {
    id: 'prod-sm7',
    title: 'Royal Smart Steel Link Milanese Edition',
    category: 'Smart',
    price: 13500,
    originalPrice: 16500,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    description: 'Polished silver stainless steel casing with interchangeable magnetic Milanese loop, customizable wallpaper dials, and NFC support.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-sm8',
    title: 'Vanguard Tactical GPS Solar Smart Watch',
    category: 'Smart',
    price: 17900,
    originalPrice: 21500,
    image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=800&q=80',
    description: 'Power Sapphire solar charging lens, stealth mode kill switch, night vision compatibility, and ABC tactical sensors.',
    sizes: ['Standard 51mm'],
    inStock: true
  },

  // --- VAULT (8 Products) ---
  {
    id: 'prod-6',
    title: 'Heritage Gold Skeleton Vault Piece',
    category: 'Vault',
    price: 29500,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    description: 'Individually numbered limited production piece of 500 units worldwide. Crafted in solid rose gold PVD coating with double-domed AR coated sapphire crystal.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-v2',
    title: 'Diamond Perpetual Calendar Grand Vault',
    category: 'Vault',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-set cz diamond bezel with leap year perpetual calendar sub-dials, solid gold rotor, and handmade mahogany presentation vault box.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-v3',
    title: 'Richard Skull Carbon Skeleton Limited Edition',
    category: 'Vault',
    price: 49900,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Forged carbon NTPT tonneau case with 3D sculpted skull bridges, titanium baseplate, and neon green rubber strap. Limited 50 pieces.',
    sizes: ['Standard 43x50mm'],
    inStock: true
  },
  {
    id: 'prod-v4',
    title: 'Bugatti Engine Block Tourbillon Vault',
    category: 'Vault',
    price: 52000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    description: 'Miniature W16 engine animation mechanism inside a sapphire crystal case with 30-degree inclined flying tourbillon.',
    sizes: ['Standard 44x54mm'],
    inStock: true
  },
  {
    id: 'prod-v5',
    title: 'Astronomia Sky Dragon Gold Sculpted Vault',
    category: 'Vault',
    price: 58000,
    originalPrice: 70000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-engraved 18k rose gold dragon wrapped around a 4-arm gravitational tourbillon movement with magnesium globe.',
    sizes: ['Standard 47mm'],
    inStock: true
  },
  {
    id: 'prod-v6',
    title: 'Emerald Baguette Cut Diamond Crown Vault',
    category: 'Vault',
    price: 42000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Full baguette crystal gem-set bezel with deep emerald dial, invisible channel settings, and high-polished white gold finish.',
    sizes: ['Standard 40mm'],
    inStock: true
  },
  {
    id: 'prod-v7',
    title: 'Rose Gold Minute Repeater Skeleton',
    category: 'Vault',
    price: 38500,
    originalPrice: 46000,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Acoustic chiming minute repeater movement with visible dual gongs and hammers on the dial side. Premium brown crocodile strap.',
    sizes: ['Standard 42mm'],
    inStock: true
  },
  {
    id: 'prod-v8',
    title: 'Royal Oak Concept Flying Tourbillon Titanium',
    category: 'Vault',
    price: 44000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
    description: 'Futuristic angular sandblasted titanium case with openworked flying tourbillon at 9 oclock and white ceramic bezel.',
    sizes: ['Standard 44mm'],
    inStock: true
  }
];

export const initialLookVideos = [
  {
    id: 'look-1',
    title: 'Royal Oak Chrono',
    productId: 'prod-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-close-up-41556-large.mp4',
    poster: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-2',
    title: 'Skeleton Tourbillon',
    productId: 'prod-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-his-wrist-watch-41555-large.mp4',
    poster: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-3',
    title: 'Noir Minimalist',
    productId: 'prod-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-checking-the-time-on-a-wrist-watch-41553-large.mp4',
    poster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-4',
    title: 'Oceanic Diver 300M',
    productId: 'prod-4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-adjusting-a-wrist-watch-41554-large.mp4',
    poster: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-5',
    title: 'Smart Horizon Gold',
    productId: 'prod-5',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-looking-at-his-wrist-watch-41557-large.mp4',
    poster: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-6',
    title: 'Heritage Rose Vault',
    productId: 'prod-6',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-close-up-41556-large.mp4',
    poster: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-7',
    title: 'Executive Steel Chrono',
    productId: 'prod-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-checking-the-time-on-a-wrist-watch-41553-large.mp4',
    poster: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialComboOffers = [
  {
    id: 'combo-1',
    title: 'His & Hers Royal Gold Duo Pair',
    subtitle: 'Royal Oak Chrono + Noir Slim Quartz Bundle',
    price: 24900,
    originalPrice: 31000,
    saveAmount: 6100,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Includes 1x Royal Oak Gold Chronograph and 1x Noir Minimalist Leather Watch in a velvet presentation box.'
  },
  {
    id: 'combo-2',
    title: 'Master Executive Vault Gift Set',
    subtitle: 'Skeleton Automatic + Alligator Strap + Watch Roll',
    price: 29500,
    originalPrice: 38000,
    saveAmount: 8500,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Visible Tourbillon automatic movement packaged with genuine Italian leather watch travel case and strap tool.'
  },
  {
    id: 'combo-3',
    title: 'Steel Diver & Smart Tech Combo',
    subtitle: 'Submariner 300M + Smart Horizon Gold Edition',
    price: 23800,
    originalPrice: 29900,
    saveAmount: 6100,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate dual-lifestyle package combining mechanical 300M sports steel with high-definition AMOLED luxury smartwatch.'
  }
];

export const initialReviews = [
  {
    id: 'rev-1',
    name: 'Syed Shahzaib',
    city: 'Lahore',
    rating: 5,
    date: '2 days ago',
    verified: true,
    productName: 'Royal Oak Black & Gold Chronograph',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
    review: 'Bhai parcel receive ho gya ha! Quality is next level 🔥 Packing buhut premium thi aur watch ka weight aur finishing original jaisi ha. Pehle thora darr lag rha tha lekin parcel open kr ke dil khush ho gya. 100% Recommended!'
  },
  {
    id: 'rev-2',
    name: 'Usman Chaudhry',
    city: 'Islamabad',
    rating: 5,
    date: '3 days ago',
    verified: true,
    productName: 'Skeleton Open-Heart Automatic',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
    review: 'Amazing automatic tourbillon movement! Sapphire glass finish is scratch-proof and power reserve works flawlessly. WhatsApp customer support was super responsive.'
  },
  {
    id: 'rev-3',
    name: 'Mirza Hamza',
    city: 'Karachi',
    rating: 5,
    date: '4 days ago',
    verified: true,
    productName: 'Noir Slim Minimalist Leather',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    review: 'Minimalist sleek design with genuine Italian leather strap. Delivery was super fast within 48 hours to Karachi. Premium velvet box packaging!'
  },
  {
    id: 'rev-4',
    name: 'Bilal Tariq',
    city: 'Rawalpindi',
    rating: 5,
    date: '5 days ago',
    verified: true,
    productName: 'Oceanic Submariner 300M Diver',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=400&q=80',
    review: 'Heavy solid 316L stainless steel bracelet and ceramic rotating bezel action is super smooth. Looks 10x more expensive than the price!'
  },
  {
    id: 'rev-5',
    name: 'Fahad Sheikh',
    city: 'Multan',
    rating: 5,
    date: '1 week ago',
    verified: true,
    productName: 'Smart Horizon AMOLED Gold Edition',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
    review: 'Retina AMOLED screen display is crystal clear and battery backup lasts more than a week. Bluetooth calling and watch faces work smoothly.'
  },
  {
    id: 'rev-6',
    name: 'Rashid Khan',
    city: 'Peshawar',
    rating: 5,
    date: '1 week ago',
    verified: true,
    productName: 'His & Hers Royal Gold Duo Pair',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    watchImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
    review: 'Gifted this combo set to my brother on his wedding. Presentation box and gold plating shine was outstanding. Worth every rupee!'
  }
];
