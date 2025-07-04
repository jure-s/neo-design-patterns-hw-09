import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class CsvExporter extends DataExporter {
  protected render(): string {
    const headers = "id,name,email,phone";
    const rows = this.data.map((u) => `${u.id},${u.name},${u.email},${u.phone}`);
    return [headers, ...rows].join("\n");
  }

  protected save(): void {
    const path = "./dist/users.csv";
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, this.result, "utf-8");
  }
}
