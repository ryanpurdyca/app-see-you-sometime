/**
 * Coworker photos for the page-1 bubble cloud.
 * Files live in `public/images/people/`.
 */

export type Person = {
  id: string;
  name: string;
  src: string;
  highlight: string;
};

function displayNameFromFilename(filename: string): string {
  const base = filename.replace(/^img-/, "").replace(/\.(jpe?g|png|webp)$/i, "");
  return base
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function person(filename: string, highlight: string): Person {
  const id = filename.replace(/\.[^.]+$/, "");
  return {
    id,
    name: displayNameFromFilename(filename),
    src: `/images/people/${filename}`,
    highlight,
  };
}

/** All coworker portraits — keep in sync with `public/images/people/`. */
export const people: Person[] = [
  person("img-adam.jpeg", "Your car camping cross-country ski trip."),
  person(
    "img-amelia.png",
    "Opening up about your time living in Alabama, the difficulties you experienced, and how that made you into the wonderful you are.",
  ),
  person(
    "img-anna.jpeg",
    "All our 30-minute talks that ended up lasting well over an hour every single time.",
  ),
  person(
    "img-ashlee.jpeg",
    "Our offsite workouts, the #gym channel, and constantly comparing notes on different fitness and nutrition-related questions.",
  ),
  person(
    "img-carly.jpeg",
    "A wonderful person and an exceptional mom. The kind of parent we aspire to be, that very few are, and someone who makes us genuinely excited about that future.",
  ),
  person(
    "img-curtis.png",
    "We're real-life friends so there's a lot I can say, but our Nashville honky tonk bar crawl was one of my favorite offsite memories ever.",
  ),
  person(
    "img-daniel.jpeg",
    "Balto, and the entire backstory that created your passion for a better system.",
  ),
  person(
    "img-ivo.jpeg",
    "Using ChatGPT to run your own electrical for your backyard shed, and passing the safety inspection, when your actual licensed electrician didn't.",
  ),
  person(
    "img-hally.jpeg",
    'Creating your own incredible clothing brand from scratch and getting "Plain Jane" featured in Vogue!',
  ),
  person(
    "img-jamie.jpeg",
    "Going to see Thornhill and reviving my love of metal, introducing me to loads of new bands.",
  ),
  person(
    "img-jackie.jpeg",
    'Our club ("cluuurb") night staying out until 4am seeing Wax Motif at Marquee in Manhattan.',
  ),
  person(
    "img-jason-k.png",
    "Literally never ceasing to be a walking meme and constantly hilarious.",
  ),
  person(
    "img-jason.jpeg",
    "Being an exceptional example of a great leader, and always being open to coaching others seeking advice.",
  ),
  person("img-kandace.jpeg", "Being my all-star go-to flip cup partner in Cape Cod."),
  person(
    "img-kathryn.jpeg",
    "Being an equally questionable and tasteful all-hands DJ and supreme overlord of the chicken nuggies.",
  ),
  person(
    "img-kelley.jpeg",
    "Teaching me about the very deep (pun intended) and complex world of lobster society.",
  ),
  person(
    "img-kory.png",
    "The fact it took us almost a decade to work together, doing it remotely from another country, and literally never co-working even though we live 15 minutes from each other.",
  ),
  person(
    "img-laura-b.jpeg",
    "Literally never not bringing the energy to any room, zoom, or situation you were in. I'm going to try to bring big Laura vibes to my next adventure.",
  ),
  person("img-laura.png", "Your free-roaming bathroom-trained house rabbit."),
  person(
    "img-matt.jpeg",
    "Entertaining my endless questions about your creative interests and fascination with your process for making incredible board games.",
  ),
  person(
    "img-mimi.jpeg",
    "Being my consistent Canadian confidant turned double-agent on the mean streets of San Francisco.",
  ),
  person(
    "img-nate.png",
    "Giving me the secret chart to make any kind of hard-boiled egg I want, perfectly, every time.",
  ),
  person(
    "img-parker.jpeg",
    "Eating our way through New York pizza shops on multiple occasions while discussing your religious beliefs and experiences which led to me becoming more spiritual.",
  ),
  person(
    "img-patrick.jpeg",
    "A lot comes to mind, but I always loved our occasional Wolfnights lunches together learning more about your and Anna's adventures.",
  ),
  person(
    "img-ray.jpeg",
    "Allowing me to talk your ear off about how you and your partner shepherd, breed, and traditionally harvest your own herd of sheep.",
  ),
  person(
    "img-renée.jpeg",
    "Sounds so boring, but being an exceptional collaborator and someone I've had more fun than most working and becoming friends with.",
  ),
  person(
    "img-sajeev.jpeg",
    'The historical backstory and present-day cocktails served at "Beneath the Pines".',
  ),
  person(
    "img-tim.jpeg",
    "Exchanging countless Pepe memes talking about your fossil interests and adventures.",
  ),
  person(
    "img-tomas.png",
    "The fact I know your vacation schedule from all our time talking about Puerto Vallarta from your time as my favorite customer before becoming one of my favorite co-workers.",
  ),
];
