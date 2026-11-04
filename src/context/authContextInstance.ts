// src/context/authContextInstance.js
import { createContext } from 'react';
import type { ContextoAuth } from '../types';

export const AuthContext = createContext<ContextoAuth | undefined>(undefined);
