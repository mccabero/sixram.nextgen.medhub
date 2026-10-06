import type { Collection, Product } from "@/types/commerce";

const collections: Collection[] = [
  {
    id: "col-ppe",
    title: "PPE",
    handle: "ppe",
    description: "Protective essentials for clinics, offices, and home care teams.",
    image: {
      url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      altText: "Protective medical gloves and face masks",
    },
  },
  {
    id: "col-diagnostic-equipment",
    title: "Diagnostic Equipment",
    handle: "diagnostic-equipment",
    description:
      "Reliable home and clinical diagnostic tools for day-to-day monitoring.",
    image: {
      url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
      altText: "Diagnostic medical devices arranged on a table",
    },
  },
  {
    id: "col-mobility-aids",
    title: "Mobility Aids",
    handle: "mobility-aids",
    description: "Mobility solutions built for comfort, independence, and safety.",
    image: {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      altText: "Wheelchair positioned in a bright care space",
    },
  },
  {
    id: "col-first-aid",
    title: "First Aid",
    handle: "first-aid",
    description: "Quick-response kits and supplies for homes and workplaces.",
    image: {
      url: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80",
      altText: "First aid kit and medical supplies",
    },
  },
  {
    id: "col-home-care-supplies",
    title: "Home Care Supplies",
    handle: "home-care-supplies",
    description:
      "Caregiver-friendly essentials for recovery, hygiene, and daily support.",
    image: {
      url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80",
      altText: "Home healthcare products staged neatly",
    },
  },
  {
    id: "col-medical-consumables",
    title: "Medical Consumables",
    handle: "medical-consumables",
    description: "Single-use and refillable consumables for routine care workflows.",
    image: {
      url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80",
      altText: "Boxes of medical consumables",
    },
  },
  {
    id: "col-wellness-devices",
    title: "Wellness Devices",
    handle: "wellness-devices",
    description: "Personal wellness devices designed for everyday monitoring.",
    image: {
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      altText: "Wellness monitoring device on a tabletop",
    },
  },
];

function getCollection(handle: string) {
  return collections.find((collection) => collection.handle === handle)!;
}

