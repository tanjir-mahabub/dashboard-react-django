
export interface Metric {
    title: string;
    value: string;
    icon: string;
}


export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface Item {
    id: number;
    name: string;
    description: string;
}
export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        type?: 'bar' | 'line'; // Optional: Specify type for mixed charts
    }[];
}



export const fetchSalesData = async (): Promise<ChartData> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/dashboard/sales-data/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }

    return response.json();
};



export interface RealTimeData {
    cpuPercent: number;
    memoryPercent: number;
    memoryUsed: number;
    memoryTotal: number;
    diskUsed: number;
    diskTotal: number;
    diskPercent: number;
    bytesSent: number;
    bytesReceived: number;
    processCount: number;
    batteryPercent?: number; // Optional, may not always be present
    batteryPlugged?: boolean; // Optional
    loadAvg1m?: number; // Optional, depends on system compatibility
    loadAvg5m?: number; // Optional
    loadAvg15m?: number; // Optional
}


export const createRealTimeDataWebSocket = (
    onMessage: (data: RealTimeData) => void,
    onError?: (error: string) => void
): WebSocket => {
    const token = localStorage.getItem('authToken');
    const ws = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/realtime-data/?token=${token}`);

    ws.onopen = () => {
        console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
        try {
            // Parse the incoming JSON data
            const rawData = JSON.parse(event.data);

            // Map snake_case keys to camelCase
            const formattedData: RealTimeData = {
                cpuPercent: rawData.cpu_percent,
                memoryPercent: rawData.memory_percent,
                memoryUsed: rawData.memory_used,
                memoryTotal: rawData.memory_total,
                diskUsed: rawData.disk_used,
                diskTotal: rawData.disk_total,
                diskPercent: rawData.disk_percent,
                bytesSent: rawData.bytes_sent,
                bytesReceived: rawData.bytes_received,
                processCount: rawData.process_count,
                batteryPercent: rawData.battery_percent, // Optional
                batteryPlugged: rawData.battery_plugged, // Optional
                loadAvg1m: rawData.load_avg_1m, // Optional
                loadAvg5m: rawData.load_avg_5m, // Optional
                loadAvg15m: rawData.load_avg_15m, // Optional
            };

            //console.log('Formatted WebSocket data:', formattedData); // Debugging
            onMessage(formattedData);
        } catch (err) {
            console.error('WebSocket message parse error:', err);
            onError?.('Invalid WebSocket data.');
        }
    };

    ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        onError?.('WebSocket connection failed.');
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return ws;
};



export const handleUnauthorizedError = (response: Response) => {
    if (response.status === 401) {
        // Token expired or invalid, handle the logout
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Redirect to login page
        return true;  // We return true to signal that the user should be redirected
    }
    return false;  // Return false if the error is not a 401 Unauthorized
};


export const fetchMetrics = async (): Promise<Metric[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/dashboard/metrics/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch metrics');
    }

    return response.json();
};


export const fetchCartData = async (): Promise<CartItem[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/dashboard/cart/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cart data');
    }

    return response.json();
};


export const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/dashboard/items/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    return response.json();
};
