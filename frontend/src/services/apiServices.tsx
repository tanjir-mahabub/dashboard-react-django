export interface Metric {
    title: string;
    value: string;
}

export const fetchMetrics = async (): Promise<Metric[]> => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: 'Total Revenue', value: '$45,000' },
                { title: 'New Users', value: '320' },
                { title: 'Pending Orders', value: '45' },
                { title: 'Completed Orders', value: '276' },
            ]);
        }, 1000); // Simulates 1-second delay
    });
};
