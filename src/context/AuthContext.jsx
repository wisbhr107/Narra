// src/context/AuthContext.jsx
// Contexto para gestionar la sesión del usuario (guardada en localStorage)

import React, { useState, useEffect } from 'react';
import { USUARIOS_INICIALES } from '../data/datosEjemplo';
import { AuthContext } from './authContextInstance';

export function AuthProvider({ children }) {
  // Estado para el usuario autenticado, inicializado directamente desde localStorage
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesionActiva = localStorage.getItem('narra_sesion');
      return sesionActiva ? JSON.parse(sesionActiva) : null;
    } catch {
      return null;
    }
  });

  // Asegurar que la lista inicial de usuarios exista en localStorage
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('narra_usuarios');
    if (!usuariosGuardados) {
      localStorage.setItem('narra_usuarios', JSON.stringify(USUARIOS_INICIALES));
    }
  }, []);

  // Función para iniciar sesión
  const iniciarSesion = (email, password) => {
    const raw = localStorage.getItem('narra_usuarios');
    const lista = raw ? JSON.parse(raw) : USUARIOS_INICIALES;

    const encontrado = lista.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (encontrado) {
      const sesion = {
        id: encontrado.id,
        nombre: encontrado.nombre,
        email: encontrado.email,
        rol: encontrado.rol || 'lector',
        avatar: encontrado.avatar,
      };
      setUsuario(sesion);
      localStorage.setItem('narra_sesion', JSON.stringify(sesion));
      return { exito: true };
    }

    return { exito: false, mensaje: 'Correo o contraseña incorrectos. Inténtalo de nuevo.' };
  };

  // Función para registrar un nuevo usuario
  const registrar = (nombre, email, password) => {
    if (!email || !email.includes('@')) {
      return { exito: false, mensaje: 'Introduce un correo electrónico válido.' };
    }
    if (!password || password.length < 8) {
      return { exito: false, mensaje: 'La contraseña debe tener un mínimo de 8 caracteres.' };
    }

    const raw = localStorage.getItem('narra_usuarios');
    const lista = raw ? JSON.parse(raw) : USUARIOS_INICIALES;

    const yaExiste = lista.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (yaExiste) {
      return { exito: false, mensaje: 'Este correo electrónico ya está registrado.' };
    }

    const nuevoUsuario = {
      id: `usr-${Date.now()}`,
      nombre: nombre.trim() || email.split('@')[0],
      email: email.trim().toLowerCase(),
      password,
      rol: 'lector',
    };

    const nuevaLista = [...lista, nuevoUsuario];
    localStorage.setItem('narra_usuarios', JSON.stringify(nuevaLista));

    // Iniciamos sesión automáticamente con la nueva cuenta
    const sesion = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
    };
    setUsuario(sesion);
    localStorage.setItem('narra_sesion', JSON.stringify(sesion));

    return { exito: true };
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('narra_sesion');
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
