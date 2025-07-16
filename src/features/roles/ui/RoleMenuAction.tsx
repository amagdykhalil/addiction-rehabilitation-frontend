import type { RoleDto } from "@/entities/roles/api";
import { Button } from "@/shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { DeleteRoleDialog } from "./DeleteRoleDialog";
import { EditRoleDialog } from "./EditRoleDialog";

export function RoleMenuAction({ role }: { role: RoleDto }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <EditRoleDialog role={role} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <DeleteRoleDialog role={role} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