export const mockProducts: Product[] = [
  {
    id: "prod-blood-pressure-monitor",
    title: "Smart Blood Pressure Monitor",
    handle: "smart-blood-pressure-monitor",
    description:
      "Upper-arm blood pressure monitor with irregular heartbeat detection and two-user memory.",
    descriptionHtml:
      "<p>Track blood pressure accurately with a clinically styled monitor designed for home use, home care teams, and outpatient support.</p>",
    availableForSale: true,
    price: { amount: "89.00", currencyCode: "USD" },
    compareAtPrice: { amount: "109.00", currencyCode: "USD" },
    productType: "Diagnostic Equipment",
    vendor: "CarePulse",
    tags: ["blood pressure", "home monitoring", "diagnostic"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
      altText: "Digital blood pressure monitor",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
        altText: "Digital blood pressure monitor",
      },
      {
        url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80",
        altText: "Clinician preparing a blood pressure reading",
      },
    ],
    collections: [getCollection("diagnostic-equipment"), getCollection("wellness-devices")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-bpm-1",
        title: "Standard Kit",
        availableForSale: true,
        price: { amount: "89.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Kit", value: "Standard" }],
      },
    ],
  },
  {
    id: "prod-infrared-thermometer",
    title: "Infrared Forehead Thermometer",
    handle: "infrared-forehead-thermometer",
    description:
      "Fast, contactless thermometer with backlit display and fever alert indicators.",
    descriptionHtml:
      "<p>Check temperatures quickly with a reliable non-contact thermometer ideal for homes, schools, and workplace screening.</p>",
    availableForSale: true,
    price: { amount: "39.00", currencyCode: "USD" },
    compareAtPrice: null,
    productType: "Diagnostic Equipment",
    vendor: "ThermaSure",
    tags: ["thermometer", "screening", "wellness"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      altText: "Infrared thermometer",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        altText: "Infrared thermometer",
      },
    ],
    collections: [getCollection("diagnostic-equipment")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-thermo-1",
        title: "White",
        availableForSale: true,
        price: { amount: "39.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Color", value: "White" }],
      },
    ],
  },
  {
    id: "prod-pulse-oximeter",
    title: "Pulse Oximeter Pro",
    handle: "pulse-oximeter-pro",
    description:
      "Compact fingertip pulse oximeter with SpO2 tracking, pulse rate display, and travel pouch.",
    descriptionHtml:
      "<p>Monitor oxygen saturation and pulse rate with a dependable fingertip oximeter made for daily wellness checks.</p>",
    availableForSale: true,
    price: { amount: "32.00", currencyCode: "USD" },
    compareAtPrice: null,
    productType: "Wellness Devices",
    vendor: "AeroVital",
    tags: ["pulse oximeter", "oxygen monitoring", "travel"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      altText: "Pulse oximeter clipped on a finger",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
        altText: "Pulse oximeter clipped on a finger",
      },
    ],
    collections: [getCollection("wellness-devices"), getCollection("diagnostic-equipment")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-oximeter-1",
        title: "Navy",
        availableForSale: true,
        price: { amount: "32.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Color", value: "Navy" }],
      },
    ],
  },
  {
    id: "prod-nebulizer-kit",
    title: "Portable Nebulizer Kit",
    handle: "portable-nebulizer-kit",
    description:
      "Quiet, portable nebulizer kit with adult and child masks for convenient respiratory support.",
    descriptionHtml:
      "<p>Deliver mist therapy efficiently with a portable nebulizer kit designed for comfort and easy setup.</p>",
    availableForSale: true,
    price: { amount: "74.00", currencyCode: "USD" },
    compareAtPrice: { amount: "88.00", currencyCode: "USD" },
    productType: "Home Care Supplies",
    vendor: "BreatheWell",
    tags: ["nebulizer", "respiratory", "home care"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1580281658629-7d8b6091f6c5?auto=format&fit=crop&w=1200&q=80",
      altText: "Portable nebulizer kit",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1580281658629-7d8b6091f6c5?auto=format&fit=crop&w=1200&q=80",
        altText: "Portable nebulizer kit",
      },
    ],
    collections: [getCollection("home-care-supplies")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-nebulizer-1",
        title: "Family Pack",
        availableForSale: true,
        price: { amount: "74.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Kit", value: "Family Pack" }],
      },
    ],
  },
  {
    id: "prod-wheelchair-lite",
    title: "Transit Wheelchair Lite",
    handle: "transit-wheelchair-lite",
    description:
      "Foldable transport wheelchair with padded armrests, footrests, and compact storage frame.",
    descriptionHtml:
      "<p>Support safer mobility with a lightweight transit wheelchair suited for clinics, homes, and recovery transport.</p>",
    availableForSale: true,
    price: { amount: "289.00", currencyCode: "USD" },
    compareAtPrice: { amount: "329.00", currencyCode: "USD" },
    productType: "Mobility Aids",
    vendor: "MoveEase",
    tags: ["wheelchair", "mobility", "transport"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
      altText: "Foldable wheelchair",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
        altText: "Foldable wheelchair",
      },
    ],
    collections: [getCollection("mobility-aids"), getCollection("home-care-supplies")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-wheelchair-1",
        title: "Standard",
        availableForSale: true,
        price: { amount: "289.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Size", value: "Standard" }],
      },
    ],
  },
  {
    id: "prod-first-aid-kit",
    title: "Advanced First Aid Kit",
    handle: "advanced-first-aid-kit",
    description:
      "Preparedness kit with bandages, gauze, cold packs, antiseptic wipes, and scissors.",
    descriptionHtml:
      "<p>Keep homes, vehicles, and workplaces prepared with an organized first aid kit built for rapid access.</p>",
    availableForSale: true,
    price: { amount: "48.00", currencyCode: "USD" },
    compareAtPrice: null,
    productType: "First Aid",
    vendor: "SafeStart",
    tags: ["first aid", "emergency", "kit"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80",
      altText: "Advanced first aid kit",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80",
        altText: "Advanced first aid kit",
      },
    ],
    collections: [getCollection("first-aid")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-firstaid-1",
        title: "Deluxe",
        availableForSale: true,
        price: { amount: "48.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Bundle", value: "Deluxe" }],
      },
    ],
  },
  {
    id: "prod-medical-gloves",
    title: "Nitrile Examination Gloves",
    handle: "nitrile-examination-gloves",
    description:
      "Powder-free nitrile gloves with textured fingertips for sanitation and patient care workflows.",
    descriptionHtml:
      "<p>Maintain safer hygiene standards with durable, latex-free nitrile gloves built for frequent use.</p>",
    availableForSale: true,
    price: { amount: "19.00", currencyCode: "USD" },
    compareAtPrice: null,
    productType: "Medical Consumables",
    vendor: "SteriFlex",
    tags: ["gloves", "ppe", "consumables"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      altText: "Box of nitrile gloves",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
        altText: "Box of nitrile gloves",
      },
    ],
    collections: [getCollection("ppe"), getCollection("medical-consumables")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-gloves-1",
        title: "Medium / Box of 100",
        availableForSale: true,
        price: { amount: "19.00", currencyCode: "USD" },
        selectedOptions: [
          { name: "Size", value: "Medium" },
          { name: "Pack", value: "Box of 100" },
        ],
      },
    ],
  },
  {
    id: "prod-adult-diapers",
    title: "Comfort Adult Diapers",
    handle: "comfort-adult-diapers",
    description:
      "Breathable adult diapers with high-absorbency core and resealable side tabs for daily care.",
    descriptionHtml:
      "<p>Support dignity and comfort with discreet, dependable adult diapers built for all-day wear.</p>",
    availableForSale: true,
    price: { amount: "27.00", currencyCode: "USD" },
    compareAtPrice: null,
    productType: "Home Care Supplies",
    vendor: "CareNest",
    tags: ["adult diapers", "caregiver", "home care"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80",
      altText: "Packaged home care supplies",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80",
        altText: "Packaged home care supplies",
      },
    ],
    collections: [getCollection("home-care-supplies")],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-diapers-1",
        title: "Large / 20 pcs",
        availableForSale: true,
        price: { amount: "27.00", currencyCode: "USD" },
        selectedOptions: [
          { name: "Size", value: "Large" },
          { name: "Pack", value: "20 pcs" },
        ],
      },
    ],
  },
];

export const mockCollections = collections;
