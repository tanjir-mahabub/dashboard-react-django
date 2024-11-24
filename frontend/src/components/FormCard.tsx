import React, { useState } from 'react';

const FormCard: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-white">User Info Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                />
                <button type="submit" className="w-full p-2 bg-secondary rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormCard;
