import { Button } from "@/shared/ui/button";
import { DialogHeader } from "@/shared/ui/dialog";
import { PageHeader } from "@/shared/ui";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plus, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { USERS_ROUTES } from "@/entities/users/routes";
import { useState } from "react";
import FormErrorMessage from "@/shared/ui/FormErrorMessage";
import { Input } from "@/shared/ui";

export const UsersPageHeader = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.user]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchType, setSearchType] = useState<"id" | "email">("id");
  const [searchValue, setSearchValue] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for:", searchType, searchValue);
    setSearchDialogOpen(false);
  };

  return (
    <>
      <PageHeader
        title={t(USER_KEYS.list.title, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.list.subtitle, {
          ns: NAMESPACE_KEYS.user,
        })}
        actions={[
          {
            label: t(USER_KEYS.search.searchUser, {
              ns: NAMESPACE_KEYS.user,
            }),
            variant: "outline",
            size: "default",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: () => setSearchDialogOpen(true),
          },
          {
            label: t(USER_KEYS.search.addUser, {
              ns: NAMESPACE_KEYS.user,
            }),
            href: `${USERS_ROUTES.MAIN_PATH}/add`,
            variant: "default",
            size: "default",
            icon: <Plus className="h-4 w-4 mr-2" />,
          },
        ]}
      />

      <Dialog
        open={searchDialogOpen}
        onOpenChange={(open) => {
          setSearchDialogOpen(open);
          setNotFound(false);
        }}
      >
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t(USER_KEYS.search.title, { ns: NAMESPACE_KEYS.user })}
            </DialogTitle>
            <DialogDescription>
              {t(USER_KEYS.search.description, {
                ns: NAMESPACE_KEYS.user,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t(USER_KEYS.search.searchType, {
                  ns: NAMESPACE_KEYS.user,
                })}
              </label>
              <Select
                value={searchType}
                onValueChange={(value) => setSearchType(value as "id" | "email")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">
                    {t(USER_KEYS.table.userId, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </SelectItem>
                  <SelectItem value="email">
                    {t(USER_KEYS.table.email, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchType === "id"
                  ? t(USER_KEYS.table.userId, {
                      ns: NAMESPACE_KEYS.user,
                    })
                  : t(USER_KEYS.table.email, {
                      ns: NAMESPACE_KEYS.user,
                    })}
              </label>
              <Input
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                placeholder={
                  searchType === "id"
                    ? "000123"
                    : "user@example.com"
                }
              />
            </div>
            {notFound && (
              <FormErrorMessage>
                {t(USER_KEYS.notFound.message, {
                  ns: NAMESPACE_KEYS.user,
                  id: searchValue,
                })}
              </FormErrorMessage>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSearchDialogOpen(false)}
              >
                {t(USER_KEYS.search.cancel, { ns: NAMESPACE_KEYS.user })}
              </Button>
              <Button
                onClick={handleSearch}
                disabled={!searchValue}
              >
                {t(USER_KEYS.search.search, { ns: NAMESPACE_KEYS.user })}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};