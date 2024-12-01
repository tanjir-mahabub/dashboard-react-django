import React, { useState } from 'react';
import useTheme from '../hooks/useTheme';

const FormCard: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
       <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-bold pb-4">User Info Form</h2>
            <div className="flex w-full h-full justify-center items-center">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-dark'
                            }`}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-dark'
                            }`}
                    />
                    <button
                        type="submit"
                        className={`w-full p-2 rounded-md ${isDarkMode
                            ? 'bg-secondary text-black'
                            : 'bg-primary text-light hover:bg-primary/80'
                            }`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormCard;
