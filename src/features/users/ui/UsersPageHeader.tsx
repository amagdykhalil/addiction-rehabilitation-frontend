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
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import useUserSearch, {
  type UserSearchType,
} from "@/features/users/hooks/useUserSearch";
import FormErrorMessage from "@/shared/ui/FormErrorMessage";
import { Input } from "@/shared/ui";
import { USERS_ROUTES } from "@/entities/users/routes/usersRoutesPaths";
import { generatePath } from "react-router-dom";

export const UsersPageHeader = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const {
    searchDialogOpen,
    setSearchDialogOpen,
    searchParams,
    setSearchParams,
    notFound,
    setNotFound,
    isLoading,
    error,
    setSearchTriggered,
  } = useUserSearch();

  return (
    <>
      <PageHeader
        title={t(USERS_KEYS.list.title, { ns: NAMESPACE_KEYS.users })}
        subtitle={t(USERS_KEYS.list.subtitle, {
          ns: NAMESPACE_KEYS.users,
        })}
        actions={[
          {
            label: t(USERS_KEYS.search.searchUser, {
              ns: NAMESPACE_KEYS.users,
            }),
            variant: "outline",
            size: "default",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: () => setSearchDialogOpen(true),
          },
          {
            label: t(USERS_KEYS.search.addUser, {
              ns: NAMESPACE_KEYS.users,
            }),
            href: generatePath(`${USERS_ROUTES.MAIN_PATH}/add`),
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
              {t(USERS_KEYS.search.title, { ns: NAMESPACE_KEYS.users })}
            </DialogTitle>
            <DialogDescription>
              {t(USERS_KEYS.search.description, {
                ns: NAMESPACE_KEYS.users,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t(USERS_KEYS.search.searchType, {
                  ns: NAMESPACE_KEYS.users,
                })}
              </label>
              <Select
                value={searchParams.type}
                onValueChange={(value) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    type: value as UserSearchType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">
                    {t(USERS_KEYS.table.userId, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </SelectItem>
                  <SelectItem value="nationalId">
                    {t(USERS_KEYS.table.nationalId, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </SelectItem>
                  <SelectItem value="passport">
                    {t(USERS_KEYS.table.passport, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </SelectItem>
                  <SelectItem value="email">
                    {t(USERS_KEYS.details.email, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchParams.type === "id"
                  ? t(USERS_KEYS.table.userId, {
                      ns: NAMESPACE_KEYS.users,
                    })
                  : searchParams.type === "nationalId"
                    ? t(USERS_KEYS.details.nationalIdNumber, {
                        ns: NAMESPACE_KEYS.users,
                      })
                    : searchParams.type === "passport"
                      ? t(USERS_KEYS.details.passportNumber, {
                          ns: NAMESPACE_KEYS.users,
                        })
                      : t(USERS_KEYS.details.email, {
                          ns: NAMESPACE_KEYS.users,
                        })}
              </label>
              <Input
                value={searchParams.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                placeholder={
                  searchParams.type === "id"
                    ? "000123"
                    : searchParams.type === "nationalId"
                      ? "1234567890"
                      : searchParams.type === "passport"
                        ? "P123456789"
                        : "user@email.com"
                }
              />
            </div>
            {isLoading && (
              <div className="text-sm text-muted-foreground">
                {t(USERS_KEYS.loading, { ns: NAMESPACE_KEYS.users })}
              </div>
            )}
            {error && (
              <FormErrorMessage>
                {t(USERS_KEYS.notFound.message, {
                  ns: NAMESPACE_KEYS.users,
                  id: searchParams.value,
                })}
              </FormErrorMessage>
            )}
            {notFound && !isLoading && !error && (
              <FormErrorMessage>
                {t(USERS_KEYS.notFound.message, {
                  ns: NAMESPACE_KEYS.users,
                  id: searchParams.value,
                })}
              </FormErrorMessage>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSearchDialogOpen(false)}
              >
                {t(USERS_KEYS.search.cancel, { ns: NAMESPACE_KEYS.users })}
              </Button>
              <Button
                onClick={() => {
                  setSearchTriggered(true);
                  setNotFound(false);
                }}
                disabled={!searchParams.value}
              >
                {t(USERS_KEYS.search.search, { ns: NAMESPACE_KEYS.users })}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersPageHeader;
