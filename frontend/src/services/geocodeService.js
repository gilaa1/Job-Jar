import axios from 'axios';

const GeocodeService = {
   convertAddressToLatLng : async function (address)  {
      try {
          const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; 
          const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json`,
              {
                  params: {
                      address: address,
                      key: API_KEY,
                  },
              }
          );
          
          if (response.data.status === 'OK') {
              const { lat, lng } = response.data.results[0].geometry.location;
              return { lat: lat, lng: lng };
          } else {
              console.error(`Geocoding API Error: ${response.data.status}`);
              return null;
          }
      } catch (error) {
          console.error('Error converting address to Lat/Lng:', error);
          return null;
      }
  }
}

export default GeocodeService;