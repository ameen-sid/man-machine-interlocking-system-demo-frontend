const API_BASE_URL =
	import.meta.env.VITE_API_URL;

export const api = {
	get: async (endpoint: string) => {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (!response.ok) throw new Error("API Error");
		return response.json();
	},
	post: async (endpoint: string, data: any) => {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("API Error");
		return response.json();
	},
	put: async (endpoint: string, data: any) => {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("API Error");
		return response.json();
	},
	delete: async (endpoint: string) => {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (!response.ok) throw new Error("API Error");
		return response.json();
	},
};
