import { createContext } from 'react';

export interface LoaderContextType {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
