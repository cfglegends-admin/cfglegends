import { subjects } from "@/lib/config";
import { subjectIconMap } from "@/lib/icon-map";

export function SubjectsGrid() {
  return (
    <div>
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Fächer
        </h2>
        <p className="font-body text-foreground/85 mt-6 text-base md:text-lg">
          Jeder Lehrer unterrichtet Fächer — und die bestimmen seine Stärken.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {subjects.map((subject) => {
          const Icon = subjectIconMap[subject.icon];
          return (
            <li
              key={subject.name}
              className="bg-muted border-border hover:border-gold flex flex-col items-center gap-2 rounded-lg border p-4 hover:shadow-[0_0_0_1px_var(--color-gold)]"
            >
              {Icon ? <Icon className="text-gold h-7 w-7" aria-hidden="true" /> : null}
              <span className="font-body text-foreground text-sm font-medium">{subject.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
