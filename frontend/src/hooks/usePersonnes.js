import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:5000/api/personnes";

export function usePersonnes() {
  const [personnes, setPersonnes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setPersonnes(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createPersonne = async (form) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Erreur création");
    await fetchAll();
  };

  const updatePersonne = async (id, form) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Erreur modification");
    await fetchAll();
  };

  const deletePersonne = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression");
    await fetchAll();
  };

  return {
    personnes,
    loading,
    error,
    createPersonne,
    updatePersonne,
    deletePersonne,
  };
}
