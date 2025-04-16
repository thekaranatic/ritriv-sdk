// ritriv-sdk/src/index.js

export class RitrivSDK {
    constructor({ apiKey, endpoint }) {
      if (!apiKey || !endpoint) {
        throw new Error("API key and endpoint are required.");
      }
  
      this.apiKey = apiKey;
      this.endpoint = endpoint;
    }
  
    async reportItem({ itemName, description, imageUrl, location }) {
      const response = await fetch(`${this.endpoint}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ itemName, description, imageUrl, location }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to report item");
      }
  
      return response.json();
    }
  
    async claimItem(itemId, userInfo) {
      const response = await fetch(`${this.endpoint}/claim/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ userInfo }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to claim item");
      }
  
      return response.json();
    }
  
    async nearbyAlerts(location) {
      const response = await fetch(`${this.endpoint}/alerts?lat=${location.lat}&lng=${location.lng}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch alerts");
      }
  
      return response.json();
    }
  }
  