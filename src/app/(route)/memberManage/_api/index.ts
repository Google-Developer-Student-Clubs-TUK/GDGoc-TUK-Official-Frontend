import { baseAPI } from "@/app/_lib/customApi";

// memberManageListApi.ts
export const memberManageListApi = async ({
  page,
  size,
  field,
  enrollmentStatus,
  generation,
  name,
}: {
  page: number;
  size: number;
  field?: string;
  enrollmentStatus?: string;
  generation?: string;
  name?: string;
}) => {
  const params: Record<string, unknown> = {
    page,
    size,
  };
  if (field) params.field = field;
  if (enrollmentStatus) params.enrollmentStatus = enrollmentStatus;
  if (generation) params.generation = generation;
  if (name) params.name = name;

  return await baseAPI.get("/generation-members/management", { params });
};
