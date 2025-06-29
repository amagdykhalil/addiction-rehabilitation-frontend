import { BaseFetch } from "@/shared/api";
import type {
  User,
  PaginatedResult,
  Gender,
  UserSortBy,
  UserRole,
  UserStatus,
} from "../model";
import { SortDirection } from "@/entities/patients/model";
import { isNotNil } from "@/shared/lib/utils";

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
  role?: UserRole;
  status?: UserStatus;
  countryId?: number;
  sortBy?: UserSortBy;
  sortDirection?: SortDirection;
}

async function getUsers(
  params: GetUsersParams = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  if (params.pageNumber)
    query.append("pageNumber", params.pageNumber.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params.searchQuery) query.append("searchQuery", params.searchQuery);
  if (isNotNil(params.gender)) query.append("gender", params.gender.toString());
  if (isNotNil(params.role)) query.append("role", params.role.toString());
  if (isNotNil(params.status)) query.append("status", params.status.toString());
  if (isNotNil(params.countryId))
    query.append("nationalityId", params.countryId.toString());
  if (isNotNil(params.sortBy)) query.append("sortBy", params.sortBy.toString());
  if (isNotNil(params.sortDirection))
    query.append("sortDirection", params.sortDirection.toString());

  const result = await BaseFetch<PaginatedResult<User>>(
    `/Users?${query.toString()}`,
    {
      signal,
    },
  );

  return result;
}

// 3. Add a new user
async function addUser(user: Omit<User, "id" | "createdAt" | "lastLoginAt">) {
  return BaseFetch<string>("/Users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// 4. Update a user
async function updateUser(user: Omit<User, "createdAt" | "lastLoginAt">) {
  return BaseFetch<boolean>(`/Users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// 5. Delete a user
async function deleteUser(id: string) {
  return BaseFetch<null>(`/Users/${id}`, {
    method: "DELETE",
  });
}

// Get user by email
async function getUserByEmail(email: string) {
  return BaseFetch<User>(`/Users/by-email/${email}`);
}

// Check if user exists by ID
async function existsById(id: string) {
  return BaseFetch<boolean>(`/Users/exists-by-id/${id}`);
}

// Check if user exists by email
async function existsByEmail(email: string) {
  return BaseFetch<string | undefined>(
    `/Users/exists-by-email/${email}`,
  );
}

export const usersApi = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  existsById,
  existsByEmail,
};