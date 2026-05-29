/**
 * Coworker photos for the page-1 bubble cloud.
 * Files live in `public/images/people/`.
 */

export type Person = {
  id: string;
  name: string;
  src: string;
};

function displayNameFromFilename(filename: string): string {
  const base = filename.replace(/^img-/, "").replace(/\.(jpe?g|png|webp)$/i, "");
  return base
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function person(filename: string): Person {
  const id = filename.replace(/\.[^.]+$/, "");
  return {
    id,
    name: displayNameFromFilename(filename),
    src: `/images/people/${filename}`,
  };
}

/** All coworker portraits — keep in sync with `public/images/people/`. */
export const people: Person[] = [
  person("img-adam.jpeg"),
  person("img-amelia.png"),
  person("img-anna.jpeg"),
  person("img-ashlee.jpeg"),
  person("img-carly.jpeg"),
  person("img-david.jpeg"),
  person("img-ivo.jpeg"),
  person("img-jamie.jpeg"),
  person("img-jason-k.png"),
  person("img-jason.jpeg"),
  person("img-jesse.jpeg"),
  person("img-kandace.jpeg"),
  person("img-kathryn.jpeg"),
  person("img-kory.png"),
  person("img-laura-b.jpeg"),
  person("img-laura.png"),
  person("img-matt.jpeg"),
  person("img-mimi.jpeg"),
  person("img-nate.png"),
  person("img-parker.jpeg"),
  person("img-patrick.jpeg"),
  person("img-ray.jpeg"),
  person("img-stefan.png"),
  person("img-tim.jpeg"),
  person("img-tomas.png"),
];
