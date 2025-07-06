import React from "react";

export const NotProvidedText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span className="text-muted-foreground italic">{children}</span>;

export default NotProvidedText;
