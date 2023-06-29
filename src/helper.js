export function filterData(text, items) {
  return items.filter((character) =>
    character.first_name.toLowerCase()?.includes(text.toLowerCase())
  );
}
