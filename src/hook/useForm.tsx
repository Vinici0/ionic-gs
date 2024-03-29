import React, { useState } from "react";

export const useForm = <T extends object>(initialState: T) => {
  const [formulario, setFormulario] = useState(initialState);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    console.log(name, value);
    
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return {
    formulario,
    handleChange,
    ...formulario,
  };
};