import {
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Tooltip,
} from "./ui/tooltip";

export function NToolTip({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
