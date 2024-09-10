"use client"
import { Copy, Server } from "lucide-react";
import toast from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
    title: string;
    description: string;
    varient: "public" | "admin"
}

const textMap: Record<ApiAlertProps["varient"], string> = {
    public: "Public",
    admin: "Admin"
} 

const varientMap: Record<ApiAlertProps["varient"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    varient = "public"
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("Store URL copied to clipboard.")
    }

    return ( <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={varientMap[varient]}>
                {textMap[varient]}
            </Badge>
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between">
            <code className="bg-muted p-[0.3rem] font-semibold rounded mt-4">
            {description}
            </code>
          <Button variant="outline" size="icon" onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
       );
}
 
export default ApiAlert;