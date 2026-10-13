import type { ProjectStatus } from "@/data/project-types";

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="status" data-tone={status.tone}>
      <span className="status-dot" aria-hidden="true" />
      {status.label}
    </span>
  );
}
