import axios from "axios";
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

// Force disable API calls since user has no API key
const isApiKeyAvailable = false;



// Location-based image database
const locationImages = {
  // Major cities
  "new york": "/images/destinations/newyork.jpg",
  paris: "/images/destinations/paris.jpg",
  tokyo: "/images/destinations/tokyo.jpg",
  london: "/images/destinations/london.jpg",
  rome: "/images/destinations/rome.jpg",
  sydney: "/images/destinations/sydney.jpg",
  dubai: "/images/destinations/dubai.jpg",
  singapore: "/images/destinations/singapore.jpg",
  "hong kong": "/images/destinations/hongkong.jpg",
  bangkok: "/images/destinations/bangkok.jpg",
  istanbul: "/images/destinations/istanbul.jpg",
  seoul: "/images/destinations/seoul.jpg",
  barcelona: "/images/destinations/barcelona.jpg",
  amsterdam: "/images/destinations/amsterdam.jpg",
  delhi: "/images/destinations/delhi.jpg",
  mumbai: "/images/destinations/mumbai.jpg",
  bali: "/images/destinations/bali.jpg",

  // Add more locations as needed
};

// Category images for fallbacks
const categoryImages = {
  beach: "/images/categories/beach.jpg",
  mountain: "/images/categories/mountain.jpg",
  city: "/images/categories/city.jpg",
  historical: "/images/categories/historical.jpg",
  cultural: "/images/categories/cultural.jpg",
  adventure: "/images/categories/adventure.jpg",
  relaxation: "/images/categories/relaxation.jpg",
  food: "/images/categories/food.jpg",
};

// Default images if everything else fails
const DEFAULT_IMAGE = "/images/main_img_placeholder.jpg";
const DEFAULT_CITY_IMAGE = "/images/city_placeholder.jpg";

/**
 * Get relevant image for a location
 * @param {string} location - Name of the location
 * @param {string} type - Type of location (beach, mountain, etc.)
 * @returns {string} Image URL
 */
const getLocationImage = (location = "", type = "city") => {
  // Check if we have a direct match
  const locationKey = location.toLowerCase().trim();

  // If we have an exact match in our database
  if (locationImages[locationKey]) {
    return locationImages[locationKey];
  }

  // Check for partial matches
  for (const key of Object.keys(locationImages)) {
    if (locationKey.includes(key) || key.includes(locationKey)) {
      return locationImages[key];
    }
  }

  // Fall back to category image
  if (categoryImages[type.toLowerCase()]) {
    return categoryImages[type.toLowerCase()];
  }

  // Last resort - use default image
  return DEFAULT_IMAGE;
};

// Export a constant URL for components to use directly
export const PHOTO_URL = DEFAULT_IMAGE;

// Place details function - returns themed images based on place name
export const getPlaceDetails = (data) => {
  console.log("Using themed images for place data");
  const placeName = data.textQuery || "city";
  const imageUrl = getLocationImage(placeName);

  return Promise.resolve({
    data: {
      places: [
        {
          photos: [{ name: imageUrl }],
          formattedAddress: `${placeName}`,
          googleMapsUri: "",
        },
      ],
    },
  });
};

// City details function - returns themed images based on city name
export const getCityDetails = (data) => {
  console.log("Using themed images for city data");
  const cityName = data.textQuery || "city";
  const imageUrl = getLocationImage(cityName);

  return Promise.resolve({
    data: {
      places: [
        {
          photos: [{ name: imageUrl }],
          googleMapsUri: "",
        },
      ],
    },
  });
};
