import React, { useState, useEffect } from "react";
import { EstoqueItem } from "./estoque";

const API_KEY = process.env.REACT_APP_SUPABASE_KEY;
const API_URL = process.env.REACT_APP_SUPABASE_URL;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};


// 🔵 Método 'GET' - Busca itens na API
 export const searchItems = async () => {
  try {
    const response = await fetch(API_URL,
      {
        method: "GET",
        headers,
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    throw error;
  }
};

// 🟢 CREATE 'POST' - Cadastra itens
export const addItem = async (payload) => {
 try { 
    const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

    console.log("📥 Status da resposta:", response.status); // ← DEBUG
    console.log("📥 Response OK?", response.ok); // ← DEBUG


  if (!response.ok) {
      const errorText = await response.text(); // ← Pega a mensagem de erro
      console.error("❌ Erro do servidor:", errorText);
      throw new Error(`Erro ${response.status}: ${errorText || response.statusText}`);
    }
    
    const data = await response.json();
    console.log("✅ Item criado:", data);
    return data;
    
  } catch (error) {
    console.error("❌ Erro ao cadastrar itens:", error);
    throw error;
  }
};

// 🟡 UPDATE (PATCH)
export const updateItem = async (id, produto) => {
  const response = await fetch(
    `${API_URL}?id=eq.${id}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(produto),
    }
  );

  return await response.json();
};

// 🔴 DELETE
export const deleteItem = async (id) => {
  const response = await fetch(
    `${API_URL}?id=eq.${id}`,
    {
      method: "DELETE",
      headers,
    }
  );

  return await response.json();
};