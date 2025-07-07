import { BaseFetch } from "@/shared/api";
import type { Role, User, UserSortBy } from "@/entities/users/model";

import { isNotNil } from "@/shared/lib/utils";
import type { Gender, SortDirection } from "@/shared/types/enums";
import type { PaginatedResult } from "@/shared/types/paginatedResult";

// 1. Get a single user by id
async function getUser(id: string) {
  return BaseFetch<User>(`/Users/${id}`);
}

// 2. Get a list of users with filters and pagination
export interface GetUsersParams {
  pageNumber?: number;
  pageSize?: number;
  searchQuery?: string;
  gender?: Gender;
  countryId?: number;
  roleId?: string;
  isActive?: boolean;
  sortBy?: UserSortBy;
  sortDirection?: SortDirection;
}

async function getUsers(params: GetUsersParams = {}, signal?: AbortSignal) {
  const query = new URLSearchParams();
  if (params.pageNumber)
    query.append("pageNumber", params.pageNumber.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params.searchQuery) query.append("searchQuery", params.searchQuery);
  if (isNotNil(params.gender)) query.append("gender", params.gender.toString());
  if (isNotNil(params.countryId))
    query.append("nationalityId", params.countryId.toString());
  if (isNotNil(params.roleId)) query.append("roleId", params.roleId);
  if (isNotNil(params.isActive))
    query.append("isActive", params.isActive.toString());
  if (isNotNil(params.sortBy)) query.append("sortBy", params.sortBy.toString());
  if (isNotNil(params.sortDirection))
    query.append("sortDirection", params.sortDirection.toString());

  const result = await BaseFetch<PaginatedResult<User>>(
    `/Users?${query.toString()}`,
    {
      signal,
    }
  );

  return result;
}

// 3. Add a new user
async function addUser(
  user: Omit<User, "Id" | "isActive" | "nationalityName">
) {
  return BaseFetch<number>("/Users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// 4. Update a user
async function updateUser(
  user: Omit<User, "email" | "roles" | "isActive" | "nationalityName">
) {
  return BaseFetch<boolean>(`/Users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// 5. Deactivate (soft delete) a user
async function deactivateUser(id: string) {
  return BaseFetch<boolean>(`/Users/deactivate/${id}`, {
    method: "POST",
  });
}

// 6. Reactivate a user (undoes soft delete)
async function reactivateUser(id: string) {
  return BaseFetch<boolean>(`/Users/reactivate/${id}`, {
    method: "POST",
  });
}

// 7. Update roles to a user
export interface UpdateUserRolesParams {
  userId: number;
  roleIds: number[];
}

async function updateUserRoles(params: UpdateUserRolesParams) {
  return BaseFetch<boolean>("/Users/update-roles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

// Get user by email
async function existsByEmail(email: string) {
  return BaseFetch<number | undefined>(`/Users/exists-by-email/${email}`);
}

async function getAllUserRoles(userId: number) {
  return BaseFetch<Role[]>(`/Users/${userId}/roles`);
}

// Check if user exists by ID
async function existsById(id: string) {
  return BaseFetch<boolean>(`/Users/exists-by-id/${id}`);
}

// Check if user exists by passport number
async function existsByPassport(passportNumber: string) {
  return BaseFetch<number | undefined>(
    `/Users/exists-by-passport/${passportNumber}`
  );
}

// Check if user exists by national ID
async function existsByNationalId(nationalIdNumber: string) {
  return BaseFetch<number | undefined>(
    `/Users/exists-by-national-id/${nationalIdNumber}`
  );
}

export const usersApi = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deactivateUser,
  reactivateUser,
  updateUserRoles,
  getAllUserRoles,
  existsByEmail,
  existsById,
  existsByPassport,
  existsByNationalId,
};
