
export const calculateDistance = async (origin, destination) => {
    try {
        // Load Google Maps API
        const directionsService = new window.google.maps.DirectionsService();

        const request = {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
        };

        return new Promise((resolve, reject) => {
            directionsService.route(request, (response, status) => {
                if (status === "OK") {
                    const distance = response.routes[0].legs[0].distance.text;
                    resolve(distance);
                } else {
                    console.error("Directions request failed:", status);
                    reject("Unable to calculate distance.");
                }
            });
        });
    } catch (error) {
        console.error("Google Maps API error:", error);
        throw new Error("Failed to load Google Maps API.");
    }
};
