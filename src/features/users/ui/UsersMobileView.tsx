import React from "react";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import type { User } from "@/entities/users/model";
import { UserCard } from "./UserCard";

export function UsersMobileView({
  users,
  isLoading,
}: {
  users: User[];
  isLoading: boolean;
}) {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);

  if (isLoading) {
    return (
      <div className="lg:hidden p-4 sm:p-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={`skeleton-card-${idx}`}
            className="mb-4 p-4 border rounded-lg animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-12 w-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="lg:hidden p-4 sm:p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {t(USERS_KEYS.list.noUsers, { ns: NAMESPACE_KEYS.users })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden p-4 sm:p-6">
      {users.map((user: User) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersMobileView;
