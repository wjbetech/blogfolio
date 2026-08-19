import React from "react";
import ReactDOM from "react-dom";
import * as jsxRuntime from "react/jsx-runtime";

type CompiledMdxExport = {
  default?: React.ComponentType<{ components?: Record<string, unknown> }>;
};

export function getCompiledMdxComponent(code: string) {
  const scope = {
    React,
    ReactDOM,
    _jsx_runtime: jsxRuntime
  };

  // Contentlayer emits trusted, build-time MDX code in this format.
  const evaluate = new Function(...Object.keys(scope), code) as (...values: unknown[]) => CompiledMdxExport;
  const mdxExport = evaluate(...Object.values(scope));

  if (!mdxExport.default) {
    throw new Error("Compiled MDX did not export a default component");
  }

  return mdxExport.default;
}
