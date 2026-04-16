import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import Image from "next/image";

export function getMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="font-display text-gold-metallic border-border mt-16 mb-8 border-b pb-4 text-4xl font-bold tracking-wide md:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="font-display text-gold mt-16 mb-6 text-2xl font-semibold tracking-wide md:text-3xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="font-display text-gold-bright mt-12 mb-4 text-xl font-semibold tracking-wide md:text-2xl"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="font-body text-foreground mb-6 max-w-none text-base leading-relaxed md:text-lg"
        {...props}
      >
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-gold-bright font-semibold" {...props}>
        {children}
      </strong>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="font-body text-foreground marker:text-gold mb-6 list-disc pl-6"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="font-body text-foreground marker:text-gold mb-6 list-decimal pl-6"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-2 text-base leading-relaxed md:text-lg" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }) => (
      <div className="border-border mb-8 overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-left" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
      <tr className="even:bg-muted/40" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="bg-muted font-display text-gold border-gold border-b-2 p-3 text-left font-semibold tracking-wide md:p-4"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="font-body text-foreground border-border border-b p-3 align-top text-sm leading-relaxed md:p-4 md:text-base"
        {...props}
      >
        {children}
      </td>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-gold bg-muted/30 text-muted-foreground mb-6 rounded-r-lg border-l-4 py-4 pl-6 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="border-border my-12" {...props} />,
    img: ({ src, alt, width, height, ...rest }) => {
      if (typeof src !== "string") return null;
      const imgProps: Omit<ImageProps, "alt"> = {
        src,
        width: typeof width === "number" ? width : Number(width) || 1200,
        height: typeof height === "number" ? height : Number(height) || 800,
        sizes: "(min-width: 768px) 768px, 100vw",
        quality: 80,
        ...rest,
      };
      return <Image alt={alt ?? ""} {...imgProps} />;
    },
    ...components,
  };
}
