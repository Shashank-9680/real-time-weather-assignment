// components/ui/alert.jsx
import React from "react";

export const Alert = ({ title, description, children }) => (
  <div className="border-l-4 border-blue-500 bg-blue-100 p-4">
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);
