---
id: "3"
title: "Understanding TypeScript Generics"
excerpt: "A practical introduction to writing reusable, type-safe code with TypeScript generics."
author: "William East"
tags:
  - TypeScript
  - Web Development
  - Programming
images: []
coverImage: ""
featured: false
publishedAt: 2026-02-01
updatedAt: 2026-08-17
status: published
---

TypeScript generics are a powerful feature that lets you write reusable code without giving up type safety. Instead of committing a function, class, or type to one specific data type, you can make the type itself a parameter.

That sounds abstract at first, but the idea is simple: write the logic once, then let TypeScript work out which type it should use each time. In this article, we'll explore:

- generic functions
- constraints that make generics safer
- reusable object shapes and classes
- practical patterns and common mistakes

## A generic function

Consider a function that returns the first item in an array:

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = firstItem([10, 20, 30]);
const firstName = firstItem(["Will", "Mina", "Alex"]);
```

`T` is the generic type parameter. When `firstItem` receives numbers, TypeScript infers `T` as `number`. When it receives strings, `T` becomes `string`. That means `firstNumber` is typed as `number | undefined`, while `firstName` is typed as `string | undefined`.

The function is reusable, but it is not vague. TypeScript keeps track of the relationship between the input and the output for every call.

You can provide a type argument explicitly when inference is not enough:

```ts
const firstUser = firstItem<{ id: string; name: string }>([
  { id: "1", name: "Will" }
]);
```

In most cases, inference is clearer and avoids unnecessary repetition. Explicit type arguments are useful when a value is coming from a wider type or when you want to make an important assumption visible.

## Constraining a generic

An unconstrained generic can represent any type. That is useful, but sometimes a function needs a particular property to exist. The `extends` keyword adds that guarantee:

```ts
type Identifiable = {
  id: string;
};

function findById<T extends Identifiable>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

const projects = [
  { id: "wordweb", title: "Wordweb", featured: true },
  { id: "picme", title: "Picme", featured: false }
];

const project = findById(projects, "wordweb");
```

Here, `T` can be a project, user, or any other object, as long as it contains an `id` string. The returned value keeps its more specific type, so `project?.featured` is still available.

Without the constraint, TypeScript would correctly reject `item.id` because an arbitrary `T` is not guaranteed to have an `id` property.

## Reusable data shapes

Generics are especially useful for describing containers whose structure stays the same while their data changes:

```ts
type ApiResponse<T> = {
  data: T;
  receivedAt: string;
};

type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};

type ProjectResponse = ApiResponse<Paginated<{ id: string; title: string }>>;
```

`ProjectResponse` now describes a response containing paginated project records, while the same `ApiResponse<T>` and `Paginated<T>` types can be reused for posts, users, or any other resource.

This is one of the main benefits of generics: shared structure is written once, and the meaningful data type remains explicit at the point of use.

## Generic classes

Functions are not the only place where generics help. A class can also retain the type of the value it manages:

```ts
class Store<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(nextValue: T): void {
    this.value = nextValue;
  }
}

const themeStore = new Store("welcome");
themeStore.set("midnight");

const selectedTheme: string = themeStore.get();
```

The `Store` class works with strings in this example, but it could just as easily hold a user object or a list of projects. `themeStore.set(42)` would be rejected because the instance was created as a `Store<string>`.

## A practical API helper

A common real-world use for generics is a small API helper:

```ts
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

type User = {
  id: string;
  name: string;
};

const user = await fetchJson<User>("/api/user");
user.name;
```

The caller gets a useful `User` type without duplicating the request logic. However, the type assertion does not validate the data returned by the server at runtime. For untrusted input, pair this pattern with a runtime schema validator such as Zod.

## Common mistakes

Generics are most useful when they describe a real relationship between values. A few guidelines help keep them readable:

1. **Let TypeScript infer types when it can.** Explicit type arguments are not automatically safer or clearer.
2. **Use constraints instead of pretending every value has every property.** `T extends Identifiable` documents and enforces the requirement.
3. **Do not add a generic just to make a function look flexible.** If a function only accepts strings, `string` may be the better type.
4. **Remember that generics disappear at runtime.** They improve editor support and compile-time checks, but they do not validate API responses or user input.
5. **Choose descriptive names for complicated types.** `T` is fine for a small function; names such as `TItem` or `TResponse` can make a larger abstraction easier to follow.

## The payoff

Generics let you build abstractions that are flexible without becoming untyped. They preserve the connection between the data you pass in and the data you get back, which is exactly the kind of relationship that is easy to lose when code is copied or replaced with broad types.

Start with a small generic function, add constraints when the implementation needs them, and only extract a reusable generic type when the same structure appears more than once. Used that way, generics make TypeScript code easier to reuse, refactor, and trust.
