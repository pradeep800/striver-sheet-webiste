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
        <TooltipTrigger className="">{children}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
