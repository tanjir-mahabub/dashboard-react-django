import React, { useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';
import { fetchItems, Item } from '../services/apiServices';

const ListCard: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]); // Define the type of items as Item[]
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data: Item[] = await fetchItems(); // Ensure fetchItems returns an array of Item
                setItems(data);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Unable to load items.');
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    if (loading) return <LoadingCard title="Items" />;
    if (error) return <ErrorCard title="Items" message={error} />;

    return (
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light">Items</h2>
            <ul className="space-y-2 mt-3">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-5">
                        <span>{item.name}</span>
                        <span>{item.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCard;
