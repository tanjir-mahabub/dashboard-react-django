import React, { useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';

interface Item {
    id: number;
    name: string;
    description: string;
}

const ListCard: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Unable to load items.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (error) {
        return <ErrorCard title="Items" message={error} />;
    }

    if (loading) {
        return <LoadingCard title="Items" />;
    }

    return (
       <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light pb-4">Items</h2>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}:</strong> {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCard;
