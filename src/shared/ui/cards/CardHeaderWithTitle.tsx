import { CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

interface CardHeaderWithTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export function CardHeaderWithTitle({
  title,
  description,
  className,
}: CardHeaderWithTitleProps) {
  return (
    <CardHeader className={className}>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  );
}
