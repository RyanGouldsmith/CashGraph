export interface TagsQuery {
  tags: Array<{
    name: TagValues;
    colour: TagColours;
  }>;
}

enum TagValues {
  HOLIDAY,
  FOOD,
  TRAVEL,
  ENTERTAINMENT,
}

enum TagColours {
  GREEN,
  RED,
  BLUE,
}
