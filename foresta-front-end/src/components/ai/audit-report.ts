import { DeepPartial } from "ai";
import { z } from "zod";

export const auditReportSchema = z.object({
  projectName: z.string().describe("The name of the project being audited"),
  findings: z.string().describe("The key findings of the environmental audit"),
  recommendations: z
    .string()
    .describe(
      "Recommendations for improving the project's environmental impact"
    ),
});

export type AuditReport = DeepPartial<typeof auditReportSchema>;
