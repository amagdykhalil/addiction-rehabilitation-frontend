// rolesApi.ts

import { BaseFetch } from "@/shared/api";

export interface RoleDto {
  id: number;
  name_en: string;
  name_ar: string;
}

export interface AddRolesParams {
  roles: Omit<RoleDto, "id">[];
}

export interface UpdateRoleParams {
  id: number;
  name_en: string;
  name_ar: string;
}

export interface RemoveRolesParams {
  roleIds: number[];
}

// Add new roles
async function addRoles(params: AddRolesParams) {
  return BaseFetch<boolean>("/roles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

// Remove roles by IDs
async function removeRoles(params: RemoveRolesParams) {
  return BaseFetch<boolean>("/roles/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

// Update a role
async function updateRole(params: UpdateRoleParams) {
  return BaseFetch<boolean>("/roles", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

// Get all roles
async function getAllRoles() {
  return BaseFetch<RoleDto[]>("/roles");
}

async function getRoleById(id: number) {
  return BaseFetch<RoleDto>(`/roles/${id}`);
}

export const rolesApi = {
  addRoles,
  removeRoles,
  updateRole,
  getAllRoles,
  getRoleById,
};
